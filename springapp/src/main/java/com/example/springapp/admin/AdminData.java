package com.example.springapp.admin;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.springapp.model.Role;
import com.example.springapp.model.User;
import com.example.springapp.repository.UserRepository;
import org.springframework.stereotype.Component;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class AdminData implements CommandLineRunner{

	private final PasswordEncoder passwordEncoder;
	
	private final UserRepository userRepository;
	
	@Override
	public void run(String... args) throws Exception {
		 User adminUser = User.builder()
	                .name("admin")
	                .email("admin@example.com")
	                .password(passwordEncoder.encode("admin123"))
	                .role(Role.ADMIN)
	                .build();		
		 
	        userRepository.save(adminUser);

	}

}