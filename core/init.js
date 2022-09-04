// The object containing the game-specific functions.
let game = {};

$(document).ready(() => {
	game = betrayal;
	game.init();

	// Sort the cards in case theyre in a random order in the game file.
	game.cards = _.sortBy(_.flatten(game.cards), (c) => c.id);

	/*
	if theres instance in QS
		if instance is already stored.
			set instance
			load state
			render all
			clean QS
		else if QS also contains game and data
			set deck and hand from data
			set game
			set instance
			save state
			render all
		else
			main menu and clear QS
	else
		main menu and clear QS

	*/

	// Load the instanceId.
	let instanceMatch = window.location.search.match(/i[=]([^&#]+)([&#]|$)/);

	// Load the game.
	let gameMatch = window.location.search.match(/g[=]([^&#]+)([&#]|$)/);

	// Load the data.
	let dataMatch = window.location.search.match(/d[=]([^&#]+)([&#]|$)/);

	if (!_.isEmpty(instanceMatch)) {
		state.instanceId = instanceMatch[1];

		if (!_.isEmpty(localStorage.getItem(state.instanceId))) {
			// Load saved game.
			state.load();
			render.all();
		} else if (!_.isEmpty(gameMatch) && !_.isEmpty(dataMatch)) {
			// New game from data.
			// TODO: Set game from gameMatch here.
			link.setStateFromData(dataMatch[1]);
			state.save();
			render.all();
		} else {
			render.newGame();
		}
	} else {
		render.newGame();
	}

	$("#start").click(() => {
		const states = game.startGame($("#players").val());
		const instanceId = Date.now();
		_.each(states, s => {
			const url = link.share(instanceId, "b", s);
			$("#links")
				.append($(`<a href="${url}">`)
					.html(url))
				.append("</br></br>");
		});
		$("#start, #players").prop('disabled', true);
	});

	$("#draw").click(() => {
		//TODO: draw card here.
	});

	link.cleanURL();
});