import Layout from '../../../components/Layout'
import Private from '../../../components/auth/Private'
import BlogCreate from '../../../components/crud/BlogCreate'

const Blog = () => {
  return (
    <Layout>
      <private>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Create a new Blog</h2>
            </div>
            <div className="col-md-12">
              <BlogCreate />
            </div>
          </div>
        </div>
      </private>
    </Layout>
)
}
export default Blog
