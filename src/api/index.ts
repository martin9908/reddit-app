import axios from 'axios';
const baseUrl = 'https://www.reddit.com';

export const get = () =>
  axios.get(`${baseUrl}/r/reactnative.json`).then(response => {
    return response;
  });
