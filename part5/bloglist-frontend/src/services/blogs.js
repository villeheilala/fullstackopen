import axios from 'axios';

const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getConfig = () => ({
  headers: { Authorization: token },
});

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, getConfig());
  return response.data;
};

const update = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject, config);
  return response.data;
};

const deleteBlog = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${blogId}`, config);
  return response.status;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export default {
  getAll, create, update, deleteBlog, setToken,
};
