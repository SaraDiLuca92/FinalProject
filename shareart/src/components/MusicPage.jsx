import React, { useState } from "react";
import { Link } from "react-router-dom";
import dalì from "../dalì secretart.png";

function MusicPage() {
  const [term, setTerm] = useState("");

  const updateTerm = (searchTerm) => {
    setTerm(searchTerm);

    // check term exist
    if (!searchTerm || searchTerm === "") {
      alert("Please enter a search term");
    } else {
      const url = `https://itunes.apple.com/search?term=${searchTerm}`;
      const songContainer = document.getElementById("songs");
      while (songContainer.firstChild) {
        songContainer.removeChild(songContainer.firstChild);
      }
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const artists = data.results;
          artists.map((result) => {
            // Now create Html Element
            const article = document.createElement("article");
            const artistsElement = document.createElement("p");
            const song = document.createElement("h4");
            const img = document.createElement("img");
            const audio = document.createElement("audio");
            const audioSource = document.createElement("source");

            // Now put content
            artistsElement.innerHTML = result.artistName;
            song.innerHTML = result.trackName;
            img.src = result.artworkUrl100;
            audioSource.src = result.previewUrl;
            audio.controls = true;

            article.appendChild(img);
            article.appendChild(artistsElement);
            article.appendChild(song);
            article.appendChild(audio);
            audio.appendChild(audioSource);

            songContainer.appendChild(article);
            return null;
          });
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="musicpage">
      <nav className="navbar navbar-expand-lg navbar-light bg-black navbarhome">
        <a className="navbar-brand" href="#">
          <img src={dalì} alt="Dalì Secretart" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <Link to="/inspiration">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Inspiration
                </a>
              </li>
            </Link>
            <li className="nav-item">
              <a className="nav-link" href="/cinema">
                Cinema
              </a>
            </li>
            <Link to="#">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Music
                </a>
              </li>
            </Link>
          </ul>
          <form className="form-inline my-2 my-lg-0"></form>
        </div>
      </nav>
      <h1>Listen To Some Demos</h1>
      <div className="musicinput">
        <input id="searchTerm" type="text" />
        <button
          id="searchTermBtn"
          onClick={() =>
            updateTerm(document.getElementById("searchTerm").value)
          }
        >
          Search
        </button>{" "}
      </div>
      <div id="songs"></div>
    </div>
  );
}

export default MusicPage;
