console.log('script.js loaded');

window.addEventListener('load', function(e) {
	console.log('Page loaded');
	init();
})

function init() {
	//Add event listeners for existing buttons
	document.getElementById('season-toggle').addEventListener('click', function(e) {

	
		displaySeasonTable();

		document.getElementById('addSeasonBtn').addEventListener('click', function(e) {

			let seasonTable = document.getElementById('seasonTableDiv');
			let seasonBtn = document.getElementById('season-toggle');
			seasonTable.style.display = 'none';
			seasonBtn.style.display = 'inline-block';
			createAddSeasonForm();

			document.getElementById('createSeason').addEventListener('click', function(e) {

				e.preventDefault();
				postSeason();

			})
		})
		
	})
	
	


}

function loadAllSeasons() {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/seasons');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let seasons = JSON.parse(xhr.responseText);
				displayAllSeasons(seasons);
			}
			else {
				//TODO
			}
		}
	};
	xhr.send();
}

function displayAllSeasons(seasonTable) {


	let table = document.createElement('table');
	let tableHead = document.createElement('thead');
	let tableBody = document.createElement('tbody');
	let tr = document.createElement('tr');
	let thseason = document.createElement('th');
	thseason.textContent = "Season";
	let threcord = document.createElement('th');
	threcord.textContent = "Record";
	let thconfchamp = document.createElement('th');
	thconfchamp.textContent = "Conference Champion";
	let thapchamp = document.createElement('th');
	thapchamp.textContent = "National Champion - AP Poll";
	let thcoachchamp = document.createElement('th');
	thcoachchamp.textContent = "National Champion - Coach's Poll";

	let div = document.getElementById('seasonTableDiv');

	div.append(table);
	table.appendChild(tableHead);
	table.appendChild(tableBody);
	tableHead.appendChild(tr);
	tr.appendChild(thseason);
	tr.appendChild(threcord);
	tr.appendChild(thconfchamp);
	tr.appendChild(thapchamp);
	tr.appendChild(thcoachchamp);

	for (var season of seasonTable) {
		tr = document.createElement('tr');
		tableBody.appendChild(tr);

		let td = document.createElement('td');
		let year = document.createElement('td')
		year.textContent = season.year;
		tr.appendChild(year);
		td = document.createElement('td');
		td.textContent = season.record;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = season.confChamp ? "X" : "";
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = season.natChampAp ? "X" : "";
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = season.natChampCoach ? "X" : "";
		tr.appendChild(td);
		td = document.createElement('td');
		let seeSeasonBtn = document.createElement('input');
		seeSeasonBtn.type = "button";
		seeSeasonBtn.className = "btn";
		seeSeasonBtn.value = "See Season";
		td.appendChild(seeSeasonBtn);
		tr.appendChild(td);
		let updateSeasonBtn = document.createElement('input');
		updateSeasonBtn.type = "button";
		updateSeasonBtn.className = "btn";
		updateSeasonBtn.value = "Update Season";
		td.appendChild(updateSeasonBtn);
		tr.appendChild(td);
		
		updateSeasonBtn.addEventListener('click', function(e) {
			let season = year.textContent;
			let updateSeasonDiv = document.getElementById('updateSeasonDiv');
			updateSeasonDiv.style.display = 'block';
			 let seasonUpdateSubmit = document.getElementById('seasonUpdateSubmit');
			 seasonUpdateSubmit.addEventListener('click', function(e) {
				 e.preventDefault();
				 let seasonUpdateObject = {
					 year: document.updateSeasonForm.year.value,
					 record: document.updateSeasonForm.record.value,
					 confChamp: document.updateSeasonForm.confChamp.value,
					 natChampAp: document.updateSeasonForm.natChampAp.value,
					 natChampCoach: document.updateSeasonForm.natChampCoach.value,
				 }
				 updateSeason(seasonUpdateObject);
			 })
		})

		seeSeasonBtn.addEventListener('click', function(e) {
			let season = year.textContent;
			console.log(season);
			displayGameTable(season);

			document.getElementById('addGameBtn').addEventListener('click', function(e) {

				e.preventDefault();
				createGameForm();
				document.getElementById('createGame').addEventListener('click', function(e) {
					
					e.preventDefault();
					let dataDiv = document.getElementById('dataDiv');
					dataDiv.style.display = 'none';
					
					let gameObject = {
						gameDate: document.addGameForm.gameDate.value,
						dayOfWeek: document.addGameForm.dayOfWeek.value,
						homeGame: document.addGameForm.homeGame.value,
						opponent: document.addGameForm.opponent.value,
						oppTeamName: document.addGameForm.oppTeamName.value,
						oppLogoUrl: document.addGameForm.oppLogoUrl.value,
						conference: document.addGameForm.conference.value,
						win: document.addGameForm.win.value,
						points: document.addGameForm.points.value,
						oppPoints: document.addGameForm.oppPoints.value,
						televised: document.addGameForm.televised.value,
						network: document.addGameForm.network.value,
						bowlGame: document.addGameForm.bowlGame.value,
						location: {
							id: 1,
							stadium: "Memorial Stadium",
							city: "Lincoln",
							state: "Nebraska"
						},
						season: {
							year: document.addGameForm.season.value,
						}
					};
					postGame(gameObject);
				})
			})
			document.getElementById('locationBtn').addEventListener('click', function(e) {
		e.preventDefault();
		addLocationForm();
		document.getElementById('createLocation').addEventListener('click', function(e) {
			e.preventDefault();
			
			let locationObject = {
				stadium: document.addLocationForm.stadium.value,
				city: document.addLocationForm.city.value,
				state: document.addLocationForm.state.value,
			}
			let location = document.getElementById('locationDiv');
			location.style.display = 'none';
			postLocation(locationObject);
		})
	})
		})

	}
}


