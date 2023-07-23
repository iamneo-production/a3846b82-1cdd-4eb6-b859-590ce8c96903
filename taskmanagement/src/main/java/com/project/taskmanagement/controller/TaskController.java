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
