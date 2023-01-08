import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import UserssPage from './pages/User_Page';

import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
// import SignUpPage from './pages/SignUpPage';

import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

import Page404 from './pages/Page404';


import AdminPage from './pages/AdminPage';
import NewUserPage from './pages/NewUserPage';
import EditUserPage from './pages/EditUserPage';
import DepartmentPage from './pages/DepartmentPage';

import DashboardAppPage from './pages/DashboardAppPage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    
    {
      path: '/auth', 
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/auth/login" />, index: true },
        { path: 'login', element:  <LoginPage /> },
        { path: 'forgotPassword', element:  <ForgotPasswordPage />, },
        // {  path: 'register', element: <SignUpPage /> },
        {  path: 'resetPassword/:id/:id', element: <ResetPasswordPage /> },
      ],
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true},
        { path: 'app', element: <DashboardAppPage />},
        { path: 'user', element:  <UserPage/>   },
        { path: 'student/:id', element:  <UserssPage />   },
      ],
    },

    {
      path: '/admin',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/admin/index" />, index: true},
        { path: 'index', element: <AdminPage />},
        { path: 'new', element:  <NewUserPage />   },
        { path: 'editStudent/:uid', element: <EditUserPage /> },
        { path: 'department', element: <DepartmentPage /> },
        // { path: 'attendance', element:  <UserssPage />   },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/auth/login" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
