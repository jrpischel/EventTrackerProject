package com.skilldistillery.nebraskafootball.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.nebraskafootball.entities.Game;

public interface GameRepository extends JpaRepository<Game, Integer> {
	
	Game searchById(int gameId);
	List<Game> findAllBySeason(int seasonYear);

}
