const betrayal_2e_dom = {

	"displayName": "Betrayal at House on the Hill (2nd Edition) (Dom's Expansion)",

	"assetPath": betrayal_2e.assetPath,

	"code": "d",

	"assets": betrayal_2e.assets,

	"text": betrayal_2e.text,

	// All cards in the game.
	"cards": betrayal_2e.cards.concat([
		{
			"id": 1101,
			"type": "item",
			"name": "Raven", // TODO: not balanced at all. Also Magpies find treasure.
			"text": "#bNevermore.#dIf you are not in the basement, you may choose to not move during your turn and instead send this <i>companion</i> out to find treasure. In this case, roll 1 die and draw that many item cards. You may not use the Raven if you already hold 5 or more items, including the Raven.#n#nWhen the haunt begins the Raven flees and takes one item with it. Discard the Raven and one other item of your choice, if you have any.#n#nIf the Raven is discovered after the haunt has begun, it drops an item into your hands and flies off. Discard the Raven and draw another item.",
		},
		{
			"id": 1102,
			"type": "item",
			"name": "Absinthe",
			"text": "#bA bottle of vile absinthe. You have nothing to mix it with.#dAt the start of your turn you may drink the entire bottle to lose 2 Speed and Gain 2 Might.#n#nThe next time you lose a fight after drinking, your damage taken is reduced by 1, although the outcome of the fight doesn't change.#n#nDiscard this item after you use it.",
		},
		{
			"id": 1103,
			"type": "item",
			"name": "Bible",
			"text": "#bAn old and well used Bible.#nThe edges of the pages are crinkly and the paper has yellowed.#dAt the start of your turn you may read this if you wish to lose 2 Knowledge and gain 2 Sanity.#n#nAfter reading, you may avoid the roll the next time you are in the Pentagram Chamber.#n#nDuring this spooky evening there is only time for someone to read the Bible once, so discard this item after you use it.",
		},
		{
			"id": 1104,
			"type": "item",
			"name": "Frog",
			"text": "#bThis frog seems to hold himself in a distinguished manner.#dOnce per turn you may kiss the Frog and roll 3 dice:#r0-2#tEw, gross.#nTake 1 Physical damage.#y#r3#tThe Frog turns into a prince. How could this have happened? Did your kiss have magic powers or was it the placebo effect?#nGain 1 in every trait and then draw an item card.#nDiscard the prince.#y#r4-6#tEw, gross.#nTake 1 Mental damage.#y",
		},
		{
			"id": 1105,
			"type": "item",
			"name": "Brain Implant",
			"text": "#bSealed in sterile packaging is a syringe with a very wide and sharp needle. It's purpose it to inject a device the size of a grape into the brain through the back of the neck.#dAt the start of your turn, you may choose to inject yourself or any other human in the same room. They will gain 2 knowledge and lose 2 might, although it is never fatal.#n#nDiscard this item after you use it.",
		},
		{
			"id": 1106,
			"type": "item",
			"name": "Potion of Speed",
			"text": "#bIt smells of gasoline.#dAt the start of your turn you may quaff the entire Potion of Speed.#nYou will be able to move through 4 more rooms than normal that turn.#n(This does not affect your Speed when making rolls.)#nIt lasts until the end of your turn, whereupon you lose 1 Speed.#n#nDiscard this item after you use it.",
		},
		{
			"id": 1107,
			"type": "item",
			"name": "Marvelous Medicine",
			"text": "#bA jar of viscous purple medicine.#dDuring your turn you may ingest the Marvelous Medicine.#nThis will reduce your sanity by 2 and end your turn, but all of your other traits which are only 1 or 2 levels above the skull will increase by 2.",
		},
		{
			"id": 1108,
			"type": "item",
			"name": "Holy Talisman",
			"text": "#bWorn around the neck, this protects the wearer from evil and harm.#dWhen the haunt starts, or when discovered during the haunt, the wearer gains 2 in all traits which are only 1 or 2 levels above the skull.#n#nAfter the haunt has started this item can not be dropped, traded or stolen.",
		},
		{
			"id": 1109,
			"type": "item",
			"name": "Phoenix Feather",
			"text": "#bIs this from a real phoenix?#nOr is it a goose feather dipped in red ink?#dIf at any point one of your physical traits drops to the skull or the level above the skull, you immediately eat the feather and make a sanity roll:#r5+#tYou do not beleive in phoenixes and it has no effect.#y#r0-4#tYou beleive it will save you and that's all that matters.#nGain 3 in the trait you just lost.",
		},
		{
			"id": 1110,
			"type": "item",
			"name": "Worm",
			"text": "#bA slimy and gross worm.#nIt is of regular size and is not visibly supernatural in any way.#dthis <i>companion</i> has a speed of 2.#nThe worm can be instructed to move around and lie in wait. if any non-flying being passes through the room with the worm, the owner can declare <i>\"You stepped on my worm!\"</i> causing the target to be unable to move to any other rooms that turn. In this case, the worm is destroyed.",
		},
		{
			"id": 1111,
			"type": "item",
			"name": "Map",// TODO search for haunt and exlplor and make sure the phase names and character names are correct.
			"text": "#bI solemnly swear I am going to be naughty.#dAt the start of your turn, and only during the exploration phase, you may draw a tile and place it adjacent to the room you are currently in.#n#nIf it contains an omen, take 1 mental damage and then enter it and follow it's rules.#n#nOtherwise, you may choose to either gain one knowledge and end your turn, or enter the room and follow it's rules.#nIf you do not enter the room, the next player to enter it does not draw it's card. It is considered discovered already.",
		},
		{
			"id": 1112,
			"type": "item",
			"name": "Ravenous Raccoon",
			"text": "#bIt will eat <i>anything</i>.#dOnce at the start of each of your turns, you may feed any other 1 item to this <i>companion</i>. If you do, discard that item and gain 2 in all traits that are 1 level above the skull.#n#nThe Raccoon really likes Walnuts and proposes a trade: additionally draw an item card if you feed it a Walnut.",
		},
		{
			"id": 1113,
			"type": "item",
			"name": "Gluttonous Gerbil",
			"text": "#bIt's <i>nuts</i> for nuts.#dOnce at the start of each of your turns, you may feed any other 1 item to this <i>companion</i>. If you do, discard that item and gain 1 Sanity#n#nThe Gerbil really likes Walnuts and will be grateful to be fed any. Additionally gain 1 Might, 1 Speed and 1 Knowledge if you feed it a Walnut.",
		},
		{
			"id": 1114,
			"type": "item",
			"name": "Walnut",
			"text": "#bThis item is of no use to you.#d",
		},

		{
			"id": 1115,
			"type": "item",
			"name": "Walnut",
			"text": "#bThis item is of no use to you.#d",
		},
		{
			"id": 1116,
			"type": "item",
			"name": "Secret Scroll",
			"text": "#bA rolled up and wax sealed scroll - for your eyes only.#n#nDON'T READ ANY MORE ALOUD.#dThe scroll contains a secret technique for summoning items from afar. When the player to your left next draws an item from the stack, you can reaveal and use this scroll to immediately steal the item.#n#nYou may announce your intent to steal after they have read the card they have drawn. You do not need to be nearby in the house. They won't let an item so easily out of their grasp next time, so discard this item after you use it.",
		},
		{
			"id": 1117,
			"type": "item",
			"name": "Secret Scroll",
			"text": "#bA rolled up and wax sealed scroll - for your eyes only.#n#nDON'T READ ANY MORE ALOUD.#dThe scroll contains a secret technique for absorbing qi (chi) from afar. When the player to your right next makes a trait roll (not including attack or defence), you can reveal and use this scroll to reduce their score by 1 and then gain 1 in that trait yourself.#n#nIt will only work if you start to announce your intent to absorb qi while their dice are still in motion. You do not need to be nearby in the house. They won't lose focus so easily next time, so discard this item after you use it.",
		},
		{
			"id": 1118,
			"type": "item",
			"name": "Secret Scroll",
			"text": "#bA rolled up and wax sealed scroll - for your eyes only.#n#nDON'T READ ANY MORE ALOUD.#dThe scroll contains a secret technique for being in the limelight and being the centre of attention. When any other player next triggers an event, you can reveal and use this scroll to immediately trigger the event yourself instead of them. If the event demands you roll any dice, you may either add or remove 1 from the total score of the first roll.#n#nIt will only work if you announce your intent to make everything about you before the other player draws the event card themselves. You do not need to be nearby in the house. They won't let you steal the show so easily next time, so discard this item after you use it.",
		},
		{
			"id": 1119,
			"type": "item",
			"name": "Secret Scroll",
			"text": "#bA rolled up and wax sealed scroll - for your eyes only.#n#nDON'T READ ANY MORE ALOUD.#dThe scroll contains a secret technique for guiding the hands of fate. After you make a dice roll on behalf of your character of any kind (including haunt, attack and defence rolls for your own character), you can reveal and use this scroll to increase or decrease the total score by 1.#n#nFate may not be so kind to you next time, so discard this item after you use it.",
		},
		{
			"id": 1120,
			"type": "item",
			"name": "Bag of Bees",
			"text": "#bBuzzzzzzz...#dSomeone has left a bag here. The bag is full of bees.#n#nAt the start of your turn you may open it to unleash all the bees. They might be angry and it's probably best to run as fast possible, so gain 2 speed and lose 2 sanity.#n#nDiscard this item after you use it.",
		},
		{
			"id": 1121,
			"type": "item",
			"name": "Dark Pact",
			"text": "#bA mark on your arm forever.#dYou are tainted by this item, which has merged into your arm leaving a mark like a tattoo. When the haunt starts, before the nature of the haunt is revealed, discard this item and choose one of these effects:#n#nGain 3 in all traits that are 1 level above the skull.#cGain 1 in all traits below their starting levels.#n#nIf you find this item after the haunt starts, take 1 mental damage and discard it.#nThis item can't be dropped, traded, or stolen.",
		},
		{
			"id": 1122,
			"type": "item",
			"name": "Refreshing Tonic", // TODO: deal with the rooms in these 4 cards.
			"text": "#bCould be a nice way to clear your mind?#dWhile you are in the Study, Dining Hall or Games Room, you may drink the tonic to gain 1 Might.#n#nThis does not end your turn and you may continue to move if possible.#nDiscard this item after you use it.",
		},
		{
			"id": 1123,
			"type": "item",
			"name": "Fresh Kicks",
			"text": "#bA nice pair of shoes.#dWhile you are in the Bedroom, Closet or x, you may put these on to gain 1 Speed.#n#nThis does not end your turn and you may continue to move if possible, taking into account your new speed.#nDiscard this item after you use it.",
		},
		{
			"id": 1124,
			"type": "item",
			"name": "Words of Wisdom",
			"text": "#bA short book about the basics of critical thinking. It has lots of pictures.#dWhile you are in the Library, Study or Office, you may read this to gain 1 Knowledge.#n#nThis does not end your turn and you may continue to move if possible.#nDiscard this item after you use it.",
		},
		{
			"id": 1125,
			"type": "item",
			"name": "Nice Trinket",
			"text": "#bYou're not sure what it is, but you like it.#dWhile you are in the Pentagram Chamber, Laboratory or Caverns, you may fondle this to reassure yourself and gain 1 Sanity.#n#nThis does not end your turn and you may continue to move if possible.#nDiscard this item after you use it.",
		},
		{
			"id": 1126,
			"type": "item",
			"name": "Shark Tooth Necklace",
			"text": "#bA necklace made with a series of different sized shark teeth. It makes the wearer look badass.#dGain 1 Speed while wearing it. Lose 1 Speed if you lose the necklace.#n#nIf the wearer has lost sanity due to a fear of sharks at any point in the game, they gain 2 Sanity, and the necklace can no longer be dropped, traded, or stolen.",
		},









		{
			"id": 2101,
			"type": "event",
			"name": "Gelavator's Curse",
			"text": "You find a laminated note conspicuously left on the floor in the middle of the room. <b>You may choose to read it, but if you start, you must not stop.</b>#n#n<i>My name is Mister Gelavator, of the Mystic Elevator.#n#nMy fantastical contraption, has a spooky action.#n#nWhen you step inside, you're destined for a ride.#n#nIf you close the doors, you'll travel between floors.#n#nIt's an actuated box that you cannot outfox.#n#nHanging by a cable, it will hold you if it's able.#n#nBut if there's any trouble, you might end up in rubble...#n#nAs this transitory room, sometimes goes kaboom!</i>#n#nReading this has activated the curse: the next use of the Mystic Elevator will be the last. Everyone inside will take 1 physical damage. Regardless of its outcome, and it will fall apart afterwards.",
		},
		{
			"id": 2102,
			"type": "event",
			"name": "Gelavator's Key",
			"text": "As you walk through the door you interrupt the business of a portly man in a neat uniform. He's muttering to himself:#n#n<i>\"if anybody cares, it's faster than the stairs...\"#n#n\"Oh, hello, have you considered taking my elevator? Here, this key will be of use to you.\"</i>#n#nHe presses a small brass key into your palm and waddles away.#n#n<i>\"It's good fun for all, as long as you don't fall...\"</i>#n#nThe key is added to your hand. From now on, the Mystic Elevator can only be used if the bearer of this key is inside.",
		},
		{
			"id": 2103,
			"type": "event",
			"name": "Abduction",
			"text": "#bArms grab you from behind.#nA bag goes over your head.#nDarkness.#dMake a roll of your worst trait:#r4+#tYou somehow escape. You are safe.#y#r0-3#tNobody will ever see <i>you</i> again, but <i>someone else</i> appears and they're wearing your clothes. Flip your character tile and reset all your traits to their defaults. If you rolled a 0, choose 1 trait to decrease by 1, otherwise increase a trait by 1.#y",
		},
		{
			"id": 2104,
			"type": "event",
			"name": "Ratfather",
			"text": "#bSqueak squeak?#dOut of the corner of your eye you spot a rat, walking on its hind legs through a crack in the skirting boards. A moment later it spots you and scurries back on all fours from whence it came. You don't quite believe yourself, but for that moment it appeared to be wearing a top hat and waistcoat.#n#nIf there have been no such other sightings, you doubt your own experience and lose 1 Sanity. Otherwise, gain 1 Knowledge.",
		},
		{
			"id": 2105,
			"type": "event",
			"name": "Ratmother",
			"text": "#bSqueak sqeak?#dYou hear a scrabbling noise emanating from a cabinet. You pull open the doors to find it mostly empty. A rat's tail quickly disappeares around a loose board in the back and you glimpse a streak of purple as though it was adorned with a ribbon bow. Left behind inside the cabinet is a miniature teacup, smaller than a thimble.#n#nIf there have been no such other sightings, you bang your head on the wooden door as you turn around and lose 1 Knowledge. Otherwise, gain 1 Knowledge.",
		},
		{
			"id": 2106,
			"type": "event",
			"name": "Ratbrother",
			"text": "#bSqueak squeak?#dA creaking noise from overhead grabs your attention. You look up to see the flickering silhouette of a rat cast against the wall by candlelight. It's hard to tell from the shadow but it might have been wearing boots and gloves, and possibly even a cloak. As you turn to look towards the candle, the shadow valishes with another creak.#n#nIf there have been no such other sightings, you get a stiff neck from looking around and lose 1 Speed. Otherwise, gain 1 Knowledge.",
		},
		{
			"id": 2107,
			"type": "event",
			"name": "Ratsister",
			"text": "#bSqueak squeak?#dOn a wooden beam overhead you see a rat, frozen in place, looking back at you. As you pass by underneath it, it scrabbles away and a tiny beret drops like a leaf beside you. How could this be? Can you pull yourself up to look for more miniature clothing?#n#nIf there have been no such other sightings, you pull a muscle while climbing and lose 1 Might. Otherwise, gain 1 Knowledge.",
		},

		{
			"id": 2108,
			"type": "event",
			"name": "Hidden Treasure",
			"text": "Crudely scratched into the wall is a confusing ridde:#n#n#bI<i>f treasure be for thee...#na tree thou will see...#nand smells of the sea...#ntwas found in the quay.</i>#dMake a Knowledge roll:#r4+#tYou understand the riddle perfectly and find the treasure.#nDraw an item card.#y#r0-3#tThe riddle is meaningless to you. You puch the wall in frustration.#nLose 1 Might.#y",
		},
	]),

	// "text": "<b>You feel a tickling sensation on the top of your head. You look up... and see a girl standing on the ceiling! She's staring down at you and her long messy hair is dangling just shy of your face. Before you can react she drops and lands on you.</b><br>You must attempt a Might or Sanity roll.<br><b>(Might 5+)</b> You pin her in a chokehold until she goes limp. You step over her body and continue on your way. Gain 1 Sanity.<br><b>(Sanity 5+)</b> You scream at her to go to her room and she stomps out through the door in a huff. Gain 1 Might.",

	// Do the initial shuffling and dividing, and get the game states for each player.
	"startGame": betrayal_2e.startGame,

	// Render the decks used in the game into #top-content.
	"renderDeck": betrayal_2e.renderDeck,

	// Add card content to $(element).
	"renderCard": betrayal_2e.renderCard,
};