// hooks/useMovieTrailer.js
import { useQuery } from '@tanstack/react-query';
import api from '../utils/api'; // API 호출을 위한 유틸리티 함수

const fetchMovieTrailer = async (id) => {
  const response = await api.get(`/movie/${id}/videos`);
  // 예고편 종류가 "Trailer"인 비디오만 필터링
  return response.data.results.find(video => video.type === "Trailer" && video.site === "YouTube");
};

export const useMovieTrailerQuery = (id) => {
  return useQuery({
    queryKey: ['movieTrailer', id],
    queryFn: () => fetchMovieTrailer(id),
  });
};
