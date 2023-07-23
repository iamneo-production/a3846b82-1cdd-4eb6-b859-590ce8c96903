package main.java.com.project.taskmanagement.admin;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.project.taskmanagement.model.Role;
import com.project.taskmanagement.model.User;
import com.project.taskmanagement.repository.UserRepository;

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
