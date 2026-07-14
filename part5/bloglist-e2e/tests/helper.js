const loginWith = async (page, username, password) => {
    await page.getByLabel('User name').fill(username)
    await page.getByLabel('Password').fill(password)
    await Promise.all([
        page.getByRole('button', { name: 'Submit'}).click(),
        page.waitForResponse(response =>
            response.url().includes('/api/login') &&
            response.request().method() === 'POST'
        )
    ])
}

const addBlog = async (page, blog) => {
    await page.goto('/create')
    await page.getByLabel('Title').fill(blog.title)
    await page.getByLabel('Author').fill(blog.author)
    await page.getByLabel('URL/Website').fill(blog.url)
    await Promise.all([
        page.getByRole('button', { name: 'Add blog' }).click(),
        page.waitForResponse(response =>
            response.url().includes('/api/blogs') && response.request().method() === 'POST' && response.ok()
        )
    ])
}

const likeBlog = async (page, title, times) => {
    const blogCard = page.locator('.blog-item').filter({
        has: page.getByTestId('blogTitle').filter({ hasText: title, exact: true }),
    })
    await blogCard.getByRole('button', { name: 'View more details' }).click()
    const likeButton = blogCard.getByRole('button', { name: 'Like' })
    for (let i = 0; i < times; i++) {
        await Promise.all([
            likeButton.click(),
            page.waitForResponse(response =>
                response.url().includes('/api/blogs') &&
                response.request().method() === 'PUT' &&
                response.ok()
            ),
        ])
    }
}

const getLikesInDisplayOrder = async (page) => {
    const blogItems = page.getByTestId('blogItem')
    const count = await blogItems.count()
    const likes = []

    for (let i = 0; i < count; i++) {
        const blog = blogItems.nth(i)
        const viewMoreButton = blog.getByRole('button', { name: 'View more details' })
        if (await viewMoreButton.isVisible()) {
            await viewMoreButton.click()
        }
        const likesRow = blog.locator('li').filter({ hasText: 'Likes:' })
        const likesText = await likesRow.textContent()
        likes.push(Number(likesText.match(/Likes:\s*(\d+)/)[1]))
    }

    return likes
}

export { loginWith, addBlog, likeBlog, getLikesInDisplayOrder }