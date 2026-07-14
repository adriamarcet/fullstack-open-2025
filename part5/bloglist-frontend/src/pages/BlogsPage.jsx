import BlogList from '../components/BlogList'

const BlogsPage = ({ blogs, user, handleLike, deleteBlog }) => {
  return (
    <>
      <BlogList blogs={blogs} user={user} handleLike={handleLike} deleteBlog={deleteBlog} />
    </>
  )
}

export default BlogsPage