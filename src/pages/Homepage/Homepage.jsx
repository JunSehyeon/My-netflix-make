import React from 'react'
import Banner from "./components/Banner/Banner";
import { usePopularMoviesQuery } from '../../hooks/usePopularMovies'; // 경로를 올바르게 수정하세요
import PopularMovieSlide from './components/PopularMovieSlide/PopularMovieSlide';
import TopRatedMovies from './components/TopRatedMovies/TopRatedMovies';
import UpComingMovies from './components/UpComingMovies/UpComingMovies';
//1.배너 => popular 영화를 들고와서 첫번쨰 아이템을 보여주자
//2.popular movie
//3.top rated movie
//4.upcoming movie

const Homepage = () => {
  const { data: popularMovies, isLoading, error } = usePopularMoviesQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log("인기 영화 데이터:", popularMovies);
  console.log("Popular Movies Results:", popularMovies.results);
  return (
    <div>
      {popularMovies.results && popularMovies.results.length > 0 && (
        <Banner movie={popularMovies.results[0]} />
      )}
      <PopularMovieSlide/>
      <TopRatedMovies/>
      <UpComingMovies/>
    </div>

  );
};

export default Homepage;
