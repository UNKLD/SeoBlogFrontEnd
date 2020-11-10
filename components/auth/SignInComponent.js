import { useState, useEffect } from 'react';
import { signin, authenticate, isAuth } from '../../actions/auth';
import Router from 'next/router';
import Link from 'next/link';

function SigninComponent() {
  const [values, setValues] = useState({
    name: 'newuser',
    email: 'newuser@gmail.com',
    password: 'password',
    error: '',
    loading: false,
    message: '',
    showForm: true,
  });

  const { email, password, error, loading, message, showForm } = values;

  useEffect(() => {
    isAuth() && Router.push('/');
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.table({name, email, password, error, loading, message, showForm})
    setValues({ ...values, loading: true, error: false });
    const user = { email, password };
    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        //save user token to cookie
        //save user info to localstorage
        //authonticate user
        authenticate(data, () => {
          if (isAuth() && isAuth().role === 1) {
            Router.push('/admin');
          } else {
            Router.push('/user');
          }
        });
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };
  const showLoading = () =>
    loading ? <div className='alert alert-info'>loading...</div> : '';
  const showError = () =>
    error ? <div className='alert alert-danger'>{error}</div> : '';
  const showMessage = () =>
    message ? <div className='alert alert-info'>{message}</div> : '';

  const signInForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            type='email'
            value={email}
            onChange={handleChange('email')}
            className='form-control'
            placeholder='Type your Email'
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            value={password}
            onChange={handleChange('password')}
            className='form-control'
            placeholder='Type your Password'
          />
        </div>
        <div>
          <button className='btn btn-primary'>Signin</button>
        </div>
      </form>
    );
  };
  return (
    <>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signInForm()}
      <br />
      <Link href='/auth/password/forgot'>
        <a className='btn btn-outline-danger btn-sm'>Forgot password</a>
      </Link>
    </>
  );
}

export default SigninComponent;
