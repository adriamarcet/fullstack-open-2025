const loginWith = async (page, username, password) => {
    await page.getByRole('button', { name: 'Log in'}).click()
    await page.getByLabel('User name').fill(username)
    await page.getByLabel('Password').fill(password)
    await page.getByRole('button', { name: 'Submit'}).click()
}

const addBlog = async (page, blog) => {
    await page.getByRole('button', { name: 'Add new Blog'}).click()
    await page.getByLabel('Title').fill(blog.title)
    await page.getByLabel('Author').fill(blog.author)
    await page.getByLabel('URL/Website').fill(blog.url)
    await page.getByRole('button', { name: 'Add new Blog'}).click()
}

export { loginWith, addBlog }