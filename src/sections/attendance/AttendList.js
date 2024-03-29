import { useReducer, useState } from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

import Modal from '../../UIElement/Modal/Modal';

import AddUserAtt from './AddUserAtt';
import './attendDance.css';


const StyledDiv = styled('div')(({ theme }) => ({
  width: '100%',
  height: '70%',
  overflow: 'auto',
  margin: '1rem',
}));

const RandomId = 100000 + Math.floor(Math.random() * 900000);


// initial reducer state
const inputReducer = (state, action) => {
    switch (action.type) {
      case 'HANDLE_INPUT':
        return {
          ...state,
          [action.field]: action.payload,
        };
      default:
        return state;
    }
  };


const AttendList = ({ value, openList, closeList }) => {
  
    const [ openAdd, setOpenAdd ] = useState(false);

    const [inputState, dispatch] = useReducer(inputReducer, {
        attendance: value?.attendance
      });
    
    const onOpenAdd = () => {
        setOpenAdd(true);
    }


    const closeOpenAdd = () => {
        setOpenAdd(false);
    }

    const changeAttHandler = (user) => {
      
        dispatch({
          type: 'HANDLE_INPUT',
          field: 'attendance',
          payload: [...inputState?.attendance, user],
        });
      };
  
    
  return (
      <>
     {openAdd && <AddUserAtt value={value} open={openAdd} onClose={closeOpenAdd} updateContent={changeAttHandler} /> }
     
    <Modal open={openList} close={closeList}>
      <Stack direction="column" alignItems="center" justifyContent="space-between" sx={{ my: 0.1, p: 1 }}>
        <Typography variant="h5"> Attendance List for {value?.course}</Typography>
      </Stack>
      <StyledDiv>
        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <table className="customers" >
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                    {inputState?.attendance?.map(emp => (
                            <tr key={emp._id}>
                                <td>{emp.matric}</td>
                                <td>{emp.firstName}</td>
                                <td>{emp.lastName}</td>
                             
                            </tr>
                        ))}
                    </tbody>
                </table>
        </Box>
        {(inputState?.attendance?.length === 0) && (
        <Stack direction="column" alignItems="center" justifyContent="space-between" sx={{ my: 0.1, p: 1 }}>
        <Typography variant="h5">No Student Attended this Course</Typography>
        </Stack>
        )}
      </StyledDiv>
      <Stack sx={{m:1}} direction="row" alignItems="center" justifyContent="space-between">
      <Button onClick={closeList}>Close</Button>
      {value?.attValue === 'open' && (<Button onClick={onOpenAdd}>Add </Button> )}
      </Stack> 
      
     </Modal> 
    </>
  );
};

export default AttendList;
