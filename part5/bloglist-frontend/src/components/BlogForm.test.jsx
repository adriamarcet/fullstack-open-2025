import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

// const blog = {
//   title: 'Title for my blog test',
//   author: 'Author for my blog test',
//   url: 'https://testurl.com',
//   likes: 666,
//   user: {
//     username: 'test username',
//     name: 'test name'
//   }
// }

describe('<BlogForm />', () => {
  test('BlogForm calls its event handler with the the right details when a new blog is created', async () => {
    const handleAddBlog = vi.fn()

    render(<BlogForm createBlog={handleAddBlog} />)
    screen.debug()
    const inputTitle = screen.getByRole('textbox', { name: /Title/i})
    const inputAuthor = screen.getByRole('textbox', { name: /Author/i})
    const inputUrl = screen.getByRole('textbox', { name: /URL\/Website/i})
    const submitButton = screen.getByRole('button', { name: /Add new blog/i })
    const user = userEvent.setup()
    await user.type(inputTitle, 'A title entered in a test')
    await user.type(inputAuthor, 'A author entered in a test')
    await user.type(inputUrl, 'A url entered in a test')
    await user.click(submitButton)

    expect(handleAddBlog.mock.calls).toHaveLength(1)
    expect(handleAddBlog.mock.calls[0][0].title).toBe('A title entered in a test')
    expect(handleAddBlog.mock.calls[0][0].author).toBe('A author entered in a test')
    expect(handleAddBlog.mock.calls[0][0].url).toBe('A url entered in a test')
  })
})
