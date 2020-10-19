import axios from 'axios';

export default axios.create({
  baseURL: 'https://run.mocky.io/v3',
  headers: {
    'Content-type': 'application/json',
  },
});
