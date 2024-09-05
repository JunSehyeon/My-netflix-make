// hooks/useMovieRecommendations.js
import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovieRecommendations = async (id) => {
  try {
    const response = await api.get(`/movie/${id}/recommendations`);
    console.log('Fetched movie recommendations:', response.data); // 응답 데이터를 콘솔에 출력
    return response.data;
  } catch (error) {
    console.error('Error fetching movie recommendations:', error); // 오류를 콘솔에 출력
    throw error;
  }
};

export const useMovieRecommendationsQuery = (id) => {
  return useQuery({
    queryKey: ['movieRecommendations', id], // 쿼리 키를 배열로 설정
    queryFn: () => fetchMovieRecommendations(id), // 쿼리 함수 설정
  });
};
