package com.example.springapp.controller;
import java.net.URI;
import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.bind.annotation.RequestMethod;
import com.example.springapp.model.User;
import com.example.springapp.repository.UserRepository;
import com.example.springapp.service.UserService;
import com.example.springapp.service.UserServiceInterface;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class UserController {
	
	public final UserService userservice;
	
    public final UserRepository userrepository;


    private UserServiceInterface userServiceIn;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        return userServiceIn.saveUser(user);
    }

    @GetMapping("/confirm-account")
    public ResponseEntity<?> confirmUserAccount(@RequestParam("token")String confirmationToken) {
        return userServiceIn.confirmEmail(confirmationToken);
    }

	@GetMapping("/dusers")
	public List<User> returnAll(){
		return userrepository.findAll();
	}

	@GetMapping("/dusers/{id}")
	public User getUserById(@PathVariable Long id){
		Optional<User> optionaluser = userrepository.findById(id);
		return optionaluser.orElse(null);
	}

	@DeleteMapping("/dusers/{id}")
	public ResponseEntity<Void> deleteUser(@PathVariable Long id){
		if (userrepository.existsById(id)){
			userrepository.deleteById(id);
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.notFound().build();
	}

	@PutMapping("/dusers/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        Optional<User> optionalUser = userrepository.findById(id);
        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            existingUser.setName(updatedUser.getName());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setRole(updatedUser.getRole());

            User userUpdated = userrepository.save(existingUser);
            return ResponseEntity.ok(userUpdated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
	
	@PostMapping("/dusers")
    public ResponseEntity<Void> createUser(@RequestBody User user) {
        User createdUser = userrepository.save(user);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(createdUser.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }
}


