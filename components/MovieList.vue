<script setup lang="ts">
import type { Genre } from '~/types/genre';
import type { Movie } from '~/types/movie';
import { ref } from 'vue';
import MovieCard from '~/components/MovieCard.vue';

defineProps<{
  movies: Movie[]
  genres: Genre[]
}>();

const emit = defineEmits(['scrollEnd']);

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
  <ul class="grid grid-cols-4 gap-4">
    <li v-for="movie in movies" :key="movie.id">
      <MovieCard :movie="movie" :genres="genres" />
    </li>
    <span ref="loadMoreAnchor" class="h-1 w-full" />
  </ul>
</template>
