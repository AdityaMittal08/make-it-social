import api from "./axiosInstance";

export const postsApi = {
  createPost: async (postData) => {
    const response = await api.post('/posts/', postData);
    return response.data;
  },

  getAllPosts: async () => {
    const response = await api.get('/posts/');
    return response.data;
  },

  getPostById: async (postId) => {
    const response = await api.get(`/posts/${postId}`); 
    return response.data;
  },

  deletePost: async (postId) => {
    const response = await api.delete(`/posts/${postId}`);
    return response.data;
  }
};