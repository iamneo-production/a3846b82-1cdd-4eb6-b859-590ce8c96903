
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
		
		todos.add(new Todo(++idCounter,"ui/ux","learn to design",new Date(),false, true));
		todos.add(new Todo(++idCounter,"html","learn to create web",new Date(),true, true));
		todos.add(new Todo(++idCounter,"css","learn to style web",new Date(),false, false));
		todos.add(new Todo(++idCounter,"sql/db","learn to create db",new Date(),true, false));
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
    
    //created delete method will return the deleted todo back
	public Todo deleteById(long id) {  //long id -- the id which we want to pass in 'can delete using this specific id'
		Todo todo =findById(id);
		if(todo==null) return null;  //checking at this point 
		if(todos.remove(todo)) {     //able to delete the todo using remove method it returns true or false
		return todo;                 //if the todo removed successfully it will return the todo back
	} 
	return null;	                 //or it will return null
	}
	
//created a method for findById will return the todo back
	
	Todo findById(long id) {
		for(Todo todo:todos) {        //iterated to all the todo's
			if(todo.getId()==id) {
				return todo;
			}
		}
		return null;
	}
}
