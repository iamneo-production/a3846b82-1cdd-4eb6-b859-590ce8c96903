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
			tasks.add(new Task("My first Task","Task1",new Date(),++idCounter,"sandeep",true));
			tasks.add(new Task("My Second Task","Task2",new Date(),++idCounter,"chenna",false));
			tasks.add(new Task("My Third Task","Task3",new Date(),++idCounter,"sandeep",true));
		}
		public List<Task> findTasks(){
			return tasks;
		}
		public Task deleteById(long id) {
			Task task=findById(id);
			
			if(task==null) return null;
			if (tasks.remove(task)) {  //if value of todo is present the show too else null
				return task;
			}
			return null;
		}
		public Task findById(long id) {//creating method and checking todos by id through iterations
			for(Task task:tasks) {
				if(task.getId()==id) {
					return task;//if id is found return or give data
				}
			}
			return null;
		}
}