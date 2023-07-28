package com.project.taskmanagement.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.project.taskmanagement.model.Profile;
import com.project.taskmanagement.repository.ProfileRepository;
import com.project.taskmanagement.repository.UserRepository;


@Service
public class ProfileService {
		

	@Autowired
	private ProfileRepository profileRepository;

	public Iterable<Profile> listAll() {
		return profileRepository.findAll();
	}

	public Profile getUserById(long id) {
		return profileRepository.findById(id).orElse(null);
	}

	public Profile saveOrUpdate(Profile profile) {
		return profileRepository.save(profile);
	}
	
}
