-- Create core application tables for job platform functionality

-- Jobs table for job postings
CREATE TABLE public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  salary_min INTEGER,
  salary_max INTEGER,
  salary_currency TEXT DEFAULT 'USD',
  job_type TEXT NOT NULL CHECK (job_type IN ('full-time', 'part-time', 'contract', 'freelance')),
  experience_level TEXT CHECK (experience_level IN ('entry', 'mid', 'senior', 'executive')),
  is_remote BOOLEAN DEFAULT false,
  is_urgent BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'closed', 'draft')),
  required_skills TEXT[] DEFAULT '{}',
  optional_skills TEXT[] DEFAULT '{}',
  employer_id UUID NOT NULL,
  views_count INTEGER DEFAULT 0,
  applications_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE
);

-- User profiles table for both job seekers and employers
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  email TEXT NOT NULL,
  full_name TEXT,
  user_type TEXT NOT NULL CHECK (user_type IN ('job_seeker', 'employer')),
  avatar_url TEXT,
  location TEXT,
  bio TEXT,
  company_name TEXT, -- for employers
  company_size TEXT, -- for employers
  website_url TEXT, -- for employers
  
  -- Job seeker specific fields
  resume_url TEXT,
  skills TEXT[] DEFAULT '{}',
  experience_years INTEGER,
  job_title TEXT,
  salary_expectation_min INTEGER,
  salary_expectation_max INTEGER,
  preferred_job_types TEXT[] DEFAULT '{}',
  is_available BOOLEAN DEFAULT true,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Job applications table
CREATE TABLE public.job_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID NOT NULL,
  applicant_id UUID NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'shortlisted', 'rejected', 'hired')),
  cover_letter TEXT,
  resume_url TEXT,
  match_percentage INTEGER DEFAULT 0,
  applied_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(job_id, applicant_id)
);

-- Messages/chat system
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID NOT NULL,
  sender_id UUID NOT NULL,
  recipient_id UUID NOT NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Conversations table
CREATE TABLE public.conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_seeker_id UUID NOT NULL,
  employer_id UUID NOT NULL,
  job_id UUID,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'blocked', 'archived')),
  last_message_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(job_seeker_id, employer_id, job_id)
);

-- Job matches/saved jobs
CREATE TABLE public.job_matches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID NOT NULL,
  job_seeker_id UUID NOT NULL,
  match_percentage INTEGER NOT NULL DEFAULT 0,
  is_saved BOOLEAN DEFAULT false,
  is_hidden BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(job_id, job_seeker_id)
);

-- Enable RLS on all tables
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_matches ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for jobs table
CREATE POLICY "Jobs are viewable by everyone" ON public.jobs
  FOR SELECT USING (status = 'active');

CREATE POLICY "Employers can manage their own jobs" ON public.jobs
  FOR ALL USING (employer_id = auth.uid());

-- Create RLS policies for profiles table
CREATE POLICY "Profiles are viewable by authenticated users" ON public.profiles
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can manage their own profile" ON public.profiles
  FOR ALL USING (user_id = auth.uid());

-- Create RLS policies for job applications
CREATE POLICY "Job applications viewable by job owner and applicant" ON public.job_applications
  FOR SELECT USING (
    applicant_id = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM public.jobs 
      WHERE jobs.id = job_applications.job_id 
      AND jobs.employer_id = auth.uid()
    )
  );

CREATE POLICY "Job seekers can create applications" ON public.job_applications
  FOR INSERT WITH CHECK (applicant_id = auth.uid());

CREATE POLICY "Job applications can be updated by owner or employer" ON public.job_applications
  FOR UPDATE USING (
    applicant_id = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM public.jobs 
      WHERE jobs.id = job_applications.job_id 
      AND jobs.employer_id = auth.uid()
    )
  );

-- Create RLS policies for messages
CREATE POLICY "Messages viewable by sender and recipient" ON public.messages
  FOR SELECT USING (sender_id = auth.uid() OR recipient_id = auth.uid());

CREATE POLICY "Users can send messages" ON public.messages
  FOR INSERT WITH CHECK (sender_id = auth.uid());

-- Create RLS policies for conversations
CREATE POLICY "Conversations viewable by participants" ON public.conversations
  FOR SELECT USING (job_seeker_id = auth.uid() OR employer_id = auth.uid());

CREATE POLICY "Users can create conversations" ON public.conversations
  FOR INSERT WITH CHECK (job_seeker_id = auth.uid() OR employer_id = auth.uid());

-- Create RLS policies for job matches
CREATE POLICY "Job matches viewable by job seeker" ON public.job_matches
  FOR SELECT USING (job_seeker_id = auth.uid());

CREATE POLICY "Job seekers can manage their matches" ON public.job_matches
  FOR ALL USING (job_seeker_id = auth.uid());

-- Add foreign key constraints
ALTER TABLE public.job_applications 
  ADD CONSTRAINT fk_job_applications_job_id 
  FOREIGN KEY (job_id) REFERENCES public.jobs(id) ON DELETE CASCADE;

ALTER TABLE public.messages 
  ADD CONSTRAINT fk_messages_conversation_id 
  FOREIGN KEY (conversation_id) REFERENCES public.conversations(id) ON DELETE CASCADE;

ALTER TABLE public.job_matches 
  ADD CONSTRAINT fk_job_matches_job_id 
  FOREIGN KEY (job_id) REFERENCES public.jobs(id) ON DELETE CASCADE;

-- Create indexes for better performance
CREATE INDEX idx_jobs_status ON public.jobs(status);
CREATE INDEX idx_jobs_location ON public.jobs(location);
CREATE INDEX idx_jobs_skills ON public.jobs USING GIN(required_skills);
CREATE INDEX idx_jobs_created_at ON public.jobs(created_at DESC);
CREATE INDEX idx_profiles_user_type ON public.profiles(user_type);
CREATE INDEX idx_profiles_skills ON public.profiles USING GIN(skills);
CREATE INDEX idx_job_applications_status ON public.job_applications(status);
CREATE INDEX idx_messages_conversation_id ON public.messages(conversation_id);
CREATE INDEX idx_conversations_participants ON public.conversations(job_seeker_id, employer_id);

-- Create triggers for updated_at columns
CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON public.jobs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_job_applications_updated_at
  BEFORE UPDATE ON public.job_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();