import React,{ useState } from 'react'; // Import useState from React
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet,Link } from 'react-router-dom';



const AppLayout = () => {
  const [keyword,setKeyword]=useState("");
  const navigate = useNavigate(); 
  const searchByKeyword=(event)=>{
    event.preventDefault()
    navigate(`/movies?q=${keyword}`)
    setKeyword("");
  }
  return (
    <div>
      <Navbar expand="lg" variant="dark" className="navbar-custom" >
      <Container fluid>
        <Navbar.Brand href="#">
          <img width={80} src='https://cdnweb01.wikitree.co.kr/webdata/editor/202305/09/img_20230509113254_b805310c.webp' alt="Brand Logo"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/movies">Movies</Nav.Link>
            
            
          </Nav>
          <Form className="d-flex" onSubmit={searchByKeyword}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={keyword}
              onChange={(event)=>setKeyword(event.target.value)}
            />
            <Button variant="outline-danger" >Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Outlet/>
    </div>
  )
}

export default AppLayout
