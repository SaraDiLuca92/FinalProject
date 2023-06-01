import React, { useState } from "react";
import coloriArtisti from "./inspiration.json";
import dalì from "../dalì secretart.png";
import { Link } from "react-router-dom";

function InspirationPage() {
  const [colore, setColore] = useState("");
  const [artistaCasuale, setArtistaCasuale] = useState("");
  const [immagineArtista, setImmagineArtista] = useState("");
  const [fraseArtista, setFraseArtista] = useState("");
  const [messaggi, setMessaggi] = useState([]);
  const [inputUtente, setInputUtente] = useState("");

  const cercaArtistaCasuale = () => {
    const corrispondenze = coloriArtisti.colori_artisti;
    const artistiFiltrati = corrispondenze.filter(
      (corrispondenza) => corrispondenza.colore === colore
    );

    if (artistiFiltrati.length > 0) {
      const artistaCasuale =
        artistiFiltrati[Math.floor(Math.random() * artistiFiltrati.length)];

      setArtistaCasuale(artistaCasuale.artista);
      setImmagineArtista(artistaCasuale.immagine || "");
      setFraseArtista(artistaCasuale.frase || "");

      setMessaggi([
        ...messaggi,
        { testo: "Trova artista", mittente: "sistema" },
        { testo: artistaCasuale.artista, mittente: "sistema" },
        { testo: artistaCasuale.frase || "", mittente: "sistema" },
      ]);
    } else {
      setArtistaCasuale("Nessun artista corrispondente trovato.");
      setImmagineArtista("");
      setFraseArtista("");

      setMessaggi([
        ...messaggi,
        { testo: "Trova artista", mittente: "sistema" },
        {
          testo: "Nessun artista corrispondente trovato.",
          mittente: "sistema",
        },
      ]);
    }
  };

  const inviaMessaggio = (e) => {
    e.preventDefault();
    setMessaggi([...messaggi, { testo: inputUtente, mittente: "utente" }]);
    setInputUtente("");

    cercaArtistaCasuale();
  };

  return (
    <div className="inspirationpage">
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
              <a class="nav-link" href="/home">
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
            <Link to="/cinema">
              {" "}
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Cinema
                </a>
              </li>
            </Link>
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
      <div>
        <h2>Let yourself be inspired</h2>
      </div>
      <p>
        Seleziona un colore al giorno (o anche di più se vuoi) e lasciati
        inspirare. <br />
        Questo è anche un buon modo per conoscere artisti nuovi.
        <br /> P.S. Gli artisti cambieranno di settimana in settimana, per cui
        cerca di scoprirne il più possibile prima dello scadere del tempo.
      </p>
      <div className="chat">
        {messaggi.map((messaggio, index) => (
          <div key={index} className={messaggio.mittente}>
            {messaggio.testo}
          </div>
        ))}
      </div>
      <div className="input-chat">
        <input
          type="text"
          value={inputUtente}
          onChange={(e) => setInputUtente(e.target.value)}
          placeholder="Digita un messaggio..."
        />
        <button onClick={inviaMessaggio}>Invia</button>
      </div>
      <div className="colorartist">
        <select value={colore} onChange={(e) => setColore(e.target.value)}>
          <option value="">Seleziona un colore</option>
          {coloriArtisti.colori_artisti.map((item) => (
            <option key={item.colore} value={item.colore}>
              {item.colore === colore && (
                <span
                  style={{
                    display: "inline-block",
                    width: "12px",
                    height: "12px",
                    backgroundColor: item.colore,
                    marginRight: "4px",
                  }}
                ></span>
              )}
              <span style={{ color: item.colore }}>{item.colore}</span>
            </option>
          ))}
        </select>
        <button onClick={cercaArtistaCasuale}>Trova artista</button>
      </div>
      <div className="Artistascelto">
        <div>
          <p>{artistaCasuale}</p>
          {immagineArtista && (
            <img src={immagineArtista} alt={artistaCasuale} />
          )}
          <p class="frasescelta">{fraseArtista}</p>
        </div>
      </div>
    </div>
  );
}

export default InspirationPage;
