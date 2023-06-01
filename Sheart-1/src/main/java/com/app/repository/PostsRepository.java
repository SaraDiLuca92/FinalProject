package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.models.Posts;
@Repository
public interface PostsRepository extends JpaRepository<Posts,Integer>{ List<Posts> findByUserIdOrderByCreatedAtDesc(Integer userId);
List<Posts> findByUserIdInOrderByCreatedAtDesc(List<Integer> userIds);
List<Posts> findAllByOrderByCreatedAtDesc();


} 