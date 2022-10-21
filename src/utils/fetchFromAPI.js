import axios from 'axios';

export const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

const options = {
  params: {
    maxResults: 100,
  },
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
  },
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);

  return data;
};


export const BASE = 'https://youtube138.p.rapidapi.com/playlist/'

const option = {
  params: {maxResults: 100, hl: 'en', gl: 'IN'},
  headers: {
    'X-RapidAPI-Key': '3d1ee21f08mshf726e6fd1c86087p130966jsn561c9db36d82',
    'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
  }
};

