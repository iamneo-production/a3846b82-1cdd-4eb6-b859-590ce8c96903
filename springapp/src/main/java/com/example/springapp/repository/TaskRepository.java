package com.example.springapp.repository;

import com.example.springapp.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {
    List<Task> findByUser_Username(String username);
    Task findByUser_UsernameAndId(String username, int id);
}

