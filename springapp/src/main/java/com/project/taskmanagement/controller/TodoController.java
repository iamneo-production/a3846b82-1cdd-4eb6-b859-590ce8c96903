package com.project.taskmanagement.controller;

import com.project.taskmanagement.service.TodoService;
import com.project.taskmanagement.repository.TodoRepository;
import com.project.taskmanagement.model.Todo;
import java.net.URI;
import java.util.List;
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


@RestController  
public class TodoController {
	
   @Autowired 
   public TodoRepository todoRepository;

   
   @Autowired
   public TodoService todoservice;
   
   @GetMapping("/viewtask")
   public List<Todo> retrieveAllTodos(){
	   return todoRepository.findAll();
	   }
   
	@GetMapping("/{taskname}/viewtask/{id}")
	public Todo getTodoById (@PathVariable String taskname,@PathVariable Long id){
		return todoRepository.findById(id).get();
	
	}
	
	
	@GetMapping("/{taskname}/viewtask")
	public Todo getTodoByTaskname (@PathVariable String taskname){
		return todoRepository.findByTaskname(taskname).get(0);
		
	}
	
	@DeleteMapping("/viewtask/{id}")
	public ResponseEntity<Void> deleteTodo(
			 @PathVariable Long id) 
	    {   	
		todoRepository.deleteById(id);
		
		return ResponseEntity.noContent().build();  
	}
	
	
	@PutMapping ("/{taskname}/viewtask/{id}")
	public ResponseEntity<Todo> updateTodo(
			@PathVariable String taskname,
			@PathVariable Long id, @RequestBody Todo todo    
			 ){ 
		
		Todo todoUpdated = todoRepository.save(todo); 
		
	    return new ResponseEntity<Todo>(todo,HttpStatus.OK); 
	    
	    
	}
	
	
	@PostMapping("/{taskName}/view-task")
	public ResponseEntity<Void> createTodo(
			@PathVariable String taskName,
			 @RequestBody Todo todo
			 ){
		Todo createdTodo  = todoRepository.save(todo);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
		.path("/{id}").buildAndExpand(createdTodo.getId()).toUri(); 
		
	    return ResponseEntity.created(uri).build();
	
	
	}
}


