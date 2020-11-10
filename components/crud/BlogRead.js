import { useState, useEffect } from 'react';
import { isAuth, getCookie } from '../../actions/auth';
import { list, removeBlog } from '../../actions/blog';
import moment from 'moment';

const BlogRead = ({ username }) => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState('');
  const token = getCookie('token');

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    list(username).then((data) => {
      if (!data || data.error) {
        console.log(data.error);
      } else {
        setBlogs(data);
      }
    });
  };

  const deleteBlog = (slug) => {
    let answer = window.confirm('Are You sure you wnat to delete your blog?');
    if (answer) {
      removeBlog(slug, token).then((data) => {
        if (!data || data.error) {
          console.log(data.error);
        } else {
          setMessage(data.message);
          loadBlogs();
        }
      });
    }
  };

  const showUpdateButton = (blog) => {
    if (isAuth() && isAuth().role === 0) {
      return (
        <a
          href={`/user/crud/${blog.slug}`}
          className='btn btn-sm btn-warning ml-2'>
          Update
        </a>
      );
    } else if (isAuth() && isAuth().role === 1) {
      return (
        <a
          href={`/admin/crud/${blog.slug}`}
          className='ml-2 btn btn-sm btn-warning'>
          Update
        </a>
      );
    }
  };

  const showAllBlogs = () => {
    return blogs.map((b, i) => (
      <div key={i} className='pb-5'>
        <h3>{b.title}</h3>
        <p className='mark'>
          Written by {b.postedBy.name} | Published on{' '}
          {moment(b.updatedAt).fromNow()}
        </p>
        <button
          className='btn btn-sm btn-danger'
          onClick={() => deleteBlog(b.slug)}>
          Delete
        </button>
        {showUpdateButton(b)}
      </div>
    ));
  };

  return (
    <>
      <div>
        <div className='row'>
          <div className='col-md-12'>
            {message && <div className='alert alert-warning'>{message}</div>}
            {showAllBlogs()}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogRead;
