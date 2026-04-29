import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'

describe('<Togglable />', () => {
    beforeEach(() => {
        render(
            <Togglable buttonLabel="Show more">
                <div>Content inside this togglable element</div>
            </Togglable>
        )
    })

    test('renders its children', () => {
        screen.getByText('Content inside this togglable element')
    })

    test('at strat children are not displayed', () => {
        const element = screen.getByText('Content inside this togglable element')
        expect(element).not.toBeVisible()
    })

    test('after clicking the button children content is displayed', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('Show more')
        await user.click(button)
        const element = screen.getByText('Content inside this togglable element')
        expect(element).toBeVisible()
    })

    test('toggled content can be closed', async () => {
        screen.debug()
        const user = userEvent.setup()
        const button = screen.getByText('Show more')
        await user.click(button)
        const element = screen.getByText('Content inside this togglable element')

        const closeButton = screen.getByText('Close')
        await user.click(closeButton)
        expect(element).not.toBeVisible()
    })
})
