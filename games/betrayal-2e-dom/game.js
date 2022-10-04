const betrayal_2e_dom = {

	"displayName": "Betrayal at House on the Hill (2nd Edition) (Dom's Expansion)",

	"assetPath": betrayal_2e.assetPath,

	"code": "d",

	"assets": betrayal_2e.assets,

	"text": betrayal_2e.text,

	// All cards in the game.
	"cards": betrayal_2e.cards.concat([
		/*{
			"id": 2101,
			"type": "item",
			"name": "Healing Salve",
			"text": "You find a laminated note conspicuously left on the floor in the middle of the room. You may choose to read it, but if you start, you must not stop.#n#n<i>My name is mister gelavator, of the mystic elevator.#nMy fantastical contraption, has a spooky action.#nWhen you step inside, you're destined for a ride.#nIf you close the doors, you'll travel between floors.#nIt's an actuated box that you cannot outfox.#nHanging by a cable, it will hold you if it's able.#nBut if there's any trouble, you might end up in rubble...#nAs this transitory room, sometimes goes kaboom!</i>#n#nReading the scroll has activated the curse: the next use of the mystic elevator will be the last. Everyone inside will take 1 physical damage. Regardless of its outcome, and it will fall apart afterwards.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": false,
		},*/
	]),

	// "text": "<b>You feel a tickling sensation on the top of your head. You look up... and see a girl standing on the ceiling! She's staring down at you and her long messy hair is dangling just shy of your face. Before you can react she drops and lands on you.</b><br>You must attempt a Might or Sanity roll.<br><b>(Might 5+)</b> You pin her in a chokehold until she goes limp. You step over her body and continue on your way. Gain 1 Sanity.<br><b>(Sanity 5+)</b> You scream at her to go to her room and she stomps out through the door in a huff. Gain 1 Might.",

	// Do the initial shuffling and dividing, and get the game states for each player.
	"startGame": betrayal_2e.startGame,

	// Render the decks used in the game into #top-content.
	"renderDeck": betrayal_2e.renderDeck,

	// Add card content to $(element).
	"renderCard": betrayal_2e.renderCard,
};