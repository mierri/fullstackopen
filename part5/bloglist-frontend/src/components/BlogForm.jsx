import { useState } from 'react'
import { TextField, Button, Box, Typography } from '@mui/material'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        create new
      </Typography>
      <Box component="form" onSubmit={addBlog} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
        <TextField
          label="title"
          name="Title"
          placeholder="title"
          value={newTitle}
          onChange={({ target }) => setNewTitle(target.value)}
          fullWidth
        />
        <TextField
          label="author"
          name="Author"
          placeholder="author"
          value={newAuthor}
          onChange={({ target }) => setNewAuthor(target.value)}
          fullWidth
        />
        <TextField
          label="url"
          name="Url"
          placeholder="url"
          value={newUrl}
          onChange={({ target }) => setNewUrl(target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" type="submit" sx={{ mt: 1, alignSelf: 'flex-start' }}>
          create
        </Button>
      </Box>
    </Box>
  )
}

export default BlogForm
