package com.skilldistillery.nebraskafootball.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.nebraskafootball.entities.Game;
import com.skilldistillery.nebraskafootball.entities.Location;
import com.skilldistillery.nebraskafootball.repositories.GameRepository;
import com.skilldistillery.nebraskafootball.repositories.LocationRepository;
import com.skilldistillery.nebraskafootball.repositories.SeasonRepository;

@Service
public class GameServiceImpl implements GameService {
	
	@Autowired
	private GameRepository gameRepo;
	
	@Autowired
	private SeasonRepository seasonRepo;
	
	@Autowired
	private LocationRepository locationRepo;

	@Override
	public List<Game> getAllGames(int seasonYear) {
		List<Game> games = gameRepo.findAll();
		List<Game>	season = new ArrayList<>();
		for (Game game : games) {
			if (game.getSeason().getYear() == seasonYear) {
				season.add(game);
			}
		}	
		return season;
	}

	@Override
	public Game getGame(int gameId) {
		return gameRepo.searchById(gameId);
	}

	@Override
	public Game createGame(Game game) {
		locationRepo.saveAndFlush(game.getLocation());
		return gameRepo.saveAndFlush(game);
	}

	@Override
	public Game updateGame(int seasonYear, int gameId, Game game) {
		Game dbGame = gameRepo.searchById(gameId);
		System.out.println("***************" + dbGame);
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
			dbGame.setTelevised(game.isTelevised());
			dbGame.setNetwork(game.getNetwork());
			dbGame.setBowlGame(game.isBowlGame());
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
