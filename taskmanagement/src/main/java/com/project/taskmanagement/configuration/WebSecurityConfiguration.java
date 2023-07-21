package com.project.taskmanagement.configuration;

import static com.project.taskmanagement.model.Permission.ADMIN_CREATE;
import static com.project.taskmanagement.model.Permission.ADMIN_DELETE;
import static com.project.taskmanagement.model.Permission.ADMIN_READ;
import static com.project.taskmanagement.model.Permission.ADMIN_UPDATE;
import static com.project.taskmanagement.model.Permission.TEAMLEADER_READ;
import static com.project.taskmanagement.model.Permission.TEAMLEADER_CREATE;
import static com.project.taskmanagement.model.Permission.TEAMLEADER_DELETE;
import static com.project.taskmanagement.model.Permission.TEAMLEADER_UPDATE;
import static com.project.taskmanagement.model.Permission.USER_CREATE;
import static com.project.taskmanagement.model.Permission.USER_DELETE;
import static com.project.taskmanagement.model.Permission.USER_READ;
import static com.project.taskmanagement.model.Permission.USER_UPDATE;
import static com.project.taskmanagement.model.Role.ADMIN;
import static com.project.taskmanagement.model.Role.TEAMLEADER;
import static com.project.taskmanagement.model.Role.USER;
import static org.springframework.http.HttpMethod.DELETE;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.http.HttpMethod.PUT;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfiguration {

	private final JwtAuthFilter jwtAuthFilter;
	
	private final AuthenticationProvider authenticationProvider;
	
	private final LogoutHandler logoutHandler;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
		.csrf().disable()
		.cors()
		.and()
		.authorizeHttpRequests().antMatchers("/auth/**").permitAll()
		.antMatchers("/users/**").hasAnyRole(ADMIN.name(),TEAMLEADER.name())
		.antMatchers(GET,"/users/**").hasAnyAuthority(ADMIN_READ.name(),TEAMLEADER_READ.name())
		.antMatchers(PUT,"/users/**").hasAuthority(ADMIN_UPDATE.name())
		.antMatchers(POST,"/users/**").hasAuthority(ADMIN_CREATE.name())
		.antMatchers(DELETE,"/users/**").hasAuthority(ADMIN_DELETE.name())
		
		.antMatchers("/tasks/**").hasAnyRole(USER.name(),TEAMLEADER.name())
		.antMatchers(GET,"/tasks").hasAnyAuthority(USER_READ.name(),TEAMLEADER_READ.name())
		.antMatchers(PUT,"/tasks").hasAnyAuthority(USER_UPDATE.name(),TEAMLEADER_UPDATE.name())
		.antMatchers(POST,"/tasks").hasAnyAuthority(USER_CREATE.name(),TEAMLEADER_CREATE.name())
		.antMatchers(DELETE,"/tasks").hasAnyAuthority(USER_DELETE.name(),TEAMLEADER_DELETE.name())

		.anyRequest() 
		.authenticated()
		.and()
		.sessionManagement()
		.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		.and()
		.authenticationProvider(authenticationProvider)
		.addFilterBefore(jwtAuthFilter,UsernamePasswordAuthenticationFilter.class)
		.logout()
		.logoutUrl("/auth/logout")
		.addLogoutHandler(logoutHandler)
		.logoutSuccessHandler(
				(request,response,authentication)->
		        SecurityContextHolder.clearContext()
		)
		;
		
		return http.build();
	}
}

