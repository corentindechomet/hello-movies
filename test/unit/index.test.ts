import { $fetch, setup } from '@nuxt/test-utils'

describe('index page', async () => {
  await setup({
    server: true,
  })

  it('renders the homepage and contains expected text', async () => {
    const html = await $fetch('/')
    expect(html).toContain('Hello')
  })
})
