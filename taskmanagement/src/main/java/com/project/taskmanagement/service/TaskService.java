package com.project.taskmanagement.service;


import java.util.Date;
import java.util.List;
import java.util.ArrayList;
import com.project.taskmanagement.model.Task;
import org.springframework.stereotype.Service;
@Service
public class TaskService {
	private static List<Task> tasks=new ArrayList<>();
		private static long idCounter=0;
		
		static {
			tasks.add(new Task("My first Task","Task1",new Date(),++idCounter,"sandeep",true));
			tasks.add(new Task("My Second Task","Task2",new Date(),++idCounter,"chenna",false));
			tasks.add(new Task("My Third Task","Task3",new Date(),++idCounter,"sandeep",true));
		}
		public List<Task> findTasks(){
			return tasks;
		}
		public Task save(Task task) {
			if(task.getId()==-1 || task.getId()==0) {
				task.setId(++idCounter);
				tasks.add(task);
			}
			else {
				deleteById(task.getId());
				tasks.add(task);
			}
			return task;
		}
		public Task deleteById(Long id) {
			Task task=findById(id);
			
			if(task==null) return null;
			if (tasks.remove(task)) {  //if value of todo is present the show too else null
				return task;
			}
			return null;
		}
		public Task findById(Long id) {//creating method and checking todos by id through iterations
			for(Task task:tasks) {
				if(task.getId()==id) {
					return task;//if id is found return or give data
				}
			}
			// TODO Auto-generated method stub
			return null;
		}

		//create new task
		public Task createTask(Task task) {
	        return taskRepository.save(task);
	    }

		//update task
	    public Task updateTask(Task task) {
	        return taskRepository.save(task);
	    }
}
