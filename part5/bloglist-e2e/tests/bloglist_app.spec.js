import { loginWith, addBlog } from './helper'
const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Bloglist App', () => {
    beforeEach(async ({page, request}) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: 'Mitkey the Starmouse',
                username: 'mitkey',
                password: 'starmouse_1000'
            }
        })

        await page.goto('/')
    })

    test('front page can be opened', async({ page }) => {
        const locator = page.getByText('Blogs List APP')
        await expect(locator).toBeVisible()
    })

    test('user can log in', async ({ page }) => {
        await loginWith(page, 'mitkey', 'starmouse_1000')
        await expect(page.getByText('Mitkey the Starmouse logged in')).toBeVisible()
    })

    test('login fails with wrong password', async ({ page }) => {
        await loginWith(page, 'mitkey', 'starmouse_1001')
        await expect(page.getByText('Invalid username or password')).toBeVisible()
        await expect(page.getByText('Mitkey the Starmouse logged in')).not.toBeVisible()
    })

    describe('When login in...', () => {
        beforeEach(async ({page}) => {
            await loginWith(page, 'mitkey', 'starmouse_1000')
        })
    
        test('a new Blog can be added.', async ({page}) => {
            await addBlog(page, { 
                title: 'A Test Blog from e2e test repo', 
                author: 'Some author from e2e test repo', 
                url: 'http://someurlfrome2etestrepo' 
            })
    
            await expect(page.getByTestId('username')).toBeVisible()
        })
    })
})