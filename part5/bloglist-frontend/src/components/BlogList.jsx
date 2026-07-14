import Blog from './Blog'

const BlogList = ({ blogs, user, handleLike, deleteBlog }) => {
  const sortedBlogs = blogs ? [...blogs].sort((a, b) => b.likes - a.likes) : []

  return (
    <div className="blog-list">
      {sortedBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          deleteBlog={deleteBlog}
          handleLike={handleLike}
          isListView={true}
        />)}
    </div>
  )
}

export default BlogList