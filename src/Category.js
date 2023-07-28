import React from 'react';

export default function Category() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZGYxOTU2MmQ1NTRmMjI0NGNiOWFhMTBhZTcxNGRkNCIsInN1YiI6IjYxNWMzOGNlYTMzNjEyMDA4NmNmOTVhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4dYjjqwSH3YNctqCME2DiKHtHs3PbM6QPSpe5MemeqU'
    }
  };
  
  fetch('https://api.themoviedb.org/3/discover/movie?with_genres=Action', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

  return (
    <div><h1>Category</h1></div>
  )
} 
