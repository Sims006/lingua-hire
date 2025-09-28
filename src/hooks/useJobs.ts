import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  location: string;
  salary_min: number;
  salary_max: number;
  salary_currency: string;
  job_type: string;
  experience_level: string;
  is_remote: boolean;
  is_urgent: boolean;
  required_skills: string[];
  optional_skills: string[];
  views_count: number;
  applications_count: number;
  created_at: string;
  match_percentage?: number;
  posted_ago?: string;
}

export interface SearchFilters {
  searchQuery?: string;
  location?: string;
  jobType?: string;
  salaryMin?: number;
  salaryMax?: number;
  skills?: string[];
}

export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);

  const searchJobs = async (filters: SearchFilters = {}, offset = 0) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: searchError } = await supabase.functions.invoke('search-jobs', {
        body: {
          ...filters,
          limit: 20,
          offset
        }
      });

      if (searchError) {
        throw new Error(searchError.message);
      }

      if (offset === 0) {
        setJobs(data.jobs);
      } else {
        setJobs(prev => [...prev, ...data.jobs]);
      }

      setTotal(data.total);
      setHasMore(data.hasMore);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search jobs');
      console.error('Search jobs error:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreJobs = async (filters: SearchFilters = {}) => {
    if (!hasMore || loading) return;
    await searchJobs(filters, jobs.length);
  };

  const getFeaturedJobs = async () => {
    await searchJobs({ jobType: 'all' }, 0);
  };

  useEffect(() => {
    getFeaturedJobs();
  }, []);

  return {
    jobs,
    loading,
    error,
    hasMore,
    total,
    searchJobs,
    loadMoreJobs,
    getFeaturedJobs
  };
};

export const useJobOperations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createJob = async (jobData: any, userId: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: createError } = await supabase.functions.invoke('job-operations', {
        body: {
          action: 'create',
          jobData,
          userId
        }
      });

      if (createError) {
        throw new Error(createError.message);
      }

      return data.job;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create job');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateJob = async (jobId: string, jobData: any, userId: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: updateError } = await supabase.functions.invoke('job-operations', {
        body: {
          action: 'update',
          jobId,
          jobData,
          userId
        }
      });

      if (updateError) {
        throw new Error(updateError.message);
      }

      return data.job;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update job');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (jobId: string, userId: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: deleteError } = await supabase.functions.invoke('job-operations', {
        body: {
          action: 'delete',
          jobId,
          userId
        }
      });

      if (deleteError) {
        throw new Error(deleteError.message);
      }

      return data.success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete job');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getEmployerJobs = async (userId: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase.functions.invoke('job-operations', {
        body: {
          action: 'get-employer-jobs',
          userId
        }
      });

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      return data.jobs;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch jobs');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createJob,
    updateJob,
    deleteJob,
    getEmployerJobs
  };
};