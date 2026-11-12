import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Typography, Paper, List, ListItem, ListItemText, Box } from '@mui/material'
import userService from '../services/users'

const User = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)

  useEffect(() => {
    userService.getAll().then((users) => {
      const found = users.find((u) => u.id === id)
      setUser(found)
    })
  }, [id])

  if (!user) {
    return null
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        {user.name}
      </Typography>
      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 2 }}>
        added blogs
      </Typography>
      <Paper sx={{ mt: 1 }}>
        <List>
          {user.blogs && user.blogs.map((blog) => (
            <ListItem key={blog.id || blog._id} divider>
              <ListItemText primary={blog.title} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  )
}

export default User
