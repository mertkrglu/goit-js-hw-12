import axios from 'axios';

const API_KEY = '25016149-459cc745d60a20aa9a47a0430';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 40, // Ödevde 40 isteniyor
  };

  const response = await axios.get(BASE_URL, { params });
  return response.data;
}
