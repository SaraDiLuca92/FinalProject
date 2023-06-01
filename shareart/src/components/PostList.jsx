import React from "react";
import Post from "./Post";

const PostList = ({
  posts,
  deletePost,
  updatePost,
  createComment,
  deleteComment,
}) => {
  return (
    <div>
      <h2>Bacheca</h2>
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          deletePost={deletePost}
          updatePost={updatePost}
          createComment={createComment}
          deleteComment={deleteComment}
        />
      ))}
    </div>
  );
};

export default PostList;
