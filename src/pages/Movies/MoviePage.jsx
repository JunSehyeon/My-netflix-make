import React,{useState} from 'react'
import {useSearchMovieQuery} from "../../hooks/useSearchMovie"
import { useSearchParams } from 'react-router-dom'
import { Alert,Container,Spinner,Row,Col } from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';
import './MoviePage.css'
//경로 2가지
//nav바에서 클릭해서 온경우 => popularmovie 보여주기
//keyword를 입력해서 온경우 =>keyword와 관련된 영화들을 보여줌

//페이지네이션 설치
//page state 만들기
//페이지네이션 클릭할때마다 page 바꿔주기
//page 값이 바뀔때 마다 usesearchmovie에 page 까지 넣어서 fatch
const MoviePage = () => {
  const [query,setQuery]=useSearchParams();
  const keyword=query.get("q");
  const [page,setPage]=useState(1)
  const {data,isLoading,isError,error}=useSearchMovieQuery({keyword,page})
  const handlePageClick=({selected})=>{
    setPage(selected+1)
  }
  if (isLoading){
    return (
      <div className='spinner-area'>
        <Spinner
        animation="border"
        variant="danger"
        style={{width:"5rem",height:"5rem"}}
        />
      </div>
    )
  } 
  if (isError) {
    return <Alert variant='danger'>{error.message}</Alert>;
  }
  if (!data || data.results.length === 0) {
    return <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '24px', color: '#555' }}>
    검색결과 없음
  </div>
  
  }

  return (
    <Container>
      <Row>
        <Col lg={4} xs={12}> 필터</Col>
        <Col lg={8} xs={12}>
        <Row>
          {data?.results.map((movie,index)=>(
            <Col key={index} lg={4} xs={12}>
              <MovieCard movie={movie}/>
            </Col>
          ))}
        </Row>
        <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={Math.min(data.total_pages, 12)}
        previousLabel="< previous"
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
        forcePage={page-1}
      />
        </Col>
      </Row>
    </Container>
  )
}

export default MoviePage