function loadGamesBySeason(seasonYear) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/seasons/' + seasonYear + '/games');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let games = JSON.parse(xhr.responseText);
				displayAllGames(games);
			}
			else {
				//TODO
			}
		}
	};
	xhr.send();
}



function displayAllGames(gameTable) {

	let table = document.createElement('table');
	table.class = "table table-striped table-hover:"
	let tableHead = document.createElement('thead');
	let tr = document.createElement('tr');
	let thdate = document.createElement('th');
	thdate.textContent = "Date";
	let thday = document.createElement('th');
	thday.textContent = "Day";
	let thhome = document.createElement('th');
	thhome.textContent = "Home/Away";
	let thopp = document.createElement('th');
	thopp.textContent = "Opponent";
	thopp.colSpan = 3;
	let thconf = document.createElement('th');
	thconf.textContent = "Opponent's Conference";
	let thwin = document.createElement('th');
	thwin.textContent = "Win/Loss";
	let thpoints = document.createElement('th');
	thpoints.textContent = "NU Points";
	let thopppoints = document.createElement('th');
	thopppoints.textContent = "Opp Points";
	let threcord = document.createElement('th');
	threcord.textContent = "NU Season Record";
	let thtv = document.createElement('th');
	thtv.textContent = "Televised";
	let thnetwork = document.createElement('th');
	thnetwork.textContent = "Network";
	let thbowl = document.createElement('th');
	thbowl.textContent = "Bowl Game";
	let thstadium = document.createElement('th');
	thstadium.textContent = "Stadium";
	let thcity = document.createElement('th');
	thcity.textContent = "City";
	let thstate = document.createElement('th');
	thstate.textContent = "State";
	let tableBody = document.createElement('tbody');

	let div = document.getElementById('gameTableDiv');

	div.append(table);
	table.appendChild(tableHead);
	table.appendChild(tableBody);
	tableHead.appendChild(tr);
	tr.appendChild(thdate);
	tr.appendChild(thday);
	tr.appendChild(thhome);
	tr.appendChild(thopp);
	tr.appendChild(thconf);
	tr.appendChild(thwin);
	tr.appendChild(thpoints);
	tr.appendChild(thopppoints);
	tr.appendChild(threcord);
	tr.appendChild(thtv);
	tr.appendChild(thnetwork);
	tr.appendChild(thbowl);
	tr.appendChild(thstadium);
	tr.appendChild(thcity);
	tr.appendChild(thstate);




	for (var game of gameTable) {
		tr = document.createElement('tr');
		tableBody.appendChild(tr);

		let td = document.createElement('td');
		td.textContent = game.gameDate;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = game.dayOfWeek;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = game.homeGame ? "Home" : "Away";
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = game.opponent;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = game.oppTeamName;
		tr.appendChild(td);
		td = document.createElement('td');
		let image = document.createElement('img');
		image.src = game.oppLogoUrl;
		image.classList.add('opplogo');
		td.appendChild(image);
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = game.conference;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = game.win ? "Win" : "Loss";
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = game.points;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = game.oppPoints;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = game.record;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = game.televised ? "X" : "";
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = game.network;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = game.bowlGame ? "X" : "";
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = game.location.stadium;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = game.location.city;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = game.location.state;
		tr.appendChild(td);
		
		td = document.createElement('td');
		let updateGameBtn = document.createElement('input');
		updateGameBtn.type = "button";
		updateGameBtn.className = "btn";
		updateGameBtn.value = "Update Game";
		td.appendChild(updateGameBtn);
		tr.appendChild(td);
		
		let deleteGameBtn = document.createElement('input');
		deleteGameBtn.type = "button";
		deleteGameBtn.className = "btn";
		deleteGameBtn.value = "Delete Game";
		//td = document.createElement('td');
		td.appendChild(deleteGameBtn);
		tr.appendChild(td);
		
		updateGameBtn.addEventListener('click', function(e) {
			e.preventDefault();
			updateGameForm(game);	
		})
		deleteGameBtn.addEventListener('click', function(e) {
			e.preventDefault();
		})
	};

}

function displayGameTable(seasonYear) {

	let seasonTable = document.getElementById('seasonTableDiv');
	let gameTable = document.getElementById('gameTableDiv');
	let seasonBtn = document.getElementById('season-toggle');

	gameTable.textContent = '';

	seasonTable.style.display = 'none';
	gameTable.style.display = 'block';
	seasonBtn.style.display = 'inline-block';

	let addGameBtn = document.createElement('button');
	addGameBtn.name = 'addGameBtn';
	addGameBtn.id = 'addGameBtn';
	addGameBtn.textContent = 'Add A Game';
	gameTable.appendChild(addGameBtn);

	let locationBtn = document.createElement('button');
	locationBtn.name = 'locationBtn';
	locationBtn.id = 'locationBtn';
	locationBtn.textContent = 'Add A Location';
	gameTable.appendChild(locationBtn);


	loadGamesBySeason(seasonYear);
}

