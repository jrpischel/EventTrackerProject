package com.skilldistillery.nebraskafootball.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.nebraskafootball.entities.Game;
import com.skilldistillery.nebraskafootball.entities.Season;
import com.skilldistillery.nebraskafootball.services.GameService;
import com.skilldistillery.nebraskafootball.services.SeasonService;

@RequestMapping("api")
@RestController
public class SeasonController {
	
	@Autowired
	private SeasonService seasonService;
	@Autowired
	private GameService gameService;
	
	@GetMapping("seasons")
	public List<Season> getSeasonList() {
		return seasonService.getAllSeasons();
	}
	
	@GetMapping("seasons/{seasonYear}")
	public Season getSeasonByYear(@PathVariable int seasonYear, HttpServletResponse res) {
		Season season = seasonService.getSeasonByYear(seasonYear);
		if (season == null) {
			res.setStatus(404);
		}
		return season;
	}

	@PostMapping("seasons")
	public Season createSeason(@RequestBody Season season, HttpServletResponse res, HttpServletRequest req) {
		Season newSeason = null;
		try {
			if (newSeason == null) {
				res.setStatus(404);
			}
			newSeason = seasonService.createSeason(season);
			res.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(newSeason.getYear());
			res.setHeader("Location", url.toString());
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
		return newSeason;
	}
	
	@PutMapping("seasons/{seasonYear}")
	public Season updateSeason(@RequestBody Season season, @PathVariable int seasonYear, HttpServletResponse res) {
		Season updatedSeason = null;
		try {
			updatedSeason = seasonService.updateSeason(seasonYear, season);
			if(updatedSeason == null) {
				res.setStatus(404);
			}
		} catch (Exception e) {
			res.setStatus(400);
			e.printStackTrace();
		}
		return updatedSeason;
	}
	
	@DeleteMapping("seasons/{seasonYear}")
	public void deleteSeason(@PathVariable int seasonYear, HttpServletResponse res) {
		try {
			if(seasonService.deleteSeason(seasonYear)) {
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



