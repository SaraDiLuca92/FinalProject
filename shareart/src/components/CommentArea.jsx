import React, { useState, useEffect } from "react";
import axios from "axios";

const CommentArea = ({ postId }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9099/api/comments/${postId}`
      );
      const responseData = Array.isArray(response.data) ? response.data : []; // Ensure responseData is always an array
      setComments(responseData);
    } catch (error) {
      console.error("Error retrieving comments:", error);
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (comment.trim() !== "") {
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
        "cacata",
        "str...o",
      ];
      const patterns = badWords
        .map((word) => createPatternWithNumberSubstitutions(word))
        .join("|");
      const regex = new RegExp(`\\b(${patterns})\\b`, "gi");
      // Espressione regolare per cercare le parole da filtrare

      // Controlla se la descrizione contiene parole da filtrare
      if (regex.test(comment)) {
        console.log("Errore: il commento contiene parole inopportune");
        alert(
          "Errore: il commento non può essere inviato perché contiene parole inopportune."
        );
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:9099/api/comments/",
          {
            description: comment,
            post: {
              id: postId,
            },
          }
        );
        console.log("Comment added successfully!");
        setComment("");
        fetchComments();
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

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

    return `(?:\\b${pattern}\\b[^\\w]*)`;
  }
  return (
    <div className="container commentarea">
      <h2>COMMENTS</h2>
      <div className="mb-3">
        <form onSubmit={handleCommentSubmit}>
          <div className="form-group">
            <textarea
              className="form-control"
              rows="3"
              placeholder="Write a comment..."
              value={comment}
              onChange={handleCommentChange}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            ADD COMMENTS
          </button>
        </form>
      </div>
      <div>
        {comments.map((comment) => (
          <div className="card mb-2" key={comment.id}>
            <div className="card-body">{comment.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentArea;
