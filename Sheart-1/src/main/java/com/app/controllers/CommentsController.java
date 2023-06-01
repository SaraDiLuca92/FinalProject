package com.app.controllers;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.app.EmployeeRepo;
import com.app.Users;
import com.app.models.Comments;
import com.app.models.Posts;
import com.app.repository.CommentsRepository;
import com.app.repository.PostsRepository;

@Controller
@RequestMapping("/api/comments")
public class CommentsController {
	@Autowired
	CommentsRepository commentsRepository;
	@Autowired
	PostsRepository postrepository;

	@GetMapping("/")
	public ResponseEntity<List<Comments>> getAllComments() {
	    List<Comments> comments = commentsRepository.findAll();
	    return ResponseEntity.ok(comments);
	}


	@PostMapping("/")
	public ResponseEntity<String> addComment(@RequestBody Comments newComment) {
	    // Check if the associated post exists
	    Optional<Posts> postOptional = postrepository.findById(newComment.getPost().getId());
	    if (postOptional.isPresent()) {
	        Posts post = postOptional.get();
	        Comments comment = new Comments();
	        comment.setDescription(newComment.getDescription());
	        comment.setCreatedAt(LocalDate.now());
	        comment.setUser(newComment.getUser()); // Set the user associated with the comment
	        comment.setPost(post);
	        commentsRepository.save(comment);
	        return ResponseEntity.status(HttpStatus.CREATED).body("Comment added successfully!");
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found!");
	    }
	}
	@GetMapping("/{postId}")
	public ResponseEntity<List<Comments>> getCommentsByPostId(@PathVariable int postId) {
	    List<Comments> comments = commentsRepository.findByPostId(postId);
	    if (!comments.isEmpty()) {
	        return ResponseEntity.ok(comments);
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	    }
	}

	}



   



