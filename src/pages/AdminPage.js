import { Helmet } from 'react-helmet-async';
import {useState, useEffect, useContext} from 'react';
import { Container, Typography, Stack, Button } from '@mui/material';

import { styled } from '@mui/material/styles';

import Iconify from '../components/iconify';
import  { AdminIndex } from '../components/adminIndex'
import { DashboardUser } from '../components/dashboardUser';
import { AuthContext } from '../context/auth-context';
import { useHttpClient } from '../hooks/http-hook';

import LoadingSpinner from '../UIElement/LoadingSpinner';

const AdminPage = () => {
    const [ response, setResponse ] = useState(); 
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest } = useHttpClient();

     // fetch students data
  useEffect(() => {
    const getData = async () => {
    try {
     const send = await sendRequest(`http://localhost:7000/users`)
     setResponse(send.response)
     console.log(send);
    } catch (err) {
      console.log(err)
    }
  }
  getData();
 },[])

 console.log(auth.userDetails)
    return ( 
        <>
             <Helmet>
                <title> Admin  </title>
            </Helmet>

            <Container   maxWidth="xl">
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Admin
          </Typography>
          <Stack direction="column" alignItems="flex-end" >
          <Typography variant="h6">
            {auth?.userDetails?.name}
          </Typography>
          <Typography variant="h6">
            {auth?.userDetails?.email}
          </Typography>
          </Stack>
            </Stack> 
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
           
          <Button sx={{backgroundColor: 'cornflowerblue'}} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Department
          </Button>
          <Button sx={{backgroundColor: 'cornflowerblue'}} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Student
          </Button>
            </Stack>
            <Stack direction="column" alignItems="center" justifyContent="space-between" mb={5}>
              {isLoading && <LoadingSpinner />}
               {response && <AdminIndex responseData={response} />}
            </Stack>
            </Container>
        </>
     )
}
 
export default AdminPage;