import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'
import BlogForm from './BlogForm'

test('renders title and author, but not url or likes by default', () => {
  const blog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testblog.com',
    likes: 5,
    user: {
      username: 'testuser',
      name: 'Test User'
    }
  }
  render(<Blog blog={blog} />)

    const titleElement = screen.getByText('Test Blog Title', { exact: false })
    const authorElement = screen.getByText('Test Author', { exact: false })
    const urlElement = screen.queryByText('http://testblog.com')
    const likesElement = screen.queryByText('likes 5')

    expect(titleElement).toBeDefined()
    expect(authorElement).toBeDefined()
    expect(urlElement).toBeNull()
    expect(likesElement).toBeNull()
})

test('renders url and likes when the view button is clicked', async () => {
  const blog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testblog.com',
    likes: 5,
    user: {
        username: 'testuser',
        name: 'Test User'
    }
  }

  const mockUpdateBlog = vi.fn()

  render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const urlElement = screen.getByText('http://testblog.com')
    const likesElement = screen.getByText('likes 5')
    expect(urlElement).toBeDefined()
    expect(likesElement).toBeDefined()
})

test('clicking the like button twice calls the event handler twice', async () => {
  const blog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testblog.com',
    likes: 5,
    user: {
      username: 'testuser',
      name: 'Test User'
    }
  }

  const mockUpdateBlog = vi.fn()

  render(<Blog blog={blog} updateBlog={mockUpdateBlog} />)

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockUpdateBlog).toHaveBeenCalledTimes(2)
})

test('submitting the blog form calls the event handler with the right details', async () => {
    const mockCreateBlog = vi.fn()

    render(<BlogForm createBlog={mockCreateBlog} />)
    
    const user = userEvent.setup()
    const titleInput = screen.getByPlaceholderText('title')
    const authorInput = screen.getByPlaceholderText('author')
    const urlInput = screen.getByPlaceholderText('url')
    const submitButton = screen.getByText('create')

    await user.type(titleInput, 'New Blog Title')
    await user.type(authorInput, 'New Blog Author')
    await user.type(urlInput, 'http://newblog.com')
    await user.click(submitButton)

    expect(mockCreateBlog).toHaveBeenCalledTimes(1)
    expect(mockCreateBlog).toHaveBeenCalledWith({
        title: 'New Blog Title',
        author: 'New Blog Author',
        url: 'http://newblog.com'
    })
})