function displaySeasonTable() {
	let seasonTable = document.getElementById('seasonTableDiv');
	let gameTable = document.getElementById('gameTableDiv');
	let welcome = document.getElementById('welcomeDiv');
	let seasonBtn = document.getElementById('season-toggle');
	let dataDiv = document.getElementById('dataDiv');
	seasonTable.textContent = '';
	dataDiv.textContent = '';

	seasonTable.style.display = 'block';
	gameTable.style.display = 'none';
	welcome.style.display = 'none';
	seasonBtn.style.display = 'none';

	let addSeasonBtn = document.createElement('button');
	addSeasonBtn.name = 'addSeasonBtn';
	addSeasonBtn.id = 'addSeasonBtn';
	addSeasonBtn.textContent = 'Add A Season';
	seasonTable.appendChild(addSeasonBtn);

	loadAllSeasons();
}

function displayError(message) {
	let h2 = document.createElement('h2');
	h2.textContent = message;
	dataDiv.appendChild(h2);
}

function postSeason() {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/seasons');

	xhr.setRequestHeader("Content-type", "application/json");

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 || xhr.status === 201) {
				let createdSeason = JSON.parse(xhr.responseText);
				displaySeasonTable();
			}
			else {
				displayError('Failed To Add Season:	' + xhr.status);
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	}
	let seasonObject = {
		year: document.addSeasonForm.year.value,
		record: document.addSeasonForm.record.value,
		confChamp: document.addSeasonForm.confChamp.value,
		natChampAp: document.addSeasonForm.natChampAp.value,
		natChampCoach: document.addSeasonForm.natChampCoach.value,
	};

	let seasonObjectJson = JSON.stringify(seasonObject);
	console.log(seasonObjectJson);
	xhr.send(seasonObjectJson);
}

function createAddSeasonForm() {

	let seasonTable = document.getElementById('dataDiv');
	let br = document.createElement('br');

	let addSeasonDiv = document.createElement('div');
	addSeasonDiv.id = 'addSeasonDiv';

	let addSeasonForm = document.createElement('form');
	addSeasonForm.name = 'addSeasonForm';

	let addSeasonHead = document.createElement('H3');
	addSeasonHead.name = 'addSeasonHead';
	addSeasonHead.textContent = 'Add A New Season';

	let year = document.createElement('input');
	year.name = 'year';
	year.type = 'number';
	year.min = 1901;
	year.label = 'Year';
	year.placeholder = 2023;

	let labelYear = document.createElement('label');
	labelYear.textContent = 'Year'
	labelYear.appendChild(year);

	let record = document.createElement('input');
	record.name = 'record';
	record.type = 'text';
	record.label = 'Record';
	record.placeholder = '13-0';

	let labelRecord = document.createElement('label');
	labelRecord.textContent = 'Record'
	labelRecord.appendChild(record);

	let confQuestion = document.createElement('p');
	confQuestion.name = 'confQuestion';
	confQuestion.textContent = 'Nebraska Won the Conference This Season     '

	let confChampYes = document.createElement('input');
	confChampYes.name = 'confChamp';
	confChampYes.type = 'radio';
	confChampYes.label = 'Won Conference?';
	confChampYes.value = 'true';
	confChampYes.checked = false;

	let labelYes = document.createElement('label');
	labelYes.textContent = 'Yes'

	let confChampNo = document.createElement('input');
	confChampNo.name = 'confChamp';
	confChampNo.type = 'radio';
	confChampNo.label = 'Won Conference?';
	confChampNo.value = 'false';
	confChampNo.checked = false;

	let labelNo = document.createElement('label');
	labelNo.textContent = 'No'

	let apQuestion = document.createElement('p');
	apQuestion.name = 'apQuestion';
	apQuestion.textContent = 'Nebraska Won the AP Poll Title This Season	'

	let natChampApYes = document.createElement('input');
	natChampApYes.name = 'natChampAp';
	natChampApYes.type = 'radio';
	natChampApYes.label = 'Won AP Poll?';
	natChampApYes.value = 'true';
	natChampApYes.checked = false;

	let natChampApNo = document.createElement('input');
	natChampApNo.name = 'natChampAp';
	natChampApNo.type = 'radio';
	natChampApNo.label = 'Won AP Poll?';
	natChampApNo.value = 'false';
	natChampApNo.checked = false;

	let coachQuestion = document.createElement('p');
	coachQuestion.name = 'coachQuestion';
	coachQuestion.textContent = 'Nebraska Won the Coach\'s Poll Title This Season	'

	let natChampCoachYes = document.createElement('input');
	natChampCoachYes.name = 'natChampCoach';
	natChampCoachYes.type = 'radio';
	natChampCoachYes.label = 'Won Coach\'s Poll?';
	natChampCoachYes.value = 'true';
	natChampCoachYes.checked = false;

	let natChampCoachNo = document.createElement('input');
	natChampCoachNo.name = 'natChampCoach';
	natChampCoachNo.type = 'radio';
	natChampCoachNo.label = 'Won Coach\'s Poll?';
	natChampCoachNo.value = 'false';
	natChampCoachNo.checked = false;

	let createSeason = document.createElement('button');
	createSeason.name = 'createSeason';
	createSeason.id = 'createSeason';
	createSeason.textContent = 'Add Season';
	createSeason.class = "btn-dark";

	addSeasonForm.appendChild(addSeasonHead);
	br = document.createElement('br');
	addSeasonForm.appendChild(br);
	addSeasonForm.appendChild(labelYear);
	addSeasonForm.appendChild(year);
	br = document.createElement('br');
	addSeasonForm.appendChild(br);
	addSeasonForm.appendChild(labelRecord);
	addSeasonForm.appendChild(record);
	br = document.createElement('br');
	addSeasonForm.appendChild(br);
	addSeasonForm.appendChild(confQuestion);
	confQuestion.appendChild(labelYes);
	confQuestion.appendChild(confChampYes);
	confQuestion.appendChild(labelNo);
	confQuestion.appendChild(confChampNo);
	addSeasonForm.appendChild(apQuestion);
	labelYes = document.createElement('label');
	labelYes.textContent = 'Yes';
	apQuestion.appendChild(labelYes);
	apQuestion.appendChild(natChampApYes);
	labelNo = document.createElement('label');
	labelNo.textContent = 'No';
	apQuestion.appendChild(labelNo);
	apQuestion.appendChild(natChampApNo);
	addSeasonForm.appendChild(coachQuestion);
	labelYes = document.createElement('label');
	labelYes.textContent = 'Yes';
	coachQuestion.appendChild(labelYes);
	coachQuestion.appendChild(natChampCoachYes);
	labelNo = document.createElement('label');
	labelNo.textContent = 'No';
	coachQuestion.appendChild(labelNo);
	coachQuestion.appendChild(natChampCoachNo);
	addSeasonForm.appendChild(createSeason);

	addSeasonDiv.appendChild(addSeasonForm);
	seasonTable.appendChild(addSeasonDiv);

}

