package com.example.springapp.model;

import java.util.Date;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table
public class Todo {
	
	@Id
	@GeneratedValue
	private Long id;
	private String taskname;
	private String taskdescription;
	private Date targetdate;
	private String status;
	private String priority;
	
    public Todo() {
    	
    }
	

	@Override
	public String toString() {
		return "Todo [id=" + id + ", priority=" + priority + ", status=" + status + ", targetdate=" + targetdate
				+ ", taskdescription=" + taskdescription + ", taskname=" + taskname + "]";
	}


	public Todo(Long id, String taskname, String taskdescription, Date targetdate, String status,String priority) {
		this.id = id;
		this.taskname = taskname;
		this.taskdescription = taskdescription;
		this.targetdate = targetdate;
		this.status = status;
		this.priority=priority;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTaskname() {
		return taskname;
	}

	public void setTaskname(String taskname) {
		this.taskname = taskname;
	}

	public String getTaskdescription() {
		return taskdescription;
	}

	public void setTaskdescription(String taskdescription) {
		this.taskdescription = taskdescription;
	}

	public Date getTargetdate() {
		return targetdate;
	}

	public void setTargetdate(Date targetdate) {
		this.targetdate = targetdate;
	}


	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	
	public String getPriority() {
		return priority;
	}

	public void setPriority(String priority) {
		this.priority = priority;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
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
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
	
}
