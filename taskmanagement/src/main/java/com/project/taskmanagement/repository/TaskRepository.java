package com.project.taskmanagement.repository;

import com.project.taskmanagement.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUserId(long userId);
}
