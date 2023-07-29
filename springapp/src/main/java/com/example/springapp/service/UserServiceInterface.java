package com.example.springapp.service;

import org.springframework.http.ResponseEntity;

import com.example.springapp.model.User;

public interface UserServiceInterface {

    ResponseEntity<?> saveUser(User user);

    ResponseEntity<?> confirmEmail(String confirmationToken);
}
