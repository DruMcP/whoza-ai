-- Trial Waitlist System
-- Weekly trial slot caps + waitlist for whoza.ai

-- Trial slots tracking (weekly buckets)
create table if not exists public.trial_slots (
  id uuid primary key default gen_random_uuid(),
  week_starting date not null,
  slots_total int not null default 25,
  slots_used int not null default 0,
  slots_remaining int generated always as (slots_total - slots_used) stored,
  reset_at timestamptz not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (week_starting)
);

-- Trial waitlist entries
create table if not exists public.trial_waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  business_name text,
  trade_type text,
  phone text,
  website_url text,
  postcode text,
  status text not null default 'waiting' check (status in ('waiting', 'notified', 'activated', 'expired', 'cancelled')),
  position int,
  week_notified date,
  notified_at timestamptz,
  activated_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Add trial fields to users table
alter table public.users 
  add column if not exists trial_started_at timestamptz,
  add column if not exists trial_ends_at timestamptz,
  add column if not exists trial_minutes_used int default 0,
  add column if not exists trial_minutes_limit int default 0,
  add column if not exists trial_status text default 'none' check (trial_status in ('none', 'active', 'expired', 'converted', 'cancelled')),
  add column if not exists waitlist_id uuid references public.trial_waitlist(id),
  add column if not exists joined_from_waitlist boolean default false;

-- RLS policies
create policy "Public read trial slots" on public.trial_slots
  for select to anon, authenticated using (true);

create policy "Public read waitlist own entry" on public.trial_waitlist
  for select to anon, authenticated using (email = auth.jwt() ->> 'email');

create policy "Public insert waitlist" on public.trial_waitlist
  for insert to anon, authenticated with check (true);

-- Enable RLS
alter table public.trial_slots enable row level security;
alter table public.trial_waitlist enable row level security;

-- Indexes
create index if not exists idx_trial_waitlist_status on public.trial_waitlist(status);
create index if not exists idx_trial_waitlist_position on public.trial_waitlist(position) where status = 'waiting';
create index if not exists idx_trial_waitlist_email on public.trial_waitlist(email);
create index if not exists idx_trial_slots_week on public.trial_slots(week_starting);
create index if not exists idx_users_trial_status on public.users(trial_status);

-- Function to get or create current week slot bucket
create or replace function public.get_current_trial_week()
returns public.trial_slots
language plpgsql
security definer
as $$
declare
  this_monday date;
  slot_row public.trial_slots;
begin
  this_monday := date_trunc('week', current_date)::date;
  
  select * into slot_row
  from public.trial_slots
  where week_starting = this_monday;
  
  if not found then
    insert into public.trial_slots (week_starting, slots_total, reset_at)
    values (this_monday, 25, this_monday + interval '7 days')
    returning * into slot_row;
  end if;
  
  return slot_row;
end;
$$;

-- Function to claim a trial slot (with row-level locking to prevent race conditions)
create or replace function public.claim_trial_slot(p_email text)
returns json
language plpgsql
security definer
as $$
declare
  slot_row public.trial_slots;
  result json;
