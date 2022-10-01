const text = (id) => {
	switch(id) {

		case "scroll": return game.text.scroll || "<i class='material-icons'>keyboard_double_arrow_down</i>\
		<span>Scroll down to see your hand of cards...<span>\
		<i class='material-icons'>keyboard_double_arrow_down</i>";

		case "empty": return game.text.empty || "<span>Your hand of cards is empty.<span>";

		case "hand": return game.text.hand || "Keep in your hand";

		case "deck": return game.text.deck || "Shuffle in to deck";

		case "discard": return game.text.discard || "Place on discard pile";

		case "discardCancel": return game.text.discardCancel || "Leave in discard pile";

		case "up": return game.text.up || "<i class='material-icons'>keyboard_arrow_up</i>";

		case "down": return game.text.down || "<i class='material-icons'>keyboard_arrow_down</i>";

		case "players": return game.text.players || "Select the number of players in the game.";

		case "start": return game.text.start || "Start";

		case "link": return game.text.link || "Send one unique link to each player. Each player must use a different link to play the game.";

		case "search": return game.text.search || "<i class='material-icons'>search</i>";

		case "find": return game.text.find || "Enter a card ID number to find it and draw it, regardless of it's current location.";

		case "draw": return game.text.draw || "Draw";

		case "x": return game.text.x || "<i class='material-icons'>close</i>";

	};
};