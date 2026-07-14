import { useNavigate } from 'react-router-dom'

import Togglable from './Togglable'
import { Link } from 'react-router-dom'

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
      <span data-testid="blogTitle">{blog.title}</span>
      {blog.author !== null && (<> by <span className="blog-author">{blog.author}</span></>)}
    </>
  )

  const blogInfo = (
    <div>
      <ul>
        <li>URL: {blog.url}</li>
        <li>Likes: {blog.likes}
          {user && blog.user && user.username === blog.user.username && (
            <button style={{ 'marginInlineStart': '16px' }} onClick={increaseLike}>Like</button>
          )}
        </li>
        {blog.user !== null && <li>Entered by: {blog.user.name}</li>}
      </ul>
      {user && blog.user && user.username === blog.user.username && (
        <button onClick={handleDelete}>Delete blog</button>
      )}
    </div>
  )
  return (
    <div className="blog-item" data-testid="blogItem">
      <p className="blog-title">
        {isListView && (
          <Link to={`/blogs/${blog.id}`}>
            {blogMainInfo}
          </Link>
        )}
        {!isListView && (blogMainInfo)}
      </p>

      {isListView && (
        <Togglable buttonLabel="View more details">
          {blogInfo}
        </Togglable>
      )}
      {!isListView && (blogInfo)}
    </div>
  )
}

export default Blog