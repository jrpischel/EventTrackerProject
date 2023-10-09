package com.skilldistillery.nebraskafootball.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.nebraskafootball.entities.Game;
import com.skilldistillery.nebraskafootball.repositories.GameRepository;

@Service
public class GameServiceImpl implements GameService {
	
	@Autowired
	private GameRepository gameRepo;

	@Override
	public List<Game> getAllGames() {
		return gameRepo.findAll();
	}

	@Override
	public Game getGame(int gameId) {
		return gameRepo.searchById(gameId);
	}

	@Override
	public Game createGame(Game game) {
		return gameRepo.saveAndFlush(game);
	}

	@Override
	public Game updateGame(int gameId, Game game) {
		Game dbGame = gameRepo.searchById(gameId);
		if(dbGame != null) {
			dbGame.setDayOfWeek(game.getDayOfWeek());
			dbGame.setHomeGame(game.isHomeGame());
			dbGame.setOpponent(game.getOpponent());
			dbGame.setOppTeamName(game.getOppTeamName());
			dbGame.setOppLogoUrl(game.getOppLogoUrl());
			dbGame.setConference(game.getConference());
			dbGame.setWin(game.isWin());
			dbGame.setPoints(game.getPoints());
			dbGame.setOppPoints(game.getOppPoints());
			dbGame.setRecord(game.getRecord());
			dbGame.setTelevised(game.isTelevised());
			dbGame.setNetwork(game.getNetwork());
			dbGame.setBowlGame(game.isBowlGame());
			if(game.getLocation() != null) {
				dbGame.setLocation(game.getLocation());
			}
			gameRepo.saveAndFlush(dbGame);
		}
		return dbGame;
	}

	@Override
	public boolean deleteGame(int gameId) {
		boolean deleted = false;
		Game gameToDelete = gameRepo.searchById(gameId);
		if(gameToDelete != null) {
			gameRepo.deleteById(gameToDelete.getId());
			deleted = true;
		}
		return deleted;
	}

}
