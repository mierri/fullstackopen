import { Link } from 'react-router-dom'
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material'

const BlogList = ({ blogs }) => {
  return (
    <div>
      <Typography variant="h4" component="h2" gutterBottom>
        blogs
      </Typography>
      <Paper>
        <List>
          {[...blogs].sort((a, b) => b.likes - a.likes).map((blog) => (
            <ListItem key={blog.id} divider className="blog-title-author">
              <ListItemText
                primary={
                  <Link to={`/blogs/${blog.id}`}>
                    {blog.title} {blog.author}
                  </Link>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  )
}

export default BlogList
