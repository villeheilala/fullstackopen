import axios from 'axios';
import { useState, useEffect } from 'react';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return {
    bind: {
      type,
      value,
      onChange,
      reset,
    },
    reset: () => setValue(''),
    value,
  };
};

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  let token = null;

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      setResources(response.data);
    });
  }, []);

  const getConfig = () => ({
    headers: { Authorization: token },
  });

  const setToken = (newToken) => {
    token = `bearer ${newToken}`;
  };

  const create = async (resource) => {
    const config = {
      headers: { Authorization: token },
    };

    const response = await axios.post(baseUrl, resource, config);
    return response.data;
  };

  const getAll = () => {
    const request = axios.get(baseUrl);
    request.then((response) => setResources(response.data));
  };

  const service = {
    create, setToken, getAll,
  };

  return [
    resources, service,
  ];
};
