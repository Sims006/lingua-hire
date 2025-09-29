-- Add database function to increment job views
CREATE OR REPLACE FUNCTION increment_job_views(job_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.jobs 
  SET views_count = views_count + 1 
  WHERE id = job_id;
END;
$$;

-- Insert some sample data to get started
DO $$
DECLARE
  employer1_id UUID := gen_random_uuid();
  employer2_id UUID := gen_random_uuid();
  employer3_id UUID := gen_random_uuid();
BEGIN
  -- Create sample employer profiles
  INSERT INTO public.profiles (user_id, email, full_name, user_type, company_name, company_size, website_url, location) VALUES
    (employer1_id, 'hr@techglobal.com', 'TechGlobal HR Team', 'employer', 'TechGlobal Inc.', '500-1000', 'https://techglobal.com', 'San Francisco, CA'),
    (employer2_id, 'hiring@designstudios.com', 'Design Studios Hiring', 'employer', 'Design Studios', '50-100', 'https://designstudios.com', 'London, UK'),
    (employer3_id, 'jobs@ai-innovations.com', 'AI Innovations Talent', 'employer', 'AI Innovations', '100-500', 'https://ai-innovations.com', 'Berlin, Germany');

  -- Create sample jobs
  INSERT INTO public.jobs (title, company, description, location, salary_min, salary_max, salary_currency, job_type, experience_level, is_remote, is_urgent, required_skills, optional_skills, employer_id) VALUES
    ('Senior Full Stack Developer', 'TechGlobal Inc.', 'We are looking for an experienced full stack developer to join our growing team. You will work on cutting-edge web applications using React, Node.js, and modern cloud technologies.', 'Remote • Global', 80000, 120000, 'USD', 'full-time', 'senior', true, true, ARRAY['React', 'Node.js', 'TypeScript', 'PostgreSQL'], ARRAY['AWS', 'Docker', 'GraphQL'], employer1_id),
    ('UX/UI Designer', 'Design Studios', 'Join our creative team as a UX/UI Designer. Design beautiful and intuitive user experiences for web and mobile applications.', 'London, UK', 45000, 65000, 'GBP', 'contract', 'mid', false, false, ARRAY['Figma', 'Sketch', 'Prototyping', 'User Research'], ARRAY['Adobe Creative Suite', 'InVision', 'Principle'], employer2_id),
    ('Data Scientist', 'AI Innovations', 'Work with cutting-edge AI and machine learning technologies. Analyze large datasets and build predictive models.', 'Remote • Europe', 60000, 85000, 'EUR', 'full-time', 'senior', true, true, ARRAY['Python', 'Machine Learning', 'SQL', 'TensorFlow'], ARRAY['PyTorch', 'R', 'Big Data', 'Cloud Computing'], employer3_id),
    ('Frontend Developer', 'TechGlobal Inc.', 'Build modern, responsive web applications using React and TypeScript. Work closely with our design team.', 'San Francisco, CA', 70000, 100000, 'USD', 'full-time', 'mid', false, false, ARRAY['React', 'TypeScript', 'CSS', 'HTML'], ARRAY['Next.js', 'Tailwind CSS', 'Redux'], employer1_id),
    ('Product Manager', 'Design Studios', 'Lead product development initiatives and work cross-functionally with engineering and design teams.', 'London, UK', 55000, 80000, 'GBP', 'full-time', 'senior', false, false, ARRAY['Product Strategy', 'Agile', 'Analytics', 'Roadmapping'], ARRAY['SQL', 'Wireframing', 'A/B Testing'], employer2_id);

  -- Create sample job seeker profiles
  INSERT INTO public.profiles (user_id, email, full_name, user_type, location, bio, skills, experience_years, job_title, salary_expectation_min, salary_expectation_max, preferred_job_types, is_available) VALUES
    (gen_random_uuid(), 'sarah.chen@email.com', 'Sarah Chen', 'job_seeker', 'San Francisco, CA', 'Experienced frontend developer with 6 years of experience building modern web applications.', ARRAY['React', 'TypeScript', 'JavaScript', 'CSS', 'Node.js'], 6, 'Senior Frontend Developer', 90000, 130000, ARRAY['full-time'], true),
    (gen_random_uuid(), 'marcus.johnson@email.com', 'Marcus Johnson', 'job_seeker', 'Remote', 'Full stack engineer passionate about building scalable applications.', ARRAY['React', 'Python', 'AWS', 'Docker', 'PostgreSQL'], 5, 'Full Stack Engineer', 75000, 110000, ARRAY['full-time', 'contract'], true),
    (gen_random_uuid(), 'ana.rodriguez@email.com', 'Ana Rodriguez', 'job_seeker', 'Madrid, Spain', 'Creative frontend developer with expertise in Vue.js and modern web technologies.', ARRAY['Vue.js', 'JavaScript', 'CSS', 'HTML', 'Sass'], 4, 'Frontend Developer', 40000, 60000, ARRAY['full-time'], true);
END $$;