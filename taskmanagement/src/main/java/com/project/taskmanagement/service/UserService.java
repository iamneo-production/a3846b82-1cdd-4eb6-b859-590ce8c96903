package com.project.taskmanagement.service;
import java.util.Date;
import java.util.List;
import java.util.ArrayList;
import com.project.taskmanagement.model.User;

import org.springframework.stereotype.Service;
@Service
public class UserService {
	private static List<User> users=new ArrayList<>();
		private static long idCounter=0;
		
	/*	static {
            users.add(new User(++idCounter,"sandeep",false,"sandeep@gmail.com","dev"));
            users.add(new User(++idCounter,"chenna",false,"chenna@gmail.com","testing"));
            users.add(new User(++idCounter,"kaaki",false,"rev@gmail.com","fullstack"));
        }*/
		public List<User> findAll(){
            return users;
        }
        public User save(User user) {
            if(user.getId()==-1 || user.getId()==0) {
                user.setId(++idCounter);
                users.add(user);
            }
            else {
                deleteById(user.getId());
                users.add(user);
            }
            return user;
        }
        public User deleteById(long id) {
            User user=findById(id);
            
            if(user==null) return null;
            if (users.remove(user)) {  //if value of todo is present the show too else null
                return user;
            }
            return null;
        }
        public User findById(long id) {//creating method and checking todos by id through iterations
            for(User user:users) {
                if(user.getId()==id) {
                    return user;//if id is found return or give data
                }
            }
            // TODO Auto-generated method stub
            return null;
        }
    }