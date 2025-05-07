<script setup lang="ts">
import type { Genre } from '@/types/genre';
import type { Movie } from '@/types/movie';

const props = defineProps<{
  movie: Movie
  genres: Genre[]
}>();

const imageBaseUrl = 'https://image.tmdb.org/t/p/w300';
function getPoster(path: string | null) {
  return path ? `${imageBaseUrl}${path}` : '/images/fallback_poster.png';
}

const genresLabel = computed(() =>
  props.movie.genre_ids
    .map(id => props.genres.find(genre => genre.id === id)?.name)
    .join(', '),
);
</script>

<template>
  <NuxtLink :to="`/movie/${movie.id}`" class="relative block overflow-hidden lg:h-80" data-testid="movie-card">
    <img
      :src="getPoster(movie.poster_path)"
      alt="Affiche du film"
      class="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
    >

    <p v-if="movie.genre_ids.length && genres.length" class="absolute top-0 backdrop-blur-sm bg-black/80 p-2 m-2 rounded-md text-xs opacity-75">
      {{ genresLabel }}
    </p>

    <div class="absolute bottom-0  left-0 right-0 w-full backdrop-blur-sm bg-black/60 p-4">
      <h3 class="text-sm font-bold uppercase">
        {{ movie.title }}
      </h3>
      <p class="flex items-center gap-1 text-xs opacity-75">
        <Icon name="uil:star" />
        {{ movie.vote_average.toFixed(1) }}
      </p>
    </div>
  </NuxtLink>
</template>
