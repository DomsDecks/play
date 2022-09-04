const render = {

	"all": () => {
		game.renderDeck();
		render.hand();
		text.setScroll();
	},

	"card": (id) => {
		// Render a card generically, and then fill it with the game's content.
		let element = game.renderCard($("<div>")
			.attr("id", id))
			.addClass("card");

		let c = card.get(id);

		if (c["hand"] && state.hand.indexOf(id) < 0) {
			element.append(
				$("<div>")
					.addClass("tab tab-hand")
					.html(text.hand)
					.click(() => card.move(id, state.hand))
			);
		}

		if (c["deck"]) {
			element.append(
				$("<div>")
					.addClass("tab tab-deck")
					.html(text.deck)
					.click(() => card.move(id, state.deck))
			);
		}

		if (c["discard"]) {
			element.append(
				$("<div>")
					.addClass("tab tab-discard")
					.html(text.discard)
					.click(() => card.move(id, state.discard))
			);
		}

		return element;
	},

	"hand": () => {
		// If there's a card on the page not in the hand...
		$("div#hand div.card").each((i, c) => {
			if (state.hand.indexOf(c.id) < 0) {
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