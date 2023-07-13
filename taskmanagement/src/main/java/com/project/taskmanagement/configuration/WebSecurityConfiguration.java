package com.project.taskmanagement.configuration;

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

import static com.example.springboot.model.Role.ADMIN;
import static com.example.springboot.model.Role.USER;
import static com.example.springboot.model.Role.TEAM_LEADER;
import static org.springframework.http.HttpMethod.DELETE;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.http.HttpMethod.PUT;
import static com.example.springboot.model.Permission.ADMIN_CREATE;
import static com.example.springboot.model.Permission.ADMIN_UPDATE;
import static com.example.springboot.model.Permission.ADMIN_DELETE;
import static com.example.springboot.model.Permission.ADMIN_READ;
import static com.example.springboot.model.Permission.USER_CREATE;
import static com.example.springboot.model.Permission.USER_READ;
import static com.example.springboot.model.Permission.USER_UPDATE;
import static com.example.springboot.model.Permission.USER_DELETE;
import static com.example.springboot.model.Permission.TEAMLEADER_READ;


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
		.authorizeHttpRequests().requestMatchers("/auth/**").permitAll()
		.requestMatchers("/users/**").hasAnyAuthority(ADMIN.name(),TEAM_LEADER.name())
		.requestMatchers(GET,"/users/**").hasAnyAuthority(ADMIN_READ.name(),TEAMLEADER_READ.name())
		.requestMatchers(PUT,"/users/**").hasAuthority(ADMIN_UPDATE.name())
		.requestMatchers(POST,"/users/**").hasAuthority(ADMIN_CREATE.name())
		.requestMatchers(DELETE,"/users/**").hasAuthority(ADMIN_DELETE.name())
		
		.requestMatchers("/tasks/**").hasAnyAuthority(USER.name(),TEAM_LEADER.name())
		.requestMatchers(GET,"/tasks").hasAnyAuthority(USER_READ.name(),TEAMLEADER_READ.name())
		.requestMatchers(PUT,"/tasks").hasAnyAuthority(USER_UPDATE.name(),TEAMLEADER_READ.name())
		.requestMatchers(POST,"/tasks").hasAnyAuthority(USER_CREATE.name(),TEAMLEADER_READ.name())
		.requestMatchers(DELETE,"/tasks").hasAnyAuthority(USER_DELETE.name(),TEAMLEADER_READ.name())

		.anyRequest() 
		.authenticated()
		.and()
		.sessionManagement()
		.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		.and()
		.authenticationProvider(authenticationProvider)
		.addFilterBefore(jwtAuthFilter,UsernamePasswordAuthenticationFilter.class)
		.logout()
		.addLogoutHandler(logoutHandler)
		.logoutSuccessHandler(
				(request,response,authentication)->
		        SecurityContextHolder.clearContext()
		)
		;
		
		return http.build();
	}
}
