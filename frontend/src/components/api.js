import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3006'; // Use your server's port (3006)
const api = axios.create({
  baseURL: baseURL
});

export default api;
