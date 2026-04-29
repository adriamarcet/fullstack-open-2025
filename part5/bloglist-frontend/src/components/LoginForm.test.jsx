import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from './LoginForm'

describe('<LoginForm />', () => {
  test('Click on log in button is possible', async () => {
    const mockHandler = vi.fn()
    render(<LoginForm submitAction={mockHandler}  />)

    const user = userEvent.setup()
    const button = screen.getByText('Submit')
    await user.click(button)
    expect(mockHandler.mock.calls).toHaveLength(1)
  })

  test('LoginForm updates parent state and calls onSubmit', async () => {
    const handleSubmit = vi.fn()
    const user = userEvent.setup()

    render(<LoginForm submitAction={handleSubmit} />)
    const input = screen.getByRole('textbox', { name: 'User name' })
    const submitButton = screen.getByRole('button', { name: 'Submit' })

    await user.type(input, 'Stunted Wold (a test user)')
    await user.click(submitButton)
    console.log(handleSubmit.mock.calls)
    expect(handleSubmit.mock.calls).toHaveLength(1)
    expect(handleSubmit.mock.calls[0][0].username).toBe('Stunted Wold (a test user)')
  })
})