const state = {

	// Unique ID of the instance of a game.
	instanceId: "",

	// Card IDs currently in hand.
	hand: [],

	// Card IDs currently in all combined decks.
	deck: [],

	// Card IDs currently in discard pile.
	// The last element is the top of the pile.
	discard: [],

	// The currently drawn card.
	drawnCardId: null,

	// Time the game was started.
	started: null,

	// Is a menu open?
	menu: () => $(".menu").length > 0,

	// Store to local storage.
	save: () => {
		let gameData = {
			"deck": state.deck,
			"hand": state.hand,
			"discard": state.discard,
			"started": state.started || new Date().toLocaleString(),
			"game": game.code,
		};
		localStorage.setItem(state.instanceId, JSON.stringify(gameData));
	},

	load: () => {
		let gameData = JSON.parse(localStorage.getItem(state.instanceId));
		state.setGame(gameData.game || "b");
		state.deck = gameData.deck || [];
		state.hand = gameData.hand || {};
		state.discard = gameData.discard || [];
		state.started = gameData.started || new Date().toLocaleString();
	},

	setGame: (g) => {
		switch (g) {
			case betrayal_2e.code:
				game = betrayal_2e;
				break;
			case betrayal_2e_dom.code:
				game = betrayal_2e_dom;
				break;
		}
		document.title = game.displayName;
	},
};