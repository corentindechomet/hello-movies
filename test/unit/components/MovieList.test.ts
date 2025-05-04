import MovieList from '@/components/MovieList.vue';
import { genresMock } from '@/test/mocks/genre';
import { movieMock } from '@/test/mocks/movie';
import { mountSuspended } from '@nuxt/test-utils/runtime';

describe('movieList', () => {
  let observeMock: ReturnType<typeof vi.fn>;
  let unobserveMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    observeMock = vi.fn();
    unobserveMock = vi.fn();

    global.IntersectionObserver = vi.fn().mockImplementation(() => {
      return {
        observe: observeMock,
        unobserve: unobserveMock,
        disconnect: vi.fn(),
        takeRecords: vi.fn(),
        root: null,
        rootMargin: '',
        thresholds: [],
      };
    });
  });

  it('renders a list of movie cards', async () => {
    const wrapper = await mountSuspended(MovieList, {
      props: {
        movies: [movieMock, movieMock, movieMock],
        genres: genresMock,
      },
    });

    expect(wrapper.findAllComponents('[data-testid="movie-card"]')).toHaveLength(3);
  });

  it('emits scrollEnd when user reaches end of page', async () => {
    const wrapper = await mountSuspended(MovieList, {
      props: {
        movies: [movieMock],
        genres: genresMock,
      },
    });

    const callback = (global.IntersectionObserver as any).mock.calls[0][0];
    callback([{ isIntersecting: true }]);

    expect(wrapper.emitted('scrollEnd')).toBeTruthy();
  });

  it('remove observer on unmount', async () => {
    const wrapper = await mountSuspended(MovieList, {
      props: {
        movies: [movieMock],
        genres: genresMock,
      },
    });

    await wrapper.unmount();
    expect(unobserveMock).toHaveBeenCalled();
  });
});
