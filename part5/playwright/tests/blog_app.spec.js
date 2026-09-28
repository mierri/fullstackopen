const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {

  beforeEach(async ({ page, request }) => {
    // empty the db
    await request.post('/api/testing/reset')
    // create a user for the backend
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await page.getByRole('link', { name: 'login' }).click()
    await expect(page.getByRole('heading', { name: 'log in to application' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'wrong')

      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('wrong username or password')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

      await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('logged in')).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'Playwright test blog', 'Playwright', 'https://playwright.dev/')
      
      await expect(page.getByText('a new blog Playwright test blog by Playwright added')).toBeVisible()
      await expect(page.locator('.blog-title-author').filter({ hasText: 'Playwright test blog Playwright' })).toBeVisible()
    })

    test('a blog can be liked (edited)', async ({ page }) => {
      await createBlog(page, 'Playwright test blog', 'Playwright', 'https://playwright.dev/')
      
      const blogLink = page.getByRole('link', { name: 'Playwright test blog Playwright' })
      await blogLink.click()
      
      const likeButton = page.getByRole('button', { name: 'like' })
      await likeButton.click()
      
      await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('user who created a blog can delete it', async ({ page }) => {
      await createBlog(page, 'Playwright test blog', 'Playwright', 'https://playwright.dev/')
      
      const blogLink = page.getByRole('link', { name: 'Playwright test blog Playwright' })
      await blogLink.click()

      page.on('dialog', dialog => dialog.accept())

      await page.getByRole('button', { name: 'remove' }).click()
      
      await expect(page.locator('.blog-title-author').filter({ hasText: 'Playwright test blog Playwright' })).not.toBeVisible()
    })
  })
})
