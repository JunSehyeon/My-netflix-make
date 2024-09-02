import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

// 상영 예정 영화 데이터를 가져오는 함수
const fetchUpcomingMovies = async () => {
  return await api.get('/movie/upcoming'); // 상영 예정 영화 API 호출
};

// 상영 예정 영화 훅
export const useUpcomingMoviesQuery = () => {
  return useQuery({
    queryKey: ['movie-upcoming'],
    queryFn: fetchUpcomingMovies,
    select: (result) => result.data, // 응답 데이터에서 실제 데이터 추출
  });
};
