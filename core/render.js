const render = {

	"all": () => {
		game.renderDeck();
		render.hand();
		text.setScroll();
	},

	"card": (id) => {
		// Render a card generically, and then fill it with the game's content.
		const element = game.renderCard($("<div>")
			.attr("id", id))
			.addClass("card");

		const c = card.get(id);

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

		const index = state.discard.indexOf(id);
		if (c["discard"]) {
			element.append(
				$("<div>")
					.addClass("tab tab-discard")
					.html(index < 0 ? text.discard : text.discardCancel)
					.click(() => card.move(id, state.discard))
			);
		}

		if (index >= 0) {
			if (_.last(state.discard) != id) {
				element.append(
					$("<div>")
						.addClass("tab tab-up")
						.html(text.up)
						.click(() => card.draw(state.discard[index + 1], true))
				);
			}
			if (_.first(state.discard) != id) {
				element.append(
					$("<div>")
						.addClass("tab tab-down")
						.html(text.down)
						.click(() => card.draw(state.discard[index - 1], true))
				);
			}
		}

		return element;
	},

	"hand": () => {
		// If there's a card on the page not in the hand...
		$("#hand div.card").each((i, c) => {
			if (state.hand.indexOf(c.id) < 0) {
				c.remove();
			}
		});
		// If there's a card in the hand but not on the page...
		const missingCards = _.filter(state.hand, h => $(`#hand div#${h}.card`).length == 0);
		_.each(missingCards, c => {
			$("#hand").append(render.card(c));
		});
	},

	"menu": (content) => {
		// Show a menu with any content.
		$("#top").append(
			$("<div>")
				.addClass("menu")
				.append(content)
		);
	},

	"newGame": () => {
		render.menu();

		$(".menu")
			.attr("id", "new")
			.append(
				$("<input type='number' min='1' max='6' value='1'>")
					.attr("id", "players")
			).append(
				$("<button type='button'>")
					.attr("id", "start")
					.html(text.start)
			).append(
				$("<div>")
					.attr("id", "links")
			);

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
	},

	"findCard": () => {
		if ($(".menu").length > 0) {
			return;
		}

		render.menu();

		$(".menu")
			.attr("id", "find")
			.append(
				$("<input type='number' min='1000' max='9999'>")
					.attr("id", "id")
			).append(
				$("<button type='button'>")
					.attr("id", "draw")
					.html(text.draw)
			);

		$("#draw").click(() => {
			const id = $("#id").val();
			card.draw(id);
			if (state.drawnCardId == id) {
				$(".menu").remove();
			}
		});
	},

};