package com.project.taskmanagement.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Permission {

	ADMIN_READ("admin:read"),
	ADMIN_UPDATE("admin:update"),
	ADMIN_CREATE("admin:create"),
	ADMIN_DELETE("admin:delete"),
	
	USER_READ("user:read"),
	USER_UPDATE("user:update"),
	USER_CREATE("user:create"),
	USER_DELETE("user:delete"),
	
	TEAMLEADER_READ("teamleader:read"),
	TEAMLEADER_UPDATE("teamleader:update"),
	TEAMLEADER_CREATE("teamleader:create"),
	TEAMLEADER_DELETE("teamleader:delete"),

	;
	
	
	@Getter
	private final String permission;
	
	
}
