const state = {

	// Unique ID of the instance of a game.
	"instanceId": "",

	// Card IDs currently in hand.
	"hand": [],

	// Card IDs currently in all combined decks.
	"deck": [],

	// The currently drawn card.
	"drawnCardId": null,

	// Time the game was started.
	"started": null,

	// Store to local storage.
	"save": () => {
		let gameData = {
			"deck": state.deck,
			"hand": state.hand,
			"started": state.started,
		};
		localStorage.setItem(state.instanceId, JSON.stringify(gameData));
	},

	"load": () => {
		let gameData = JSON.parse(localStorage.getItem(state.instanceId));
		state.deck = gameData.deck;
		state.hand = gameData.hand;
		state.started = gameData.started;
	},

};