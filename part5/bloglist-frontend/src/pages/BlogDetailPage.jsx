import Blog from '../components/Blog'

const BlogDetailPage = ({ blog, user, deleteBlog, handleLike }) => {
  if (!blog) {
    return <p>Loading blog...</p> // o "Blog not found"
  }

  return (
    <article>
      <Blog
        blog={blog}
        user={user}
        deleteBlog={deleteBlog}
        handleLike={handleLike}
      />
    </article>
  )
}

export default BlogDetailPage