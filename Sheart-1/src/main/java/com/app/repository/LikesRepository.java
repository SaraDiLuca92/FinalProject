package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.models.Likes;
@Repository
public interface LikesRepository extends JpaRepository<Likes,Integer>{

}