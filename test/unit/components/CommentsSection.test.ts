import type { Comment } from '@/types/comment';
import CommentsSection from '@/components/CommentsSection.vue';
import { mount } from '@vue/test-utils';
import { vi } from 'vitest';

const mockComments = ref<Comment[]>([]);

vi.mock('@/composables/useRatings', () => ({
  useRatings: () => ({
    comments: mockComments,
  }),
}));

// Remplacement de TinyMCE par un textarea dans le cadre des tests.
vi.mock('@tinymce/tinymce-vue', () => ({
  default: {
    name: 'Editor',
    props: ['modelValue'],
    emits: ['update:modelValue'],
    template: '<textarea @input="$emit(\'update:modelValue\', $event.target.value)"></textarea>',
  },
}));

describe('commentsSection', () => {
  it('renders no comments label if not comments', async () => {
    const wrapper = await mount(CommentsSection, {
      props: { movieId: '123' },
    });

    expect(wrapper.text()).toContain('No comment yet ! Leave yours using the form below.');
  });

  it('submits form and adds a comment', async () => {
    const wrapper = await mount(CommentsSection, {
      props: { movieId: '123' },
    });

    await wrapper.get('#username').setValue('John');
    await wrapper.find('textarea').setValue('Very good movie');
    await wrapper.get('#rating').setValue(9);

    await wrapper.find('form').trigger('submit.prevent');
    await nextTick();
    await nextTick();

    expect(mockComments.value.length).toBe(1);
    expect(mockComments.value[0].username).toBe('John');
    expect(mockComments.value[0].message).toBe('Very good movie');
    expect(mockComments.value[0].rating).toBe(9);
  });

  it('shows error if a required field is empty', async () => {
    const wrapper = await mount(CommentsSection, {
      props: { movieId: '123' },
    });

    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.text()).toContain('is required');
  });
});
