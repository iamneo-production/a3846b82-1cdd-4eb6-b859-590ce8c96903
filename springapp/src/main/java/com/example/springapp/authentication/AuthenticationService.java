package com.example.springapp.authentication;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import com.example.springapp.model.Role;
import com.example.springapp.model.Token;
import com.example.springapp.model.TokenType;
import com.example.springapp.model.User;
import com.example.springapp.repository.TokenRepository;
import com.example.springapp.repository.UserRepository;
import com.example.springapp.service.JwtService;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
	
	private final UserRepository userRepository;
	
	private final TokenRepository tokenRepository;
	
	private final PasswordEncoder passwordEncoder;
	
	private final JwtService jwtService;
	
	private final AuthenticationManager authenticationManager;
	
	public AuthenticationResponse register(RegisterRequest request) {

		var user = User.builder()
				.name(request.getName())
				.email(request.getEmail())
				.password(passwordEncoder.encode(request.getPassword()))
				.role(request.getRole() != null ? request.getRole() : Role.USER)
				.build();
		var savedUser = userRepository.save(user);

		Long userId = savedUser.getId();
		String username = savedUser.getName();
		String email = savedUser.getEmail();

		String role = savedUser.getRole().name();


		var jwtToken = jwtService.generateToken(user);
		var refreshToken = jwtService.generateRefreshToken(user);
		saveUserToken(savedUser, jwtToken);
		return AuthenticationResponse.builder()
				.accessToken(jwtToken)
				.refreshToken(refreshToken)
				.username(username)
				.email(email)
				.userId(userId)
				.role(role)
				.build();
	}

	private void saveUserToken(User user, String jwtToken) {
		var token = Token.builder()
				.user(user)
				.token(jwtToken)
				.tokenType(TokenType.BEARER)
				.revoked(false)
				.expired(false)
				.build();
		tokenRepository.save(token);
	}

	//revoke all user tokens
	private void revokeAllUserToken(User user) {
		var validToken = tokenRepository.findAllValidTokenByUser(user.getId());
		if(validToken.isEmpty()) 
			return;
			validToken.forEach(t->{
				t.setExpired(true);
				t.setRevoked(true);
				}); 
			tokenRepository.saveAll(validToken);
		}
	
	
	public  AuthenticationResponse authenticate(AuthenticationRequest request) {
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(request.getName(),request.getPassword())
				);
		var user = userRepository.findByName(request.getName())
				.orElseThrow();
		
		 // Get user claims
	    String name = user.getName();
	    String email = user.getEmail();
	    String role = user.getRole().name();

		Long userId = user.getId();
	    
		var jwtToken = jwtService.generateToken(user);
		var refreshToken = jwtService.generateRefreshToken(user);
		revokeAllUserToken(user);
		saveUserToken(user,jwtToken);
		
		return AuthenticationResponse.builder()
				.accessToken(jwtToken)
				.refreshToken(refreshToken)
				.username(name)
				.email(email)
				.role(role)
				.userId(userId)
				.build();
	}

	public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException, DatabindException, IOException {

		final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
		final String refreshToken;
		final String username;
		if(authHeader == null || !authHeader.startsWith("Bearer ")) {
			return;
		}
		refreshToken = authHeader.substring(7);
		username = jwtService.extractUsername(refreshToken);      //extracted username from token
	    if(username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
	    	var user = this.userRepository.findByName(username).orElseThrow();
	    	if(jwtService.isTokenValid(refreshToken, user)) {
	    		var accessToken = jwtService.generateToken(user);
	    		revokeAllUserToken(user);
	    		saveUserToken(user,accessToken);
	    		var authResponse = AuthenticationResponse.builder()
	    				.accessToken(accessToken)
	    				.refreshToken(refreshToken)
	    				.build();
	    		new ObjectMapper().writeValue(response.getOutputStream(),authResponse);
	    	}
	    }
	}

}

