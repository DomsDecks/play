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
				.css({ "display": "flex" })
		);
		$("#darkener").css({ "display": "block" });
	},

	// Remove the drawn card from the GUI.
	"undraw": () => {
		state.drawnCardId = null;
		$("div.card.drawn")
			.removeAttr("id")
			.css({ "display": "" })
			.empty();
		$("#darkener").css({ "display": "" });
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
}; 
// The object containing the game-specific functions.
let game = {};

$(document).ready(() => {
	game = betrayal_2e_dom;

	// Sort the cards in case theyre in a random order in the game file.
	game.cards = _.sortBy(_.flatten(game.cards), (c) => c.id);

	/*
	if theres instance in QS
		if instance is already stored.
			set instance
			load state
			render all
			clean QS
		else if QS also contains game and data
			set deck and hand from data
			set game
			set instance
			save state
			render all
		else
			main menu and clear QS
	else
		main menu and clear QS

	*/

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
			// TODO: Set game from gameMatch here.
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
					.addClass("option")
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

		if (c["hand"] && !_.some(state.hand, h => h == id)) {
			element.append(
				$("<div>")
					.addClass("tab tab-hand")
					.html(text("hand"))
					.click(() => card.move(id, state.hand))
			);
		}

		if (c["deck"]) {
			element.append(
				$("<div>")
					.addClass("tab tab-deck")
					.html(("deck"))
					.click(() => card.move(id, state.deck))
			);
		}

		const index = _.findIndex(state.discard, d => d == id);
		if (c["discard"]) {
			element.append(
				$("<div>")
					.addClass("tab tab-discard")
					.html(index < 0 ? text("discard") : text("discardCancel"))
					.click(() => card.move(id, state.discard))
			);
		}

		if (index >= 0) {
			if (_.last(state.discard) != id) {
				element.append(
					$("<div>")
						.addClass("tab tab-up")
						.html(text("up"))
						.click(() => card.draw(state.discard[index + 1], true))
				);
			}
			if (_.first(state.discard) != id) {
				element.append(
					$("<div>")
						.addClass("tab tab-down")
						.html(text("down"))
						.click(() => card.draw(state.discard[index - 1], true))
				);
			}
		}

		return element;
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
			.append(
				$("<div>")
					.attr("class", "text")
					.html(("players"))
			)
			.append(
				$("<input type='number' min='1' max='6' value='1'>")
					.attr("id", "players")
			).append(
				$("<button type='button'>")
					.attr("id", "start")
					.html(text("start"))
			).append(
				$("<div>")
					.attr("id", "links")
			);

		$("#start").click(() => {
			const states = game.startGame(parseInt($("#players").val()));
			const instanceId = Date.now();
			$("#links")
				.before($("<div>")
					.html(text("link")));
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
					.attr("id", "close")
					.html(text("x"))
			)
			.append(
				$("<div>")
					.attr("class", "text")
					.html(text("find"))
			)
			.append(
				$("<input type='number' min='1000' max='9999'>")
					.attr("id", "id")
			).append(
				$("<button type='button'>")
					.attr("id", "draw")
					.html(text("draw"))
			);

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
const state = {

	// Unique ID of the instance of a game.
	"instanceId": "",

	// Card IDs currently in hand.
	"hand": [],

	// Card IDs currently in all combined decks.
	"deck": [],

	// Card IDs currently in discard pile.
	// The last element is the top of the pile.
	"discard": [],

	// The currently drawn card.
	"drawnCardId": null,

	// Time the game was started.
	"started": null,

	// Is a menu open?
	"menu": () => $(".menu").length > 0,

	// Store to local storage.
	"save": () => {
		let gameData = {
			"deck": state.deck,
			"hand": state.hand,
			"discard": state.discard,
			"started": state.started,
		};
		localStorage.setItem(state.instanceId, JSON.stringify(gameData));
	},

	"load": () => {
		let gameData = JSON.parse(localStorage.getItem(state.instanceId));
		state.deck = gameData.deck || [];
		state.hand = gameData.hand || {};
		state.discard = gameData.discard || [];
		state.started = gameData.started || new Date().toLocaleString();
	},

}; 
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
const betrayal_2e = {

	"displayName": "Betrayal at House on the Hill (2nd Edition)",

	"assetPath": "betrayal-2e",

	// Except for the card art, what other assets are there to preload?
	"assets": ["omen", "item", "event", "texture"],

	"text": {
		"deck": "Shuffle in to stack"
	},

	// All cards in the game.
	"cards": [
		{
			"id": 1001,
			"type": "item",
			"name": "Healing Salve",
			"text": "#bA sticky paste in a shallow bowl.#dYou can apply the Healing Salve to yourself or to another living explorer in the same room. If that explorer's Might or Speed is below its starting value, raise one or both traits to its starting value.#n#nDiscard this item after you use it.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1002,
			"type": "item",
			"name": "Amulet of the Ages",
			"text": "#bAncient silver and inlaid gems, inscribed with blessings.#dGain 1 Might, 1 Speed, 1 Knowledge, and 1 Sanity now.#n#nLose 3 Might, 3 Speed, 3 Knowledge, and 3 Sanity if you lose the Amulet.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1003,
			"type": "item",
			"name": "Idol",
			"text": "#bPerhaps it's chosen you for some greater purpose. Like human sacrifice.#dOnce per turn, you can rub the Idol before making any trait, combat, or event roll to add 2 dice to the roll (to a maximum of 8 dice). Each time you do, lose 1 Sanity.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1004,
			"type": "item",
			"name": "Blood Dagger",
			"text": "#bA nasty weapon. Needles and tubes extend from the handle... and plunge right into your veins.#dYou roll 3 additional dice (maximum of 8 dice) when making a Might attack with this <i>weapon</i>. If you do, lose 1 Speed.#n#nYou can't use another <i>weapon</i> while you're using this one.#n#nThis item can't be traded or dropped. If it's stolen, take 2 dice of physical damage.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1005,
			"type": "item",
			"name": "Rabbit's Foot",
			"text": "#bNot so lucky for the rabbit.#dOnce during your turn, you can reroll 1 die. You must keep the second roll.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1006,
			"type": "item",
			"name": "Axe",
			"text": "#bVery sharp.#dYou roll 1 additional die (maximum of 8 dice) when making a Might attack with this <i>weapon</i>.#n#nYou can't use another <i>weapon</i> while you're using this one.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1007,
			"type": "item",
			"name": "Sacrificial Dagger",
			"text": "#bA twisted shard of iron covered in mysterious symbols and stained with blood.#dWhen making a Might attack with this <i>weapon</i>, you roll 3 extra dice (maximum of 8 dice), but you must make a Knowledge roll first:#r6+#tNo effect.#y#r3-5#tLose 1 from a mental trait.#y#r0-2#tThe dagger twists in your hand! Take 2 dice of physical damage. You can't attack this turn.#yYou can't use another <i>weapon</i> while you're using this one.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1008,
			"type": "item",
			"name": "Dynamite",
			"text": "#bThe fuse isn't lit... yet.#dInstead of attacking, you can throw the Dynamite through a connecting door into an adjacent room. Each explorer and monster with Might and Speed traits in that room must attempt a Speed roll:#r5+#tTake no damage from Dynamite.#y#r0-4#tTake 4 points of physical damage.#yDiscard this item after you use it.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1009,
			"type": "item",
			"name": "Music Box",
			"text": "#bA hand-crafted antique.#nIt plays a haunting melody that gets stuck in your head.#dOnce per turn, you can open or close the Music Box.#n#nWhile the Music Box is open, any explorer or monster with a Sanity trait that enters or starts its turn in the same room must make a Sanity roll of 4+. If the roll fails, the explorer or monster ends its turn as it is mesmerized by the music.#n#nIf an explorer or monster carrying the Music Box is mesmerized, it drops the Music Box. If the Music Box is open when it is dropped, it remains open.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1010,
			"type": "item",
			"name": "Pickpocket's Gloves",
			"text": "#bHelping yourself has never seemed so easy.#dWhen you are in the same room as another explorer, you can discard this item to take any item that explorer is carrying.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1011,
			"type": "item",
			"name": "Medical Kit",
			"text": "#bA doctor's bag, depleted in some critical resources.#d Once during your turn, you can attempt a Knowledge roll to heal yourself or another explorer in the same room:#r8+#tGain up to 3 points of physical traits.#y#r6-7#tGain up to 2 points of physical traits.#y#r4-5#tGain 1 point in a physical trait.#y#r0-3#tNothing happens.#yYou can't raise a trait above its starting value with the Medical Kit.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1012,
			"type": "item",
			"name": "Bottle",
			"text": "#bAn opaque vial containing a black liquid.#dOnce during your turn after the haunt is revealed, you can roll 3 dice and drink from the Bottle:#r6#tChoose a room and put your explorer there.#y#r5#tGain 2 Might and 2 Speed.#y#r4#tGain 2 Knowledge and 2 Sanity.#y#r3#tGain 1 Knowledge and lose 1 Might.#y#r2#tLose 2 Knowledge and 2 Sanity.#y#r1#tLose 2 Might and 2 Speed.#y#r0#tLose 2 from each trait.#yDiscard this item after you use it.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1013,
			"type": "item",
			"name": "Revolver",
			"text": "#bAn old, potent-looking weapon.#dYou can use this <i>weapon</i> to attack with Speed instead of Might. (Your opponent then defends with Speed and takes physical damage.)#n#nRoll 1 additional die on your Speed attack roll (maximum of 8 dice).#n#nWith the Revolver, you can attack anyone in the same room or within line of sight (through an uninterrupted straight line of doors). If you attack someone in another room and lose, you don't take damage.#n#nYou can't use another <i>weapon</i> while you're using this one.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1014,
			"type": "item",
			"name": "Armor",
			"text": "#bIt's just prop armor from a Renaissance fair, but it's still metal.#dAny time (not just once per turn) you take physical damage, take 1 less point of damage.#n#nThis item can't be stolen.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1015,
			"type": "item",
			"name": "Dark Dice",
			"text": "#bAre you feeling lucky?#dOnce per turn, you can roll 3 dice:#r6#tMove to the location of any explorer not revealed as a traitor.#y#r5#tMove one other explorer in the same room into an adjacent room.#y#r4#tGain 1 in a physical trait.#y#r3#tImmediately move into an adjacent room (no movement cost).#y#r2#tGain 1 in a mental trait.#y#r1#tDraw an event card.#y#r0#tReduce all of your traits to the lowest value above the skull symbol.#yDiscard the Dark Dice.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1016,
			"type": "item",
			"name": "Angel Feather",
			"text": "#bA perfect feather fluttering in your hand.#dWhen you attempt a roll of any kind, you can call out a number from 0 to 8. Use that number instead of rolling the dice.#n#nDiscard this item after you use it.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1017,
			"type": "item",
			"name": "Lucky Stone",
			"text": "#bA smooth, ordinary-looking rock. You sense it will bring you good fortune.#dAfter you attempt a roll of any kind, you can rub the stone once to reroll any number of those dice.#n#nDiscard this item after you use it.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1018,
			"type": "item",
			"name": "Puzzle Box",
			"text": "#bThere must be a way to open it.#dOnce during your turn, you can attempt a Knowledge roll to open the box:#r6+#tYou open the box. Draw 2 item cards and discard the Puzzle Box.#y#r0-5#tYou just can't get it open.#y",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1019,
			"type": "item",
			"name": "Smelling Salts",
			"text": "#bWhew, that's a lungful.#dIf your or another living explorer's Knowledge is below its starting value, and you're in the same room, you can raise that trait to its starting value by using the Smelling Salts.#n#nDiscard this item after you use it.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1020,
			"type": "item",
			"name": "Candle",
			"text": "#bIt makes the shadows move-at least, you hope it's doing that.#dIf you draw an event card, roll 1 additional die (maximum of 8 dice) for that event's trait rolls.#n#nIf you have the Bell, Book, and Candle, gain 2 in each trait. The first time you lose one of those 3 items later in the game, lose 2 from each trait.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1021,
			"type": "item",
			"name": "Bell",
			"text": "#bA brass bell that makes a resonant clang.#dGain 1 Sanity now.#n#nLose 1 Sanity if you lose the Bell.#n#nOnce during your turn after the haunt is revealed, you can attempt a Sanity roll to use the Bell:#r5+#tMove any number of unimpeded heroes 1 space closer to you.#y#r0-4#tThe traitor can move any number of monsters 1 space closer to you. (If you are the traitor, this result has no effect.) If there is no traitor, all monsters move 1 space closer to you.#y",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1022,
			"type": "item",
			"name": "Adrenaline Shot",
			"text": "#bA syringe containing a strange fluorescent liquid.#dBefore you attempt a trait roll, you can use this item to add 4 to the result of that roll.#n#nDiscard this item after you use it.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2001,
			"type": "event",
			"name": "The Lost One",
			"text": "#bA woman wearing a Civil War dress beckons to you.#nYou fall into a trance.#dYou must attempt a Knowledge roll. If the result is 5 or more, you break out of your trance and gain 1 Knowledge; otherwise, roll 3 dice to see where the Lost One leads you:#r6#tMove to the Entrance Hall.#y#r4-5#tMove to the Upper Landing.#y#r2-3#tMove to a new upper floor room.#y#r0-1#tMove to a new basement room.#yFor new rooms, draw from the stack, or move to the Entrance Hall if there are no rooms left.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2002,
			"type": "event",
			"name": "The Voice",
			"text": "#b<i>\"I'm under the floor,#nburied under the floor...\"#n#nThe voice whispers once, then is gone.#dYou must attempt a Knowledge roll:#r4+#tYou find something under the floor. Draw an item card.#y#r0-3#tYou dig and search for the voice, but to no avail.#y",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2003,
			"type": "event",
			"name": "The Walls",
			"text": "#bThis room is warm.#nFlesh-like walls pulse with a steady heartbeat. Your own heart beats with the rhythm of the house. You are drawn into the walls... and emerge somewhere else.#dYou must draw the next room tile and put it in the house. Put your explorer in that room.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2004,
			"type": "event",
			"name": "Webs",
			"text": "#bCasually, you reach up to brush some webs aside... but they won't brush away. They cling.#dYou must attempt a Might roll:#n#nr#4+#tYou break free. Gain 1 Might and discard this card.#y#r0-3#tYou're stuck. Keep this card.#yIf you're stuck, you can't do anything until you're freed. Once during an explorer's turn, any explorer can attempt a Might roll to free you. (You can also attempt this roll.) A 4+ succeeds, but you don't gain the 1 Might. Anyone failing an attempt can't move for the rest of that turn. After 3 unsuccessful attempts, you break free automatically on your next turn and take your turn normally.#n#nWhen you're free, discard this event.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2005,
			"type": "event",
			"name": "Whoops!",
			"text": "#bYou feel a body under your foot. Before you can leap away from it, you're knocked over. A giggling voice runs away from you.#dOne of the item cards (not omens) in your hand has been stolen. You may choose which one, because picking at random using dice makes this event too annoying. Discard it.#n#nIf you have no items, then take no action.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2006,
			"type": "event",
			"name": "Silence",
			"text": "#bUnderground, everything goes silent. Even the sound of breathing is gone.#dEach explorer in the basement must attempt a Sanity roll.#r4+#tYou wait calmly for your hearing to return.#y#r1-3#tYou scream a silent scream.#nTake 1 die of mental damage.#y#r0#tYou freak out.#nTake 2 dice of mental damage.#yEach result affects only the explorer making that roll.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2007,
			"type": "event",
			"name": "Skeletons",
			"text": "#bMother and child, still embracing.#dPut the Skeletons token in this room.#nTake 1 die of mental damage.#n#nOnce during an explorer's turn, that explorer can attempt a Sanity roll to search the Skeletons:#r5+#tDraw an item card.#nRemove the Skeletons token.#y#r0-4#tYou dig around, but find nothing.#nTake 1 die of mental damage.#yEach result affects only the explorer making that roll.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2008,
			"type": "event",
			"name": "Smoke",
			"text": "#bSmoke billows around you.#nYou cough, wiping away tears.#dPut the Smoke token in this room. The Smoke blocks line of sight from adjacent rooms. An explorer rolls 2 fewer dice (minimum of 1 die) on all trait rolls while in this room.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2009,
			"type": "event",
			"name": "Something hidden",
			"text": "#bThere's something odd about this room, but what? It's tickling the back of your mind.#dIf you want to try to figure out what's odd, attempt a Knowledge roll:#r4+#tA section of wall slides away, revealing an alcove. Draw an item card.#y#r0-3#tYou can't figure it out, and that makes you a bit crazy.#nLose 1 Sanity.#y",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2010,
			"type": "event",
			"name": "Something Slimy",
			"text": "#bWhat's around your ankle?#nA bug? A tentacle?#nA dead hand clawing?#dYou must attempt a Speed roll:#r4+#tYou break free. Gain 1 Speed.#y#r1-3#tLose 1 Might.#y#r0#tLose 1 Might and 1 Speed.#y",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2011,
			"type": "event",
			"name": "Spider",
			"text": "#bA spider the size of a fist lands on your shoulder... and crawls into your hair.#dYou must attempt a Speed roll to brush it away or a Sanity roll to stand still:#r4+#tIt's gone. Gain 1 in the trait you used to attempt this roll.#y#r1-3#tIt bites you. Take 1 die of physical damage.#y#r0#tIt takes a chunk out of you.#nTake 2 dice of physical damage.#y",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2012,
			"type": "event",
			"name": "The Beckoning",
			"text": "#bOutside.#nYou must get outside.#nFly to freedom!#dEach explorer in the Gardens, Graveyard, Tower, on the Balcony, or in a room with an outside-facing window must attempt a Sanity roll:#r3+#tYou back away from the ledge.#y#r0-2#tYou jump to the Patio. (If it isn't in the house, search the room stack for it, put it in the house, and shuffle that stack.) Put your explorer there and take 1 die of physical damage.#yEach result affects only the explorer making that roll.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2013,
			"type": "event",
			"name": "Night View",
			"text": "#bYou see a vision of a ghostly couple walking the grounds, silently strolling in their wedding best.#dYou must attempt a Knowledge roll:#r5+#tYou recognize the ghosts as former inhabitants of the house. You call their names, and they turn to you, whispering dark secrets of the house. Gain 1 Knowledge.#y#r0-4#tYou pull back in horror, unable to watch.#y",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2014,
			"type": "event",
			"name": "Phone Call",
			"text": "#bA phone rings in the room.#nYou feel compelled to answer it.#dRoll 2 dice. A sweet little granny voice says:#r4#t<i>\"Tea and cakes! Tea and cakes! You always were my favorite!\"</i>#nGain 1 Sanity.#y#r3#t<i>\"I'm always here for you, Pattycakes. Watching...\"</i>#nGain 1 Knowledge.#y#r1-2#t<i>\"I'm here, Sweetums! Give us a kiss!\"</i>#nTake 1 die of mental damage.#y#r0#t<i>\"Bad little children must be punished!\"</i>#nTake 2 dice of physical damage.#y",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2015,
			"type": "event",
			"name": "Posession",
			"text": "#bA shadow separates from the wall. As you stand in shock, the shadow surrounds you and chills you to the core.#dYou must choose any one trait and attempt a roll for that trait:#r4+#tYou resist the shadow's corruption. Gain 1 in a trait of your choice.#y#r0-3#tThe shadow drains your energy. The chosen trait drops to its lowest value. (It doesn't drop to the skull.) If that trait is already at its lowest value, lower a different trait to its lowest value.#y",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2016,
			"type": "event",
			"name": "Revolving Wall",
			"text": "#bThe wall spins to another place.#dPlace the Wall Switch token on a wall without an exit in this room or a corner of this room. If there isn't a room on the other side of the Wall Switch, draw room tiles until you find one for this floor, then put it in the house. (If there are no more rooms on this floor, discard this card.) Then put your explorer in that room.#n#nOnce during an explorer's turn, if that explorer is in either room, he or she can attempt a Knowledge roll to use the Wall Switch:#r3+#tThat explorer finds the hidden switch and goes through. This doesn't count as moving a space.#y#r0-2#tThat explorer can't find the hidden switch and can't go through.#y",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2017,
			"type": "event",
			"name": "Rotten",
			"text": "#bThe smell in this room, it's horrible.#nSmells like death, like blood.#nA slaughterhouse smell.#dYou must attempt a Sanity roll:#r5+#tTroubling odors, nothing more.#nGain 1 Sanity.#y#r2-4#tLose 1 Might.#y#r1#tLose 1 Might and 1 Speed.#y#r0#tYou double over with nausea.#nLose 1 Might, 1 Speed,1 Knowledge, and 1 Sanity.#y",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2018,
			"type": "event",
			"name": "Secret Passage",
			"text": "#bA section of the wall slides away.#nBehind it, a moldy tunnel awaits.#dPut a Secret Passage token in this room. Roll 3 dice and place the second Secret Passage token in:#r6#tAny existing room.#y#r4-5#tAny existing upper floor room.#y#r2-3#tAny existing ground floor room.#y#r0-1#tAny existing basement room.#yYou can then use the Secret Passage, even if you don't have any movement left.#n#nMoving from one Secret Passage token to the other counts as moving one space. (The passage itself doesn't count as a space.)#n#nOn later turns, any explorer can use the Secret Passage. An explorer can't end his or her turn in the passage.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2019,
			"type": "event",
			"name": "Secret Stairs",
			"text": "#bA horrible creaking sound echoes around you. You've discovered a secret stairwell.#dPut one Secret Stairs token in this room and a second Secret Stairs token in an existing room on another floor. Moving from one Secret Stairs token to the other counts as moving one space. (The stairs don't count as a space.)#n#nYou can follow the stairs right now, even if you don't have any movement left. If you do follow them this turn, draw an event card in the new room.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2020,
			"type": "event",
			"name": "Shrieking Wind",
			"text": "#bThe wind picks up, a slow crescendo to a screeching howl.#dEach explorer in the Gardens, Graveyard, Patio, Tower, on the Balcony, or in a room with an outside-facing window, must attempt a Might roll:#r5+#tYou keep your footing.#y#r3-4#tThe wind knocks you down.#nTake 1 die of physical damage.#y#r1-2#tThe wind chills your soul.#nTake 1 die of mental damage.#y#r0#tThe wind knocks you down hard. Discard one of your items, or if you don't have any, take 1 die of physical damage.#yEach result affects only the explorer making that roll.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2021,
			"type": "event",
			"name": "Jonah's Turn", // TODO: Puzzle box will get rarer, so include another item or two in this.
			"text": "#bTwo boys are playing with a wooden top. <i>\"Would you like a turn, Jonah?\"</i> one asks.#n#n<i>\"No,\"</i> says Jonah, <i>\"I want all the turns.\"</i> Jonah takes the top and hits the other boy in the face. The boy falls. Jonah keeps hitting him as they fade from view.#dIf an explorer has the Puzzle Box, that explorer discards that item and draws a replacement item for it. If this happens, you gain 1 Sanity; otherwise, you take 1 die of mental damage.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2022,
			"type": "event",
			"name": "Lights Out", // TODO: Candle will get rarer, so include another item or two in this.
			"text": "#bYour flashlight goes out.#nDon't worry, someone else has batteries.#dKeep this card. You can move only 1 space each turn until you end your turn in the same room as another explorer. At the end of that turn, discard this card. Then you can move normally again.#n#nIf you have the Candle or end your turn in the Furnace Room, discard this card.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2023,
			"type": "event",
			"name": "Locked Safe",
			"text": "#bBehind a portrait is a wall safe.#nIt is trapped, of course.#dPut the Safe token in this room.#n#nOnce during an explorer's turn, that explorer can attempt a Knowledge roll to open the Safe:#r5+#tDraw 2 item cards and remove the Safe token.#y#r2-4#tTake 1 die of physical damage.#nThe Safe won't open.#y#r0-1#tTake 2 dice of physical damage.#nThe Safe won't open.#y",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2024,
			"type": "event",
			"name": "Mists from the Walls",
			"text": "#bMists pour out from the walls.#nThere are faces in the mist, human and... inhuman.#dEach explorer in the basement must attempt a Sanity roll:#r4+#tThe faces are tricks of light and shadow. All is well.#y#r1-3#tTake 1 die of mental damage (and 1 additional die of damage if that explorer is in a room with an event symbol).#y#r0#tTake 1 die of mental damage (and 2 additional dice of damage if that explorer is in a room with an event symbol).#yEach result affects only the explorer making that roll.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2025,
			"type": "event",
			"name": "Mystic Slide",
			"text": "#bIF YOU'RE IN THE BASEMENT, THIS EVENT AFFECTS THE NEXT EXPLORER TO YOUR LEFT NOT IN THE BASEMENT. DISCARD THIS CARD IF ALL OF THE EXPLORERS ARE IN THE BASEMENT.#n#nThe floor falls from under you.#dPlace the Slide token in this room, then attempt a Might roll to use the Slide.#r5+#tYou control the Slide. Put yourself in any explored room on any floor below the Slide.#y#r0-4#tDraw tiles from the room stack until you draw a basement room. Place the room tile. (If no basement rooms are in the stack, choose a basement room in play.) You fall to that room and take 1 die of physical damage. If it's not your turn, don't draw a card for that room.#yKeep this card. On later turns, any explorer can attempt this roll to use the Slide.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2026,
			"type": "event",
			"name": "Grave Dirt",
			"text": "#bThis room is covered in a thick layer of dirt. You cough as it gets on your skin and in your lungs.#dYou must attempt a Might roll:#r4+#tYou shake it off. Gain 1 Might.#y#r0-3#tSomething is wrong. Keep this card. Take 1 point of physical damage at the start of each of your turns. Discard this card if an item card increases one of your traits or if you end your turn in the Balcony, Gardens, Graveyard, Gymnasium, Larder, Patio, or Tower.##y",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2027,
			"type": "event",
			"name": "Groundskeeper",
			"text": "#bYou turn to see a man in groundskeeper clothing.#nHe raises his shovel and charges. Inches from your face, he disappears, leaving muddy footprints, and nothing more.#dYou must attempt a Knowledge roll. (An explorer in the Gardens rolls 2 fewer dice on this roll.)#r4+#tYou find something in the mud.#nDraw an item card.#y#r0-3#tThe groundskeeper reappears and strikes you in the face with the shovel. The player on your right rolls a Might 4 attack for the Groundskeeper. You defend against this attack as normal, by rolling dice equal to your Might.#y",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2028,
			"type": "event",
			"name": "Hanged Men",
			"text": "#bA breeze chills the room.#nBefore you, three men hang from frayed ropes. They stare at you with cold, dead eyes.#nThe trio swing silently, then fade into dust that falls to the ground. You start to choke.#n#nYou must attempt a roll for each trait:#r2+#tThat trait is unaffected.#y#r0-1#tLose 1 from that trait.#yIf you roll a 2+ on all 4 rolls, gain 1 additional point in a trait of your choice.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2029,
			"type": "event",
			"name": "Hideous Shriek",
			"text": "#bIt starts like a whisper, but ends in a soul-rending shriek.#dEach explorer must attempt a Sanity roll:#r4+#tYou resist the sound.#y#r1-3#tTake 1 die of mental damage.#y#r0#tTake 2 dice of mental damage.#yEach result affects only the explorer making that roll.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2030,
			"type": "event",
			"name": "Image in the Mirror",
			"text": "#bIF YOU DON'T HAVE ANY ITEM CARDS, THIS EVENT AFFECTS THE NEXT EXPLORER TO YOUR LEFT WITH AN ITEM CARD. DISCARD THIS CARD IF NO EXPLORER HAS AN ITEM CARD.#n#nThere is an old mirror in this room.#nYour frightened reflection moves on its own. You realize it is you from another time. You need to help your reflection, so you write on the mirror:#n#n<i>THIS WILL HELP</i>#n#nYou then hand an item through the mirror.#dChoose one of your item cards (not an omen card) and shuffle it into the item stack. Gain 1 Knowledge.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2031,
			"type": "event",
			"name": "Image in the Mirror", // TODO: It's great when both mirror cards are used in the game. Add a third mirror card somehow. Maybe you witness the handover from afar. But then it's not mirror related? Maybe you meet a man polishing a mirror, who tells you it's secret, and you can choose to smash it?
			"text": "#bThere is an old mirror in this room.#nYour frightened reflection moves on its own. You realize it is you from another time. Your reflection writes on the mirror:#n#n<i>THIS WILL HELP</i>#n#nThen it hands you an item through the mirror.#dDraw an item card.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2032,
			"type": "event",
			"name": "It is Meant to Be",
			"text": "#bYou collapse to the floor, visions of future events pouring through your head.#dChoose one of these 2 options:#n#n&bull; Draw cards from the item, omen or event stack until you find a card of your choice. Shuffle the unwanted cards back into the stack. Keep the chosen card in you hand and don't tell anyone what it is. The next time anyone should draw that type of card, they draw your chosen card. (Ask them to manually draw the card with that number, then discard yours.)#n#n&bull; You can choose instead to roll 4 dice and write down the result. For one future die roll of your choice that you attempt, you can use that number instead of rolling. If that number is higher than the maximum possible result, use the maximum possible result instead.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2033,
			"type": "event",
			"name": "Creepy Crawlies",
			"text": "#bExactly one thousand bugs spill out on your skin, under your clothes, and in your hair.#dYou must attempt a Sanity roll:#r5+#tYou blink, and they're gone.#nGain 1 Sanity.#y#r1-4#tLose 1 Sanity.#y#r0#tLose 2 Sanity.#y",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2034,
			"type": "event",
			"name": "Creepy Puppet", // TODO: Add another item to affect.
			"text": "#bYou see one of those dolls that give you the willies.#nIt jumps at you with a tiny spear.#dThe player on your right rolls a Might 4 attack for the Creepy Puppet. You defend against this attack as normal, by rolling dice equal to your Might.#n#nIf you take any damage from this attack, the explorer with the Spear gains 2 Might (unless you have the Spear).",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2035,
			"type": "event",
			"name": "Debris",
			"text": "#bPlaster falls from the walls and ceiling.#dYou must attempt a Speed roll:#r3+#tYou dodge the plaster.#nGain 1 Speed.#y#r1-2#tYou're buried in debris.#nTake 1 die of physical damage.#y#r0#tYou're buried in debris.#nTake 2 dice of physical damage.#yIf you're buried, keep this card. You can't do anything until you're freed. Once during an explorer's turn, that explorer can attempt a Might roll to free you. (You can also attempt this roll.) A 4+ succeeds. After 3 unsuccessful attempts, you break free automatically on your next turn and take your turn normally.#n#nDiscard this card when you're free.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2036,
			"type": "event",
			"name": "Disquieting Sounds",
			"text": "#bA baby's cry, lost and abandoned.#nA scream.#nThe crack of breaking glass.#nThen silence.#dRoll 6 dice. If you roll equal to or more than the number of omens that have been revealed, you gain Sanity. If not, take 1 die of mental damage.#n#n(Note from the editor: aren't all sounds <i>disquieting</i>?)",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2037,
			"type": "event",
			"name": "Drip...#nDrip...#nDrip...",
			"text": "#bA rhythmic sound that needles at your brain.#dPut the Drip token in this room.#n#nEach explorer rolls 1 fewer die (minimum of 1) on all trait rolls while in this room.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2038,
			"type": "event",
			"name": "Footsteps",
			"text": "#bThe floorboards slowly creak.#nDust rises. Footprints appear on the dirty floor. And then, as they reach you, they are gone.#dRoll 1 die. (An explorer in the Chapel rolls 1 additional die on this roll.)#r4#tYou and the nearest explorer gain 1 Might.#y#r3#tYou gain 1 Might, and the nearest explorer loses 1 Sanity.#n#n2 Lose 1 Sanity.#y#r1#tLose 1 Speed.#y#r0#tEach explorer loses 1 point from a trait of his or her choice.#y",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2039,
			"type": "event",
			"name": "Funeral",
			"text": "#bYou see an open coffin.#nYou're inside it.#dYou must attempt a Sanity roll:#r4+#tYou blink, and it's gone.#nGain 1 Sanity.#y#r2-3#tThe vision disturbs you.#nLose 1 Sanity.#y#r0-1#tYou're really in that coffin.#nLose 1 Sanity and 1 Might as you dig yourself out. If the Graveyard or the Crypt has been found, put your explorer in one of those rooms (you choose which one).#y",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2040,
			"type": "event",
			"name": "A Moment	of Hope",
			"text": "#bSomething feels strangely right about this room. Something is resisting the evil of the house.#dPlace the Blessing token in this room.#n#nEach hero rolls 1 additional die (maximum of 8 dice) on all trait rolls while in this room.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2041,
			"type": "event",
			"name": "Angry Being",
			"text": "#bIt emerges from the slime on the wall next to you.#dYou must attempt a Speed roll:#r5+#tYou get away. Gain 1 Speed.#y#r2-4#tTake 1 die of mental damage.#y#r0-1#tTake 1 die of mental damage and 1 die of physical damage.#y",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2042,
			"type": "event",
			"name": "Bloody Vision",
			"text": "#bThe walls of this room are damp with blood.#nThe blood drips from the ceiling, down the walls, over the furniture, and onto your shoes.#nIn a blink, it is gone.#dYou must attempt a Sanity roll:#r4+#tYou steel yourself. Gain 1 Sanity.#y#r2-3#tLose 1 Sanity.#y#r0-1#tIf an explorer or monster is in your room or an adjacent one, you must attack it (if you can). Choose the explorer with the lowest Might, if possible.#y",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2043,
			"type": "event",
			"name": "Burning Man",
			"text": "#bA man on fire runs through the room. His skin bubbles and cracks, falling away from him and leaving a fiery skull that clatters to the ground, bounces, rolls, and disappears.#dYou must attempt a Sanity roll:#r4+#tYou feel a little hot under the collar, but otherwise fine.#nGain 1 Sanity.#y#r2-3#tOut, out, you must get out.#nPut your explorer in the Entrance Hall.#y#r0-1#tYou burst into flames!#nTake 1 die of physical damage. Then take 1 die of mental damage as you put out the flames.#y",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2044,
			"type": "event",
			"name": "Closet Door",
			"text": "#bThat closet door is open... just a crack. There must be something inside.#n#nPut the Closet token in this room.#n#nOnce during an explorer's turn, that explorer can roll 2 dice to open the Closet:#n#n4 Draw an item card.#n#n2-3 Draw an event card.#n#n0-1 Draw an event card and remove the Closet token.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2045,
			"type": "event",
			"name": "What The...?",
			"text": "#bAs you look back the way you came, you see... nothing.#nJust empty fog and mist where a room used to be.#dPick up the tile for the room you are in. Put it somewhere else on the same floor of the house so its door is attached to a different unexplored doorway. If there isn't an unexplored doorway on this floor, move the room to a different floor.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 3001,
			"type": "omen",
			"name": "Spirit Board",
			"text": "#bA board with letters and numbers to call the dead.#dBefore you move during your turn, you can look at the top tile of the room stack.#n#nIf you use the Spirit Board after the haunt has been revealed, the traitor can move any number of monsters 1 space closer to you. (If you are the If the traitor, you don't have to move those monsters.) If there is no traitor, all monsters move 1 space closer to you.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 3002,
			"type": "omen",
			"name": "Spear",
			"text": "#bA weapon pulsing with power.#dYou roll 2 additional dice (maximum of 8 dice) when making a Might attack with this <i>weapon</i>.#n#nYou can't use another <i>weapon</i> while you're using this one.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 3003,
			"type": "omen",
			"name": "Skull",
			"text": "#bA skull, cracked and missing teeth.#dIf you take mental damage, you can take all of it as physical damage instead.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 3004,
			"type": "omen",
			"name": "Ring",
			"text": "#bA battered ring with an incomprehensible inscription.#dIf you attack an opponent that has a Sanity trait, you can attack with Sanity instead of Might. (Your opponent then defends with Sanity, and damage is mental instead of physical.)",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 3005,
			"type": "omen",
			"name": "Medallion",
			"text": "#bA medallion inscribed with a pentagram.#dYou are immune to the effects of the Pentagram Chamber, Crypt, and Graveyard.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 3006,
			"type": "omen",
			"name": "Mask",
			"text": "#bA somber mask to hide your intentions.#dOnce during your turn, you can attempt a Sanity roll to use the Mask:#r4+#tYou can put on or take off the Mask.#yIf you put on the Mask, gain 2 Knowledge and lose 2 Sanity.#n#nIf you take off the Mask, gain 2 Sanity and lose 2 Knowledge.#r0-3#tYou can't use the Mask this turn.#y",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 3007,
			"type": "omen",
			"name": "Madman",
			"text": "#bCOMPANION#n#nA raving, frothing madman.#dGain 2 Might and lose 1 Sanity now.#n#nLose 2 Might and gain 1 Sanity if you lose custody of the Madman.#n#nThis omen can't be dropped, traded, or stolen.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 3008,
			"type": "omen",
			"name": "Holy Symbol",
			"text": "#bA symbol of calm in an unsettling world.#dGain 2 Sanity now.#n#nLose 2 Sanity if you lose the Holy Symbol.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 3009,
			"type": "omen",
			"name": "Girl",
			"text": "#bCOMPANION#n#nA girl.#n#nTrapped.#n#nAlone.#n#nYou free her!#dGain 1 Sanity and 1 Knowledge now.#n#nLose 1 Sanity and 1 Knowledge if you lose custody of the Girl.#n#nThis omen can't be dropped, traded, or stolen.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 3010,
			"type": "omen",
			"name": "Dog",
			"text": "#bCOMPANION#n#nThis mangy dog seems friendly.#nAt least you hope it is.#dGain 1 Might and 1 Sanity now.#n#nLose 1 Might and 1 Sanity if you lose custody of the Dog.#n#nTake a small monster token to represent the Dog. Put it in your room. (Use a token of a different color from other monsters, if any.) Once during your turn, the Dog can move to any explored room up to 6 spaces away, using doors and stairs, and then return. It can pick up, carry, and/or drop 1 item before it returns.#n#nThe Dog isn't slowed by opponents. It can't use one-way passages or rooms that require a roll. It can't carry items that slow movement.#n#nThis omen can't be dropped, traded, or stolen.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 3011,
			"type": "omen",
			"name": "Crystal Ball",
			"text": "#bHazy images appear in the glass.#dOnce during your turn after the haunt is revealed, you can attempt a Knowledge roll to peer into the Crystal Ball:#r4+#tYou see the truth. Draw cards from the event stack until you find a card of your choice. Shuffle the unwanted cards back into the stack. Keep the chosen card in you hand and don't tell anyone what it is. The next time anyone should draw an event card, they draw your chosen card. (Ask them to manually draw the card with that ID number, then discard yours.)#y#r1-3#tYou avert your eyes.#nLose 1 Sanity.#y#r0#tYou stare into Hell.#nLose 2 Sanity.#y",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 3012,
			"type": "omen",
			"name": "Book",
			"text": "#bA diary or lab notes?#nAncient script or modern ravings?#dGain 2 Knowledge now.#n#nLose 2 Knowledge if you lose the Book.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 3013,
			"type": "omen",
			"name": "Bite",
			"text": "#bA growl, the scent of death.#nPain. Darkness. Gone.#dWhen you draw this card, something bites you. The player on your right rolls a Might 4 attack against you for the mysterious something (before it runs away into the darkness). You defend against this attack as normal, by rolling dice equal to your Might.#n#nThis omen can't be dropped, traded, or stolen.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
	],

	// Do the initial shuffling and dividing, and get the game states for each player.
	"startGame": (count) => {
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
		_.each(game.cards, (c, i) => {
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

	"drawItem": () => {
		// Pick an item from the deck at random.
		if (state.menu()) { return; }
		const items = _.filter(state.deck, d => card.get(d)["type"] == "item");
		card.draw(items[Math.floor(rand() * items.length)]);
	},

	"drawOmen": () => {
		// Pick an omen from the deck at random.
		if (state.menu()) { return; }
		const omens = _.filter(state.deck, d => card.get(d)["type"] == "omen");
		card.draw(omens[Math.floor(rand() * omens.length)]);
	},

	"drawEvent": () => {
		// Pick an event from the deck at random.
		if (state.menu()) { return; }
		const events = _.filter(state.deck, d => card.get(d)["type"] == "event");
		card.draw(events[Math.floor(rand() * events.length)]);
	},

	// Render the decks used in the game into #top-content.
	"renderDeck": () => {

		// Render the find button.
		if ($("#top-content div").length == 0) {
			render.find();

			// Render the decks.
			$("#top-content")
				.append(
					$("<div>")
						.addClass("deck")
						.attr("id", "items")
						.html("items")
				)
				.append(
					$("<div>")
						.addClass("deck")
						.attr("id", "omens")
						.html("omens")
				)
				.append(
					$("<div>")
						.addClass("deck")
						.attr("id", "events")
						.html("events")
				)
				.append(
					$("<div>")
						.addClass("deck")
						.attr("id", "discard")
						.html("discard")
				);

			// Bind events.
			$("#items").click(betrayal_2e.drawItem);
			$("#omens").click(betrayal_2e.drawOmen);
			$("#events").click(betrayal_2e.drawEvent);
			$("#discard").click(card.drawDiscard);

			$("body").addClass("betrayal-2e");

			render.preloadAssets();
		}
	},

	"hauntRoll": "Make a haunt roll now.",

	// Add card content to $(element).
	"renderCard": (element) => {
		let c = card.get(element.attr("id"));

		element
			.addClass(c["type"])
			.append($("<div>")
				.addClass("card-id")
				.html(c.id))
			.prepend($(`<img src="${render.path(c.name)}">`)
				.addClass("card-art"))
			.prepend($("<div>")
				.addClass("card-title")
				.html(c.name))
			.append($("<div>")
				.addClass("card-text")
				.html(c.text
					.replaceAll("#b", "<div class='b'>")
					.replaceAll("#d", "</div><br>")
					.replaceAll("#r", "<div class='r'><div class='n'>")
					.replaceAll("#t", "</div><div class='o'>")
					.replaceAll("#y", "</div></div>")
					.replaceAll("#n", "<br>")
					.replace(/(<br>)+$/, "")))
			.append($(`<img src="${render.path(c.type)}">`)
				.addClass("card-icon"));

		if (c.type == "omen") {
			element.append($("<div>")
				.addClass("card-suffix")
				.html(betrayal_2e.hauntRoll));
		}

		return element;
	},
}; 
const betrayal_2e_dom = {

	"displayName": "Betrayal at House on the Hill (2nd Edition) (Dom's Expansion)",

	"assetPath": betrayal_2e.assetPath,

	"assets": betrayal_2e.assets,

	"text": betrayal_2e.text,

	// All cards in the game.
	"cards": betrayal_2e.cards.concat([]),

	// "text": "<b>You feel a tickling sensation on the top of your head. You look up... and see a girl standing on the ceiling! She's staring down at you and her long messy hair is dangling just shy of your face. Before you can react she drops and lands on you.</b><br>You must attempt a Might or Sanity roll.<br><b>(Might 5+)</b> You pin her in a chokehold until she goes limp. You step over her body and continue on your way. Gain 1 Sanity.<br><b>(Sanity 5+)</b> You scream at her to go to her room and she stomps out through the door in a huff. Gain 1 Might.",

	// Do the initial shuffling and dividing, and get the game states for each player.
	"startGame": betrayal_2e.startGame,

	// Render the decks used in the game into #top-content.
	"renderDeck": betrayal_2e.renderDeck,

	// Add card content to $(element).
	"renderCard": betrayal_2e.renderCard,
}; 
