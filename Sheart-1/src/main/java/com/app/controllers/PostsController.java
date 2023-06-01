package com.app.controllers;

import com.app.models.Posts;
import com.app.Users;
import com.app.EmployeeRepo;
import com.app.repository.PostsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/api/posts")
public class PostsController {

    @Autowired
    private PostsRepository postRepository;

    @Autowired
    private EmployeeRepo userRepository;

    @GetMapping("/")
    public ResponseEntity<List<Posts>> getPosts(@RequestParam(required = false) Integer userId) {
        List<Posts> posts;
        if (userId != null && userId != 0) {
            // Ottieni i post per l'ID utente specificato
            posts = postRepository.findByUserIdOrderByCreatedAtDesc(userId);
        } else {
            // Ottieni tutti i post
            posts = postRepository.findAllByOrderByCreatedAtDesc();
        }
        return ResponseEntity.ok(posts);
    }

    @PostMapping("/")
    public ResponseEntity<String> addPost(@RequestBody Posts newPost) {
        Optional<Users> userOptional = userRepository.findById(newPost.getUser().getId());
        if (userOptional.isPresent()) {
            Users user = userOptional.get();
            // Creazione di un nuovo post
            Posts post = new Posts();
            post.setDescription(newPost.getDescription());
            post.setImg(newPost.getImg());
            post.setCreatedAt(LocalDate.now());
            post.setUser(user);
            postRepository.save(post);
            return ResponseEntity.status(HttpStatus.CREATED).body("Post created successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found!");
        }
    }

    @PutMapping("/{postId}")
    public ResponseEntity<String> updatePost(@PathVariable Integer postId, @RequestBody Posts updatedPost) {
        Optional<Posts> postOptional = postRepository.findById(postId);
        if (postOptional.isPresent()) {
            Posts post = postOptional.get();
            // Aggiornamento del post
            post.setDescription(updatedPost.getDescription());
            post.setImg(updatedPost.getImg());
            postRepository.save(post);
            return ResponseEntity.ok("Post updated successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found!");
        }
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<String> deletePost(@PathVariable Integer postId) {
        Optional<Posts> postOptional = postRepository.findById(postId);
        if (postOptional.isPresent()) {
            Posts post = postOptional.get();
            postRepository.delete(post);
            return ResponseEntity.ok("Post deleted successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found!");
        }
    }
}
