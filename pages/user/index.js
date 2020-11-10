import Link from 'next/link';
import Layout from '../../components/Layout';
import Private from '../../components/auth/Private';

const UserIndex = () => {
  return (
    <Layout>
      <Private>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-12 pt-3 pb-5'>
              <h2>User Dashboard</h2>
            </div>

            <div className='col-md-4'>
              <ul className='list-group'>
                <Link href='user/crud/blog'>
                  <li className='list-group-item btn btn-outline-primary'>
                    <a>Create Blog</a>
                  </li>
                </Link>

                <Link href='user/crud/blogs'>
                  <li className='list-group-item btn btn-outline-primary'>
                    <a>Update/Delete Blogs</a>
                  </li>
                </Link>

                <Link href='user/update'>
                  <li className='list-group-item btn btn-outline-primary'>
                    <a>Update Profile</a>
                  </li>
                </Link>
              </ul>
            </div>

            <div className='col-md-8'>left</div>
          </div>
        </div>
      </Private>
    </Layout>
  );
};
export default UserIndex;
