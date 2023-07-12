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



@CrossOrigin("https://8081-dfbdbabdfcfdedeaeaadbdbabf.project.examly.io")
@RestController  
public class TodoController {
	
   @Autowired 
   private TodoRepository todoRepository;

   
   @Autowired
   public TodoService todoservice;
   
   @GetMapping("/view-task")
   public List<Todo> retrieveAllTodos(){
	   return todoRepository.findAll();
	   }
   
	@GetMapping("/{taskName}/view-task/{id}")
	public Todo getTodoById (@PathVariable String taskName,@PathVariable Long id){
		return todoRepository.findById(id).get();
	
	}
	
	
	@GetMapping("/{taskName}/view-task")
	public Todo getTodoByTaskName (@PathVariable String taskName){
		return todoRepository.findByTaskName(taskName).get(0);
		
	}
	
	@DeleteMapping("/{taskName}/view-task/{id}")
	public ResponseEntity<Void> deleteTodo(
			@PathVariable String taskName, @PathVariable Long id) 
	    {   	
		todoRepository.deleteById(id);
		
		return ResponseEntity.noContent().build();  
	}
	
	
	@PutMapping ("/{taskName}/view-task/{id}")
	public ResponseEntity<Todo> updateTodo(
			@PathVariable String taskName,
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


