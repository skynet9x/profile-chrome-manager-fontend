import axios from 'axios';
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/" + process.env.REACT_APP_VERSION,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': "Bearer " + localStorage.getItem("access_token")
  }
});

axiosClient.defaults.withCredentials = true;
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => error
);


export default axiosClient;