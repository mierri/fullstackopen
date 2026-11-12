import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Typography } from '@mui/material'
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
    <div>
      <Typography variant="h4" component="h2" gutterBottom>
        {user.name}
      </Typography>
      <Typography variant="h6" component="h3" gutterBottom>
        added blogs
      </Typography>
      <ul>
        {user.blogs && user.blogs.map((blog) => (
          <li key={blog.id || blog._id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
