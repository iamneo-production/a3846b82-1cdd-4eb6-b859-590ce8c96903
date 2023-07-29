package com.example.springapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

<<<<<<< HEAD:springapp/src/main/java/com/example/springapp/service/TaskService.java
import java.util.ArrayList;
import com.example.springapp.model.Task;
=======
import com.project.taskmanagement.model.Task;
import com.project.taskmanagement.model.User;
import com.project.taskmanagement.repository.TaskRepository;

>>>>>>> c186abd56538dad7a548cb6ada3d309a5e42c70d:taskmanagement/src/main/java/com/project/taskmanagement/service/TaskService.java

@Service
public class TaskService {

	 private TaskRepository taskRepository;

	    @Autowired
	    public TaskService(TaskRepository taskRepository) {
	        this.taskRepository = taskRepository;
	    }

		public List<Task> getTasksByUserId(long userId) {
		//	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		//	String task = authentication.getTasksByUserId();
			return taskRepository.findByUserId(userId);
		}
<<<<<<< HEAD:springapp/src/main/java/com/example/springapp/service/TaskService.java
}
=======

		
		
	    public List<Task> getAllTasks() {
	        return taskRepository.findAll();
	    }

	    public Task getTaskById(Long id) {
	        return taskRepository.findById(id).orElse(null);
	    }

	    public Task createTask(Task task) {
	        return taskRepository.save(task);
	    }

	    public Task updateTask(Task task) {
	        return taskRepository.save(task);
	    }

	    public void deleteTask(Long id) {
	        taskRepository.deleteById(id);
	    }

	
}

>>>>>>> c186abd56538dad7a548cb6ada3d309a5e42c70d:taskmanagement/src/main/java/com/project/taskmanagement/service/TaskService.java
