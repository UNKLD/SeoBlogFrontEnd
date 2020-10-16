import { useState, useEffect } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import dynamic from 'next/dynamic'
import { withRouter } from 'next/router'
import {isAuth, getCookie} from '../../actions/auth'
import { getCatagories } from '../../actions/catagory'
import { getTags } from '../../actions/tag'
import { createBlog } from '../../actions/blog'
import { modules, formats } from '../../helpers/quill'
const ReactQuill = dynamic(() => import('react-quill'), {ssr: false})
import 'react-quill/dist/quill.snow.css'

const CreateBlog = ({router}) => {

  const blogFromLS = () => {
    if(typeof window === 'undefined') {
      return false
    }
    if(localStorage.getItem('blog')) {
      return JSON.parse(localStorage.getItem('blog'))
    } else {
      return false
    }
  }
  const [checked, setChecked] = useState([])// catagories
  const [checkedTag, setCheckedTag] = useState([])// tags

  const [catagories, setCatagories] = useState([])
  const [tags, setTags] = useState([])
  const [body, setBody] = useState(blogFromLS())
  const [values, setValues] = useState({
    error: '',
    sizeError: '',
    success: '',
    formData: '',
    title: '',
    hidePublishButton: false
  })

  const { error, sizeError, success, formData, title, hidePublishButton } = values
  const token = getCookie('token')

  useEffect(() => {
    setValues({...values, formData: new FormData()})
    initCatagories()
    initTags()
  }, [router]);

  const initCatagories = () => {
      getCatagories().then(data => {
        if (data.error) {
          setValues({...values, error: data.error})
        } else {
          setCatagories(data)
        }
      })
  }

  const initTags = () => {
    getTags().then(data => {
      if (data.error) {
        setValues({...values, error: data.error})
      } else {
        setTags(data)
      }
    })
  }


  const publishBlog = (e) => {
      e.preventDefault()
      //console.log('ready to publish', e.target)
      createBlog(formData, token).then(data => {
        if (data.error) {
          setValues({...values, error: data.error})
        } else {
          setValues({...values, title: '', error: '', success: `A new blog titled "${data.title}" is created ` })
          setBody('')
          setCatagories([])
          setTags([])
        }
      })
  }

  const handleChange = name => e => {
      //console.log(e.target.value)
      const value = name === 'photo' ? e.target.files[0] : e.target.value
      formData.set(name, value)
      setValues({...values, [name]: value, formData, error: ''})

  }

  const handleBody = (e) => {
      // console.log(e)
      setBody(e)
      formData.set('body', e)
      if(typeof window !== 'undefined') {
        localStorage.setItem('blog', JSON.stringify(e))
      }
  }

  const handleToggle = id => () => {
      setValues({...values, error: ''})
      // return the first index or -1
      const clickedCatagory = checked.indexOf(id)
      const all = [...checked]
      if(clickedCatagory === -1) {
        all.push(id)
      } else {
        all.splice(clickedCatagory, 1)
      }
      // console.log(all)
      setChecked(all)
      formData.set('catagories', all)
  }

  const showCategories = () => {
      return (
        catagories &&
        catagories.map((c, i) => (
          <li key={i} className="list-unstyled">
            <input onChange={handleToggle(c._id)} type="checkbox" className="mr-2"/>
            <label className="form-check-label">{c.name}</label>
          </li>
        ))
      )
  }

  const handleTagsToggle = id => () => {
      setValues({...values, error: ''})
      // return the first index or -1
      const clickedTag = checkedTag.indexOf(id)
      const all = [...checkedTag]
      if(clickedTag === -1) {
        all.push(id)
      } else {
        all.splice(clickedTag, 1)
      }
      // console.log(all)
      setCheckedTag(all)
      formData.set('tags', all)
  }

  const showTags = () => {
      return (
        tags &&
        tags.map((t, i) => (
          <li key={i} className="list-unstyled">
            <input onChange={handleTagsToggle(t._id)} type="checkbox" className="mr-2"/>
            <label className="form-check-label">{t.name}</label>
          </li>
        ))
      )
  }

 const showError = () => {
    return  <div className="alert alert-danger" style={{display: error ? ' ' : 'none'}}>{error}</div>
 }

 const showSucces = () => {
    return <div className="alert alert-success" style={{display: success ? ' ' : 'none'}}>{success}</div>
 }

  const createBlogForm = () => {
    return (
      <form onSubmit={publishBlog}>
        <div className="form-group">
          <label className="text-muted">Title</label>
          <input type="text" className="form-control" onChange={handleChange('title')} value={title} />
        </div>

        <div className="form-group">
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={body}
            placeholder="Write something amazing..."
            onChange={handleBody} />
        </div>

        <div>
          <button className="btn btn-primary">Publish</button>
        </div>
      </form>
    )
  }

    return (
    <div className="container-fluid pb-5">
      <div className="row">
        <div className="pb-3 col-md-8">
          {showError()}
          {showSucces()}
        </div>
        <div className="col-md-8">
          {createBlogForm()}
        </div>

        <div className="col-md-4">
          <div>
            <div className="form-group pb-2">
              <h5>Featured image</h5>
              <hr />

              <small className="text-muted">Max size: 1mb <br/></small>
              <label className="btn btn-outline-info">
                Upload featured image
                <input onChange={handleChange('photo')} type="file" accept="image/*" hidden/>
              </label>
            </div>
          </div>

          <div>
            <h5>Categories</h5>
            <hr />
            <ul style={{maxHeight: '200px', overflowY: 'scroll'}}>
              {showCategories()}
            </ul>
          </div>
          <div>
            <h5>Tags</h5>
            <hr />
            <ul style={{maxHeight: '200px', overflowY: 'scroll'}}>
              {showTags()}
            </ul>
          </div>

        </div>
      </div>
    </div>
)}

export default withRouter(CreateBlog)
