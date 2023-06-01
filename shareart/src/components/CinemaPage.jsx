import React, { useState } from "react";
import moviesData from "./tmdb_movies.json";
import dalì from "../dalì secretart.png";
import { Link } from "react-router-dom";

const CinemaPage = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = () => {
    const results = moviesData.filter((movie) =>
      movie.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    const randomResult = results[Math.floor(Math.random() * results.length)];
    setSearchResult(randomResult);
  };

  return (
    <div class="cinema-page">
      <nav class="navbar navbar-expand-lg navbar-light bg-black navbarhome">
        <a class="navbar-brand" href="#">
          <img src={dalì} />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item active">
              <a class="nav-link" href="/">
                Home
              </a>
            </li>
            <Link to="/inspiration">
              {" "}
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Inspiration
                </a>
              </li>
            </Link>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Cinema
              </a>
            </li>
            <Link to="/music">
              {" "}
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Music
                </a>
              </li>
            </Link>
          </ul>
          <form class="form-inline my-2 my-lg-0"></form>
        </div>{" "}
      </nav>
      <div className="testoCinema"></div>{" "}
      <p>INSERISCI UNA PAROLA IN INGLESE E TROVA IL FILM DA GUARDARE</p>
      <input
        type="text"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />{" "}
      <button onClick={handleSearch}>Search</button> <div class="regole"></div>
      {searchResult && (
        <div className="movies">
          <h2>{searchResult.title}</h2>
          <p>{searchResult.overview}</p>
          <p>Release Date: {searchResult.release_date}</p>
        </div>
      )}
    </div>
  );
};

export default CinemaPage;
