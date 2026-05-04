import api from "./axiosInstance";

export const newsApi = {
  fetchLatestNews: async (pageParam = null) => {
    const url = pageParam 
    ? `/news/latest?cursor=${pageParam}` 
    : `/news/latest`;
    const response = await api.get(url);
    return response.data;
  }
}