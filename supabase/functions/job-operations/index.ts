import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { action, jobData, jobId, userId } = await req.json();

    console.log('Job operation:', { action, jobId, userId });

    switch (action) {
      case 'create': {
        if (!jobData || !userId) {
          return new Response(
            JSON.stringify({ error: 'Missing job data or user ID' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
          );
        }

        const { data: job, error: createError } = await supabase
          .from('jobs')
          .insert({
            ...jobData,
            employer_id: userId
          })
          .select()
          .single();

        if (createError) {
          console.error('Create job error:', createError);
          return new Response(
            JSON.stringify({ error: 'Failed to create job' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
          );
        }

        return new Response(
          JSON.stringify({ job }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'update': {
        if (!jobData || !jobId || !userId) {
          return new Response(
            JSON.stringify({ error: 'Missing required data' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
          );
        }

        const { data: job, error: updateError } = await supabase
          .from('jobs')
          .update(jobData)
          .eq('id', jobId)
          .eq('employer_id', userId)
          .select()
          .single();

        if (updateError) {
          console.error('Update job error:', updateError);
          return new Response(
            JSON.stringify({ error: 'Failed to update job' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
          );
        }

        return new Response(
          JSON.stringify({ job }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'delete': {
        if (!jobId || !userId) {
          return new Response(
            JSON.stringify({ error: 'Missing job ID or user ID' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
          );
        }

        const { error: deleteError } = await supabase
          .from('jobs')
          .delete()
          .eq('id', jobId)
          .eq('employer_id', userId);

        if (deleteError) {
          console.error('Delete job error:', deleteError);
          return new Response(
            JSON.stringify({ error: 'Failed to delete job' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
          );
        }

        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'get-employer-jobs': {
        if (!userId) {
          return new Response(
            JSON.stringify({ error: 'Missing user ID' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
          );
        }

        const { data: jobs, error: jobsError } = await supabase
          .from('jobs')
          .select('*')
          .eq('employer_id', userId)
          .order('created_at', { ascending: false });

        if (jobsError) {
          console.error('Get employer jobs error:', jobsError);
          return new Response(
            JSON.stringify({ error: 'Failed to fetch jobs' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
          );
        }

        return new Response(
          JSON.stringify({ jobs }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'increment-views': {
        if (!jobId) {
          return new Response(
            JSON.stringify({ error: 'Missing job ID' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
          );
        }

        const { error: updateError } = await supabase
          .rpc('increment_job_views', { job_id: jobId });

        if (updateError) {
          console.error('Increment views error:', updateError);
          // Don't return error for views increment - it's not critical
        }

        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        );
    }

  } catch (error) {
    console.error('Job operations error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});