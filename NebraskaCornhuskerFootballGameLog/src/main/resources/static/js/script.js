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
			seasonBtn.style.display = 'none';
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
		var btn = document.createElement('input');
		btn.type = "button";
		btn.className = "btn";
		btn.value = "See Season";
		td.appendChild(btn);
		tr.appendChild(td);

		btn.addEventListener('click', function(e) {
			let season = year.textContent;
			console.log(season);
			displayGameTable(season);
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

	loadGamesBySeason(seasonYear);
}

function displaySeasonTable() {
	let seasonTable = document.getElementById('seasonTableDiv');
	let gameTable = document.getElementById('gameTableDiv');
	let welcome = document.getElementById('welcomeDiv');
	let seasonBtn = document.getElementById('season-toggle');

	seasonTable.textContent = '';

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
		/*confChamp: document.addSeasonForm.confChamp.value,
		natChampAp: document.addSeasonForm.natChampAp.value,
		natChampCoach: document.addSeasonForm.natChampCoach.value,*/
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

	/*let confQuestion = document.createElement('p');
	confQuestion.name = 'confQuestion';
	confQuestion.textContent = 'Nebraska Won the Conference This Season     '
	
	let confChamp = document.createElement('input');
	confChamp.name = 'confChamp';
	confChamp.type = 'radio';
	confChamp.label = 'Won Conference?';
	confChamp.checked = false;*/

	/*let apQuestion = document.createElement('p');
	apQuestion.name ='apQuestion';
	apQuestion.textContent = 'Nebraska Won the AP Poll Title This Season	'
	
	let natChampAp = document.createElement('input');
	natChampAp.name = 'seasonApYes';
	natChampAp.type = 'radio';
	natChampAp.label = 'Won AP Poll?';
	natChampAp.checked = false;
	
	let coachQuestion = document.createElement('p');
	coachQuestion.name = 'coachQuestion';
	coachQuestion.textContent = 'Nebraska Won the Coach\'s Poll Title This Season	'
	
	let natChampCoach = document.createElement('input');
	natChampCoach.name = 'seasonCoachYes';
	natChampCoach.type = 'radio';
	natChampCoach.label = 'Won Coach\'s Poll?';
	natChampCoach.checked = false;*/

	let createSeason = document.createElement('button');
	createSeason.name = 'createSeason';
	createSeason.id = 'createSeason';
	createSeason.textContent = 'Add Season';
	createSeason.class = "btn-dark";

	addSeasonForm.appendChild(addSeasonHead);
	addSeasonForm.appendChild(labelYear);
	addSeasonForm.appendChild(year);
	addSeasonForm.appendChild(labelRecord);
	addSeasonForm.appendChild(record);
	/*addSeasonForm.appendChild(confQuestion);
	confQuestion.appendChild(confChamp);
	addSeasonForm.appendChild(apQuestion);
	apQuestion.appendChild(natChampAp);
	addSeasonForm.appendChild(coachQuestion);
	coachQuestion.appendChild(natChampCoach);*/
	addSeasonForm.appendChild(createSeason);

	addSeasonDiv.appendChild(addSeasonForm);
	seasonTable.appendChild(addSeasonDiv);

}