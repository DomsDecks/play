const card = {

	"get": (id) => {
		return _.find(game.cards, c => c.id == id);
	},

	// Bring a card from the deck into the foreground.
	// In terms of the data it is still in whatever area it was drawn from.
	// So that, if you close the window with a card drawn, it isn't lost.
	"draw": (id, replace = false) => {
		if (replace) {
			card.undraw();
		}
		if (!_.isNull(state.drawnCardId)) {
			return;
		}
		if (_.isUndefined(id) || _.isUndefined(card.get(id))) {
			state.drawnCardId = null;
			return;
		}
		state.drawnCardId = id;
		render.hideOptions();
		// Show new drawn card on screen, with relevant controls.
		$("div.drawn").replaceWith(
			render.card(id)
				.addClass("drawn")
				.css({ "display": "block" })
		);
	},

	// Remove the drawn card from the GUI.
	"undraw": () => {
		state.drawnCardId = null;
		$("div.card.drawn")
			.removeAttr("id")
			.css({ "display": "none" })
			.empty();
	},

	// Draw from the top of the discard pile.
	"drawDiscard": () => {
		if (state.menu()) { return; }
		card.draw(_.last(state.discard));
	},

	// Move a card between arrays.
	"move": (id, target) => {
		if (state.menu()) { return; }

		if (state.drawnCardId == id) {
			card.undraw();
		}

		// Cards can only be in one array at a time, so remove from others while moving.
		if (target != state.hand && state.hand.some(h => h == id)) {
			state.hand.splice(_.findIndex(state.hand, h => h == id), 1);
		}
		if (target != state.deck && state.deck.some(d => d == id)) {
			state.deck.splice(_.findIndex(state.deck, d => d == id), 1);
		}
		if (target != state.discard && state.discard.some(d => d == id)) {
			state.discard.splice(_.findIndex(state.discard, d => d == id), 1);
		}

		// Add it to the end of the target array.
		if (!target.some(t => t == id)) {
			target.push(id);
		}

		state.save();

		render.all();

		if (_.isNull(state.drawnCardId)) {
			render.showOptions();
		}
	},

	"path": (id) => {
		return `/games/${game.assetPath}/${card.get(id).name}.png`;
	}

};