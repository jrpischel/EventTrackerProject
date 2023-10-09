package com.skilldistillery.nebraskafootball.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.nebraskafootball.entities.Game;

public interface GameRepository extends JpaRepository<Game, Integer> {
	
	Game searchById(int gameId);

}
