import Link from 'next/link'
import Layout from '../../components/Layout'
import Private from '../../components/auth/Private'

const Userindex = () => {
   return (
       <Layout>
           <Private>
            <h2>User Dashboard</h2>
            <div><Link href='/signup' ><a>Signup</a></Link></div><br/>
            <div><Link href='/signin' ><a>Signin</a></Link></div>
           </Private>
        </Layout>
    )
}
export default Userindex
