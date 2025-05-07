import { useRatings } from '@/composables/useRatings';
import { commentsMock } from '@/test/mocks/comments';

const fakeComments = commentsMock;
vi.mock('@vueuse/core', () => ({
  useStorage: vi.fn(() => ({
    value: [...fakeComments],
  })),
}));

describe('useRatings', () => {
  it('load comments from useStorage', () => {
    const { comments } = useRatings('1');
    expect(comments.value).toHaveLength(2);
    expect(comments.value[0].username).toBe('John Doe');
  });

  it('computed average rating', () => {
    const { averageRating } = useRatings('1');
    expect(averageRating.value).toBe((commentsMock[0].rating + commentsMock[1].rating) / commentsMock.length);
  });
});
