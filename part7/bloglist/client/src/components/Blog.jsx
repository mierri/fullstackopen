import { Card, CardContent, Typography, Button, Box, Link as MuiLink } from '@mui/material'

const Blog = ({ blog, updateBlog, removeBlog, currentUser }) => {
  if (!blog) {
    return null
  }

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user ? blog.user.id : null
    }
    updateBlog(blog.id, updatedBlog)
  }

  const handleRemove = () => {
    removeBlog(blog.id)
  }

  const isCreator = blog.user && currentUser && blog.user.username === currentUser.username

  return (
    <Card sx={{ mt: 2, mb: 2 }} className="blog">
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {blog.title} {blog.author}
        </Typography>
        <Box sx={{ mb: 1 }}>
          <MuiLink href={blog.url} target="_blank" rel="noopener noreferrer">
            {blog.url}
          </MuiLink>
        </Box>
        <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body1">
            likes {blog.likes}
          </Typography>
          {currentUser && (
            <Button variant="outlined" size="small" onClick={handleLike}>
              like
            </Button>
          )}
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          added by {blog.user ? blog.user.name : 'unknown'}
        </Typography>
        {isCreator && (
          <Button variant="contained" color="error" onClick={handleRemove}>
            remove
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default Blog