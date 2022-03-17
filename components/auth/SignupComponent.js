import { useState, useEffect } from "react";
import { preSignup, isAuth } from "../../actions/auth";
import Router from "next/router";
import Link from "next/link";

function SignupComponent() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
    token: "",
  });

  const { name, email, password, error, loading, message, showForm, token } = values;
  useEffect(() => {
    isAuth() && Router.push("/");
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.table({name, email, password, error, loading, message, showForm})
    setValues({ ...values, loading: true, error: false });
    const user = { name, email, password };
    preSignup(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          loading: false,
          message: data.message,
          showForm: false,
          token: data.token,
        });
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };
  const showLoading = () =>
    loading ? <div className="alert alert-info">loading...</div> : "";
  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";
  const showMessage = () =>
    message ? (
      <div className="alert alert-info">
        {message}
        <br />
        <Link href={`/auth/account/activate/${token}`}>
          <a>Activate Account</a>
        </Link>
      </div>
    ) : (
      ""
    );

  const signUpForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={name}
            onChange={handleChange("name")}
            placeholder="Type your Name"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={handleChange("email")}
            className="form-control"
            placeholder="Type your Email"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={handleChange("password")}
            className="form-control"
            placeholder="Type your Password"
          />
        </div>
        <div>
          <button className="btn btn-primary">Signup</button>
        </div>
      </form>
    );
  };
  return (
    <>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signUpForm()}
    </>
  );
}

export default SignupComponent;
