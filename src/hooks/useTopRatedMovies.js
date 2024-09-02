import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

// 상위 평가 영화 데이터를 가져오는 함수
const fetchTopRatedMovies = async () => {
  return await api.get('/movie/top_rated'); // 상위 평가 영화 API 호출
};

// 상위 평가 영화 훅
export const useTopRatedMoviesQuery = () => {
  return useQuery({
    queryKey: ['movie-top-rated'],
    queryFn: fetchTopRatedMovies,
    select: (result) => result.data, // 응답 데이터에서 실제 데이터 추출
  });
};
