package com.app;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
@Entity
@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {	  
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	  private String username;
	  private String password;

	

	
	}

