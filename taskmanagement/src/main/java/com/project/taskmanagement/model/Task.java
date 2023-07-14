package com.project.taskmanagement.model;
import java.util.Date;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDate;

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
	private String taskdescription;
	private String taskname;
	private Date taskduedate;

    @Id
    @GeneratedValue
	private Long id;

    @Enumerated(EnumType.STRING)
	private TaskStatus status ;

    @Enumerated(EnumType.STRING)
	private Priority priority;

	private LocalDate createdDate;
	
    @ManyToOne
	@JoinColumn(name="user_id")
	private User user;
	
    @Override
	public int hashCode() {
		return Objects.hash(id);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Task other = (Task) obj;
		return id == other.id;
	}
}