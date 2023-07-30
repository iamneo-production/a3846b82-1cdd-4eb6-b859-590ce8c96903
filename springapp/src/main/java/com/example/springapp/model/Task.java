package com.example.springapp.model;
import java.util.Date;
import java.util.Objects;

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
	
	
}