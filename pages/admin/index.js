import Layout from '../../components/Layout'
import Admin from '../../components/auth/Admin'
import Link from 'next/link'
import Head from 'next/head'

const Adminindex = () => {
  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <Layout>
        <Admin>
          <div className="container-fluid">
            <div className="row">

              <div className="col-md-12 pt-5 pb-5">
                <h2>Admin Dashboard</h2>
              </div>

              <div className="col-md-4">
                <ul className="list-group">
                  <li className="list-group-item">
                    <Link href="admin/crud/catagory-tag">
                      <a>Create Catagory</a>
                    </Link>
                  </li>

                  <li className="list-group-item">
                    <Link href="admin/crud/catagory-tag">
                      <a>Create Tag</a>
                    </Link>
                  </li>

                  <li className="list-group-item">
                    <Link href="admin/crud/blog">
                      <a>Create Blog</a>
                    </Link>
                  </li>

                  <li className="list-group-item">
                    <Link href="admin/crud/blogs">
                      <a>Update/Delete Blogs</a>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="col-md-8">
                left
              </div>
            </div>
          </div>
        </Admin>
      </Layout>
    </>
  )
}
export default Adminindex
