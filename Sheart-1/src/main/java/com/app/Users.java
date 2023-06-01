package com.app;


import java.util.List;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.app.models.Posts;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Users {
 
 
  @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(unique = true)
	private Integer id;


	private String email;
	@Column(nullable = false)
	private String password;
	@Column(nullable = false)
	private String username;


    private String posts;

}

