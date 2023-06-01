package com.app.models;

import java.time.LocalDate;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.app.models.Posts;
import com.app.Users;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Table(name = "likes")
public class Likes {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(unique = true)
    private int id;

    @ManyToOne
    @JoinColumn(name = "likeUserId", referencedColumnName = "id",nullable=false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Users userId;
    @ManyToOne
    @JoinColumn(name = "likePostId", referencedColumnName = "id",nullable=false )
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Posts postId;


}

