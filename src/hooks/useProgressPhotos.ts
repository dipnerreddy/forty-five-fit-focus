
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ProgressPhoto {
  id: string;
  user_id: string;
  photo_url: string;
  day_number: number;
  caption?: string;
  created_at: string;
}

export const useProgressPhotos = () => {
  const [photos, setPhotos] = useState<ProgressPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase
        .from('progress_photos')
        .select('*')
        .eq('user_id', session.user.id)
        .order('day_number', { ascending: false });

      if (error) throw error;
      setPhotos(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch photos');
    } finally {
      setIsLoading(false);
    }
  };

  const uploadPhoto = async (file: File, dayNumber: number, caption?: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      // Upload to storage (for now we'll use a placeholder URL)
      const fileName = `${session.user.id}/${dayNumber}_${Date.now()}.jpg`;
      const photoUrl = `https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop`;

      const { error } = await supabase
        .from('progress_photos')
        .insert({
          user_id: session.user.id,
          photo_url: photoUrl,
          day_number: dayNumber,
          caption: caption
        });

      if (error) throw error;
      await fetchPhotos();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload photo');
      throw err;
    }
  };

  return { photos, isLoading, error, uploadPhoto, refetch: fetchPhotos };
};
