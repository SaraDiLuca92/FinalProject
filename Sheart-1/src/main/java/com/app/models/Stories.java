package com.app.models;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
@Table(name="stories")
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class Stories {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(unique = true)
	private int id;
	
	@Column(nullable=false)
	private String img;
	@ManyToOne
	@JoinColumn(name="storyUserId",referencedColumnName = "id", nullable=false)
    @OnDelete(action = OnDeleteAction.CASCADE)
	
	private Users user;

}
