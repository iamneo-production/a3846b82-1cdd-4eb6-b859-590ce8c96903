package com.project.taskmanagement.model;
import java.util.Date;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table
public class User {

    @Id
    @GeneratedValue
	private Long id;
	private String username;
	private boolean isdone;
	private String email;
	private String role;
	
	
	public User(Long id, String username, boolean isdone, String email, String role) {
        this.id = id;
        this.username = username;
        this.isdone = isdone;
        this.email = email;
        this.role = role;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public boolean isIsdone() {
        return isdone;
    }
    public void setIsdone(boolean isdone) {
        this.isdone = isdone;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
    }
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		return id == other.id;
	}
	
	
}
