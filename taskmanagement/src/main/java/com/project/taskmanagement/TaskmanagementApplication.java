package com.project.taskmanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TaskmanagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(TaskmanagementApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(
			AuthenticationService authenticationService
			) 
	{
		return a->{
			var admin = RegisterRequest.builder()
					.name("Admin")
					.email("admin@gmail.com")
					.password("adminpass")
					.role(ADMIN)
					.build();
			System.out.println("Admin token : "+authenticationService.register(admin).getAccessToken());
			
		};
	}
}
