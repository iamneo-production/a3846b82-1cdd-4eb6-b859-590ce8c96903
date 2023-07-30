package com.example.springapp.service;

import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import com.example.springapp.model.Task;
<<<<<<< HEAD
import com.project.taskmanagement.model.Task;
import com.project.taskmanagement.model.User;
import com.project.taskmanagement.repository.TaskRepository;
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


=======

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
			// TODO Auto-generated method stub
			return null;
		}
}
>>>>>>> parent of c83de8e (changed)