function createGameForm() {
	
	let gameTable = document.getElementById('gameTableDiv');
	gameTable.style.display = 'none';
	let seasonBtn = document.getElementById('season-toggle');
	seasonBtn.style.display = 'inline-block';

	let gameForm = document.getElementById('dataDiv');
	

	let addGameDiv = document.createElement('div');
	addGameDiv.id = 'addGameDiv';

	let addGameForm = document.createElement('form');
	addGameForm.name = 'addGameForm';

	let addGameFormHead = document.createElement('H3');
	addGameFormHead.name = 'addGameFormHead';
	addGameFormHead.textContent = 'Add A New Game';

	let gameDate = document.createElement('input');
	gameDate.name = 'gameDate';
	gameDate.type = 'date';
	gameDate.label = 'Date';
	gameDate.placeholder = '2023-09-01';

	let dayOfWeek = document.createElement('input');
	dayOfWeek.name = 'dayOfWeek';
	dayOfWeek.type = 'text';
	dayOfWeek.label = 'Day Of week';
	dayOfWeek.value = 'Saturday';

	let homeGameQuestion = document.createElement('p');
	homeGameQuestion.textContent = 'Is this a Home Game? '

	let homeGameT = document.createElement('input');
	homeGameT.name = 'homeGame';
	homeGameT.type = 'radio';
	homeGameT.label = 'Home Game';
	homeGameT.value = 'True';
	homeGameT.checked = false;

	let homeGameF = document.createElement('input');
	homeGameF.name = 'homeGame';
	homeGameF.type = 'radio';
	homeGameF.label = 'Home Game';
	homeGameF.value = 'False';
	homeGameF.checked = false;

	let opponent = document.createElement('input');
	opponent.name = 'opponent';
	opponent.type = 'text';
	opponent.label = 'Opponent';
	opponent.placeholder = 'University Of Oklahoma';

	let oppTeamName = document.createElement('input');
	oppTeamName.name = 'oppTeamName';
	oppTeamName.type = 'text';
	oppTeamName.label = 'Opponent\'s Team Name';
	oppTeamName.placeholder = 'Sooners';

	let oppLogoUrl = document.createElement('input');
	oppLogoUrl.name = 'oppLogoUrl';
	oppLogoUrl.type = 'text';
	oppLogoUrl.label = 'Opponent\'s Logo URL';
	oppLogoUrl.placeholder = 'https://cdn.ssref.net/req/202310031/tlogo/ncaa/oklahoma.png'

	let conference = document.createElement('input');
	conference.name = 'conference';
	conference.type = 'text';
	conference.label = 'Opponent\'s Conference';
	conference.placeholder = 'Big 8';
	
	let winQuestion = document.createElement('p');
	winQuestion.textContent = 'Did Nebraska win this game? '

	let winT = document.createElement('input');
	winT.name = 'win';
	winT.type = 'radio';
	winT.lable = 'We Won';
	winT.value = 'True';
	winT.clicked = false;

	let winF = document.createElement('input');
	winF.name = 'win';
	winF.type = 'radio';
	winF.lable = 'We Won';
	winF.value = 'False';
	winF.clicked = false;

	let points = document.createElement('input');
	points.name = 'points';
	points.type = 'number';
	points.label = 'Nebraska\'s Score';
	points.placeholder = 0;

	let oppPoints = document.createElement('input');
	oppPoints.name = 'oppPoints';
	oppPoints.type = 'number';
	oppPoints.label = 'Opponent\'s Score';
	oppPoints.placeholder = 0;
	
	let tvQuestion = document.createElement('p');
	tvQuestion.textContent = 'Was this game on TV? '

	let televisedT = document.createElement('input');
	televisedT.name = 'televised';
	televisedT.type = 'radio';
	televisedT.lable = 'Was On TV: ';
	televisedT.value = 'true';
	televisedT.clicked = false;

	let televisedF = document.createElement('input');
	televisedF.name = 'televised';
	televisedF.type = 'radio';
	televisedF.lable = 'Was On TV: ';
	televisedF.value = 'false';
	televisedF.clicked = false;

	let network = document.createElement('input');
	network.name = 'network';
	network.type = 'text';
	network.lable = 'Was On Channel';
	network.placeholder = 'ESPN';
	
	let bowlQuestion = document.createElement('p');
	bowlQuestion.textContent = 'Was this a bowl game? '

	let bowlGameT = document.createElement('input');
	bowlGameT.name = 'bowlGame';
	bowlGameT.type = 'radio';
	bowlGameT.lable = 'This was a Bowl Game: ';
	bowlGameT.value = 'true';
	bowlGameT.clicked = false;

	let bowlGameF = document.createElement('input');
	bowlGameF.name = 'bowlGame';
	bowlGameF.type = 'radio';
	bowlGameF.lable = 'This was a Bowl Game: ';
	bowlGameF.value = 'false';
	bowlGameF.clicked = false;

	let location = document.createElement('input');
	location.name = 'location';
	location.type = 'hidden';
	

	let season = document.createElement('input');
	season.name = 'season';
	season.type = 'number';
	season.mim = 1901;
	season.label = 'What season was this game played in? ';
	season.placeholder = 2023;

	let createGame = document.createElement('button');
	createGame.name = 'createGame';
	createGame.id = 'createGame';
	createGame.textContent = 'Add Game';
	createGame.class = "btn-dark";

	let label = document.createElement('label');
	let br = document.createElement('br');

	addGameForm.appendChild(addGameFormHead);
	addGameForm.appendChild(br);
	label.textContent = 'Date: ';
	addGameForm.appendChild(label);
	addGameForm.appendChild(gameDate);
	br = document.createElement('br');
	addGameForm.append(br);
	label = document.createElement('label');
	label.textContent = 'Day of week: ';
	addGameForm.appendChild(label);
	addGameForm.appendChild(dayOfWeek);
	br = document.createElement('br');
	addGameForm.append(br);
	br = document.createElement('br');
	addGameForm.append(br);
	addGameForm.appendChild(homeGameQuestion);
	label = document.createElement('label');
	label.textContent = 'Yes';
	homeGameQuestion.appendChild(label);
	homeGameQuestion.appendChild(homeGameT);
	label = document.createElement('label');
	label.textContent = 'No'
	homeGameQuestion.appendChild(label);
	homeGameQuestion.appendChild(homeGameF);
	br = document.createElement('br');
	addGameForm.append(br);
	label = document.createElement('label');
	label.textContent = 'University: ';
	addGameForm.appendChild(label);
	addGameForm.appendChild(opponent);
	br = document.createElement('br');
	addGameForm.append(br);
	label = document.createElement('label');
	label.textContent = 'Team: ';
	addGameForm.appendChild(label);
	addGameForm.appendChild(oppTeamName);
	br = document.createElement('br');
	addGameForm.append(br);
	label = document.createElement('label');
	label.textContent = 'URL: ';
	addGameForm.appendChild(label);
	addGameForm.appendChild(oppLogoUrl);
	br = document.createElement('br');
	addGameForm.append(br);
	label = document.createElement('label');
	label.textContent = 'Opponent Conference: ';
	addGameForm.appendChild(label);
	addGameForm.appendChild(conference);
	br = document.createElement('br');
	addGameForm.append(br);
	br = document.createElement('br');
	addGameForm.append(br);
	addGameForm.appendChild(winQuestion);
	label = document.createElement('label');
	label.textContent = 'Yes';
	winQuestion.appendChild(label)
	winQuestion.appendChild(winT);
	label = document.createElement('label');
	label.textContent = 'No';
	winQuestion.appendChild(label)
	winQuestion.appendChild(winF);
	br = document.createElement('br');
	addGameForm.append(br);
	label = document.createElement('label');
	label.textContent = 'Nebraska\'s Score: ';
	addGameForm.appendChild(label);
	addGameForm.appendChild(points);
	br = document.createElement('br');
	addGameForm.append(br);
	label = document.createElement('label');
	label.textContent = 'Oppopnent\'s Score: ';
	addGameForm.appendChild(label);
	addGameForm.appendChild(oppPoints);
	br = document.createElement('br');
	addGameForm.append(br);
	br = document.createElement('br');
	addGameForm.append(br);
	addGameForm.appendChild(tvQuestion);
	label = document.createElement('label');
	label.textContent = 'Yes';
	tvQuestion.appendChild(label)
	tvQuestion.appendChild(televisedT);
	label = document.createElement('label');
	label.textContent = 'No';
	tvQuestion.appendChild(label)
	tvQuestion.appendChild(televisedF);
	br = document.createElement('br');
	addGameForm.append(br);
	label = document.createElement('label');
	label.textContent = 'Aired on which network if televised: ';
	addGameForm.appendChild(label);
	addGameForm.appendChild(network);
	br = document.createElement('br');
	addGameForm.append(br);
	br = document.createElement('br');
	addGameForm.append(br);
	addGameForm.appendChild(bowlQuestion);
	label = document.createElement('label');
	label.textContent = 'Yes';
	bowlQuestion.appendChild(label)
	bowlQuestion.appendChild(bowlGameT);
	label = document.createElement('label');
	label.textContent = 'No';
	bowlQuestion.appendChild(label)
	bowlQuestion.appendChild(bowlGameF);
	addGameForm.appendChild(location);
	br = document.createElement('br');
	addGameForm.append(br);
	label = document.createElement('label');
	label.textContent = 'Which season should this game be added to?: ';
	addGameForm.appendChild(label);
	addGameForm.appendChild(season);
	br = document.createElement('br');
	addGameForm.append(br);
	addGameForm.appendChild(createGame);

	addGameDiv.appendChild(addGameForm);
	gameForm.appendChild(addGameDiv);

}

