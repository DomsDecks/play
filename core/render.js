const render = {

	"all": () => {
		game.renderDeck();
		render.hand();
		text.setScroll();
	},

	"find": () => {
		if ($("#find").length == 0) {
			$("#top-content").append(
				$("<div>")
					.attr("id", "find")
					.addClass("option")
					.html($("<i class='material-icons'>search</i>"))
					.click(render.findCard)
			);
		}
	},

	"card": (id) => {
		// Render a card generically, and then fill it with the game's content.
		const element = game.renderCard($("<div>")
			.attr("id", id))
			.addClass("card");

		const c = card.get(id);

		if (c["hand"] && !_.some(state.hand, h => h == id)) {
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

		const index = _.findIndex(state.discard, d => d == id);
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
			if (!_.some(state.hand, h => c.id)) {
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
		render.hideOptions();
	},

	"newGame": () => {
		render.menu();

		$(".menu")
			.attr("id", "menu-new")
			.append(
				$("<div>")
					.attr("class", "text")
					.html(text.players)
			)
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
			const states = game.startGame(parseInt($("#players").val()));
			const instanceId = Date.now();
			$("#links")
				.before($("<div>")
					.html(text.link));
			_.each(states, (s, i) => {
				const url = link.share(instanceId, "b", s);
				$("#links")
					.append($("<span>")
						.html(`${i + 1}. `))
					.append($(`<a href="${url}">`)
						.html(url))
					.append("</br></br>");
			});
			// $("#start, #players").prop('disabled', true);
		});
	},

	"findCard": () => {
		if (state.menu() || !_.isNull(state.drawnCardId)) { return; }

		render.menu();

		$(".menu")
			.attr("id", "menu-find")
			.append(
				$("<div>")
					.attr("class", "text")
					.html(text.find)
			)
			.append(
				$("<input type='number' min='1000' max='9999'>")
					.attr("id", "id")
			).append(
				$("<button type='button'>")
					.attr("id", "draw")
					.html(text.draw)
			);

		$("#draw").click(() => {
			const id = parseInt($("#id").val());
			card.draw(id);
			if (state.drawnCardId == id) {
				$(".menu").remove();
				render.showOptions();
			}
		});
	},

	"hideOptions": () => {
		$(".option").css({ "visibility": "hidden" });
	},

	"showOptions": () => {
		$(".option").css({ "visibility": "visible" });
	},
};