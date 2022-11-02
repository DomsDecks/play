const card = {

	get: (id) => {
		return _.find(game.cards, c => c.id == id);
	},

	// Bring a card from the deck into the foreground.
	// In terms of the data it is still in whatever area it was drawn from.
	// So that, if you close the window with a card drawn, it isn't lost.
	draw: (id, replace = false) => {
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
		render.clearTabs();
		// Show new drawn card on screen, with relevant controls.
		$("div.drawn").replaceWith(
			render.card(id)
				.addClass("drawn")
				.css({ "display": "flex" })
		);
		$("#darkener").css({ "display": "block" });
	},

	// Remove the drawn card from the GUI.
	undraw: () => {
		state.drawnCardId = null;
		$("div.card.drawn")
			.removeAttr("id")
			.css({ "display": "" })
			.empty();
		$("#darkener").css({ "display": "" });
	},

	// Draw from the top of the discard pile.
	drawDiscard: () => {
		if (state.menu()) { return; }
		card.draw(_.last(state.discard));
	},

	// Move a card between arrays.
	move: (id, target) => {
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
}; 
// The object containing the game-specific functions.
let game = {};

$(document).ready(() => {
	// I think the game has to be something to avoid errors, so just set it here.
	game = betrayal_2e_dom;

	// Load the instanceId.
	let instanceMatch = window.location.search.match(/i[=]([^&#]+)([&#]|$)/);

	// Load the game.
	let gameMatch = window.location.search.match(/g[=]([^&#]+)([&#]|$)/);

	// Load the data.
	let dataMatch = window.location.search.match(/d[=]([^&#]+)([&#]|$)/);

	if (!_.isEmpty(instanceMatch)) {
		state.instanceId = instanceMatch[1];

		if (!_.isEmpty(localStorage.getItem(state.instanceId))) {
			// Load saved game.
			state.load();
			render.all();
		} else if (!_.isEmpty(gameMatch) && !_.isEmpty(dataMatch)) {
			// New game from data.
			state.setGame(gameMatch[1]);
			link.setStateFromData(dataMatch[1]);
			state.save();
			render.all();
		} else {
			render.newGame();
		}
	} else {
		render.newGame();
	}
	
	link.cleanURL();
}); 
const link = {

	// Clean the URL.
	cleanURL: () => {
		const newUrl =`${window.location.protocol}//${window.location.host}${window.location.pathname}${!_.isEmpty(state.instanceId) ? ("?i=" + state.instanceId) : ""}`;
		window.history.pushState({ path: newUrl }, "", newUrl);
	},

	// Get the sharing URL.
	share: (instanceId, game, data) => {
		return `${window.location.protocol}//${window.location.host}${window.location.pathname}?i=${instanceId}&g=${game}&d=${data}`;
	},

	// Get an encoded string containing the deck and hand.
	getData: (deck, hand) => {

		// The cards are sorted by their position in the array, not their IDs.
		// So adding new cards doesn't break old saves, as long as they are at the end of the array. (Regardless of their IDs.)
		// Values in the deckBinary are prepended.
		// E.g. The deckBinary is 0011 if you have the first two cards but not the last two.
		let deckBinary = "";
		_.each(game.cards, (c, i) => {
			deckBinary = (_.any(deck, d => d == c.id) ? "1" : "0") + deckBinary;
		});

		// The data is the deck binary number, converted to base 36.
		let data = parseBigInt(deckBinary, 2).toString(36);

		// Do the same for the hand.
		let handBinary = "";
		_.each(game.cards, (c, i) => {
			handBinary = (_.any(hand, h => h == c.id) ? "1" : "0") + handBinary;
		});
		data += "_" + parseBigInt(handBinary, 2).toString(36);

		// The data is the deck number, then an underscore, then the hand number.
		return data;
	},

	// Set the game state from the string.
	setStateFromData: (data) => {

		// Add everything to deck for testing.
		const all = data == "*";
		if (all) {
			data = "*";
		}

		// Empty the deck and hand.
		state.deck.splice(0, state.deck.length);
		state.hand.splice(0, state.hand.length);

		// Parse the data into those binary numbers.
		// The start of the binary number is padded in case there are leading 0s, possibly from newly added cards.
		const deckBinary = parseBigInt(data.split("_")[0], 36).toString(2).padStart(game.cards.length, "0");
		_.each(game.cards, (c, i) => {
			// For each possible card, add to the deck it if it's a 1.
			if (deckBinary.substring(game.cards.length - 1 - i, game.cards.length - i) == 1 || all) {
				state.deck.push(c.id);
			}
		});

		// Do the same for the hand.
		const handBinary = parseBigInt(data.split("_")[1], 36).toString(2).padStart(game.cards.length, "0");
		_.each(game.cards, (c, i) => {
			if (handBinary.substring(game.cards.length - 1 - i, game.cards.length - i) == 1) {
				state.hand.push(c.id);
			}
		});
	},

}; 
// Simple Fast Counter.
// https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
sfc32 = (a, b, c, d) => {
	return () => {
		a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0;
		var t = (a + b) | 0;
		a = b ^ b >>> 9;
		b = c + (c << 3) | 0;
		c = (c << 21 | c >>> 11);
		d = d + 1 | 0;
		t = t + d | 0;
		c = c + t | 0;
		return (t >>> 0) / 4294967296;
	}
}

// 32-bit seed with optional XOR value.
var seed = (Math.random() * 100000) ^ 0xDEADBEEF;
// Pad seed with Phi, Pi and E.
// https://en.wikipedia.org/wiki/Nothing-up-my-sleeve_number
var rand = sfc32(0x9E3779B9, 0x243F6A88, 0xB7E15162, seed);
for (let i = 0; i < 15; i++) {
	rand();
}

// Get a big int from the string value and the specified base.
function parseBigInt(value, radix) {
	let size = 10,
			factor = BigInt(radix ** size),
			i = value.length % size || size,
			parts = [value.slice(0, i)];
	while (i < value.length) parts.push(value.slice(i, i += size));
	return parts.reduce((r, v) => r * factor + BigInt(parseInt(v, radix)), 0n);
} 
const render = {

	all: () => {
		game.renderDeck();
		render.hand();
		$("div#scroll")
			.html(_.isEmpty(state.hand) ? text("empty") : text("scroll"));
	},

	find: () => {
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

	card: (id) => {
		// Render a card generically, and then fill it with the game's content.
		const element = game.renderCard($("<div>")
			.attr("id", `card-${id}`))
			.addClass("card");

		const c = card.get(id);

		element.append(
			$("<div>")
				.addClass("tab round shadow tab-actions")
				.html(text("actions"))
				.click(() => {
					const show = element.find(".round-wide").css("display") == "none";
					render.clearTabs();
					if (show) {
						element.find(".tab-deck, .tab-hand, .tab-discard").css({ "display": "flex" });
					}
				})
		);

		if (!c.noHand && (!_.some(state.hand, h => h == id) || state.drawnCardId == id)) {
			element.append(
				$("<div>")
					.addClass("tab round-wide shadow tab-hand")
					.html(text("hand"))
					.click(() => card.move(id, state.hand))
			);
		}

		if (!c.noDeck) {
			element.append(
				$("<div>")
					.addClass("tab round-wide shadow tab-deck")
					.html(text("deck"))
					.click(() => card.move(id, state.deck))
			);
		}

		const index = _.findIndex(state.discard, d => d == id);
		if (!c.noDiscard) {
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

	clearTabs: () => {
		$(".tab-deck, .tab-hand, .tab-discard").css({ "display": "" });
	},

	hand: () => {
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

	menu: (content) => {
		// Show a menu with any content.
		$("#top").append(
			$("<div>")
				.addClass("menu")
				.append(content)
		);
		render.hideOptions();
	},

	closeMenu: () => {
		$(".menu").remove();
		render.showOptions();
	},

	newGame: () => {
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
			.append($("<div>")
				.attr("id", "start")
				.addClass("button shadow")
				.html(text("start")));
				
		$("#players")[0].focus();

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

	findCard: () => {
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
			.append($("<div>")
				.attr("id", "draw")
				.addClass("button shadow")
				.html(text("draw")));
				
		$("#id")[0].focus();

		$("#draw").click(() => {
			const id = parseInt($("#id").val());
			card.draw(id);
			if (state.drawnCardId == id) {
				render.closeMenu();
			}
		});

		$("#close").click(render.closeMenu);
	},

	hideOptions: () => {
		$(".option").css({ "visibility": "hidden" });
	},

	showOptions: () => {
		if (_.isNull(state.drawnCardId)) {
			$(".option").css({ "visibility": "visible" });
		}
	},

	preloadAssets: () => {
		_.each(game.assets(), a => {
			$("#preload").append(
				$(`<img src="${render.path(a)}">`)
					.attr("id", `preload-${a}`));
		});
	},

	path: (name) => {
		return `games/${game.assetPath}/images/${name
			.toLowerCase()
			.replaceAll("#n", "-")
			.replaceAll(" ", "-")
			.replaceAll(/<br>|[^0-9a-z-]/ig, "")
			}.png`;
	},
}; 
const state = {

	// Unique ID of the instance of a game.
	instanceId: "",

	// Card IDs currently in hand.
	hand: [],

	// Card IDs currently in all combined decks.
	deck: [],

	// Card IDs currently in discard pile.
	// The last element is the top of the pile.
	discard: [],

	// The currently drawn card.
	drawnCardId: null,

	// Time the game was started.
	started: null,

	// Is a menu open?
	menu: () => $(".menu").length > 0,

	// Store to local storage.
	save: () => {
		let gameData = {
			"deck": state.deck,
			"hand": state.hand,
			"discard": state.discard,
			"started": state.started || new Date().toLocaleString(),
			"game": game.code,
		};
		localStorage.setItem(state.instanceId, JSON.stringify(gameData));
	},

	load: () => {
		let gameData = JSON.parse(localStorage.getItem(state.instanceId));
		state.setGame(gameData.game || "b");
		state.deck = gameData.deck || [];
		state.hand = gameData.hand || {};
		state.discard = gameData.discard || [];
		state.started = gameData.started || new Date().toLocaleString();
	},

	setGame: (g) => {
		switch (g) {
			case betrayal_2e.code:
				game = betrayal_2e;
				break;
			case betrayal_2e_dom.code:
				game = betrayal_2e_dom;
				break;
		}
		document.title = game.displayName;
	},
}; 
const text = (id) => {
	switch(id) {

		case "intro": return game.text.intro || "Welcome to Dom's Decks. Use this page to play board games with custom digital cards."

		case "scroll": return game.text.scroll || "<i class='material-icons'>keyboard_double_arrow_down</i>\
		<span>Scroll down to see your hand of cards...<span>\
		<i class='material-icons'>keyboard_double_arrow_down</i>";

		case "empty": return game.text.empty || "<span>Your hand of cards is empty.<span>";

		case "hand": return game.text.hand || "<i class='material-icons'>front_hand</i> Keep in your hand";

		case "deck": return game.text.deck || "<i class='material-icons'>layers</i> Shuffle back into deck";

		case "discard": return game.text.discard || "<i class='material-icons'>delete</i> Place on discard pile";

		case "discardCancel": return game.text.discardCancel || "<i class='material-icons'>delete</i> Leave in discard pile";

		case "up": return game.text.up || "<i class='material-icons'>keyboard_arrow_up</i>";

		case "down": return game.text.down || "<i class='material-icons'>keyboard_arrow_down</i>";

		case "game": return game.text.game || "Select which game to play:";

		case "players": return game.text.players || "Select the number of players for the game:";

		case "start": return game.text.start || "Start";

		case "link": return game.text.link || "Send one unique link to each player. Each player must use a different link to play the game.";

		case "search": return game.text.search || "<i class='material-icons'>search</i>";

		case "find": return game.text.find || "Enter an card ID number (from the top-right of a card) to find and draw it, regardless of it's current location.";

		case "draw": return game.text.draw || "Draw";

		case "x": return game.text.x || "<i class='material-icons'>close</i>";

		case "actions": return game.text.x || "<i class='material-icons'>more_horiz</i>";

	};
}; 
const betrayal_2e = {

	displayName: "Betrayal at House on the Hill (2nd Edition)",

	assetPath: "betrayal-2e",

	code: "b",

	// What assets are there to preload?
	assets: () => _.uniq(["item", "event", "omen", "texture"]
		.concat(_.map(_.filter(game.cards, c => !c.noArt), c => c.asset || c.name))),

	text: {
		deck: "<i class='material-icons'>layers</i> Shuffle back into stack",
		haunt: "Make a haunt roll now.",
		trinket: "Draw a Trinket",
	},

	// All cards in the game.
	cards: [
		{
			id: 1001,
			type: "item",
			name: "Healing Salve",
			text: "#bA sticky paste in a shallow bowl.#dYou can apply the Healing Salve to yourself or to another living explorer in the same room. If that explorer's Might or Speed is below its starting value, raise one or both traits to its starting value.#n#nDiscard this item after you use it.",
		},
		{
			id: 1002,
			type: "item",
			name: "Amulet of the Ages",
			text: "#bAncient silver and inlaid gems, inscribed with blessings.#dGain 1 Might, 1 Speed, 1 Knowledge, and 1 Sanity now.#n#nLose 3 Might, 3 Speed, 3 Knowledge, and 3 Sanity if you lose the Amulet.",
		},
		{
			id: 1003,
			type: "item",
			name: "Idol",
			text: "#bPerhaps it's chosen you for some greater purpose. Like human sacrifice.#dOnce per turn, you can rub the Idol before making any trait, combat, or event roll to add 2 dice to the roll (to a maximum of 8 dice). Each time you do, lose 1 Sanity.",
		},
		{
			id: 1004,
			type: "item",
			name: "Blood Dagger",
			text: "#bA nasty weapon. Needles and tubes extend from the handle... and plunge right into your veins.#dYou roll 3 additional dice (maximum of 8 dice) when making a Might attack with this <i>weapon</i>. If you do, lose 1 Speed.#n#nYou can't use another <i>weapon</i> while you're using this one.#n#nThis item can't be traded or dropped. If it's stolen, take 2 dice of physical damage.",
		},
		{
			id: 1005,
			type: "item",
			name: "Rabbit's Foot",
			text: "#bNot so lucky for the rabbit.#dOnce during your turn, you can reroll 1 die. You must keep the second roll.",
		},
		{
			id: 1006,
			type: "item",
			name: "Axe",
			text: "#bVery sharp.#dYou roll 1 additional die (maximum of 8 dice) when making a Might attack with this <i>weapon</i>.#n#nYou can't use another <i>weapon</i> while you're using this one.",
		},
		{
			id: 1007,
			type: "item",
			name: "Sacrificial Dagger",
			text: "#bA twisted shard of iron covered in mysterious symbols and stained with blood.#dWhen making a Might attack with this <i>weapon</i>, you roll 3 extra dice (maximum of 8 dice), but you must make a Knowledge roll first:#r6+#tNo effect.#y#r3-5#tTake 1 mental damage.#y#r0-2#tThe dagger twists in your hand! Take 2 dice of physical damage. You can't attack this turn.#yYou can't use another <i>weapon</i> while you're using this one.",
		},
		{
			id: 1008,
			type: "item",
			name: "Dynamite",
			text: "#bThe fuse isn't lit... yet.#dInstead of attacking, you can throw the Dynamite through a connecting door into an adjacent room. Each explorer and monster with Might and Speed traits in that room must make a Speed roll:#r5+#tTake no damage from Dynamite.#y#r0-4#tTake 4 points of physical damage.#yDiscard this item after you use it.",
		},
		{
			id: 1009,
			type: "item",
			name: "Music Box",
			text: "#bA hand-crafted antique.#nIt plays a haunting melody that gets stuck in your head.#dOnce per turn, you can open or close the Music Box.#n#nWhile the Music Box is open, any explorer or monster with a Sanity trait that enters or starts its turn in the same room must make a Sanity roll of 4+. If the roll fails, the explorer or monster ends its turn as it is mesmerized by the music.#n#nIf an explorer or monster carrying the Music Box is mesmerized, it drops the Music Box. If the Music Box is open when it is dropped, it remains open.",
		},
		{
			id: 1010,
			type: "item",
			name: "Pickpocket's Gloves",
			text: "#bHelping yourself has never seemed so easy.#dWhen you are in the same room as another explorer, you can discard this item to take any item that explorer is carrying.",
		},
		{
			id: 1011,
			type: "item",
			name: "Medical Kit",
			text: "#bA doctor's bag, depleted in some critical resources.#d Once during your turn, you can make a Knowledge roll to heal yourself or another explorer in the same room:#r8+#tGain up to 3 points of physical traits.#y#r6-7#tGain up to 2 points of physical traits.#y#r4-5#tGain 1 point in a physical trait.#y#r0-3#tNothing happens.#yYou can't raise a trait above its starting value with the Medical Kit.",
		},
		{
			id: 1012,
			type: "item",
			name: "Bottle",
			text: "#bAn opaque vial containing a black liquid.#dOnce during your turn after the haunt is revealed, you can roll 3 dice and drink from the Bottle:#r6#tChoose a room and put your explorer there.#y#r5#tGain 2 Might and 2 Speed.#y#r4#tGain 2 Knowledge and 2 Sanity.#y#r3#tGain 1 Knowledge and lose 1 Might.#y#r2#tLose 2 Knowledge and 2 Sanity.#y#r1#tLose 2 Might and 2 Speed.#y#r0#tLose 2 from each trait.#yDiscard this item after you use it.",
		},
		{
			id: 1013,
			type: "item",
			name: "Revolver",
			text: "#bAn old, potent-looking weapon.#dYou can use this <i>weapon</i> to attack with Speed instead of Might. (Your opponent then defends with Speed and takes physical damage.) Roll 1 additional die on your Speed attack roll (maximum of 8 dice).#n#nWith the Revolver, you can attack anyone in the same room or within line of sight (through an uninterrupted straight line of doors). If you attack someone in another room and lose, you don't take damage.#n#nYou can't use another <i>weapon</i> while you're using this one.",
		},
		{
			id: 1014,
			type: "item",
			name: "Armor",
			text: "#bIt's just prop armor from a Renaissance fair, but it's still metal.#dAny time (not just once per turn) you take physical damage, take 1 less point of damage.#n#nThis item can't be stolen.",
		},
		{
			id: 1015,
			type: "item",
			name: "Dark Dice",
			text: "#bAre you feeling lucky?#dOnce per turn, you can roll 3 dice:#r6#tMove to the location of any explorer not revealed as a traitor.#y#r5#tMove one other explorer in the same room into an adjacent room.#y#r4#tGain 1 in a physical trait.#y#r3#tImmediately move into an adjacent room (no movement cost).#y#r2#tGain 1 in a mental trait.#y#r1#tDraw an event card.#y#r0#tReduce all of your traits to the lowest value above the skull symbol.#yDiscard the Dark Dice.",
		},
		{
			id: 1016,
			type: "item",
			name: "Angel Feather",
			text: "#bA perfect feather fluttering in your hand.#dWhen you make a roll of any kind, you can call out a number from 0 to 8. Use that number instead of rolling the dice.#n#nDiscard this item after you use it.",
		},
		{
			id: 1017,
			type: "item",
			name: "Lucky Stone",
			text: "#bA smooth, ordinary-looking rock. You sense it will bring you good fortune.#dAfter you make a roll of any kind, you can rub the stone once to reroll any number of those dice.#n#nDiscard this item after you use it.",
		},
		{
			id: 1018,
			type: "item",
			name: "Puzzle Box",
			text: "#bThere must be a way to open it.#dOnce during your turn, you can make a Knowledge roll to open the box:#r6+#tYou open the box. Draw 2 item cards and discard the Puzzle Box.#y#r0-5#tYou just can't get it open.#y",
		},
		{
			id: 1019,
			type: "item",
			name: "Smelling Salts",
			text: "#bWhew, that's a lungful.#dIf your or another living explorer's Knowledge is below its starting value, and you're in the same room, you can raise that trait to its starting value by using the Smelling Salts.#n#nDiscard this item after you use it.",
		},
		{
			id: 1020,
			type: "item",
			name: "Candle",
			text: "#bIt makes the shadows move-at least, you hope it's doing that.#dIf you draw an event card, roll 1 additional die (maximum of 8 dice) for that event's trait rolls.#n#nIf you have the Bell, Book, and Candle, gain 2 in each trait. The first time you lose one of those 3 items later in the game, lose 2 from each trait.",
		},
		{
			id: 1021,
			type: "item",
			name: "Bell",
			text: "#bA brass bell that makes a resonant clang.#dGain 1 Sanity now.#n#nLose 1 Sanity if you lose the Bell.#n#nOnce during your turn after the haunt is revealed, you can make a Sanity roll to use the Bell:#r5+#tMove any number of unimpeded heroes 1 space closer to you.#y#r0-4#tThe traitor can move any number of monsters 1 space closer to you. (If you are the traitor, this result has no effect.) If there is no traitor, all monsters move 1 space closer to you.#y",
		},
		{
			id: 1022,
			type: "item",
			name: "Adrenaline Shot",
			text: "#bA syringe containing a strange fluorescent liquid.#dBefore you make a trait roll, you can use this item to add 4 to the result of that roll.#n#nDiscard this item after you use it.",
		},
		{
			id: 2001,
			type: "event",
			name: "The Lost One",
			text: "#bA woman wearing a Civil War dress beckons to you.#nYou fall into a trance.#dMake a Knowledge roll. If the result is 5 or more, you break out of your trance and gain 1 Knowledge; otherwise, roll 3 dice to see where the Lost One leads you:#r6#tMove to the Entrance Hall.#y#r4-5#tMove to the Upper Landing.#y#r2-3#tMove to a new upper floor room.#y#r0-1#tMove to a new basement room.#yFor new rooms, draw from the stack, or move to the Entrance Hall if there are no rooms left.",
		},
		{
			id: 2002,
			type: "event",
			name: "The Voice",
			text: "#b<i>\"I'm under the floor,#nburied under the floor...\"#n#nThe voice whispers once, then is gone.#dMake a Knowledge roll:#r4+#tYou find something under the floor. Draw an item card.#y#r0-3#tYou dig and search for the voice, but to no avail.#y",
		},
		{
			id: 2003,
			type: "event",
			name: "The Walls",
			text: "#bThis room is warm.#nFlesh-like walls pulse with a steady heartbeat. Your own heart beats with the rhythm of the house. You are drawn into the walls... and emerge somewhere else.#dYou must draw the next room tile and put it in the house. Put your explorer in that room.",
		},
		{
			id: 2004,
			type: "event",
			name: "Webs",
			text: "#bCasually, you reach up to brush some webs aside... but they won't brush away. They cling.#dMake a Might roll:#r4+#tYou break free. Gain 1 Might and discard this card.#y#r0-3#tYou're stuck. Keep this card.#yIf you're stuck, you can't do anything until you're freed. Once during any explorer's turn (including you), they can make a Might roll to free you. A 4+ succeeds, but you don't gain the 1 Might. Anyone failing a roll can't move for the rest of that turn. After 3 unsuccessful attempts, you break free automatically. Discard this event once freed.",
		},
		{
			id: 2005,
			type: "event",
			name: "Whoops!",
			text: "#bYou feel a body under your foot. Before you can leap away from it, you're knocked over. A giggling voice runs away from you.#dOne of the item cards (not omens) in your hand has been stolen. You may choose which one, because picking at random using dice makes this event too annoying. Discard it.#n#nIf you have no items, then take no action.",
		},
		{
			id: 2006,
			type: "event",
			name: "Silence",
			text: "#bUnderground, everything goes silent. Even the sound of breathing is gone.#dEach explorer in the basement must make a Sanity roll.#r4+#tYou wait calmly for your hearing to return.#y#r1-3#tYou scream a silent scream.#nTake 1 die of mental damage.#y#r0#tYou freak out.#nTake 2 dice of mental damage.#y",
		},
		{
			id: 2007,
			type: "event",
			name: "Skeletons",
			text: "#bMother and child, still embracing.#dPut the Skeletons token in this room.#nTake 1 die of mental damage.#n#nOnce during an explorer's turn, if they are in this room, they can make a Sanity roll to search the Skeletons:#r5+#tDraw an item card.#nRemove the Skeletons token.#y#r0-4#tYou dig around, but find nothing.#nTake 1 die of mental damage.#y",
		},
		{
			id: 2008,
			type: "event",
			name: "Smoke",
			text: "#bSmoke billows around you.#nYou cough, wiping away tears.#dPut the Smoke token in this room. The Smoke blocks line of sight from adjacent rooms. An explorer rolls 2 fewer dice (minimum of 1 die) on all trait rolls while in this room.",
		},
		{
			id: 2009,
			type: "event",
			name: "Something hidden",
			text: "#bThere's something odd about this room, but what? It's tickling the back of your mind.#dIf you want to try to figure out what's odd, make a Knowledge roll:#r4+#tA section of wall slides away, revealing an alcove. Draw an item card.#y#r0-3#tYou can't figure it out, and that makes you a bit crazy.#nLose 1 Sanity.#y",
		},
		{
			id: 2010,
			type: "event",
			name: "Something Slimy",
			text: "#bWhat's around your ankle?#nA bug? A tentacle?#nA dead hand clawing?#dMake a Speed roll:#r4+#tYou break free. Gain 1 Speed.#y#r1-3#tLose 1 Might.#y#r0#tLose 1 Might and 1 Speed.#y",
		},
		{
			id: 2011,
			type: "event",
			name: "Spider",
			text: "#bA spider the size of a fist lands on your shoulder... and crawls into your hair.#dMake a Speed roll to brush it away or a Sanity roll to stand still:#r4+#tIt's gone. Gain 1 in the trait you used to make this roll.#y#r1-3#tIt bites you. Take 1 die of physical damage.#y#r0#tIt takes a chunk out of you.#nTake 2 dice of physical damage.#y",
		},
		{
			id: 2012,
			type: "event",
			name: "The Beckoning",
			text: "#bOutside.#nYou must get outside.#nFly to freedom!#dEach explorer in the Gardens, Graveyard, Tower, on the Balcony, or in a room with an outside-facing window must make a Sanity roll:#r3+#tYou back away from the ledge.#y#r0-2#tYou jump to the Patio. (If it isn't in the house, search the room stack for it, put it in the house, and shuffle that stack.) Put your explorer there and take 1 die of physical damage.#y",
		},
		{
			id: 2013,
			type: "event",
			name: "Night View",
			text: "#bYou see a vision of a ghostly couple walking the grounds, silently strolling in their wedding best.#dMake a Knowledge roll:#r5+#tYou recognize the ghosts as former inhabitants of the house. You call their names, and they turn to you, whispering dark secrets of the house. Gain 1 Knowledge.#y#r0-4#tYou pull back in horror, unable to watch.#y",
		},
		{
			id: 2014,
			type: "event",
			name: "Phone Call",
			text: "#bA phone rings in the room.#nYou feel compelled to answer it.#dRoll 2 dice. A sweet little granny voice says:#r4#t<i>\"Tea and cakes! Tea and cakes! You always were my favorite!\"</i>#nGain 1 Sanity.#y#r3#t<i>\"I'm always here for you, Pattycakes. Watching...\"</i>#nGain 1 Knowledge.#y#r1-2#t<i>\"I'm here, Sweetums! Give us a kiss!\"</i>#nTake 1 die of mental damage.#y#r0#t<i>\"Bad little children must be punished!\"</i>#nTake 2 dice of physical damage.#y",
		},
		{
			id: 2015,
			type: "event",
			name: "Posession",
			text: "#bA shadow separates from the wall. As you stand in shock, the shadow surrounds you and chills you to the core.#dYou must choose any one trait and make a roll for that trait:#r4+#tYou resist the shadow's corruption. Gain 1 in a trait of your choice.#y#r0-3#tThe shadow drains your energy. The chosen trait drops to its lowest value. (It doesn't drop to the skull.) If that trait is already at its lowest value, lower a different trait to its lowest value.#y",
		},
		{
			id: 2016,
			type: "event",
			name: "Revolving Wall",
			text: "#bThe wall spins to another place.#dPlace the Wall Switch token on a solid wall or corner of this room, draw a room tile for this floor and place it on the other side, then put your explorer in that room. (Discard this card if it's not possible.)#n#nOnce during an explorer's turn, they can can make a Knowledge roll to find the Wall Switch from either side:#r3+#tThat explorer finds the hidden switch and moves to the other room. This doesn't count as moving a space.#y#r0-2#tThat explorer can't find the hidden switch and can't go through.#y",
		},
		{
			id: 2017,
			type: "event",
			name: "Rotten",
			text: "#bThe smell in this room, it's horrible.#nSmells like death, like blood.#nA slaughterhouse smell.#dMake a Sanity roll:#r5+#tTroubling odors, nothing more.#nGain 1 Sanity.#y#r2-4#tLose 1 Might.#y#r1#tLose 1 Might and 1 Speed.#y#r0#tYou double over with nausea.#nLose 1 Might, 1 Speed,1 Knowledge, and 1 Sanity.#y",
		},
		{
			id: 2018,
			type: "event",
			name: "Secret Passage",
			text: "#bA section of the wall slides away.#nBehind it, a moldy tunnel awaits.#dPut a Secret Passage token in this room. Roll 3 dice and place the second Secret Passage token in:#r6#tAny existing room.#y#r4-5#tAny existing upper floor room.#y#r2-3#tAny existing ground floor room.#y#r0-1#tAny existing basement room.#yYou can then use the Secret Passage, even if you don't have any movement left.#n#nAny explorer can use the Secret Passage on their turn, counting as moving one space.",
		},
		{
			id: 2019,
			type: "event",
			name: "Secret Stairs",
			text: "#bA horrible creaking sound echoes around you. You've discovered a secret stairwell.#dPut one Secret Stairs token in this room and a second Secret Stairs token in an existing room on another floor. Moving from one Secret Stairs token to the other counts as moving one space. (The stairs don't count as a space.)#n#nYou can follow the stairs right now, even if you don't have any movement left. If you do follow them this turn, draw an event card in the new room.",
		},
		{
			id: 2020,
			type: "event",
			name: "Shrieking Wind",
			text: "#bThe wind picks up, a slow crescendo to a screeching howl.#dEach explorer in the Gardens, Graveyard, Patio, Tower, on the Balcony, or in a room with an outside-facing window, must make a Might roll:#r5+#tYou keep your footing.#y#r3-4#tThe wind knocks you down.#nTake 1 die of physical damage.#y#r1-2#tThe wind chills your soul.#nTake 1 die of mental damage.#y#r0#tThe wind knocks you down hard. Discard one of your items, or if you don't have any, take 1 die of physical damage.#y",
		},
		{
			id: 2021,
			type: "event",
			name: "Jonah's Turn",
			text: "#bTwo boys are playing with a wooden top. <i>\"Would you like a turn, Jonah?\"</i> one asks.#n#n<i>\"No,\"</i> says Jonah, <i>\"I want all the turns.\"</i> Jonah takes the top and hits the other boy in the face. The boy falls. Jonah keeps hitting him as they fade from view.#dIf an explorer has the Puzzle Box or Nice Thingy, that explorer discards that item and draws a replacement item for it. If this happens, you gain 1 Sanity; otherwise, you take 1 die of mental damage.",
		},
		{
			id: 2022,
			type: "event",
			name: "Lights Out",
			text: "#bYour flashlight goes out.#nDon't worry, someone else has batteries.#dKeep this card. You can move only 1 space each turn until you end your turn in the same room as another explorer. At the end of that turn, discard this card. Then you can move normally again.#n#nIf you have the Candle or Map, or end your turn in the Furnace Room, discard this card.",
		},
		{
			id: 2023,
			type: "event",
			name: "Locked Safe",
			text: "#bBehind a portrait is a wall safe.#nIt is trapped, of course.#dPut the Safe token in this room.#n#nOnce during an explorer's turn, that explorer can make a Knowledge roll to open the Safe:#r5+#tDraw 2 item cards and remove the Safe token.#y#r2-4#tTake 1 die of physical damage.#nThe Safe won't open.#y#r0-1#tTake 2 dice of physical damage.#nThe Safe won't open.#y",
		},
		{
			id: 2024,
			type: "event",
			name: "Mists from the Walls",
			text: "#bMists pour out from the walls.#nThere are faces in the mist, human and... inhuman.#dEach explorer in the basement must make a Sanity roll:#r4+#tThe faces are tricks of light and shadow. All is well.#y#r1-3#tTake 1 die of mental damage (and 1 additional die of damage if that explorer is in a room with an event symbol).#y#r0#tTake 1 die of mental damage (and 2 additional dice of damage if that explorer is in a room with an event symbol).#y",
		},
		{
			id: 2025,
			type: "event",
			name: "Mystic Slide",
			text: "#bPASS TO THE LEFT IF YOU'RE IN THE BASEMENT.#n#nThe floor falls from under you.#dPlace the Slide token in this room, then make a Might roll to use the Slide.#r5+#tYou control the Slide. Move to any explored room on any floor below.#y#r0-4#tMove to a new basement room, or choose a basement room if none are left in the stack. You fall to that room and take 1 die of physical damage. If it's not your turn, don't draw a card for that room.#yKeep this card. Any explorer can make this roll to use the Slide.",
		},
		{
			id: 2026,
			type: "event",
			name: "Grave Dirt",
			text: "#bThis room is covered in a thick layer of dirt. You cough as it gets on your skin and in your lungs.#dMake a Might roll:#r4+#tYou shake it off. Gain 1 Might.#y#r0-3#tSomething is wrong. Keep this card. Take 1 point of physical damage at the start of each of your turns. Discard this card if an item card increases one of your traits or if you end your turn in the Balcony, Gardens, Graveyard, Gymnasium, Larder, Patio, or Tower.##y",
		},
		{
			id: 2027,
			type: "event",
			name: "Groundskeeper",
			text: "#bYou turn to see a man in groundskeeper clothing.#nHe raises his shovel and charges. Inches from your face, he disappears, leaving muddy footprints, and nothing more.#dMake a Knowledge roll. (An explorer in the Gardens rolls 2 fewer dice on this roll.)#r4+#tYou find something in the mud.#nDraw an item card.#y#r0-3#tThe groundskeeper reappears and strikes you in the face with the shovel. The player on your right rolls a Might 4 attack for the Groundskeeper. You defend against this attack as normal, by rolling dice equal to your Might.#y",
		},
		{
			id: 2028,
			type: "event",
			name: "Hanged Men",
			text: "#bA breeze chills the room.#nBefore you, three men hang from frayed ropes. They stare at you with cold, dead eyes.#nThe trio swing silently, then fade into dust that falls to the ground. You start to choke.#n#nMake a roll for each trait:#r2+#tThat trait is unaffected.#y#r0-1#tLose 1 from that trait.#yIf you roll a 2+ on all 4 rolls, gain 1 additional point in a trait of your choice.",
		},
		{
			id: 2029,
			type: "event",
			name: "Hideous Shriek",
			text: "#bIt starts like a whisper, but ends in a soul-rending shriek.#dEach explorer must make a Sanity roll:#r4+#tYou resist the sound.#y#r1-3#tTake 1 die of mental damage.#y#r0#tTake 2 dice of mental damage.#y",
		},
		{
			id: 2030,
			type: "event",
			name: "Image in the Mirror",
			text: "#bPASS TO THE LEFT IF YOU DON'T HAVE ANY ITEMS.#n#nThere is an old mirror in this room.#nYour frightened reflection moves on its own. You realize it is you from another time. You need to help your reflection, so you write on the mirror:#n#n<i>THIS WILL HELP</i>#n#nYou then hand an item through the mirror.#dChoose one of your item cards (not an omen card) and shuffle it into the item stack. Gain 1 Knowledge.",
		},
		{
			id: 2031,
			type: "event",
			name: "Image in the Mirror", // TODO: It's great when both mirror cards are used in the game. Add a third mirror card somehow. Maybe you witness the handover from afar. But then it's not mirror related? Maybe you meet a man polishing a mirror, who tells you it's secret, and you can choose to smash it?
			text: "#bThere is an old mirror in this room.#nYour frightened reflection moves on its own. You realize it is you from another time. Your reflection writes on the mirror:#n#n<i>THIS WILL HELP</i>#n#nThen it hands you an item through the mirror.#dDraw an item card.",
		},
		{
			id: 2032,
			type: "event",
			name: "It is Meant to Be",
			text: "#bYou collapse to the floor, visions of the future pouring through your head.#n#nYOU MUST CHOOSE...#dDraw up to 5 cards from the item, omen or event stacks. For each card, either shuffle it back into it's stack or choose to stop drawing and discard it. The next card anyone draws of that type, is your chosen card. (They can use the <i class='material-icons'>search</i> button to find it.)#cRoll 4 dice and remember the result. You can use that number once instead of making a die roll. (Respect the maximum possible result if necessary.)",
		},
		{
			id: 2033,
			type: "event",
			name: "Creepy Crawlies",
			text: "#bExactly one thousand bugs spill out on your skin, under your clothes, and in your hair.#dMake a Sanity roll:#r5+#tYou blink, and they're gone.#nGain 1 Sanity.#y#r1-4#tLose 1 Sanity.#y#r0#tLose 2 Sanity.#y",
		},
		{
			id: 2034,
			type: "event",
			name: "Creepy Puppet",
			text: "#bYou see one of those dolls that give you the willies.#nIt jumps at you with a tiny spear.#dThe player on your right rolls a Might 4 attack for the Creepy Puppet. You defend against this attack as normal, by rolling dice equal to your Might.#n#nIf you take any damage from this attack, explorers with the Spear or Pitchfork gain 2 Might (except for you).",
		},
		{
			id: 2035,
			type: "event",
			name: "Debris",
			text: "#bPlaster falls from the walls and ceiling.#dMake a Speed roll:#r3+#tYou dodge the plaster.#nGain 1 Speed.#y#r1-2#tYou're buried in debris.#nTake 1 die of physical damage.#y#r0#tYou're buried in debris.#nTake 2 dice of physical damage.#yIf you're buried, you can't do anything until you're freed. Once during any explorer's turn (including you), they can make a Might roll to free you. A 4+ succeeds. After 3 unsuccessful attempts, you break free automatically. Discard this event once freed.",
		},
		{
			id: 2036,
			type: "event",
			name: "Disquieting Sounds",
			text: "#bA baby's cry, lost and abandoned.#nA scream.#nThe crack of breaking glass.#nThen silence.#dRoll 6 dice. If you roll equal to or more than the number of omens that have been revealed, you gain Sanity. If not, take 1 die of mental damage.#n#n(Note from the editor: aren't all sounds <i>disquieting</i>?)",
		},
		{
			id: 2037,
			type: "event",
			name: "Drip...#nDrip...#nDrip...",
			text: "#bA rhythmic sound that needles at your brain.#dPut the Drip token in this room.#n#nEach explorer rolls 1 fewer die (minimum of 1) on all trait rolls while in this room.",
		},
		{
			id: 2038,
			type: "event",
			name: "Footsteps",
			text: "#bThe floorboards slowly creak.#nDust rises. Footprints appear on the dirty floor. And then, as they reach you, they are gone.#dRoll 1 die. (An explorer in the Chapel rolls 1 additional die on this roll.)#r4#tYou and the nearest explorer gain 1 Might.#y#r3#tYou gain 1 Might, and the nearest explorer loses 1 Sanity.#n#n2 Lose 1 Sanity.#y#r1#tLose 1 Speed.#y#r0#tEach explorer loses 1 point from a trait of his or her choice.#y",
		},
		{
			id: 2039,
			type: "event",
			name: "Funeral",
			text: "#bYou see an open coffin.#nYou're inside it.#dMake a Sanity roll:#r4+#tYou blink, and it's gone.#nGain 1 Sanity.#y#r2-3#tThe vision disturbs you.#nLose 1 Sanity.#y#r0-1#tYou're really in that coffin.#nLose 1 Sanity and 1 Might as you dig yourself out. If the Graveyard or the Crypt has been found, put your explorer in one of those rooms (you choose which one).#y",
		},
		{
			id: 2040,
			type: "event",
			name: "A Moment of Hope",
			text: "#bSomething feels strangely right about this room. Something is resisting the evil of the house.#dPlace the Blessing token in this room.#n#nEach hero rolls 1 additional die (maximum of 8 dice) on all trait rolls while in this room.",
		},
		{
			id: 2041,
			type: "event",
			name: "Angry Being",
			text: "#bIt emerges from the slime on the wall next to you.#dMake a Speed roll:#r5+#tYou get away. Gain 1 Speed.#y#r2-4#tTake 1 die of mental damage.#y#r0-1#tTake 1 die of mental damage and 1 die of physical damage.#y",
		},
		{
			id: 2042,
			type: "event",
			name: "Bloody Vision",
			text: "#bThe walls of this room are damp with blood.#nThe blood drips from the ceiling, down the walls, over the furniture, and onto your shoes.#nIn a blink, it is gone.#dMake a Sanity roll:#r4+#tYou steel yourself. Gain 1 Sanity.#y#r2-3#tLose 1 Sanity.#y#r0-1#tIf an explorer or monster is in your room or an adjacent one, you must attack it (if you can). Choose the explorer with the lowest Might, if possible.#y",
		},
		{
			id: 2043,
			type: "event",
			name: "Burning Man",
			text: "#bA man on fire runs through the room. His skin bubbles and cracks, falling away from him and leaving a fiery skull that clatters to the ground, bounces, rolls, and disappears.#dMake a Sanity roll:#r4+#tYou feel a little hot under the collar, but otherwise fine.#nGain 1 Sanity.#y#r2-3#tOut, out, you must get out.#nPut your explorer in the Entrance Hall.#y#r0-1#tYou burst into flames!#nTake 1 die of physical damage. Then take 1 die of mental damage as you put out the flames.#y",
		},
		{
			id: 2044,
			type: "event",
			name: "Closet Door",
			text: "#bThat closet door is open... just a crack. There must be something inside.#dPut the Closet token in this room.#n#nOnce during an explorer's turn, that explorer can roll 2 dice to open the Closet:#n#n4 Draw an item card.#n#n2-3 Draw an event card.#n#n0-1 Draw an event card and remove the Closet token.",
		},
		{
			id: 2045,
			type: "event",
			name: "What The...?",
			text: "#bAs you look back the way you came, you see... nothing.#nJust empty fog and mist where a room used to be.#dPick up the tile for the room you are in. Put it somewhere else on the same floor of the house so its door is attached to a different unexplored doorway. If there isn't an unexplored doorway on this floor, move the room to a different floor.",
		},
		{
			id: 3001,
			type: "omen",
			name: "Spirit Board",
			text: "#bA board with letters and numbers to call the dead.#dBefore you move during your turn, you can look at the top tile of the room stack.#n#nIf you use the Spirit Board after the haunt has been revealed, the traitor can move any number of monsters 1 space closer to you. (If you are the If the traitor, you don't have to move those monsters.) If there is no traitor, all monsters move 1 space closer to you.",
		},
		{
			id: 3002,
			type: "omen",
			name: "Spear",
			text: "#bA weapon pulsing with power.#dYou roll 2 additional dice (maximum of 8 dice) when making a Might attack with this <i>weapon</i>.#n#nYou can't use another <i>weapon</i> while you're using this one.",
		},
		{
			id: 3003,
			type: "omen",
			name: "Skull",
			text: "#bA skull, cracked and missing teeth.#dIf you take mental damage, you can take all of it as physical damage instead.",
		},
		{
			id: 3004,
			type: "omen",
			name: "Ring",
			text: "#bA battered ring with an incomprehensible inscription.#dIf you attack an opponent that has a Sanity trait, you can attack with Sanity instead of Might. (Your opponent then defends with Sanity, and damage is mental instead of physical.)",
		},
		{
			id: 3005,
			type: "omen",
			name: "Medallion",
			text: "#bA medallion inscribed with a pentagram.#dYou are immune to the effects of the Pentagram Chamber, Crypt, and Graveyard.",
		},
		{
			id: 3006,
			type: "omen",
			name: "Mask",
			text: "#bA somber mask to hide your intentions.#dOnce during your turn, you can make a Sanity roll to use the Mask:#r4+#tYou can put on or take off the Mask.#yIf you put on the Mask, gain 2 Knowledge and lose 2 Sanity.#n#nIf you take off the Mask, gain 2 Sanity and lose 2 Knowledge.#r0-3#tYou can't use the Mask this turn.#y",
		},
		{
			id: 3007,
			type: "omen",
			name: "Madman",
			text: "#bA raving, frothing madman.#dGain this <i>companion</i> and 2 Might, but lose 1 Sanity now.#n#nThis omen can't be dropped, traded, or stolen. Lose 2 Might and gain 1 Sanity if you lose custody of the Madman.",
		},
		{
			id: 3008,
			type: "omen",
			name: "Holy Symbol",
			text: "#bA symbol of calm in an unsettling world.#dGain 2 Sanity now.#n#nLose 2 Sanity if you lose the Holy Symbol.",
		},
		{
			id: 3009,
			type: "omen",
			name: "Girl",
			text: "#bA girl.#nTrapped.#nAlone.#nYou free her!#dGain this <i>companion</i>, 1 Sanity and 1 Knowledge now.#n#nThis omen can't be dropped, traded, or stolen. Lose 1 Sanity and 1 Knowledge if you lose custody of the Girl.",
		},
		{
			id: 3010,
			type: "omen",
			name: "Dog",
			text: "#bThis mangy dog seems friendly.#nAt least you hope it is.#dGain this <i>companion</i>, 1 Might and 1 Sanity now.#n#nUse a small monster token to represent the Dog. Once during your turn the Dog can deliver or fetch 1 item up to 6 spaces away and then return. It isn't slowed by opponents, but can't carry movement slowing items, use one-way passages or rooms requiring a roll.#n#nThis omen can't be dropped, traded, or stolen. Lose 1 Might and 1 Sanity if you lose custody of the Dog.",
		},
		{
			id: 3011,
			type: "omen",
			name: "Crystal Ball",
			text: "#bHazy images appear in the glass.#dOnce during your turn during the haunt, you can make a Knowledge roll to predict the future:#r4+#tYou see the truth. Draw up to 3 cards from the event stack. For each card, either shuffle it back into the stack or choose to stop drawing and discard it. The next event card anyone draws, is your chosen card. (They can use the <i class='material-icons'>search</i> button to find it.)#y#r1-3#tYou avert your eyes. Lose 1 Sanity.#y#r0#tYou stare into Hell. Lose 2 Sanity.#y",
		},
		{
			id: 3012,
			type: "omen",
			name: "Book",
			text: "#bA diary or lab notes?#nAncient script or modern ravings?#dGain 2 Knowledge now.#n#nLose 2 Knowledge if you lose the Book.",
		},
		{
			id: 3013,
			type: "omen",
			name: "Bite",
			text: "#bA growl, the scent of death.#nPain. Darkness. Gone.#dWhen you draw this card, something bites you. The player on your right rolls a Might 4 attack against you for the mysterious something (before it runs away into the darkness). You defend against this attack as normal, by rolling dice equal to your Might.#n#nThis omen can't be dropped, traded, or stolen.",
		},
	],

	// Do the initial shuffling and dividing, and get the game states for each player.
	startGame: (count) => {
		/* 
		* Rules for this game:
		* There are item, omen and event decks which are kept separate.
		* The decks should each be shuffled and distributed evenly to each player.
		* So each player ends up with 3 decks, each with an even share of the cards.
		* The starting hand is empty.
		*/

		// Randomise order of cards and split them into types.
		// The order of arrays in shuffledCards is items, omens, events.
		const shuffledCards = [[], [], []];
		_.each(_.filter(game.cards, c => !c.noDraw), (c, i) => {
			let a = null;
			switch (c["type"]) {
				case "item":
					a = 0;
					break;
				case "event":
					a = 1;
					break;
				case "omen":
					a = 2;
					break;
			}
			shuffledCards[a].push(_.extend(c, { "rand": rand() }));
		});
		_.each(shuffledCards, (a, i) => {
			shuffledCards[i] = _.sortBy(a, c => c["rand"]);
		});

		const states = [];
		for (let p = 0; p < count; p++) {
			const deck = [];
			// For each player, fill the deck with their share of cards.
			_.each(shuffledCards, (a, i) => {
				_.each(a, (c, j) => {
					if (j % count == p) {
						deck.push(c.id);
					}
				});
			});

			// Starting deck is split evenly between players.
			// Starting hand is empty.
			states.push(link.getData(deck, []));
		}

		return states;
	},

	drawItem: () => {
		// Pick an item from the deck at random.
		if (state.menu()) { return; }
		const items = _.filter(state.deck, d => card.get(d).type == "item");
		card.draw(items[Math.floor(rand() * items.length)]);
	},

	drawOmen: () => {
		// Pick an omen from the deck at random.
		if (state.menu()) { return; }
		const omens = _.filter(state.deck, d => card.get(d).type == "omen");
		card.draw(omens[Math.floor(rand() * omens.length)]);
	},

	drawEvent: () => {
		// Pick an event from the deck at random.
		if (state.menu()) { return; }
		const events = _.filter(state.deck, d => card.get(d).type == "event");
		card.draw(events[Math.floor(rand() * events.length)]);

		if (state.drawnCardId == 2102 && !_.some(state.hand, x => x == 1135)) {
			card.move(1135, state.hand);
		}
	},

	// Render the decks used in the game into #top-content.
	renderDeck: () => {

		// Render the find button.
		if ($("#top-content div").length == 0) {
			render.find();

			// Render the decks.
			$("#top-content")
				.append(
					$("<div>")
						.addClass("deck")
						.attr("id", "items")
						.append($("<div>")
							.addClass("card-icon")
							.css({ "background-image": `url("${render.path("item")}")` }))
						.append($("<div>")
							.html("ITEM"))
						.append($("<div class='count' id='item-count'>")))
				.append(
					$("<div>")
						.addClass("deck")
						.attr("id", "events")
						.append($("<div>")
							.addClass("card-icon")
							.css({ "background-image": `url("${render.path("event")}")` }))
						.append($("<div>")
							.html("EVENT"))
						.append($("<div class='count' id='event-count'>")))
				.append(
					$("<div>")
						.addClass("deck")
						.attr("id", "omens")
						.append($("<div>")
							.addClass("card-icon")
							.css({ "background-image": `url("${render.path("omen")}")` }))
						.append($("<div>")
							.html("OMEN"))
						.append($("<div class='count' id='omen-count'>")))
				.append(
					$("<div>")
						.addClass("deck")
						.attr("id", "discard")
						.append($("<div>")
							.html("DISCARD<br>PILE"))
						.append($("<div class='count' id='discard-count'>")));

			// Bind events.
			$("#items").click(betrayal_2e.drawItem);
			$("#omens").click(betrayal_2e.drawOmen);
			$("#events").click(betrayal_2e.drawEvent);
			$("#discard").click(card.drawDiscard);

			$("body").addClass("betrayal-2e");

			betrayal_2e.updateDecks();
			render.preloadAssets();
		} else {
			betrayal_2e.updateDecks();
		}
	},

	updateDecks: () => {
		const itemCount = _.filter(state.deck, c => card.get(c).type == "item").length,
			eventCount = _.filter(state.deck, c => card.get(c).type == "event").length,
			omenCount = _.filter(state.deck, c => card.get(c).type == "omen").length,
			discardCount = state.discard.length;

		$("#item-count").html(`(${itemCount >= 10 ? "10+" : itemCount})`);
		$("#event-count").html(`(${eventCount >= 10 ? "10+" : eventCount})`);
		$("#omen-count").html(`(${omenCount >= 10 ? "10+" : omenCount})`);
		$("#discard-count").html(`(${discardCount >= 10 ? "10+" : discardCount})`);

		if (itemCount == 0) {
			$("#items").addClass("empty");
		} else {
			$("#items").removeClass("empty");
		}

		if (eventCount == 0) {
			$("#events").addClass("empty");
		} else {
			$("#events").removeClass("empty");
		}

		if (omenCount == 0) {
			$("#omens").addClass("empty");
		} else {
			$("#omens").removeClass("empty");
		}

		if (discardCount == 0) {
			$("#discard").addClass("empty");
		} else {
			$("#discard").removeClass("empty");
		}
	},

	// Add card content to $(element).
	renderCard: (element) => {
		let c = card.get(element.attr("id").replace("card-", ""));

		element
			.addClass(c["type"])
			.append($("<div>")
				.addClass("card-id")
				.html(c.id))
			.prepend(!c.noArt ? $(`<div>`)
				.addClass("card-art")
				.css({ "background-image": `url("${render.path(c.asset || c.name)}")` }) : null)
			.prepend($("<div>")
				.addClass("card-title")
				.html(c.name
					.replaceAll("#n", "<br>")))
			.append($("<div>")
				.addClass("card-text")
				.html(c.text
					.replaceAll("#b", "<div class='b'>")
					.replaceAll("#d", "</div><br>")
					.replaceAll("#r", "<div class='r'><div class='n'>")
					.replaceAll("#t", "</div><div class='o'>")
					.replaceAll("#y", "</div></div>")
					.replaceAll("#n", "<br>")
					.replaceAll("#c", "<div class='b c'>- OR -</div>")
					.replace(/(<br>)+$/, "")))
			.append($("<div>")
				.addClass("card-icon")
				.css({ "background-image": `url("${render.path(c.type)}")` }));

		if (c.type == "omen") {
			element.append($("<div>")
				.addClass("card-suffix")
				.html(betrayal_2e.text.haunt));
		}

		// Add the trinket button if required. Clunky, but used in a specific scenario.
		if (c.id == 1127 && _.filter(state.hand, x => x >= 1131 && x <= 1134).length < 4) {
			element.append($("<div>")
				.addClass("card-suffix button shadow")
				.attr("id", "trinket")
				.html(betrayal_2e.text.trinket)
				.click(() => {
					let trinketId = 1131
					while (trinketId <= 1134) {
						if (!_.some(state.hand, x => x == trinketId)) {
							card.move(trinketId, state.hand);
							break;
						} else {
							trinketId++;
						}
					}
					$("#trinket")
						.css({ "display": "none" });
					if (_.filter(state.hand, x => x >= 1131 && x <= 1134).length < 4) {
						setTimeout(() => {
							$("#trinket")
								.css({ "display": "" });
						}, 10000);
					}
				}));
		}

		return element;
	},
}; 
const betrayal_2e_dom = {

	displayName: "Betrayal at House on the Hill (2nd Edition) (Dom's Expansion)",

	assetPath: betrayal_2e.assetPath,

	code: "d",

	assets: betrayal_2e.assets,

	text: betrayal_2e.text,

	// All cards in the game.
	cards: betrayal_2e.cards.concat([
		{
			id: 1101,
			type: "item",
			name: "Raven",
			text: "#bNevermore.#dOnce at the start of each of your turns, if there are any dropped items on the floor you are on, you may choose to send this <i>companion</i> out to collect 1 dropped item from that floor, no matter the distance. You may not move during the turn.",
		},
		{
			id: 1102,
			type: "item",
			name: "Absinthe",
			text: "#bA bottle of vile absinthe. You have nothing to mix it with.#dAt the start of your turn you may drink the entire bottle to lose 2 Speed and Gain 2 Might.#n#nThe next time you lose a fight after drinking, your damage taken is reduced by 1, although the outcome of the fight doesn't change.#n#nDiscard this item after you use it.",
		},
		{
			id: 1103,
			type: "item",
			name: "Bible",
			text: "#bAn old and well used Bible.#nThe edges of the pages are crinkly and the paper has yellowed.#dAt the start of your turn you may read this if you wish to lose 2 Knowledge and gain 2 Sanity.#n#nAfter reading, you may avoid the roll the next time you are in the Pentagram Chamber.#n#nDuring this spooky evening there is only time for someone to read the Bible once, so discard this item after you use it.",
		},
		{
			id: 1104,
			type: "item",
			name: "Frog",
			text: "#bThis frog seems to hold himself in a distinguished manner.#dOnce per turn you may kiss the Frog and roll 3 dice:#r4-6#tEw, gross.#nTake 1 Mental damage.#y#r3#tThe Frog turns into a prince. How could this have happened? Did your kiss have magic powers or was it the placebo effect?#nGain 1 in every trait and then draw an item card.#nDiscard the prince.#y#r0-2#tEw, gross.#nTake 1 Physical damage.#y",
		},
		{
			id: 1105,
			type: "item",
			name: "Brain Implant",
			text: "#bSealed in sterile packaging is a syringe with a very wide and sharp needle. It's purpose it to inject a device the size of a grape into the brain through the back of the neck.#dAt the start of your turn, you may choose to inject yourself or any other human in the same room. They will gain 2 knowledge and lose 2 might, although it is never fatal.#n#nDiscard this item after you use it.",
		},
		{
			id: 1106,
			type: "item",
			name: "Potion of Speed",
			text: "#bIt smells of gasoline.#dAt the start of your turn you may quaff the entire Potion of Speed.#nYou will be able to move through 4 more rooms than normal that turn.#n(This does not affect your Speed when making rolls.)#nIt lasts until the end of your turn, whereupon you lose 1 Speed.#n#nDiscard this item after you use it.",
		},
		{
			id: 1107,
			type: "item",
			name: "Marvelous Medicine",
			text: "#bA jar of viscous purple medicine.#dDuring your turn you may ingest the Marvelous Medicine.#nThis will reduce your sanity by 2 and end your turn, but all of your other traits which are only 1 or 2 levels above the skull will increase by 2.",
		},
		{
			id: 1108,
			type: "item",
			name: "Holy Talisman",
			text: "#bWorn around the neck, this protects the wearer from evil and harm.#dWhen the haunt starts, or when discovered during the haunt, the wearer gains 2 in all traits which are only 1 or 2 levels above the skull.#n#nAfter the haunt has started this item can not be dropped, traded or stolen.",
		},
		{
			id: 1109,
			type: "item",
			name: "Phoenix Feather",
			text: "#bIs this from a real phoenix?#nOr is it a goose feather dipped in red ink?#dIf at any point one of your physical traits drops to the skull or the level above the skull, you immediately eat the feather and make a sanity roll:#r5+#tYou do not beleive in phoenixes and it has no effect.#y#r0-4#tYou beleive it will save you and that's all that matters.#nGain 3 in the trait you just lost.",
		},
		{
			id: 1110,
			type: "item",
			name: "Worm",
			text: "#bA slimy and gross worm.#nIt is of regular size and is not visibly supernatural in any way.#dthis <i>companion</i> has a speed of 2.#nThe worm can be instructed to move around and lie in wait. if any non-flying being passes through the room with the worm, the owner can declare <i>\"You stepped on my worm!\"</i> causing the target to be unable to move to any other rooms that turn. In this case, the worm is destroyed.",
		},
		{
			id: 1111,
			type: "item",
			name: "Map",
			text: "#bI solemnly swear I am going to be naughty.#dAt the start of your turn, and only before the haunt has been revealed, you may draw a tile and place it adjacent to the room you are currently in.#n#nIf it contains an omen, take 1 mental damage and then enter it and follow it's rules.#n#nOtherwise, you may choose to either gain one knowledge and end your turn, or enter the room and follow it's rules.#nIf you do not enter the room, the next explorer to enter it does not draw it's card. It is considered discovered already.",
		},
		{
			id: 1112,
			type: "item",
			name: "Ravenous Raccoon",
			text: "#bIt will eat <i>anything</i>.#dOnce at the start of each of your turns, you may feed any other 1 item to this <i>companion</i>. If you do, discard that item and gain 2 in all traits that are 1 level above the skull.#n#nThe Raccoon really likes Walnuts and proposes a trade: additionally draw an item card if you feed it a Walnut.",
		},
		{
			id: 1113,
			type: "item",
			name: "Gluttonous Gerbil",
			text: "#bIt's <i>nuts</i> for nuts.#dOnce at the start of each of your turns, you may feed any other 1 item to this <i>companion</i>. If you do, discard that item and gain 1 Sanity#n#nThe Gerbil really likes Walnuts and will be grateful to be fed any. Additionally gain 1 Might, 1 Speed and 1 Knowledge if you feed it a Walnut.",
		},
		{
			id: 1114,
			type: "item",
			name: "Walnut",
			text: "#bA walnut.#dOn it's own this item is of no use to you.",
		},

		{
			id: 1115,
			type: "item",
			name: "Walnut",
			text: "#bA walnut.#dOn it's own this item is of no use to you.",
		},
		{
			id: 1116,
			type: "item",
			name: "Secret Scroll",
			text: "#bA rolled up and wax sealed scroll - for your eyes only.#n#nDON'T READ ANY MORE ALOUD.#dThe scroll contains a secret technique for summoning items from afar. When the player to your left next draws an item from the stack, you can reaveal and use this scroll to immediately steal the item.#n#nYou may announce your intent to steal after they have read the card they have drawn. You do not need to be nearby in the house. They won't let an item so easily out of their grasp next time, so discard this item after you use it.",
		},
		{
			id: 1117,
			type: "item",
			name: "Secret Scroll",
			text: "#bA rolled up and wax sealed scroll - for your eyes only.#n#nDON'T READ ANY MORE ALOUD.#dThe scroll contains a secret technique for absorbing qi (chi) from afar. When the player to your right next makes a trait roll (not including attack or defence), you can reveal and use this scroll to reduce their score by 1 and then gain 1 in that trait yourself.#n#nIt will only work if you start to announce your intent to absorb qi while their dice are still in motion. You do not need to be nearby in the house. They won't lose focus so easily next time, so discard this item after you use it.",
		},
		{
			id: 1118,
			type: "item",
			name: "Secret Scroll",
			text: "#bA rolled up and wax sealed scroll - for your eyes only.#n#nDON'T READ ANY MORE ALOUD.#dThe scroll contains a secret technique for being in the limelight and being the centre of attention. When any other player next triggers an event, you can reveal and use this scroll to immediately trigger the event yourself instead of them. If the event demands you roll any dice, you may either add or remove 1 from the total score of the first roll.#n#nIt will only work if you announce your intent to make everything about you before the other player draws the event card themselves. You do not need to be nearby in the house. They won't let you steal the show so easily next time, so discard this item after you use it.",
		},
		{
			id: 1119,
			type: "item",
			name: "Secret Scroll",
			text: "#bA rolled up and wax sealed scroll - for your eyes only.#n#nDON'T READ ANY MORE ALOUD.#dThe scroll contains a secret technique for guiding the hands of fate. After you make a dice roll on behalf of your character of any kind (including haunt, attack and defence rolls for your own character), you can reveal and use this scroll to increase or decrease the total score by 1.#n#nFate may not be so kind to you next time, so discard this item after you use it.",
		},
		{
			id: 1120,
			type: "item",
			name: "Bag of Bees",
			text: "#bBuzzzzzzz...#dSomeone has left a bag here. The bag is full of bees. Who would do that?#n#nAt the start of your turn you may open it to unleash all the bees. They might be angry and it's probably best to run as fast possible, so gain 2 speed and lose 2 sanity.#n#nDiscard this item after you use it.",
		},
		{
			id: 1121,
			type: "item",
			name: "Dark Pact",
			text: "#bA mark on your arm forever.#dYou are tainted by this item, which has merged into your arm leaving a mark like a tattoo. When the haunt starts, before the nature of the haunt is revealed, discard this item and choose one of these effects:#n#nGain 3 in all traits that are 1 level above the skull.#cGain 1 in all traits below their starting levels.#n#nIf you find this item after the haunt starts, take 1 mental damage and discard it.#nThis item can't be dropped, traded, or stolen.",
		},
		{
			id: 1122,
			type: "item",
			name: "Refreshing Tonic", // TODO: deal with the rooms in these 4 cards.
			text: "#bCould be a nice way to clear your mind?#dWhile you are in the Study, Dining Hall or Games Room, you may drink the tonic to gain 1 Might.#n#nThis does not end your turn and you may continue to move if possible.#nDiscard this item after you use it.",
		},
		{
			id: 1123,
			type: "item",
			name: "Fresh Kicks",
			text: "#bA nice pair of shoes.#dWhile you are in the Bedroom, Closet or Statuary Corridor, you may put these on to gain 1 Speed.#n#nThis does not end your turn and you may continue to move if possible, taking into account your new speed.#nDiscard this item after you use it.",
		},
		{
			id: 1124,
			type: "item",
			name: "Words of Wisdom",
			text: "#bA short book about the basics of critical thinking. It has lots of pictures.#dWhile you are in the Library, Study or Office, you may read this to gain 1 Knowledge.#n#nThis does not end your turn and you may continue to move if possible.#nDiscard this item after you use it.",
		},
		{
			id: 1125,
			type: "item",
			name: "Nice Thingy",
			text: "#bYou're not sure what it is, but you like it.#dWhile you are in the Pentagram Chamber, Laboratory or Caverns, you may fondle this to reassure yourself and gain 1 Sanity.#n#nThis does not end your turn and you may continue to move if possible.#nDiscard this item after you use it.",
		},
		{
			id: 1126,
			type: "item",
			name: "Shark Tooth Necklace",
			text: "#bA necklace made with a series of different sized shark teeth. It makes the wearer look badass.#dGain 1 Speed while wearing it. Lose 1 Speed if you lose the necklace.#n#nIf the wearer has lost sanity due to a fear of sharks at any point in the game, they gain 2 Sanity, and the necklace can no longer be dropped, traded, or stolen.",
		},
		{
			id: 1127,
			type: "item",
			name: "Magpie",
			text: "#bOne for sorrow.#nTwo for joy.#dOnce at the start of each of your turns, you may choose to send this <i>companion</i> out to collect shiny trinkets. You may not move during the turn, but you gain 1 Trinket.#n#nAt any time on your turn, you may release the Magpie from your control, discard it, and draw as many items as you have trinkets, up to a maximum of 4. (You may then discard the trinkets as they are of no use to you.)",
		},
		{
			id: 1128,
			type: "item",
			name: "MacGuffin",
			text: "#bWhen you hold this, you are the most important character.#dWhen you pick up this item, gain 2 in all of your traits.#n#nAfter any of your traits decrease, lose an additional 2 in all of your traits, and drop the macguffin:#nIf you are in the basement, place it in the Basement Landing.#nIf you are on the ground floor, place it in the Foyer.#nIf you are upstairs, place it in the Upstairs Landing.",
		},
		{
			id: 1129,
			type: "item",
			name: "Sledgehammer",
			text: "#bIt's hammer time.#dOnce during your turn, you may destroy an adjacent room. Move everything in that room into the one you are currently in, and shuffle it back into the room stack. You may not use the Sledgehammer on the Foyer, the Basement Landing or the Upstairs Landing.",
		},
		{
			id: 1130,
			type: "item",
			name: "Escape Rope",
			text: "#bA shortcut to safety.#dAfter you discover a room in the basement, other than the basement landing, and the Basement Stairs have not been discovered yet, you may choose to draw the Basement Stairs from the room stack and place them adjacent to the room you are in. You can not move to them if you had to draw a card when you discovered a basement room. Shuffle the room stack after you have looked through it.",
		},
		{
			id: 1131,
			type: "item",
			name: "Trinket",
			text: "#bA shiny trinket of some sort.#dWithout the Magpie this item is of no use to you.",
			noDraw: true,
			noDeck: true,
		},
		{
			id: 1132,
			type: "item",
			name: "Trinket",
			text: "#bA shiny trinket of some sort.#dWithout the Magpie this item is of no use to you.",
			noDraw: true,
			noDeck: true,
		},
		{
			id: 1133,
			type: "item",
			name: "Trinket",
			text: "#bA shiny trinket of some sort.#dWithout the Magpie this item is of no use to you.",
			noDraw: true,
			noDeck: true,
		},
		{
			id: 1134,
			type: "item",
			name: "Trinket",
			text: "#bA shiny trinket of some sort.#dWithout the Magpie this item is of no use to you.",
			noDraw: true,
			noDeck: true,
		},
		{
			id: 1135,
			type: "item",
			name: "Elevator Key",
			text: "#bA strange man gave you this.#dThe Mystic Elevator can only be used if the bearer of this key is inside.",
			noDraw: true,
			noDeck: true,
		},
		{
			id: 1136,
			type: "item",
			name: "Pitchfork",
			text: "#bIn a pinch, this could be useful for stabbing.#dYou roll 1 additional dice (maximum of 8 dice) when making a Might attack with this <i>weapon</i>. When you do so, move to an adjacent explored room.#n#nYou can't use another weapon while you're using this one.",
		},
		{
			id: 1137,
			type: "item",
			name: "Blunderbuss",
			text: "#bThis is my boomstick.#dYou can use this <i>weapon</i> to attack with Speed instead of Might. (Your opponent then defends with Speed and takes physical damage.) Roll 1 additional die on your Speed attack roll (maximum of 8 dice).#n#nWith the Blunderbuss, you can't attack anyone in the same room, but you can attack anyone in another room within line of sight (through an uninterrupted straight line of doors). If you attack someone and lose, you don't take damage.#n#nYou can't use another weapon while you're using this one.",
		},
		{
			id: 2101,
			type: "event",
			name: "Gelevator's Curse",
			text: "#bWhat's this?#dYou find a laminated note conspicuously left on the floor in the middle of the room. <b>You may choose to read it, but if you start, you must not stop.</b>#n#n<i>My name is Mister Gelevator, of the Mystic Elevator.#n#nMy fantastical contraption, has a spooky action.#n#nWhen you step inside, you're destined for a ride.#n#nIf you close the doors, you'll travel between floors.#n#nIt's an actuated box that you cannot outfox.#n#nHanging by a cable, it will hold you if it's able.#n#nBut if there's any trouble, you might end up in rubble...#n#nAs this transitory room, sometimes goes kaboom!</i>#n#nReading this has activated the curse: the next use of the Mystic Elevator will be the last. Everyone inside will take 1 physical damage. Regardless of its outcome, and it will fall apart afterwards.",
		},
		{
			id: 2102,
			type: "event",
			name: "Gelevator's Key",
			text: "As you walk through the door you interrupt the business of a portly man in a neat uniform. He's muttering to himself. <i>\"If anybody cares, it's faster than the stairs...\"#n#n\"Oh, hello, have you considered taking my elevator? Here, this key will be of use to you.\"</i> He presses a small brass key into your palm and waddles away. <i>\"It's good fun for all, as long as you don't fall...\"</i>#n#nThe Elevator Key is added to your hand. From now on, the Mystic Elevator can only be used if the bearer of this key is inside.",
		},
		{
			id: 2103,
			type: "event",
			name: "Abduction",
			text: "#bArms grab you from behind.#nA bag goes over your head.#nDarkness.#dMake a roll of your worst trait:#r4+#tYou somehow escape. You are safe.#y#r0-3#tNobody will ever see <i>you</i> again, but <i>someone else</i> appears and they're wearing your clothes. Flip your character tile and reset all your traits to their defaults. If you rolled a 0, choose 1 trait to decrease by 1, otherwise increase a trait by 1.#y",
		},
		{
			id: 2104,
			type: "event",
			name: "Ratfather",
			text: "#bSqueak squeak?#dOut of the corner of your eye you spot a rat, walking on its hind legs through a crack in the skirting boards. A moment later it spots you and scurries back on all fours from whence it came. You don't quite believe yourself, but for that moment it appeared to be wearing a top hat and waistcoat.#n#nIf there have been no such other sightings, you doubt your own experience and lose 1 Sanity. Otherwise, gain 1 Knowledge.",
		},
		{
			id: 2105,
			type: "event",
			name: "Ratmother",
			text: "#bSqueak sqeak?#dYou hear a scrabbling noise emanating from a cabinet. You pull open the doors to find it mostly empty. A rat's tail quickly disappeares around a loose board in the back and you glimpse a streak of purple as though it was adorned with a ribbon bow. Left behind inside the cabinet is a miniature teacup, smaller than a thimble.#n#nIf there have been no such other sightings, you bang your head on the wooden door as you turn around and lose 1 Knowledge. Otherwise, gain 1 Knowledge.",
		},
		{
			id: 2106,
			type: "event",
			name: "Ratbrother",
			text: "#bSqueak squeak?#dA creaking noise from overhead grabs your attention. You look up to see the flickering silhouette of a rat cast against the wall by candlelight. It's hard to tell from the shadow but it might have been wearing boots and gloves, and possibly even a cloak. As you turn to look towards the candle, the shadow valishes with another creak.#n#nIf there have been no such other sightings, you get a stiff neck from looking around and lose 1 Speed. Otherwise, gain 1 Knowledge.",
		},
		{
			id: 2107,
			type: "event",
			name: "Ratsister",
			text: "#bSqueak squeak?#dOn a wooden beam overhead you see a rat, frozen in place, looking back at you. As you pass by underneath it, it scrabbles away and a tiny beret drops like a leaf beside you. How could this be? Can you pull yourself up to look for more miniature clothing?#n#nIf there have been no such other sightings, you pull a muscle while climbing and lose 1 Might. Otherwise, gain 1 Knowledge.",
		},
		{
			id: 2108,
			type: "event",
			name: "Hidden Treasure",
			text: "Crudely scratched into the wall is a confusing ridde:#n#n#bI<i>f treasure be for thee...#na tree thou will see...#nand smells of the sea...#ntwas found in the quay.</i>#dMake a Knowledge roll:#r4+#tYou understand the riddle perfectly and find the treasure.#nDraw an item card.#y#r0-3#tThe riddle is meaningless to you. You puch the wall in frustration.#nLose 1 Might.#y",
		},
		{
			id: 2109,
			type: "event",
			name: "Enthusiastic Jogger",
			text: "#bIt gets easier, but you've got to do it every day.#dWhile creeping through the house a wiry old man wearing running clothes and a pink headband catches up with you. He stops to talk but keeps jogging on the spot. He gives you a pep talk about always keeping a spring in your step. Gain 1 Speed.#n#nWhen you tell your friends about the encounter, they tell you there used to be an old jogging man in the house... But he died years ago!",
		},
		{
			id: 2110,
			type: "event",
			name: "Piranha",
			text: "#bDeadly in numbers.#dYou come across a pile of dry bones. One by one you arrange them on the floor until they form the skeleton of an enormous piranha. From head to tail it must be three feet long. Fear takes hold of you as you worry that such a beast may be lurking in the gloomy waters of nearby rivers and lakes. Then a comforting thought comes to mind: these piranha have been dead for thousands of years! Gain 1 sanity.",
		},
		{
			id: 2111,
			type: "event",
			name: "Goo",
			text: "#bGloopy, viscous, slimy.#dYou're covered in goo.#nIt oozed up through the floor.#nIt dripped down from the ceiling.#nIt splatted in through the windows.#nNow you're all sticky.#nLose 1 Speed.",
		},
		{
			id: 2112,
			type: "event",
			name: "Shark",
			text: "#bGet out of the water.#dFor some reason, you are overcome with the fear that a shark wants you eat you. The house on the hill is far from the ocean, and yet it plays on your mind. Lose 1 Sanity, and always remember the shark.",
		},
		{
			id: 2113,
			type: "event",
			name: "Rotten Gasses",
			text: "#bStinky dead rats.#dA foul odour fills the air, you choke and stumble around, growing dizzy as your vision darkens. You gasp for air despite the smell. The lack of oxygen cant be good for your brain. Lose 1 Knowledge.",
		},
		{
			id: 2114,
			type: "event",
			name: "Self-Flagellation",
			text: "#b<i>\"We are all sinners in the eyes of the lord.\"</i>#dA man kneels before you, whipping his back until it's raw. He invites you to join him in his act of penitence.#n#n#bYOU MUST CHOOSE...#dJoin him and absolve yourself of you sins. Gain 1 die of Sanity and take 1 physical damage.#cBack away and leave this freak alone.",
		},
		{
			id: 2115,
			type: "event",
			name: "Fuming Chef",
			text: "You hear bangs and crashes from the next room. A red-faced chef bursts through the door and thrusts a platter of steak tartare at you. <i>\"You wanted the meat did you!? Well here's your ruddy meat!\"</i> You're not brave enough to say you didn't order it.#n#n#bYOU MUST CHOOSE...#dEat it. Gain 1 die of Might and take 1 mental damage.#cHide the meat in and around various nearby objects so he thinks you ate it, then run away as soon as possible.",
		},
		{
			id: 2116,
			type: "event",
			name: "Nerd!",
			text: "A rude hooting from behind has you startled. You turn around to see some laughing childen. <i>\"Get a load of that nerd\"</i>, they say. You look around to see who they were laughing at, but you're alone. They were laughing at you.#n#n#bYOU MUST CHOOSE...#dAccept that you are indeed a nerd, gain 1 die of Knowledge and take 1 physical damage.#cRun away and try not to think about it. Move into the nearest room that has already been revealed.",
		},
		{
			id: 2117,
			type: "event",
			name: "The Whispering",
			text: "#bPssst...#dA disembodied whispering voice asks you to trust it. It asks you to do what it says.#n#n#bYOU MUST CHOOSE...#dResist, block it out of your mind and gain 1 Might.#cListen to what is has to say. Accept it's word as truth and gain 1 Knowledge.",
		},
		{
			id: 2118,
			type: "event",
			name: "Wake Up",
			text: "Rain lashes down outside. A broken mirror repairs itself before you eyes. Upon touching the mirror, reality starts to fall apart. You feel a force on the back of your skull, not pulling you backwards, but pulling you out of this world. Gasping and spluttering you wake up in a gooey pod on an impossibly tall tower. Lightning crackles as countless human bodies are harvested for their energy by ruthless machines. As a spider-bot approaches, you panic and jab the headjack back into your brain, lie down and pretend to be asleep. You're back in the house, and hopefully your little awakening wasn't noticed by our A.I. overlords.#n#n#bYOU MUST CHOOSE...#dRemember that the air you're breathing isn't real. Gain 1 Speed.#cForget about what happened to you. Trust in your perception of reality and gain 1 Sanity.",
		},
		{
			id: 2119,
			type: "event",
			name: "Highwayman",
			text: "#bYour money or your life.#dA masked bandit chases you down and threatens you with a bad time if you don't hand over something of value. He kisses you on the back of your hand and you have confusing saucy thoughts about this daring rogue.#n#n#bYOU MUST CHOOSE...#dCapitulate and discard an item card from your hand.#cStruggle for freedom and take 1 physical damage.",
		},
		{
			id: 2120,
			type: "event",
			name: "Tithe",
			text: "#bDonations welcome to help fight the evil in this house.#dOn display is a velvet bag hanging from a sign.#n#n#bYOU MUST CHOOSE...#dProvide a donation by discarding an item card from your hand.#cTake 1 mental damage.#cTake 3 mental damage and steal an item from the bag. Draw an item card.",
		},		
		{
			id: 2121,
			type: "event",
			name: "Contaminated Snake",
			text: "A radioactive contaminated snake has broken loose. You've found its empty crate but there's no sign of which way it went. Make a Might roll:#r4+#tNever mind. You'll probably explode it later.#y#r0-3#tYou know that you won't be strong enough to fight it, if you come across it in the house. Take 1 mental damage now.#y",
		},
		{
			id: 2122,
			type: "event",
			name: "Liminal Space",
			text: "#bWhere am I?#dAs you look around the room, all seems normal. You glance down at your watch, then look up again. The room looks nothing like it did a moment ago, and you find yourself in a totally unfamiliar space.#n#nTake the next basement tile from the deck, except the stairs, and swap it with the tile you thought you were in. Shuffle the old tile (and stairs) back into the deck. Draw a card if necessary.",
		},
		{
			id: 2123,
			type: "event",
			name: "Trance",
			text: "#bWhat happened?#dYou suddenly snap to attention, becoming aware that you having been moving through the house without knowing what you were doing. In your hand is a knife, and you don't remember where you picked it up.#n#nThe Knife has been added to your hand. Return to the room where you started your turn. You return there regardless of the distance. Do not move The Mystic Elevator back, even if you used it this turn.",
		},
		{
			id: 2124,
			type: "event",
			name: "Shark Pool",
			text: "#bWho put this here?#dWithout looking where you are going, you almost step into a pool of angry, hungry sharks. Make a Speed roll:#r5+#tYou deftly avoid falling and have renewed confidence. You do not gain a fear of sharks from this event.#y#r0-4#tYou fall backwards, avoiding the pool through sheer luck. One of them appears to wink at you and lick it's lips. Lose 1 Sanity, and always remember the sharks.#y",
		},
		{
			id: 2125,
			type: "event",
			name: "Shambling Hoarder",
			text: "#bShuffle... Jangle... Moan...#dYou come across a hunched figure with leathery skin, grey eyes and a vacant expression, slowly hobbling through the house weighed down by a cloak covered in overflowing pockets. You may choose to make a Speed roll to pickpocket them.#r3+#tYou deftly steal an item and get away. Draw an item card.#y#r0-2#tThe moment you touch it's treasure, the hoarder spins around. But it doesn't do anything else. It just stares at you with it's blank eyes until you back away. Take 2 mental damage.#y",
		},
		{
			id: 2126,
			type: "event",
			name: "Evangelical Botherers",
			text: "#bHave you heard the story of Alberto? He Turned fish into wine!#dThey won't leave you alone. You'll have to make a Speed roll:#r4+#tYou get away, move 2 spaces to a room that has already been discovered.#y#r0-3#tThey pin you down and make you read a pamphlet about how you're bound for internal damnation. Take 1 mental damage.#y",
		},
		{
			id: 2127,
			type: "event",
			name: "Crone's Riddle",
			text: "#bRiddle me this.#dYou are accosted by an impossibly old woman, leaning heavily on a walking stick and hunched over so far she faces the ground instead of you. <i>\"You younger folks aren't wise enough, I say. Can you prove yourself to me? Aheh heh heh? Answer my riddle or prepare for a damn good thrashing.\"</i> Make a Knowledge roll:#r4+#tIn a battle of wits, you exchange riddles and come out on top. She dies. You walk away.#y#r0-3#tShe humiliates you with tricksy riddles and you are wallopped. Talke 1 physical damage.#y",
		},
		{
			id: 2128,
			type: "event",
			name: "Feral Hog",
			text: "#bTime for a B.B.Q.#dSomehow you catch and kill a feral hog that's been trotting around the house. It could make for a very meaty meal if you know how to butcher and cook it. Make a Knowledge roll:#r5+#tYou eat the entire hog and it's delicious. Gain 2 Might.#y#r4#tYou succeed and it tastes good. Gain 1 Might.#y#r0-3#tYou fail and it tastes terrible. Lose 1 Sanity.#y",
		},
		{
			id: 2129,
			type: "event",
			name: "Panicked Wretch",
			text: "#bAaaargh. Uuuurgh!#dA granny jumps out from a cranny. She grabs you and screams in your face. There is intense panic in her eyes, but she has no teeth and is unable to tell you what is wrong. Make a Sanity roll:#r4+#tYou manage to calm her down with a combination of hugging and shushing. She gives you a present in gratitude. Draw an item card.#y#r0-3#tShe drops to the floor and wraps her arms around your ankles so tightly that you struggle against her to walk. Take 1 Physical damage.#y",
		},
		{
			id: 2130,
			type: "event",
			name: "Clown Car",
			text: "#bKids love clowns! Don't they? Who else would clowns be for? Because adults don't love clowns.#dA loud and tiny car pulls up. Seventeen Clowns jump out and start causing chaos as they bumble around. This displeases you, as they are inherently sinister in the context of a haunted house. Make a Sanity roll:#r4+#tYou patiently wait for them to finish their act, cram back in the car, and drive away to bother someone else.#y#r0-3#tYou are pied in the face and it weighs heavily on your psyche. Take 1 physical damage.#y",
		},
		{
			id: 2131,
			type: "event",
			name: "Camcorder",
			text: "#bWhat did they see?#dSomeone has left a camcorder in this room. You switch it on and look at the footage. It's you. You're standing quietly in the darkness, with a dead and decaying face. It's only a 9 second clip but you watch it over and over. Oh dear, you'd better make a Sanity roll:#r5+#tYou take decisive action to ignore what you saw and go about your life. Gain 2 Speed.#y#r4#tMaybe this shows the future, maybe it shows an alternate reality. You just want to escape as soon as possible. Gain 1 Speed.#y#r0-3#tYou can't think about anything else. Lose 1 Knowledge.#y",
		},
		{
			id: 2132,
			type: "event",
			name: "Death of the Witch",
			text: "#bOne less witch to worry about?#dOutside you see the fierce glow of a bonfire. It's weird; you didn't notice anything like that when approaching the house and thought the surrounding wilderness was empty. The silhouettes of a few people stand in front of it, and as they part you see someone in the flames too! It's a woman with long black hair down to her waist. You should be horrified, but instead you feel a strange sense that a source of evil energy is being fought here.#n#nIf there have been no such other sightings, gain 1 Sanity. Otherwise, lose 1 Sanity.",
		},
		{
			id: 2133,
			type: "event",
			name: "Death of the Witch",
			text: "#bOne less temptress to trouble you?#dThere's a woman on the floor with a knife in her back, motionless. You roll her over to see that she was young and pretty, with long black hair down to her waist. Despite being unmistakably dead, there's an almost smug look on her face. She can't have been dead for long, and you feel a strange sense that some source of evil energy is fading away slowly.#n#nIf there have been no such other sightings, gain 1 Sanity. Otherwise, lose 1 Sanity.",
		},
		{
			id: 2134,
			type: "event",
			name: "Death of the Witch",
			text: "#bOne less spellcaster to be scared of?#dIn front of you there is a severed head of a woman on a spike, still dripping with blood and with colour in her cheeks. She had delicate features and long black hair that must have reached her waist. Looking into her eyes, your instinct is that she somehow deserved it, and that her execution was neccessary to fight an evil aura in the house.#n#nIf there have been no such other sightings, gain 1 Sanity. Otherwise, lose 1 Sanity.",
		},
		{
			id: 2135,
			type: "event",
			name: "Death of the Witch",
			text: "#bOne less siren to seduce you?#dAhead you hear a thumping and gargling noise. It's a woman frothing at the mouth and writing on the floor, her long black hair tangled around her pretty face as she struggles. She's been poisoned and there's nothing you can do to save her. Unexpectedly, you feel glad. A feeling in your gut tells you that the poison is working to eradicate an evil force, not just from her body but from this place in general. She is dead.#n#nIf there have been no such other sightings, gain 1 Sanity. Otherwise, lose 1 Sanity.",
		},
		{
			id: 2136,
			type: "event",
			name: "Peer Pressure",
			text: "#bAll the cool people are doing it.#dEveryone you respect has starting doing this new thing: <i>flooping</i>. You don't know much about it but you don't want to miss out. It's all everyone is talking about, and if you don't do it, then you can't be part of the conversation.#n#n#bYOU MUST CHOOSE...#dFloop. Gain 1 die of Speed and take 1 mental damage.#cDo not floop.",
		},
		{
			id: 2137,
			type: "event",
			name: "Treasure Chest",
			text: "#bIt's locked up tight.#dYou find an ornate treasure chest that is bound to have a cool item inside. But to open it, you'll have to whack the padlock with something heavy. Make a Might roll:#r4+#tIt opens and you loot the hell out of it. Draw an item card.#y#r0-3#tYou are not stong enough to open it. Drat.#y",
		},
		{
			id: 2138,
			type: "event",
			name: "Slugs",
			text: "#bSilent killers. Once you see them, it's already too late.#dFirst you notice there are slugs on the floor.#nThen you notice there are slugs on the walls.#nThen you notice there are slugs on your clothes.#nThen you notice there are slugs on your face.#n#nLose 1 Might.",
		},
		{
			id: 2139,
			type: "event",
			name: "Encyclopedia Domum",
			text: "#bIt has everything you need to know, and more!#dThere's an encyclopedia in this room. It contains information about all the secrets of the house. But you're kind of on a mission and will have to read it fast. Make a Speed roll:#r6+#tYou skim read it all. Gain 2 Knowledge.#y#r3-5#tYou flip through the pages reading the headings and looking at the pictures. Gain 1 Knowledge.#y#r0-2#tU R 2 dum. You can't even read an entire encyclopedia in one sitting. Lose 1 Might due to embarrassment.",
		},
		{
			id: 2140,
			type: "event",
			name: "Look Up",
			text: "#bYou feel a tickling sensation on the top of your head. You look up... and see a girl standing on the ceiling!#dShe's staring down at you and her long messy hair is dangling just shy of your face. Before you can react she drops and lands on you. Make a Might or Sanity roll.#r5+#t(Might) You pin her in a chokehold until she goes limp. You step over her body and continue on your way. Gain 1 Sanity.#y#r5+#t(Sanity) You scream at her to go to her room and she stomps out through the door in a huff. Gain 1 Might.#y#r0-4#tShe lays on top of you, unmoving, and you have no choice but to wriggle out from under her and run away.#y",
		},
	]),

	// Do the initial shuffling and dividing, and get the game states for each player.
	startGame: betrayal_2e.startGame,

	// Render the decks used in the game into #top-content.
	renderDeck: betrayal_2e.renderDeck,

	// Add card content to $(element).
	renderCard: betrayal_2e.renderCard,
};
 
