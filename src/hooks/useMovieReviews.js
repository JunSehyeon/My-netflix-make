// hooks/useMovieReviews.js
import { useQuery } from '@tanstack/react-query';
import api from '../utils/api'; // api 유틸리티를 가져옴

// 영화 리뷰 데이터를 가져오는 함수
const fetchMovieReviews = async (id) => {
  try {
    const response = await api.get(`/movie/${id}/reviews`); // api 유틸리티를 사용하여 요청
    console.log('Fetched movie reviews:', response.data); // 응답 데이터를 콘솔에 출력
    return response.data; // 응답 데이터 반환
  } catch (error) {
    console.error('Error fetching movie reviews:', error); // 오류를 콘솔에 출력
    throw error; // 오류를 던짐
  }
};

// React Query의 useQuery 훅을 사용하는 커스텀 훅
export const useMovieReviewsQuery = (id) => {
  return useQuery({
    queryKey: ['movieReviews', id], // 쿼리 키 설정
    queryFn: () => fetchMovieReviews(id), // 쿼리 함수 설정
  });
};
