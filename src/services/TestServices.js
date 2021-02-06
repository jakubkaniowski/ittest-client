import axios from './common';

const TestServices = {
  create: () => {
    const url = '/test';
    return axios.get(url, {
      params: {
        useAuthorization: true,
      },
    });
  },
  getAllCompletedTests: () => {
    const url = '/test/all?status=COMPLETED';
    return axios.get(url, {
      params: {
        useAuthorization: true,
      },
    });
  },
  getAllPendingTests: () => {
    const url = '/test/all?status=PENDING';
    return axios.get(url, {
      params: {
        useAuthorization: true,
      },
    });
  },
  getSingleTest: ({ id }) => {
    const url = `/test/${id}`;
    return axios.get(url, {
      params: {
        useAuthorization: true,
      },
    });
  },
  removeSingleTest: ({ id }) => {
    const url = `/test/${id}`;
    axios.delete(url, {
      params: {
        useAuthorization: true,
      },
    });
  },
  answer: ({ id, answer }) => {
    const url = `/test/${id}/answer`;
    return axios.post(url, {
      useAuthorization: true,
      ...answer,
    });
  },
  result: ({ id }) => {
    const url = `/test/${id}/result`;
    return axios.get(url, {
      params: {
        useAuthorization: true,
      },
    });
  },
};

export default TestServices;
