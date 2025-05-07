<script setup lang="ts">
import { useRatings } from '@/composables/useRatings';
import Editor from '@tinymce/tinymce-vue';
import useVuelidate from '@vuelidate/core';
import { alpha, between, maxLength, minLength, required } from '@vuelidate/validators';

const props = defineProps<{
  movieId: string | string[]
}>();

const { comments } = useRatings(props.movieId);

const config = useRuntimeConfig();
const tinyMceApiKey = ref(config.public.tinyMceApiKey);

const username = ref('');
const message = ref('');
const rating = ref();

const rules = {
  username: {
    required,
    minLength: minLength(3),
    maxLength: maxLength(50),
    alpha,
  },
  message: {
    required,
    minLength: minLength(3),
    maxLength: maxLength(500),
  },
  rating: {
    required,
    between: between(1, 10),
  },
};

const v$ = useVuelidate(rules, { username, message, rating });

async function submit() {
  await v$.value.$validate();
  if (!v$.value.$error) {
    comments.value.unshift({
      username: username.value,
      message: message.value,
      rating: rating.value,
      createdAt: Date.now(),
    });

    username.value = '';
    message.value = '';
    rating.value = 5;

    v$.value.$reset();
  }
}
</script>

<template>
  <div class="p-12 pt-0 bg-linear-to-t/srgb from-white/25 to-transparent">
    <h3 class="text-md font-semibold mb-2">
      Comments
    </h3>
    <div v-if="!comments.length">
      No comment yet ! Leave yours using the form below.
    </div>

    <div v-for="comment in comments" :key="comment.createdAt" class="p-3 bg-white/10 rounded mb-2">
      <p class="font-bold">
        {{ comment.username }} <span class="text-xs opacity-50">({{ comment.rating }}/10)</span>
      </p>
      <div class="text-sm mt-1" v-html="comment.message" />
    </div>

    <div class="w-2/3 mx-auto">
      <h2 class="text-lg font-bold mt-10">
        Leave a comment
      </h2>
      <p class="text-xs mb-5">
        All fields are required
      </p>

      <form class="space-y-4" @submit.prevent="submit">
        <div>
          <label for="username">Username</label>
          <input id="username" v-model="username" type="text" class="border rounded p-2 w-full">
          <p v-if="v$.username.$error" class="text-red-500 text-sm">
            {{ v$.username.$errors[0].$message }}
          </p>
        </div>

        <div>
          <label>Comment</label>
          <p class="text-xs" />
          <Editor
            v-model="message"
            :api-key="tinyMceApiKey"
            :init="{
              skin: 'oxide-dark',
              content_css: 'dark',
              height: 250,
              menubar: false,
            }"
          />
          <p v-if="v$.message.$error" class="text-red-500 text-sm">
            {{ v$.message.$errors[0].$message }}
          </p>
        </div>

        <div>
          <label for="rating">Rating</label>
          <input id="rating" v-model.number="rating" type="number" min="1" max="10" class="border rounded p-2 w-20">
          <p v-if="v$.rating.$error" class="text-red-500 text-sm">
            {{ v$.rating.$errors[0].$message }}
          </p>
        </div>

        <button type="submit" class="bg-pink-900/90 hover:bg-pink-900 text-white px-4 py-2 cursor-pointer rounded">
          Envoyer
        </button>
      </form>
    </div>
  </div>
</template>
