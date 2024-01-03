import axios from 'axios';

const API_URL = 'http://localhost:3000/api/news';

interface NewsType {
  linkURL: string;
  newsBody: string;
  thumbnailImg: string;
  title: string;
  _id:string;
  createdAt:string
}

export const getAllNews = async (): Promise<NewsType[]> => {
  try {
    const response = await axios.get<NewsType[]>(API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Xəbərlər alınmadı.');
  }
};

export const getNews = async (newsId: string): Promise<NewsType> => {
  try {
    const response = await axios.get<NewsType>(`${API_URL}/${newsId}`);
    return response.data;
  } catch (error) {
    throw new Error('Xəbər tapılmadı.');
  }
};

export const getNewsByPublisher = async (userId: string): Promise<NewsType[]> => {
  try {
    const response = await axios.get<NewsType[]>(`${API_URL}/publisher/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('İstifadəçi xəbərləri tapılmadı.');
  }
};

export const postNews = async (newsData: NewsType): Promise<NewsType> => {
  try {
    const response = await axios.post<NewsType>(API_URL, newsData);
    return response.data;
  } catch (error) {
    throw new Error('Xəbər əlavə edilmədi.');
  }
};

export const updateNews = async (newsId: string, updatedNewsData: Partial<NewsType>): Promise<NewsType> => {
  try {
    const response = await axios.patch<NewsType>(`${API_URL}/${newsId}`, updatedNewsData);
    return response.data;
  } catch (error) {
    throw new Error('Xəbər yenilənmədi.');
  }
};

export const deleteNews = async (newsId: string): Promise<void> => {
  try {
    const response = await axios.delete<void>(`${API_URL}/${newsId}`);
    return response.data;
  } catch (error) {
    throw new Error('Xəbər silinmədi.');
  }
};
