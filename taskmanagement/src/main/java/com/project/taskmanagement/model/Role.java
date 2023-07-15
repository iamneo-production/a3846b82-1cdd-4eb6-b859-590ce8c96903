package com.project.taskmanagement.model;

import static com.project.taskmanagement.model.Permission.ADMIN_CREATE;
import static com.project.taskmanagement.model.Permission.ADMIN_DELETE;
import static com.project.taskmanagement.model.Permission.ADMIN_READ;
import static com.project.taskmanagement.model.Permission.ADMIN_UPDATE;
import static com.project.taskmanagement.model.Permission.TEAMLEADER_CREATE;
import static com.project.taskmanagement.model.Permission.TEAMLEADER_DELETE;
import static com.project.taskmanagement.model.Permission.TEAMLEADER_READ;
import static com.project.taskmanagement.model.Permission.TEAMLEADER_UPDATE;
import static com.project.taskmanagement.model.Permission.USER_CREATE;
import static com.project.taskmanagement.model.Permission.USER_DELETE;
import static com.project.taskmanagement.model.Permission.USER_READ;
import static com.project.taskmanagement.model.Permission.USER_UPDATE;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Role {
	
	ADMIN(
			Set.of(
					ADMIN_READ,
					ADMIN_UPDATE,
					ADMIN_CREATE,
					ADMIN_DELETE
			
			)
			),
	
	USER(
			Set.of(
					
					
					USER_READ,
					USER_UPDATE,
					USER_CREATE,
					USER_DELETE
					
					
					)
			),
	
	TEAM_LEADER(
			Set.of(
					TEAMLEADER_READ,
					TEAMLEADER_UPDATE,
					TEAMLEADER_CREATE,
					TEAMLEADER_DELETE
					)
			), 
	;

	@Getter
	private final Set<Permission> permission;
	
	public List<SimpleGrantedAuthority> getUserAuth(){
		var authoroties = getPermission()
		    .stream()
		    .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
		    .collect(Collectors.toList());
		authoroties.add(new SimpleGrantedAuthority("ROLE_"+this.name()));
		return authoroties;
	}
}

