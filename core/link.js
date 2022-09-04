const link = {

	// Clean the URL.
	"cleanURL": () => {
		const newUrl =`${window.location.protocol}//${window.location.host}${window.location.pathname}${!_.isEmpty(state.instanceId) ? ("?i=" + state.instanceId) : ""}`;
		window.history.pushState({ path: newUrl }, "", newUrl);
	},

	// Get the sharing URL.
	"share": (instanceId, game, data) => {
		return `${window.location.protocol}//${window.location.host}${window.location.pathname}?i=${instanceId}&g=${game}&d=${data}`;
	},

	// Get an encoded string containing the deck and hand.
	"getData": (deck, hand) => {

		// The cards are sorted by their IDs.
		// The deckBinary is 1100 if you have the first two cards but not the last two.
		let deckBinary = "";
		_.each(game.cards, (c, i) => {
			deckBinary = (_.any(deck, d => d == c.id) ? "1" : "0") + deckBinary;
		});

		// The data is the deck binary number, converted to base 36.
		let data = parseInt(deckBinary, 2).toString(36);

		// Do the same for the hand.
		let handBinary = "";
		_.each(game.cards, (c, i) => {
			handBinary = (_.any(hand, h => h == c.id) ? "1" : "0") + handBinary;
		});
		data += "_" + parseInt(handBinary, 2).toString(36);

		// The data is the deck number, then an underscore, then the hand number.
		return data;
	},

	// Set the game state from the string.
	"setStateFromData": (data) => {

		// Add everything to deck for testing.
		const all = data == "*";
		if (all) {
			data = "*";
		}

		// Empty the deck and hand.
		state.deck.splice(0, state.deck.length);
		state.hand.splice(0, state.hand.length);

		// Parse the data into those binary numbers.
		const deckBinary = parseInt(data.split("_")[0], 36).toString(2).padStart(game.cards.length, "0");
		_.each(game.cards, (c, i) => {
			// For each possible card, add to the deck it if it's a 1.
			if (deckBinary.substring(game.cards.length - 1 - i, game.cards.length - i) == 1 || all) {
				state.deck.push(c.id);
			}
		});

		// Do the same for the hand.
		const handBinary = parseInt(data.split("_")[1], 36).toString(2).padStart(game.cards.length, "0");
		_.each(game.cards, (c, i) => {
			if (handBinary.substring(game.cards.length - 1 - i, game.cards.length - i) == 1) {
				state.hand.push(c.id);
			}
		});
	},

};