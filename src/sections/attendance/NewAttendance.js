import React, { useState, useReducer, useEffect } from 'react';
import {
  Button,
  OutlinedInput,
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useHttpClient } from '../../hooks/http-hook';
import LoadingSpinner from '../../UIElement/LoadingSpinner';

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

const NewAttendance = ({ open, onClose, updateContent }) => {
  const now = dayjs();
  const [date, setDate] = useState(now);
  const [dept, setDept] = useState();
  const [course, setCourse] = useState('');
  const [depart, setDepart] = useState('');
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [inputState, dispatch] = useReducer(inputReducer, {
    lecturer: '',
    location: '',
    attValue: 'open',
    attendance: []
  });

  // fetch department data
  useEffect(() => {
    const getData = async () => {
      try {
        const send = await sendRequest(`http://localhost:7000/admin/getDept`);
        setDept(send.response);
        console.log(send);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const onSubmitHandler = async () => {
    const refinedDate = date.toDate().toString().slice(0, 25);
    const newDepartmentData = { ...inputState, course, department: depart, refinedDate };
    
    if (newDepartmentData?.course?.length >= 1) {
      updateContent(newDepartmentData);
    }
    try {
      const send = await sendRequest(`http://localhost:7000/users/attendance`, 'POST', newDepartmentData);
      console.log(send);
    } catch (err) {
      console.log(err);
    }
    onClose();
  };

  const changeHandler = (e) => {
    dispatch({
      type: 'HANDLE_INPUT',
      field: e.target.name,
      payload: e.target.value,
    });
  };

  const handleChangeDept = (event) => {
    setDepart(event.target.value);
  };

  const handleChangeCourse = (event) => {
    setCourse([event.target.value]);
  };
  return (
    <div>
      {isLoading && <LoadingSpinner asOverlay />}
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Create Attendance</DialogTitle>
        <DialogContent>
          <Box>
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
            <FormControl sx={{ m: 1, minWidth: 250 }}>
              <InputLabel id="demo-simple-select-helper-label" name="department">
                Department
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="department"
                
                value={depart}
                label="Department"
                onChange={handleChangeDept}
              >
                {dept?.map((val, ) => <MenuItem value={val.department} key={val._id}>
                      {val.department}
                    </MenuItem>
                  
                )}
              </Select>
            </FormControl>
            {depart && (
              <FormControl sx={{ m: 1, width: 200 }}>
                <InputLabel id="demo-simple-select-helper-label" name="course">
                  Courses
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="course"
                  label="Course"
                  value={course}
                  size="small"
                  onChange={handleChangeCourse}
                  input={<OutlinedInput label="Courses" />}
                >
                  {dept
                    ?.find((val) => val.department === depart)
                    ?.courses.map((cors, idx) => <MenuItem value={cors} key={idx}>{cors}</MenuItem>
                    )}
                </Select>
              </FormControl>
            )}
           
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
          <Button type="submit" onClick={onSubmitHandler}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewAttendance;
