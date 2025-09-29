-- Fix security warning for increment_job_views function by setting search_path
CREATE OR REPLACE FUNCTION increment_job_views(job_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.jobs 
  SET views_count = views_count + 1 
  WHERE id = job_id;
END;
$$;