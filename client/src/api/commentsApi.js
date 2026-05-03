import api from "./axiosInstance";

export const commentsApi = {
  createComment: async (postId, commentData) => {
    const response = await api.post(`/comments/post/${postId}`, commentData);
    return response.data;
  },

  getAllCommentsUser: async () => {
    const response = await api.get('/comments/user');
    return response.data;
  },

  getAllCommentsPost: async (postId) => {
    const response = await api.get(`/comments/post/${postId}`); 
    return response.data;
  },

  deleteComment: async (commentId) => {
    const response = await api.delete(`/comments/${commentId}`);
    return response.data;
  },
};