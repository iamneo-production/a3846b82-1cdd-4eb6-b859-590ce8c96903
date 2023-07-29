package com.example.springapp.controller;



import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.springapp.model.Profile;
import com.example.springapp.repository.ProfileRepository;
import com.example.springapp.service.ProfileService;


import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;



@RestController
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    //@Autowired
    //private ProfileRepository profileRepository;

    @Value("${upload.path}")
    private String uploadPath;

    //@GetMapping("/")
    /*public Iterable<Profile> getUser() {
        return profileService.listAll();
    }*/
    
    
   @GetMapping("/user/{id}")
    public ResponseEntity<Profile> getUser(@PathVariable("id") long id) {
        Profile profile = profileService.getUserById(id);
        if (profile != null) {
            return ResponseEntity.ok(profile);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    

    @PutMapping("/edit/{id}")
    public Profile updateImage(@PathVariable("id") long id,
                       @RequestParam(value = "file", required = false) MultipartFile file
                       /*@RequestParam("firstname") String firstname,
                       @RequestParam("lastname") String lastname,
                       @RequestParam("username") String username,
                       @RequestParam("email") String email,
                       @RequestParam("password") String password*/) throws IOException {
        Profile existingUser = profileService.getUserById(id);
        if (existingUser != null) {
            /*existingUser.setFirstname(firstname);
            existingUser.setLastname(lastname);
            existingUser.setUsername(username);
            existingUser.setEmail(email);
            existingUser.setPassword(password);*/

            if (file != null && !file.isEmpty()) {
                String fileName = StringUtils.cleanPath(file.getOriginalFilename());
                Path filePath = Path.of(uploadPath, fileName);

                // Copy the file to the upload path
                Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

                existingUser.setImagePath(filePath.toString());
            }

            return profileService.saveOrUpdate(existingUser);
        }
        return null;
    }

    
    @GetMapping("/{userId}/image")
    public ResponseEntity<Resource> getUserImage(@PathVariable("userId") long userId) throws IOException {
        Profile user = profileService.getUserById(userId);
        if (user != null && user.getImagePath() != null) {
            Path imagePath = Path.of(user.getImagePath());
            Resource imageResource = new UrlResource(imagePath.toUri());

            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG) // Modify the content type if necessary
                    .body(imageResource);
        }

        // Return a default image or error image if the user or image path is not found
        Path defaultImagePath = Path.of(uploadPath, "Default_pfp.jpg");
        Resource defaultImageResource = new UrlResource(defaultImagePath.toUri());
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG) // Modify the content type if necessary
                .body(defaultImageResource);
    }
    
    
    @DeleteMapping("/delete/{id}/image")
    public ResponseEntity<String> deleteImage(@PathVariable("id") long id) {
        Profile existingUser = profileService.getUserById(id);
        if (existingUser != null && existingUser.getImagePath() != null) {
            String imagePath = existingUser.getImagePath();
            deleteImageFile(imagePath);

            // Update the user entity with a null image path
            existingUser.setImagePath(null);
            profileService.saveOrUpdate(existingUser);

            return ResponseEntity.ok("Image deleted successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    private void deleteImageFile(String imagePath) {
        try {
            Path imageToDelete = Path.of(imagePath);
            Files.deleteIfExists(imageToDelete);
        } catch (IOException e) {
            // Handle exception accordingly
        }
    }


}
