package com.example.springapp.controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import com.example.springapp.service.TaskService;
import java.util.List;
import com.example.springapp.model.Task;
@RestController
public class TaskController {
	@Autowired
	public TaskService taskservice;
	
	@GetMapping("/tasks")
	public List<Task> retrieveAllTasks(){
		return taskservice.findTasks();
	}
	@GetMapping("/users/{username}/tasks/{id}")
	public Task getTaskById(@PathVariable String username,@PathVariable long id){
		return taskservice.findById(id);
	}
	@DeleteMapping("/{username}/dtasks/{id}")//We can either give success or no content-choosing
	//Response entity enables us to get specific status back
	public ResponseEntity<Void> deleteTask(@PathVariable String username,
			@PathVariable long id){
		Task task=taskservice.deleteById(id);
		if(task!=null) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.notFound().build();
	}
}