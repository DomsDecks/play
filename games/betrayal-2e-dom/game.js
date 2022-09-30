const betrayal_2e_dom = {

	"displayName": "Betrayal at House on the Hill (2nd Edition) (Dom's Expansion)",

	"assetPath": betrayal_2e.assetPath,

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