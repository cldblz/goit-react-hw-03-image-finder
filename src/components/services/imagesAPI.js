import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const KEY = '22039510-58c9714a42d9c4cdcc57d29f2';

const fetchImages = async (query, page) => {
  try {
    const response = await axios.get(
      `/?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    const images = await response.data.hits;
    return images;
  } catch (error) {
    console.log(error);
  }
};

export default fetchImages;
