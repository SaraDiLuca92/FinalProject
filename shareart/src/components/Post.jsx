import React from "react";

const Post = ({
  post,
  deletePost,
  updatePost,
  createComment,
  deleteComment,
}) => {
  const handleDelete = () => {
    deletePost(post.id);
  };

  const handleUpdate = () => {
    const updatedPost = { ...post, content: "Nuovo contenuto" };
    updatePost(post.id, updatedPost);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const comment = {
      content: "Testo del commento",
      userId: "ID utente",
      postId: post.id,
    };
    createComment(comment);
  };

  const handleCommentDelete = (commentId) => {
    deleteComment(commentId);
  };

  return (
    <div>
      <h3>Post</h3>
      <p>Contenuto: {post.content}</p>
      <p>Tipo: {post.type}</p>
      <p>Utente: {post.user}</p>
      <button onClick={handleDelete}>Elimina post</button>
      <button onClick={handleUpdate}>Modifica post</button>

      <h4>Commenti</h4>
      <form onSubmit={handleCommentSubmit}>
        <input type="text" placeholder="Inserisci commento" />
        <button type="submit">Invia commento</button>
      </form>

      <ul>
        {post.comments.map((comment) => (
          <li key={comment.id}>
            <p>Contenuto commento: {comment.content}</p>
            <p>Utente commento: {comment.user}</p>
            <button onClick={() => handleCommentDelete(comment.id)}>
              Elimina commento
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Post;
