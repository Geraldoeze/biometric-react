import { useEffect, useState, useContext, useReducer } from 'react';

import {
  Box,
  TextField,
  Checkbox,
  ListItemText,
  Typography,
  OutlinedInput,
  Stack,
  Container,
  FormControl,
  MenuItem,
  InputLabel,
} from '@mui/material';
import { useForm } from 'react-hook-form';

import { LoadingButton } from '@mui/lab';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate, useLocation } from 'react-router-dom';

import { AuthContext } from '../../../context/auth-context';
import { useHttpClient } from '../../../hooks/http-hook';

import Modal from '../../../UIElement/Modal/Modal';
import LoadingSpinner from '../../../UIElement/LoadingSpinner';
import ErrorModal from '../../../UIElement/Modal/ErrorModal';

const RandomId = 100000 + Math.floor(Math.random() * 900000);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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



const NewUserForm = ({ dept }) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [sex, setSex] = useState('');
  const [depart, setDepart] = useState('');
  const [course, setCourse] = useState([]);

  const [inputState, dispatch] = useReducer(inputReducer, {
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        origin: ''
      });

  
  const { isLoading, error, sendRequest, clearError, resMessage } = useHttpClient();
  
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const newUserData = {...inputState, gender: sex, department: depart,
    courses: course, studentId: RandomId, atClass: 0
    }
        try {
          const send = await sendRequest(`http://localhost:7000/users/create`, 'POST', newUserData);
          console.log(send);
          
          navigate('/dashboard', { replace: true });
        } catch (err) {
          console.log(err);
        }
  };
  const handleChange = (event: SelectChangeEvent) => {
    setSex(event.target.value);
  };
  const handleChangeDept = (event: SelectChangeEvent) => {
    setDepart(event.target.value);
  };
  const handleChangeCourse = (event: SelectChangeEvent<typeof course>) => {
    const {
      target: { value },
    } = event;
    setCourse(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };


  const changeHandler = e => {
        dispatch({
          type: 'HANDLE_INPUT',
          field: e.target.name,
          payload: e.target.value
        });
      };

      

  return (
    <>
      {isLoading && <LoadingSpinner />}
<ErrorModal error={error} open={error} onClose={clearError} response={resMessage} />
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography sx={{color: '#000080'}} variant="h6" gutterBottom>
            Complete the Form below!
          </Typography>
        </Stack>
        {dept ? (
          <Box sx={{ maxWidth: '30rem', alignItems: 'center' }} >
            <Box component="form" noValidate autoComplete="off" onSubmit={(e) => onSubmitHandler(e)}>
              <Stack direction="row" width="100%" alignItems="center" justifyContent="space-between">
                <TextField sx={{ mb: 2 }} id="firstName" name="firstName" label="First Name" variant="outlined" onChange={(e) => changeHandler(e)} value={inputState.firstName}/>
                <TextField sx={{ mb: 2 }} id="lastName" label="Last Name" name="lastName" variant="outlined" onChange={(e) => changeHandler(e)} value={inputState.lastName}/>
              </Stack>
              <TextField sx={{ mb: 2 }} id="email" label="Email" name="email" fullWidth variant="outlined" type="email" onChange={(e) => changeHandler(e)} value={inputState.email}/>
              <Stack direction="column" justifyContent="space-between">
                <FormControl sx={{ my: 2, width: 200 }} >
                  <InputLabel id="demo-simple-select-helper-label" name="gender" >Gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={sex}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                </FormControl>

                <FormControl sx={{ my: 2, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label" name="department">Department</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="department"
                    value={depart}
                    label="Department"
                    onChange={handleChangeDept}
                  >
                    {dept?.map((val, idx) => {
                      return (
                        <MenuItem value={val.department} key={val._id}>
                          {val.department}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                {depart && (
                  <FormControl sx={{ my: 2, width: 300 }}>
                    <InputLabel id="demo-simple-select-helper-label" name="course">Courses</InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="course"
                      multiple
                      value={course}
                      onChange={handleChangeCourse}
                      input={<OutlinedInput label="Courses" />}
                      renderValue={(selected) => selected.join(', ')}
                      MenuProps={MenuProps}
                    >
                      {dept
                        ?.find((val, id) => val.department === depart)
                        ?.courses.map((cors, idx) => (
                          <MenuItem value={cors} key={idx}>
                            <Checkbox checked={course.indexOf(cors) > -1} />
                            <ListItemText primary={cors} />
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                )}
              </Stack>

              <TextField sx={{ mb: 2 }} id="address" name="address" label="Address" fullWidth variant="outlined" onChange={(e) => changeHandler(e)} value={inputState.address}/>
              <TextField sx={{ mb: 2 }} id="origin" name="origin" label="State of Origin" fullWidth variant="outlined" onChange={(e) => changeHandler(e)} value={inputState.origin}/>

              <LoadingButton
                variant="contained"
                fullWidth
                type="submit"
                loading={loading}
                sx={{ py: '0.8rem', mt: '1rem' }}
              >
                Submit
              </LoadingButton>
            </Box>
          </Box>
        ) : (
          <Stack direction="row" alignItems="center" justifyContent="space-between" my={2}>
            <Typography variant="h6" gutterBottom>
              No Department Exist for Now, Try again later.
            </Typography>
          </Stack>
        )}
      </Container>
    </>
  );
};

export default NewUserForm;
