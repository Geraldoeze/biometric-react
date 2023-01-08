import { Helmet } from 'react-helmet-async';
import {useState, useEffect} from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Typography, Stack, Button } from '@mui/material';

// import { DashboardUser } from '../components/dashboardUser';
import { AdminIndex } from '../components/adminIndex';
import { useHttpClient } from '../hooks/http-hook';

import LoadingSpinner from '../UIElement/LoadingSpinner';
import DepartmentList from '../sections/admin/Department/DepartmentList';

// ----------------------------------------------------------------------



// ----------------------------------------------------------------------


const DepartmentPage = () => {
  const [ newDept, setNewDept ] = useState(false);
 
    return ( 
        <>
        
        <Helmet>
        <title> Department </title>
      </Helmet>

      <Container maxWidth="xl">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography sx={{color: '#000080'}} variant="h4" gutterBottom>
          Department
          </Typography>
          <Typography sx={{color: '#000080'}} variant="h5" gutterBottom>
            All Department
          </Typography>
        </Stack>
        
        <DepartmentList />
        </Container>
        </>
     );
}
 
export default DepartmentPage;
