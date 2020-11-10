import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import SmallCard from '../../components/blog/SmallCard';
import ContactForm from '../../components/form/ContactForm';
import { userPublicProfile } from '../../actions/user';
import { API, DOMAIN, APP_NAME } from '../../config';
import moment from 'moment';

const UserProfile = ({ user, blogs }) => {
  const head = () => (
    <Head>
      <title>
        {user.username} | {APP_NAME}
      </title>
      <link rel='canonical' href={`${DOMAIN}/profile/${user.username}`} />
      <meta name='description' content={`Blogs by ${user.username}`} />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta property='og:title' content={`${user.name} | ${APP_NAME}`} />
      <meta property='og:description' content={`Blogs by ${user.username}`} />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={`${DOMAIN}/profile/${user.username}`} />
      <meta property='og:site_name' content={`${APP_NAME}`} />

      <meta property='og:image' content={`${DOMAIN}/images/animeblog.jpg`} />
      <meta
        property='og:image:secure_url'
        content={`${DOMAIN}/images/animeblog.jpg`}
      />
      <meta property='og:image:type' content='image/jpg' />
    </Head>
  );

  const showUserBlogs = () => {
    return blogs.map((blog, i) => (
      <div className='mt-4 mb-4' key={i}>
        <Link href={`/blogs/${blog.slug}`}>
          <a>{blog.title}</a>
        </Link>
      </div>
    ));
  };

  return (
    <>
      {head()}
      <Layout>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='card'>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col-md-8'>
                      <h5>{user.name}</h5>
                      <p className='text-muted'>
                        Joined {moment(user.createdAt).fromNow()}
                      </p>
                    </div>

                    <div className='col-md-4'>
                      <img
                        src={`${API}/user/photo/${user.username}`}
                        alt='user profile'
                        style={{ maxHeight: '100px', maxWidth: '100%' }}
                        className='img img-thumbnail img-fluid mb-3'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />

        <div className='container pb-5'>
          <div className='row'>
            <div className='col-md-6'>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title bg-primary pt-4 pb-4 pl-4 pr-4 text-white'>
                    Recent Blogs by {user.name}
                  </h5>
                  {showUserBlogs()}
                </div>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title bg-primary pt-4 pb-4 pl-4 pr-4 text-white'>
                    Contact {user.name}
                  </h5>
                  <br />
                  <ContactForm authorEmail={user.email} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

UserProfile.getInitialProps = ({ query }) => {
  return userPublicProfile(query.username).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      //console.log(data)
      return { user: data.user, blogs: data.blogs };
    }
  });
};

export default UserProfile;
