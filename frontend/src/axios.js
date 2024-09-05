import axios from "axios";
import {Navigate} from "react-router-dom";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})

axiosClient.interceptors.request.use((config) => {
  const token = '123'; //TODO

  config.headers.Authorization = `Bearer ${token}`;
}, (error) => {

});

axiosClient.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.status === 401) {
    <Navigate to='/login' />

    return error;
  }

  throw error;
});
export default axiosClient;
