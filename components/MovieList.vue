<script setup lang="ts">
import type { Movie } from '@/types/movie';
import MovieCard from '@/components/MovieCard.vue';
import { ref } from 'vue';
import { useMoviesGenres } from '~/composables/useMoviesGenres';

defineProps<{
  movies: Movie[]
  resultsNumber?: number
}>();

const emit = defineEmits(['scrollEnd']);

const { genres } = useMoviesGenres();

const loadMoreAnchor = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;
let observedElement: HTMLElement | null = null;

onMounted(() => {
  if (loadMoreAnchor.value) {
    observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        emit('scrollEnd');
      }
    });

    observedElement = loadMoreAnchor.value;
    observer.observe(observedElement);
  }
});

onUnmounted(() => {
  if (observer && observedElement) {
    observer.unobserve(observedElement);
  }
});
</script>

<template>
  <p
    v-if="resultsNumber"
    class="text-slate-400 font-bold text-sm mb-2"
    data-testid="results-number"
  >
    {{ resultsNumber }} résultat{{ resultsNumber > 1 ? 's' : '' }}
  </p>

  <ul class="grid grid-cols-4 gap-4">
    <li v-for="movie in movies" :key="movie.id">
      <MovieCard :movie="movie" :genres="genres" />
    </li>
    <span ref="loadMoreAnchor" class="h-1 w-full" />
  </ul>
</template>
