<script setup lang="ts">
import { useMoviesSearch } from '@/composables/useMoviesSearch';
import { usePopularMovies } from '@/composables/usePopularMovies';

const { popularMovies, loadMorePopularMovies } = usePopularMovies();
const { searchTerms, movies, resultsNumber, searchMovies, loadMoreMovies } = useMoviesSearch();

const route = useRoute();
const querySearchTerms = route.query.searchTerms;

if (querySearchTerms) {
  searchTerms.value = (querySearchTerms as string);
  searchMovies();
}
</script>

<template>
  <div class="container mx-auto py-16 px-8 md:px-0">
    <h2 class="text-5xl font-black mb-8">
      Search movies by title
    </h2>
    <form
      class="max-w-md mb-8"
      @submit.prevent="searchMovies"
    >
      <label for="search-for-movies" class="sr-only">Search</label>
      <div class="relative flex items-center">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Icon name="uil:search" class="text-gray-400" />
        </div>
        <input
          id="search-for-movies"
          v-model="searchTerms"
          placeholder="e.g: Dune, Harry Potter, Interstellar, ..."
          type="text"
          class="w-full bg-slate-800 rounded p-4 ps-10 text-sm"
          @keyup.enter="searchMovies"
        >
        <button
          type="submit"
          class="text-white absolute end-2.5 bg-pink-900 hover:bg-pink-950 font-medium rounded-lg text-sm px-4 py-2 cursor-pointer"
        >
          Search
        </button>
      </div>
    </form>

    <MovieList
      v-if="searchTerms && movies.length"
      :movies="movies"
      :results-number="resultsNumber"
      @scroll-end="loadMoreMovies"
    />

    <template v-else>
      <div class="flex items-center w-full gap-8 my-16 text-slate-500">
        <span class="h-0.5 w-full bg-slate-800" />
        OR
        <span class="h-0.5 w-full bg-slate-800" />
      </div>

      <h2 class="text-5xl font-black mb-8">
        Browse trending movies
      </h2>
      <MovieList :movies="popularMovies" @scroll-end="loadMorePopularMovies" />
    </template>
  </div>
</template>
