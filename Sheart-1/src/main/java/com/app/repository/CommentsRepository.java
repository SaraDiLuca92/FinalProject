package com.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.models.Comments;
@Repository
public interface CommentsRepository extends JpaRepository<Comments,Integer>{
	List<Comments> findByPostId(int postId);


}
