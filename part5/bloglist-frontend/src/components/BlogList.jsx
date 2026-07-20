import Blog from './Blog'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {
  const sortedBlogs = blogs ? [...blogs].sort((a, b) => b.likes - a.likes) : []

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedBlogs.map(blog =>
            <TableRow key={blog.id}>
              <TableCell>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </TableCell>
              <TableCell>
                {blog.author}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BlogList