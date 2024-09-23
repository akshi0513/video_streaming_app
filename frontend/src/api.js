import axios from 'axios';

const API_URL = 'http://localhost:9002';

// Axios instance for authenticated requests
const api = axios.create({
  baseURL: API_URL,
});

// Include token in requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  
  // Attach Authorization token if available
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Dynamically set Content-Type
  if (!(config.data instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json'; // Set JSON header only for non-FormData
  }

  return config;
});

// API functions

// User authentication
export const login = (email, password) => api.post('/api/auth/login', { email, password });
export const register = (username, email, password) => api.post('/api/auth/register', { username, email, password });

// Upload video - FormData automatically sets Content-Type to multipart/form-data
export const uploadVideo = (formData) => api.post('/api/videos/upload', formData);

// Fetch list of videos with pagination and search functionality
export const fetchVideos = (search = '', page = 1) => {
    return axios.get(`${API_URL}/api/videos?search=${encodeURIComponent(search)}&page=${page}`);
  };
  

// Stream video - returns the full URL to the video stream endpoint
export const streamVideo = (id) => `${API_URL}/api/videos/stream/${id}`;

// Add a comment
export const addComment = (videoId, comment) => {
    return api.post('/api/comments/comment', { videoId, comment });
  };
  
  // Like a comment
  export const likeComment = (commentId) => {
    return api.post(`/api/comments/comment/${commentId}/like`);
  };
  
  // Dislike a comment
  export const dislikeComment = (commentId) => {
    return api.post(`/api/comments/comment/${commentId}/dislike`);
  };
  
  // Get comments for a video
  export const getComments = (videoId) => {
    return api.get(`/api/comments?videoId=${videoId}`);
  };
  
