import { useState } from 'react';
import { Button, Stack, Dialog, DialogActions, DialogContent, DialogTitle, Typography, TextField } from '@mui/material';

import { useHttpClient } from '../../hooks/http-hook';
import LoadingSpinner from '../../UIElement/LoadingSpinner';
import ErrorModal from '../../UIElement/Modal/ErrorModal';

// const userIds = ['63bd99f0043aea136a38e415', '63b94fe7d3d94aa8f1dd3cde', '63bd99f0043aea136a38e415']

// const rand = userIds[Math.floor(Math.random() * userIds.length)]

const AddUserAtt = ({ value, open, onClose, updateContent }) => {
  const { isLoading, error, sendRequest, clearError, resMessage } = useHttpClient();
  const [matric, setMatric] = useState('');
  const [failed, setFailed] = useState(false);

  const onSubmitHandler = async () => {
    const userAtt = {
      attId: value?._id,
      course: value?.course,
      matricId: matric
    };
    
    // token should be sent with the request or it could be added to the POST body

    if (matric?.length >= 5) {
      try {
        const sendMatric = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/admin/getuserId/${userAtt?.attId}`,
          'POST',
          userAtt
        );
        
        updateContent(sendMatric.response);
      } catch (err) {
        console.log(err);
      }
    }
    onClose();
  };

  return (
    <div>
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal error={error} open={error} onClose={clearError} response={resMessage} />
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add Student Attendance</DialogTitle>
        <DialogContent>
          <Stack direction="column" alignItems="center" justifyContent="space-between" m={5}>
            <Typography variant="h5" mb={3}> Input Matric Number Below </Typography>

            <TextField
              sx={{ mb: 2 }}
              label="Matric"
              fullWidth
              required
              type="text"
              value={matric}
              onChange={(e) => setMatric(e.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>CANCEL</Button>
          <Button type="submit" onClick={onSubmitHandler}>
            CONFIRM
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddUserAtt;
