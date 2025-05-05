import type { MovieTeamMember } from '~/types/movieTeamMember';

export interface MovieDetails {
  id: number
  title: string
  poster_path: string | null
  backdrop_path: string | null
  overview: string
  vote_average: number
  genres: Array<{ id: number, name: string }>
  vote_count: number
  credits: {
    cast: MovieTeamMember[]
    crew: MovieTeamMember[]
  }
}
