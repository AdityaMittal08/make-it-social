import api from "./axiosInstance";

export const postsApi = {
  createPost: async (postData) => {
    const response = await api.post('/posts/', postData);
    return response.data;
  },

  getAllPostsUser: async () => {
    const response = await api.get('/posts/');
    return response.data;
  },

  getAllPostsFeed: async () => {
    const response = await api.get('/posts/home');
    return response.data;
  },

  getPostById: async (postId) => {
    const response = await api.get(`/posts/${postId}`); 
    return response.data;
  },

  deletePost: async (postId) => {
    const response = await api.delete(`/posts/${postId}`);
    return response.data;
  },

  reactToPost: async (postId, reactionType) => {
    const response = await api.post(`/reactions/posts/${postId}`, { reactionType });
    return response.data;
  },

};