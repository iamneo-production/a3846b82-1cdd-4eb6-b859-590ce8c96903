package com.project.taskmanagement.controller;
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

import com.project.taskmanagement.controller.User;
import com.project.taskmanagement.repository.UserRepository;


@CrossOrigin("https://8081-dfbdbabdfcfdedeaeaadbdbabf.project.examly.io")
@RestController
public class UserResource {
	
	@Autowired
	public UserService userservice;
	
    @Autowired
    public UserRepository userrepository;

	
	@GetMapping("/dusers")
	public List<User> returnAll(){
		return userrepository.findAll();
//		return userservice.findAll();
	}
	@GetMapping("/dusers/{username}/tasks/{id}")
	public User getTaskById(@PathVariable String username,@PathVariable Long id){
		return userservice.findById(id);
	}
	
	@DeleteMapping("/{username}/dusers/{id}")//We can either give success or no content-choosing
	//Response entity enables us to get specific status back
	public ResponseEntity<Void> deleteUser(@PathVariable String username,
			@PathVariable long id){
		User user=userservice.deleteById(id);
		if(user!=null) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.notFound().build();
	}
	@PutMapping("/users/{username}/dusers/{id}")
	public ResponseEntity<User> updateUser(@PathVariable String username,
			@PathVariable long id,@RequestBody User user){
		User userUpdated=userservice.save(user);
		return new ResponseEntity<User>(user,HttpStatus.OK);
	}
	
	@PostMapping("/users/{username}/dusers")
	public ResponseEntity<Void> updateUser(@PathVariable String username,@RequestBody User user){
		User createdUser=userservice.save(user);
		///Get Uri of id
		URI uri=ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdUser.getId()).toUri();
		return ResponseEntity.created(uri).build();
	}
}

