<script setup lang="ts">
import CastMember from '@/components/CastMember.vue';
import { useMovieById } from '@/composables/useMovieById';
import { useRatings } from '@/composables/useRatings';

const route = useRoute();

const { movie, cast, crew, fetchMovieById } = useMovieById();
const movieId = ref(route.params._id);
fetchMovieById(movieId.value);

const { comments, averageRating } = useRatings(movieId.value);

const directors = computed(() => {
  if (!crew.value?.length)
    return [];

  return crew.value.filter(member => member.job === 'Director').map(director => director.name).join(', ');
});

const imageBaseUrl = 'https://image.tmdb.org/t/p/';
const backdropImageSize = 'w1280';
const movieBackdrop = computed(() => {
  const imgUrl = movie.value?.backdrop_path || movie.value?.poster_path;

  if (!imgUrl)
    return null;

  return imageBaseUrl + backdropImageSize + imgUrl;
});

const posterSize = 'w342';
const moviePoster = computed(() => {
  const imgUrl = movie.value?.poster_path;
  if (!imgUrl)
    return null;

  return imageBaseUrl + posterSize + imgUrl;
});
</script>

<template>
  <div
    v-if="movie"
    class="w-full min-h-screen bg-cover bg-center bg-fixed"
    :style="{ backgroundImage: `url(${movieBackdrop})` }"
  >
    <div class="flex flex-col bg-black/80 pb-0">
      <a class="absolute top-10 ml-8 cursor-pointer flex items-center gap-2 transition hover:-translate-x-1  hover:bg-slate-500/50 rounded p-2" @click="$router.back()">
        <Icon name="material-symbols:arrow-back-rounded" />
        Back to movies list
      </a>
      <div class="flex gap-10 mt-30 pb-12 px-8">
        <img v-if="moviePoster" :src="moviePoster" class="hidden md:block w-52 h-fit" alt="Affiche du film">
        <div class="flex flex-col gap-8 max-w-150">
          <div class="flex flex-col gap-2">
            <h1 class="text-5xl font-extrabold">
              {{ movie.title }}
            </h1>
            <p v-if="directors" class="opacity-80">
              {{ directors }}
            </p>
          </div>
          <p v-if="movie.overview" class="opacity-60">
            {{ movie.overview }}
          </p>
          <ul v-if="cast" class="flex">
            <CastMember v-for="castMember in cast.slice(0, 5)" :key="castMember.id" :cast-member="castMember" tag="li" />
          </ul>
          <div v-if="movie.vote_average" class="flex gap-4 items-end">
            <span>
              TMDB ratings : <span class="text-2xl font-extrabold bg-pink-900 p-2 rounded">{{ movie.vote_average.toFixed(2) }}</span> / 10
            </span>
            <span class="flex items-center gap-2" title="Nombre de votants">
              <Icon name="material-symbols:group-outline-rounded" />
              {{ movie.vote_count }}
            </span>
          </div>
          <div v-if="averageRating" class="flex gap-4 items-end">
            <span>
              HelloMovies users ratings : <span class="text-2xl font-extrabold bg-pink-900 p-2 rounded">{{ averageRating.toFixed(2) }}</span> / 10
            </span>
            <span class="flex items-center gap-2" title="Nombre de votants">
              <Icon name="material-symbols:group-outline-rounded" />
              {{ comments.length }}
            </span>
          </div>
          <div v-if="movie.genres" class="flex gap-2">
            <span v-for="genre of movie.genres" :key="genre.id" class="bg-slate-500/25 hover:bg-slate-500/50 transition rounded p-2 rounded inline">{{ genre.name }}</span>
          </div>
        </div>
      </div>
      <CommentsSection :movie-id="movieId" />
    </div>
  </div>
</template>
