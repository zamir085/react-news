import axios from 'axios';

const API_URL = 'http://localhost:3000/api/publishers';

interface PublisherType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  username: string;
  password: string;
  email: string;
  backgroundImg: string;
  profileImg: string;
  name: string;
  description: string;
  joinedDate: string;
  _id:string;
}

export const getAllPublishers = async (): Promise<PublisherType[]> => {
  try {
    const response = await axios.get<PublisherType[]>(API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Istifadəçilər tapilmadi.');
  }
};

export const getPublisher = async (userId: string): Promise<PublisherType> => {
  try {
    const response = await axios.get<PublisherType>(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Istifadəçi tapilmadi.');
  }
};

export const postPublisher = async (userData: PublisherType): Promise<PublisherType> => {
  try {
    const response = await axios.post<PublisherType>(API_URL, userData);
    return response.data;
  } catch (error) {
    throw new Error('Istifadəçi əlavə edilmədi.');
  }
};

export const updatePublisher = async (userId: string, updatedUserData: Partial<PublisherType>): Promise<PublisherType> => {
  try {
    const response = await axios.patch<PublisherType>(`${API_URL}/${userId}`, updatedUserData);
    return response.data;
  } catch (error) {
    throw new Error('Istifadəçi yenilənmədi.');
  }
};

export const deletePublisher = async (userId: string): Promise<void> => {
  try {
    await axios.delete<void>(`${API_URL}/${userId}`);
  } catch (error) {
    throw new Error('Istifadəçi silinmədi.');
  }
};
