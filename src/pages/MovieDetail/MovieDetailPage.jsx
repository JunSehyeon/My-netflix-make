import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { useMovieDetailQuery } from '../../hooks/useMovieDetail';
import { useMovieReviewsQuery } from '../../hooks/useMovieReviews';
import { useMovieRecommendationsQuery } from '../../hooks/useMovieRecommendations';
import { useMovieTrailerQuery } from '../../hooks/useMovieTrailer'; 
import "./MovieDetailPage.style.css";
import { Alert, Container, Spinner, Modal, Button } from 'react-bootstrap';
import YouTube from 'react-youtube';

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: movie, isLoading, isError, error } = useMovieDetailQuery(id);
  const { data: reviews, isLoading: isReviewsLoading, isError: isReviewsError, error: reviewsError } = useMovieReviewsQuery(id);
  const { data: recommendations, isLoading: isRecommendationsLoading, isError: isRecommendationsError, error: recommendationsError } = useMovieRecommendationsQuery(id);
  const { data: trailer, isLoading: isTrailerLoading } = useMovieTrailerQuery(id);

  const [show, setShow] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleRecommendationClick = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  const handleToggleReviews = () => {
    setShowReviews(!showReviews);
  };

  if (isLoading) {
    return (
      <div className='spinner-area'>
        <Spinner animation="border" variant="danger" style={{ width: "5rem", height: "5rem" }} />
      </div>
    );
  }

  if (isError) {
    return <Alert variant='danger'>{error.message}</Alert>;
  }

  if (!movie) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '24px', color: '#555' }}>
        영화를 찾을 수 없습니다.
      </div>
    );
  }

  const genreList = movie.genres ? movie.genres.map(genre => genre.name).join(", ") : "Unknown";

  return (
    <Container className="movie-detail-container">
      <div className="movie-poster">
        <img 
          src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`} 
          alt={movie.title} 
          className="poster-image" 
        />
        <Button variant="danger" className="preview-button" onClick={handleShow}>
          Preview
        </Button>
      </div>
      
      <div className="movie-info">
        <h2 className="movie-title">{movie.title}</h2>
        <p className="movie-genres"><strong>Genres:</strong> {genreList}</p>
        <div className="movie-rating">
          <strong>Rating:</strong> {movie.vote_average} / 10
        </div>
        <p className="movie-popularity"><strong>Popularity:</strong> {movie.popularity.toFixed(2)}</p>
        <p className="movie-budget"><strong>Budget:</strong> ${movie.budget.toLocaleString()}</p>
        <p className="movie-release-date"><strong>Release Date:</strong> {new Date(movie.release_date).toLocaleDateString()}</p>
        <p className="movie-description">{movie.overview}</p>

        <div className="movie-reviews">
          <Button variant="danger" className="preview-button reviews-toggle-button" onClick={handleToggleReviews}>
            {showReviews ? 'Hide Reviews' : 'Show Reviews'}
          </Button>
          {showReviews && (
            <>
              {isReviewsLoading ? (
                <Spinner animation="border" variant="primary" />
              ) : isReviewsError ? (
                <Alert variant="danger">{reviewsError.message}</Alert>
              ) : reviews && reviews.results && reviews.results.length > 0 ? (
                reviews.results.map((review) => (
                  <div key={review.id} className="review">
                    <h4>{review.author}</h4>
                    <p>{review.content}</p>
                    <hr />
                  </div>
                ))
              ) : (
                <p>No reviews available.</p>
              )}
            </>
          )}
        </div>

        <div className="movie-recommendations">
          <h3 className="recommendations-title">Recommended Movies</h3>
          {isRecommendationsLoading ? (
            <Spinner animation="border" variant="primary" />
          ) : isRecommendationsError ? (
            <Alert variant="danger">{recommendationsError.message}</Alert>
          ) : recommendations && recommendations.results && recommendations.results.length > 0 ? (
            <div className="recommendations-grid">
              {recommendations.results.map((recommendation) => (
                <div 
                  key={recommendation.id} 
                  className="recommendation-item" 
                  onClick={() => handleRecommendationClick(recommendation.id)}
                >
                  <img 
                    src={`https://image.tmdb.org/t/p/w300${recommendation.poster_path}`} 
                    alt={recommendation.title} 
                    className="recommendation-poster" 
                  />
                  <p className="recommendation-title">{recommendation.title}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No recommendations available.</p>
          )}
        </div>
      </div>
      
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
        <Modal.Title className="modal-title"><h2>{movie.title}</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isTrailerLoading ? (
            <Spinner animation="border" variant="primary" />
          ) : trailer ? (
            <YouTube videoId={trailer.key} opts={{ width: '100%', height: '390' }} />
          ) : (
            <p>No trailer available.</p>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default MovieDetailPage;
