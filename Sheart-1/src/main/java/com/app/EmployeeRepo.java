package com.app;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepo extends JpaRepository<Users, Long> {
    Optional<Users> findByUsername(String username);
    
    @Query("SELECT r.followedUserId.id FROM Relationships r WHERE r.followerUserId.id = ?1")
    List<Integer> getFollowedUsers(Integer userId);
    Optional<Users> findById(Integer id);
}
