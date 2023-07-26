package com.example.springapp.service;

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