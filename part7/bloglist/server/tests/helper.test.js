const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('dummy', () => {
  test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const blog = {
      title: 'Test Blog',
      author: 'Test Author',
      likes: 5
    }

    const result = listHelper.totalLikes([blog])
    assert.strictEqual(result, 5)
  })

  test('of a bigger list is calculated right', () => {
    const blogs = [
      { title: 'Blog 1', author: 'Author 1', likes: 5 },
      { title: 'Blog 2', author: 'Author 2', likes: 10 },
      { title: 'Blog 3', author: 'Author 3', likes: 15 }
    ]

    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 30)
  })
})

describe('blog with the most likes', () => {
  test('returns the blog with the most likes', () => {
    const blogs = [
      { title: 'Blog 1', author: 'Author 1', likes: 5 },
      { title: 'Blog 2', author: 'Author 2', likes: 10 },
      { title: 'Blog 3', author: 'Author 3', likes: 15 }
    ]

    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, { title: 'Blog 3', author: 'Author 3', likes: 15 })
  })

  test('returns null for an empty list', () => {
    const result = listHelper.favoriteBlog([])
    assert.strictEqual(result, null)
  })

})

describe('author with the most blogs', () => {
  test('returns the author with the most blogs', () => {
    const blogs = [
      { title: 'Blog 1', author: 'Author 1', likes: 5 },
      { title: 'Blog 2', author: 'Author 2', likes: 10 },
      { title: 'Blog 3', author: 'Author 1', likes: 15 }
    ]

    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, { author: 'Author 1', blogs: 2 })
  })

  test('returns null for an empty list', () => {
    const result = listHelper.mostBlogs([])
    assert.strictEqual(result, null)
  })
})

describe('author with the most likes', () => {
  test('returns the author with the most likes', () => {
    const blogs = [
      { title: 'Blog 1', author: 'Author 1', likes: 5 },
      { title: 'Blog 2', author: 'Author 2', likes: 10 },
      { title: 'Blog 3', author: 'Author 1', likes: 15 }
    ]

    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, { author: 'Author 1', likes: 20 })
  })

  test('returns null for an empty list', () => {
    const result = listHelper.mostLikes([])
    assert.strictEqual(result, null)
  })
})