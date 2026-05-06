import api from "./axiosInstance";

export const followersApi = {
  followUser: async (username) => {
    const response = await api.post(`/follows/${username}/follow`);
    return response.data;
  },

  unfollowUser: async (username) => {
    const response = await api.delete(`/follows/${username}/follow`);
    return response.data;
  },

  checkFollowStatus: async (username) => {
    const response = await api.get(`/follows/${username}/follow-status`);
    return response.data;
  },

  getFollowers: async (username) => {
    const response = await api.get(`/follows/${username}/followers`);
    return response.data;
  },

  getFollowing: async (username) => {
    const response = await api.get(`/follows/${username}/following`);
    return response.data;
  }
};