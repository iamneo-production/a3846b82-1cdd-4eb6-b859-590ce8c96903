package com.example.springapp.controller;
<<<<<<< HEAD

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.security.Principal;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import com.example.springapp.model.TaskStatus;
import com.example.springapp.model.Task;
import com.example.springapp.model.User;
import com.example.springapp.repository.UserRepository;
import com.example.springapp.repository.TaskRepository;
import com.example.springapp.service.TaskService;
import com.example.springapp.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
public class TaskController {

    private final TaskService taskService;

    private final UserRepository userRepository;

    private final TaskRepository taskRepository;

    // get all tasks
    @GetMapping("/tasks")
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> tasks = taskService.getAllTasks();
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    //@GetMapping("/tasks/{userId}")
   /*  
    @GetMapping("/tasks")
    public ResponseEntity<List<Task>> getTasksByUserId(@AuthenticationPrincipal User authenticatedUser) {
        // List<Task> tasks = taskService.getTasksByUserId(userId);
        // return new ResponseEntity<>(tasks, HttpStatus.OK);
        long userId = authenticatedUser.getId();
        List<Task> tasks = taskService.getTasksByUserId(userId);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }
*/
    // get task by id
    @GetMapping("/tasks/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Task task = taskService.getTaskById(id);
        if (task != null) {
            return new ResponseEntity<>(task, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Creating new task
    @PostMapping("/tasks")
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        // Retrieve the current user from the Authentication object
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();

        // Assign the current user as the task assignee
        Optional<User> user = userRepository.findByName(currentUsername);
        if (user.isPresent()) {
            User assignee = user.get();
            task.setUser(assignee);

            // Set the current date
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

    // Creating new task
    @PutMapping("/tasks/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task task) {
        Task existingTask = taskService.getTaskById(id);
        if (existingTask != null) {
            task.setId(id);

            // Retrieve the current user from the Authentication object
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String currentUsername = authentication.getName();

            // Assign the current user as the task assignee
            Optional<User> user = userRepository.findByName(currentUsername);
            if (user.isPresent()) {
                User assignee = user.get();
                task.setUser(assignee);

                // Set the current date
                LocalDate createdDate = LocalDate.now();
                task.setCreatedDate(createdDate);

                Task updateTask = taskService.updateTask(task);
                return new ResponseEntity<>(updateTask, HttpStatus.OK);
            }

            else {
                // Handle the case when the user is not found
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /*
     * Updating existing task
     * 
     * @PutMapping("/tasks/{id}") public ResponseEntity<Task>
     * updateTask(@PathVariable Long id, @RequestBody Task task) { Task existingTask
     * = taskService.getTaskById(id); if (existingTask != null) { task.setId(id);
     * Task updatedTask = taskService.updateTask(task); return new
     * ResponseEntity<>(updatedTask, HttpStatus.OK); } else { return new
     * ResponseEntity<>(HttpStatus.NOT_FOUND); } }
     */

    @DeleteMapping("/tasks/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        Task existingTask = taskService.getTaskById(id);
        if (existingTask != null) {
            taskService.deleteTask(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/todo-count")
    public Long getTodoTaskCount() {
       return taskRepository.countByStatus(TaskStatus.TODO);
    }
    // Count Inprogress tasks
    @GetMapping("/inprogress-count")
    public Long getInProgressTaskCount() {
        return taskRepository.countByStatus(TaskStatus.IN_PROGRESS);
    }

    // Count Done tasks
    @GetMapping("/done-count")
    public Long getDoneTaskCount() {
        return taskRepository.countByStatus(TaskStatus.DONE);
    }

    // Count Completed tasks (Equivalent to the existing method)
    @GetMapping("/completed-count")
    public Long getCompletedTaskCount() {
        return taskRepository.count();
    }

=======
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
>>>>>>> parent of c83de8e (changed)
}