import { useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { API } from '../../config';
import { isAuth, getCookie } from '../../actions/auth';
import { getCatagories } from '../../actions/catagory';
import { getTags } from '../../actions/tag';
import { singleBlog, updateBlog } from '../../actions/blog';
import { modules, formats } from '../../helpers/quill';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const BlogUpdate = ({ router }) => {
  const [checked, setChecked] = useState([]); // catagories
  const [checkedTag, setCheckedTag] = useState([]); // tags
  const [catagories, setCatagories] = useState([]);
  const [tags, setTags] = useState([]);
  const [body, setBody] = useState('');
  const [formData, setFormData] = useState('');
  const [values, setValues] = useState({
    error: '',
    success: '',
    title: '',
  });
  const { error, success, title } = values;
  const token = getCookie('token');

  useEffect(() => {
    setFormData(new FormData());
    initBlog();
    initCatagories();
    initTags();
  }, [router]);

  const initBlog = () => {
    if (router.query.slug) {
      singleBlog(router.query.slug).then((data) => {
        if (!data || data.error) {
          console.log(data.error);
        } else {
          setValues({ ...values, title: data.title });
          setBody(data.body);
          setCatagoriesArray(data.catagories);
          setTagsArray(data.tags);
        }
      });
    }
  };

  const initCatagories = () => {
    getCatagories().then((data) => {
      if (!data || data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCatagories(data);
      }
    });
  };

  const initTags = () => {
    getTags().then((data) => {
      if (!data || data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data);
      }
    });
  };

  const setCatagoriesArray = (blogCatagories) => {
    let ca = [];
    blogCatagories.map((c, i) => {
      ca.push(c._id);
    });
    setChecked(ca);
  };

  const setTagsArray = (blogTags) => {
    let ta = [];
    blogTags.map((t, i) => {
      ta.push(t._id);
    });
    setCheckedTag(ta);
  };

  const handleChange = (name) => (e) => {
    //console.log(e.target.value)
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    if (value.size > 1000000) {
      setValues({ ...values, error: 'image should be less than 1mb' });
    } else {
      formData.set(name, value);
      setValues({ ...values, [name]: value, formData, error: '' });
    }
  };

  const handleBody = (e) => {
    setBody(e);
    formData.set('body', e);
  };

  const editBlog = (e) => {
    e.preventDefault();
    //console.log('update blog', e)
    updateBlog(formData, token, router.query.slug).then((data) => {
      if (!data || data.error) {
        setValues({ ...values, error: data.error });
      } else {
        if (isAuth() && isAuth().role === 1) {
          router.push('/admin/crud/blogs');
        } else if (isAuth() && isAuth().role === 0) {
          Router.replace('/user/crud/blogs');
        }
      }
    });
  };

  const showCategories = () => {
    return (
      catagories &&
      catagories.map((c, i) => (
        <li key={i} className='list-unstyled'>
          <input
            onChange={handleToggle(c._id)}
            checked={findOutCategory(c._id)}
            type='checkbox'
            className='mr-2'
          />
          <label className='form-check-label'>{c.name}</label>
        </li>
      ))
    );
  };

  const showTags = () => {
    return (
      tags &&
      tags.map((t, i) => (
        <li key={i} className='list-unstyled'>
          <input
            onChange={handleTagsToggle(t._id)}
            checked={findOutTag(t._id)}
            type='checkbox'
            className='mr-2'
          />
          <label className='form-check-label'>{t.name}</label>
        </li>
      ))
    );
  };

  const handleToggle = (id) => () => {
    setValues({ ...values, error: '' });
    // return the first index or -1
    const clickedCatagory = checked.indexOf(id);
    const all = [...checked];
    if (clickedCatagory === -1) {
      all.push(id);
    } else {
      all.splice(clickedCatagory, 1);
    }
    //console.log(all)
    setChecked(all);
    formData.set('catagories', all);
  };

  const handleTagsToggle = (id) => () => {
    setValues({ ...values, error: '' });
    // return the first index or -1
    const clickedTag = checkedTag.indexOf(id);
    const all = [...checkedTag];
    if (clickedTag === -1) {
      all.push(id);
    } else {
      all.splice(clickedTag, 1);
    }
    //console.log(all)
    setCheckedTag(all);
    formData.set('tags', all);
  };

  const findOutCategory = (c) => {
    const result = checked.indexOf(c);
    if (result !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const findOutTag = (t) => {
    const result = checkedTag.indexOf(t);
    if (result !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const showError = () => {
    return (
      <div
        className='alert alert-danger'
        style={{ display: error ? ' ' : 'none' }}>
        {error}
      </div>
    );
  };

  const updateBlogForm = () => {
    return (
      <form onSubmit={editBlog}>
        <div className='form-group'>
          <label className='text-muted'>Title</label>
          <input
            type='text'
            className='form-control'
            onChange={handleChange('title')}
            value={title}
          />
        </div>

        <div className='form-group'>
          <ReactQuill
            modules={modules}
            formats={formats}
            value={body}
            placeholder='Write something amazing...'
            onChange={handleBody}
          />
        </div>

        <div>
          <button className='btn btn-primary'>Update</button>
        </div>
      </form>
    );
  };

  return (
    <div className='container-fluid pb-5'>
      <div className='row'>
        <div className='col-md-8'>
          {updateBlogForm()}

          <div className='pt-3 pb-3 col-md-8'>{showError()}</div>
          {body && (
            <img
              src={`${API}/blog/photo/${router.query.slug}`}
              style={{ width: '100%' }}
              alt={title}
            />
          )}
        </div>

        <div className='col-md-4'>
          <div>
            <div className='form-group pb-2'>
              <h5>Featured image</h5>
              <hr />

              <small className='text-muted'>
                Max size: 1mb <br />
              </small>
              <label className='btn btn-outline-info'>
                Upload featured image
                <input
                  onChange={handleChange('photo')}
                  type='file'
                  accept='image/*'
                  hidden
                />
              </label>
            </div>
          </div>

          <div>
            <h5>Categories</h5>
            <hr />
            <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
              {showCategories()}
            </ul>
          </div>
          <div>
            <h5>Tags</h5>
            <hr />
            <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
              {showTags()}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(BlogUpdate);
