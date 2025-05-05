import type { MovieDetails } from '@/types/movieDetails';

export const movieDetailsMock: MovieDetails = {
  id: 1,
  title: 'Harry Potter à l\'école des sorciers',
  overview: 'Orphelin, le jeune Harry Potter peut enfin quitter ses tyranniques oncle et tante Dursley lorsqu\'un curieux messager lui révèle qu\'il est un sorcier. À 11 ans, Harry va enfin pouvoir intégrer la légendaire école de sorcellerie de Poudlard, y trouver une famille digne de ce nom et des amis, développer ses dons, et préparer son glorieux avenir.',
  backdrop_path: '/backdrop_path.jpg',
  poster_path: '/poster.jpg',
  vote_average: 7.90,
  genres: [{ id: 1, name: 'Aventure' }, { id: 1, name: 'Fantastique' }],
  vote_count: 28170,
  credits: {
    crew: [
      { id: 1, name: 'Chris Columbus', job: 'Director', profile_path: null },
    ],
    cast: [
      { id: 2, name: 'Daniel Radcliffe', character: 'Harry Potter', profile_path: null },
    ],
  },
};
