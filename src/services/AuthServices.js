import axios from './common';

const AuthServices = {
  register: ({ credentials }) => {
    const url = '/auth/signup';
    return axios.post(url, {
      ...credentials,
    });
  },
};

export default AuthServices;
