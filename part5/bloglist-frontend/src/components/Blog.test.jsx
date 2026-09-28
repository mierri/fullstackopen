import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 5,
    user: {
      username: 'testuser',
      name: 'Test User'
    }
  }

  test('renders blog info and likes to unauthenticated users, no buttons shown', () => {
    const { container } = render(<Blog blog={blog} currentUser={null} />)

    expect(screen.getByText('Test Blog Title Test Author')).toBeInTheDocument()
    expect(screen.getByText('http://testurl.com')).toBeInTheDocument()
    expect(container).toHaveTextContent('likes 5')

    const likeButton = screen.queryByRole('button', { name: 'like' })
    const removeButton = screen.queryByRole('button', { name: 'remove' })

    expect(likeButton).toBeNull()
    expect(removeButton).toBeNull()
  })

  test('shows like button to authenticated users who are not the creator', () => {
    const nonCreatorUser = { username: 'otheruser', name: 'Other User' }

    render(<Blog blog={blog} currentUser={nonCreatorUser} />)

    const likeButton = screen.getByRole('button', { name: 'like' })
    expect(likeButton).toBeInTheDocument()

    const removeButton = screen.queryByRole('button', { name: 'remove' })
    expect(removeButton).toBeNull()
  })

  test('shows both like and remove buttons to the creator', () => {
    const creatorUser = { username: 'testuser', name: 'Test User' }

    render(<Blog blog={blog} currentUser={creatorUser} />)

    const likeButton = screen.getByRole('button', { name: 'like' })
    expect(likeButton).toBeInTheDocument()

    const removeButton = screen.getByRole('button', { name: 'remove' })
    expect(removeButton).toBeInTheDocument()
  })

  test('clicking the like button calls the event handler', async () => {
    const creatorUser = { username: 'testuser', name: 'Test User' }
    const mockUpdateBlog = vi.fn()
    const user = userEvent.setup()

    render(<Blog blog={blog} currentUser={creatorUser} updateBlog={mockUpdateBlog} />)

    const likeButton = screen.getByRole('button', { name: 'like' })
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockUpdateBlog.mock.calls).toHaveLength(2)
  })
})