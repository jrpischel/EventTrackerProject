package com.skilldistillery.nebraskafootball.services;

import java.util.List;

import com.skilldistillery.nebraskafootball.entities.Location;

public interface LocationService {
	
	List<Location> getAllLocations();
	Location getLocation(int locationId);
	Location createLocation(Location location);
	Location updateLocation(int locationId, Location location);
	boolean deleteLocation(int locationId);

}
