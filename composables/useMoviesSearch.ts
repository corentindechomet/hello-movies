import type { Movie } from '@/types/movie';

export function useMoviesSearch() {
  const searchTerms = ref('');
  const movies = ref<Movie[]>([]);
  const page = ref(1);
  const resultsNumber = ref(0);
  const isLoading = ref(false);

  async function searchMovies() {
    if (isLoading.value)
      return;

    page.value = 1;
    resultsNumber.value = 0;
    isLoading.value = true;
    try {
      const data = await $fetch<{ results: Movie[], total_results: number }>(
        `/api/movies/search?page=${page.value}&searchTerms=${searchTerms.value}`,
      );
      movies.value = data.results;
      resultsNumber.value = data.total_results;
    }
    finally {
      isLoading.value = false;
    }
  }

  async function loadMoreMovies() {
    page.value++;
    const nextPage = await $fetch<{ results: Movie[] }>(
      `/api/movies/search?page=${page.value}&searchTerms=${searchTerms.value}`,
    );
    if (nextPage?.results) {
      movies.value.push(...nextPage.results);
    }
  }

  watch(searchTerms, (newValue) => {
    if (!newValue.trim()) {
      movies.value = [];
      page.value = 1;
    }
  });

  return { searchTerms, movies, page, resultsNumber, isLoading, searchMovies, loadMoreMovies };
}
