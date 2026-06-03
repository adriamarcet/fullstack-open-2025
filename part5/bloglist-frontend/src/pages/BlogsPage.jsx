import Blog from '../components/Blog'

const BlogsPage = ({ blogs, user, logEvent, notifyError }) => {
  const sortedBlogs = blogs ? [...blogs].sort((a, b) => b.likes - a.likes) : []

  const handleLike = async blog => {
    try {
      const newObject = {
        id: blog.id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user
      }
      const updatedBlog = await blogService.update(blog.id, newObject)
      setBlogs(blogs.map(b => b.id !== updatedBlog.id ? b : updatedBlog))
      logEvent(`${updatedBlog.title} has been updated`, 'blog')
      toast.success(`${updatedBlog.title} updated successfully.`)
    } catch (error) {
      const message = error.response?.data?.error || 'Could not add a like to this blog'
      notifyError(message)
    }
  }

  const handleDelete = async blog => {
    if (!window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      return
    }

    try {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      logEvent(`${blog.title} has been removed`, 'blog')
      toast.success(`${blog.title} removed successfully.`)
    } catch (error) {
      const message = error.response?.data?.error || 'Could not delete this blog'
      notifyError(message)
    }
  }

  return (
    <>
      <div className="blog-list">
        {sortedBlogs.map(blog => <Blog key={blog.id} blog={blog} user={user} likeFn={handleLike} deleteFn={handleDelete} />)}
      </div>
    </>
  )
}

export default BlogsPage