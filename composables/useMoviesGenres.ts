import type { Genre } from '@/types/genre';

export function useMoviesGenres() {
  const { data: genresData } = useAsyncData('genres', () =>
    $fetch<{ genres: Genre[] }>('/api/movies/genres'));

  const genres = computed(() => genresData.value?.genres || []);

  return {
    genres,
  };
}