function postGame(gameObject) {
	let xhr = new XMLHttpRequest();
	let seasonYear = gameObject.season.year;
	xhr.open('POST', 'api/seasons/' + seasonYear + '/games');

	xhr.setRequestHeader("Content-type", "application/json");

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 || xhr.status === 201) {
				let createdGame = JSON.parse(xhr.responseText);
				displayGameTable(seasonYear);
			}
			else {
				displayError('Failed To Add Season:	' + xhr.status);
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	}

	let gameObjectJson = JSON.stringify(gameObject);
	console.log(gameObjectJson);
	xhr.send(gameObjectJson);
}

function addLocationForm() {
	
	let welcome = document.getElementById('welcomeDiv');
	welcome.style.display = 'none';
	let seasonTable = document.getElementById('seasonTableDiv');
	seasonTable.style.display = 'none';
	let gameTable = document.getElementById('gameTableDiv');
	gameTable.style.display = 'none';
	let seasonBtn = document.getElementById('season-toggle');
	seasonBtn.style.display = 'inline-block';
	
	let locationForm = document.getElementById('dataDiv');
	

	let addLocationDiv = document.getElementById('locationDiv');
	

	let addLocationForm = document.createElement('form');
	addLocationForm.name = 'addLocationForm';

	let addLocationFormHead = document.createElement('H3');
	addLocationFormHead.name = 'addLocationFormHead';
	addLocationFormHead.textContent = 'Add A New Location';
	
	let stadium = document.createElement('input');
	stadium.name = 'stadium';
	stadium.type = 'text';
	stadium.label = 'Stadium';
	stadium.placeholder = 'Memorial Stadium';
	
	let city = document.createElement('input');
	city.name = 'city';
	city.type = 'text';
	city.label = 'City';
	city.placeholder = 'Lincoln';
	
	let state = document.createElement('input');
	state.name = 'state';
	state.type = 'text';
	state.label = 'State';
	state.placeholder = 'Nebraska';
	
	
	let createLocation = document.createElement('button');
	createLocation.name = 'createLocation';
	createLocation.id = 'createLocation';
	createLocation.textContent = 'Add Location';
	createLocation.class = "btn-dark";
	
	let br = document.createElement('br');
	let label = document.createElement('label');
	
	addLocationForm.appendChild(addLocationFormHead);
	addLocationForm.appendChild(br);
	label.textContent = 'Stadium: ';
	addLocationForm.appendChild(label);
	addLocationForm.appendChild(stadium);
	br = document.createElement('br');
	addLocationForm.append(br);
	label = document.createElement('label');
	label.textContent = 'City: ';
	addLocationForm.appendChild(label);
	addLocationForm.appendChild(city);
	br = document.createElement('br');
	addLocationForm.append(br);
	label = document.createElement('label');
	label.textContent = 'State: ';
	addLocationForm.appendChild(label);
	addLocationForm.appendChild(state);
	
	addLocationForm.appendChild(createLocation);

	addLocationDiv.appendChild(addLocationForm);
	locationForm.appendChild(addLocationDiv);
}

