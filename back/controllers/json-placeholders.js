const axios = require('axios');
const { response } = require('express');

const getPosts = async (req, res = response, next) => {
  try {
    const URL = 'https://jsonplaceholder.typicode.com/posts';
    const response = await axios.default.get(URL);
    res.json({
      ok: true,
      posts: response.data,
    });
  } catch (error) {
    console.log('Error', error);
    res.status(500).json({
      ok: false,
      msg: 'Error al realizar la solicitud',
    });
  }
};

const getPhotos = async (req, res, next) => {
  const { _page, _limit } = req.query;
  try {
    const URL = 'https://jsonplaceholder.typicode.com/photos';
    const response = await axios.default.get(URL, {
      params: {
        _page,
        _limit,
      },
    });
    res.json({
      ok: true,
      photos: response.data,
      totalCount: response.headers['x-total-count'],
    });
  } catch (error) {
    console.log('Error', error);
    res.status(500).json({
      ok: false,
      msg: 'Error al realizar la solicitud',
    });
  }
};

module.exports = {
  getPosts,
  getPhotos,
};
