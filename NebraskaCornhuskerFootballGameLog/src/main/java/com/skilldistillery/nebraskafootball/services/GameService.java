package com.skilldistillery.nebraskafootball.services;

import java.util.List;

import com.skilldistillery.nebraskafootball.entities.Game;

public interface GameService {
	
	List<Game> getAllGames(int seasonYear);
	Game getGame(int gameId);
	Game createGame(Game game);
	Game updateGame(int seasonYear, int gameId, Game game);
	boolean deleteGame(int gameId);

}
