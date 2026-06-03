import { useParams } from 'react-router-dom'

const BlogDetailPage = ({ blogs, user }) => {
  const id = useParams().id
  const blog = blogs.find(n => n.id === id)

  if (!blog) {
    return <p>Loading blog...</p> // o "Blog not found"
  }

  return (
    <article>
      <p className="blog-title">
        <span data-testid="blogTitle">{blog.title}</span>
        {blog.author !== null && (<> by <span className="blog-author">{blog.author}</span></>)}
      </p>
      <ul>
        <li>URL: {blog.url}</li>
        <li>Likes: {blog.likes}</li>
        {blog.user !== null && <li>Entered by: {blog.user.name}</li>}
        {user && blog.user && user.username === blog.user.username && (
          <button onClick={deleteBlog}>Delete blog</button>
        )}
      </ul>
    </article>
  )
}

export default BlogDetailPage