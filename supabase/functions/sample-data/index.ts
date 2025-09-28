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
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    console.log('Creating sample data...');

    // Create sample employer profiles
    const sampleEmployers = [
      {
        user_id: crypto.randomUUID(),
        email: 'hr@techglobal.com',
        full_name: 'TechGlobal HR Team',
        user_type: 'employer',
        company_name: 'TechGlobal Inc.',
        company_size: '500-1000',
        website_url: 'https://techglobal.com',
        location: 'San Francisco, CA'
      },
      {
        user_id: crypto.randomUUID(),
        email: 'hiring@designstudios.com',
        full_name: 'Design Studios Hiring',
        user_type: 'employer',
        company_name: 'Design Studios',
        company_size: '50-100',
        website_url: 'https://designstudios.com',
        location: 'London, UK'
      },
      {
        user_id: crypto.randomUUID(),
        email: 'jobs@ai-innovations.com',
        full_name: 'AI Innovations Talent',
        user_type: 'employer',
        company_name: 'AI Innovations',
        company_size: '100-500',
        website_url: 'https://ai-innovations.com',
        location: 'Berlin, Germany'
      }
    ];

    const { data: employers, error: employersError } = await supabase
      .from('profiles')
      .insert(sampleEmployers)
      .select();

    if (employersError) {
      console.error('Error creating employers:', employersError);
      return new Response(
        JSON.stringify({ error: 'Failed to create sample employers' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    // Create sample jobs
    const sampleJobs = [
      {
        title: 'Senior Full Stack Developer',
        company: 'TechGlobal Inc.',
        description: 'We are looking for an experienced full stack developer to join our growing team. You will work on cutting-edge web applications using React, Node.js, and modern cloud technologies.',
        location: 'Remote • Global',
        salary_min: 80000,
        salary_max: 120000,
        salary_currency: 'USD',
        job_type: 'full-time',
        experience_level: 'senior',
        is_remote: true,
        is_urgent: true,
        required_skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
        optional_skills: ['AWS', 'Docker', 'GraphQL'],
        employer_id: employers![0].user_id
      },
      {
        title: 'UX/UI Designer',
        company: 'Design Studios',
        description: 'Join our creative team as a UX/UI Designer. Design beautiful and intuitive user experiences for web and mobile applications.',
        location: 'London, UK',
        salary_min: 45000,
        salary_max: 65000,
        salary_currency: 'GBP',
        job_type: 'contract',
        experience_level: 'mid',
        is_remote: false,
        is_urgent: false,
        required_skills: ['Figma', 'Sketch', 'Prototyping', 'User Research'],
        optional_skills: ['Adobe Creative Suite', 'InVision', 'Principle'],
        employer_id: employers![1].user_id
      },
      {
        title: 'Data Scientist',
        company: 'AI Innovations',
        description: 'Work with cutting-edge AI and machine learning technologies. Analyze large datasets and build predictive models.',
        location: 'Remote • Europe',
        salary_min: 60000,
        salary_max: 85000,
        salary_currency: 'EUR',
        job_type: 'full-time',
        experience_level: 'senior',
        is_remote: true,
        is_urgent: true,
        required_skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
        optional_skills: ['PyTorch', 'R', 'Big Data', 'Cloud Computing'],
        employer_id: employers![2].user_id
      },
      {
        title: 'Frontend Developer',
        company: 'TechGlobal Inc.',
        description: 'Build modern, responsive web applications using React and TypeScript. Work closely with our design team.',
        location: 'San Francisco, CA',
        salary_min: 70000,
        salary_max: 100000,
        salary_currency: 'USD',
        job_type: 'full-time',
        experience_level: 'mid',
        is_remote: false,
        is_urgent: false,
        required_skills: ['React', 'TypeScript', 'CSS', 'HTML'],
        optional_skills: ['Next.js', 'Tailwind CSS', 'Redux'],
        employer_id: employers![0].user_id
      },
      {
        title: 'Product Manager',
        company: 'Design Studios',
        description: 'Lead product development initiatives and work cross-functionally with engineering and design teams.',
        location: 'London, UK',
        salary_min: 55000,
        salary_max: 80000,
        salary_currency: 'GBP',
        job_type: 'full-time',
        experience_level: 'senior',
        is_remote: false,
        is_urgent: false,
        required_skills: ['Product Strategy', 'Agile', 'Analytics', 'Roadmapping'],
        optional_skills: ['SQL', 'Wireframing', 'A/B Testing'],
        employer_id: employers![1].user_id
      }
    ];

    const { data: jobs, error: jobsError } = await supabase
      .from('jobs')
      .insert(sampleJobs)
      .select();

    if (jobsError) {
      console.error('Error creating jobs:', jobsError);
      return new Response(
        JSON.stringify({ error: 'Failed to create sample jobs' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    // Create sample job seeker profiles
    const sampleJobSeekers = [
      {
        user_id: crypto.randomUUID(),
        email: 'sarah.chen@email.com',
        full_name: 'Sarah Chen',
        user_type: 'job_seeker',
        location: 'San Francisco, CA',
        bio: 'Experienced frontend developer with 6 years of experience building modern web applications.',
        skills: ['React', 'TypeScript', 'JavaScript', 'CSS', 'Node.js'],
        experience_years: 6,
        job_title: 'Senior Frontend Developer',
        salary_expectation_min: 90000,
        salary_expectation_max: 130000,
        preferred_job_types: ['full-time'],
        is_available: true
      },
      {
        user_id: crypto.randomUUID(),
        email: 'marcus.johnson@email.com',
        full_name: 'Marcus Johnson',
        user_type: 'job_seeker',
        location: 'Remote',
        bio: 'Full stack engineer passionate about building scalable applications.',
        skills: ['React', 'Python', 'AWS', 'Docker', 'PostgreSQL'],
        experience_years: 5,
        job_title: 'Full Stack Engineer',
        salary_expectation_min: 75000,
        salary_expectation_max: 110000,
        preferred_job_types: ['full-time', 'contract'],
        is_available: true
      },
      {
        user_id: crypto.randomUUID(),
        email: 'ana.rodriguez@email.com',
        full_name: 'Ana Rodriguez',
        user_type: 'job_seeker',
        location: 'Madrid, Spain',
        bio: 'Creative frontend developer with expertise in Vue.js and modern web technologies.',
        skills: ['Vue.js', 'JavaScript', 'CSS', 'HTML', 'Sass'],
        experience_years: 4,
        job_title: 'Frontend Developer',
        salary_expectation_min: 40000,
        salary_expectation_max: 60000,
        preferred_job_types: ['full-time'],
        is_available: true
      }
    ];

    const { data: jobSeekers, error: jobSeekersError } = await supabase
      .from('profiles')
      .insert(sampleJobSeekers)
      .select();

    if (jobSeekersError) {
      console.error('Error creating job seekers:', jobSeekersError);
      return new Response(
        JSON.stringify({ error: 'Failed to create sample job seekers' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    console.log('Sample data created successfully');

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Sample data created successfully',
        data: {
          employers: employers?.length,
          jobs: jobs?.length,
          jobSeekers: jobSeekers?.length
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Sample data creation error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});