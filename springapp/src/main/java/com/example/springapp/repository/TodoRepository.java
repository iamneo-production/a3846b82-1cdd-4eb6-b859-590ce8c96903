package com.example.springapp.repository;
import com.example.springapp.model.Todo;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TodoRepository extends JpaRepository<Todo,Long> {
			List<Todo>findByTaskname(String taskname);

}