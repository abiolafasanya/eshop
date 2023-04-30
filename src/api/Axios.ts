import axios from 'axios';


const Axios = axios.create({
  baseURL: import.meta.env.VITE_STORE_API_URL,
});

// Axios.defaults.headers.common[
//   'Authorization'
// ] = `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`;

Axios.defaults.headers.post['Content-Type'] = 'application/json';

export default Axios;