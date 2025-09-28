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

    const { searchQuery, location, jobType, salaryMin, salaryMax, skills, limit = 20, offset = 0 } = await req.json();

    console.log('Search parameters:', { searchQuery, location, jobType, salaryMin, salaryMax, skills, limit, offset });

    // Build the query
    let query = supabase
      .from('jobs')
      .select(`
        id,
        title,
        company,
        description,
        location,
        salary_min,
        salary_max,
        salary_currency,
        job_type,
        experience_level,
        is_remote,
        is_urgent,
        required_skills,
        optional_skills,
        views_count,
        applications_count,
        created_at
      `)
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    // Apply search filters
    if (searchQuery && searchQuery.trim()) {
      // Search in title, company, description, and skills
      query = query.or(`title.ilike.%${searchQuery}%,company.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
    }

    if (location && location.trim() && location.toLowerCase() !== 'remote') {
      query = query.ilike('location', `%${location}%`);
    }

    if (jobType && jobType !== 'all') {
      query = query.eq('job_type', jobType);
    }

    if (salaryMin) {
      query = query.gte('salary_min', salaryMin);
    }

    if (salaryMax) {
      query = query.lte('salary_max', salaryMax);
    }

    // Handle pagination
    query = query.range(offset, offset + limit - 1);

    const { data: jobs, error: jobsError } = await query;

    if (jobsError) {
      console.error('Jobs query error:', jobsError);
      return new Response(
        JSON.stringify({ error: 'Failed to search jobs' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    // Calculate match percentage if skills are provided
    const jobsWithMatch = jobs?.map(job => {
      let matchPercentage = 100; // Default match if no skills filtering

      if (skills && skills.length > 0) {
        const requiredSkills = job.required_skills || [];
        const optionalSkills = job.optional_skills || [];
        const allJobSkills = [...requiredSkills, ...optionalSkills];
        
        if (allJobSkills.length > 0) {
          const matchedSkills = skills.filter((skill: string) => 
            allJobSkills.some((jobSkill: string) => 
              jobSkill.toLowerCase().includes(skill.toLowerCase()) ||
              skill.toLowerCase().includes(jobSkill.toLowerCase())
            )
          );
          matchPercentage = Math.round((matchedSkills.length / Math.max(skills.length, requiredSkills.length)) * 100);
        }
      }

      return {
        ...job,
        match_percentage: matchPercentage,
        posted_ago: getTimeAgo(job.created_at)
      };
    }) || [];

    // Sort by match percentage if skills filtering is applied
    if (skills && skills.length > 0) {
      jobsWithMatch.sort((a, b) => b.match_percentage - a.match_percentage);
    }

    // Get total count for pagination
    const { count: totalCount } = await supabase
      .from('jobs')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');

    console.log(`Found ${jobs?.length} jobs out of ${totalCount} total`);

    return new Response(
      JSON.stringify({
        jobs: jobsWithMatch,
        total: totalCount || 0,
        hasMore: (offset + limit) < (totalCount || 0)
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Search jobs error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});

function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  
  if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  } else if (diffHours > 0) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  } else if (diffMinutes > 0) {
    return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
  } else {
    return 'Just now';
  }
}