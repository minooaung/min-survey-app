import axios from "axios";
import {Navigate} from "react-router-dom";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ACCESS_TOKEN'); //TODO

  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

axiosClient.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('ACCESS_TOKEN')
    // <Navigate to='/login' />

    return error;
  }

  throw error;
});
export default axiosClient;
