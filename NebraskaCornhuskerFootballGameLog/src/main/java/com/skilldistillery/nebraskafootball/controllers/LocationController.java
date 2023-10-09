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

import com.skilldistillery.nebraskafootball.entities.Location;
import com.skilldistillery.nebraskafootball.services.LocationService;

@RequestMapping("api")
@RestController
public class LocationController {
	
	@Autowired
	private LocationService locationService;

	@GetMapping("games/locations")
	public List<Location> getLocationList() {
		return locationService.getAllLocations();
	}

	@GetMapping("games/locations/{locationId}")
	public Location getLocationById(@PathVariable int locationId, HttpServletResponse res) {
		Location location = locationService.getLocation(locationId);
		if (location == null) {
			res.setStatus(404);
		}
		return location;
	}

	@PostMapping("games/locations")
	public Location createLocation(@RequestBody Location location, HttpServletResponse res, HttpServletRequest req) {
		Location newLocation = null;
		try {
			if (newLocation == null) {
				res.setStatus(404);
			}
			newLocation = locationService.createLocation(location);
			res.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(newLocation.getId());
			res.setHeader("Location", url.toString());
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
		return newLocation;
	}
	
	@PutMapping("games/locations/{locationId}")
	public Location updateLocation(@RequestBody Location location, @PathVariable int locationId, HttpServletResponse res) {
		Location updatedLocation = null;
		try {
			updatedLocation = locationService.updateLocation(locationId, location);
			if(updatedLocation == null) {
				res.setStatus(404);
			}
		} catch (Exception e) {
			res.setStatus(400);
			e.printStackTrace();
		}
		return updatedLocation;
	}
	
	@DeleteMapping("games/locations/{locationId}")
	public void deleteLocation(@PathVariable int locationId, HttpServletResponse res) {
		try {
			if(locationService.deleteLocation(locationId)) {
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
