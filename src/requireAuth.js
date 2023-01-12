import {Navigate} from 'react-router';



export default function RequireAuth({ children }) {
const val = JSON.parse(localStorage.getItem('userData'))

    console.log(val)

    return !!val === true ? children : <Navigate to="/auth"  />;
  }