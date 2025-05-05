import type { MovieDetails } from '@/types/movieDetails';
import type { MovieTeamMember } from '@/types/movieTeamMember';

export function useMovieById() {
  const movie = ref<MovieDetails>();
  const crew = ref<MovieTeamMember[]>();
  const cast = ref<MovieTeamMember[]>();
  const isLoading = ref(false);

  async function fetchMovieById(id: string | string[]) {
    try {
      const data = await $fetch<MovieDetails>(
        `/api/movies/details?id=${id}`,
      );
      movie.value = data;
      crew.value = data.credits.crew;
      cast.value = data.credits.cast;
    }
    finally {
      isLoading.value = false;
    }
  }

  return { movie, cast, crew, fetchMovieById, isLoading };
}
