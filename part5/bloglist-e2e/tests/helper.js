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
    await page.getByRole('button', { name: 'Add new Blog'}).click()
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

export { loginWith, addBlog }