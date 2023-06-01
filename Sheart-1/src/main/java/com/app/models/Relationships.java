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

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name="relationships")
public class Relationships {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	@ManyToOne
	@JoinColumn(name="followerUser",nullable=false,referencedColumnName = "id")
    @OnDelete(action = OnDeleteAction.CASCADE)
	private Users followerUserId;
	@ManyToOne
	@JoinColumn(name="followedUser",nullable=false,referencedColumnName = "id")
    @OnDelete(action = OnDeleteAction.CASCADE)
	private Users followedUserId;
	
	
}
