const render = {

	"all": () => {
		game.renderDeck();
		render.hand();
		text.setScroll();
	},

	"card": (id) => {
		// Render a card generically, and then fill it with the game's content.
		return game.renderCard($("<div>")
			.attr("id", id))
			.addClass("card");
	},

	"hand": () => {
		// If there's a card on the page not in the hand...
		$("div#hand div.card").each((i, c) => {
			if (state.hand.indexOf(c.attr("id")) < 0) {
				c.remove();
			}
		});
		// If there's a card in the hand but not on the page...
		const missingCards = _.filter(state.hand, h => $(`div#hand div#${h}.card`).length == 0);
		_.each(missingCards, c => {
			$("div#hand").append(render.card(c));
		});
	},

	"popup": (content) => {
		// Show a popup with any content.
	},

};