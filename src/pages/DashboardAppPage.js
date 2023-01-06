import { Helmet } from 'react-helmet-async';
import {useState, useEffect} from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Typography, Stack } from '@mui/material';

import { DashboardUser } from '../components/dashboardUser';

import { useHttpClient } from '../hooks/http-hook';

import LoadingSpinner from '../UIElement/LoadingSpinner';
// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const [ response, setResponse ] = useState(); 
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
console.log(response)
  return (
    <>
    
      <Helmet>
        <title> Dashboard  </title>
      </Helmet>

      <Container maxWidth="xl">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="h5">
            All Users
          </Typography>
        </Stack>
        {isLoading && <LoadingSpinner asOverlay />}
        {response && <DashboardUser responseData={response} />}
      </Container>
    </>
  );
}
