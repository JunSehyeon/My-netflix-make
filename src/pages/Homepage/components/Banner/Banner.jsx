import React from 'react';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';

const Banner = () => {
const{data}=usePopularMoviesQuery();
console.log("ddd",data);
  return (
    <div>
      banner
    </div>
  );
};

export default Banner;
