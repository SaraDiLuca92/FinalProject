package com.app.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.app.EmployeeRepo;
import com.app.Users;
import com.app.models.Likes;
import com.app.models.Posts;
import com.app.repository.LikesRepository;
import com.app.repository.PostsRepository;

@Controller
@RequestMapping("/api/likes")
public class LikesController {

    @Autowired
    private LikesRepository likesRepository;

    @Autowired
    private EmployeeRepo userRepository;

    @Autowired
    private PostsRepository postRepository;

    @PostMapping("/")
    public ResponseEntity<String> addLike(@RequestBody Likes newLike) {
        Optional<Posts> postOptional = postRepository.findById(newLike.getPostId().getId());
        if (postOptional.isPresent()) {
            Posts post = postOptional.get();
            Likes like = new Likes();
            like.setUserId(null); // Setta l'utente a null o lascia il campo vuoto
            like.setPostId(post);
            likesRepository.save(like);
            return ResponseEntity.status(HttpStatus.CREATED).body("Like added successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found!");
        }
    }

    @DeleteMapping("/{likeId}")
    public ResponseEntity<String> removeLike(@PathVariable Integer likeId) {
        Optional<Likes> likeOptional = likesRepository.findById(likeId);
        if (likeOptional.isPresent()) {
            Likes like = likeOptional.get();
            likesRepository.delete(like);
            return ResponseEntity.ok("Like removed successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Like not found!");
        }
    }
}
