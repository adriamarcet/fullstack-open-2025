import { loginWith, addBlog, likeBlog, getLikesInDisplayOrder } from './helper'
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
                .getByTestId('blogTitle'))
                .toHaveText([
                    'A Test Blog from e2e test repo', 
                    'A Test Blog from e2e test repo 2']);
        })

        test('blogs are arranged in the order according to the likes, the blog with the most likes first', async ({ page }) => {
            await addBlog(page, {
                title: 'Blog with least likes',
                author: 'Author A',
                url: 'http://example.com/a',
            })
            await addBlog(page, {
                title: 'Blog with most likes',
                author: 'Author B',
                url: 'http://example.com/b',
            })
            await addBlog(page, {
                title: 'Blog with medium likes',
                author: 'Author C',
                url: 'http://example.com/c',
            })

            await likeBlog(page, 'Blog with most likes', 3)
            await likeBlog(page, 'Blog with medium likes', 2)

            const likesInOrder = await getLikesInDisplayOrder(page)
            expect(likesInOrder).toEqual([3, 2, 0])
        })

        test('a new Blog can be liked', async ({page}) => {
            await addBlog(page, { 
                title: 'A Test Blog from e2e test repo', 
                author: 'Some author from e2e test repo', 
                url: 'http://someurlfrome2etestrepo' 
            })
            const blogCard = page.locator('.blog-item').filter({
                hasText: 'A Test Blog from e2e test repo',
            })
            await expect(blogCard.getByTestId('blogTitle')).toBeVisible()
            await expect(
                blogCard.getByText('A Test Blog from e2e test repo', { exact: true })
            ).toBeVisible()
            await blogCard.getByRole('button', { name: 'View more details' }).click()
            const likesRow = blogCard.locator('li').filter({ hasText: 'Likes:' })
            const likesBefore = Number((await likesRow.textContent()).match(/Likes:\s*(\d+)/)[1])
            await blogCard.getByRole('button', { name: 'Like' }).click()
            await expect
                .poll(async () => {
                    const m = (await likesRow.textContent()).match(/Likes:\s*(\d+)/)
                    return m ? Number(m[1]) : NaN
                })
                .toBe(likesBefore + 1)
        })

        test('the user who added the blog can delete the blog', async ({page}) => {
            await addBlog(page, { 
                title: 'A Test Blog from e2e test repo', 
                author: 'Some author from e2e test repo', 
                url: 'http://someurlfrome2etestrepo' 
            })
            const blogCard = page.locator('.blog-item').filter({
                hasText: 'A Test Blog from e2e test repo',
            })
            await expect(blogCard.getByTestId('blogTitle')).toBeVisible()
            await expect(
                blogCard.getByText('A Test Blog from e2e test repo', { exact: true })
            ).toBeVisible()
            await blogCard.getByRole('button', { name: 'View more details' }).click()
            await expect(
                blogCard.getByRole('button', { name: 'Delete blog' })
            ).toBeVisible()
            page.once('dialog', dialog => dialog.accept())
            await blogCard.getByRole('button', { name: 'Delete blog' }).click()
            await expect(
                blogCard.getByText('A Test Blog from e2e test repo', { exact: true })
            ).not.toBeVisible()
        })

        test('only the user who added the blog sees the blog\'s delete button', async ({page, request}) => {
            await addBlog(page, { 
                title: 'A Test Blog from e2e test repo', 
                author: 'Some author from e2e test repo', 
                url: 'http://someurlfrome2etestrepo' 
            })

            const blogCard = page.locator('.blog-item').filter({
                hasText: 'A Test Blog from e2e test repo',
            })
            await expect(blogCard.getByTestId('blogTitle')).toBeVisible()                        
            await expect(
                blogCard.getByText('A Test Blog from e2e test repo', { exact: true })
            ).toBeVisible()
            await blogCard.getByRole('button', { name: 'View more details' }).click()
            await expect(
                blogCard.getByRole('button', { name: 'Delete blog' })
            ).toBeVisible()

            await request.post('/api/users', {
                data: {
                    name: 'Professor Oberburger',
                    username: 'professor',
                    password: 'starmouse_1000'
                }
            })
            await page.getByRole('button', { name: 'Log out' }).click()
            await loginWith(page, 'professor', 'starmouse_1000')
            await page.getByText(`professor logged in.`).waitFor()
            await expect(page.getByText('professor logged in.')).toBeVisible()

            await blogCard.getByRole('button', { name: 'View more details' }).click()
            await expect(
                blogCard.getByRole('button', { name: 'Delete blog' })
            ).toHaveCount(0)
        })
    })
})