package com.skilldistillery.nebraskafootball.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.nebraskafootball.entities.Location;

public interface LocationRepository extends JpaRepository<Location, Integer>{

	Location searchById(int locationId);
	
}
