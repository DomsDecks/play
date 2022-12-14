// The object containing the game-specific functions.
let game = {};

$(document).ready(() => {
	// I think the game has to be something to avoid errors, so just set it here.
	game = betrayal_2e_dom;

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
			state.setGame(gameMatch[1]);
			link.setStateFromData(dataMatch[1]);
			state.save();
			render.all();
		} else {
			render.newGame();
		}
	} else {
		render.newGame();
	}
	
	link.cleanURL();
});