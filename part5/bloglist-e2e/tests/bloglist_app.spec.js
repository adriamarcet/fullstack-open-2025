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

    test('Login form is shown', async ({ page }) => {
        const loginForm = page.locator('.form-card')
        await loginForm.waitFor()
        await expect(loginForm).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'mitkey', 'starmouse_1000')
            await page.getByText(`mitkey logged in.`).waitFor()
            await expect(page.getByText('mitkey logged in.')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'mitkey', 'starmouse_1001')
            await expect(page.getByText('Invalid username or password')).toBeVisible()
            await expect(page.getByText('mitkey logged in.')).not.toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({page}) => {
            await loginWith(page, 'mitkey', 'starmouse_1000')
            await page.getByText(`mitkey logged in.`).waitFor()
            await expect(page.getByText('mitkey logged in.')).toBeVisible()
        })
    
        test('a new blog can be created', async ({page}) => {
            await addBlog(page, { 
                title: 'A Test Blog from e2e test repo', 
                author: 'Some author from e2e test repo', 
                url: 'http://someurlfrome2etestrepo' 
            })

            await expect(page.getByTestId('blogItem')).toBeVisible();
            await expect(page.getByText('A Test Blog from e2e test repo', { exact: true })).toBeVisible()
        })

        test('two new Blogs can be added', async ({page}) => {
            await addBlog(page, { 
                title: 'A Test Blog from e2e test repo', 
                author: 'Some author from e2e test repo', 
                url: 'http://someurlfrome2etestrepo' 
            })

            await addBlog(page, { 
                title: 'A Test Blog from e2e test repo 2', 
                author: 'Some author from e2e test repo 2', 
                url: 'http://someurlfrome2etestrepo2' 
            })

            await expect(page.locator('.blog-list')).toBeVisible();
            await expect(page.getByTestId('blogItem')).toHaveCount(2);
            await expect(page
                .getByTestId('blogItem'))
                .toHaveText([
                    'A Test Blog from e2e test repo by Some author from e2e test repo', 
                    'A Test Blog from e2e test repo 2 by Some author from e2e test repo 2']);
        })
    })
})