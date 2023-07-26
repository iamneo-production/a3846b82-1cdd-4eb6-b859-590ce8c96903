package com.example.springapp.model;
import java.util.List;
import com.example.springapp.model.Task;
public class User {
    private int id;
    private String name;
    private String email;
    private List<Task> tasks;

    
    public User(int id, String name, String email, List<Task> tasks) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.tasks = tasks;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public List<Task> getTasks() {
        return tasks;
    }
    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }
    @Override
    public String toString() {
        return "User [email=" + email + ", id=" + id + ", name=" + name + ", tasks=" + tasks + "]";
    }

    
}