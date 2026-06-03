import Togglable from './Togglable'
import { Link } from 'react-router-dom'

const Blog = ({ blog, user, likeFn, deleteFn }) => {
  const increaseLike = () => {
    likeFn(blog)
  }

  const deleteBlog = () => {
    deleteFn(blog)
  }

  return (
    <div className="blog-item" data-testid="blogItem">
      <p className="blog-title">
        <Link to={`./${blog.id}`}>
          <span data-testid="blogTitle">{blog.title}</span>
          {blog.author !== null && (<> by <span className="blog-author">{blog.author}</span></>)}
        </Link>
      </p>

      <Togglable buttonLabel="View more details">
        <div>
          <ul>
            <li>URL: {blog.url}</li>
            <li>Likes: {blog.likes} <button onClick={increaseLike}>Like</button></li>
            {blog.user !== null && <li>Entered by: {blog.user.name}</li>}
            {user && blog.user && user.username === blog.user.username && (
              <button onClick={deleteBlog}>Delete blog</button>
            )}
          </ul>
        </div>
      </Togglable>
    </div>
  )
}

export default Blog