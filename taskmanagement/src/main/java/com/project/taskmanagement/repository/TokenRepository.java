package com.project.taskmanagement.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.project.taskmanagement.model.Token;
public interface TokenRepository extends JpaRepository<Token,Long>{

	List<Token> findAllValidTokenByUser(Long userId);
	
	Optional<Token> findByToken(String token);
}