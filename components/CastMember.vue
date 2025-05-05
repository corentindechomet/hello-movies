<script setup lang="ts">
import type { MovieTeamMember } from '@/types/movieTeamMember';
import type { PropType } from 'vue';

const props = defineProps({
  castMember: {
    type: Object as PropType<MovieTeamMember>,
    required: true,
  },
  tag: {
    type: String,
    default: 'div',
  },
});

const imageBaseUrl = 'https://image.tmdb.org/t/p/';
const profilPictureSize = 'w185';
const profilPicture = computed(() => {
  const imgUrl = props.castMember.profile_path;
  if (!imgUrl)
    return '/images/fallback_poster.png';

  return imageBaseUrl + profilPictureSize + imgUrl;
});
</script>

<template>
  <component :is="tag" class="flex flex-col gap-2 items-center text-center -ml-1 opacity-90 hover:z-10 hover:opacity-100 transition">
    <img v-if="profilPicture" class="block rounded-full h-20 w-20 object-cover border border-gray-400" :src="profilPicture" alt="">
    <div class="w-16">
      <p class="font-bold block text-[10px] flex justify-center" data-testid="cast-member-name">
        {{ castMember.name }}
      </p>
      <p class="opacity-75 text-[10px]" data-testid="cast-member-role">
        as {{ castMember.character }}
      </p>
    </div>
  </component>
</template>
