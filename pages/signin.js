import Layout from '../components/Layout'
import {withRouter} from 'next/router';
import SignInComponent from '../components/auth/SignInComponent'

function signin({router}) {
  const showMessage = () => {
    if (router. query.message) {
      return <div className="alert alert-danger">
        {router.query.message}
      </div>
    } else {
      return
    }
  }
  return (
    <Layout>
      <div className="container-fluid">
        <h2 className="text-center pt-4 pb-4">Signin</h2>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            {showMessage()}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <SignInComponent />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default withRouter(signin)
