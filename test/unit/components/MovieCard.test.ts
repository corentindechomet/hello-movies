import type { VueWrapper } from '@vue/test-utils';
import MovieCard from '@/components/MovieCard.vue';
import { genresMock } from '@/test/mocks/genre';
import { movieMock } from '@/test/mocks/movie';
import { mountSuspended } from '@nuxt/test-utils/runtime';

describe('movieCard', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(async () => {
    wrapper = await mountSuspended(MovieCard, {
      props: {
        movie: movieMock,
        genres: genresMock,
      },
    });
  });

  it('should return correct poster URL from getPoster method', () => {
    const validPosterUrl: string = wrapper.vm.getPoster(movieMock.poster_path);
    expect(validPosterUrl).toBe('https://image.tmdb.org/t/p/w300/dune_2.jpg');

    const fallbackPosterUrl: string = wrapper.vm.getPoster(null);
    expect(fallbackPosterUrl).toBe('/images/fallback_poster.png');
  });

  it('should render movie metadata', () => {
    expect(wrapper.text()).toContain(movieMock.title);
    expect(wrapper.text()).toContain(movieMock.vote_average);
  });
});
