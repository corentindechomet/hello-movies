<script setup lang="ts">
import type { Genre } from '@/types/genre';
import type { Movie } from '@/types/movie';
import { ref } from 'vue';

const { data } = await useAsyncData('movies-and-genres', async () => {
  const [moviesData, genresData] = await Promise.all([
    $fetch<{ results: Movie[] }>('/api/movies/popular?page=1'),
    $fetch<{ genres: Genre[] }>('/api/movies/genres'),
  ]);

  return {
    movies: moviesData.results,
    genres: genresData.genres,
  };
});

const movies = ref<Movie[]>(data.value?.movies || []);
const genres = ref<Genre[]>(data.value?.genres || []);

const page = ref(1);
const isLoading = ref(false);
async function loadMoreMovies() {
  if (isLoading.value)
    return;

  isLoading.value = true;
  page.value++;
  try {
    const nextPage = await $fetch<{ results: Movie[] }>(
      `/api/movies/popular?page=${page.value}`,
    );
    if (nextPage?.results) {
      movies.value.push(...nextPage.results);
    }
  }
  finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="container mx-auto">
    <h2 class="text-5xl font-black my-8">
      Browse trending movies
    </h2>
    <MovieList :movies="movies" :genres="genres" @scroll-end="loadMoreMovies" />
  </div>
</template>
