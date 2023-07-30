package com.example.springapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.example.springapp.model.Task;
import com.example.springapp.model.User;
import com.example.springapp.repository.TaskRepository;


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

