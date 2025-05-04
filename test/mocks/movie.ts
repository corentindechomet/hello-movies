import type { Movie } from '@/types/movie';

export const movieMock: Movie = {
  id: 1,
  title: 'Dune : Deuxième Partie',
  vote_average: 8.2,
  genre_ids: [1, 2],
  poster_path: '/dune_2.jpg',
};

export const movieMock2: Movie = {
  id: 1,
  title: 'Donnie Darko',
  vote_average: 7.8,
  genre_ids: [14, 18],
  poster_path: '/donnie_darko.jpg',
};
