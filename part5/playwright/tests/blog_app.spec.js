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
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'Playwright test blog', 'Playwright', 'https://playwright.dev/')
      
      // La prueba debe garantizar que un nuevo blog es visible en la lista de todos los blogs
      await expect(page.getByText('a new blog Playwright test blog by Playwright added')).toBeVisible()
      await expect(page.locator('.blog').filter({ hasText: 'Playwright test blog Playwright' })).toBeVisible()
    })

    test('a blog can be liked (edited)', async ({ page }) => {
      await createBlog(page, 'Playwright test blog', 'Playwright', 'https://playwright.dev/')
      
      const blog = page.locator('.blog').filter({ hasText: 'Playwright test blog Playwright' })
      await blog.getByRole('button', { name: 'view' }).click()
      
      const likeButton = blog.getByRole('button', { name: 'like' })
      await likeButton.click()
      
      await expect(blog.getByText('likes 1')).toBeVisible()
    })

    test('user who created a blog can delete it', async ({ page }) => {
      await createBlog(page, 'Playwright test blog', 'Playwright', 'https://playwright.dev/')
      
      const blog = page.locator('.blog').filter({ hasText: 'Playwright test blog Playwright' })
      await blog.getByRole('button', { name: 'view' }).click()

      page.on('dialog', dialog => dialog.accept())

      await blog.getByRole('button', { name: 'remove' }).click()
      
      await expect(page.locator('.blog').filter({ hasText: 'Playwright test blog Playwright' })).not.toBeVisible()
    })

    test('only the creator can see the delete button', async ({ page, request }) => {
      await createBlog(page, 'Playwright test blog', 'Playwright', 'https://playwright.dev/')
      
      await page.getByRole('button', { name: 'logout' }).click()

      // Create another user
      await request.post('/api/users', {
        data: {
          name: 'Other User',
          username: 'other',
          password: 'password'
        }
      })

      // Log in with the other user
      await loginWith(page, 'other', 'password')

      const blog = page.locator('.blog').filter({ hasText: 'Playwright test blog Playwright' })
      await blog.getByRole('button', { name: 'view' }).click()
      
      await expect(blog.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })

    test('blogs are ordered according to likes', async ({ page }) => {
      await createBlog(page, 'First Blog', 'Author 1', 'http://1')
      await createBlog(page, 'Second Blog', 'Author 2', 'http://2')
      await createBlog(page, 'Third Blog', 'Author 3', 'http://3')

      // wait for all blogs to be present
      await expect(page.locator('.blog').filter({ hasText: 'First Blog Author 1' })).toBeVisible()
      await expect(page.locator('.blog').filter({ hasText: 'Second Blog Author 2' })).toBeVisible()
      await expect(page.locator('.blog').filter({ hasText: 'Third Blog Author 3' })).toBeVisible()

      const blog1 = page.locator('.blog').filter({ hasText: 'First Blog Author 1' })
      const blog2 = page.locator('.blog').filter({ hasText: 'Second Blog Author 2' })
      const blog3 = page.locator('.blog').filter({ hasText: 'Third Blog Author 3' })

      await blog1.getByRole('button', { name: 'view' }).click()
      await blog2.getByRole('button', { name: 'view' }).click()
      await blog3.getByRole('button', { name: 'view' }).click()

      // give 2 likes to blog 2
      await blog2.getByRole('button', { name: 'like' }).click()
      await blog2.getByText('likes 1').waitFor()
      await blog2.getByRole('button', { name: 'like' }).click()
      await blog2.getByText('likes 2').waitFor()

      // give 3 likes to blog 3
      await blog3.getByRole('button', { name: 'like' }).click()
      await blog3.getByText('likes 1').waitFor()
      await blog3.getByRole('button', { name: 'like' }).click()
      await blog3.getByText('likes 2').waitFor()
      await blog3.getByRole('button', { name: 'like' }).click()
      await blog3.getByText('likes 3').waitFor()

      // To ensure sorting finishes updating visually
      await page.waitForTimeout(500)

      const titles = await page.locator('.blog-title-author').allTextContents()
      
      // React might append ' view' or ' hide' to the text contents because of the button
      // But the order should be: Third Blog, Second Blog, First Blog
      expect(titles[0]).toContain('Third Blog')
      expect(titles[1]).toContain('Second Blog')
      expect(titles[2]).toContain('First Blog')
    })
  })
})
