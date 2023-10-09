package com.skilldistillery.nebraskafootball.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.nebraskafootball.entities.Location;
import com.skilldistillery.nebraskafootball.repositories.LocationRepository;

@Service
public class LocationServiceImpl implements LocationService {

	@Autowired
	private LocationRepository locationRepo;

	@Override
	public List<Location> getAllLocations() {
		return locationRepo.findAll();
	}

	@Override
	public Location getLocation(int locationId) {
		return locationRepo.searchById(locationId);
	}

	@Override
	public Location createLocation(Location location) {
		return locationRepo.saveAndFlush(location);
	}

	@Override
	public Location updateLocation(int locationId, Location location) {
		Location dbLocation = locationRepo.searchById(locationId);
		if(dbLocation != null) {
			dbLocation.setStadium(location.getStadium());
			dbLocation.setCity(location.getCity());
			dbLocation.setState(location.getState());
			locationRepo.saveAndFlush(dbLocation);
		}
		return dbLocation;
	}

	@Override
	public boolean deleteLocation(int locationId) {
		boolean deleted = false;
		Location locationToDelete = locationRepo.searchById(locationId);
		if(locationToDelete != null) {
			locationRepo.deleteById(locationToDelete.getId());
			deleted = true;
		}
		return deleted;
	}

}

