const render = {

	"all": () => {
		game.renderDeck();
		render.hand();
		$("div#scroll")
			.html(_.isEmpty(state.hand) ? text("empty") : text("scroll"));
	},

	"find": () => {
		if ($("#find").length == 0) {
			$("#top-content").append(
				$("<div>")
					.attr("id", "find")
					.addClass("option round shadow")
					.html(text("search"))
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

		element.append(
			$("<div>")
				.addClass("tab round shadow tab-actions")
				.html(text("actions"))
				.click(() => {
					const show = element.find(".tab-deck").css("display") == "none";
					render.clearTabs();
					if (show) {
						element.find(".tab-deck, .tab-hand, .tab-discard").css({"display": "flex"});
					}
				})
		);

		if (c["hand"] && !_.some(state.hand, h => h == id)) {
			element.append(
				$("<div>")
					.addClass("tab round-wide shadow tab-hand")
					.html(text("hand"))
					.click(() => card.move(id, state.hand))
			);
		}

		if (c["deck"]) {
			element.append(
				$("<div>")
					.addClass("tab round-wide shadow tab-deck")
					.html(text("deck"))
					.click(() => card.move(id, state.deck))
			);
		}

		const index = _.findIndex(state.discard, d => d == id);
		if (c["discard"]) {
			element.append(
				$("<div>")
					.addClass("tab round-wide shadow tab-discard")
					.html(index < 0 ? text("discard") : text("discardCancel"))
					.click(() => card.move(id, state.discard))
			);
		}

		if (index >= 0) {
			if (_.last(state.discard) != id) {
				element.append(
					$("<div>")
						.addClass("tab round shadow tab-up")
						.html(text("up"))
						.click(() => card.draw(state.discard[index + 1], true))
				);
			}
			if (_.first(state.discard) != id) {
				element.append(
					$("<div>")
						.addClass("tab round shadow tab-down")
						.html(text("down"))
						.click(() => card.draw(state.discard[index - 1], true))
				);
			}
		}

		return element;
	},

	"clearTabs": () => {
		$(".tab-deck, .tab-hand, .tab-discard").css({"display": ""});
	},

	"hand": () => {
		// If there's a card on the page not in the hand...
		$("#hand div.card").each((i, c) => {
			if (!_.some(state.hand, h => h.id == c.id)) {
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

	"closeMenu": () => {
		$(".menu").remove();
		render.showOptions();
	},

	"newGame": () => {
		render.menu();

		$(".menu")
			.attr("id", "menu-new")
			.append($("<div>")
				.html(text("intro")))
			.append($("<div>")
				.html(text("game")))
			.append($("<select>")
				.attr("id", "game")
				.append($(`<option value='${betrayal_2e.code}'>`)
					.html(betrayal_2e.displayName))
				.append($(`<option value='${betrayal_2e_dom.code}'>`)
					.html(betrayal_2e_dom.displayName)))
			.append($("<div>")
				.html(text("players")))
			.append($("<input type='number' min='1' max='6' value='1'>")
				.attr("id", "players"))
			.append($("<button type='button'>")
				.attr("id", "start")
				.html(text("start")));

		$("#start").click(() => {
			state.setGame($("#game").val());
			const states = game.startGame(parseInt($("#players").val()));
			const instanceId = Date.now();
			$("#menu-new")
				.html("");
			$("#menu-new")
				.append($("<div>")
					.html(text("link")))
				.append(
					$("<div>")
						.attr("id", "links"));

			_.each(states, (s, i) => {
				const url = link.share(instanceId, game.code, s);
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
			.append($("<div>")
				.attr("id", "close")
				.html(text("x")))
			.append($("<div>")
				.attr("class", "text")
				.html(text("find")))
			.append($("<input type='number' min='1000' max='9999'>")
				.attr("id", "id"))
			.append($("<button type='button'>")
				.attr("id", "draw")
				.html(text("draw")));

		$("#draw").click(() => {
			const id = parseInt($("#id").val());
			card.draw(id);
			if (state.drawnCardId == id) {
				render.closeMenu();
			}
		});

		$("#close").click(render.closeMenu);
	},

	"hideOptions": () => {
		$(".option").css({ "visibility": "hidden" });
	},

	"showOptions": () => {
		$(".option").css({ "visibility": "visible" });
	},

	"preloadAssets": () => {
		_.each(game.cards, c => {
			$("#preload").append(
				$(`<img src="${render.path(c.name)}">`)
					.attr("id", `preload-${c.name}`));
		});
		_.each(game.assets, a => {
			$("#preload").append(
				$(`<img src="${render.path(a)}">`)
					.attr("id", `preload-${a}`));
		});
	},

	"path": (name) => {
		return `games/${game.assetPath}/images/${name
			.toLowerCase()
			.replaceAll(" ", "-")
			.replaceAll(/<br>|[^0-9a-z-]/ig, "")
			}.png`;
	},
};