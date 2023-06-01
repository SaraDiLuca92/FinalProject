import React, { useState } from "react";

const PostForm = ({ username }) => {
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const post = {
      description,
      img: imageUrl,
      user: {
        id: 1, // L'id dello user corrispondente a quello loggato
      },
    };

    // Effettua la richiesta POST all'API
    fetch("http://localhost:9099/api/posts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((response) => response.json())
      .then((data) => {
        // Gestisci la risposta dell'API
        console.log("Post creato:", data);
        // Esegui eventuali azioni aggiuntive dopo aver creato il post
      })
      .catch((error) => {
        // Gestisci errori durante la chiamata all'API
        console.error("Errore durante la creazione del post:", error);
      });
  };

  return (
    <div>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostForm;
