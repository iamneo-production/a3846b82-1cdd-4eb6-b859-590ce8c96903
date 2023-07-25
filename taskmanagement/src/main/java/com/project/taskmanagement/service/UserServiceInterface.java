package com.project.taskmanagement.service;

import org.springframework.http.ResponseEntity;

import com.project.taskmanagement.model.User;

public interface UserServiceInterface {

    ResponseEntity<?> saveUser(User user);

    ResponseEntity<?> confirmEmail(String confirmationToken);
}
