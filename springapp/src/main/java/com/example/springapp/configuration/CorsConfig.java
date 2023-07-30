package com.example.springapp.configuration;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class CorsConfig implements WebMvcConfigurer {

	private static final String GET = "GET";
	private static final String PUT = "PUT";
	private static final String POST = "POST";
	private static final String DELETE = "DELETE";


	@Override
	public void addCorsMappings(CorsRegistry registry) {
<<<<<<< HEAD:taskmanagement/src/main/java/com/project/taskmanagement/configuration/CorsConfig.java
		registry.addMapping("/**").allowedOrigins("https://8081-daacccaccfeeefcfdedeaeaadbdbabf.project.examly.io")
=======
		registry.addMapping("/**").allowedOrigins("https://8080-ebfbfabcfcfdedefaedfbdbebed.project.examly.io")
>>>>>>> 29511dcd9eda291c9fb2860a00bdb7631e6cd841:springapp/src/main/java/com/example/springapp/configuration/CorsConfig.java
				.allowedMethods(GET, POST, PUT, DELETE).allowedHeaders("*");
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
<<<<<<< HEAD:taskmanagement/src/main/java/com/project/taskmanagement/configuration/CorsConfig.java
		configuration.setAllowedOrigins(Arrays.asList("https://8081-daacccaccfeeefcfdedeaeaadbdbabf.project.examly.io"));
=======
		configuration.setAllowedOrigins(Arrays.asList("https://8080-ebfbfabcfcfdedefaedfbdbebed.project.examly.io"));
>>>>>>> 29511dcd9eda291c9fb2860a00bdb7631e6cd841:springapp/src/main/java/com/example/springapp/configuration/CorsConfig.java
		configuration.setAllowedMethods(Arrays.asList(GET, POST, PUT, DELETE, "OPTIONS"));
		configuration.setAllowedHeaders(Arrays.asList("*"));
		configuration.setAllowCredentials(true);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}
}










