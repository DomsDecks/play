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
		if (_.isUndefined(id)) {
			state.drawnCardId = null;
			return;
		}
		state.drawnCardId = id;
		$("div.drawn").replaceWith(
			render.card(id)
				.addClass("drawn")
				.css({ "display": "block" })
		);
		// Show new drawn card on screen, with relevant controls.
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
		card.draw(_.last(state.discard));
	},

	// Move a card between arrays.
	"move": (id, target) => {
		if(state.drawnCardId == id) {
			card.undraw();
		}

		// Cards can only be in one array at a time, so remove from others while moving.
		if (target != state.hand && state.hand.some(h => h == id)) {
			state.hand.splice(state.hand.indexOf(id), 1);
		}
		if (target != state.deck && state.deck.some(d => d == id)) {
			state.deck.splice(state.deck.indexOf(id), 1);
		}
		if (target != state.discard && state.discard.some(d => d == id)) {
			state.discard.splice(state.discard.indexOf(id), 1);
		}

		// Add it to the end of the target array.
		if (!target.some(t => t == id)) {
			target.push(id);
		}

		state.save();

		render.all();
	},

}; 
// The object containing the game-specific functions.
let game = {};

$(document).ready(() => {
	game = betrayal;
	game.init();

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

		// The cards are sorted by their IDs.
		// The deckBinary is 1100 if you have the first two cards but not the last two.
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
const text = {

	"scroll": "<i class='material-icons'>keyboard_double_arrow_down</i>\
		<span>Scroll down to see your hand of cards...<span>\
		<i class='material-icons'>keyboard_double_arrow_down</i>",

	"empty": "<span>Your hand of cards is empty.<span>",

	"setScroll": () => {
		$("div#scroll")
			.html(_.isEmpty(state.hand) ? text.empty : text.scroll);
	},

	"hand": "Keep in your hand",

	"deck": "Shuffle in to deck",

	"discard": "Place on discard pile",

	"discardCancel": "Leave in discard pile",

	"up": "<i class='material-icons'>keyboard_arrow_up</i>",

	"down": "<i class='material-icons'>keyboard_arrow_down</i>",

	"start": "Start",

	"draw": "Draw",
}; 
const betrayal = {

	// All cards in the game.
	"cards": [
		{
			"id": 1001,
			"type": "item",
			"name": "HEALING SALVE",
			"text": "<b>A sticky paste in a shallow bowl.</b><br><br>You can apply the Healing Salve to yourself or to another living explorer in the same room. If that explorer's Might or Speed is below its starting value, raise one or both traits to its starting value.<br><br>Discard this item after you use it.<br><br><i class='material-icons'>sell</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1002,
			"type": "item",
			"name": "AMULET OF THE AGES",
			"text": "<b>Ancient silver and inlaid gems, inscribed with blessings.</b><br><br>Gain 1 Might, 1 Speed, 1 Knowledge, and 1 Sanity now.<br><br>Lose 3 Might, 3 Speed, 3 Knowledge, and 3 Sanity if you lose the Amulet.<br><br><i class='material-icons'>sell</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1003,
			"type": "item",
			"name": "IDOL",
			"text": "<b>Perhaps it's chosen you for some greater purpose. Like human sacrifice.</b><br><br>Once per turn, you can rub the Idol before making any trait, combat, or event roll to add 2 dice to the roll (to a maximum of 8 dice). Each time you do, lose 1 Sanity.<br><br><i class='material-icons'>sell</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1004,
			"type": "item",
			"name": "BLOOD DAGGER",
			"text": "<b>WEAPON<br><br>A nasty weapon. Needles and tubes extend from the handle... and plunge right into your veins.</b><br><br>You roll 3 additional dice (maximum of 8 dice) when making a Might attack with this weapon. If you do, lose 1 Speed.<br><br>You can't use another weapon while you're using this one.<br><br>This item can't be traded or dropped. If it's stolen, take 2 dice of physical damage.<br><br><i class='material-icons'>sell</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1005,
			"type": "item",
			"name": "RABBIT'S FOOT",
			"text": "<b>Not so lucky for the rabbit.</b><br><br>Once during your turn, you can reroll 1 die. You must keep the second roll.<br><br><i class='material-icons'>sell</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1006,
			"type": "item",
			"name": "AXE",
			"text": "<b>WEAPON<br><br>Very sharp.</b><br><br>You roll 1 additional die (maximum of 8 dice) when making a Might attack with this weapon.<br><br>You can't use another weapon while you're using this one.<br><br><i class='material-icons'>sell</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1007,
			"type": "item",
			"name": "SACRIFICIAL DAGGER",
			"text": "<b>WEAPON<br><br>A twisted shard of iron covered in mysterious symbols and stained with blood.</b><br><br>When making a Might attack with this weapon, you roll 3 extra dice (maximum of 8 dice), but you must make a Knowledge roll first:<br><br>6+ No effect.<br><br>3-5 Lose 1 from a mental trait.<br><br>0-2 The dagger twists in your hand! Take 2 dice of physical damage. You can't attack this turn.<br><br>You can't use another weapon while you're using this one.<br><br><i class='material-icons'>sell</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1008,
			"type": "item",
			"name": "DYNAMITE",
			"text": "<b>The fuse isn't lit... yet.</b><br><br>Instead of attacking, you can throw the Dynamite through a connecting door into an adjacent room. Each explorer and monster with Might and Speed traits in that room must attempt a Speed roll:<br><br>5+ Take no damage from Dynamite.<br><br>0-4 Take 4 points of physical damage.<br><br>Discard this item after you use it.<br><br><i class='material-icons'>sell</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1009,
			"type": "item",
			"name": "MUSIC BOX",
			"text": "<b>A hand-crafted antique.<br>It plays a haunting melody that gets stuck in your head.</b><br><br>Once per turn, you can open or close the Music Box.<br><br>While the Music Box is open, any explorer or monster with a Sanity trait that enters or starts its turn in the same room must make a Sanity roll of 4+. If the roll fails, the explorer or monster ends its turn as it is mesmerized by the music.<br><br>If an explorer or monster carrying the Music Box is mesmerized, it drops the Music Box. If the Music Box is open when it is dropped, it remains open.<br><br><i class='material-icons'>sell</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1010,
			"type": "item",
			"name": "PICKPOKET'S GLOVES",
			"text": "<b>Helping yourself has never seemed so easy.</b><br><br>When you are in the same room as another explorer, you can discard this item to take any item that explorer is carrying.<br><br><i class='material-icons'>sell</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1011,
			"type": "item",
			"name": "MEDICAL KIT",
			"text": "<b>A doctor's bag, depleted in some critical resources.</b><br><br> Once during your turn, you can attempt a Knowledge roll to heal yourself or another explorer in the same room:<br><br>8+ Gain up to 3 points of physical traits.<br><br>6-7 Gain up to 2 points of physical traits.<br><br>4-5 Gain 1 point in a physical trait.<br><br>0-3 Nothing happens.<br><br>You can't raise a trait above its starting value with the Medical Kit.<br><br><i class='material-icons'>sell</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1012,
			"type": "item",
			"name": "BOTTLE",
			"text": "<b>An opaque vial containing a black liquid.</b><br><br>Once during your turn after the haunt is revealed, you can roll 3 dice and drink from the Bottle:<br><br>6 Choose a room and put your explorer there.<br><br>5 Gain 2 Might and 2 Speed.<br><br>4 Gain 2 Knowledge and 2 Sanity.<br><br>3 Gain 1 Knowledge and lose 1 Might.<br><br>2 Lose 2 Knowledge and 2 Sanity.<br><br>1 Lose 2 Might and 2 Speed.<br><br>0 Lose 2 from each trait.<br><br>Discard this item after you use it.<br><br><i class='material-icons'>sell</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1013,
			"type": "item",
			"name": "REVOLVER",
			"text": "<b>WEAPON<br><br>An old, potent-looking weapon.</b><br><br>You can use the Revolver to attack with Speed instead of Might. (Your opponent then defends with Speed and takes physical damage.)<br><br>Roll 1 additional die on your Speed attack roll (maximum of 8 dice).<br><br>With the Revolver, you can attack anyone in the same room or within line of sight (through an uninterrupted straight line of doors). If you attack someone in another room and lose, you don't take damage.<br><br>You can't use another weapon while you're using this one.<br><br><i class='material-icons'>sell</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1014,
			"type": "item",
			"name": "ARMOR",
			"text": "<b>It's just prop armor from a Renaissance fair, but it's still metal.</b><br><br>Any time (not just once per turn) you take physical damage, take 1 less point of damage.<br><br>This item can't be stolen.<br><br><i class='material-icons'>sell</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1015,
			"type": "item",
			"name": "DARK DICE",
			"text": "<b>Are you feeling lucky?</b><br><br>Once per turn, you can roll 3 dice:<br><br>6 Move to the location of any explorer not revealed as a traitor.<br><br>5 Move one other explorer in the same room into an adjacent room.<br><br>4 Gain 1 in a physical trait.<br><br>3 Immediately move into an adjacent room (no movement cost).<br><br>2 Gain 1 in a mental trait.<br><br>1 Draw an event card.<br><br>O Reduce all of your traits to the lowest value above the skull symbol. Discard the Dark Dice.<br><br><i class='material-icons'>sell</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1016,
			"type": "item",
			"name": "ANGEL FEATHER",
			"text": "<b>A perfect feather fluttering in your hand.</b><br><br>When you attempt a roll of any kind, you can call out a number from 0 to 8. Use that number instead of rolling the dice.<br><br>Discard this item after you use it.<br><br><i class='material-icons'>sell</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1017,
			"type": "item",
			"name": "LUCKY STONE",
			"text": "<b>A smooth, ordinary-looking rock. You sense it will bring you good fortune.</b><br><br>After you attempt a roll of any kind, you can rub the stone once to reroll any number of those dice.<br><br>Discard this item after you use it.<br><br><i class='material-icons'>sell</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1018,
			"type": "item",
			"name": "PUZZLE BOX",
			"text": "<b>There must be a way to open it.</b><br><br>Once during your turn, you can attempt a Knowledge roll to open the box:<br><br>6+ You open the box. Draw 2 item cards and discard the Puzzle Box.<br><br>0-5 You just can't get it open.<br><br><i class='material-icons'>sell</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1019,
			"type": "item",
			"name": "SMELLING SALTS",
			"text": "<b>Whew, that's a lungful.</b><br><br>If your or another living explorer's Knowledge is below its starting value, and you're in the same room, you can raise that trait to its starting value by using the Smelling Salts.<br><br>Discard this item after you use it.<br><br><i class='material-icons'>sell</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1020,
			"type": "item",
			"name": "CANDLE",
			"text": "<b>It makes the shadows move-at least, you hope it's doing that.</b><br><br>If you draw an event card, roll 1 additional die (maximum of 8 dice) for that event's trait rolls.<br><br>If you have the Bell, Book, and Candle, gain 2 in each trait. The first time you lose one of those 3 items later in the game, lose 2 from each trait.<br><br><i class='material-icons'>sell</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1021,
			"type": "item",
			"name": "BELL",
			"text": "<b>A brass bell that makes a resonant clang.</b><br><br>Gain 1 Sanity now.<br><br>Lose 1 Sanity if you lose the Bell.<br><br>Once during your turn after the haunt is revealed, you can attempt a Sanity roll to use the Bell:<br><br>5+ Move any number of unimpeded heroes 1 space closer to you.<br><br>0-4 The traitor can move any number of monsters 1 space closer to you. (If you are the traitor, this result has no effect.) If there is no traitor, all monsters move 1 space closer to you.<br><br><i class='material-icons'>sell</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1022,
			"type": "item",
			"name": "ADRENALINE SHOT",
			"text": "<b>A syringe containing a strange fluorescent liquid.</b><br><br>Before you attempt a trait roll, you can use this item to add 4 to the result of that roll.<br><br>Discard this item after you use it.<br><br><i class='material-icons'>sell</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2001,
			"type": "event",
			"name": "THE LOST ONE",
			"text": "<b>A woman wearing a Civil War dress beckons to you.<br>You fall into a trance.</b><br><br>You must attempt a Knowledge roll. If the result is 5 or more, you break out of your trance and gain 1 Knowledge; otherwise, roll 3 dice to see where the Lost One leads you:<br><br>6 Put your explorer in the Entrance Hall.<br><br>4-5 Put your explorer in the Upper Landing.<br><br>2-3 Draw room tiles until you find an upper floor room.<br><br>0-1 Draw room tiles until you find a basement room.<br><br>If this card requires you to draw a room tile for a specific floor, put that tile in the house, and put your explorer there. If you reach the end of the stack without drawing a room for the floor you rolled, put your explorer in the Entrance Hall instead.<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2002,
			"type": "event",
			"name": "THE VOICE",
			"text": "<b><i>\"I'm under the floor,<br>buried under the floor...\"<br><br>The voice whispers once, then is gone.</b><br><br>You must attempt a Knowledge roll:<br><br>4+ You find something under the floor. Draw an item card.<br><br>0-3 You dig and search for the voice, but to no avail.<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2003,
			"type": "event",
			"name": "THE WALLS",
			"text": "<b>This room is warm.<br>Flesh-like walls pulse with a steady heartbeat. Your own heart beats with the rhythm of the house. You are drawn into the walls... and emerge somewhere else.</b><br><br>You must draw the next room tile and put it in the house. Put your explorer in that room.<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2004,
			"type": "event",
			"name": "WEBS",
			"text": "<b>Casually, you reach up to brush some webs aside... but they won't brush away. They cling.</b><br><br>You must attempt a Might roll:<br><br>4+ You break free. Gain 1 Might and discard this card.<br><br>0-3 You're stuck. Keep this card.<br><br>If you're stuck, you can't do anything until you're freed. Once during an explorer's turn, any explorer can attempt a Might roll to free you. (You can also attempt this roll.) A 4+ succeeds, but you don't gain the 1 Might. Anyone failing an attempt can't move for the rest of that turn. After 3 unsuccessful attempts, you break free automatically on your next turn and take your turn normally.<br><br>When you're free, discard this event.<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2005,
			"type": "event",
			"name": "WHOOPS!",
			"text": "<b>You feel a body under your foot. Before you can leap away from it, you're knocked over. A giggling voice runs away from you.</b><br><br>One of the item cards (not omens) in your hand has been stolen. You may choose which one, because picking at random makes this event too annoying. Discard it.<br><br>If you have no items, then take no action.<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2006,
			"type": "event",
			"name": "SILENCE",
			"text": "<b>Underground, everything goes silent. Even the sound of breathing is gone.</b><br><br>Each explorer in the basement must attempt a Sanity roll.<br><br>4+ You wait calmly for your hearing to return.<br><br>1-3 You scream a silent scream.<br>Take 1 die of mental damage.<br><br>0 You freak out.<br>Take 2 dice of mental damage.<br><br>Each result affects only the explorer making that roll.<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2007,
			"type": "event",
			"name": "SKELETONS",
			"text": "<b>Mother and child, still embracing.</b><br><br>Put the Skeletons token in this room.<br>Take 1 die of mental damage.<br><br>Once during an explorer's turn, that explorer can attempt a Sanity roll to search the Skeletons:<br><br>5+ Draw an item card.<br>Remove the Skeletons token.<br><br>0-4 You dig around, but find nothing.<br>Take 1 die of mental damage.<br><br>Each result affects only the explorer making that roll.<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2008,
			"type": "event",
			"name": "SMOKE",
			"text": "<b>Smoke billows around you.<br>You cough, wiping away tears.</b><br><br>Put the Smoke token in this room. The Smoke blocks line of sight from adjacent rooms. An explorer rolls 2 fewer dice (minimum of 1 die) on all trait rolls while in this room.<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2009,
			"type": "event",
			"name": "SOMETHING HIDDEN",
			"text": "<b>There's something odd about this room, but what? It's tickling the back of your mind.</b><br><br>If you want to try to figure out what's odd, attempt a Knowledge roll:<br><br>4+ A section of wall slides away, revealing an alcove. Draw an item card.<br><br>0-3 You can't figure it out, and that makes you a bit crazy.<br>Lose 1 Sanity.<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2010,
			"type": "event",
			"name": "SOMETHING SLIMY",
			"text": "<b>What's around your ankle?<br>A bug? A tentacle?<br>A dead hand clawing?</b><br><br>You must attempt a Speed roll:<br><br>4+ You break free. Gain 1 Speed.<br><br>1-3 Lose 1 Might.<br><br>O Lose 1 Might and 1 Speed.<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2011,
			"type": "event",
			"name": "SPIDER",
			"text": "<b>A spider the size of a fist lands on your shoulder... and crawls into your hair.</b><br><br>You must attempt a Speed roll to brush it away or a Sanity roll to stand still:<br><br>4+ It's gone. Gain 1 in the trait you used to attempt this roll.<br><br>1-3 It bites you. Take 1 die of physical damage.<br><br>O It takes a chunk out of you.<br>Take 2 dice of physical damage.<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2012,
			"type": "event",
			"name": "THE BECKONING",
			"text": "<b>Outside.<br>You must get outside.<br>Fly to freedom!</b><br><br>Each explorer in the Gardens, Graveyard, Tower, on the Balcony, or in a room with an outside-facing window must attempt a Sanity roll:<br><br>3+ You back away from the ledge.<br><br>0-2 You jump to the Patio. (If it isn't in the house, search the room stack for it, put it in the house, and shuffle that stack.) Put your explorer there and take 1 die of physical damage.<br><br>Each result affects only the explorer making that roll.<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2013,
			"type": "event",
			"name": "NIGHT VIEW",
			"text": "<b>You see a vision of a ghostly couple walking the grounds, silently strolling in their wedding best.</b><br><br>You must attempt a Knowledge roll:<br><br>5+ You recognize the ghosts as former inhabitants of the house. You call their names, and they turn to you, whispering dark secrets of the house. Gain 1 Knowledge.<br><br>0-4 You pull back in horror, unable to watch.<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2014,
			"type": "event",
			"name": "PHONE CALL",
			"text": "<b>A phone rings in the room.<br>You feel compelled to answer it.</b><br><br>Roll 2 dice. A sweet little granny voice says:<br><br>4 <i>\"Tea and cakes! Tea and cakes! You always were my favorite!\"</i><br>Gain 1 Sanity.<br><br>3 <i>\"I'm always here for you, Pattycakes. Watching...\"</i><br>Gain 1 Knowledge.<br><br>1-2 <i>\"I'm here, Sweetums! Give us a kiss!\"</i><br>Take 1 die of mental damage.<br><br>0 <i>\"Bad little children must be punished!\"</i><br>Take 2 dice of physical damage.<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2015,
			"type": "event",
			"name": "POSSESSION",
			"text": "<b>A shadow separates from the wall. As you stand in shock, the shadow surrounds you and chills you to the core.</b><br><br>You must choose any one trait and attempt a roll for that trait:<br><br>4+ You resist the shadow's corruption. Gain 1 in a trait of your choice.<br><br>0-3 The shadow drains your energy. The chosen trait drops to its lowest value. (It doesn't drop to the skull.) If that trait is already at its lowest value, lower a different trait to its lowest value.<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2016,
			"type": "event",
			"name": "REVOLVING WALL",
			"text": "<b>The wall spins to another place.</b><br><br>Place the Wall Switch token on a wall without an exit in this room or a corner of this room. If there isn't a room on the other side of the Wall Switch, draw room tiles until you find one for this floor, then put it in the house. (If there are no more rooms on this floor, discard this card.) Then put your explorer in that room.<br><br>Once during an explorer's turn, if that explorer is in either room, he or she can attempt a Knowledge roll to use the Wall Switch:<br><br>3+ That explorer finds the hidden switch and goes through. This doesn't count as moving a space.<br><br>0-2 That explorer can't find the hidden switch and can't go through.<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2017,
			"type": "event",
			"name": "ROTTEN",
			"text": "<b>The smell in this room, it's horrible.<br>Smells like death, like blood.<br>A slaughterhouse smell.</b><br><br>You must attempt a Sanity roll:<br><br>5+ Troubling odors, nothing more.<br>Gain 1 Sanity.<br><br>2-4 Lose 1 Might.<br><br>1 Lose 1 Might and 1 Speed.<br><br>0 You double over with nausea.<br>Lose 1 Might, 1 Speed,1 Knowledge, and 1 Sanity.<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2018,
			"type": "event",
			"name": "SECRET PASSAGE",
			"text": "<b>A section of the wall slides away.<br>Behind it, a moldy tunnel awaits.</b><br><br>Put a Secret Passage token in this room. Roll 3 dice and place the second Secret Passage token in:<br><br>6 Any existing room.<br><br>4-5 Any existing upper floor room.<br><br>2-3 Any existing ground floor room.<br><br>0-1 Any existing basement room.<br><br>You can then use the Secret Passage, even if you don't have any movement left.<br><br>Moving from one Secret Passage token to the other counts as moving one space. (The passage itself doesn't count as a space.)<br><br>On later turns, any explorer can use the Secret Passage. An explorer can't end his or her turn in the passage.<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2019,
			"type": "event",
			"name": "SECRET STAIRS",
			"text": "<b>A horrible creaking sound echoes around you. You've discovered a secret stairwell.</b><br><br>Put one Secret Stairs token in this room and a second Secret Stairs token in an existing room on another floor. Moving from one Secret Stairs token to the other counts as moving one space. (The stairs don't count as a space.)<br><br>You can follow the stairs right now, even if you don't have any movement left. If you do follow them this turn, draw an event card in the new room.<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2020,
			"type": "event",
			"name": "SHRIEKING WIND",
			"text": "<b>The wind picks up, a slow crescendo to a screeching howl.</b><br><br>Each explorer in the Gardens, Graveyard, Patio, Tower, on the Balcony, or in a room with an outside-facing window, must attempt a Might roll:<br><br>5+ You keep your footing.<br><br>3-4 The wind knocks you down.<br>Take 1 die of physical damage.<br><br>1-2 The wind chills your soul.<br>Take 1 die of mental damage.<br><br>0 The wind knocks you down hard. Discard one of your items, or if you don't have any, take 1 die of physical damage.<br><br>Each result affects only the explorer making that roll.<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2021,
			"type": "event",
			"name": "JONAH'S TURN", // TODO: Puzzle box will get rarer, so include another item or two in this.
			"text": "<b>Two boys are playing with a wooden top. <i>\"Would you like a turn, Jonah?\"</i> one asks.<br><br><i>\"No,\"</i> says Jonah, <i>\"I want all the turns.\"</i> Jonah takes the top and hits the other boy in the face. The boy falls. Jonah keeps hitting him as they fade from view.</b><br><br>If an explorer has the Puzzle Box, that explorer discards that item and draws a replacement item for it. If this happens, you gain 1 Sanity; otherwise, you take 1 die of mental damage.<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2022,
			"type": "event",
			"name": "LIGHTS OUT", // TODO: Candle will get rarer, so include another item or two in this.
			"text": "<b>Your flashlight goes out.<br>Don't worry, someone else has batteries.</b><br><br>Keep this card. You can move only 1 space each turn until you end your turn in the same room as another explorer. At the end of that turn, discard this card. Then you can move normally again.<br><br>If you have the Candle or end your turn in the Furnace Room, discard this card.<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2023,
			"type": "event",
			"name": "LOCKED SAFE",
			"text": "<b>Behind a portrait is a wall safe.<br>It is trapped, of course.</b><br><br>Put the Safe token in this room.<br><br>Once during an explorer's turn, that explorer can attempt a Knowledge roll to open the Safe:<br><br>5+ Draw 2 item cards and remove the Safe token.<br><br>2-4 Take 1 die of physical damage.<br>The Safe won't open.<br><br>0-1 Take 2 dice of physical damage.<br>The Safe won't open.<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2024,
			"type": "event",
			"name": "MISTS FROM THE WALLS",
			"text": "<b>Mists pour out from the walls.<br>There are faces in the mist, human and... inhuman.</b><br><br>Each explorer in the basement must attempt a Sanity roll:<br><br>4+ The faces are tricks of light and shadow. All is well.<br><br>1-3 Take 1 die of mental damage (and 1 additional die of damage if that explorer is in a room with an event symbol).<br><br>0 Take 1 die of mental damage (and 2 additional dice of damage if that explorer is in a room with an event symbol).<br><br>Each result affects only the explorer making that roll.<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2025,
			"type": "event",
			"name": "MYSTIC SLIDE",
			"text": "<b>IF YOU'RE IN THE BASEMENT, THIS EVENT AFFECTS THE NEXT EXPLORER TO YOUR LEFT NOT IN THE BASEMENT. DISCARD THIS CARD IF ALL OF THE EXPLORERS ARE IN THE BASEMENT.<br><br>The floor falls from under you.</b><br><br>Place the Slide token in this room, then attempt a Might roll to use the Slide.<br><br>5+ You control the Slide. Put yourself in any explored room on any floor below the Slide.<br><br>0-4 Draw tiles from the room stack until you draw a basement room. Place the room tile. (If no basement rooms are in the stack, choose a basement room in play.) You fall to that room and take 1 die of physical damage. If it's not your turn, don't draw a card for that room.<br><br>Keep this card. On later turns, any explorer can attempt this roll to use the Slide.<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2026,
			"type": "event",
			"name": "GRAVE DIRT",
			"text": "<b>This room is covered in a thick layer of dirt. You cough as it gets on your skin and in your lungs.</b><br><br>You must attempt a Might roll:<br><br>4+ You shake it off. Gain 1 Might.<br><br>0-3 Something is wrong. Keep this card. Take 1 point of physical damage at the start of each of your turns. Discard this card if an item card increases one of your traits or if you end your turn in the Balcony, Gardens, Graveyard, Gymnasium, Larder, Patio, or Tower.<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2027,
			"type": "event",
			"name": "GROUNDSKEEPER",
			"text": "<b>You turn to see a man in groundskeeper clothing.<br>He raises his shovel and charges. Inches from your face, he disappears, leaving muddy footprints, and nothing more.</b><br><br>You must attempt a Knowledge roll. (An explorer in the Gardens rolls 2 fewer dice on this roll.)<br><br>4+ You find something in the mud.<br>Draw an item card.<br><br>0-3 The groundskeeper reappears and strikes you in the face with the shovel. The player on your right rolls a Might 4 attack for the Groundskeeper. You defend against this attack as normal, by rolling dice equal to your Might.<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2028,
			"type": "event",
			"name": "HANGED MEN",
			"text": "<b>A breeze chills the room.<br>Before you, three men hang from frayed ropes. They stare at you with cold, dead eyes.<br>The trio swing silently, then fade into dust that falls to the ground. You start to choke.<br><br>You must attempt a roll for each trait:<br><br>2+ That trait is unaffected.<br><br>0-1 Lose 1 from that trait.<br><br>If you roll a 2+ on all 4 rolls, gain 1 additional point in a trait of your choice.<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2029,
			"type": "event",
			"name": "HIDEOUS SHRIEK",
			"text": "<b>It starts like a whisper, but ends in a soul-rending shriek.</b><br><br>Each explorer must attempt a Sanity roll:<br><br>4+ You resist the sound.<br><br>1-3 Take 1 die of mental damage.<br><br>O Take 2 dice of mental damage.<br><br>Each result affects only the explorer making that roll.<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2030,
			"type": "event",
			"name": "IMAGE IN THE MIRROR", // TODO: rename stack to deck?
			"text": "<b>IF YOU DON'T HAVE ANY ITEM CARDS, THIS EVENT AFFECTS THE NEXT EXPLORER TO YOUR LEFT WITH AN ITEM CARD. DISCARD THIS CARD IF NO EXPLORER HAS AN ITEM CARD.<br><br>There is an old mirror in this room.<br>Your frightened reflection moves on its own. You realize it is you from another time. You need to help your reflection, so you write on the mirror:<br><br><i>THIS WILL HELP</i><br><br>You then hand an item through the mirror.</b><br><br>Choose one of your item cards (not an omen card) and shuffle it into the item stack. Gain 1 Knowledge.<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2031,
			"type": "event",
			"name": "IMAGE IN THE MIRROR", // TODO: It's great when both mirror cards are used in the game. Add a third mirror card somehow. Maybe you witness the handover from afar. But then it's not mirror related? Maybe you meet a man polishing a mirror, who tells you it's secret, and you can choose to smash it?
			"text": "<b>There is an old mirror in this room.<br>Your frightened reflection moves on its own. You realize it is you from another time. Your reflection writes on the mirror:<br><br><i>THIS WILL HELP</i><br><br>Then it hands you an item through the mirror.</b><br><br>Draw an item card.<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2032,
			"type": "event",
			"name": "IT IS MEANT TO BE",
			"text": "<b>You collapse to the floor, visions of future events pouring through your head.</b><br><br>Choose one of these 2 options:<br><br>&bull; Draw cards from the item, omen or event stack until you find a card of your choice. Shuffle the unwanted cards back into the stack. Keep the chosen card in you hand and don't tell anyone what it is. The next time anyone should draw that type of card, they draw your chosen card. (Ask them to manually draw the card with that number, then discard yours.)<br><br>&bull; You can choose instead to roll 4 dice and write down the result. For one future die roll of your choice that you attempt, you can use that number instead of rolling. If that number is higher than the maximum possible result, use the maximum possible result instead.<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2033,
			"type": "event",
			"name": "CREEPY CRAWLIES",
			"text": "<b>Exactly one thousand bugs spill out on your skin, under your clothes, and in your hair.</b><br><br>You must attempt a Sanity roll:<br><br>5+ You blink, and they're gone.<br>Gain 1 Sanity.<br><br>1-4 Lose 1 Sanity.<br><br>O Lose 2 Sanity.<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2034,
			"type": "event",
			"name": "CREEPY PUPPET", // TODO: Add another item to affect.
			"text": "<b>You see one of those dolls that give you the willies.<br>It jumps at you with a tiny spear.</b><br><br>The player on your right rolls a Might 4 attack for the Creepy Puppet. You defend against this attack as normal, by rolling dice equal to your Might.<br><br>If you take any damage from this attack, the explorer with the Spear gains 2 Might (unless you have the Spear).<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2035,
			"type": "event",
			"name": "DEBRIS",
			"text": "<b>Plaster falls from the walls and ceiling.</b><br><br>You must attempt a Speed roll:<br><br>3+ You dodge the plaster.<br>Gain 1 Speed.<br><br>1-2 You're buried in debris.<br>Take 1 die of physical damage.<br><br>0 You're buried in debris.<br>Take 2 dice of physical damage.<br><br>If you're buried, keep this card. You can't do anything until you're freed. Once during an explorer's turn, that explorer can attempt a Might roll to free you. (You can also attempt this roll.) A 4+ succeeds. After 3 unsuccessful attempts, you break free automatically on your next turn and take your turn normally.<br><br>Discard this card when you're free.<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2036,
			"type": "event",
			"name": "DISQUIETING SOUNDS",
			"text": "<b>A baby's cry, lost and abandoned.<br>A scream.<br>The crack of breaking glass.<br>Then silence.</b><br><br>Roll 6 dice. If you roll equal to or more than the number of omens that have been revealed, you gain Sanity. If not, take 1 die of mental damage.<br><br>(Note from the editor: aren't all sounds <i>disquieting</i>?)<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2037,
			"type": "event",
			"name": "DRIP...<br>DRIP...<br>DRIP...",
			"text": "<b>A rhythmic sound that needles at your brain.</b><br><br>Put the Drip token in this room.<br><br>Each explorer rolls 1 fewer die (minimum of 1) on all trait rolls while in this room.<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2038,
			"type": "event",
			"name": "FOOTSTEPS",
			"text": "<b>The floorboards slowly creak.<br>Dust rises. Footprints appear on the dirty floor. And then, as they reach you, they are gone.</b><br><br>Roll 1 die. (An explorer in the Chapel rolls 1 additional die on this roll.)<br><br>4 You and the nearest explorer gain 1 Might.<br><br>3 You gain 1 Might, and the nearest explorer loses 1 Sanity.<br><br>2 Lose 1 Sanity.<br><br>1 Lose 1 Speed.<br><br>0 Each explorer loses 1 point from a trait of his or her choice.<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2039,
			"type": "event",
			"name": "FUNERAL",
			"text": "<b>You see an open coffin.<br>You're inside it.</b><br><br>You must attempt a Sanity roll:<br><br>4+ You blink, and it's gone.<br>Gain 1 Sanity.<br><br>2-3 The vision disturbs you.<br>Lose 1 Sanity.<br><br>0-1 You're really in that coffin.<br>Lose 1 Sanity and 1 Might as you dig yourself out. If the Graveyard or the Crypt has been found, put your explorer in one of those rooms (you choose which one).<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2040,
			"type": "event",
			"name": "A MOMENT	OF HOPE",
			"text": "<b>Something feels strangely right about this room. Something is resisting the evil of the house.</b><br><br>Place the Blessing token in this room.<br><br>Each hero rolls 1 additional die (maximum of 8 dice) on all trait rolls while in this room.<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2041,
			"type": "event",
			"name": "ANGRY BEING",
			"text": "<b>It emerges from the slime on the wall next to you.</b><br><br>You must attempt a Speed roll:<br><br>5+ You get away. Gain 1 Speed.<br><br>2-4 Take 1 die of mental damage.<br><br>0-1 Take 1 die of mental damage and 1 die of physical damage.<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2042,
			"type": "event",
			"name": "BLOODY VISION",
			"text": "<b>The walls of this room are damp with blood.<br>The blood drips from the ceiling, down the walls, over the furniture, and onto your shoes.<br>In a blink, it is gone.</b><br><br>You must attempt a Sanity roll:<br><br>4+ You steel yourself. Gain 1 Sanity.<br><br>2-3 Lose 1 Sanity.<br><br>0-1 If an explorer or monster is in your room or an adjacent one, you must attack it (if you can). Choose the explorer with the lowest Might, if possible.<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2043,
			"type": "event",
			"name": "BURNING MAN",
			"text": "<b>A man on fire runs through the room. His skin bubbles and cracks, falling away from him and leaving a fiery skull that clatters to the ground, bounces, rolls, and disappears.</b><br><br>You must attempt a Sanity roll:<br><br>4+ You feel a little hot under the collar, but otherwise fine.<br>Gain 1 Sanity.<br><br>2-3 Out, out, you must get out.<br>Put your explorer in the Entrance Hall.<br><br>0-1 You burst into flames!<br>Take 1 die of physical damage. Then take 1 die of mental damage as you put out the flames.<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2044,
			"type": "event",
			"name": "CLOSET DOOR",
			"text": "<b>That closet door is open... just a crack. There must be something inside.<br><br>Put the Closet token in this room.<br><br>Once during an explorer's turn, that explorer can roll 2 dice to open the Closet:<br><br>4 Draw an item card.<br><br>2-3 Draw an event card.<br><br>0-1 Draw an event card and remove the Closet token.<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2045,
			"type": "event",
			"name": "WHAT THE...?",
			"text": "<b>As you look back the way you came, you see... nothing.<br>Just empty fog and mist where a room used to be.</b><br><br>Pick up the tile for the room you are in. Put it somewhere else on the same floor of the house so its door is attached to a different unexplored doorway. If there isn't an unexplored doorway on this floor, move the room to a different floor.<br><br><i class='material-icons'>bolt</i>",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 3001,
			"type": "omen",
			"name": "SPIRIT BOARD",
			"text": "<b>A board with letters and numbers to call the dead.</b><br><br>Before you move during your turn, you can look at the top tile of the room stack.<br><br>If you use the Spirit Board after the haunt has been revealed, the traitor can move any number of monsters 1 space closer to you. (If you are the If the traitor, you don't have to move those monsters.) If there is no traitor, all monsters move 1 space closer to you.<br><br><i class='material-icons'>visibility</i><br><br>Make a haunt roll now.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 3002,
			"type": "omen",
			"name": "SPEAR",
			"text": "<b>WEAPON<br><br>A weapon pulsing with power.</b><br><br>You roll 2 additional dice (maximum of 8 dice) when making a Might attack with this weapon.<br><br>You can't use another weapon while you're using this one.<br><br><i class='material-icons'>visibility</i><br><br>Make a haunt roll now.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 3003,
			"type": "omen",
			"name": "SKULL",
			"text": "<b>A skull, cracked and missing teeth.</b><br><br>If you take mental damage, you can take all of it as physical damage instead.<br><br><i class='material-icons'>visibility</i><br><br>Make a haunt roll now.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 3004,
			"type": "omen",
			"name": "RING",
			"text": "<b>A battered ring with an incomprehensible inscription.</b><br><br>If you attack an opponent that has a Sanity trait, you can attack with Sanity instead of Might. (Your opponent then defends with Sanity, and damage is mental instead of physical.)<br><br><i class='material-icons'>visibility</i><br><br>Make a haunt roll now.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 3005,
			"type": "omen",
			"name": "MEDALLION",
			"text": "<b>A medallion inscribed with a pentagram.</b><br><br>You are immune to the effects of the Pentagram Chamber, Crypt, and Graveyard.<br><br><i class='material-icons'>visibility</i><br><br>Make a haunt roll now.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 3006,
			"type": "omen",
			"name": "MASK",
			"text": "<b>A somber mask to hide your intentions.</b><br><br>Once during your turn, you can attempt a Sanity roll to use the Mask:<br><br>4+ You can put on or take off the Mask.<br><br>If you put on the Mask, gain 2 Knowledge and lose 2 Sanity.<br><br>If you take off the Mask, gain 2 Sanity and lose 2 Knowledge.<br><br>0-3 You can't use the Mask this turn.<br><br><i class='material-icons'>visibility</i><br><br>Make a haunt roll now.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 3007,
			"type": "omen",
			"name": "MADMAN",
			"text": "<b>COMPANION<br><br>A raving, frothing madman.</b><br><br>Gain 2 Might and lose 1 Sanity now.<br><br>Lose 2 Might and gain 1 Sanity if you lose custody of the Madman.<br><br>This omen can't be dropped, traded, or stolen.<br><br><i class='material-icons'>visibility</i><br><br>Make a haunt roll now.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 3008,
			"type": "omen",
			"name": "HOLY SYMBOL",
			"text": "<b>A symbol of calm in an unsettling world.</b><br><br>Gain 2 Sanity now.<br><br>Lose 2 Sanity if you lose the Holy Symbol.<br><br><i class='material-icons'>visibility</i><br><br>Make a haunt roll now.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 3009,
			"type": "omen",
			"name": "GIRL",
			"text": "<b>COMPANION<br><br>A girl.<br><br>Trapped.<br><br>Alone.<br><br>You free her!</b><br><br>Gain 1 Sanity and 1 Knowledge now.<br><br>Lose 1 Sanity and 1 Knowledge if you lose custody of the Girl.<br><br>This omen can't be dropped, traded, or stolen.<br><br><i class='material-icons'>visibility</i><br><br>Make a haunt roll now.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 3010,
			"type": "omen",
			"name": "DOG",
			"text": "<b>COMPANION<br><br>This mangy dog seems friendly.<br>At least you hope it is.</b><br><br>Gain 1 Might and 1 Sanity now.<br><br>Lose 1 Might and 1 Sanity if you lose custody of the Dog.<br><br>Take a small monster token to represent the Dog. Put it in your room. (Use a token of a different color from other monsters, if any.) Once during your turn, the Dog can move to any explored room up to 6 spaces away, using doors and stairs, and then return. It can pick up, carry, and/or drop 1 item before it returns.<br><br>The Dog isn't slowed by opponents. It can't use one-way passages or rooms that require a roll. It can't carry items that slow movement.<br><br>This omen can't be dropped, traded, or stolen.<br><br><i class='material-icons'>visibility</i><br><br>Make a haunt roll now.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 3011,
			"type": "omen",
			"name": "CRYSTAL BALL", // TODO: add card trading via links. Or maybe use ID entry as it doesn't involve multiple tabs getting out of sync.
			"text": "<b>Hazy images appear in the glass.</b><br><br>Once during your turn after the haunt is revealed, you can attempt a Knowledge roll to peer into the Crystal Ball:<br><br>4+ You see the truth. Draw cards from the item or event stack until you find a card of your choice. Shuffle the unwanted cards back into the stack. Keep the chosen card in you hand and don't tell anyone what it is. The next time anyone should draw that type of card, they draw your chosen card. (Ask them to manually draw the card with that number, then discard yours.)<br><br>1-3 You avert your eyes.<br>Lose 1 Sanity.<br><br>0 You stare into Hell.<br>Lose 2 Sanity.<br><br><i class='material-icons'>visibility</i><br><br>Make a haunt roll now.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 3012,
			"type": "omen",
			"name": "BOOK",
			"text": "<b>A diary or lab notes?<br>Ancient script or modern ravings?</b><br><br>Gain 2 Knowledge now.<br><br>Lose 2 Knowledge if you lose the Book.<br><br><i class='material-icons'>visibility</i><br><br>Make a haunt roll now.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 3013,
			"type": "omen",
			"name": "BITE",
			"text": "<b>A growl, the scent of death.<br>Pain. Darkness. Gone.</b><br><br>When you draw this card, something bites you. The player on your right rolls a Might 4 attack against you for the mysterious something (before it runs away into the darkness). You defend against this attack as normal, by rolling dice equal to your Might.<br><br>This omen can't be dropped, traded, or stolen.<br><br><i class='material-icons'>visibility</i><br><br>Make a haunt roll now.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
	],

	// "text": "<b>You feel a tickling sensation on the top of your head. You look up... and see a girl standing on the ceiling! She's staring down at you and her long messy hair is dangling just shy of your face. Before you can react she drops and lands on you.</b><br>You must attempt a Might or Sanity roll.<br><b>(Might 5+)</b> You pin her in a chokehold until she goes limp. You step over her body and continue on your way. Gain 1 Sanity.<br><b>(Sanity 5+)</b> You scream at her to go to her room and she stomps out through the door in a huff. Gain 1 Might.",

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
		const items = _.filter(state.deck, d => card.get(d)["type"] == "item");
		card.draw(items[Math.floor(rand() * items.length)]);
	},

	"drawOmen": () => {
		// Pick an omen from the deck at random.
		const omens = _.filter(state.deck, d => card.get(d)["type"] == "omen");
		card.draw(omens[Math.floor(rand() * omens.length)]);
	},

	"drawEvent": () => {
		// Pick an event from the deck at random.
		const events = _.filter(state.deck, d => card.get(d)["type"] == "event");
		card.draw(events[Math.floor(rand() * events.length)]);
	},

	"renderDeck": () => {
		// Render the decks.
		if ($("#top-content div").length == 0) {
			$("#top-content")
				.append(
					$("<div>")
						.addClass("deck")
						.attr("id", "items")
						.html("items")
						.append($("<div>")
							.addClass("tab")
							.css({
								"background-color": "gray",
								"width": "40%",
								"height": "2em",
								"position": "absolute",
								"bottom": "1vh",
								"right": "-1vw",
							})
						)
				)
				.append(
					$("<div>")
						.addClass("deck")
						.attr("id", "omens")
						.html("omens")
						.append($("<div>")
							.addClass("tab")
							.css({
								"background-color": "gray",
								"width": "40%",
								"height": "2em",
								"position": "absolute",
								"bottom": "1vh",
								"right": "-1vw",
							})
						)
				)
				.append(
					$("<div>")
						.addClass("deck")
						.attr("id", "events")
						.html("events")
						.append($("<div>")
							.addClass("tab")
							.css({
								"background-color": "gray",
								"width": "40%",
								"height": "2em",
								"position": "absolute",
								"bottom": "1vh",
								"right": "-1vw",
							})
						)
				)
				.append(
					$("<div>")
						.addClass("deck")
						.attr("id", "discard")
						.html("discard")
						.append($("<div>")
							.addClass("tab")
							.css({
								"background-color": "gray",
								"width": "40%",
								"height": "2em",
								"position": "absolute",
								"bottom": "1vh",
								"right": "-1vw",
							})
						)
				);

				// Bind events.
				$("#items").click(betrayal.drawItem);
				$("#omens").click(betrayal.drawOmen);
				$("#events").click(betrayal.drawEvent);
				$("#discard").click(card.drawDiscard);

				$("body").addClass("betrayal");
		}
	},

	// Add card content to $(element).
	"renderCard": (element) => {
		let c = card.get(element.attr("id"));

		element
			.addClass(c["type"])
			.html(c["text"])
			.prepend($("<div></div>").
				html(c["name"])
				.css({ "margin-bottom": "20px" }));

		return element;
	},

	"init": () => {
		return;
	},
}; 
