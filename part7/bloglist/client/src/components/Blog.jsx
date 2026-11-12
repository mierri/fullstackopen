import { useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemText,
  Link as MuiLink,
} from '@mui/material'
import NotFound from './NotFound'
import useBlogStore from '../stores/blogStore'

const Blog = ({ blog, updateBlog, removeBlog, currentUser }) => {
  const [comment, setComment] = useState('')
  const addComment = useBlogStore((state) => state.addComment)

  if (!blog) {
    return <NotFound />
  }

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user ? blog.user.id : null,
    }
    updateBlog(blog.id, updatedBlog)
  }

  const handleRemove = () => {
    removeBlog(blog.id)
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    if (!comment.trim()) return
    await addComment(blog.id, comment)
    setComment('')
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
          added by {blog.user.name}
        </Typography>
        {isCreator && (
          <Button variant="contained" color="error" onClick={handleRemove}>
            remove
          </Button>
        )}
        <Typography variant="h6" component="h3" sx={{ mt: 3, mb: 1 }}>
          comments
        </Typography>
        <Box component="form" onSubmit={handleCommentSubmit} sx={{ mt: 1, mb: 2, display: 'flex', gap: 1 }}>
          <TextField
            size="small"
            label="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button variant="contained" type="submit">
            add comment
          </Button>
        </Box>
        <Paper sx={{ mt: 1 }}>
          <List>
            {blog.comments && blog.comments.map((c, index) => (
              <ListItem key={index} divider>
                <ListItemText primary={c} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </CardContent>
    </Card>
  )
}

export default Blog
