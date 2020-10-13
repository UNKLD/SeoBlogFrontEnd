import Link from 'next/link'
import Layout from '../components/Layout'

const index = () => {
   return (
       <Layout>
            <h2>Hello <Link href='/about' ><a>About</a></Link></h2>
            <Link href='/signup' ><a>Signup</a></Link>
            <Link href='/signin' ><a>Signin</a></Link>
        </Layout>
    )
}
export default index
