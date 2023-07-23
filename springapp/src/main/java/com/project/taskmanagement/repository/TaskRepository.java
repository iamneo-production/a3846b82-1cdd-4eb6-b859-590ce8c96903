package com.project.taskmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.taskmanagement.model.Task;

public interface TaskRepository extends JpaRepository<Task,Long>{

}
