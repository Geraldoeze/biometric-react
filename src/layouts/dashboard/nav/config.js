import React, { useContext} from 'react';
import { AuthContext } from '../../../context/auth-context'


// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;


const NavConfig = () => {
  
  const auth = useContext(AuthContext);
  const {isLoggedIn} = auth

  const loggedIn = [
    {
      title: 'dashboard',
      path: '/dashboard/app',
      icon: icon('ic_analytics'),
    },
    {
      title: 'student list',
      path: '/dashboard/user',
      icon: icon('ic_user'),
    },
    {
      title: 'new Student',
      path: '/admin/new',
      icon: icon('ic_user'),
    },
    {
      title: 'attendance',
      path: '/admin/attendace',
      icon: icon('ic_lock'),
    },
    {
      title: 'admin',
      path: '/admin',
      icon: icon('ic_lock'),
    },
  ]

  const notLoggedIn = [
    {
      title: 'login',
      path: '/auth',
      icon: icon('ic_lock'),
    },
  ]
  const content = isLoggedIn ? loggedIn : notLoggedIn
  return ( content )
   
}
 
export default NavConfig;

// export default navConfig;
