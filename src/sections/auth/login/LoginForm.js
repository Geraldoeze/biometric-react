import { Box, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import {  object, string } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState, useContext } from 'react';
import { LoadingButton } from '@mui/lab';
import { useNavigate, useLocation } from 'react-router-dom';

import { AuthContext } from '../../../context/auth-context';
import { useHttpClient } from '../../../hooks/http-hook';

import Modal from '../../../UIElement/Modal/Modal';
import LoadingSpinner from '../../../UIElement/LoadingSpinner';
  
  const registerSchema = object({
    email: string({required_error: 'Email is required'}).email('Email is invalid'),
    password: string({required_error: 'Password is required'})
      .min(6, 'Password must be more than 6 characters')
      .max(32, 'Password must be less than 32 characters'),
  });
  
  
  const LoginForm = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const { state } = useLocation();
    const [loading, setLoading] = useState(false);
    const { isLoading, error, sendRequest, clearError, } = useHttpClient();
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful]);
  
    const onSubmitHandler = async (values) => {
      try {
        const send = await sendRequest(`http://localhost:7000/auth/login`, 'POST', values);
        console.log(send);
        auth.login(send.userDetails._id, send.token, send.userDetails)
        navigate('/dashboard', { replace: true });
      } catch (err) {
        console.log(err);
      }
    }; 
    console.log(errors);
  
    return (
      <>
      {isLoading && <LoadingSpinner asOverlay />}
      <Modal error={error} onClose={clearError} res={null} closeRes={() => {}} /> 
      <Box sx={{ maxWidth: '30rem' }}>
        <Box
          component='form'
          noValidate
          autoComplete='off'
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <TextField
            sx={{ mb: 2 }}
            label='Email'
            fullWidth
            required
            type='email'
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
            {...register('email')}
          />
          <TextField
            sx={{ mb: 2 }}
            label='Password'
            fullWidth
            required
            type='password'
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
            {...register('password')}
          />
          <LoadingButton
            variant='contained'
            fullWidth
            type='submit'
            loading={loading}
            sx={{ py: '0.8rem', mt: '1rem' }}
          >
            Login
          </LoadingButton>
        </Box>
      </Box>
      </>
    );
  };
  
  export default LoginForm;
  
  