package com.app.controllers;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.app.Users;
import com.app.repository.UserRepository;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository usersRepository;

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUser(@PathVariable Integer userId) {
        Optional<Users> userOptional = usersRepository.findById(userId);
        if (userOptional.isPresent()) {
            Users user = userOptional.get();
            user.setPassword(null);  // Exclude password field from response
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found!");
        }
    }

    @PutMapping("/{userId}")
    public ResponseEntity<String> updateUser(@PathVariable Integer userId, @RequestBody Users updatedUser) {
        Optional<Users> userOptional = usersRepository.findById(userId);
        if (userOptional.isPresent()) {
            Users user = userOptional.get();

            // Update user fields
            user.setUsername(updatedUser.getUsername());
          

            usersRepository.save(user);
            return ResponseEntity.ok("User updated!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found!");
        }
    }
    @PostMapping
    public ResponseEntity<Users> createUser(@RequestBody Users user, Principal principal) {
        String loggedInUsername = principal.getName(); // Ottieni il nome utente dell'utente loggato

        // Aggiungi il nome utente loggato come proprietà dell'utente creato
        user.setUsername(loggedInUsername);

        Users createdUser = usersRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }
    @GetMapping
    public ResponseEntity<List<Users>> getAllUsers() {
        List<Users> users = usersRepository.findAll();
        return ResponseEntity.ok(users);
    }
    
}
