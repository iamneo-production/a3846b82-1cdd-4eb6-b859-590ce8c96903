package com.project.taskmanagement.model;

import java.util.Date;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;


@Entity
public class Todo {
	
	@Id
	@GeneratedValue
	
	private Long id;
	private String taskName;
	private String taskDescription;
	private Date targetDate;
	private Boolean priority;
	private Boolean status;
	
    public Todo() {
    	
    }
	
    public Todo(Long id, String taskName, String taskDescription, Date targetDate, Boolean priority, Boolean status) {
		super();
		this.id = id;
		this.taskName = taskName;
		this.taskDescription = taskDescription;
		this.targetDate = targetDate;
		this.priority = priority;
		this.status = status;
	} 

	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}

	public String getTaskName() {
		return taskName;
	}

	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}

	public String getTaskDescription() {
		return taskDescription;
	}

	public void setTaskDescription(String taskDescription) {
		this.taskDescription = taskDescription;
	}

	public Date getTargetDate() {
		return targetDate;
	}

	public void setTargetDate(Date targetDate) {
		this.targetDate = targetDate;
	}

	public Boolean getPriority() {
		return priority;
	}

	public void setPriority(Boolean priority) {
		this.priority = priority;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

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
		Todo other = (Todo) obj;
		return id == other.id;
	}
	
	 
    
}
