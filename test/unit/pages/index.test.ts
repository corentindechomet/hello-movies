import { mountSuspended } from '@nuxt/test-utils/runtime';
import IndexPage from '~/pages/index.vue';

describe('homepage', () => {
  it('renders and includes movie list', async () => {
    const wrapper = await mountSuspended(IndexPage);
    expect(wrapper.text()).toContain('Browse trending movies');
  });
});
