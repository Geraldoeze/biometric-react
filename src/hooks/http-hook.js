import axios from 'axios';

import { useState, useCallback, useEffect } from 'react';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  
  

  const sendRequest = useCallback(
    async (urlink, methodlink = 'GET', body = null) => {
      setIsLoading(true);
    
      try {
        const response = await axios({
            url: urlink,
            method: methodlink,
            data: body
        });

        const responseData = await response.data;
        setError(responseData)
        if (!response.status === 200) {
          
          throw new Error(responseData.message);
        }

        setIsLoading(false);
        
        return responseData;
      } catch (err) {
        setError(err.response.data);
        setIsLoading(false);
        
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
    
  };

  useEffect(() => {
    // 
  }, []);

  return { isLoading, error, sendRequest, clearError,  };
};
