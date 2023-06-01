import React, { useState } from "react";

const PostComments = ({ postId, comments, handleComment }) => {
  const [comment, setComment] = useState("");

  const handleCommentSubmit = (event) => {
    event.preventDefault();

    const newComment = {
      description: comment,
      post: {
        id: postId,
      },
    };

    // Effettua la chiamata API per l'aggiunta del commento
    fetch("http://localhost:9099/api/comments/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Commento aggiunto con successo");
          alert("Commento aggiunto con successo.");

          // Chiama la funzione handleComment definita nel componente genitore (AuthComponent)
          // Passa l'id del post e il nuovo commento
          handleComment(postId, comment);

          setComment(""); // Pulisci il campo di input del commento
        } else {
          console.log("Errore durante l'aggiunta del commento");
          alert("Errore durante l'aggiunta del commento. Riprova.");
        }
      })
      .catch((error) => {
        console.log("Errore di rete durante l'aggiunta del commento");
        alert("Errore di rete durante l'aggiunta del commento. Riprova.");
      });
  };

  return (
    <div>
      <h3>Commenti:</h3>
      {comments.map((comment) => (
        <p key={comment.id}>{comment.description}</p>
      ))}
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <button type="submit">Aggiungi Commento</button>
      </form>
    </div>
  );
};

export default PostComments;
