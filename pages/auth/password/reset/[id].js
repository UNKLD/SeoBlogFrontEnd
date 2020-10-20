import{ useState } from 'react'
import Layout from '../../../../components/Layout';
import { withRouter } from 'next/router'
import {resetPassword} from '../../../../actions/auth'


const ResetPassword = ({router}) => {
  const [values, setValues] = useState({
      name: '',
      newPassword: '',
      error: '',
      message: '',
      showForm: true
  })

  const {  newPassword, error,  message, showForm } = values;

  const handleChange = (e) => {
    setValues({...values, newPassword: e.target.value})
  }

  const handleSubmit = (e) => {
      e.preventDefault()
      resetPassword({
        newPassword,
        resetPasswordLink: router.query.id
      }).then(data => {
        if (data.error) {
          setValues({...values, error: data.error, showForm: false, newPassword: ''})
        } else {
          setValues({...values, message: data.message, showForm: false, newPassword: '', error: false})
        }
      })
  }

  const passwordResetForm = () => (
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group pt-5">
            <input
              type="password"
              className="form-control"
              onChange={handleChange}
              value={newPassword}
              placeholder='Type your  New Password'
              required
            />
          </div>

          <div>
            <button className="btn btn-primary">Change Password</button>
          </div>
        </form>
      </div>
  )

  const showError = () => ( error ? <div className="alert alert-danger">{error}</div> : '')
  const showMessage = () => ( message ? <div className="alert alert-success">{error}</div> : '')

  return (
    <Layout>
      <div className="container-fluid">
        <h2>Reset Password</h2>
        <hr/>
        {showError()}
        {showMessage()}
        {passwordResetForm()}
      </div>
    </Layout>
  )

}
export default withRouter(ResetPassword)
