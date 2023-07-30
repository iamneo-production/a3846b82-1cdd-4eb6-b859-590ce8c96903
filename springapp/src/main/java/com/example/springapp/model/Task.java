package com.example.springapp.model;
import java.util.Date;
import java.util.Objects;
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
	private String taskdescription;
	private String taskname;
	private Date taskduedate;
	private long id;
	private String username;
	private boolean taskstatus;
	
	
    public Task(String taskdescription, String taskname, Date taskduedate, long id, String username,
            boolean taskstatus) {
        this.taskdescription = taskdescription;
        this.taskname = taskname;
        this.taskduedate = taskduedate;
        this.id = id;
        this.username = username;
        this.taskstatus = taskstatus;
    }
    public String getTaskdescription() {
        return taskdescription;
    }
    public void setTaskdescription(String taskdescription) {
        this.taskdescription = taskdescription;
    }
    public String getTaskname() {
        return taskname;
    }
    public void setTaskname(String taskname) {
        this.taskname = taskname;
    }
    public Date getTaskduedate() {
        return taskduedate;
    }
    public void setTaskduedate(Date taskduedate) {
        this.taskduedate = taskduedate;
    }
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public boolean isTaskstatus() {
        return taskstatus;
    }
    public void setTaskstatus(boolean taskstatus) {
        this.taskstatus = taskstatus;
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
		Task other = (Task) obj;
		return id == other.id;
	}
	
	
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