function postLocation(locationObject) {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/games/locations');

	xhr.setRequestHeader("Content-type", "application/json");

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 || xhr.status === 201) {
				let createdLocation = JSON.parse(xhr.responseText);
				displayAllSeasons;
			}
			else {
				displayError('Failed To Add Location:	' + xhr.status);
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	}

	let locationObjectJson = JSON.stringify(locationObject);
	console.log(locationObjectJson);
	xhr.send(locationObjectJson);
}

function updateSeason(seasonUpdateObject) {
	let xhr = new XMLHttpRequest();
	let seasonYear = seasonUpdateObject.year;
	xhr.open('PUT', 'api/seasons/' + seasonYear);

	xhr.setRequestHeader("Content-type", "application/json");

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 || xhr.status === 201) {
				let updatedSeason = JSON.parse(xhr.responseText);
				displayAllSeasons;
			}
			else {
				displayError('Failed To Update Season:	' + xhr.status);
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	}

	let seasonUpdateObjectJson = JSON.stringify(seasonUpdateObject);
	console.log(seasonUpdateObjectJson);
	xhr.send(seasonUpdateObjectJson);
}

function updateGame(gameUpdateObject) {
	let xhr = new XMLHttpRequest();
	let seasonYear = gameUpdateObject.season.year;
	let gameId = gameUpdateObject.id;
	xhr.open('PUT', 'api/seasons/' + seasonYear + '/games/' + gameId);

	xhr.setRequestHeader("Content-type", "application/json");

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 || xhr.status === 201) {
				let updatedGame = JSON.parse(xhr.responseText);
				loadGamesBySeason(seasonYear);
			}
			else {
				displayError('Failed To Update Season:	' + xhr.status);
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	}

	let gameUpdateObjectJson = JSON.stringify(gameUpdateObject);
	console.log(gameUpdateObjectJson);
	xhr.send(gameUpdateObjectJson);
}

