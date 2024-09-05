// hooks/useMovieDetail.js
import { useQuery } from '@tanstack/react-query'; // React Query v5 사용
import api from '../utils/api';

const fetchMovieDetail = async (id) => {
  try {
    const response = await api.get(`/movie/${id}`);
    console.log('Fetched movie detail:', response.data); // 응답 데이터를 콘솔에 출력
    return response.data;
  } catch (error) {
    console.error('Error fetching movie detail:', error); // 오류를 콘솔에 출력
    throw error;
  }
};

export const useMovieDetailQuery = (id) => {
  return useQuery({
    queryKey: ['movieDetail', id], // 쿼리 키를 배열로 설정
    queryFn: () => fetchMovieDetail(id), // 쿼리 함수 설정
  });
};
