package com.project.taskmanagement.model;

import java.time.LocalDate;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity 
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name="tasks")
public class Task {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(
			name="task_name"
			)
	private String name;
	
	@Column(
			name="task_description"
			)
	private String description; 
	
	@Column(
			name="task_status"
			)
	@Enumerated(EnumType.STRING)
	private TaskStatus status ;
	
	@Column(
			name="due_date"
			)
	private LocalDate dueDate;
	
	@Column(
			name="created_date"
			)
	private LocalDate createdDate;
	
	@Enumerated(EnumType.STRING)
	private Priority priority;
	
	
	@ManyToOne
	@JoinColumn(name="user_id")
	@JsonIgnore
	private User user;
	
	
	@ManyToMany
    @JoinTable(
        name = "team_member",
        joinColumns = @JoinColumn(name = "task_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
	@JsonIgnore
    private Set<User> teamMembers;

}

