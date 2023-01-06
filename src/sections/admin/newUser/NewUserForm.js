import { useEffect, useState, useContext } from 'react';

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

const NewUserForm = ({ dept }) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);

  const [sex, setSex] = useState('');
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [depart, setDepart] = useState('');
  const [course, setCourse] = useState([]);
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    //     try {
    //       const send = await sendRequest(`http://localhost:7000/auth/login`, 'POST', values);
    //       console.log(send);
    //       auth.login(send.userDetails._id, send.token, send.userDetails)
    //       navigate('/dashboard', { replace: true });
    //     } catch (err) {
    //       console.log(err);
    //     }
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

  const com = dept?.find((val, id) => val.department === 'Geography').courses;
  console.log(com);

  return (
    <>
      {isLoading && <LoadingSpinner />}

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" gutterBottom>
            Complete the Form below!
          </Typography>
        </Stack>
        {dept ? (
          <Box sx={{ maxWidth: '30rem', alignItems: 'center' }}>
            <Box component="form" noValidate autoComplete="off" onSubmit={(e) => onSubmitHandler(e)}>
              <Stack direction="row" width="100%" alignItems="center" justifyContent="space-between">
                <TextField sx={{ mb: 2 }} id="firstName" label="First Name" variant="outlined" />
                <TextField sx={{ mb: 2 }} id="lastname" label="Last Name" variant="outlined" />
              </Stack>
              <TextField sx={{ mb: 2 }} id="email" label="Email" fullWidth variant="outlined" type="email" />
              <Stack direction="column" justifyContent="space-between">
                <FormControl sx={{ my: 2, width: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">Gender</InputLabel>
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
                  <InputLabel id="demo-simple-select-helper-label">Department</InputLabel>
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
                    <InputLabel id="demo-simple-select-helper-label">Courses</InputLabel>
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

              <TextField sx={{ mb: 2 }} id="address" label="Address" fullWidth variant="outlined" />
              <TextField sx={{ mb: 2 }} id="origin" label="State of Origin" fullWidth variant="outlined" />

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
