import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users'

interface userType {
  username: string;
  fullName: string;
  profileImg: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    throw new Error('Istifadəçilər alinmadi.');
  }
};

export const getUser = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Istifadəçi tapilmadi.');
  }
};

export const postUser = async (userData: string) => {
  try {
    const response = await axios.post(`${API_URL}`, userData);
    return response.data;
  } catch (error) {
    throw new Error('Istifadeci əlavə edilmədi.');
  }
};

export const updateUser = async (userId: string, updatedUserData: userType) => {
  try {
    const response = await axios.patch(`${API_URL}/${userId}`, updatedUserData);
    return response.data;
  } catch (error) {
    throw new Error('Istifadeci yenilənmədi.');
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const response = await axios.delete(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Istifadeci silinmedi.');
  }
};