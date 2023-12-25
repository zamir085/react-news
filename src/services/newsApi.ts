import axios from "axios";

const API_URL = "http://localhost:3000/api/news";

interface newsType {
  title: string;
  createdAt: Date;
  linkURL: string;
  thumbnailImg: string;
  newsBody: string;
  author: string;
}

export const getAllNews = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    throw new Error("Istifadəçilər alinmadi.");
  }
};

export const getNews = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}${userId}`);
    return response.data;
  } catch (error) {
    throw new Error("Istifadəçi tapilmadi.");
  }
};

export const postNews = async (userData: string) => {
  try {
    const response = await axios.post(`${API_URL}`, userData);
    return response.data;
  } catch (error) {
    throw new Error("Istifadeci əlavə edilmədi.");
  }
};

export const updateNews = async (userId: string, updatedUserData: newsType) => {
  try {
    const response = await axios.patch(`${API_URL}${userId}`, updatedUserData);
    return response.data;
  } catch (error) {
    throw new Error("Istifadeci yenilənmədi.");
  }
};

export const deleteNews = async (userId: string) => {
  try {
    const response = await axios.delete(`${API_URL}${userId}`);
    return response.data;
  } catch (error) {
    throw new Error("Istifadeci silinmedi.");
  }
};
