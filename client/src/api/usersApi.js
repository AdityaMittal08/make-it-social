import api from "./axiosInstance";

export const usersApi = {
  fetchUserById: async (userId) => {
    const response = await api.get(`/users/${userId}`); 
    return response.data;
  },
};