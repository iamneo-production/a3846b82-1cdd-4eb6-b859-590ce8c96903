package com.project.taskmanagement.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


import com.project.taskmanagement.model.Profile;

@Repository
public interface ProfileRepository extends CrudRepository <Profile,Long>{

}
