package com.example.springapp.authentication;

import com.example.springapp.model.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

	private String name;
	private String email;
	private String password;
	private Role role;
}
