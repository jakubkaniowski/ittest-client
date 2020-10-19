import http from './common';

const getCategories = () => http.get('/7c188898-993c-4375-908a-7bdf0d23e2d0');

export default {
  getCategories,
};
