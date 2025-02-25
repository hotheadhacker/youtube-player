import axios from 'axios';

let YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const setApiKey = (newKey) => {
  YOUTUBE_API_KEY = newKey;
};

export async function searchVideos(query) {
  return axios.get(`${BASE_URL}/search`, {
    params: {
      part: 'snippet',
      key: YOUTUBE_API_KEY,
      type: 'video',
      maxResults: 20,
      q: query
    }
  });
}

export async function getPlaylistItems(playlistId) {
  return axios.get(`${BASE_URL}/playlistItems`, {
    params: {
      part: 'snippet',
      maxResults: 100,
      key: YOUTUBE_API_KEY,
      playlistId
    }
  });
} 