import { useState, useReducer, useEffect } from 'react';
import {
  Button,
  Typography,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import { useHttpClient } from '../../hooks/http-hook';
import LoadingSpinner from '../../UIElement/LoadingSpinner';

const CloseAttendance = ({ open, onClose, values, updateContent }) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const closeHandler = async () => {
    const id = values?._id;
    const newVal = { ...values, attValue: 'close' };

    updateContent(newVal);
    const closeValue = await sendRequest(`http://localhost:7000/users/closeAtt/${id}`, 'PUT', newVal);
    console.log(closeValue)
    onClose();
  };

  return (
    <div>
      {isLoading && <LoadingSpinner overlay />}
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Close Attendance</DialogTitle>
        <DialogContent>
          <Stack>
            <Typography sx={{ color: '#000080' }} variant="h5" gutterBottom>
              Are you sure you want to close {values?.department} Attendance?
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>CANCEL</Button>
          <Button type="submit" onClick={closeHandler}>
            CLOSE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CloseAttendance;
