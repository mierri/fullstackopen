import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
} from '@mui/material'

const BlogList = ({ blogs }) => {
  return (
    <div>
      <Typography variant="h4" component="h2" gutterBottom>
        blogs
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {[...blogs].sort((a, b) => b.likes - a.likes).map((blog) => (
              <TableRow key={blog.id} className="blog-title-author">
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default BlogList
