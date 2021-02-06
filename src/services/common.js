import axios from 'axios';
import { AUTH_TOKEN_NAME, BASIC_API_URL } from '../utils/const';

export const createAxiosInstance = () => {
  const defaultOptions = {
    baseURL: BASIC_API_URL,
    headers: {
      'Content-type': 'application/json',
    },
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.response.use(null, (error) => {
    if (error.response && error.response.status === 403) {
      window.localStorage.removeAll();
      window.location.reload();
    }
    return Promise.reject(error);
  });

  instance.interceptors.request.use((config) => {
    const localConfig = { ...config };
    const { method } = localConfig;
    let objName = 'data';

    switch (method.toLowerCase()) {
      case 'delete':
      case 'get':
        objName = 'params';
        break;

      case 'post':
        objName = 'data';
        break;
      default:
        break;
    }

    if (localConfig[objName] && localConfig[objName].useAuthorization === true) {
      const token = window.localStorage.getItem(AUTH_TOKEN_NAME);
      localConfig.headers.Authorization = token ? `Bearer ${token}` : '';
      localConfig[objName].useAuthorization = undefined;
    }

    return localConfig;
  });

  return instance;
};

const axiosInstance = createAxiosInstance();

export default axiosInstance;
