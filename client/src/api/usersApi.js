import api from "./axiosInstance";

export const usersApi = {
  fetchUsername: async (username) => {
    const response = await api.get(`/users/${username}`); 
    return response.data;
  },

  fetchUserById: async() => {
    const response = await api.get(`/users/`);
    return response.data;
  }
};
