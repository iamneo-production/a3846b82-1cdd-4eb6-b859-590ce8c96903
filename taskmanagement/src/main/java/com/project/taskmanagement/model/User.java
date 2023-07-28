package com.project.taskmanagement.model;

import java.util.Collection;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import java.util.Date;
import java.util.Objects;

import javax.management.relation.RoleInfo;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="user")
public class User implements UserDetails{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(
			name="user_name",
			nullable=false,
			unique = true
		)
	private String name;
	
	@Column(
			name="email",
			nullable=false
		)
	private String email;
	
	@Column(
			name="password",
			nullable=false
		)
	private String password;

	@Column(name = "image_path") // New field for storing the image path
    private String imagePath;
	
	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	
	@Enumerated(EnumType.STRING)
	private Role role;
	
	@OneToMany
	private List<Token> token;
	
	@OneToMany(mappedBy="user")
	@JsonIgnore
	private List<Task> tasks;
	
	@ManyToMany(mappedBy = "teamMembers")
	@JsonIgnore
	private Set<Task> task;
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return role.getAuthorities();
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return password;
	}
	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return name;
	}
	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}
	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}
	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}
	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}
}
