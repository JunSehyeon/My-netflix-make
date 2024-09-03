import React from 'react';
import { useUpcomingMoviesQuery } from '../../../../hooks/useUpcomingMovies'; // 상영 예정 영화 쿼리 훅
import { Alert } from 'react-bootstrap'; // 'bootstrap' 대신 'react-bootstrap'로 수정
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from '../../../../common/MovieCard/MovieCard';
import "./UpComingMovies.style.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  }
};

const UpComingMovies = () => {
  const { data, isLoading, isError, error } = useUpcomingMoviesQuery();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant='danger'>{error.message}</Alert>;
  }

  return (
    <div>
      <h3>Upcoming Movies</h3>
      <Carousel
        infinite={true}
        centerMode={true}
        itemClass='movie-slider p-1'
        containerClass='carousal-container'
        responsive={responsive}
      >
        {data.results.map((movie, index) => (
          <MovieCard movie={movie} key={index} />
        ))}
      </Carousel>
    </div>
  );
};

export default UpComingMovies;
