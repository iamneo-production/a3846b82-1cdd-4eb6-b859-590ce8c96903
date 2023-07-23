package com.project.taskmanagement.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.security.Principal;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.annotation.AuthenticationPrincipal;


import com.project.taskmanagement.model.Task;
import com.project.taskmanagement.model.User;
import com.project.taskmanagement.repository.UserRepository;
import com.project.taskmanagement.service.TaskService;
import com.project.taskmanagement.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    private final UserRepository userRepository;

    /* get all tasks
    @GetMapping("/tasks")
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> tasks = taskService.getAllTasks();
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }*/

    //@GetMapping("/tasks/{userId}")
    @GetMapping("/tasks")
    public ResponseEntity<List<Task>> getTasksByUserId(@AuthenticationPrincipal User authenticatedUser) {
        // List<Task> tasks = taskService.getTasksByUserId(userId);
       // return new ResponseEntity<>(tasks, HttpStatus.OK);
       long userId = authenticatedUser.getId();
       List<Task> tasks = taskService.getTasksByUserId(userId);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }


    // get task by id
    @GetMapping("tasks/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Task task = taskService.getTaskById(id);
        if (task != null) {
            return new ResponseEntity<>(task, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Creating new task
    @PostMapping("/tasks")
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        // Retrieve the current user from the Authentication object
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();

        // Assign the current user as the task assignee
        Optional<User> user = userRepository.findByName(currentUsername);
        if (user.isPresent()) {
            User assignee = user.get();
            task.setUser(assignee);

            // Set the current date
            LocalDate createdDate = LocalDate.now();
            task.setCreatedDate(createdDate);

            Task createdTask = taskService.createTask(task);
            return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
        }

        else {
            // Handle the case when the user is not found
            return ResponseEntity.notFound().build();
        }
    }

    // Updating existing task
    @PutMapping("/tasks/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task task) {
        Task existingTask = taskService.getTaskById(id);
        if (existingTask != null) {
            task.setId(id);
            Task updatedTask = taskService.updateTask(task);
            return new ResponseEntity<>(updatedTask, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    
    
}
