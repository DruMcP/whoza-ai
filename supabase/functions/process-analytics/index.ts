import { createClient } from 'npm:@supabase/supabase-js@2.39.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': Deno.env.get('ALLOWED_ORIGIN') || 'https://whoza.ai',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const periodStart = yesterday.toISOString().split('T')[0];
    const periodEnd = periodStart;

    const { data: users } = await supabase
      .from('users')
      .select('id');

    if (!users) {
      return new Response(
        JSON.stringify({ success: true, message: 'No users to process' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let processedUsers = 0;

    for (const user of users) {
      try {
        const startTime = new Date(periodStart + 'T00:00:00Z');
        const endTime = new Date(periodEnd + 'T23:59:59Z');

        const { data: events } = await supabase
          .from('analytics_events')
          .select('*')
          .eq('user_id', user.id)
          .gte('created_at', startTime.toISOString())
          .lte('created_at', endTime.toISOString());

        const logins = events?.filter(e => e.event_type === 'user_login').length || 0;
        const portalVisits = events?.filter(e => e.event_type === 'portal_visit').length || 0;
        const tasksCompleted = events?.filter(e => e.event_type === 'task_completed').length || 0;

        const { data: profile } = await supabase
          .from('business_profiles')
          .select('id')
          .eq('user_id', user.id)
          .maybeSingle();

        let tasksAssigned = 0;
        let scoreAtStart = null;
        let scoreAtEnd = null;

        if (profile) {
          const { count } = await supabase
            .from('tasks')
            .select('*', { count: 'exact', head: true })
            .eq('business_id', profile.id)
            .gte('created_at', startTime.toISOString())
            .lte('created_at', endTime.toISOString());

          tasksAssigned = count || 0;

          const { data: scores } = await supabase
            .from('visibility_score_details')
            .select('overall_score, score_date')
            .eq('business_id', profile.id)
            .order('score_date', { ascending: false })
            .limit(2);

          if (scores && scores.length > 0) {
            scoreAtEnd = scores[0].overall_score;
            scoreAtStart = scores.length > 1 ? scores[1].overall_score : scores[0].overall_score;
          }
        }

        const { data: notifications } = await supabase
          .from('notification_delivery_log')
          .select('status')
          .eq('user_id', user.id)
          .gte('created_at', startTime.toISOString())
          .lte('created_at', endTime.toISOString());

        const notificationsSent = notifications?.length || 0;
        const notificationsOpened = notifications?.filter(n => n.status === 'opened').length || 0;

        const taskCompletionRate = tasksAssigned > 0 ? (tasksCompleted / tasksAssigned) * 100 : 0;
        const engagementScore = Math.min(logins * 5, 30) + Math.min(portalVisits * 2, 20) + Math.min(taskCompletionRate * 0.5, 50);

        await supabase
          .from('user_engagement_metrics')
          .upsert({
            user_id: user.id,
            period_type: 'daily',
            period_start: periodStart,
            period_end: periodEnd,
            tasks_assigned: tasksAssigned,
            tasks_completed: tasksCompleted,
            task_completion_rate: taskCompletionRate,
            score_at_start: scoreAtStart,
            score_at_end: scoreAtEnd,
            score_change: scoreAtEnd && scoreAtStart ? scoreAtEnd - scoreAtStart : 0,
            logins_count: logins,
            portal_visits: portalVisits,
            notifications_sent: notificationsSent,
            notifications_opened: notificationsOpened,
            engagement_score: Math.round(engagementScore),
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'user_id,period_type,period_start',
          });

        processedUsers++;
      } catch (error) {
        console.error(`Error processing user ${user.id}:`, error);
      }
    }

    const { count: newSignups } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', new Date(periodStart + 'T00:00:00Z').toISOString())
      .lte('created_at', new Date(periodEnd + 'T23:59:59Z').toISOString());

    const { count: activeUsers } = await supabase
      .from('analytics_events')
      .select('user_id', { count: 'exact', head: true })
      .eq('event_type', 'user_login')
      .gte('created_at', new Date(periodStart + 'T00:00:00Z').toISOString())
      .lte('created_at', new Date(periodEnd + 'T23:59:59Z').toISOString());

    const { count: totalTasksCompleted } = await supabase
      .from('analytics_events')
      .select('*', { count: 'exact', head: true })
      .eq('event_type', 'task_completed')
      .gte('created_at', new Date(periodStart + 'T00:00:00Z').toISOString())
      .lte('created_at', new Date(periodEnd + 'T23:59:59Z').toISOString());

    const { count: payingCustomers } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .neq('subscription_plan', 'free');

    await supabase
      .from('platform_metrics')
      .upsert({
        period_type: 'daily',
        period_start: periodStart,
        period_end: periodEnd,
        new_signups: newSignups || 0,
        active_users: activeUsers || 0,
        paying_customers: payingCustomers || 0,
        total_tasks_completed: totalTasksCompleted || 0,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'period_type,period_start',
      });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Analytics processed successfully',
        processedUsers,
        period: periodStart,
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error in process-analytics function:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 500,
      }
    );
  }
});