import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
// @mui

import { Container, Typography, Stack } from '@mui/material';

import { DashboardUser } from '../components/dashboardUser';

import { useHttpClient } from '../hooks/http-hook';

import LoadingSpinner from '../UIElement/LoadingSpinner';
import ErrorModal from '../UIElement/Modal/ErrorModal';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const [response, setResponse] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  // fetch students data
  useEffect(() => {
    const getData = async () => {
      try {
        const send = await sendRequest(`http://localhost:7000/users`);
        setResponse(send.response);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <>
      <Helmet>
        <title> Dashboard </title>  
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography sx={{ color: '#000080' }} variant="h4" gutterBottom>
            Dashboard
          </Typography>
          <Typography sx={{ color: '#000080' }} variant="h5">
            All Users
          </Typography>
        </Stack>
        {isLoading && <LoadingSpinner asOverlay />}
        <ErrorModal open={error} error={error} onClose={clearError} response={null} />
        {response && <DashboardUser responseData={response} />}
      </Container>
    </>
  );
}
