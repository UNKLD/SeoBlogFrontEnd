import { useState } from 'react';
import Link from 'next/link'
import { APP_NAME } from '../config'
import { signout, isAuth } from '../actions/auth'
import Router from 'next/router';
import NProgress from 'nprogress'
import Search from './blog/Search';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap';

Router.onRouteChangeStart = url => NProgress.start()
Router.onRouteChangeComplete = url => NProgress.done()
Router.onRouteChangeError = url => NProgress.done()

const Header = () => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

 return (
   <>
     <Navbar color="light" light expand="md">
       <Link href="/">
         <NavLink className="navbar-brand active">{APP_NAME}</NavLink>
       </Link>
       <NavbarToggler onClick={toggle} />
       <Collapse isOpen={isOpen} navbar>
         <Nav className="ml-auto">

           <NavItem>
             <Link href="/blogs">
               <NavLink>Blogs</NavLink>
             </Link>
           </NavItem>

           {!isAuth() &&
             <>
               <NavItem>
                 <Link href="/signin">
                   <NavLink> Signin </NavLink>
                 </Link>
               </NavItem>

               <NavItem>
                 <Link href="/signup">
                   <NavLink> Signup </NavLink>
                 </Link>
               </NavItem>
             </>
           }

           {isAuth() && isAuth().role === 0 &&
             <NavItem>
               <Link href='/user'>
                 <NavLink>{`${isAuth().name}'s Dashboard`}</NavLink>
               </Link>
             </NavItem>
           }

           {isAuth() && isAuth().role === 1 &&
             <NavItem>
               <Link href='/admin'>
                 <NavLink>{`${isAuth().name}'s Dashboard`}</NavLink>
               </Link>
             </NavItem>
           }

           <NavItem>
             <Link href="/contact">
               <NavLink>Contact</NavLink>
             </Link>
           </NavItem>

           {isAuth() &&
             <NavItem>
               <NavLink style={{cursor:'pointer'}} onClick={() => signout(() => Router.replace('/signin'))}> Signout </NavLink>
             </NavItem>
           }

           <NavItem>
             {isAuth() && <Link href="/user/crud/blog">
               <NavLink className="btn btn-primary"> Write a blog </NavLink>
             </Link>}
             {!isAuth() && <Link href="/signup">
               <NavLink className="btn btn-primary"> Write a blog </NavLink>
             </Link>}
           </NavItem>
         </Nav>
       </Collapse>
     </Navbar>
     <Search />
   </>
    );
}
export default Header;
