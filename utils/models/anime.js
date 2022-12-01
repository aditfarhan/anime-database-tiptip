import axios from 'axios';

const BASE_URL = 'https://api.jikan.moe/v4/anime';

const getAnime = async (page, limit) => {
  return await axios.get(`${BASE_URL}?page=${page}&limit=${limit}`);
};

const getAnimeDetail = async (id) => {
  return await axios.get(`${BASE_URL}/${id}`);
};

const getAnimeRecommendation = async (id) => {
  return await axios.get(`${BASE_URL}/${id}/recommendations`);
};

const ApiAnime = {
  getAnime,
  getAnimeDetail,
  getAnimeRecommendation
};

export default ApiAnime;
