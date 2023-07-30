<<<<<<< HEAD:springapp/src/main/java/com/example/springapp/model/Task.java
<<<<<<< HEAD:springapp/src/main/java/com/example/springapp/model/Task.java
package com.example.springapp.model;
import java.util.Date;
import java.util.Objects;
=======
package com.project.taskmanagement.model;
>>>>>>> 684de78033cc6c0e754351d60f9fbbb413ba9c05:taskmanagement/src/main/java/com/project/taskmanagement/model/Task.java
=======
package com.example.springapp.model;
>>>>>>> main:taskmanagement/src/main/java/com/project/taskmanagement/model/Task.java

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
import javax.persistence.CascadeType;

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
	
	@ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(
        name = "team_member",
        joinColumns = @JoinColumn(name = "task_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
	@JsonIgnore
    private Set<User> teamMembers;
}

