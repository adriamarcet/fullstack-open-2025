import { useNavigate } from 'react-router-dom'

import Togglable from './Togglable'
import { Link } from 'react-router-dom'
import { Paper, Stack, Button, Typography, Divider } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'

const Blog = ({ blog, user, deleteBlog, handleLike, isListView=false }) => {
  const increaseLike = () => {
    handleLike(blog)
  }

  const navigate = useNavigate()
  const handleDelete = () => {
    if (window.confirm(`Segur que vols borrar el blog "${blog.title}"?`)) {
      deleteBlog(blog.id)
      navigate('/blogs')
    }
  }

  const blogMainInfo = (
    <>
      <h2><span data-testid="blogTitle">{blog.title}</span></h2>
      {blog.author !== null && (<p> by <span className="blog-author">{blog.author}</span></p>)}
      {blog.user !== null && <p>Added by {blog.user.name}</p>}
    </>
  )

  const blogInfo = (
    <Stack spacing={{ xs: 1, sm: 2 }}>
      <Link to={blog.url} sx={{ margin: 4 }}>{blog.url}</Link>
      <Divider />
      <Stack direction="row" spacing={2} sx={{ alignItems: 'baseline', p: 2 }}>
        <Typography variant="body2">{blog.likes} Like{blog.likes < 1 ? 's': ''}</Typography>
        <Paper>
          {user && blog.user && user.username === blog.user.username && (
            <Button variant="outlined" onClick={increaseLike} startIcon={<ThumbUpOffAltIcon />}>Like</Button>
          )}
        </Paper>
        <Paper>
          {user && blog.user && user.username === blog.user.username && (
            <Button variant="outlined" onClick={handleDelete} color="error" startIcon={<DeleteIcon />}>Delete blog</Button>
          )}
        </Paper>
      </Stack>
    </Stack>
  )
  return (
    <article>
      <Paper className="blog-item" data-testid="blogItem" sx={{ padding: 2 }}>
        <div className="blog-title">
          {isListView && (
            <Link to={`/blogs/${blog.id}`}>
              {blogMainInfo}
            </Link>
          )}
          {!isListView && (blogMainInfo)}
        </div>

        {isListView && (
          <Togglable buttonLabel="View more details">
            {blogInfo}
          </Togglable>
        )}
        {!isListView && (blogInfo)}
      </Paper>
    </article>
  )
}

export default Blog