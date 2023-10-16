-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema nebraskafootballgamedb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `nebraskafootballgamedb` ;

-- -----------------------------------------------------
-- Schema nebraskafootballgamedb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `nebraskafootballgamedb` DEFAULT CHARACTER SET utf8 ;
USE `nebraskafootballgamedb` ;

-- -----------------------------------------------------
-- Table `location`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `location` ;

CREATE TABLE IF NOT EXISTS `location` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `stadium` VARCHAR(45) NULL,
  `city` VARCHAR(45) NULL,
  `state` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `season`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `season` ;

CREATE TABLE IF NOT EXISTS `season` (
  `year` INT NOT NULL,
  `record` VARCHAR(45) NULL,
  `conference_champ` TINYINT NOT NULL DEFAULT 0,
  `national_champ_ap` TINYINT NOT NULL DEFAULT 0,
  `national_champ_coach` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`year`),
  UNIQUE INDEX `year_UNIQUE` (`year` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `game`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `game` ;

CREATE TABLE IF NOT EXISTS `game` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `game_date` DATE NULL,
  `day_of_week` VARCHAR(45) NULL DEFAULT 'Saturday',
  `home_game` TINYINT NULL,
  `opponent` VARCHAR(45) NULL,
  `opp_team_name` VARCHAR(45) NULL,
  `opp_logo_url` VARCHAR(2000) NULL,
  `conference` VARCHAR(45) NULL,
  `win` TINYINT NULL DEFAULT 1,
  `points` INT NULL,
  `opp_points` INT NULL,
  `televised` TINYINT NULL DEFAULT 0,
  `network` VARCHAR(45) NULL,
  `bowl_game` TINYINT NULL DEFAULT 0,
  `location_id` INT NOT NULL,
  `season_year` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_game_location_idx` (`location_id` ASC),
  INDEX `fk_game_season1_idx` (`season_year` ASC),
  CONSTRAINT `fk_game_location`
    FOREIGN KEY (`location_id`)
    REFERENCES `location` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_game_season1`
    FOREIGN KEY (`season_year`)
    REFERENCES `season` (`year`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS herbie@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'herbie'@'localhost' IDENTIFIED BY 'herbie';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'herbie'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `location`
-- -----------------------------------------------------
START TRANSACTION;
USE `nebraskafootballgamedb`;
INSERT INTO `location` (`id`, `stadium`, `city`, `state`) VALUES (1, 'Memorial Stadium', 'Lincoln', 'Nebraska');
INSERT INTO `location` (`id`, `stadium`, `city`, `state`) VALUES (2, 'Giants Stadium', 'East Rutherford', 'New Jersery');
INSERT INTO `location` (`id`, `stadium`, `city`, `state`) VALUES (3, 'Clifford B. and Audrey Jones Stadium', 'Lubbock', 'Texas');
INSERT INTO `location` (`id`, `stadium`, `city`, `state`) VALUES (4, 'KSU Stadium', 'Manhattan', 'Kansas');
INSERT INTO `location` (`id`, `stadium`, `city`, `state`) VALUES (5, 'Faurot Field', 'Columbia', 'Missouri');
INSERT INTO `location` (`id`, `stadium`, `city`, `state`) VALUES (6, 'Cyclone Stadium', 'Ames', 'Iowa');
INSERT INTO `location` (`id`, `stadium`, `city`, `state`) VALUES (7, 'Oklahoma Memorial Stadium', 'Norman', 'Oklahoma');
INSERT INTO `location` (`id`, `stadium`, `city`, `state`) VALUES (8, 'Miami Orange Bowl', 'Miami', 'Florida');

COMMIT;


-- -----------------------------------------------------
-- Data for table `season`
-- -----------------------------------------------------
START TRANSACTION;
USE `nebraskafootballgamedb`;
INSERT INTO `season` (`year`, `record`, `conference_champ`, `national_champ_ap`, `national_champ_coach`) VALUES (1994, '13-0', 1, 1, 1);
INSERT INTO `season` (`year`, `record`, `conference_champ`, `national_champ_ap`, `national_champ_coach`) VALUES (1995, '12-0', 1, 1, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `game`
-- -----------------------------------------------------
START TRANSACTION;
USE `nebraskafootballgamedb`;
INSERT INTO `game` (`id`, `game_date`, `day_of_week`, `home_game`, `opponent`, `opp_team_name`, `opp_logo_url`, `conference`, `win`, `points`, `opp_points`, `televised`, `network`, `bowl_game`, `location_id`, `season_year`) VALUES (1, '1994-8-28', 'Sunday', 0, '(24) West Virginia', 'Mountaineers', 'https://cdn.ssref.net/req/202310031/tlogo/ncaa/west-virginia.png', 'Big East', 1, 31, 0, 1, 'NBC', 0, 2, 1994);
INSERT INTO `game` (`id`, `game_date`, `day_of_week`, `home_game`, `opponent`, `opp_team_name`, `opp_logo_url`, `conference`, `win`, `points`, `opp_points`, `televised`, `network`, `bowl_game`, `location_id`, `season_year`) VALUES (2, '1994-9-8', 'Thursday', 0, 'Texas Tech', 'Red Raiders', 'https://cdn.ssref.net/req/202310031/tlogo/ncaa/texas-tech.png', 'Southwest ', 1, 42, 16, 1, 'ESPN', 0, 3, 1994);
INSERT INTO `game` (`id`, `game_date`, `day_of_week`, `home_game`, `opponent`, `opp_team_name`, `opp_logo_url`, `conference`, `win`, `points`, `opp_points`, `televised`, `network`, `bowl_game`, `location_id`, `season_year`) VALUES (3, '1994-9-17', 'Saturday', 1, '(13) UCLA', 'Bruins', 'https://cdn.ssref.net/req/202310031/tlogo/ncaa/ucla.png', 'Pac-10', 1, 49, 21, 1, 'ABC', 0, 1, 1994);
INSERT INTO `game` (`id`, `game_date`, `day_of_week`, `home_game`, `opponent`, `opp_team_name`, `opp_logo_url`, `conference`, `win`, `points`, `opp_points`, `televised`, `network`, `bowl_game`, `location_id`, `season_year`) VALUES (4, '1994-9-24', 'Saturday', 1, 'Pacific', 'Tigers', 'https://cdn.ssref.net/req/202310031/tlogo/ncaa/pacific.png', 'Big West', 1, 70, 21, 0, NULL, 0, 1, 1994);
INSERT INTO `game` (`id`, `game_date`, `day_of_week`, `home_game`, `opponent`, `opp_team_name`, `opp_logo_url`, `conference`, `win`, `points`, `opp_points`, `televised`, `network`, `bowl_game`, `location_id`, `season_year`) VALUES (5, '1994-10-1', 'Saturday', 1, 'Wyoming', 'Cowboys', 'https://cdn.ssref.net/req/202310031/tlogo/ncaa/wyoming.png', 'Western Athletic Conference', 1, 42, 32, 1, 'PPV', 0, 1, 1994);
INSERT INTO `game` (`id`, `game_date`, `day_of_week`, `home_game`, `opponent`, `opp_team_name`, `opp_logo_url`, `conference`, `win`, `points`, `opp_points`, `televised`, `network`, `bowl_game`, `location_id`, `season_year`) VALUES (6, '1994-10-8', 'Saturday', 1, 'Oklahoma State', 'Cowboys', 'https://cdn.ssref.net/req/202310031/tlogo/ncaa/oklahoma-state.png', 'Big 8', 1, 32, 3, 0, NULL, 0, 1, 1994);
INSERT INTO `game` (`id`, `game_date`, `day_of_week`, `home_game`, `opponent`, `opp_team_name`, `opp_logo_url`, `conference`, `win`, `points`, `opp_points`, `televised`, `network`, `bowl_game`, `location_id`, `season_year`) VALUES (7, '1994-10-15', 'Saturday', 0, '(16) Kansas State', 'Wildcats', 'https://cdn.ssref.net/req/202310031/tlogo/ncaa/kansas-state.png', 'Big 8', 1, 17, 6, 1, 'ABC', 0, 4, 1994);
INSERT INTO `game` (`id`, `game_date`, `day_of_week`, `home_game`, `opponent`, `opp_team_name`, `opp_logo_url`, `conference`, `win`, `points`, `opp_points`, `televised`, `network`, `bowl_game`, `location_id`, `season_year`) VALUES (8, '1994-10-22', 'Saturday', 0, 'Missouri', 'Tigers', 'https://cdn.ssref.net/req/202310031/tlogo/ncaa/missouri.png', 'Big 8', 1, 42, 7, 0, NULL, 0, 5, 1994);
INSERT INTO `game` (`id`, `game_date`, `day_of_week`, `home_game`, `opponent`, `opp_team_name`, `opp_logo_url`, `conference`, `win`, `points`, `opp_points`, `televised`, `network`, `bowl_game`, `location_id`, `season_year`) VALUES (9, '1994-10-29', 'Saturday', 1, '(2) Colorado', 'Buffaloes', 'https://cdn.ssref.net/req/202310031/tlogo/ncaa/colorado.png', 'Big 8', 1, 24, 7, 1, 'ABC', 0, 1, 1994);
INSERT INTO `game` (`id`, `game_date`, `day_of_week`, `home_game`, `opponent`, `opp_team_name`, `opp_logo_url`, `conference`, `win`, `points`, `opp_points`, `televised`, `network`, `bowl_game`, `location_id`, `season_year`) VALUES (10, '1994-11-5', 'Saturday', 1, 'Kansas', 'Jayhawks', 'https://cdn.ssref.net/req/202310031/tlogo/ncaa/kansas.png', 'Big 8', 1, 45, 17, 0, NULL, 0, 1, 1994);
INSERT INTO `game` (`id`, `game_date`, `day_of_week`, `home_game`, `opponent`, `opp_team_name`, `opp_logo_url`, `conference`, `win`, `points`, `opp_points`, `televised`, `network`, `bowl_game`, `location_id`, `season_year`) VALUES (11, '1994-11-12', 'Saturday', 0, 'Iowa State', 'Cyclones', 'https://cdn.ssref.net/req/202310031/tlogo/ncaa/iowa-state.png', 'Big 8', 1, 28, 12, 0, NULL, 0, 6, 1994);
INSERT INTO `game` (`id`, `game_date`, `day_of_week`, `home_game`, `opponent`, `opp_team_name`, `opp_logo_url`, `conference`, `win`, `points`, `opp_points`, `televised`, `network`, `bowl_game`, `location_id`, `season_year`) VALUES (12, '1994-11-25', 'Friday', 0, 'Oklahoma', 'Sooners', 'https://cdn.ssref.net/req/202310031/tlogo/ncaa/oklahoma.png', 'Big 8', 1, 13, 3, 1, 'ABC', 0, 7, 1994);
INSERT INTO `game` (`id`, `game_date`, `day_of_week`, `home_game`, `opponent`, `opp_team_name`, `opp_logo_url`, `conference`, `win`, `points`, `opp_points`, `televised`, `network`, `bowl_game`, `location_id`, `season_year`) VALUES (13, '1995-1-1', 'Sunday', 0, '(3) Miami (FL)', 'Hurricanes', 'https://cdn.ssref.net/req/202310031/tlogo/ncaa/miami-fl.png', 'Big East', 1, 24, 17, 1, 'NBC', 1, 8, 1994);

COMMIT;

