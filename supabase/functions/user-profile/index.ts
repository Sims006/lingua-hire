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

    const { action, profileData, userId } = await req.json();

    console.log('Profile operation:', { action, userId });

    switch (action) {
      case 'get': {
        if (!userId) {
          return new Response(
            JSON.stringify({ error: 'Missing user ID' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
          );
        }

        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', userId)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Get profile error:', profileError);
          return new Response(
            JSON.stringify({ error: 'Failed to fetch profile' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
          );
        }

        return new Response(
          JSON.stringify({ profile: profile || null }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'create': {
        if (!profileData || !userId) {
          return new Response(
            JSON.stringify({ error: 'Missing profile data or user ID' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
          );
        }

        const { data: profile, error: createError } = await supabase
          .from('profiles')
          .insert({
            ...profileData,
            user_id: userId
          })
          .select()
          .single();

        if (createError) {
          console.error('Create profile error:', createError);
          return new Response(
            JSON.stringify({ error: 'Failed to create profile' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
          );
        }

        return new Response(
          JSON.stringify({ profile }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'update': {
        if (!profileData || !userId) {
          return new Response(
            JSON.stringify({ error: 'Missing profile data or user ID' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
          );
        }

        const { data: profile, error: updateError } = await supabase
          .from('profiles')
          .upsert({
            ...profileData,
            user_id: userId
          })
          .select()
          .single();

        if (updateError) {
          console.error('Update profile error:', updateError);
          return new Response(
            JSON.stringify({ error: 'Failed to update profile' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
          );
        }

        return new Response(
          JSON.stringify({ profile }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'search-candidates': {
        const { skills, location, experienceLevel, limit = 20, offset = 0 } = profileData || {};

        let query = supabase
          .from('profiles')
          .select('*')
          .eq('user_type', 'job_seeker')
          .eq('is_available', true)
          .order('created_at', { ascending: false });

        if (skills && skills.length > 0) {
          // Use overlap operator to find profiles with matching skills
          query = query.overlaps('skills', skills);
        }

        if (location && location.trim()) {
          query = query.ilike('location', `%${location}%`);
        }

        if (experienceLevel) {
          // Assuming experience_years mapping: entry: 0-2, mid: 3-5, senior: 6+
          if (experienceLevel === 'entry') {
            query = query.lte('experience_years', 2);
          } else if (experienceLevel === 'mid') {
            query = query.gte('experience_years', 3).lte('experience_years', 5);
          } else if (experienceLevel === 'senior') {
            query = query.gte('experience_years', 6);
          }
        }

        query = query.range(offset, offset + limit - 1);

        const { data: candidates, error: candidatesError } = await query;

        if (candidatesError) {
          console.error('Search candidates error:', candidatesError);
          return new Response(
            JSON.stringify({ error: 'Failed to search candidates' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
          );
        }

        // Calculate match percentage for each candidate
        const candidatesWithMatch = candidates?.map(candidate => {
          let matchPercentage = 100;

          if (skills && skills.length > 0 && candidate.skills) {
            const matchedSkills = skills.filter((skill: string) => 
              candidate.skills.some((candidateSkill: string) => 
                candidateSkill.toLowerCase().includes(skill.toLowerCase()) ||
                skill.toLowerCase().includes(candidateSkill.toLowerCase())
              )
            );
            matchPercentage = Math.round((matchedSkills.length / skills.length) * 100);
          }

          return {
            ...candidate,
            match_percentage: matchPercentage
          };
        }) || [];

        // Sort by match percentage
        candidatesWithMatch.sort((a, b) => b.match_percentage - a.match_percentage);

        return new Response(
          JSON.stringify({ candidates: candidatesWithMatch }),
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
    console.error('Profile operations error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});