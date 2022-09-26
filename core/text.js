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

	"players": "Select the number of players in the game.",

	"start": "Start",

	"link": "Send one unique link to each player. Each player must use a different link to play the game.",

	"find": "Enter a card ID number to find it and draw it, regardless of it's current location.",

	"draw": "Draw",
};