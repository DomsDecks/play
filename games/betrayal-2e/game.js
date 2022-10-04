const betrayal_2e = {

	"displayName": "Betrayal at House on the Hill (2nd Edition)",

	"assetPath": "betrayal-2e",

	"code": "b",

	// What assets are there to preload?
	"assets": () => ["item", "event", "omen", "texture"]
		.concat(_.map(_.filter(game.cards, c => c.art), c => c.name)),

	"text": {
		"deck": "Shuffle back into stack",
		"haunt": "Make a haunt roll now.",
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
			"art": true,
		},
		{
			"id": 1002,
			"type": "item",
			"name": "Amulet of the Ages",
			"text": "#bAncient silver and inlaid gems, inscribed with blessings.#dGain 1 Might, 1 Speed, 1 Knowledge, and 1 Sanity now.#n#nLose 3 Might, 3 Speed, 3 Knowledge, and 3 Sanity if you lose the Amulet.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 1003,
			"type": "item",
			"name": "Idol",
			"text": "#bPerhaps it's chosen you for some greater purpose. Like human sacrifice.#dOnce per turn, you can rub the Idol before making any trait, combat, or event roll to add 2 dice to the roll (to a maximum of 8 dice). Each time you do, lose 1 Sanity.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 1004,
			"type": "item",
			"name": "Blood Dagger",
			"text": "#bA nasty weapon. Needles and tubes extend from the handle... and plunge right into your veins.#dYou roll 3 additional dice (maximum of 8 dice) when making a Might attack with this <i>weapon</i>. If you do, lose 1 Speed.#n#nYou can't use another <i>weapon</i> while you're using this one.#n#nThis item can't be traded or dropped. If it's stolen, take 2 dice of physical damage.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 1005,
			"type": "item",
			"name": "Rabbit's Foot",
			"text": "#bNot so lucky for the rabbit.#dOnce during your turn, you can reroll 1 die. You must keep the second roll.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 1006,
			"type": "item",
			"name": "Axe",
			"text": "#bVery sharp.#dYou roll 1 additional die (maximum of 8 dice) when making a Might attack with this <i>weapon</i>.#n#nYou can't use another <i>weapon</i> while you're using this one.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 1007,
			"type": "item",
			"name": "Sacrificial Dagger",
			"text": "#bA twisted shard of iron covered in mysterious symbols and stained with blood.#dWhen making a Might attack with this <i>weapon</i>, you roll 3 extra dice (maximum of 8 dice), but you must make a Knowledge roll first:#r6+#tNo effect.#y#r3-5#tLose 1 from a mental trait.#y#r0-2#tThe dagger twists in your hand! Take 2 dice of physical damage. You can't attack this turn.#yYou can't use another <i>weapon</i> while you're using this one.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 1008,
			"type": "item",
			"name": "Dynamite",
			"text": "#bThe fuse isn't lit... yet.#dInstead of attacking, you can throw the Dynamite through a connecting door into an adjacent room. Each explorer and monster with Might and Speed traits in that room must attempt a Speed roll:#r5+#tTake no damage from Dynamite.#y#r0-4#tTake 4 points of physical damage.#yDiscard this item after you use it.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 1009,
			"type": "item",
			"name": "Music Box",
			"text": "#bA hand-crafted antique.#nIt plays a haunting melody that gets stuck in your head.#dOnce per turn, you can open or close the Music Box.#n#nWhile the Music Box is open, any explorer or monster with a Sanity trait that enters or starts its turn in the same room must make a Sanity roll of 4+. If the roll fails, the explorer or monster ends its turn as it is mesmerized by the music.#n#nIf an explorer or monster carrying the Music Box is mesmerized, it drops the Music Box. If the Music Box is open when it is dropped, it remains open.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 1010,
			"type": "item",
			"name": "Pickpocket's Gloves",
			"text": "#bHelping yourself has never seemed so easy.#dWhen you are in the same room as another explorer, you can discard this item to take any item that explorer is carrying.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 1011,
			"type": "item",
			"name": "Medical Kit",
			"text": "#bA doctor's bag, depleted in some critical resources.#d Once during your turn, you can attempt a Knowledge roll to heal yourself or another explorer in the same room:#r8+#tGain up to 3 points of physical traits.#y#r6-7#tGain up to 2 points of physical traits.#y#r4-5#tGain 1 point in a physical trait.#y#r0-3#tNothing happens.#yYou can't raise a trait above its starting value with the Medical Kit.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 1012,
			"type": "item",
			"name": "Bottle",
			"text": "#bAn opaque vial containing a black liquid.#dOnce during your turn after the haunt is revealed, you can roll 3 dice and drink from the Bottle:#r6#tChoose a room and put your explorer there.#y#r5#tGain 2 Might and 2 Speed.#y#r4#tGain 2 Knowledge and 2 Sanity.#y#r3#tGain 1 Knowledge and lose 1 Might.#y#r2#tLose 2 Knowledge and 2 Sanity.#y#r1#tLose 2 Might and 2 Speed.#y#r0#tLose 2 from each trait.#yDiscard this item after you use it.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 1013,
			"type": "item",
			"name": "Revolver",
			"text": "#bAn old, potent-looking weapon.#dYou can use this <i>weapon</i> to attack with Speed instead of Might. (Your opponent then defends with Speed and takes physical damage.)#n#nRoll 1 additional die on your Speed attack roll (maximum of 8 dice).#n#nWith the Revolver, you can attack anyone in the same room or within line of sight (through an uninterrupted straight line of doors). If you attack someone in another room and lose, you don't take damage.#n#nYou can't use another <i>weapon</i> while you're using this one.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 1014,
			"type": "item",
			"name": "Armor",
			"text": "#bIt's just prop armor from a Renaissance fair, but it's still metal.#dAny time (not just once per turn) you take physical damage, take 1 less point of damage.#n#nThis item can't be stolen.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 1015,
			"type": "item",
			"name": "Dark Dice",
			"text": "#bAre you feeling lucky?#dOnce per turn, you can roll 3 dice:#r6#tMove to the location of any explorer not revealed as a traitor.#y#r5#tMove one other explorer in the same room into an adjacent room.#y#r4#tGain 1 in a physical trait.#y#r3#tImmediately move into an adjacent room (no movement cost).#y#r2#tGain 1 in a mental trait.#y#r1#tDraw an event card.#y#r0#tReduce all of your traits to the lowest value above the skull symbol.#yDiscard the Dark Dice.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 1016,
			"type": "item",
			"name": "Angel Feather",
			"text": "#bA perfect feather fluttering in your hand.#dWhen you attempt a roll of any kind, you can call out a number from 0 to 8. Use that number instead of rolling the dice.#n#nDiscard this item after you use it.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 1017,
			"type": "item",
			"name": "Lucky Stone",
			"text": "#bA smooth, ordinary-looking rock. You sense it will bring you good fortune.#dAfter you attempt a roll of any kind, you can rub the stone once to reroll any number of those dice.#n#nDiscard this item after you use it.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 1018,
			"type": "item",
			"name": "Puzzle Box",
			"text": "#bThere must be a way to open it.#dOnce during your turn, you can attempt a Knowledge roll to open the box:#r6+#tYou open the box. Draw 2 item cards and discard the Puzzle Box.#y#r0-5#tYou just can't get it open.#y",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 1019,
			"type": "item",
			"name": "Smelling Salts",
			"text": "#bWhew, that's a lungful.#dIf your or another living explorer's Knowledge is below its starting value, and you're in the same room, you can raise that trait to its starting value by using the Smelling Salts.#n#nDiscard this item after you use it.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 1020,
			"type": "item",
			"name": "Candle",
			"text": "#bIt makes the shadows move-at least, you hope it's doing that.#dIf you draw an event card, roll 1 additional die (maximum of 8 dice) for that event's trait rolls.#n#nIf you have the Bell, Book, and Candle, gain 2 in each trait. The first time you lose one of those 3 items later in the game, lose 2 from each trait.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 1021,
			"type": "item",
			"name": "Bell",
			"text": "#bA brass bell that makes a resonant clang.#dGain 1 Sanity now.#n#nLose 1 Sanity if you lose the Bell.#n#nOnce during your turn after the haunt is revealed, you can attempt a Sanity roll to use the Bell:#r5+#tMove any number of unimpeded heroes 1 space closer to you.#y#r0-4#tThe traitor can move any number of monsters 1 space closer to you. (If you are the traitor, this result has no effect.) If there is no traitor, all monsters move 1 space closer to you.#y",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 1022,
			"type": "item",
			"name": "Adrenaline Shot",
			"text": "#bA syringe containing a strange fluorescent liquid.#dBefore you attempt a trait roll, you can use this item to add 4 to the result of that roll.#n#nDiscard this item after you use it.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2001,
			"type": "event",
			"name": "The Lost One",
			"text": "#bA woman wearing a Civil War dress beckons to you.#nYou fall into a trance.#dYou must attempt a Knowledge roll. If the result is 5 or more, you break out of your trance and gain 1 Knowledge; otherwise, roll 3 dice to see where the Lost One leads you:#r6#tMove to the Entrance Hall.#y#r4-5#tMove to the Upper Landing.#y#r2-3#tMove to a new upper floor room.#y#r0-1#tMove to a new basement room.#yFor new rooms, draw from the stack, or move to the Entrance Hall if there are no rooms left.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2002,
			"type": "event",
			"name": "The Voice",
			"text": "#b<i>\"I'm under the floor,#nburied under the floor...\"#n#nThe voice whispers once, then is gone.#dYou must attempt a Knowledge roll:#r4+#tYou find something under the floor. Draw an item card.#y#r0-3#tYou dig and search for the voice, but to no avail.#y",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2003,
			"type": "event",
			"name": "The Walls",
			"text": "#bThis room is warm.#nFlesh-like walls pulse with a steady heartbeat. Your own heart beats with the rhythm of the house. You are drawn into the walls... and emerge somewhere else.#dYou must draw the next room tile and put it in the house. Put your explorer in that room.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2004,
			"type": "event",
			"name": "Webs",
			"text": "#bCasually, you reach up to brush some webs aside... but they won't brush away. They cling.#dYou must attempt a Might roll:#r4+#tYou break free. Gain 1 Might and discard this card.#y#r0-3#tYou're stuck. Keep this card.#yIf you're stuck, you can't do anything until you're freed. Once during any explorer's turn (including you), they can attempt a Might roll to free you. A 4+ succeeds, but you don't gain the 1 Might. Anyone failing an attempt can't move for the rest of that turn. After 3 unsuccessful attempts, you break free automatically. Discard this event once freed.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2005,
			"type": "event",
			"name": "Whoops!",
			"text": "#bYou feel a body under your foot. Before you can leap away from it, you're knocked over. A giggling voice runs away from you.#dOne of the item cards (not omens) in your hand has been stolen. You may choose which one, because picking at random using dice makes this event too annoying. Discard it.#n#nIf you have no items, then take no action.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2006,
			"type": "event",
			"name": "Silence",
			"text": "#bUnderground, everything goes silent. Even the sound of breathing is gone.#dEach explorer in the basement must attempt a Sanity roll.#r4+#tYou wait calmly for your hearing to return.#y#r1-3#tYou scream a silent scream.#nTake 1 die of mental damage.#y#r0#tYou freak out.#nTake 2 dice of mental damage.#y",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2007,
			"type": "event",
			"name": "Skeletons",
			"text": "#bMother and child, still embracing.#dPut the Skeletons token in this room.#nTake 1 die of mental damage.#n#nOnce during an explorer's turn, if they are in this room, they can attempt a Sanity roll to search the Skeletons:#r5+#tDraw an item card.#nRemove the Skeletons token.#y#r0-4#tYou dig around, but find nothing.#nTake 1 die of mental damage.#y",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2008,
			"type": "event",
			"name": "Smoke",
			"text": "#bSmoke billows around you.#nYou cough, wiping away tears.#dPut the Smoke token in this room. The Smoke blocks line of sight from adjacent rooms. An explorer rolls 2 fewer dice (minimum of 1 die) on all trait rolls while in this room.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2009,
			"type": "event",
			"name": "Something hidden",
			"text": "#bThere's something odd about this room, but what? It's tickling the back of your mind.#dIf you want to try to figure out what's odd, attempt a Knowledge roll:#r4+#tA section of wall slides away, revealing an alcove. Draw an item card.#y#r0-3#tYou can't figure it out, and that makes you a bit crazy.#nLose 1 Sanity.#y",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2010,
			"type": "event",
			"name": "Something Slimy",
			"text": "#bWhat's around your ankle?#nA bug? A tentacle?#nA dead hand clawing?#dYou must attempt a Speed roll:#r4+#tYou break free. Gain 1 Speed.#y#r1-3#tLose 1 Might.#y#r0#tLose 1 Might and 1 Speed.#y",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2011,
			"type": "event",
			"name": "Spider",
			"text": "#bA spider the size of a fist lands on your shoulder... and crawls into your hair.#dYou must attempt a Speed roll to brush it away or a Sanity roll to stand still:#r4+#tIt's gone. Gain 1 in the trait you used to attempt this roll.#y#r1-3#tIt bites you. Take 1 die of physical damage.#y#r0#tIt takes a chunk out of you.#nTake 2 dice of physical damage.#y",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2012,
			"type": "event",
			"name": "The Beckoning",
			"text": "#bOutside.#nYou must get outside.#nFly to freedom!#dEach explorer in the Gardens, Graveyard, Tower, on the Balcony, or in a room with an outside-facing window must attempt a Sanity roll:#r3+#tYou back away from the ledge.#y#r0-2#tYou jump to the Patio. (If it isn't in the house, search the room stack for it, put it in the house, and shuffle that stack.) Put your explorer there and take 1 die of physical damage.#y",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2013,
			"type": "event",
			"name": "Night View",
			"text": "#bYou see a vision of a ghostly couple walking the grounds, silently strolling in their wedding best.#dYou must attempt a Knowledge roll:#r5+#tYou recognize the ghosts as former inhabitants of the house. You call their names, and they turn to you, whispering dark secrets of the house. Gain 1 Knowledge.#y#r0-4#tYou pull back in horror, unable to watch.#y",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2014,
			"type": "event",
			"name": "Phone Call",
			"text": "#bA phone rings in the room.#nYou feel compelled to answer it.#dRoll 2 dice. A sweet little granny voice says:#r4#t<i>\"Tea and cakes! Tea and cakes! You always were my favorite!\"</i>#nGain 1 Sanity.#y#r3#t<i>\"I'm always here for you, Pattycakes. Watching...\"</i>#nGain 1 Knowledge.#y#r1-2#t<i>\"I'm here, Sweetums! Give us a kiss!\"</i>#nTake 1 die of mental damage.#y#r0#t<i>\"Bad little children must be punished!\"</i>#nTake 2 dice of physical damage.#y",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2015,
			"type": "event",
			"name": "Posession",
			"text": "#bA shadow separates from the wall. As you stand in shock, the shadow surrounds you and chills you to the core.#dYou must choose any one trait and attempt a roll for that trait:#r4+#tYou resist the shadow's corruption. Gain 1 in a trait of your choice.#y#r0-3#tThe shadow drains your energy. The chosen trait drops to its lowest value. (It doesn't drop to the skull.) If that trait is already at its lowest value, lower a different trait to its lowest value.#y",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2016,
			"type": "event",
			"name": "Revolving Wall",
			"text": "#bThe wall spins to another place.#dPlace the Wall Switch token on a solid wall or corner of this room, draw a room tile for this floor and place it on the other side, then put your explorer in that room. (Discard this card if it's not possible.)#n#nOnce during an explorer's turn, they can can attempt a Knowledge roll to find the Wall Switch from either side:#r3+#tThat explorer finds the hidden switch and moves to the other room. This doesn't count as moving a space.#y#r0-2#tThat explorer can't find the hidden switch and can't go through.#y",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2017,
			"type": "event",
			"name": "Rotten",
			"text": "#bThe smell in this room, it's horrible.#nSmells like death, like blood.#nA slaughterhouse smell.#dYou must attempt a Sanity roll:#r5+#tTroubling odors, nothing more.#nGain 1 Sanity.#y#r2-4#tLose 1 Might.#y#r1#tLose 1 Might and 1 Speed.#y#r0#tYou double over with nausea.#nLose 1 Might, 1 Speed,1 Knowledge, and 1 Sanity.#y",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2018,
			"type": "event",
			"name": "Secret Passage",
			"text": "#bA section of the wall slides away.#nBehind it, a moldy tunnel awaits.#dPut a Secret Passage token in this room. Roll 3 dice and place the second Secret Passage token in:#r6#tAny existing room.#y#r4-5#tAny existing upper floor room.#y#r2-3#tAny existing ground floor room.#y#r0-1#tAny existing basement room.#yYou can then use the Secret Passage, even if you don't have any movement left.#n#nAny explorer can use the Secret Passage on their turn, counting as moving one space.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2019,
			"type": "event",
			"name": "Secret Stairs",
			"text": "#bA horrible creaking sound echoes around you. You've discovered a secret stairwell.#dPut one Secret Stairs token in this room and a second Secret Stairs token in an existing room on another floor. Moving from one Secret Stairs token to the other counts as moving one space. (The stairs don't count as a space.)#n#nYou can follow the stairs right now, even if you don't have any movement left. If you do follow them this turn, draw an event card in the new room.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2020,
			"type": "event",
			"name": "Shrieking Wind",
			"text": "#bThe wind picks up, a slow crescendo to a screeching howl.#dEach explorer in the Gardens, Graveyard, Patio, Tower, on the Balcony, or in a room with an outside-facing window, must attempt a Might roll:#r5+#tYou keep your footing.#y#r3-4#tThe wind knocks you down.#nTake 1 die of physical damage.#y#r1-2#tThe wind chills your soul.#nTake 1 die of mental damage.#y#r0#tThe wind knocks you down hard. Discard one of your items, or if you don't have any, take 1 die of physical damage.#y",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2021,
			"type": "event",
			"name": "Jonah's Turn", // TODO: Puzzle box will get rarer, so include another item or two in this.
			"text": "#bTwo boys are playing with a wooden top. <i>\"Would you like a turn, Jonah?\"</i> one asks.#n#n<i>\"No,\"</i> says Jonah, <i>\"I want all the turns.\"</i> Jonah takes the top and hits the other boy in the face. The boy falls. Jonah keeps hitting him as they fade from view.#dIf an explorer has the Puzzle Box, that explorer discards that item and draws a replacement item for it. If this happens, you gain 1 Sanity; otherwise, you take 1 die of mental damage.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2022,
			"type": "event",
			"name": "Lights Out", // TODO: Candle will get rarer, so include another item or two in this.
			"text": "#bYour flashlight goes out.#nDon't worry, someone else has batteries.#dKeep this card. You can move only 1 space each turn until you end your turn in the same room as another explorer. At the end of that turn, discard this card. Then you can move normally again.#n#nIf you have the Candle or end your turn in the Furnace Room, discard this card.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2023,
			"type": "event",
			"name": "Locked Safe",
			"text": "#bBehind a portrait is a wall safe.#nIt is trapped, of course.#dPut the Safe token in this room.#n#nOnce during an explorer's turn, that explorer can attempt a Knowledge roll to open the Safe:#r5+#tDraw 2 item cards and remove the Safe token.#y#r2-4#tTake 1 die of physical damage.#nThe Safe won't open.#y#r0-1#tTake 2 dice of physical damage.#nThe Safe won't open.#y",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2024,
			"type": "event",
			"name": "Mists from the Walls",
			"text": "#bMists pour out from the walls.#nThere are faces in the mist, human and... inhuman.#dEach explorer in the basement must attempt a Sanity roll:#r4+#tThe faces are tricks of light and shadow. All is well.#y#r1-3#tTake 1 die of mental damage (and 1 additional die of damage if that explorer is in a room with an event symbol).#y#r0#tTake 1 die of mental damage (and 2 additional dice of damage if that explorer is in a room with an event symbol).#y",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2025,
			"type": "event",
			"name": "Mystic Slide",
			"text": "#bPASS TO THE LEFT IF YOU'RE IN THE BASEMENT.#n#nThe floor falls from under you.#dPlace the Slide token in this room, then attempt a Might roll to use the Slide.#r5+#tYou control the Slide. Move to any explored room on any floor below.#y#r0-4#tMove to a new basement room, or choose a basement room if none are left in the stack. You fall to that room and take 1 die of physical damage. If it's not your turn, don't draw a card for that room.#yKeep this card. Any explorer can attempt this roll to use the Slide.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2026,
			"type": "event",
			"name": "Grave Dirt",
			"text": "#bThis room is covered in a thick layer of dirt. You cough as it gets on your skin and in your lungs.#dYou must attempt a Might roll:#r4+#tYou shake it off. Gain 1 Might.#y#r0-3#tSomething is wrong. Keep this card. Take 1 point of physical damage at the start of each of your turns. Discard this card if an item card increases one of your traits or if you end your turn in the Balcony, Gardens, Graveyard, Gymnasium, Larder, Patio, or Tower.##y",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2027,
			"type": "event",
			"name": "Groundskeeper",
			"text": "#bYou turn to see a man in groundskeeper clothing.#nHe raises his shovel and charges. Inches from your face, he disappears, leaving muddy footprints, and nothing more.#dYou must attempt a Knowledge roll. (An explorer in the Gardens rolls 2 fewer dice on this roll.)#r4+#tYou find something in the mud.#nDraw an item card.#y#r0-3#tThe groundskeeper reappears and strikes you in the face with the shovel. The player on your right rolls a Might 4 attack for the Groundskeeper. You defend against this attack as normal, by rolling dice equal to your Might.#y",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2028,
			"type": "event",
			"name": "Hanged Men",
			"text": "#bA breeze chills the room.#nBefore you, three men hang from frayed ropes. They stare at you with cold, dead eyes.#nThe trio swing silently, then fade into dust that falls to the ground. You start to choke.#n#nYou must attempt a roll for each trait:#r2+#tThat trait is unaffected.#y#r0-1#tLose 1 from that trait.#yIf you roll a 2+ on all 4 rolls, gain 1 additional point in a trait of your choice.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2029,
			"type": "event",
			"name": "Hideous Shriek",
			"text": "#bIt starts like a whisper, but ends in a soul-rending shriek.#dEach explorer must attempt a Sanity roll:#r4+#tYou resist the sound.#y#r1-3#tTake 1 die of mental damage.#y#r0#tTake 2 dice of mental damage.#y",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2030,
			"type": "event",
			"name": "Image in the Mirror",
			"text": "#bPASS TO THE LEFT IF YOU DON'T HAVE ANY ITEMS.#n#nThere is an old mirror in this room.#nYour frightened reflection moves on its own. You realize it is you from another time. You need to help your reflection, so you write on the mirror:#n#n<i>THIS WILL HELP</i>#n#nYou then hand an item through the mirror.#dChoose one of your item cards (not an omen card) and shuffle it into the item stack. Gain 1 Knowledge.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2031,
			"type": "event",
			"name": "Image in the Mirror", // TODO: It's great when both mirror cards are used in the game. Add a third mirror card somehow. Maybe you witness the handover from afar. But then it's not mirror related? Maybe you meet a man polishing a mirror, who tells you it's secret, and you can choose to smash it?
			"text": "#bThere is an old mirror in this room.#nYour frightened reflection moves on its own. You realize it is you from another time. Your reflection writes on the mirror:#n#n<i>THIS WILL HELP</i>#n#nThen it hands you an item through the mirror.#dDraw an item card.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2032,
			"type": "event",
			"name": "It is Meant to Be",
			"text": "#bYou collapse to the floor, visions of the future pouring through your head.#n#nYOU MUST CHOOSE...#dDraw up to 5 cards from the item, omen or event stacks. For each card, either shuffle it back into it's stack or choose to stop drawing and discard it. The next card anyone draws of that type, is your chosen card. (They can use the <i class='material-icons'>search</i> button to find it.)#cRoll 4 dice and remember the result. You can use that number once instead of making a die roll. (Respect the maximum possible result if necessary.)",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2033,
			"type": "event",
			"name": "Creepy Crawlies",
			"text": "#bExactly one thousand bugs spill out on your skin, under your clothes, and in your hair.#dYou must attempt a Sanity roll:#r5+#tYou blink, and they're gone.#nGain 1 Sanity.#y#r1-4#tLose 1 Sanity.#y#r0#tLose 2 Sanity.#y",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2034,
			"type": "event",
			"name": "Creepy Puppet", // TODO: Add another item to affect.
			"text": "#bYou see one of those dolls that give you the willies.#nIt jumps at you with a tiny spear.#dThe player on your right rolls a Might 4 attack for the Creepy Puppet. You defend against this attack as normal, by rolling dice equal to your Might.#n#nIf you take any damage from this attack, the explorer with the Spear gains 2 Might (unless you have the Spear).",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2035,
			"type": "event",
			"name": "Debris",
			"text": "#bPlaster falls from the walls and ceiling.#dYou must attempt a Speed roll:#r3+#tYou dodge the plaster.#nGain 1 Speed.#y#r1-2#tYou're buried in debris.#nTake 1 die of physical damage.#y#r0#tYou're buried in debris.#nTake 2 dice of physical damage.#yIf you're buried, you can't do anything until you're freed. Once during any explorer's turn (including you), they can attempt a Might roll to free you. A 4+ succeeds. After 3 unsuccessful attempts, you break free automatically. Discard this event once freed.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2036,
			"type": "event",
			"name": "Disquieting Sounds",
			"text": "#bA baby's cry, lost and abandoned.#nA scream.#nThe crack of breaking glass.#nThen silence.#dRoll 6 dice. If you roll equal to or more than the number of omens that have been revealed, you gain Sanity. If not, take 1 die of mental damage.#n#n(Note from the editor: aren't all sounds <i>disquieting</i>?)",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2037,
			"type": "event",
			"name": "Drip...#nDrip...#nDrip...",
			"text": "#bA rhythmic sound that needles at your brain.#dPut the Drip token in this room.#n#nEach explorer rolls 1 fewer die (minimum of 1) on all trait rolls while in this room.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2038,
			"type": "event",
			"name": "Footsteps",
			"text": "#bThe floorboards slowly creak.#nDust rises. Footprints appear on the dirty floor. And then, as they reach you, they are gone.#dRoll 1 die. (An explorer in the Chapel rolls 1 additional die on this roll.)#r4#tYou and the nearest explorer gain 1 Might.#y#r3#tYou gain 1 Might, and the nearest explorer loses 1 Sanity.#n#n2 Lose 1 Sanity.#y#r1#tLose 1 Speed.#y#r0#tEach explorer loses 1 point from a trait of his or her choice.#y",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2039,
			"type": "event",
			"name": "Funeral",
			"text": "#bYou see an open coffin.#nYou're inside it.#dYou must attempt a Sanity roll:#r4+#tYou blink, and it's gone.#nGain 1 Sanity.#y#r2-3#tThe vision disturbs you.#nLose 1 Sanity.#y#r0-1#tYou're really in that coffin.#nLose 1 Sanity and 1 Might as you dig yourself out. If the Graveyard or the Crypt has been found, put your explorer in one of those rooms (you choose which one).#y",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2040,
			"type": "event",
			"name": "A Moment of Hope",
			"text": "#bSomething feels strangely right about this room. Something is resisting the evil of the house.#dPlace the Blessing token in this room.#n#nEach hero rolls 1 additional die (maximum of 8 dice) on all trait rolls while in this room.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2041,
			"type": "event",
			"name": "Angry Being",
			"text": "#bIt emerges from the slime on the wall next to you.#dYou must attempt a Speed roll:#r5+#tYou get away. Gain 1 Speed.#y#r2-4#tTake 1 die of mental damage.#y#r0-1#tTake 1 die of mental damage and 1 die of physical damage.#y",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2042,
			"type": "event",
			"name": "Bloody Vision",
			"text": "#bThe walls of this room are damp with blood.#nThe blood drips from the ceiling, down the walls, over the furniture, and onto your shoes.#nIn a blink, it is gone.#dYou must attempt a Sanity roll:#r4+#tYou steel yourself. Gain 1 Sanity.#y#r2-3#tLose 1 Sanity.#y#r0-1#tIf an explorer or monster is in your room or an adjacent one, you must attack it (if you can). Choose the explorer with the lowest Might, if possible.#y",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2043,
			"type": "event",
			"name": "Burning Man",
			"text": "#bA man on fire runs through the room. His skin bubbles and cracks, falling away from him and leaving a fiery skull that clatters to the ground, bounces, rolls, and disappears.#dYou must attempt a Sanity roll:#r4+#tYou feel a little hot under the collar, but otherwise fine.#nGain 1 Sanity.#y#r2-3#tOut, out, you must get out.#nPut your explorer in the Entrance Hall.#y#r0-1#tYou burst into flames!#nTake 1 die of physical damage. Then take 1 die of mental damage as you put out the flames.#y",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2044,
			"type": "event",
			"name": "Closet Door",
			"text": "#bThat closet door is open... just a crack. There must be something inside.#dPut the Closet token in this room.#n#nOnce during an explorer's turn, that explorer can roll 2 dice to open the Closet:#n#n4 Draw an item card.#n#n2-3 Draw an event card.#n#n0-1 Draw an event card and remove the Closet token.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 2045,
			"type": "event",
			"name": "What The...?",
			"text": "#bAs you look back the way you came, you see... nothing.#nJust empty fog and mist where a room used to be.#dPick up the tile for the room you are in. Put it somewhere else on the same floor of the house so its door is attached to a different unexplored doorway. If there isn't an unexplored doorway on this floor, move the room to a different floor.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 3001,
			"type": "omen",
			"name": "Spirit Board",
			"text": "#bA board with letters and numbers to call the dead.#dBefore you move during your turn, you can look at the top tile of the room stack.#n#nIf you use the Spirit Board after the haunt has been revealed, the traitor can move any number of monsters 1 space closer to you. (If you are the If the traitor, you don't have to move those monsters.) If there is no traitor, all monsters move 1 space closer to you.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 3002,
			"type": "omen",
			"name": "Spear",
			"text": "#bA weapon pulsing with power.#dYou roll 2 additional dice (maximum of 8 dice) when making a Might attack with this <i>weapon</i>.#n#nYou can't use another <i>weapon</i> while you're using this one.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 3003,
			"type": "omen",
			"name": "Skull",
			"text": "#bA skull, cracked and missing teeth.#dIf you take mental damage, you can take all of it as physical damage instead.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 3004,
			"type": "omen",
			"name": "Ring",
			"text": "#bA battered ring with an incomprehensible inscription.#dIf you attack an opponent that has a Sanity trait, you can attack with Sanity instead of Might. (Your opponent then defends with Sanity, and damage is mental instead of physical.)",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 3005,
			"type": "omen",
			"name": "Medallion",
			"text": "#bA medallion inscribed with a pentagram.#dYou are immune to the effects of the Pentagram Chamber, Crypt, and Graveyard.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 3006,
			"type": "omen",
			"name": "Mask",
			"text": "#bA somber mask to hide your intentions.#dOnce during your turn, you can attempt a Sanity roll to use the Mask:#r4+#tYou can put on or take off the Mask.#yIf you put on the Mask, gain 2 Knowledge and lose 2 Sanity.#n#nIf you take off the Mask, gain 2 Sanity and lose 2 Knowledge.#r0-3#tYou can't use the Mask this turn.#y",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 3007,
			"type": "omen",
			"name": "Madman",
			"text": "#bA raving, frothing madman.#dGain this <i>companion</i> and 2 Might, but lose 1 Sanity now.#n#nThis omen can't be dropped, traded, or stolen. Lose 2 Might and gain 1 Sanity if you lose custody of the Madman.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 3008,
			"type": "omen",
			"name": "Holy Symbol",
			"text": "#bA symbol of calm in an unsettling world.#dGain 2 Sanity now.#n#nLose 2 Sanity if you lose the Holy Symbol.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 3009,
			"type": "omen",
			"name": "Girl",
			"text": "#bA girl.#nTrapped.#nAlone.#nYou free her!#dGain this <i>companion</i>, 1 Sanity and 1 Knowledge now.#n#nThis omen can't be dropped, traded, or stolen. Lose 1 Sanity and 1 Knowledge if you lose custody of the Girl.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 3010,
			"type": "omen",
			"name": "Dog",
			"text": "#bThis mangy dog seems friendly.#nAt least you hope it is.#dGain this <i>companion</i>, 1 Might and 1 Sanity now.#n#nUse a small monster token to represent the Dog. Once during your turn the Dog can deliver or fetch 1 item up to 6 spaces away and then return. It isn't slowed by opponents, but can't carry movement slowing items, use one-way passages or rooms requiring a roll.#n#nThis omen can't be dropped, traded, or stolen. Lose 1 Might and 1 Sanity if you lose custody of the Dog.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 3011,
			"type": "omen",
			"name": "Crystal Ball",
			"text": "#bHazy images appear in the glass.#dOnce during your turn during the haunt, you can attempt a Knowledge roll to predict the future:#r4+#tYou see the truth. Draw up to 3 cards from the event stack. For each card, either shuffle it back into the stack or choose to stop drawing and discard it. The next event card anyone draws, is your chosen card. (They can use the <i class='material-icons'>search</i> button to find it.)#y#r1-3#tYou avert your eyes. Lose 1 Sanity.#y#r0#tYou stare into Hell. Lose 2 Sanity.#y",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 3012,
			"type": "omen",
			"name": "Book",
			"text": "#bA diary or lab notes?#nAncient script or modern ravings?#dGain 2 Knowledge now.#n#nLose 2 Knowledge if you lose the Book.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
		},
		{
			"id": 3013,
			"type": "omen",
			"name": "Bite",
			"text": "#bA growl, the scent of death.#nPain. Darkness. Gone.#dWhen you draw this card, something bites you. The player on your right rolls a Might 4 attack against you for the mysterious something (before it runs away into the darkness). You defend against this attack as normal, by rolling dice equal to your Might.#n#nThis omen can't be dropped, traded, or stolen.",
			"hand": true,
			"discard": true,
			"deck": true,
			"art": true,
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

	"updateDecks": () => {
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
	"renderCard": (element) => {
		let c = card.get(element.attr("id"));

		element
			.addClass(c["type"])
			.append($("<div>")
				.addClass("card-id")
				.html(c.id))
			.prepend(c.art ? $(`<div>`)
				.addClass("card-art")
				.css({ "background-image": `url("${render.path(c.name)}")` }) : null)
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

		return element;
	},
};