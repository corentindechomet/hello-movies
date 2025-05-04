import { movieMock, movieMock2 } from '@/test/mocks/movie';

describe('useMoviesSearch', () => {
  const mockFetch = vi.fn();

  let search: ReturnType<typeof useMoviesSearch>;

  beforeAll(() => {
    search = useMoviesSearch();
    vi.stubGlobal('$fetch', mockFetch);
  });

  afterEach(() => {
    mockFetch.mockReset();
  });

  it('should fetch movies', async () => {
    mockFetch.mockResolvedValueOnce({
      results: [movieMock],
      total_results: 1,
    });

    await search.searchMovies();

    expect(mockFetch).toHaveBeenCalledWith('/api/movies/search?page=1&searchTerms=');
    expect(search.movies.value).toHaveLength(1);
    expect(search.movies.value[0].title).toBe(movieMock.title);
    expect(search.resultsNumber.value).toBe(1);
  });

  it('should load more movies on loadMoreMovies()', async () => {
    search.searchTerms.value = 'Dune';
    search.movies.value = [movieMock];
    search.page.value = 1;

    mockFetch.mockResolvedValueOnce({
      results: [movieMock2],
    });

    await search.loadMoreMovies();

    expect(mockFetch).toHaveBeenCalledWith('/api/movies/search?page=2&searchTerms=Dune');
    expect(search.page.value).toBe(2);
    expect(search.movies.value).toHaveLength(2);
    expect(search.movies.value[0].title).toBe(movieMock.title);
    expect(search.movies.value[1].title).toBe(movieMock2.title);
  });

  it('should reset movies and page when input is cleared', async () => {
    search.movies.value = [movieMock];
    search.page.value = 3;
    search.searchTerms.value = 'test';

    search.searchTerms.value = ' ';

    await nextTick();

    expect(search.movies.value).toHaveLength(0);
    expect(search.page.value).toBe(1);
  });
});
