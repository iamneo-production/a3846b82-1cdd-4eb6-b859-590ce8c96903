
package com.project.taskmanagement.service;

import java.util.Date;
import java.util.ArrayList;
import java.util.List;
import com.project.taskmanagement.model.Todo;
import org.springframework.stereotype.Service;

@Service
public class TodoService {
	
	private static List<Todo> todos = new ArrayList<Todo>();
	
    private static long idCounter=0;
	
	static {
		
		todos.add(new Todo(++idCounter,"ui/ux","learn to design",new Date(), true));
		todos.add(new Todo(++idCounter,"html","learn to create web",new Date(),true));
		todos.add(new Todo(++idCounter,"css","learn to style web",new Date(), false));
		todos.add(new Todo(++idCounter,"sql/db","learn to create db",new Date(),false));
	}
	
	public List<Todo> findAll(){
		return todos;
	}
	
    public Todo save(Todo todo) {
    	if(todo.getId()==-1 || todo.getId()==0)  
    	{   
    		todo.setId(++idCounter);    
    		todos.add(todo);         
    		 
    		
    		
    	}else {
    		deleteById(todo.getId());  
    		todos.add(todo);           
    		
    	}
		return todo;
    	
    }
    
   
	public Todo deleteById(long id) { 
		Todo todo =findById(id);
		if(todo==null) return null;  
		if(todos.remove(todo)) {     
		return todo;  
		}               
	return null;	                 
	}
	

	
	Todo findById(long id) {
		for(Todo todo:todos) {       
			if(todo.getId()==id) {
				return todo;
			}
		}
		return null;
	}
}
