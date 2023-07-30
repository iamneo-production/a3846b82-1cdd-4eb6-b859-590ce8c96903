package com.example.springapp.repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.springapp.model.Task;
import com.example.springapp.model.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUserId(long userId);
    long count();
    long countByStatus(TaskStatus status);

    // Count TODO tasks
    @Query("SELECT COUNT(t) FROM Task t WHERE t.status = 'TODO'")
    long countTodoTasks();

    // Count IN_PROGRESS tasks
    @Query("SELECT COUNT(t) FROM Task t WHERE t.status = 'IN_PROGRESS'")
    long countInProgressTasks();

    // Count DONE tasks
    @Query("SELECT COUNT(t) FROM Task t WHERE t.status = 'DONE'")
    long countDoneTasks();
}