import Togglable from '../components/Togglable'
import BlogList from '../components/BlogList'

const HomePage = ({
  user,
  blogs,
  handleLike,
  deleteBlog
}) => {
  return (
    <>
      <div className="app-layout">
        <main className="main-content">
          <h2>Blogs List APP</h2>
          <BlogList blogs={blogs} user={user} handleLike={handleLike} deleteBlog={deleteBlog} />
        </main>
      </div>
    </>
  )
}

export default HomePage