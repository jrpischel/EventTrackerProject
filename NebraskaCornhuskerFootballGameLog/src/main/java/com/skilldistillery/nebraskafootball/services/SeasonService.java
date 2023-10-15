package com.skilldistillery.nebraskafootball.services;

import java.util.List;

import com.skilldistillery.nebraskafootball.entities.Season;

public interface SeasonService {
	
	List<Season> getAllSeasons();
	Season getSeasonByYear(int seasonYear);
	Season createSeason(Season season);
	Season updateSeason(int seasonYear, Season season);
	boolean deleteSeason(int SeasonYear);

}
