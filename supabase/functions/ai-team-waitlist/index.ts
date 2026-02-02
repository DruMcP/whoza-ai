import { createClient } from 'npm:@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface WaitlistRequest {
  email: string;
  product: string;
}

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

    const { email, product }: WaitlistRequest = await req.json();

    // Validate input
    if (!email || !product) {
      return new Response(
        JSON.stringify({ error: 'Email and product are required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate product
    if (!['chloe', 'simon'].includes(product)) {
      return new Response(
        JSON.stringify({ error: 'Invalid product. Must be chloe or simon' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Insert into waitlist (will fail if already exists due to unique constraint)
    const { data, error } = await supabase
      .from('ai_team_waitlist')
      .insert([
        {
          email: email.toLowerCase().trim(),
          product,
        },
      ])
      .select()
      .single();

    // Handle duplicate entry gracefully
    if (error) {
      if (error.code === '23505') {
        // Unique constraint violation - user already on waitlist
        return new Response(
          JSON.stringify({
            success: true,
            message: 'You are already on the waitlist!',
            alreadyExists: true,
          }),
          {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      throw error;
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Successfully added to waitlist',
        data,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to add to waitlist',
        details: error.message,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
