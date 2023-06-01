import React, { useState, useEffect } from "react";
import coloriArtisti from "./inspiration.json";
import dalì from "../dalì secretart.png";
import { Link } from "react-router-dom";

function ChatComponent() {
  const [messaggi, setMessaggi] = useState([]);
  const [inputMessaggio, setInputMessaggio] = useState("");
  const [step, setStep] = useState(0);
  const [artistiSelezionati, setArtistiSelezionati] = useState([]);

  useEffect(() => {
    if (step === 0) {
      setMessaggi([{ mittente: "sistema", testo: "Ciao! Come ti chiami?" }]);
    } else if (step === 2) {
      setMessaggi([
        ...messaggi,
        {
          mittente: "sistema",
          testo: `Lasciati ispirare, inserisci un colore e ti darò un artista.`,
        },
      ]);
      setInputMessaggio("");
      setStep(4);
    } else if (step === 5) {
      if (artistiSelezionati.length === coloriArtisti.colori_artisti.length) {
        setMessaggi([
          ...messaggi,
          {
            mittente: "sistema",
            testo: "Per oggi hai esaurito gli artisti disponibili.",
          },
        ]);
      } else {
        const artistaCasuale = getArtistaCasuale();
        setArtistiSelezionati([...artistiSelezionati, artistaCasuale]);
        const artistaSelezionato = coloriArtisti.colori_artisti.find(
          (artista) => artista.artista === artistaCasuale
        );
        setMessaggi([
          ...messaggi,
          {
            mittente: "sistema",
            testo: `${artistaSelezionato.artista}`,
            immagine: artistaSelezionato.immagine,
            frase: artistaSelezionato.frase,
          },
          {
            mittente: "sistema",
            testo:
              "Grazie per aver chattato con SecretArt, e non disinnamorarti mai dell'Arte! Se vuoi inserire un altro colore, fallo pure!",
          },
        ]);
        setInputMessaggio("");
        setStep(4);
      }
    }
  }, [step]);

  const inviaMessaggio = () => {
    if (inputMessaggio.trim() !== "") {
      if (step === 0) {
        setStep(2);
      } else if (step === 4) {
        setStep(5);
      }

      setMessaggi([...messaggi, { mittente: "utente", testo: inputMessaggio }]);
      setInputMessaggio("");
    }
  };

  const getArtistaCasuale = () => {
    const artistiDisponibili = coloriArtisti.colori_artisti.filter(
      (artista) => !artistiSelezionati.includes(artista.artista)
    );
    const artistaCasuale =
      artistiDisponibili[Math.floor(Math.random() * artistiDisponibili.length)];
    return artistaCasuale.artista;
  };

  return (
    <div className="chat-component">
      <nav className="navbar navbar-expand-lg navbar-light bg-black navbarhome">
        <a className="navbar-brand" href="/">
          <img src={dalì} alt="Dalì SecretArt" />
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
            <Link to="/">
              <li className="nav-item active">
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>{" "}
            </Link>
            <Link to="/inspiration">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Inspiration
                </a>
              </li>
            </Link>
            <li className="nav-item">
              <a className="nav-link" href="/Cinema">
                Cinema
              </a>
            </li>
            <Link to="/music">
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
      <div>
        <h2>Let yourself be inspired</h2>
      </div>
      <p>
        Chatta con SecretArt e lasciati ispirare, questo è anche un buon modo
        per conoscere nuovi artisti.
      </p>
      <div className="messaggi-container">
        {messaggi.map((messaggio, index) => (
          <div
            key={index}
            className={`messaggio ${
              messaggio.mittente === "utente" ? "utente" : "sistema"
            }`}
          >
            {messaggio.immagine && (
              <img src={messaggio.immagine} alt={messaggio.artista} />
            )}
            <p class="artista">{messaggio.testo}</p>
            {messaggio.frase && <p className="frase">{messaggio.frase}</p>}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputMessaggio}
          onChange={(e) => setInputMessaggio(e.target.value)}
          placeholder="Inserisci un messaggio..."
        />
        <button onClick={inviaMessaggio}>Invia</button>
      </div>
    </div>
  );
}

export default ChatComponent;
