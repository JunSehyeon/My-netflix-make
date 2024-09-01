import {useQuery} from "@tanstack/react-query";
import api from "../utils/api"
const fetchPopularMovies =async () => {
 
        return await api.get('/movie/popular');
}   
const testFetchPopularMovies = async () => {
    try {
      const response = await fetchPopularMovies();
      console.log("Fetched popular movies:", response.data);
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    }
  };
  
  testFetchPopularMovies();
export const usePopularMoviesQuery=()=>{
    return useQuery({
        queryKey: ['movie-popular'],
        queryFn: fetchPopularMovies,
        select:(result)=>result.data,
    })
}