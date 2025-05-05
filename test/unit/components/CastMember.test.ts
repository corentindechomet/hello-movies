import type { MovieTeamMember } from '@/types/movieTeamMember';
import CastMember from '@/components/CastMember.vue';
import { mount } from '@vue/test-utils';
import { movieTeamMemberMock } from '~/test/mocks/castMember';

describe('castMember.vue', () => {
  let castMember: MovieTeamMember;

  beforeEach(() => {
    castMember = movieTeamMemberMock;
  });

  it('should use default tag if no "tag" prop is provided', () => {
    const wrapper = mount(CastMember, {
      props: {
        castMember,
      },
    });

    const component = wrapper.findComponent('div');
    expect(component.exists()).toBe(true);
  });

  it('should use "tag" prop if provided', () => {
    const wrapper = mount(CastMember, {
      props: {
        castMember,
        tag: 'li',
      },
    });

    const component = wrapper.find('li');
    expect(component.exists()).toBe(true);
  });

  it('should render team member profile picture', async () => {
    const wrapper = mount(CastMember, {
      props: {
        castMember,
      },
    });
    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe('https://image.tmdb.org/t/p/w185/profile.jpg');
  });

  it('should render a fallback image when profile picture is null', async () => {
    castMember.profile_path = null;
    const wrapper = mount(CastMember, {
      props: {
        castMember,
      },
    });

    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe('/images/fallback_poster.png');
  });

  it('should render cast member name', () => {
    const wrapper = mount(CastMember, {
      props: {
        castMember,
      },
    });

    const name = wrapper.find('[data-testid="cast-member-name"]');
    expect(name.text()).toBe('John Doe');
  });

  it('should render cast member role', () => {
    const wrapper = mount(CastMember, {
      props: {
        castMember,
      },
    });

    const character = wrapper.find('[data-testid="cast-member-role"]');
    expect(character.text()).toBe('as a placeholder name');
  });
});
