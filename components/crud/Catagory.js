import { useState, useEffect } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import {isAuth, getCookie} from '../../actions/auth'
import { create, getCatagories, removeCatagory } from '../../actions/catagory'

const Catagory = () => {
    const [values, setValues] = useState({
      name: '',
      error: false,
      success: false,
      catagories: [],
      removed: false,
      reload: false
    })

    const {name, error, success, catagories, removed, reload} = values
    const token = getCookie('token')

    useEffect(() => {
        loadCatagories()
    }, [reload])

    const loadCatagories = () =>{
      getCatagories().then(data => {
        if (!data || data.error) {
          console.log(data.error)
        } else {
          setValues({...values, catagories: data})
        }
      })
    }

    const showCatagories = () => {
      return catagories.map((c, i) => {
        return <button
          key={i}
          title="Double Click To Delete"
          className="btn btn-outline-primary mr-1 ml-1 mt-3"
          onDoubleClick={() => deleteConfirm(c.slug)}
                >
          {c.name}
        </button>
      })
    }

    const deleteConfirm = slug => {
      let answer = window.confirm('Are you sure you want to delete this catagory?')
      if (answer) {
        deleteCatagory(slug)
      }
    }
    
    const deleteCatagory = (slug) => {
        //console.log('delete', slug);
        removeCatagory(slug, token).then(data => {
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
          return <p className="text-success">Catagory Created</p>
        }
    }

    const showError = () => {
        if(error) {
          return <p className="text-danger">Catagory already exists</p>
        }
    }

    const showRemoved = () => {
        if(removed) {
          return <p className="text-danger">Catagory Removed</p>
        }
    }
    const mouseMoveHandler = () => {
        setValues({...values, error: false, success: false, removed: ''})
     }


    const newCatagoryForm = () => (
      <form onSubmit={clickSubmit}>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input type="text" required className="form-control" onChange={handleChange} value={name} />
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
        {newCatagoryForm()}
        {showCatagories()}
      </div>
    </>
}
export default Catagory
