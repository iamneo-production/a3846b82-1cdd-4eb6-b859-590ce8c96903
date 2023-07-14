package com.project.taskmanagement.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.project.taskmanagement.model.Task;
@Repository
public interface TaskRepository extends JpaRepository<Task,Long> {
    List<Task> findByUsername(String username);
}
