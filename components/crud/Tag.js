import { useState, useEffect } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import {isAuth, getCookie} from '../../actions/auth'
import { create, getTags, removeTag } from '../../actions/tag'

const Tag = () => {
    const [values, setValues] = useState({
      name: '',
      error: false,
      success: false,
      tags: [],
      removed: false,
      reload: false
    })

    const {name, error, success, tags, removed, reload} = values
    const token = getCookie('token')

    useEffect(() => {
        loadTags()
    }, [reload])

    const loadTags = () =>{
      getTags().then(data => {
        if (!data || data.error) {
          console.log(data.error)
        } else {
          setValues({...values, tags: data})
        }
      })
    }

    const showTags = () => {
      return tags.map((t, i) => {
        return <button onDoubleClick={() => deleteConfirm(t.slug)} title="Double Click To Delete" key={i} className="btn btn-outline-primary mr-1 ml-1 mt-3">
          {t.name}
        </button>
      })
    }

    const deleteConfirm = slug => {
      let answer = window.confirm('Are you sure you want to delete this Tag?')
      if (answer) {
        deleteTag(slug)
      }
    }
    const deleteTag = (slug) => {
        //console.log('delete', slug);
        removeTag(slug, token).then(data => {
          if(!data || data.error){
            console.log(data.error)
          } else {
            setValues({...values, error: false, success: false, name: '', removed: !removed, reload: !reload})
          }
        })
    }

    const clickSubmit = (e) => {
        e.preventDefault()
        //console.log('Create catagory', name)
        create({name}, token).then(data => {
          if(!data || data.error){
          setValues({...values, error: data.error, success: false})
        } else {
          setValues({...values, error: false, success: true, name:'', removed: '', reload: !reload})
        }
        })
    }

    const handleChange = (e) => {
      setValues({...values, name: e.target.value, error: false, success: false, removed: ''})
    }

    const showSucces = () => {
        if(success) {
          return <p className="text-succes">Tag Created</p>
        }
    }

    const showError = () => {
        if(error) {
          return <p className="text-danger">Tag already exists</p>
        }
    }

    const showRemoved = () => {
        if(removed) {
          return <p className="text-danger">Tag Removed</p>
        }
    }
    const mouseMoveHandler = e => {
        setValues({...values, error: false, success: false, removed: ''})
     }


    const newTagForm = () => (
      <form onSubmit={clickSubmit}>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input type="text" className="form-control" onChange={handleChange} value={name} required/>
        </div>
        <div>
          <button type="submit" className="btn btn-primary">Create</button>
        </div>
      </form>
    );
    return <>
      {showSucces()}
      {showError()}
      {showRemoved()}
      <div onMouseMove={mouseMoveHandler}>
        {newTagForm()}
        {showTags()}
      </div>
    </>
}
export default Tag