function updateGameForm(game) {
	
	let gameTable = document.getElementById('gameTableDiv');
	gameTable.style.display = 'none';
	let seasonBtn = document.getElementById('season-toggle');
	seasonBtn.style.display = 'inline-block';

	let gameForm = document.getElementById('dataDiv');
	
console.log(game.id);
	let updateGameDiv = document.createElement('div');
	updateGameDiv.id = 'updateGameDiv';

	let updateGameForm = document.createElement('form');
	updateGameForm.name = 'updateGameForm';

	let updateGameFormHead = document.createElement('H3');
	updateGameFormHead.name = 'updateGameFormHead';
	updateGameFormHead.textContent = 'Update A Game';

	let gameDate = document.createElement('input');
	gameDate.name = 'gameDate';
	gameDate.type = 'date';
	gameDate.label = 'Date';
	gameDate.value = game.gameDate;

	let dayOfWeek = document.createElement('input');
	dayOfWeek.name = 'dayOfWeek';
	dayOfWeek.type = 'text';
	dayOfWeek.label = 'Day Of week';
	dayOfWeek.value = game.dayOfWeek;

	let homeGameQuestion = document.createElement('p');
	homeGameQuestion.textContent = 'Is this a Home Game? '

	let homeGameT = document.createElement('input');
	homeGameT.name = 'homeGame';
	homeGameT.type = 'radio';
	homeGameT.label = 'Home Game';
	homeGameT.value = 'True';
	homeGameT.clicked = false;

	let homeGameF = document.createElement('input');
	homeGameF.name = 'homeGame';
	homeGameF.type = 'radio';
	homeGameF.label = 'Home Game';
	homeGameF.value = 'False';
	homeGameF.clicked = false;

	let opponent = document.createElement('input');
	opponent.name = 'opponent';
	opponent.type = 'text';
	opponent.label = 'Opponent';
	opponent.value = game.opponent;

	let oppTeamName = document.createElement('input');
	oppTeamName.name = 'oppTeamName';
	oppTeamName.type = 'text';
	oppTeamName.label = 'oppTeamName'
	oppTeamName.value = game.oppTeamName;

	let oppLogoUrl = document.createElement('input');
	oppLogoUrl.name = 'oppLogoUrl';
	oppLogoUrl.type = 'text';
	oppLogoUrl.label = 'Opponent\'s Logo URL';
	oppLogoUrl.value = game.oppLogoUrl;

	let conference = document.createElement('input');
	conference.name = 'conference';
	conference.type = 'text';
	conference.label = 'Opponent\'s Conference';
	conference.value = game.conference;
	
	let winQuestion = document.createElement('p');
	winQuestion.textContent = 'Did Nebraska win this game? '

	let winT = document.createElement('input');
	winT.name = 'win';
	winT.type = 'radio';
	winT.lable = 'We Won';
	winT.value = 'True';
	winT.clicked = false;

	let winF = document.createElement('input');
	winF.name = 'win';
	winF.type = 'radio';
	winF.lable = 'We Won';
	winF.value = 'False';
	winF.clicked = false;

	let points = document.createElement('input');
	points.name = 'points';
	points.type = 'number';
	points.label = 'Nebraska\'s Score';
	points.value = game.points;

	let oppPoints = document.createElement('input');
	oppPoints.name = 'oppPoints';
	oppPoints.type = 'number';
	oppPoints.label = 'Opponent\'s Score';
	oppPoints.value = game.oppPoints;
	
	let tvQuestion = document.createElement('p');
	tvQuestion.textContent = 'Was this game on TV? '

	let televisedT = document.createElement('input');
	televisedT.name = 'televised';
	televisedT.type = 'radio';
	televisedT.lable = 'Was On TV: ';
	televisedT.value = 'true';
	televisedT.clicked = false;

	let televisedF = document.createElement('input');
	televisedF.name = 'televised';
	televisedF.type = 'radio';
	televisedF.lable = 'Was On TV: ';
	televisedF.value = 'false';
	televisedF.clicked = false;

	let network = document.createElement('input');
	network.name = 'network';
	network.type = 'text';
	network.lable = 'Was On Channel';
	network.value = game.network;
	
	let bowlQuestion = document.createElement('p');
	bowlQuestion.textContent = 'Was this a bowl game? '

	let bowlGameT = document.createElement('input');
	bowlGameT.name = 'bowlGame';
	bowlGameT.type = 'radio';
	bowlGameT.lable = 'This was a Bowl Game: ';
	bowlGameT.value = 'true';
	bowlGameT.clicked = false;

	let bowlGameF = document.createElement('input');
	bowlGameF.name = 'bowlGame';
	bowlGameF.type = 'radio';
	bowlGameF.lable = 'This was a Bowl Game: ';
	bowlGameF.value = 'false';
	bowlGameF.clicked = false;

	let location = document.createElement('input');
	location.name = 'location';
	location.type = 'hidden';
	

	let season = document.createElement('input');
	season.name = 'season';
	season.type = 'number';
	season.mim = 1901;
	season.label = 'What season was this game played in? ';
	season.value = game.season.year;

	let updateGame = document.createElement('button');
	updateGame.name = 'updateGame';
	updateGame.id = 'updateGame';
	updateGame.textContent = 'Update Game';
	updateGame.class = "btn-dark";

	let label = document.createElement('label');
	let br = document.createElement('br');

	updateGameForm.appendChild(updateGameFormHead);
	updateGameForm.appendChild(br);
	label.textContent = 'Date: ';
	updateGameForm.appendChild(label);
	updateGameForm.appendChild(gameDate);
	br = document.createElement('br');
	updateGameForm.append(br);
	label = document.createElement('label');
	label.textContent = 'Day of week: ';
	updateGameForm.appendChild(label);
	updateGameForm.appendChild(dayOfWeek);
	br = document.createElement('br');
	updateGameForm.append(br);
	br = document.createElement('br');
	updateGameForm.append(br);
	updateGameForm.appendChild(homeGameQuestion);
	label = document.createElement('label');
	label.textContent = 'Yes';
	homeGameQuestion.appendChild(label);
	homeGameQuestion.appendChild(homeGameT);
	label = document.createElement('label');
	label.textContent = 'No'
	homeGameQuestion.appendChild(label);
	homeGameQuestion.appendChild(homeGameF);
	br = document.createElement('br');
	updateGameForm.append(br);
	label = document.createElement('label');
	label.textContent = 'University: ';
	updateGameForm.appendChild(label);
	updateGameForm.appendChild(opponent);
	br = document.createElement('br');
	updateGameForm.append(br);
	label = document.createElement('label');
	label.textContent = 'Team: ';
	updateGameForm.appendChild(label);
	updateGameForm.appendChild(oppTeamName);
	br = document.createElement('br');
	updateGameForm.append(br);
	label = document.createElement('label');
	label.textContent = 'URL: ';
	updateGameForm.appendChild(label);
	updateGameForm.appendChild(oppLogoUrl);
	br = document.createElement('br');
	updateGameForm.append(br);
	label = document.createElement('label');
	label.textContent = 'Opponent Conference: ';
	updateGameForm.appendChild(label);
	updateGameForm.appendChild(conference);
	br = document.createElement('br');
	updateGameForm.append(br);
	br = document.createElement('br');
	updateGameForm.append(br);
	updateGameForm.appendChild(winQuestion);
	label = document.createElement('label');
	label.textContent = 'Yes';
	winQuestion.appendChild(label)
	winQuestion.appendChild(winT);
	label = document.createElement('label');
	label.textContent = 'No';
	winQuestion.appendChild(label)
	winQuestion.appendChild(winF);
	br = document.createElement('br');
	updateGameForm.append(br);
	label = document.createElement('label');
	label.textContent = 'Nebraska\'s Score: ';
	updateGameForm.appendChild(label);
	updateGameForm.appendChild(points);
	br = document.createElement('br');
	updateGameForm.append(br);
	label = document.createElement('label');
	label.textContent = 'Oppopnent\'s Score: ';
	updateGameForm.appendChild(label);
	updateGameForm.appendChild(oppPoints);
	br = document.createElement('br');
	updateGameForm.append(br);
	br = document.createElement('br');
	updateGameForm.append(br);
	updateGameForm.appendChild(tvQuestion);
	label = document.createElement('label');
	label.textContent = 'Yes';
	tvQuestion.appendChild(label)
	tvQuestion.appendChild(televisedT);
	label = document.createElement('label');
	label.textContent = 'No';
	tvQuestion.appendChild(label)
	tvQuestion.appendChild(televisedF);
	br = document.createElement('br');
	updateGameForm.append(br);
	label = document.createElement('label');
	label.textContent = 'Aired on which network if televised: ';
	updateGameForm.appendChild(label);
	updateGameForm.appendChild(network);
	br = document.createElement('br');
	updateGameForm.append(br);
	br = document.createElement('br');
	updateGameForm.append(br);
	updateGameForm.appendChild(bowlQuestion);
	label = document.createElement('label');
	label.textContent = 'Yes';
	bowlQuestion.appendChild(label)
	bowlQuestion.appendChild(bowlGameT);
	label = document.createElement('label');
	label.textContent = 'No';
	bowlQuestion.appendChild(label)
	bowlQuestion.appendChild(bowlGameF);
	updateGameForm.appendChild(location);
	br = document.createElement('br');
	updateGameForm.append(br);
	label = document.createElement('label');
	label.textContent = 'Which season should this game be added to?: ';
	updateGameForm.appendChild(label);
	updateGameForm.appendChild(season);
	br = document.createElement('br');
	updateGameForm.append(br);
	updateGameForm.appendChild(updateGame);

	updateGameDiv.appendChild(updateGameForm);
	gameForm.appendChild(updateGameDiv);
	
	updateGame.addEventListener('click', function(e) {
		e.preventDefault();
		let gameUpdateObject = {
				gameDate: document.updateGameForm.gameDate.value,
				dayOfWeek: document.updateGameForm.dayOfWeek.value,
				homeGame: document.updateGameForm.homeGame.value,
				opponent: document.updateGameForm.opponent.value,
				oppTeamName: document.updateGameForm.oppTeamName.value,
				oppLogoUrl: document.updateGameForm.oppLogoUrl.value,
				conference: document.updateGameForm.conference.value,
				win: document.updateGameForm.win.value,
				points: document.updateGameForm.points.value,
				oppPoints: document.updateGameForm.oppPoints.value,
				televised: document.updateGameForm.televised.value,
				network: document.updateGameForm.network.value,
				bowlGame: document.updateGameForm.bowlGame.value,
				/*location: {
					id: 1,
					stadium: "Memorial Stadium",
					city: "Lincoln",
					state: "Nebraska"
				},*/
				season: {
					year: document.updateGameForm.season.value,
				}
			}
			console.log(gameUpdateObject);
			updateGame(gameUpdateObject);
	})

}









