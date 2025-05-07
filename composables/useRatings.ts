import type { Comment } from '@/types/comment';
import { useStorage } from '@vueuse/core';

/**
 * Utilisation de useStorage de Vueuse, à la manière d'un store
 * me permettant de partager l'état des commentaires entre
 * le composant CommentSection et la page d'un film
 * @param movieId
 */
export function useRatings(movieId: string | string[]) {
  const id = Array.isArray(movieId) ? movieId[0] : movieId;
  const localStorageKey = `movie-comments-${id}`;

  const comments = useStorage<Comment[]>(localStorageKey, []);
  const averageRating = computed(() => {
    const total = comments.value.reduce((sum, comment) => sum + comment.rating, 0);
    return total / comments.value.length;
  });
  return {
    comments,
    averageRating,
  };
}
