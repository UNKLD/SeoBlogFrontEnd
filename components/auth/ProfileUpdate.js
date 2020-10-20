import Link from 'next/link';
import { useState, useEffect } from 'react'
import Router from 'next/router';
import { getCookie, isAuth, updateUser } from '../../actions/auth'
import { API } from '../../config'
import { getProfile, update } from '../../actions/user'


const ProfileUpdate = () => {
  const [userData, setUserData] = useState('')
  const [values, setValues] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    about: '',
    photoName: '',
    error: false,
    success: false,
    loading: false,
    photo: ''
  })

  const { username, name, email, password, about, error, success, loading, photoName } = values
  const token = getCookie('token')

  useEffect(() => {
     setUserData(new FormData())
      initUser()
  }, [])

  const initUser = () => {
    getProfile(token).then(data => {
      if (data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values,
          username: data.username,
          name: data.name,
          about: data.about,
          photoName: data.username
        })
      }
    })
  }

  const handleChange = name => e => {
    const value = name === 'photo' ? e.target.files[0] : e.target.value
    userData.set(name, value)
    setValues({...values, [name]: value, userData, error: false, success: false})
  }

const handleSubmit = (e) => {
    e.preventDefault()
    setValues({...values, loading: true})
    update(token, userData).then(data => {
      if (data.error) {
        setValues({...values, error: data.error, success: false, loading: false})
      } else {
        updateUser(data, () => {
          setValues({...values,
            username: data.username,
            name: data.name,
            about: data.about,
            success: true,
            loading: false
          })
        })
      }
    })
}

  const profileUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="btn btn-outline-info">
          Profile Photo
          <input
            type="file"
            accept="image/*"
            onChange={handleChange('photo')}
            hidden
          />
        </label>
      </div>

      <div className="form-group">
        <label className="text-muted">Username </label>
        <input
          type="text"
          onChange={handleChange('username')}
          value={username}
          required
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Name </label>
        <input
          type="text"
          onChange={handleChange('name')}
          value={name}
          required
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label className="text-muted">About </label>
        <textarea
          type="text"
          onChange={handleChange('about')}
          value={about}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password </label>
        <input
          type="password"
          onChange={handleChange('password')}
          value={password}
          className="form-control"
        />
      </div>

      <button className="btn btn-primary">Update Profile</button>
    </form>
  )

const showError = () => {
    return <div className="alert alert-danger" style={{display: error ? ' ' : 'none'}}>
      {error}
    </div>
}

const showSuccess = () => {
    return <div className="alert alert-success" style={{display: success ? ' ' : 'none'}}>
      Profile Updated Please Refresh to see image
    </div>
}

const showLoading = () => {
    return <div className="alert alert-info" style={{display: loading ? ' ' : 'none'}}>
      Loading...
    </div>
}

  return (
    <>
      <div className="container">
        <div className="row">

          <div className="col-md-4">
            {photoName && <img
              src={`${API}/user/photo/${photoName}`}
              alt="user profile"
              style={{ maxHeight: 'auto', maxWidth: '100%' }}
              className="img img-thumbnail img-fluid mb-3"
            />}
          </div>

          <div className="col-md-8 mb-5">
            {showError()}
            {showSuccess()}
            {showLoading()}
            {profileUpdateForm()}
          </div>
        </div>
      </div>
    </>
  )
}
 export default ProfileUpdate
