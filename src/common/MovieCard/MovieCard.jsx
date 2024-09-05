import React from 'react';
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Link 추가
import "./MovieCard.style.css";

const MovieCard = ({ movie }) => {
  const genreMap = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  // 평점에 따라 별을 렌더링하는 함수
  const renderStars = (rating) => {
    const starFull = "https://w7.pngwing.com/pngs/427/480/png-transparent-gold-star-star-star-angle-orange-symmetry-thumbnail.png"; // 별 이미지 URL
    const starCount = Math.floor(rating); // 정수 별 개수
    const stars = [];

    // 정수 부분 별 추가
    for (let i = 0; i < starCount; i++) {
      stars.push(<img src={starFull} alt="star" key={`star-full-${i}`} className="star-icon" />);
    }

    return stars;
  };

  return (
    <Link to={`/movies/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}> {/* Link로 감싸기 */}
      <div
        style={{
          backgroundImage:
            "url(" +
            `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` +
            ")",
        }}
        className="movie-card"
      >
        <div className="overlay">
          <h1 className="movie-title">{movie.title}</h1>
          <div className="badge-container">
            {movie.genre_ids.map((id, index) => (
              <Badge bg="danger" key={index} className="badge-id">
                {genreMap[id] || "Unknown"} {/* ID를 이름으로 변환 */}
              </Badge>
            ))}
          </div>

          <div className="movie-info star-rating">{renderStars(movie.vote_average)}</div>
          <div className="movie-info">{`OPEN: ${movie.release_date}`}</div>
          <div className="movie-info">{movie.adult ? '19금' : ''}</div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
