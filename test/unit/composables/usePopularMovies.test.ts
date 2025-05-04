import type { Movie } from '@/types/movie';
import { movieMock, movieMock2 } from '@/test/mocks/movie';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('usePopularMovies', () => {
  const initialMovies: Movie[] = [movieMock];
  const mockFetch = vi.fn();

  let popularMoviesSearch: ReturnType<typeof usePopularMovies>;

  beforeEach(() => {
    mockFetch.mockReset();
    popularMoviesSearch = usePopularMovies();
    vi.stubGlobal('$fetch', mockFetch);
  });

  afterEach(() => {
    mockFetch.mockReset();
  });

  it('should load more movies on loadMorePopularMovies()', async () => {
    popularMoviesSearch.popularMovies.value = [movieMock];
    popularMoviesSearch.page.value = 1;

    mockFetch.mockResolvedValueOnce({
      results: [movieMock2],
    });

    await popularMoviesSearch.loadMorePopularMovies();

    expect(mockFetch).toHaveBeenCalledWith('/api/movies/popular?page=2');
    expect(popularMoviesSearch.page.value).toBe(2);
    expect(popularMoviesSearch.popularMovies.value).toHaveLength(2);
    expect(popularMoviesSearch.popularMovies.value[0].title).toBe(movieMock.title);
    expect(popularMoviesSearch.popularMovies.value[1].title).toBe(movieMock2.title);
  });
});
