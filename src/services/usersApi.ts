import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users';

interface UserType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  username: string;
  fullName: string;
  profileImg: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export const getAllUsers = async (): Promise<UserType[]> => {
  try {
    const response = await axios.get<UserType[]>(`${API_URL}`);
    return response.data;
  } catch (error) {
    throw new Error('Istifadəçilər tapılmadı.');
  }
};

export const getUser = async (userId: string): Promise<UserType> => {
  try {
    const response = await axios.get<UserType>(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Istifadəçi tapılmadı.');
  }
};

export const postUser = async (userData: UserType): Promise<UserType> => {
  try {
    const response = await axios.post<UserType>(`${API_URL}`, userData);
    return response.data;
  } catch (error) {
    throw new Error('İstifadəçi əlavə edilmədi.');
  }
};

export const updateUser = async (userId: string, updatedUserData: UserType): Promise<UserType> => {
  try {
    const response = await axios.patch<UserType>(`${API_URL}/${userId}`, updatedUserData);
    return response.data;
  } catch (error) {
    throw new Error('İstifadəçi yenilənmədi.');
  }
};

export const deleteUser = async (userId: string): Promise<void> => {
  try {
    const response = await axios.delete<void>(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('İstifadəçi silinmədi.');
  }
};
