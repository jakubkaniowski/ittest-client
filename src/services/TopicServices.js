import http from './common';

const getTopics = ({ category }) => {
  let request;
  switch (category) {
    case 'html':
      request = http.get('https://run.mocky.io/v3/0d67789b-a825-44af-91f4-3bc241a4779a');
      break;
    case 'css':
      request = http.get('/7d1930b3-6fc9-4761-9b85-57d3aa0fbbca');
      break;
    case 'javascript':
      request = http.get('/e64d0c9e-abf1-4ded-96c0-bb405c408d45');
      break;
    default:
      break;
  }

  return request;
};

export default {
  getTopics,
};
