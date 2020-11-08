import axios from 'axios';
import authHeader from './auth-header';

const API_URL = '/api/json-placeholder';

const getPosts = async () => {
  return await axios
    .get(API_URL + '/posts', { headers: authHeader() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log('ERROR while fetching posts', error);
    });
};

const getPhotos = async (params) => {
  return await axios
    .get(API_URL + '/photos', { headers: authHeader(), params })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log('ERROR while fetching photos', error);
      return;
    });
};

export default {
  getPosts,
  getPhotos,
};
