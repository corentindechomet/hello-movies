import type { Movie } from '@/types/movie';

export function usePopularMovies() {
  const popularMovies = ref<Movie[]>([]);
  const page = ref(1);
  const isLoading = ref(false);

  async function loadMorePopularMovies() {
    if (isLoading.value)
      return;

    isLoading.value = true;
    page.value++;
    try {
      const nextPage = await $fetch<{ results: Movie[] }>(
        `/api/movies/popular?page=${page.value}`,
      );
      if (nextPage?.results) {
        popularMovies.value.push(...nextPage.results);
      }
    }
    finally {
      isLoading.value = false;
    }
  }

  return { popularMovies, loadMorePopularMovies, isLoading, page };
}
