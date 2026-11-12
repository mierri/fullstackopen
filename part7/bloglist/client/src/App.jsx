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
import Users from './components/Users'
import Home from './components/Home'
import Footer from './components/Footer'
import useNotificationStore from './stores/notificationStore'
import useBlogStore from './stores/blogStore'
import useUserStore from './stores/userStore'

const App = () => {
  const blogs = useBlogStore((state) => state.blogs)
  const fetchBlogs = useBlogStore((state) => state.fetchBlogs)
  const createBlog = useBlogStore((state) => state.createBlog)
  const likeBlog = useBlogStore((state) => state.likeBlog)
  const removeBlogFromStore = useBlogStore((state) => state.removeBlog)

  const user = useUserStore((state) => state.user)
  const initUser = useUserStore((state) => state.initUser)
  const login = useUserStore((state) => state.login)
  const logout = useUserStore((state) => state.logout)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const showNotification = useNotificationStore((state) => state.showNotification)

  const navigate = useNavigate()

  useEffect(() => {
    fetchBlogs()
  }, [fetchBlogs])

  useEffect(() => {
    initUser()
  }, [initUser])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      await login({ username, password })
      setUsername('')
      setPassword('')
      navigate('/')
    } catch {
      showNotification('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await createBlog(blogObject)
      showNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 'success')
      navigate('/')
    } catch {
      showNotification('Failed to add blog', 'error')
    }
  }

  const updateBlog = async (id, blogObject) => {
    try {
      await likeBlog(id, blogObject)
    } catch {
      showNotification('Failed to update blog', 'error')
    }
  }

  const removeBlog = async (id) => {
    const blogToDrop = blogs.find(b => b.id === id)
    if (window.confirm(`Remove blog ${blogToDrop.title} by ${blogToDrop.author}?`)) {
      try {
        await removeBlogFromStore(id)
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
          <Button color="inherit" component={Link} to="/users">
            users
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
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<BlogList blogs={blogs} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
      <Footer />
    </Container>
  )
}

export default App