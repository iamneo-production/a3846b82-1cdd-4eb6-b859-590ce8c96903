package com.example.springapp.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


import com.example.springapp.model.Profile;

@Repository
public interface ProfileRepository extends CrudRepository <Profile,Long>{

}
