-- Enable Row Level Security on all admin tables
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_moderation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_management ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.keyword_management ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check admin session
CREATE OR REPLACE FUNCTION public.is_admin(session_token text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM admin_sessions 
    WHERE token = session_token 
    AND expires_at > now()
  );
$$;

-- Create basic RLS policies for admin access only
-- Admin users can only be accessed by authenticated admins
CREATE POLICY "Admin users accessible by authenticated admins only" 
ON public.admin_users 
FOR ALL 
USING (false); -- Will be managed through custom authentication

-- Admin sessions can only be accessed during authentication
CREATE POLICY "Admin sessions for authentication only" 
ON public.admin_sessions 
FOR ALL 
USING (false); -- Will be managed through custom authentication

-- Content moderation accessible by any authenticated admin
CREATE POLICY "Content moderation for admins" 
ON public.content_moderation 
FOR ALL 
USING (false); -- Will be managed through custom authentication

-- User management accessible by any authenticated admin
CREATE POLICY "User management for admins" 
ON public.user_management 
FOR ALL 
USING (false); -- Will be managed through custom authentication

-- Analytics events accessible by any authenticated admin
CREATE POLICY "Analytics for admins" 
ON public.analytics_events 
FOR ALL 
USING (false); -- Will be managed through custom authentication

-- Keyword management accessible by any authenticated admin
CREATE POLICY "Keywords for admins" 
ON public.keyword_management 
FOR ALL 
USING (false); -- Will be managed through custom authentication