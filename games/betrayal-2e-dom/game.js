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
			text: "#bThis frog seems to hold himself in a distinguished manner.#dOnce per turn you may kiss the Frog and roll 3 dice:#r4-6#tEw, gross.#nTake 1 mental damage.#y#r3#tThe Frog turns into a prince. How could this have happened? Did your kiss have magic powers or was it the placebo effect?#nGain 1 in every trait and then draw an item card.#nDiscard the prince.#y#r0-2#tEw, gross.#nTake 1 physical damage.#y",
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
			text: "#bIt will eat <i>anything</i>.#dOnce at the start of each of your turns, you may drop any other 1 item for this <i>companion</i> to eat. If you do, discard that item and gain 2 in all traits that are 1 level above the skull.#n#nThe Raccoon really likes Walnuts and proposes a trade: additionally draw an item card if you feed it a Walnut.",
		},
		{
			id: 1113,
			type: "item",
			name: "Gluttonous Gerbil",
			text: "#bIt's <i>nuts</i> for nuts.#dOnce at the start of each of your turns, you may drop any other 1 item for this <i>companion</i> to eat. If you do, discard that item and gain 1 Sanity#n#nThe Gerbil really likes Walnuts and will be grateful to be fed any. Additionally gain 1 Might, 1 Speed and 1 Knowledge if you feed it a Walnut.",
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
			text: "#bAaaargh. Uuuurgh!#dA granny jumps out from a cranny. She grabs you and screams in your face. There is intense panic in her eyes, but she has no teeth and is unable to tell you what is wrong. Make a Sanity roll:#r4+#tYou manage to calm her down with a combination of hugging and shushing. She gives you a present in gratitude. Draw an item card.#y#r0-3#tShe drops to the floor and wraps her arms around your ankles so tightly that you struggle against her to walk. Take 1 physical damage.#y",
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
		{
			id: 1138,
			type: "item",
			name: "Screaming Orb",
			text: "#bAAAAAAAAAA#dThis horrid orb screams constantly. When you acquire your first Screaming Orb, lose 1 Sanity. If you lose your last Screaming Orb, gain 1 Sanity.#n#nThere are only two ways to lose this orb: feed it to a hungry creature, or give it to something with a Sanity trait that you defeat in combat, in lieu of dealing damage and stealing an item. You may only lose one orb at a time.",
		},
		{
			id: 1139,
			type: "item",
			name: "Screaming Orb",
			text: "#bAAAAAAAAAA#dThis horrid orb screams constantly. When you acquire your first Screaming Orb, lose 1 Sanity. If you lose your last Screaming Orb, gain 1 Sanity.#n#nThere are only two ways to lose this orb: feed it to a hungry creature, or give it to something with a Sanity trait that you defeat in combat, in lieu of dealing damage and stealing an item. You may only lose one orb at a time.",
		},
		{
			id: 1140,
			type: "item",
			name: "Screaming Orb",
			text: "#bAAAAAAAAAA#dThis horrid orb screams constantly. When you acquire your first Screaming Orb, lose 1 Sanity. If you lose your last Screaming Orb, gain 1 Sanity.#n#nThere are only two ways to lose this orb: feed it to a hungry creature, or give it to something with a Sanity trait that you defeat in combat, in lieu of dealing damage and stealing an item. You may only lose one orb at a time.",
		},
		{
			id: 1141,
			type: "item",
			name: "Screaming Orb",
			text: "#bAAAAAAAAAA#dThis horrid orb screams constantly. When you acquire your first Screaming Orb, lose 1 Sanity. If you lose your last Screaming Orb, gain 1 Sanity.#n#nThere are only two ways to lose this orb: feed it to a hungry creature, or give it to something with a Sanity trait that you defeat in combat, in lieu of dealing damage and stealing an item. You may only lose one orb at a time.",
		},
		{
			id: 2141,
			type: "event",
			name: "Incomprehensible Cretin",
			text: "#bIs this even English?#dYou're accosted by a young man. He uses so much bizarre slang that you're not sure if it's an entirely different language. <i>\"Fancy a splim for yer dingle?\"</i> Make a Knowledge roll:#r5+#tYou reply: \"Mate, ya aching for a whongle and a quongle? Your stank blonch quank!\" He understands you perfectly and smiles as he hands you something. Draw an item card.#y#r0-4#tYou reply: \"Mate, U pongo me dongle?\" He has no idea what you said and looks at you like you're mad.#y",
		},
		{
			id: 2142,
			type: "event",
			name: "Cuthbold Boycent",
			text: "#bWhat is up with this Cuthbold guy?#dYou meet an extremely strange man. Before you can say anything, he manically launches into a story filled with disturbing details about his chaotic life: <i>\"I rescued a pit bull to try and keep my mind away from the bad thoughts.\" \"I just got out of jail, for that little incident in the Sheetz parking lot.\" \"I can't be trusted with my... Urges.\" \"My therapist said I'm the worst case she's ever seen.\"</i> Make a Speed roll:#r5+#tAs he continues to talk, you manage to slip away quietly.#y#r0-4#tHe traps you in the conversation for a long time and you learn many more gross details than you're comfortable with. Lose 1 Sanity.#y",
		},
		{
			id: 2143,
			type: "event",
			name: "The Box",
			text: "#bWhat's in the Box?#dThere's a box here. You are desperate to know what's inside. However, the lid is nailed down and it's someone else's property. Make a Sanity Roll:#r5+#tYou pry open the lid and steal the contents without regret. Draw an Item card.#y#r3-4#tYou raid the box but feel guilty about it. Take 1 mental damage then draw an item card.#y#r0-2#tYou aren't even brave enough to look inside. Take 1 mental damage.#y",
		},
	]),

	// Do the initial shuffling and dividing, and get the game states for each player.
	startGame: betrayal_2e.startGame,

	// Render the decks used in the game into #top-content.
	renderDeck: betrayal_2e.renderDeck,

	// Add card content to $(element).
	renderCard: betrayal_2e.renderCard,
};