begin
  -- Lock the current week slot row to prevent concurrent claims
  select * into slot_row
  from public.trial_slots
  where week_starting = date_trunc('week', current_date)::date
  for update;
  
  if not found then
    -- Create slot bucket if missing (shouldn't happen due to get_current_trial_week)
    insert into public.trial_slots (week_starting, slots_total, reset_at)
    values (date_trunc('week', current_date)::date, 25, date_trunc('week', current_date)::date + interval '7 days')
    returning * into slot_row;
  end if;
  
  if slot_row.slots_remaining <= 0 then
    result := json_build_object(
      'available', false,
      'slots_remaining', 0,
      'message', 'This week''s trial slots are full. Join the waitlist for next Monday.'
    );
    return result;
  end if;
  
  update public.trial_slots
  set slots_used = slots_used + 1,
      updated_at = now()
  where id = slot_row.id;
  
  result := json_build_object(
    'available', true,
    'slots_remaining', slot_row.slots_remaining - 1,
    'week_starting', slot_row.week_starting,
    'message', 'Trial slot claimed successfully'
  );
  
  return result;
end;
$$;

-- Function to add to waitlist with position
create or replace function public.join_waitlist(
  p_email text,
  p_business_name text,
  p_trade_type text,
  p_phone text,
  p_website_url text,
  p_postcode text
)
returns json
language plpgsql
security definer
as $$
declare
  next_position int;
  new_id uuid;
  result json;
begin
  -- Check if already on waitlist
  if exists (select 1 from public.trial_waitlist where email = p_email and status = 'waiting') then
    select json_build_object(
      'success', false,
      'message', 'You are already on the waitlist',
      'position', position
    ) into result
    from public.trial_waitlist
    where email = p_email and status = 'waiting';
    return result;
  end if;
  
  -- Get next position
  select coalesce(max(position), 0) + 1 into next_position
  from public.trial_waitlist
  where status = 'waiting';
  
  insert into public.trial_waitlist (
    email, business_name, trade_type, phone, website_url, postcode, position, status
  ) values (
    p_email, p_business_name, p_trade_type, p_phone, p_website_url, p_postcode, next_position, 'waiting'
  )
  returning id into new_id;
  
  result := json_build_object(
    'success', true,
    'waitlist_id', new_id,
    'position', next_position,
    'message', 'You are #' || next_position || ' on the waitlist. We open 25 slots every Monday at 9 AM.'
  );
  
  return result;
end;
$$;

-- Function to get waitlist position by email
create or replace function public.get_waitlist_status(p_email text)
returns json
language plpgsql
security definer
as $$
declare
  result json;
begin
  select json_build_object(
    'on_waitlist', true,
    'position', position,
    'status', status,
    'created_at', created_at,
    'notified_at', notified_at,
    'expires_at', expires_at
  ) into result
  from public.trial_waitlist
  where email = p_email
  order by created_at desc
  limit 1;
  
  if result is null then
    result := json_build_object('on_waitlist', false);
  end if;
  
  return result;
end;
$$;

-- Function to activate waitlist entries when new week starts
-- Called by cron job every Monday 00:00 UTC
create or replace function public.process_waitlist_activations(p_limit int default 25)
returns json
language plpgsql
security definer
as $$
declare
  activated_count int := 0;
  entry record;
begin
  for entry in
    select id, email
    from public.trial_waitlist
    where status = 'waiting'
    order by position asc
    limit p_limit
  loop
    update public.trial_waitlist
    set status = 'notified',
        week_notified = date_trunc('week', current_date)::date,
        notified_at = now(),
        expires_at = now() + interval '24 hours',
        updated_at = now()
    where id = entry.id;
    
    activated_count := activated_count + 1;
  end loop;
  
  -- Re-number positions after activation
  with numbered as (
    select id, row_number() over (order by created_at) as new_pos
    from public.trial_waitlist
    where status = 'waiting'
  )
  update public.trial_waitlist w
  set position = n.new_pos
  from numbered n
  where w.id = n.id;
  
  return json_build_object(
    'activated', activated_count,
    'remaining', (select count(*) from public.trial_waitlist where status = 'waiting')
  );
end;
$$;

-- Admin metrics function
create or replace function public.get_trial_metrics()
returns json
language plpgsql
security definer
as $$
declare
  result json;
begin
  select json_build_object(
    'current_week', (select row_to_json(s) from public.trial_slots s where week_starting = date_trunc('week', current_date)::date),
    'waitlist_total', (select count(*) from public.trial_waitlist where status = 'waiting'),
    'trials_active', (select count(*) from public.users where trial_status = 'active'),
    'trials_expired_this_week', (select count(*) from public.users where trial_ends_at >= date_trunc('week', current_date)::date and trial_status = 'expired'),
    'conversions_this_week', (select count(*) from public.users where trial_status = 'converted' and updated_at >= date_trunc('week', current_date)::date),
    'conversion_rate', case 
      when (select count(*) from public.users where trial_status in ('active', 'expired', 'converted')) = 0 then 0
      else round((select count(*) from public.users where trial_status = 'converted')::numeric / 
           (select count(*) from public.users where trial_status in ('active', 'expired', 'converted'))::numeric * 100, 1)
    end
  ) into result;
  
  return result;
end;
$$;
