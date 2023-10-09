package com.skilldistillery.nebraskafootball.entities;

import java.util.Date;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity
public class Game {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "game_date")
	private Date gameDate;
	
	@Column(name = "day_of_week")
	private String dayOfWeek;
	
	@Column(name = "home_game")
	private boolean homeGame;
	
	private String opponent;
	
	@Column(name = "opp_team_name")
	private String oppTeamName;
	
	@Column(name = "opp_logo_url")
	private String oppLogoUrl;
	
	private String conference;
	
	private boolean win;
	
	private int points;
	
	@Column(name = "opp_points")
	private int oppPoints;
	
	private String record;
	
	private boolean televised;
	
	private String network;
	
	@Column(name = "bowl_game")
	private boolean bowlGame;
	
	@OneToOne
	@JoinColumn(name = "location_id")
	private Location location;
	
	

	public Game() {
		super();
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public Date getGameDate() {
		return gameDate;
	}


	public void setGameDate(Date gameDate) {
		this.gameDate = gameDate;
	}


	public String getDayOfWeek() {
		return dayOfWeek;
	}


	public void setDayOfWeek(String dayOfWeek) {
		this.dayOfWeek = dayOfWeek;
	}


	public boolean isHomeGame() {
		return homeGame;
	}


	public void setHomeGame(boolean homeGame) {
		this.homeGame = homeGame;
	}


	public String getOpponent() {
		return opponent;
	}


	public void setOpponent(String opponent) {
		this.opponent = opponent;
	}


	public String getOppTeamName() {
		return oppTeamName;
	}


	public void setOppTeamName(String oppTeamName) {
		this.oppTeamName = oppTeamName;
	}


	public String getOppLogoUrl() {
		return oppLogoUrl;
	}


	public void setOppLogoUrl(String oppLogoUrl) {
		this.oppLogoUrl = oppLogoUrl;
	}


	public String getConference() {
		return conference;
	}


	public void setConference(String conference) {
		this.conference = conference;
	}


	public boolean isWin() {
		return win;
	}


	public void setWin(boolean win) {
		this.win = win;
	}


	public int getPoints() {
		return points;
	}


	public void setPoints(int points) {
		this.points = points;
	}


	public int getOppPoints() {
		return oppPoints;
	}


	public void setOppPoints(int oppPoints) {
		this.oppPoints = oppPoints;
	}


	public String getRecord() {
		return record;
	}


	public void setRecord(String record) {
		this.record = record;
	}


	public boolean isTelevised() {
		return televised;
	}


	public void setTelevised(boolean televised) {
		this.televised = televised;
	}


	public String getNetwork() {
		return network;
	}


	public void setNetwork(String network) {
		this.network = network;
	}


	public boolean isBowlGame() {
		return bowlGame;
	}


	public void setBowlGame(boolean bowlGame) {
		this.bowlGame = bowlGame;
	}


	public Location getLocation() {
		return location;
	}


	public void setLocation(Location location) {
		this.location = location;
	}


	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Game other = (Game) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "Game [id=" + id + ", gameDate=" + gameDate + ", dayOfWeek=" + dayOfWeek + ", homeGame=" + homeGame
				+ ", opponent=" + opponent + ", oppTeamName=" + oppTeamName + ", oppLogoUrl=" + oppLogoUrl
				+ ", conference=" + conference + ", win=" + win + ", points=" + points + ", oppPoints=" + oppPoints
				+ ", record=" + record + ", televised=" + televised + ", network=" + network + ", bowlGame=" + bowlGame
				+ ", location=" + location + "]";
	}

	
}
