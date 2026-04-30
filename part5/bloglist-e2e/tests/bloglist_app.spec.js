const { test, expect } = require('@playwright/test')

test('front page can be opened', async({ page }) => {
    await page.goto('http://localhost:5173')

    const locator = page.getByText('Blogs List APP')
    await expect(locator).toBeVisible()
})