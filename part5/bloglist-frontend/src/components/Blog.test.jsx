import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'Title for my blog test',
  author: 'Author for my blog test',
  url: 'https://testurl.com',
  likes: 666,
  user: {
    username: 'test username',
    name: 'test name'
  }
}

describe('<Blog />', () => {
  test('renders a blog content', () => {
    render(<Blog blog={blog} />)
    screen.debug()
    const title = screen.getByText('Title for my blog test')
    const author = screen.getByText('Author for my blog test')
    const url = screen.getByText('URL: https://testurl.com')
    const likes = screen.getByText('Likes: 666')

    expect(title).toBeDefined()
    expect(author).toBeDefined()
    expect(url).not.toBeVisible()
    expect(likes).not.toBeVisible()
  })

  test('blog extra info is displayed when toggle', async () => {
    render(<Blog blog={blog} />)
    screen.debug()
    const toggleButton = screen.getByText(/View more details/i)
    const user = userEvent.setup()
    const url = screen.getByText('URL: https://testurl.com')
    const likes = screen.getByText('Likes: 666')

    await user.click(toggleButton)

    expect(url).toBeVisible()
    expect(likes).toBeVisible()
  })

  test('blog like button is clicked twice', async () => {
    const handleLike = vi.fn()

    render(<Blog blog={blog} likeFn={handleLike} />)
    screen.debug()
    const toggleButton = screen.getByRole('button', { name: /View more details/i })
    const user = userEvent.setup()
    await user.click(toggleButton)

    const likeButton = screen.getByRole('button', { name: 'Like' })

    await user.click(likeButton)
    await user.click(likeButton)

    expect(handleLike.mock.calls).toHaveLength(2)
  })
})
