package com.skilldistillery.nebraskafootball.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.nebraskafootball.entities.Season;

public interface SeasonRepository extends JpaRepository<Season, Integer>{
	
	Season searchByYear(int seasonYear);

}
