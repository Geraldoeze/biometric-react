import React, { useState, useReducer, useEffect } from 'react';
import { Button, Box, TextField, Stack, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



import { useHttpClient } from '../../hooks/http-hook';



// initial reducer state
const inputReducer = (state, action) => {
  switch (action.type) {
    case 'HANDLE_INPUT':
      return {
        ...state,
        [action.field]: action.payload,
          }
          default:
            return state;
  }
};


const NewAttendance = ({open, onClose, updateContent}) => {
    const now = dayjs();
    const [date, setDate] = useState(now)
    const [ course, setCourse] = useState([]);
const { isLoading, error, sendRequest, clearError } = useHttpClient();

    
    const [inputState, dispatch] = useReducer(inputReducer, {
        department: '',
        lecturer: '',
        location: '',
        attValue: 'open'
      });
    
      useEffect(() => {
        // Refresh the page
        console.log('Refreshing')
      }, []);
      
      const onSubmitHandler = async (e) => {
    const refinedDate = date.toDate().toString().slice(0, 25)
        const newDepartmentData = {...inputState, course, refinedDate}
        if (newDepartmentData?.course?.length >= 1) {
            updateContent(newDepartmentData);
        }
        try {
            const send = await sendRequest(`http://localhost:7000/users/attendance`, 'POST', newDepartmentData);
            console.log(send);
          } catch (err) {
            console.log(err);
          }
          onClose()  
      };

      const changeHandler = e => {
        dispatch({
          type: 'HANDLE_INPUT',
          field: e.target.name,
          payload: e.target.value
        });
      };
   

    return ( 
        <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Create Attendance</DialogTitle>
        <DialogContent>
        <Box >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Current Date"
        value={date}
        onChange={(newValue) => {
          setDate(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
        
          <TextField
            autoFocus
            sx={{ mx: 1, width: 150 }} 
            name="department"
            id="department"
            label="Department"
            type="text"
            value={inputState.department}
            onChange={(e) => changeHandler(e)}

            variant="outlined"

          />
          <TextField size="small" variant="filled" sx={{ m: 1, width: 150 }} id="course" name="course" label="Course Code"  variant="outlined" onChange={(e) => setCourse(() => [e.target.value])} value={course}/>
          <TextField
            autoFocus
            sx={{ m: 1, width: 150 }} 
            name="lecturer"
            id="lecturer"
            label="Lecturer"
            type="text"
            value={inputState.lecturer}
            onChange={(e) => changeHandler(e)}
            size="small"
            variant="outlined"

          />
           <TextField
            autoFocus
            sx={{ m: 1, width: 150 }} 
            name="location"
            id="location"
            label="Location"
            type="text"
            value={inputState.location}
            onChange={(e) => changeHandler(e)}
            size="small"
            variant="outlined"

          />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" onClick={onSubmitHandler}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
     );
}
 
export default NewAttendance;
