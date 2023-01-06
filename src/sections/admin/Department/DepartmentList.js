import { useState, useEffect } from 'react';
import { Box, TextField, Stack, Typography, Container, Popover, IconButton, MenuItem } from '@mui/material';

import { styled } from '@mui/material/styles';
import Iconify from '../../../components/iconify';

import { useHttpClient } from '../../../hooks/http-hook';
import LoadingSpinner from '../../../UIElement/LoadingSpinner';


const StyledDiv = styled('div')(({ theme }) => ({
  margin: '0',
  display: 'flex',
}));

const DepartmentList = () => {
  const [response, setResponse] = useState();
  const [open, setOpen] = useState(null);
  const { isLoading, sendRequest, error, clearError } = useHttpClient();

  // fetch department data
  useEffect(() => {
    const getData = async () => {
      try {
        const send = await sendRequest(`http://localhost:7000/admin/getDept`);
        setResponse(send.response);
        console.log(send);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);

    console.log(event);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const editHandler = (e, val) => {
    console.log(val);
    setOpen(null);
  };

  const deleteHandler = async (e, id) => {
    setOpen(null);
    setResponse((response) => {
        return response?.filter(del => del._id !== id)
        
        
    })
    console.log(response)
    const deleteDept = await sendRequest(`http://localhost:7000/admin/deleteDept/${id}`, "DELETE")
    console.log(deleteDept)
  }
console.log(!response)
  return (
    <>
      <Container>
        <Stack direction="row" justifyContent="space-between" sx={{ my: 2 }}>
          <Typography variant="h5">List of Department</Typography>
        </Stack>
        {isLoading && <LoadingSpinner />}
        {response &&
          response?.map((val, ind, arr) => {
            return (
              <Container key={val._id}>
                <StyledDiv>
                  <Stack direction="column"  justifyContent="space-between" sx={{ my: 2 }}>
                    <Typography variant="h6">Department : {val.department.toUpperCase()}</Typography>
                    <Typography variant="h6">Courses : {val.courses.toString().split(',').join(', ')}</Typography>
                  </Stack>
                  <Stack alignItems="center">
                    <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                      <Iconify icon={'eva:more-vertical-fill'} />
                    </IconButton>
                  </Stack>
                </StyledDiv>
                <Popover
                  open={Boolean(open)}
                  anchorEl={open}
                  onClose={handleCloseMenu}
                  anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  PaperProps={{
                    sx: {
                      p: 1,
                      width: 140,
                      '& .MuiMenuItem-root': {
                        px: 1,
                        typography: 'body2',
                        borderRadius: 0.75,
                      },
                    },
                  }}
                >
                  <MenuItem onClick={(e) => editHandler(e, val)}>
                    <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                    Edit
                  </MenuItem>

                  <MenuItem onClick={(e) => deleteHandler(e, val._id)} sx={{ color: 'error.main' }}>
                    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                    Delete
                  </MenuItem>
                </Popover>
              </Container>
            );
          })
           
        }
         {(response?.length > 0) ? '' :  <Stack direction="column" alignItems="center" justifyContent="space-between" sx={{ my: 5, p: 4 }}>
        <Typography textAlign="center" variant="h6">No Department </Typography>
        </Stack>}
      </Container>
    </>
  );
};

export default DepartmentList;
