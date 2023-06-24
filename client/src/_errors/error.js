import React, { useState } from 'react';
import axios from 'axios';

function HandleError() {
  const [reqError, setReqError] = useState(null);
  const [resError, setResError] = useState(null);

  axios.interceptors.request.use(
    async (config) => {
      console.info('Your current request:', config);
      return config;
    },
    async (error) => {
      setReqError(JSON.stringify(error, null, 4));
      console.error('Your current request error:', error);
      return Promise.reject(error);
    }
  );
  axios.interceptors.response.use(
    async (config) => {
      console.info('Your current response:', config);
      return config;
    },
    async (error) => {
      setResError(JSON.stringify(error, null, 4));
      console.error('Your current response error:', error);
      return Promise.reject(error);
    }
  );

  return (
    <>
      {reqError && (
        <div>
          <p>You have a request error. {reqError}</p>
        </div>
      )}
      {resError && (
        <div>
          <p>You have a request error {resError}</p>
        </div>
      )}
    </>
  );
}

export default HandleError;
