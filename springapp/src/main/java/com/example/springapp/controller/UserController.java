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


import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.beans.factory.annotation.Value;
import java.nio.file.StandardCopyOption;
import org.springframework.util.StringUtils;

@RestController
@RequiredArgsConstructor
public class UserController {
	
	public final UserService userservice;
	
    public final UserRepository userrepository;


    private UserServiceInterface userServiceIn;

    @Value("${upload.path}")
    private String uploadPath;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        return userServiceIn.saveUser(user);
    }

    @GetMapping("/confirm-account")
    public ResponseEntity<?> confirmUserAccount(@RequestParam("token")String confirmationToken) {
        return userServiceIn.confirmEmail(confirmationToken);
    }

	@GetMapping("/users")
	public List<User> returnAll(){
		return userrepository.findAll();
	}

	@GetMapping("/users/{id}")
	public User getUserById(@PathVariable Long id){
		Optional<User> optionaluser = userrepository.findById(id);
		return optionaluser.orElse(null);
	}

	@DeleteMapping("/users/{id}")
	public ResponseEntity<Void> deleteUser(@PathVariable Long id){
		if (userrepository.existsById(id)){
			userrepository.deleteById(id);
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.notFound().build();
	}

	@PutMapping("/users/{id}")
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
	
	@PostMapping("/users")
    public ResponseEntity<Void> createUser(@RequestBody User user) {
        User createdUser = userrepository.save(user);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(createdUser.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }





    @GetMapping("/{userId}/image")
    public ResponseEntity<Resource> getUserImage(@PathVariable long id) throws IOException {
        Optional<User> optionalUser = userrepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getImagePath() != null) {
                Path imagePath = Path.of(user.getImagePath());
                Resource imageResource = new UrlResource(imagePath.toUri());

                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG) // Modify the content type if necessary
                        .body(imageResource);
            }
        }

        // Return a default image or error image if the user or image path is not found
        Path defaultImagePath = Path.of(uploadPath, "Default_pfp.jpg");
        Resource defaultImageResource = new UrlResource(defaultImagePath.toUri());
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG) // Modify the content type if necessary
                .body(defaultImageResource);
    }

    @DeleteMapping("/{userId}/delete/image")
    public ResponseEntity<String> deleteUserImage(@PathVariable long id) {
        Optional<User> optionalUser = userrepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getImagePath() != null) {
                String imagePath = user.getImagePath();
                deleteImageFile(imagePath);

                
                user.setImagePath(null);
                userrepository.save(user);

                return ResponseEntity.ok("Image deleted successfully.");
            }
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{userId}/image/edit")
    public ResponseEntity<String> updateUserImage(@PathVariable long id, @RequestPart("file") MultipartFile file) {
        Optional<User> optionalUser = userrepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            // Handle the file upload and save the new image
            if (!file.isEmpty()) {
                String fileName = file.getOriginalFilename();
                Path imagePath = Path.of(uploadPath, fileName);

                try {
                    Files.copy(file.getInputStream(), imagePath);
                    user.setImagePath(imagePath.toString());
                    userrepository.save(user);

                    // Return the updated image URL
                    URI imageUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                            .path("/{id}/image")
                            .buildAndExpand(id)
                            .toUri();

                    return ResponseEntity.created(imageUri).build();
                } catch (IOException e) {
                    e.printStackTrace();
                    return ResponseEntity.badRequest().body("Failed to update image.");
                }
            } else {
                return ResponseEntity.badRequest().body("File is empty.");
            }
        } 
        else {
            return ResponseEntity.notFound().build();
        }
    }

    private void deleteImageFile(String imagePath) {
        try {
            Path imageToDelete = Path.of(imagePath);
            Files.deleteIfExists(imageToDelete);
        } catch (IOException e) {
            e.printStackTrace();
            // Handle exception accordingly
        }
    }
}


