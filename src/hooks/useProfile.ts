import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Profile {
  id: string;
  user_id: string;
  email: string;
  full_name: string;
  user_type: 'job_seeker' | 'employer';
  avatar_url?: string;
  location?: string;
  bio?: string;
  company_name?: string;
  company_size?: string;
  website_url?: string;
  resume_url?: string;
  skills: string[];
  experience_years?: number;
  job_title?: string;
  salary_expectation_min?: number;
  salary_expectation_max?: number;
  preferred_job_types: string[];
  is_available: boolean;
  created_at: string;
  updated_at: string;
  match_percentage?: number;
}

export const useProfile = (userId?: string) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProfile = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase.functions.invoke('user-profile', {
        body: {
          action: 'get',
          userId: id
        }
      });

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      setProfile(data.profile);
      return data.profile;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch profile');
      console.error('Get profile error:', err);
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async (profileData: Partial<Profile>, id: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: createError } = await supabase.functions.invoke('user-profile', {
        body: {
          action: 'create',
          profileData,
          userId: id
        }
      });

      if (createError) {
        throw new Error(createError.message);
      }

      setProfile(data.profile);
      return data.profile;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData: Partial<Profile>, id: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: updateError } = await supabase.functions.invoke('user-profile', {
        body: {
          action: 'update',
          profileData,
          userId: id
        }
      });

      if (updateError) {
        throw new Error(updateError.message);
      }

      setProfile(data.profile);
      return data.profile;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      getProfile(userId);
    }
  }, [userId]);

  return {
    profile,
    loading,
    error,
    getProfile,
    createProfile,
    updateProfile
  };
};

export const useCandidateSearch = () => {
  const [candidates, setCandidates] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchCandidates = async (searchParams: {
    skills?: string[];
    location?: string;
    experienceLevel?: string;
    limit?: number;
    offset?: number;
  } = {}) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: searchError } = await supabase.functions.invoke('user-profile', {
        body: {
          action: 'search-candidates',
          profileData: searchParams
        }
      });

      if (searchError) {
        throw new Error(searchError.message);
      }

      setCandidates(data.candidates);
      return data.candidates;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search candidates');
      console.error('Search candidates error:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    candidates,
    loading,
    error,
    searchCandidates
  };
};