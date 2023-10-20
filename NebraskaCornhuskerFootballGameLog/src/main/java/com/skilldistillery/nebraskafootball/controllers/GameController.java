package com.skilldistillery.nebraskafootball.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.nebraskafootball.entities.Game;
import com.skilldistillery.nebraskafootball.services.GameService;

@CrossOrigin({"*", "http://localhost/"})
@RequestMapping("api")
@RestController
public class GameController {

	@Autowired
	private GameService gameService;

	@GetMapping("seasons/{seasonYear}/games")
	public List<Game> getGameList(@PathVariable int seasonYear) {
		return gameService.getAllGames(seasonYear);
	}

	@GetMapping("games/{gameId}")
	public Game getGameById(@PathVariable int gameId, HttpServletResponse res) {
		Game game = gameService.getGame(gameId);
		if (game == null) {
			res.setStatus(404);
		}
		return game;
	}

	@PostMapping("seasons/{seasonYear}/games")
	public Game createGame(@RequestBody Game game, @PathVariable int seasonYear, HttpServletResponse res, HttpServletRequest req) {
		Game newGame = null;
		try {
			if (newGame == null) {
				res.setStatus(404);
			}
			newGame = gameService.createGame(game);
			res.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(newGame.getId());
			res.setHeader("Location", url.toString());
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
		return newGame;
	}
	
	@PutMapping("seasons/{seasonYear}/games/{gameId}")
	public Game updateGame(@RequestBody Game game, @PathVariable int seasonYear, @PathVariable int gameId, HttpServletResponse res) {
		Game updatedGame = null;
		try {
			updatedGame = gameService.updateGame(seasonYear, gameId, game);
			if(updatedGame == null) {
				res.setStatus(404);
			}
		} catch (Exception e) {
			res.setStatus(400);
			e.printStackTrace();
		}
		return updatedGame;
	}
	
	@DeleteMapping("games/{gameId}")
	public void deleteGame(@PathVariable int gameId, HttpServletResponse res) {
		try {
			if(gameService.deleteGame(gameId)) {
				res.setStatus(204);
			} else {
				res.setStatus(404);
			}
		} catch (Exception e) {
			res.setStatus(400);
			e.printStackTrace();
		}
	}

}
