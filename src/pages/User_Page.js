import { useEffect, useState } from 'react';
import { Container, Typography, Stack, Button } from '@mui/material';
import Iconify from '../components/iconify';

import { useHttpClient } from '../hooks/http-hook';
import LoadingSpinner from '../UIElement/LoadingSpinner';

const UserssPage = () => {
    const [data, setData] = useState();
    const {isLoading, sendRequest, error, clearError} = useHttpClient();
    const  getUserId = window.location.pathname.split('/');
    const userId = getUserId[getUserId.length - 1];
    
    useEffect(() => {
        const studentData = async () => {
            try {
             const send = await sendRequest(`http://localhost:7000/users/getUser/${userId}`)
             setData(send)
             console.log(send);
            } catch (err) {
              console.log(err)
            }
        }
        studentData()
    }, [])


    return ( 
        <>
        <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Student Details
          </Typography>
          <Button sx={{backgroundColor: 'cornflowerblue'}} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Edit Details
          </Button>
        </Stack>

        {isLoading && <LoadingSpinner asOverlay />}
        { data && <div>Student data</div> }
        </Container>
        
        </> 
     );
}
 
export default UserssPage;