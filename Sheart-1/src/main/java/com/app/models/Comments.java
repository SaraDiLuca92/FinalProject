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

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Entity
@Table(name="comments")
public class Comments {
@Id
@GeneratedValue(strategy=GenerationType.AUTO)
@Column(unique = true)
private int id;

private String description;
private LocalDate createdAt;

@ManyToOne
@JoinColumn(name = "commentUserId", referencedColumnName = "id")
@OnDelete(action = OnDeleteAction.CASCADE)
private Users user;
@ManyToOne
@JoinColumn(name = "postid", referencedColumnName = "id")
@OnDelete(action = OnDeleteAction.CASCADE)
private Posts post;
}
