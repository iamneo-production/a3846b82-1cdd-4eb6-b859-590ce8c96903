package com.example.springapp.service;

<<<<<<< HEAD
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import com.example.springapp.model.Task;

@Service
public class TaskService {
	private static List<Task> tasks=new ArrayList<>();
		private static int idCounter=0;
		
		static {
			tasks.add(new Task("UI/UX","design webpage",new Date(),++idCounter,"Pavi",true));
			tasks.add(new Task("SQL","create database",new Date(),++idCounter,"Pavithra",false));
			tasks.add(new Task("Springboot","learn backend",new Date(),++idCounter,"PavithraSundaram",true));
		}
		public List<Task> findTasks(){
			return tasks;
		}
		public Task deleteById(long id) {
			Task task=findById(id);
			
			if(task==null) return null;
			if (tasks.remove(task)) {  
				return task;
			}
			return null;
		}
		public Task findById(long id) {
			for(Task task:tasks) {
				if(task.getId()==id) {
					return task;
				}
			}
			
			return null;
		}
}
=======
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

>>>>>>> main
