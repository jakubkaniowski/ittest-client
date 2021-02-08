import axios from './common';

const AuthServices = {
  register: ({ credentials }) => {
    const url = '/auth/signup';
    return axios.post(url, {
      ...credentials,
    });
  },
  login: ({ credentials }) => {
    const url = '/auth/login';
    return axios.post(url, {
      ...credentials,
    });
  },
  logout: () => {
    const url = '/logout';
    return axios.post(url, {
      useAuthorization: true,
    });
  },
  user: () => {
    const url = '/me';
    return axios.get(url, {
      params: {
        useAuthorization: true,
      },
    });
  },
  forgot: ({ email }) => {
    const url = '/auth/forgot';
    return axios.post(url, {
      email,
    });
  },
  recoverPassword: ({ details }) => {
    const url = `auth/reset/${details.token}`;
    return axios.post(url, {
      ...details,
    });
  },
  editProfile: ({ details }) => {
    const url = '/edit';
    return axios.put(url, {
      ...details,
      useAuthorization: true,
    });
  },
};

export default AuthServices;
