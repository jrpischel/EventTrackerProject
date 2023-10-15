package com.skilldistillery.nebraskafootball.entities;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Season {

	@Id
	private int year;
	
	private String record;
	
	@Column(name = "conference_champ")
	private boolean confChamp;
	
	@Column(name = "national_champ_ap")
	private boolean natChampAp;
	
	@Column(name = "national_champ_coach")
	private boolean natChampCoach;

	public Season() {
		
	}

	public int getYear() {
		return year;
	}

	public void setYear(int season) {
		this.year = season;
	}

	public String getRecord() {
		return record;
	}

	public void setRecord(String record) {
		this.record = record;
	}

	public boolean isConfChamp() {
		return confChamp;
	}

	public void setConfChamp(boolean confChamp) {
		this.confChamp = confChamp;
	}

	public boolean isNatChampAp() {
		return natChampAp;
	}

	public void setNatChampAp(boolean natChampAp) {
		this.natChampAp = natChampAp;
	}

	public boolean isNatChampCoach() {
		return natChampCoach;
	}

	public void setNatChampCoach(boolean natChampCoach) {
		this.natChampCoach = natChampCoach;
	}

	@Override
	public int hashCode() {
		return Objects.hash(year);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Season other = (Season) obj;
		return year == other.year;
	}

	@Override
	public String toString() {
		return "Season [year=" + year + ", record=" + record + ", confChamp=" + confChamp + ", natChampAp=" + natChampAp
				+ ", natChampCoach=" + natChampCoach + "]";
	}

	
	
	
	
}
