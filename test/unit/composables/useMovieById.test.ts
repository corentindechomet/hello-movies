import type { MovieDetails } from '@/types/movieDetails';
import { useMovieById } from '@/composables/useMovieById';
import { flushPromises } from '@vue/test-utils';
import { movieDetailsMock } from '~/test/mocks/movieDetails';

vi.mock('#app', () => ({
  $fetch: vi.fn(),
}));

const mockMovieDetails: MovieDetails = movieDetailsMock;

describe('useMovieById', () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('$fetch', mockFetch);
  });

  afterEach(() => {
    mockFetch.mockReset();
  });

  it('fetches movie details', async () => {
    mockFetch.mockResolvedValueOnce(mockMovieDetails);

    const { movie, crew, cast, fetchMovieById, isLoading } = useMovieById();

    await fetchMovieById('1');
    await flushPromises();

    expect(mockFetch).toHaveBeenCalledWith('/api/movies/details?id=1');
    expect(movie.value).toEqual(mockMovieDetails);
    expect(cast.value).toEqual(mockMovieDetails.credits.cast);
    expect(crew.value).toEqual(mockMovieDetails.credits.crew);
    expect(isLoading.value).toBe(false);
  });
});
