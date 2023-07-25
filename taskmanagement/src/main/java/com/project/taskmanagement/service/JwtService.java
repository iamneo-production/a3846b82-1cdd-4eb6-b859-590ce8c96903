package com.project.taskmanagement.service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
 
@Service
public class JwtService {

	@Value("${example.security.jwtSecret}")
	private String secretKey;
	
	@Value("${example.security.jwtExpiration}")
	private long jwtExpiration;
	
	@Value("${example.security.jwtRefreshExpiration}")
	private long refreshExpiration;
	
	public String extractUsername(String token) {
		return extractClaims(token, Claims::getSubject);
	}
	
	//extracting every single keys
	public<T> T extractClaims(String token,Function<Claims,T> claimsResolver) {
		final Claims claims= extractAllClaims(token);
		return claimsResolver.apply(claims);
	}
	
	//build JWT 
	private String buildToken(Map<String,Object>extractClaims,
			UserDetails userDetails,
			long expiration) {
		return Jwts.builder()
				.setClaims(extractClaims)
				.setSubject(userDetails.getUsername())
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis()+expiration))
				.signWith(getSigninKey(),SignatureAlgorithm.HS256)
				.compact()
				;
	}
	
	//generate Token
		public String generateToken(
				Map<String,Object>extractClaims,
				UserDetails userDetails
				) {
			return buildToken(extractClaims,userDetails,jwtExpiration);
		}
		
		//generate RefreshToken
		public String generateRefreshToken(
				UserDetails userDetails
				) {
			return buildToken(new HashMap<>(),userDetails,refreshExpiration);
		}
	
	//generating token using only userDeatils 
	public String generateToken(UserDetails userDetails) {
		return generateToken(new HashMap<>(), userDetails);
	}
	
	//to validate token
	public boolean isTokenValid(String token,UserDetails userDetails) {
		final String username = extractUsername(token);
		return(username.equals(userDetails.getUsername())) &&
				! isTokenExpired(token);
	}
	
	//to check token expiration
	private boolean isTokenExpired(String token) {
		return extractExpiration(token).before(new Date());
	}
	
	//extract expiration 
	private Date extractExpiration(String token) {
		return extractClaims(token, Claims::getExpiration);
	}
	
	//extract all claims
	private Claims extractAllClaims(String token) {
		return Jwts.parserBuilder()
				.setSigningKey(getSigninKey())
				.build()
				.parseClaimsJws(token)
				.getBody();
	}

	private Key getSigninKey() {

		byte[] keyBytes = Decoders.BASE64.decode(secretKey);
		return Keys.hmacShaKeyFor(keyBytes);
	}
}
