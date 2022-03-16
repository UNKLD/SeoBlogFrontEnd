import Layout from "../../components/Layout";
import Admin from "../../components/auth/Admin";
import Link from "next/link";
import Head from "next/head";
import BlogRead from "../../components/crud/BlogRead";
import { isAuth } from "../../actions/auth";

const AdminIndex = () => {
  const userName = isAuth() && isAuth().username;

  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <Layout>
        <Admin>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 pt-3 pb-5">
                <h2>Admin Dashboard</h2>
              </div>

              <div className="col-md-4">
                <ul className="list-group">
                  <Link href="admin/crud/catagory-tag">
                    <li className="list-group-item btn btn-outline-primary">
                      <a>Create Catagory</a>
                    </li>
                  </Link>

                  <Link href="admin/crud/catagory-tag">
                    <li className="list-group-item btn btn-outline-primary">
                      <a>Create Tag</a>
                    </li>
                  </Link>

                  <Link href="admin/crud/blog">
                    <li className="list-group-item btn btn-outline-primary">
                      <a>Create Blog</a>
                    </li>
                  </Link>

                  <Link href="admin/crud/blogs">
                    <li className="list-group-item btn btn-outline-primary">
                      <a>Update/Delete Blogs</a>
                    </li>
                  </Link>

                  <Link href="user/update">
                    <li className="list-group-item btn btn-outline-primary">
                      <a>Update Profile</a>
                    </li>
                  </Link>
                </ul>
              </div>

              <div className="col-md-8">
                <BlogRead username={userName} />
              </div>
            </div>
          </div>
        </Admin>
      </Layout>
    </>
  );
};

export default AdminIndex;
