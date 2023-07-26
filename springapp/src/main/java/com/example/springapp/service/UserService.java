package com.example.springapp.service;
import org.springframework.stereotype.Service;

import com.example.springapp.model.User;
import java.util.List;
@Service
public class UserService {

    // Suppose you have a list of users stored in memory or retrieved from a database.
    private List<User> userList;

    public UserService(List<User> userList) {
        this.userList = userList;
    }

    public List<User> getAllUsers() {
        return userList;
    }

    public User getUserById(int userId) {
        for (User user : userList) {
            if (user.getId() == userId) {
                return user;
            }
        }
        return null; // Return null if the user with the specified ID is not found.
    }
}