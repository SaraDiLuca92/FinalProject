import React, { useState } from "react";

const Bacheca = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const [postContent, setPostContent] = useState("");
  const handleCreatePost = async () => {
    const newPost = {
      description: postContent,
      img: "URL dell'immagine",
      user: "ID dell'utente",
      createdAt: "Data di creazione del post",
    };

    try {
      const response = await fetch("http://localhost:9099/api/posts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        // Richiesta POST riuscita
        setResponseMessage("Post creato con successo!");
      } else {
        // Errore nella richiesta POST
        setResponseMessage("Errore nella creazione del post");
      }
    } catch (error) {
      console.error(error);
      // Gestisci l'errore di connessione o altre eccezioni
      setResponseMessage("Si è verificato un errore durante la richiesta");
    }
  };

  return (
    <div>
      <h1>My Component</h1>
      <input
        type="text"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        placeholder="Inserisci il contenuto del post"
      />
      <button onClick={handleCreatePost}>Crea Post</button>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default Bacheca;
