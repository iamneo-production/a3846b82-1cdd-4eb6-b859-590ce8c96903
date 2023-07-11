package com.project.taskmanagement.controller;
import java.net.URI;
import java.util.List;
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

@CrossOrigin("https://8080-dfbdbabdfcfdedeaeaadbdbabf.project.examly.io")
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
	@GetMapping("dusers/{username}/dtasks/{id}")
	public Task getTaskById(@PathVariable String username,@PathVariable Long id){
		return taskrepository.findById(id).get();
	}
	@DeleteMapping("/{username}/dtasks/{id}")//We can either give success or no content-choosing
	//Response entity enables us to get specific status back
	public ResponseEntity<Void> deleteTask(@PathVariable String username,
			@PathVariable Long id){
		Task task=taskservice.deleteById(id);
		if(task!=null) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.notFound().build();
	}
	@PutMapping("/dusers/{username}/dtasks/{id}")
	public ResponseEntity<Task> updateTask(@PathVariable String username,
			@PathVariable Long id,@RequestBody Task task){
		Task taskUpdated=taskservice.save(task);
		return new ResponseEntity<Task>(task,HttpStatus.OK);
	}
	
	@PostMapping("/dusers/{username}/dtasks")
	public ResponseEntity<Void> createTask(@PathVariable String username,@RequestBody Task task){
		task.setUsername(username);
		Task createdTask=taskservice.save(task);
		///Get Uri of id
		URI uri=ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdTask.getId()).toUri();
		return ResponseEntity.created(uri).build();
	}
}
