package com.skilldistillery.nebraskafootball.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.nebraskafootball.entities.Season;
import com.skilldistillery.nebraskafootball.repositories.SeasonRepository;

@Service
public class SeasonServiceImpl implements SeasonService {
	
	@Autowired
	private SeasonRepository seasonRepo;

	@Override
	public List<Season> getAllSeasons() {
		return seasonRepo.findAll();
	}

	@Override
	public Season getSeasonByYear(int seasonYear) {
		return seasonRepo.searchByYear(seasonYear);
	}

	@Override
	public Season createSeason(Season season) {
		return seasonRepo.saveAndFlush(season);
	}

	@Override
	public Season updateSeason(int seasonYear, Season season) {
		Season dbSeason = seasonRepo.searchByYear(seasonYear);
		if(dbSeason != null) {
			dbSeason.setRecord(season.getRecord());
			dbSeason.setConfChamp(season.isConfChamp());
			dbSeason.setNatChampAp(season.isNatChampAp());
			dbSeason.setNatChampCoach(season.isNatChampCoach());
			seasonRepo.saveAndFlush(dbSeason);
		}
		return dbSeason;
	}

	@Override
	public boolean deleteSeason(int seasonYear) {
		boolean deleted = false;
		Season seasonToDelete = seasonRepo.searchByYear(seasonYear);
		if(seasonToDelete != null) {
			seasonRepo.deleteById(seasonToDelete.getYear());
			deleted = true;
		}
		return deleted;
	}

}
