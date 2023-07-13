package com.project.taskmanagement.model;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="token")
public class Token {

	@Id
	@GeneratedValue
	private long id;
	private String token;
	@Enumerated(EnumType.STRING)
	private TokenType tokenType;
	private boolean expired;
	private boolean revoked;
	
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;
	
	
}
