import { useState, useEffect } from 'react'
import {
  Routes, Route, Link, Navigate, useNavigate, useMatch
} from 'react-router-dom'
import { Container, AppBar, Toolbar, Button, Typography } from '@mui/material'

import BlogList from './components/BlogList'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import ErrorBoundary from './components/ErrorBoundary'
import NotFound from './components/NotFound'
import Home from './components/Home'
import Footer from './components/Footer'
import useNotificationStore from './stores/notificationStore'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const showNotification = useNotificationStore((state) => state.showNotification)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      navigate('/')
    } catch {
      showNotification('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
    navigate('/')
  }

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      showNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 'success')
      navigate('/')
    } catch {
      showNotification('Failed to add blog', 'error')
    }
  }

  const updateBlog = async (id, blogObject) => {
    try {
      const returnedBlog = await blogService.update(id, blogObject)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
    } catch {
      showNotification('Failed to update blog', 'error')
    }
  }

  const removeBlog = async (id) => {
    const blogToDrop = blogs.find(b => b.id === id)
    if (window.confirm(`Remove blog ${blogToDrop.title} by ${blogToDrop.author}?`)) {
      try {
        await blogService.remove(id)
        setBlogs(blogs.filter(b => b.id !== id))
        showNotification(`Blog ${blogToDrop.title} removed`, 'success')
        navigate('/')
      } catch {
        showNotification('Failed to remove blog', 'error')
      }
    }
  }

  const match = useMatch('/blogs/:id')
  const matchedBlog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  return (
    <Container>
      <AppBar position="static" sx={{ mb: 3 }}>
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            blogs
          </Button>
          {user ? (
            <>
              <Button color="inherit" component={Link} to="/create">
                new blog
              </Button>
              <Typography variant="body1" sx={{ flexGrow: 1, textAlign: 'right', mr: 2 }}>
                {user.name} logged in
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                logout
              </Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login" sx={{ flexGrow: 1, justifyContent: 'flex-start' }}>
              login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Typography variant="h3" component="h1" gutterBottom>
        blog app
      </Typography>

      <Notification />

      <ErrorBoundary>
        <Routes>
          <Route path="/blogs/:id" element={
            <Blog
              blog={matchedBlog}
              updateBlog={updateBlog}
              removeBlog={removeBlog}
              currentUser={user}
            />
          } />
          <Route path="/create" element={
            user ? <BlogForm createBlog={addBlog} /> : <Navigate replace to="/login" />
          } />
          <Route path="/login" element={
            <LoginForm
              handleLogin={handleLogin}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
            />
          } />
          <Route path="/" element={<BlogList blogs={blogs} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
      <Footer />
    </Container>
  )
}

export default App