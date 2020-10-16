import { useState, useEffect } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import {isAuth, getCookie} from '../../actions/auth'
import { list, removeBlog } from '../../actions/blog'
import moment from 'moment'

const BloagRead = () => {

  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState('')
  const token = getCookie('token')

  useEffect(() => {
    loadBlogs()
  }, [])

  const loadBlogs = () => {
      list().then(data => {
        if (data.error) {
          console.log(data.error)
        } else {
          setBlogs(data)
        }
      })
  }

  const deleteBlog = (slug) => {
      let answer = window.confirm('Are You sure you wnat to delete your blog?')
      if (answer) {
        removeBlog(slug, token).then(data => {
          if (data.error) {
            console.log(data.error)
          } else {
            setMessage(data.message)
            loadBlogs()
          }
        })
      }
  }

const showUpdateButton = (blog) => {
    if (isAuth() && isAuth().role === 0) {
      return (
        <Link href={`/user/crud/blog/${blog.slug}`}>
          <a className= "btn btn-sm btn-warning">Update</a>
        </Link>
      )
    } else if(isAuth() && isAuth().role === 1) {
      return <Link href={`/admin/crud/${blog.slug}`}>
        <a className= "ml-2 btn btn-sm btn-warning">Update</a>
      </Link>
    }
}


  const showAllBlogs = () => {
      return blogs.map((b, i) => (
        <div key = {i} className="pb-5">
          <h3>{b.title}</h3>
          <p className="mark">
            Written by {b.postedBy.name} | Published on {moment(b.updatedAt).fromNow()}
          </p>
          <button className="btn btn-sm btn-danger" onClick={() => deleteBlog(b.slug)}>
            Delete
          </button>
          {showUpdateButton(b)}
        </div>
      ))
  }


    return (
      <>
        <div>
          <div className="row">
            <div className="col-md-12">
              {message && <div className="alert alert-warning">{message}</div>}
              {showAllBlogs()}
            </div>
          </div>
        </div>
      </>
    )
}

export default BloagRead
