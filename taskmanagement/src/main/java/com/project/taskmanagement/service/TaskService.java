package com.project.taskmanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.taskmanagement.model.Task;
import com.project.taskmanagement.repository.TaskRepository;


@Service
public class TaskService {

	 private TaskRepository taskRepository;

	    @Autowired
	    public TaskService(TaskRepository taskRepository) {
	        this.taskRepository = taskRepository;
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

