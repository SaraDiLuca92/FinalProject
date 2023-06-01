import React, { useState, useEffect } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import CommentArea from "./CommentArea";
import audrey from "../Sara_Di_Luca_audrey_hepburn_silouette_black_background_silence__f916e227-4037-4d98-8256-906d7503ac03.png";
import dalì from "../dalì secretart.png";
import { Link } from "react-router-dom";
import francobollo from "../francobollo.jpeg";
import Filter from "bad-words";

const filter = new Filter();
const handleContextMenu = (event) => {
  event.preventDefault();
};

const AuthComponent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [postUsername, setPostUsername] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // Ottieni il file caricato
    const reader = new FileReader(); // Crea un oggetto FileReader

    reader.onloadend = () => {
      // Callback chiamata al termine del caricamento dell'immagine
      const imageDataUrl = reader.result; // Ottieni l'URL dei dati dell'immagine

      // Salva l'URL dell'immagine nello stato
      setImageUrl(imageDataUrl);
    };

    if (file) {
      reader.readAsDataURL(file); // Leggi il file come URL dei dati dell'immagine
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      document.body.classList.add("authenticated");
    } else {
      document.body.classList.remove("authenticated");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetch("http://localhost:9099/api/posts/")
        .then((response) => response.json())
        .then((data) => setPosts(data))
        .catch((error) => {
          console.error("Errore durante il recupero dei post:", error);
        });
    }
  }, [isAuthenticated]);

  const handleRegister = (username, password) => {
    // Logica per la registrazione
    fetch("http://localhost:9099/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.ok) {
          // Registrazione avvenuta con successo, esegui il login automaticamente
          handleLogin(username, password);
        } else {
          // Gestisci errori durante la registrazione
          console.log("Errore durante la registrazione");
          alert("Errore durante la registrazione. Riprova.");
        }
      })
      .catch((error) => {
        // Gestisci errori della chiamata API
        console.log("Errore di rete durante la registrazione");
        alert("Errore di rete durante la registrazione. Riprova.");
      });
  };

  const handleLogin = (username, password) => {
    // Logica per il login
    fetch("http://localhost:9099/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Login avvenuto con successo, imposta lo stato di autenticazione, il nome utente e l'id utente
          setUsername(username);
          setIsAuthenticated(true);
          setUserId(data.userId);
          setPostUsername(username); // Imposta l'id dell'utente corrente
        } else {
          // Gestisci errori durante il login
          console.log("Credenziali di accesso non valide");
          alert("Credenziali di accesso non valide. Riprova.");
        }
      })
      .catch((error) => {
        // Gestisci errori della chiamata API
        console.log("Errore di rete durante il login");
        alert("Errore di rete durante il login. Riprova.");
      });
  };

  const handleLogout = () => {
    // Logica per il logout
    setIsAuthenticated(false);
    setUsername("");
    setDescription("");
    setImageUrl("");
  };

  const handlePost = (event) => {
    event.preventDefault();

    // Parole da filtrare
    const badWords = [
      "asshole",
      "ass",
      "bitch",
      "bastard",
      "cunt",
      "dick",
      "dike",
      "dildo",
      "fuck",
      "gay",
      "hoe",
      "nigger",
      "pussy",
      "slut",
      "whore",
      "god damn",
      "goddamn",
      "stronzo",
      "stronz",
      "strunz",
      "stronza",
      "merda",
      "merd",
      "vaffanculo",
      "vaffancul",
      "vafanculo",
      "vaffa",
      "inculo",
      "negro",
      "negra",
      "puttana",
      "putt",
      "puta",
      "puttna",
      "figa",
      "cazzo",
      "cazz",
      "cazzaro",
      "cazzar",
      "cazzara",
      "culo",
      "cul",
      "coglioni",
      "coglion",
      "coglione",
      "cogliona",
      "porco dio",
      "porca madonna",
      "porcodio",
      "porcamadonna",
      "puttana eva",
      "puttanaeva",
      "rincoglionito",
      "puttana madonna",
      "madonna puttana",
      "puttanamadonna",
      "madonnaputtana",
      "frocio",
      "ricchione",
    ];
    const patterns = badWords
      .map((word) => createPatternWithNumberSubstitutions(word))
      .join("|");
    const regex = new RegExp(patterns, "gi");
    // Espressione regolare per cercare le parole da filtrare

    // Controlla se la descrizione contiene parole da filtrare
    if (regex.test(description)) {
      console.log("Errore: il post contiene parole inopportune");
      alert(
        "Errore: il post non può essere inviato perché contiene parole inopportune."
      );
      return;
    }
    function createPatternWithNumberSubstitutions(word) {
      const substitutions = {
        a: "[a4]+",
        e: "[e3]+",
        i: "[i1]+",
        o: "[o0]+",
        s: "[s5]+",
        t: "[t7]+",
      };

      const pattern = [...word.toLowerCase()]
        .map((char) => substitutions[char] || char)
        .join("");

      return `\\b${pattern}\\b`;
    }

    const post = {
      description,
      img: imageUrl,
      user: {
        id: 1,
        username: postUsername,
      },
    };
    fetch("http://localhost:9099/api/posts/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Post creato con successo");
          alert("Post creato con successo.");

          fetch("http://localhost:9099/api/posts/")
            .then((response) => response.json())
            .then((data) => setPosts(data))
            .catch((error) => {
              console.error("Errore durante il recupero dei post:", error);
            });

          setDescription("");
          setImageUrl("");
        } else {
          console.log("Errore durante la creazione del post");
          alert("Errore durante la creazione del post. Riprova.");
        }
      })
      .catch((error) => {
        console.log("Errore di rete durante la creazione del post");
        alert("Errore di rete durante la creazione del post. Riprova.");
      });
  };

  // Resto del codice per la creazione del post...

  if (isAuthenticated) {
    return (
      <div className="authenticated">
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
              {" "}
              <Link to="/">
                {" "}
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Home
                  </a>
                </li>
              </Link>
              <Link to="/inspiration">
                {" "}
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Inspiration
                  </a>
                </li>
              </Link>{" "}
              <Link to="/inspiration">
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Cinema
                  </a>
                </li>
              </Link>
              <Link to="/music">
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Music
                  </a>
                </li>
              </Link>
            </ul>
            <form class="form-inline my-2 my-lg-0"></form>
          </div>{" "}
          <div className="b">
            <h1 className="benvenuto">
              Welcome<b>{username}</b>
            </h1>
            <button onClick={handleLogout}>LOGOUT</button>
          </div>
        </nav>
        <div className="scopodelsito">
          <h3 className="sloghome">
            IN UN MONDO IN CUI E' PIU' IMPORTANTE IL NOME CHE LA SOSTANZA,
            <br />
            SECRETART VUOLE ESSERE UN ANTI-SOCIAL CHE PROMUOVE
            <br /> "L'ARTE PER L'ARTE"
          </h3>{" "}
          <p>
            SecretArt nasce con l'idea di essere il primo blog anonimo per
            l'Arte che racchiude in sè la natura stessa della concezione
            Artistica.
            <br /> Qui potrai pubblicare e commentare in anonimo, perchè ciò che
            importa non è il nome di chi crea il post, ma il contenuto.
            <br /> Potrai condividere immagini, video e frasi attinenti ad
            artisti già noti, per il solo gusto di condividere la tua conoscenza
            o il tuo pensiero a riguardo, e in tal modo arricchire il blog;
            <br />
            oppure mostrare un tuo lavoro in corso per avere pareri sinceri e
            spassionati, consapevoli di rimanere in anonimato(
            <Link to="/regole">Leggi le regole da rispettare</Link>). <br />
          </p>{" "}
        </div>
        <div className="creapost">
          <div className="francobollodiv">
            <img className="franc" src={francobollo} />
          </div>
          <h2>SECRET POST</h2>
          <form onSubmit={handlePost}>
            <div class="divcampiinput">
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />{" "}
              <label htmlFor="imageUrl">Image URL:</label>{" "}
              <input
                type="text"
                id="imageUrl"
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
              />
            </div>
            <div class="imgpc">
              <label class="immaginedapc" htmlFor="imageUpload"></label>
              <input
                type="file"
                id="imageUpload"
                accept="image/*" // Accetta solo file di tipo immagine
                onChange={handleImageUpload}
              />
            </div>
            {imageUrl && imageUrl.includes("youtube") && (
              <div>
                <iframe
                  width="560"
                  height="315"
                  src={imageUrl.replace("watch?v=", "embed/")}
                  title="YouTube video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
            <button type="submit">SUBMIT</button>
          </form>
        </div>
        <div className="posted">
          {Array.isArray(posts) &&
            posts
              .sort((a, b) => b.id - a.id)
              .map((post) => (
                <div className="post" key={post.id}>
                  {/* Renderizzazione dei post */}
                  <h3>{post.username}</h3>
                  <p onContextMenu={handleContextMenu}>{post.description}</p>
                  {post.img && post.img.includes("youtube") && (
                    <div className="youtube">
                      <iframe
                        width="560"
                        height="315"
                        src={post.img.replace("watch?v=", "embed/")}
                        title="YouTube video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                  {post.img && !post.img.includes("youtube") && (
                    <div className="postimage">
                      <img
                        onContextMenu={handleContextMenu}
                        src={post.img}
                        alt="Post"
                      />
                    </div>
                  )}
                  <CommentArea postId={post.id} />{" "}
                  {/* Passa l'id del post come prop */}
                </div>
              ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="LgRgPage">
        <div>
          <h1 className="h1title">SecretArt</h1>

          <p>
            "Si usano gli specchi per guardarsi il viso, e si usa l’arte per
            guardarsi l’anima".
          </p>
          <p className="SLOGAN">SHARE YOUR ART IN SECRET.</p>
        </div>
        <div className="logreg">
          <RegisterForm onRegister={handleRegister} />
          <LoginForm onLogin={handleLogin} />
        </div>
        <footer></footer>
      </div>
    );
  }
};

export default AuthComponent;
