import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxM2YzODI4MjBkNGM4ZWY0NzZmNTRlMTQwMmQxMjRmMSIsIm5iZiI6MTc1MDY1OTkwMy40MTQsInN1YiI6IjY4NThmMzNmNjZmMTVjMmIwMWQwZmI4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OkusatM5hGfpKnFOHnqhGaxWseGWZIj12pLxlzht1HQ'
    }
  };

  const handlewheel = (event) => { 
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    cardsRef.current?.addEventListener('wheel', handlewheel);

    fetch(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results))
      .catch(err => console.error(err));
  }, [category]);

  return (
    <div className="Title-Cards">
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to={`/player/${card.id}`} className="card" key={index}>
            <img
              src={
                card.poster_path
                  ? `https://image.tmdb.org/t/p/w500${card.poster_path}`
                  : '/fallback.jpg'
              }
              alt={card.title}
            />
            <p>{card.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
