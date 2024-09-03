import React from 'react';
import "./MovieSlider.style.css";
import Carousel from 'react-multi-carousel';
import MovieCard from '../../common/MovieCard/MovieCard';
import { responsive } from '../../constants/responsive';  // responsive 상수 가져오기

const MovieSlider = ({ title, movies }) => {  // props에서 responsive 제거
  return (
    <div>
      <h3>{title}</h3>
      <Carousel
        infinite={true}
        centerMode={true}
        itemClass='movie-slider p-1'
        containerClass='carousal-container'
        responsive={responsive}  // responsive 상수 사용
      >
      {movies.map((movie, index) => <MovieCard movie={movie} key={index} />)}
      </Carousel>
    </div>
  );
};

export default MovieSlider;
