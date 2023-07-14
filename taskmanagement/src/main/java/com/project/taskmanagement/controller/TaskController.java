package com.project.taskmanagement.controller;
import java.net.URI;
import java.util.List;
import java.util.Optional;
import com.project.taskmanagement.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.project.taskmanagement.repository.TaskRepository;

import com.project.taskmanagement.model.Task;

@CrossOrigin("https://8081-dfbdbabdfcfdedeaeaadbdbabf.project.examly.io")
@RestController
public class TaskController {
	@Autowired
	public TaskRepository taskrepository;

    @Autowired
    public TaskService taskservice;
	
	@GetMapping("/dtasks")
	public List<Task> retrieveAllTasks(){
		return taskrepository.findAll();
	}
	@GetMapping("/dtasks/{id}")
	public Task getTaskById(@PathVariable Long id){
		Optional <Task> optionaltask=taskrepository.findById(id);
		return optionaltask.orElse(null);
	}
	@DeleteMapping("/dtasks/{id}")//We can either give success or no content-choosing
	//Response entity enables us to get specific status back
	public ResponseEntity<Void> deleteTask(@PathVariable Long id){
		if (taskrepository.existsById(id)){
			taskrepository.deleteById(id);
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.notFound().build();
	}

	
	 //Creating new task
	 @PostMapping
	 public ResponseEntity<Task> createTask(@RequestBody Task task) {
		 // Retrieving the current user from the Authentication object
		 Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		 String currentUsername = authentication.getName();
 
		 // Assign the current user as the task assignee
		 Optional<User> user = userRepository.findByName(currentUsername);
		 if (user.isPresent()) {
			 User assignee = user.get();
			 task.setUser(assignee);
 
			 // Set the current date for created date 
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
	 
	 //Updating existing task
	 @PutMapping("/{id}")
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
