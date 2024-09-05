import React, { useState } from 'react';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import { useSearchParams } from 'react-router-dom';
import { Alert, Container, Spinner, Row, Col, Dropdown, Button } from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';
import './MoviePage.css';

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const keyword = query.get("q");
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("desc"); // 정렬 순서 상태
  const [selectedGenre, setSelectedGenre] = useState(null); // 선택한 장르 ID
  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword, page });

  // 장르 이름과 ID를 매핑하는 객체
  const genreMap = {
    Action: 28,
  Adventure: 12,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Fantasy: 14,
  History: 36,
  Horror: 27,
  Music: 10402,
  Mystery: 9648,
  Romance: 10749,
  ScienceFiction: 878,
  TVMovie: 10770,
  Thriller: 53,
  War: 10752,
  Western: 37,
  };

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  // 영화 정렬 함수
  const sortMovies = (movies) => {
    if (!movies) return [];
    return movies.sort((a, b) =>
      sortOrder === "desc" ? b.popularity - a.popularity : a.popularity - b.popularity
    );
  };

  // 장르 필터링 함수
  const filterByGenre = (movies) => {
    if (!selectedGenre) return movies; // 장르 선택되지 않은 경우 필터링 없이 반환
    return movies.filter((movie) => movie.genre_ids.includes(selectedGenre));
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const handleGenreSelect = (genreName) => {
    setSelectedGenre(genreMap[genreName]); // 장르 이름을 ID로 변환하여 설정
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

  if (!data || data.results.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '24px', color: '#555' }}>
        검색결과 없음
      </div>
    );
  }

  const sortedAndFilteredMovies = filterByGenre(sortMovies(data.results)); // 정렬 및 필터링 적용

  return (
    <Container>
      <Row>
        {/* 필터 파트 */}
        <Col lg={4} xs={12}>
          <h5>Filter</h5>

          {/* 인기순 정렬 드롭다운 */}
          <Dropdown onSelect={handleSortChange}>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Sort by Popularity
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey="desc">High to Low</Dropdown.Item>
              <Dropdown.Item eventKey="asc">Low to High</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* 장르 필터링 버튼 */}
          <div className="genre-buttons" style={{ marginTop: '20px' }}>
            {Object.keys(genreMap).map((genre, index) => (
              <Button
                key={index}
                variant="danger"
                style={{ margin: '5px' }}
                onClick={() => handleGenreSelect(genre)}
              >
                {genre}
              </Button>
            ))}
          </div>
        </Col>

        {/* 영화 리스트 파트 */}
        <Col lg={8} xs={12}>
          <Row className="movie-list">
            {sortedAndFilteredMovies.map((movie, index) => (
              <Col key={index} lg={4} xs={12}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>

          {/* 페이지네이션 */}
          <ReactPaginate
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={Math.min(data.total_pages, 12)}
            previousLabel="<"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            forcePage={page - 1}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
