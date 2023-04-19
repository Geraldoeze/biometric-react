import { Box, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { number, object, string } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';

import { useHttpClient } from '../../../hooks/http-hook';

import ErrorModal from '../../../UIElement/Modal/ErrorModal';
import LoadingSpinner from '../../../UIElement/LoadingSpinner';

// adminNumber: string({ required_error: 'Admin Number is required.' }).min(6, 'Admin Number is 6 digit'),
const registerSchema = object({
  name: string({ required_error: 'Name is required' })
    .min(4, 'Name must be more than 4 characters')
    .max(32, 'Name must be less than 100 characters'),
  email: string({ required_error: 'Email is required' }).email('Email is invalid'),
  
  password: string({ required_error: 'Password is required' })
    .min(6, 'Password must be more than 6 characters')
    .max(32, 'Password must be less than 32 characters'),
  passwordConfirm: string({ required_error: 'Please confirm your password' }),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Passwords do not match',
});

const SignUpForm = () => {
  const navigate = useNavigate();

  const { isLoading, error, sendRequest, clearError, resMessage } = useHttpClient();
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    
  }, [isSubmitSuccessful]);


  const onSubmitHandler = async (values) => {
    console.log(values)
    try {
      await sendRequest(`https://biometric-node.vercel.app/auth/register`, 'POST', values);

      navigate('/auth/login', { replace: true });
    } catch (err) {
      console.log(err.message, err.response);
    }
  };
  console.log(errors);

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal error={error} onClose={clearError} response={resMessage} open={resMessage} />
      <Box sx={{ maxWidth: '30rem' }}>
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmitHandler)}>
          <TextField
            sx={{ mb: 2 }}
            label="Name"
            fullWidth
            required
            type="email"
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ''}
            {...register('name')}
          />
          <TextField
            sx={{ mb: 2 }}
            label="Email"
            fullWidth
            required
            type="email"
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
            {...register('email')}
          />
           {/* <TextField
            sx={{ mb: 2 }}
            label="Admin Number"
            fullWidth
            required
            type="number"
            error={!!errors.adminNumber}
            helperText={errors.adminNumber ? errors.adminNumber.message : ''}
            {...register('adminNumber')}
          /> */}
          <TextField
            sx={{ mb: 2 }}
            label="Password"
            fullWidth
            required
            type="password"
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
            {...register('password')}
          />
          <TextField
            sx={{ mb: 2 }}
            label="Confirm Password"
            fullWidth
            required
            type="password"
            error={!!errors.passwordConfirm}
            helperText={errors.passwordConfirm ? errors.passwordConfirm.message : ''}
            {...register('passwordConfirm')}
          />
          <LoadingButton variant="contained" fullWidth type="submit" sx={{ py: '0.8rem', mt: '1rem' }}>
            Submit
          </LoadingButton>
        </Box>
      </Box>
    </>
  );
};

export default SignUpForm;
