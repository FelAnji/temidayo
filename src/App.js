import React, {useEffect, useState} from 'react';
import { Button, Container, Form, FormControl, Navbar, NavbarBrand, Nav } from 'react-bootstrap';
import './App.css';
import MovieBox from './MovieBox';
import { Link, NavLink } from 'react-router-dom';
import Category from './Category';

const API_URL="https://api.themoviedb.org/3/movie/popular?api_key=9df19562d554f2244cb9aa10ae714dd4"
const API_SEARCH="https://api.themoviedb.org/3/search/movie?api_key=9df19562d554f2244cb9aa10ae714dd4&query";
const CATEGORY ="https://api.themoviedb.org/3/genre/movie/list?api_key=9df19562d554f2244cb9aa10ae714dd4";

const FILTER = 'https://api.themoviedb.org/3/discover/movie?with_genres=Action?api_key=9df19562d554f2244cb9aa10ae714dd4'

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetch(API_URL).then((res)=>res.json()).then(data=>{
      // console.log(data)
      setMovies(data.results);
    })
  }, [])

  useEffect(() => {
    fetch(CATEGORY).then(res=> res.json()).then(genres=>{
      // console.log(genres)
      setCategory(genres);
    })
  }, [])

  const searchMovie = async(e)=> {
    e.preventDefault();
    console.log('searching...');
    try{
      const url=`https://api.themoviedb.org/3/search/movie?api_key=9df19562d554f2244cb9aa10ae714dd4&query=${query}`;
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
    }
    catch(e) {
      console.log(e);
    }
  }

  const changeHandler=(e)=>{
    setQuery(e.target.value);
  }

  return (
    <>
      <Navbar bg='dark' expand='lg' variant='dark'>
        <Container fluid>
          {/* <Navbar.Brand href=''>MovieDB App</Navbar.Brand> */}
          <Navbar.Brand href=''>
            <form action="">
              <label htmlFor="genres">Genres: </label>
              <select name="genres" id="">
                <option value="">Trending</option>
                {category.genres?.map(item => {
                  return (
                    <option key={item.id} onClick={Category}>{item.name}</option>
                  )
                })}
              </select>
            </form>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbarScroll'></Navbar.Toggle>

            <Navbar.Collapse id='navbarScroll'>
              <Nav className='me-auto my-2 my-lg-3' style={{maxHeight: '100px'}} navbarScroll></Nav>
              <Form className="d-flex" onSubmit={searchMovie}>
                <FormControl type="search" placeholder='Movie Search' className='me-2' aria-label='search' name='query' value={query} onChange={changeHandler}/>
                {/* <Button type='submit' className='submitButton'>Search</Button> */}
                <button type='submit' id='searchBtn'>Search</button>
              </Form>

            </Navbar.Collapse>
          
        </Container>
      </Navbar> 
      <div>
        {movies.length > 0 ? (
          <div className="container">
          <div className="grid">    
            {movies.map((movieReq) => <MovieBox key={movieReq.id} {...movieReq} />)}
          </div>
          </div>
        ) : (<h2 id='sorry'>Sorry! No Movies Found for {query}</h2>)}
        
      </div>
        
    </>
    
  );
}

export default App;
