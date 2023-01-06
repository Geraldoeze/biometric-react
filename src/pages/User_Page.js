import { useEffect, useState } from 'react';
import { Container, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Iconify from '../components/iconify';


import { useHttpClient } from '../hooks/http-hook';
import LoadingSpinner from '../UIElement/LoadingSpinner';



const StyledDiv = styled('div')(({ theme }) => ({
  margin: '0',
  border: '10px',
  width: '95%',
  padding: '1rem',
  backgroundColor: '#fef',
  borderRadius: '5px',
  
}));


const UserssPage = () => {
    const [data, setData] = useState();
    const {isLoading, sendRequest, error, clearError} = useHttpClient();
    const  getUserId = window.location.pathname.split('/');
    const userId = getUserId[getUserId.length - 1];
    
    useEffect(() => {
        const studentData = async () => {
            try {
             const send = await sendRequest(`http://localhost:7000/users/getUser/${userId}`)
             setData(send.response);
             console.log(data)
            } catch (err) {
              console.log(err)
            }
        }
        studentData()
    }, [])

    console.log(data);
    return ( 
        <>
        {isLoading && <LoadingSpinner /> }
        <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" >
          <Typography variant="h4" gutterBottom>
            Student Details
          </Typography>
          <Button sx={{backgroundColor: 'cornflowerblue'}} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Edit Details
          </Button>
        </Stack>

        {isLoading && <LoadingSpinner asOverlay />}
        { data && data?.map((val, ide) => {
          return (
            <StyledDiv key={val._id}>
            <Stack direction="row" alignItems="start"  my={1}> 
            <Typography variant="h6" gutterBottom width="45%" my={1} >
            First Name : {val.firstName}
          </Typography>
          <Typography variant="h6" gutterBottom my={1} >
            Last Name : {val.lastName}
          </Typography>
          </Stack>
          <Typography variant="h6" gutterBottom my={2}>
            Student ID : {val.studentId}
          </Typography>
          <Typography variant="h6" gutterBottom my={2}>
            Department : { val.department.toUpperCase()}
          </Typography>
          <Typography variant="h6" gutterBottom my={2}>
            Courses :  {val.courses.toString().split(',').join(', ')}
          </Typography>
          <Typography variant="h6" gutterBottom my={2}>
            Attendance : {val.atClass}
          </Typography>
          <Typography variant="h6" gutterBottom my={2}>
            Gender : {val.gender}
          </Typography>
          <Typography variant="h6" gutterBottom my={2}>
            State of Origin : {val.origin}
          </Typography>
          <Typography variant="h6" gutterBottom my={2}>
            Address : {val.address} 
          </Typography>
          </StyledDiv> 
          )
        })
         
         }
        </Container>
        
        </> 
     );
}
 
export default UserssPage;