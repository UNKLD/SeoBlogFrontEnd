import Layout from '../../../components/Layout'
import Admin from '../../../components/auth/Admin'
import Catagory from '../../../components/crud/Catagory'
import Tag from '../../../components/crud/Tag'

const CatagoryTag = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Manage Catagories and Tags</h2>
            </div>
            <div className="col-md-6">
              <Catagory />
            </div>
            <div className="col-md-6">
              <Tag />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
)
}
export default CatagoryTag
