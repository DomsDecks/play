const card = {

	"get": (id) => {
		return _.find(game.cards, c => c.id == id);
	},

	// Bring a card from the deck into the foreground.
	// In terms of the data it is still in whatever area it was drawn from.
	// So that, if you close the window with a card drawn, it isn't lost.
	"draw": (id) => {
		if (!_.isNull(state.drawnCardId)) {
			return;
		}
		if (_.isUndefined(id)) {
			state.drawnCardId = null;
			return;
		}
		state.drawnCardId = id;
		$("div.drawn").replaceWith(
			render.card(id)
				.addClass("drawn")
				.css({ "display": "block" })
		);
		// Show new drawn card on screen, with relevant controls.
	},

	// Remove the drawn card from the GUI.
	"undraw": () => {
		state.drawnCardId = null;
		$("div.card.drawn")
			.css({ "display": "none" })
			.html("");
	},

	// Move a card between arrays.
	"move": (id, target) => {
		// Cards can only be in one array at a time, so remove from others while moving.
		if (target != state.hand && state.hand.some(h => h == id)) {
			state.hand.splice(state.hand.indexOf(id), 1);
		}
		if (target != state.deck && state.deck.some(d => d == id)) {
			state.deck.splice(state.deck.indexOf(id), 1);
		}
		if (!target.some(t => t == id)) {
			target.push(id);
		}
		render.all();
	},

};