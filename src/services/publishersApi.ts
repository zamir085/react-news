import axios from 'axios';

const API_URL = 'http://localhost:3000/api/publishers'

interface userType {
    username: string;
    password: string;
    email: string;
    backgroundImg: string;
    profileImg: string;
    name: string;
    description: string;
    joinedDate: string;
}

export const getAllPublishers = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    throw new Error('Istifadəçilər alinmadi.');
  }
};

export const getPublisher = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Istifadəçi tapilmadi.');
  }
};

export const postPublisher = async (userData: string) => {
  try {
    const response = await axios.post(`${API_URL}`, userData);
    return response.data;
  } catch (error) {
    throw new Error('Istifadeci əlavə edilmədi.');
  }
};

export const updatePublisher = async (userId: string, updatedUserData: userType) => {
  try {
    const response = await axios.patch(`${API_URL}${userId}`, updatedUserData);
    return response.data;
  } catch (error) {
    throw new Error('Istifadeci yenilənmədi.');
  }
};

export const deletePublisher = async (userId: string) => {
  try {
    const response = await axios.delete(`${API_URL}${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Istifadeci silinmedi.');
  }
};