import { useState } from 'react'
import Link from 'next/link';
import {emailContactForm} from '../../actions/form';

const ContactForm = ({ authorEmail }) => {
  const [values, setValues] = useState({
    message: '',
    name: '',
    email: '',
    sent: false,
    buttonText: 'Send Message',
    success: '',
    error: ''
  })

  const { message, name, email, sent, buttonText, success, error } = values

  const clickSubmit = e => {
    e.preventDefault()
    setValues({...values, buttonText: 'Sending...'})
    emailContactForm({ authorEmail, name, email, message}).then(data => {
      if (data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values,
          sent: true,
          name: '',
          email: '',
          message: '',
          buttonText: 'Sent',
          success: data.success
        })
      }
    })
  }

  const handleChange = name => e => {
      //console.log(e.target.value)
      setValues({...values,
        [name]: e.target.value,
        error: '',
        success: false,
        buttonText: 'Send Message'
      })
  }

  const showSuccessMessage = () => {
    return <div className="alert alert-info" style={{display: success ? '' : 'none'}}>
      <p>Thank you for contacting us</p>
    </div>
  }

  const showErrorMessage = () => {
   return <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
     {error}
   </div>
  }


  const contactForm = () => {
      return (
        <form onSubmit={clickSubmit} className="pb-5">
          <div className="form-group">
            <label className="lead">Message</label>
            <textarea
              rows="10"
              className="form-control"
              type= "text"
              onChange={handleChange('message')}
              value={message}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label className="lead">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={handleChange('name')}
              required
            />
          </div>

          <div className="form-group">
            <label className="lead">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={handleChange('email')}
              required
            />
          </div>

          <div>
            <button className="btn btn-primary">
              {buttonText}
            </button>
          </div>
        </form>
      )
  }

    return (
      <>
        {showSuccessMessage()}
        {showErrorMessage()}
        {contactForm()}
      </>
    )
}

export default ContactForm
