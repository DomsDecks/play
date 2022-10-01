const betrayal_2e = {

	"displayName": "Betrayal at House on the Hill (2nd Edition)",

	"assetPath": "betrayal-2e",

	// Except for the card art, what other assets are there to preload?
	"assets": ["omen", "item", "event", "texture"],

	// All cards in the game.
	"cards": [
		{
			"id": 1001,
			"type": "item",
			"name": "Healing Salve",
			"text": "<b>A sticky paste in a shallow bowl.</b><br><br>You can apply the Healing Salve to yourself or to another living explorer in the same room. If that explorer's Might or Speed is below its starting value, raise one or both traits to its starting value.<br><br>Discard this item after you use it.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1002,
			"type": "item",
			"name": "Amulet of the Ages",
			"text": "<b>Ancient silver and inlaid gems, inscribed with blessings.</b><br><br>Gain 1 Might, 1 Speed, 1 Knowledge, and 1 Sanity now.<br><br>Lose 3 Might, 3 Speed, 3 Knowledge, and 3 Sanity if you lose the Amulet.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1003,
			"type": "item",
			"name": "Idol",
			"text": "<b>Perhaps it's chosen you for some greater purpose. Like human sacrifice.</b><br><br>Once per turn, you can rub the Idol before making any trait, combat, or event roll to add 2 dice to the roll (to a maximum of 8 dice). Each time you do, lose 1 Sanity.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1004,
			"type": "item",
			"name": "Blood Dagger",
			"text": "<b>WEAPON<br><br>A nasty weapon. Needles and tubes extend from the handle... and plunge right into your veins.</b><br><br>You roll 3 additional dice (maximum of 8 dice) when making a Might attack with this weapon. If you do, lose 1 Speed.<br><br>You can't use another weapon while you're using this one.<br><br>This item can't be traded or dropped. If it's stolen, take 2 dice of physical damage.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1005,
			"type": "item",
			"name": "Rabbit's Foot",
			"text": "<b>Not so lucky for the rabbit.</b><br><br>Once during your turn, you can reroll 1 die. You must keep the second roll.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1006,
			"type": "item",
			"name": "Axe",
			"text": "<b>WEAPON<br><br>Very sharp.</b><br><br>You roll 1 additional die (maximum of 8 dice) when making a Might attack with this weapon.<br><br>You can't use another weapon while you're using this one.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1007,
			"type": "item",
			"name": "Sacrificial Dagger",
			"text": "<b>WEAPON<br><br>A twisted shard of iron covered in mysterious symbols and stained with blood.</b><br><br>When making a Might attack with this weapon, you roll 3 extra dice (maximum of 8 dice), but you must make a Knowledge roll first:<br><br>6+ No effect.<br><br>3-5 Lose 1 from a mental trait.<br><br>0-2 The dagger twists in your hand! Take 2 dice of physical damage. You can't attack this turn.<br><br>You can't use another weapon while you're using this one.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1008,
			"type": "item",
			"name": "Dynamite",
			"text": "<b>The fuse isn't lit... yet.</b><br><br>Instead of attacking, you can throw the Dynamite through a connecting door into an adjacent room. Each explorer and monster with Might and Speed traits in that room must attempt a Speed roll:<br><br>5+ Take no damage from Dynamite.<br><br>0-4 Take 4 points of physical damage.<br><br>Discard this item after you use it.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1009,
			"type": "item",
			"name": "Music Box",
			"text": "<b>A hand-crafted antique.<br>It plays a haunting melody that gets stuck in your head.</b><br><br>Once per turn, you can open or close the Music Box.<br><br>While the Music Box is open, any explorer or monster with a Sanity trait that enters or starts its turn in the same room must make a Sanity roll of 4+. If the roll fails, the explorer or monster ends its turn as it is mesmerized by the music.<br><br>If an explorer or monster carrying the Music Box is mesmerized, it drops the Music Box. If the Music Box is open when it is dropped, it remains open.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1010,
			"type": "item",
			"name": "Pickpocket's Gloves",
			"text": "<b>Helping yourself has never seemed so easy.</b><br><br>When you are in the same room as another explorer, you can discard this item to take any item that explorer is carrying.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1011,
			"type": "item",
			"name": "Medical Kit",
			"text": "<b>A doctor's bag, depleted in some critical resources.</b><br><br> Once during your turn, you can attempt a Knowledge roll to heal yourself or another explorer in the same room:<br><br>8+ Gain up to 3 points of physical traits.<br><br>6-7 Gain up to 2 points of physical traits.<br><br>4-5 Gain 1 point in a physical trait.<br><br>0-3 Nothing happens.<br><br>You can't raise a trait above its starting value with the Medical Kit.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1012,
			"type": "item",
			"name": "Bottle",
			"text": "<b>An opaque vial containing a black liquid.</b><br><br>Once during your turn after the haunt is revealed, you can roll 3 dice and drink from the Bottle:<br><br>6 Choose a room and put your explorer there.<br><br>5 Gain 2 Might and 2 Speed.<br><br>4 Gain 2 Knowledge and 2 Sanity.<br><br>3 Gain 1 Knowledge and lose 1 Might.<br><br>2 Lose 2 Knowledge and 2 Sanity.<br><br>1 Lose 2 Might and 2 Speed.<br><br>0 Lose 2 from each trait.<br><br>Discard this item after you use it.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1013,
			"type": "item",
			"name": "Revolver",
			"text": "<b>WEAPON<br><br>An old, potent-looking weapon.</b><br><br>You can use the Revolver to attack with Speed instead of Might. (Your opponent then defends with Speed and takes physical damage.)<br><br>Roll 1 additional die on your Speed attack roll (maximum of 8 dice).<br><br>With the Revolver, you can attack anyone in the same room or within line of sight (through an uninterrupted straight line of doors). If you attack someone in another room and lose, you don't take damage.<br><br>You can't use another weapon while you're using this one.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1014,
			"type": "item",
			"name": "Armor",
			"text": "<b>It's just prop armor from a Renaissance fair, but it's still metal.</b><br><br>Any time (not just once per turn) you take physical damage, take 1 less point of damage.<br><br>This item can't be stolen.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1015,
			"type": "item",
			"name": "Dark Dice",
			"text": "<b>Are you feeling lucky?</b><br><br>Once per turn, you can roll 3 dice:<br><br>6 Move to the location of any explorer not revealed as a traitor.<br><br>5 Move one other explorer in the same room into an adjacent room.<br><br>4 Gain 1 in a physical trait.<br><br>3 Immediately move into an adjacent room (no movement cost).<br><br>2 Gain 1 in a mental trait.<br><br>1 Draw an event card.<br><br>O Reduce all of your traits to the lowest value above the skull symbol. Discard the Dark Dice.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1016,
			"type": "item",
			"name": "Angel Feather",
			"text": "<b>A perfect feather fluttering in your hand.</b><br><br>When you attempt a roll of any kind, you can call out a number from 0 to 8. Use that number instead of rolling the dice.<br><br>Discard this item after you use it.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1017,
			"type": "item",
			"name": "Lucky Stone",
			"text": "<b>A smooth, ordinary-looking rock. You sense it will bring you good fortune.</b><br><br>After you attempt a roll of any kind, you can rub the stone once to reroll any number of those dice.<br><br>Discard this item after you use it.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1018,
			"type": "item",
			"name": "Puzzle Box",
			"text": "<b>There must be a way to open it.</b><br><br>Once during your turn, you can attempt a Knowledge roll to open the box:<br><br>6+ You open the box. Draw 2 item cards and discard the Puzzle Box.<br><br>0-5 You just can't get it open.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1019,
			"type": "item",
			"name": "Smelling Salts",
			"text": "<b>Whew, that's a lungful.</b><br><br>If your or another living explorer's Knowledge is below its starting value, and you're in the same room, you can raise that trait to its starting value by using the Smelling Salts.<br><br>Discard this item after you use it.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1020,
			"type": "item",
			"name": "Candle",
			"text": "<b>It makes the shadows move-at least, you hope it's doing that.</b><br><br>If you draw an event card, roll 1 additional die (maximum of 8 dice) for that event's trait rolls.<br><br>If you have the Bell, Book, and Candle, gain 2 in each trait. The first time you lose one of those 3 items later in the game, lose 2 from each trait.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1021,
			"type": "item",
			"name": "Bell",
			"text": "<b>A brass bell that makes a resonant clang.</b><br><br>Gain 1 Sanity now.<br><br>Lose 1 Sanity if you lose the Bell.<br><br>Once during your turn after the haunt is revealed, you can attempt a Sanity roll to use the Bell:<br><br>5+ Move any number of unimpeded heroes 1 space closer to you.<br><br>0-4 The traitor can move any number of monsters 1 space closer to you. (If you are the traitor, this result has no effect.) If there is no traitor, all monsters move 1 space closer to you.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 1022,
			"type": "item",
			"name": "Adrenaline Shot",
			"text": "<b>A syringe containing a strange fluorescent liquid.</b><br><br>Before you attempt a trait roll, you can use this item to add 4 to the result of that roll.<br><br>Discard this item after you use it.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2001,
			"type": "event",
			"name": "The Lost One",
			"text": "<b>A woman wearing a Civil War dress beckons to you.<br>You fall into a trance.</b><br><br>You must attempt a Knowledge roll. If the result is 5 or more, you break out of your trance and gain 1 Knowledge; otherwise, roll 3 dice to see where the Lost One leads you:<br><br>6 Put your explorer in the Entrance Hall.<br><br>4-5 Put your explorer in the Upper Landing.<br><br>2-3 Draw room tiles until you find an upper floor room.<br><br>0-1 Draw room tiles until you find a basement room.<br><br>If this card requires you to draw a room tile for a specific floor, put that tile in the house, and put your explorer there. If you reach the end of the stack without drawing a room for the floor you rolled, put your explorer in the Entrance Hall instead.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2002,
			"type": "event",
			"name": "The Voice",
			"text": "<b><i>\"I'm under the floor,<br>buried under the floor...\"<br><br>The voice whispers once, then is gone.</b><br><br>You must attempt a Knowledge roll:<br><br>4+ You find something under the floor. Draw an item card.<br><br>0-3 You dig and search for the voice, but to no avail.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2003,
			"type": "event",
			"name": "The Walls",
			"text": "<b>This room is warm.<br>Flesh-like walls pulse with a steady heartbeat. Your own heart beats with the rhythm of the house. You are drawn into the walls... and emerge somewhere else.</b><br><br>You must draw the next room tile and put it in the house. Put your explorer in that room.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2004,
			"type": "event",
			"name": "Webs",
			"text": "<b>Casually, you reach up to brush some webs aside... but they won't brush away. They cling.</b><br><br>You must attempt a Might roll:<br><br>4+ You break free. Gain 1 Might and discard this card.<br><br>0-3 You're stuck. Keep this card.<br><br>If you're stuck, you can't do anything until you're freed. Once during an explorer's turn, any explorer can attempt a Might roll to free you. (You can also attempt this roll.) A 4+ succeeds, but you don't gain the 1 Might. Anyone failing an attempt can't move for the rest of that turn. After 3 unsuccessful attempts, you break free automatically on your next turn and take your turn normally.<br><br>When you're free, discard this event.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2005,
			"type": "event",
			"name": "Whoops!",
			"text": "<b>You feel a body under your foot. Before you can leap away from it, you're knocked over. A giggling voice runs away from you.</b><br><br>One of the item cards (not omens) in your hand has been stolen. You may choose which one, because picking at random using dice makes this event too annoying. Discard it.<br><br>If you have no items, then take no action.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2006,
			"type": "event",
			"name": "Silence",
			"text": "<b>Underground, everything goes silent. Even the sound of breathing is gone.</b><br><br>Each explorer in the basement must attempt a Sanity roll.<br><br>4+ You wait calmly for your hearing to return.<br><br>1-3 You scream a silent scream.<br>Take 1 die of mental damage.<br><br>0 You freak out.<br>Take 2 dice of mental damage.<br><br>Each result affects only the explorer making that roll.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2007,
			"type": "event",
			"name": "Skeletons",
			"text": "<b>Mother and child, still embracing.</b><br><br>Put the Skeletons token in this room.<br>Take 1 die of mental damage.<br><br>Once during an explorer's turn, that explorer can attempt a Sanity roll to search the Skeletons:<br><br>5+ Draw an item card.<br>Remove the Skeletons token.<br><br>0-4 You dig around, but find nothing.<br>Take 1 die of mental damage.<br><br>Each result affects only the explorer making that roll.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2008,
			"type": "event",
			"name": "Smoke",
			"text": "<b>Smoke billows around you.<br>You cough, wiping away tears.</b><br><br>Put the Smoke token in this room. The Smoke blocks line of sight from adjacent rooms. An explorer rolls 2 fewer dice (minimum of 1 die) on all trait rolls while in this room.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2009,
			"type": "event",
			"name": "Something hidden",
			"text": "<b>There's something odd about this room, but what? It's tickling the back of your mind.</b><br><br>If you want to try to figure out what's odd, attempt a Knowledge roll:<br><br>4+ A section of wall slides away, revealing an alcove. Draw an item card.<br><br>0-3 You can't figure it out, and that makes you a bit crazy.<br>Lose 1 Sanity.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2010,
			"type": "event",
			"name": "Something Slimy",
			"text": "<b>What's around your ankle?<br>A bug? A tentacle?<br>A dead hand clawing?</b><br><br>You must attempt a Speed roll:<br><br>4+ You break free. Gain 1 Speed.<br><br>1-3 Lose 1 Might.<br><br>O Lose 1 Might and 1 Speed.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2011,
			"type": "event",
			"name": "Spider",
			"text": "<b>A spider the size of a fist lands on your shoulder... and crawls into your hair.</b><br><br>You must attempt a Speed roll to brush it away or a Sanity roll to stand still:<br><br>4+ It's gone. Gain 1 in the trait you used to attempt this roll.<br><br>1-3 It bites you. Take 1 die of physical damage.<br><br>O It takes a chunk out of you.<br>Take 2 dice of physical damage.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2012,
			"type": "event",
			"name": "The Beckoning",
			"text": "<b>Outside.<br>You must get outside.<br>Fly to freedom!</b><br><br>Each explorer in the Gardens, Graveyard, Tower, on the Balcony, or in a room with an outside-facing window must attempt a Sanity roll:<br><br>3+ You back away from the ledge.<br><br>0-2 You jump to the Patio. (If it isn't in the house, search the room stack for it, put it in the house, and shuffle that stack.) Put your explorer there and take 1 die of physical damage.<br><br>Each result affects only the explorer making that roll.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2013,
			"type": "event",
			"name": "Night View",
			"text": "<b>You see a vision of a ghostly couple walking the grounds, silently strolling in their wedding best.</b><br><br>You must attempt a Knowledge roll:<br><br>5+ You recognize the ghosts as former inhabitants of the house. You call their names, and they turn to you, whispering dark secrets of the house. Gain 1 Knowledge.<br><br>0-4 You pull back in horror, unable to watch.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2014,
			"type": "event",
			"name": "Phone Call",
			"text": "<b>A phone rings in the room.<br>You feel compelled to answer it.</b><br><br>Roll 2 dice. A sweet little granny voice says:<br><br>4 <i>\"Tea and cakes! Tea and cakes! You always were my favorite!\"</i><br>Gain 1 Sanity.<br><br>3 <i>\"I'm always here for you, Pattycakes. Watching...\"</i><br>Gain 1 Knowledge.<br><br>1-2 <i>\"I'm here, Sweetums! Give us a kiss!\"</i><br>Take 1 die of mental damage.<br><br>0 <i>\"Bad little children must be punished!\"</i><br>Take 2 dice of physical damage.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2015,
			"type": "event",
			"name": "Posession",
			"text": "<b>A shadow separates from the wall. As you stand in shock, the shadow surrounds you and chills you to the core.</b><br><br>You must choose any one trait and attempt a roll for that trait:<br><br>4+ You resist the shadow's corruption. Gain 1 in a trait of your choice.<br><br>0-3 The shadow drains your energy. The chosen trait drops to its lowest value. (It doesn't drop to the skull.) If that trait is already at its lowest value, lower a different trait to its lowest value.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2016,
			"type": "event",
			"name": "Revolving Wall",
			"text": "<b>The wall spins to another place.</b><br><br>Place the Wall Switch token on a wall without an exit in this room or a corner of this room. If there isn't a room on the other side of the Wall Switch, draw room tiles until you find one for this floor, then put it in the house. (If there are no more rooms on this floor, discard this card.) Then put your explorer in that room.<br><br>Once during an explorer's turn, if that explorer is in either room, he or she can attempt a Knowledge roll to use the Wall Switch:<br><br>3+ That explorer finds the hidden switch and goes through. This doesn't count as moving a space.<br><br>0-2 That explorer can't find the hidden switch and can't go through.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2017,
			"type": "event",
			"name": "Rotten",
			"text": "<b>The smell in this room, it's horrible.<br>Smells like death, like blood.<br>A slaughterhouse smell.</b><br><br>You must attempt a Sanity roll:<br><br>5+ Troubling odors, nothing more.<br>Gain 1 Sanity.<br><br>2-4 Lose 1 Might.<br><br>1 Lose 1 Might and 1 Speed.<br><br>0 You double over with nausea.<br>Lose 1 Might, 1 Speed,1 Knowledge, and 1 Sanity.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2018,
			"type": "event",
			"name": "Secret Passage",
			"text": "<b>A section of the wall slides away.<br>Behind it, a moldy tunnel awaits.</b><br><br>Put a Secret Passage token in this room. Roll 3 dice and place the second Secret Passage token in:<br><br>6 Any existing room.<br><br>4-5 Any existing upper floor room.<br><br>2-3 Any existing ground floor room.<br><br>0-1 Any existing basement room.<br><br>You can then use the Secret Passage, even if you don't have any movement left.<br><br>Moving from one Secret Passage token to the other counts as moving one space. (The passage itself doesn't count as a space.)<br><br>On later turns, any explorer can use the Secret Passage. An explorer can't end his or her turn in the passage.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2019,
			"type": "event",
			"name": "Secret Stairs",
			"text": "<b>A horrible creaking sound echoes around you. You've discovered a secret stairwell.</b><br><br>Put one Secret Stairs token in this room and a second Secret Stairs token in an existing room on another floor. Moving from one Secret Stairs token to the other counts as moving one space. (The stairs don't count as a space.)<br><br>You can follow the stairs right now, even if you don't have any movement left. If you do follow them this turn, draw an event card in the new room.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2020,
			"type": "event",
			"name": "Shrieking Wind",
			"text": "<b>The wind picks up, a slow crescendo to a screeching howl.</b><br><br>Each explorer in the Gardens, Graveyard, Patio, Tower, on the Balcony, or in a room with an outside-facing window, must attempt a Might roll:<br><br>5+ You keep your footing.<br><br>3-4 The wind knocks you down.<br>Take 1 die of physical damage.<br><br>1-2 The wind chills your soul.<br>Take 1 die of mental damage.<br><br>0 The wind knocks you down hard. Discard one of your items, or if you don't have any, take 1 die of physical damage.<br><br>Each result affects only the explorer making that roll.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2021,
			"type": "event",
			"name": "Jonah's Turn", // TODO: Puzzle box will get rarer, so include another item or two in this.
			"text": "<b>Two boys are playing with a wooden top. <i>\"Would you like a turn, Jonah?\"</i> one asks.<br><br><i>\"No,\"</i> says Jonah, <i>\"I want all the turns.\"</i> Jonah takes the top and hits the other boy in the face. The boy falls. Jonah keeps hitting him as they fade from view.</b><br><br>If an explorer has the Puzzle Box, that explorer discards that item and draws a replacement item for it. If this happens, you gain 1 Sanity; otherwise, you take 1 die of mental damage.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2022,
			"type": "event",
			"name": "Lights Out", // TODO: Candle will get rarer, so include another item or two in this.
			"text": "<b>Your flashlight goes out.<br>Don't worry, someone else has batteries.</b><br><br>Keep this card. You can move only 1 space each turn until you end your turn in the same room as another explorer. At the end of that turn, discard this card. Then you can move normally again.<br><br>If you have the Candle or end your turn in the Furnace Room, discard this card.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2023,
			"type": "event",
			"name": "Locked Safe",
			"text": "<b>Behind a portrait is a wall safe.<br>It is trapped, of course.</b><br><br>Put the Safe token in this room.<br><br>Once during an explorer's turn, that explorer can attempt a Knowledge roll to open the Safe:<br><br>5+ Draw 2 item cards and remove the Safe token.<br><br>2-4 Take 1 die of physical damage.<br>The Safe won't open.<br><br>0-1 Take 2 dice of physical damage.<br>The Safe won't open.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2024,
			"type": "event",
			"name": "Mists from the Walls",
			"text": "<b>Mists pour out from the walls.<br>There are faces in the mist, human and... inhuman.</b><br><br>Each explorer in the basement must attempt a Sanity roll:<br><br>4+ The faces are tricks of light and shadow. All is well.<br><br>1-3 Take 1 die of mental damage (and 1 additional die of damage if that explorer is in a room with an event symbol).<br><br>0 Take 1 die of mental damage (and 2 additional dice of damage if that explorer is in a room with an event symbol).<br><br>Each result affects only the explorer making that roll.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2025,
			"type": "event",
			"name": "Mystic Slide",
			"text": "<b>IF YOU'RE IN THE BASEMENT, THIS EVENT AFFECTS THE NEXT EXPLORER TO YOUR LEFT NOT IN THE BASEMENT. DISCARD THIS CARD IF ALL OF THE EXPLORERS ARE IN THE BASEMENT.<br><br>The floor falls from under you.</b><br><br>Place the Slide token in this room, then attempt a Might roll to use the Slide.<br><br>5+ You control the Slide. Put yourself in any explored room on any floor below the Slide.<br><br>0-4 Draw tiles from the room stack until you draw a basement room. Place the room tile. (If no basement rooms are in the stack, choose a basement room in play.) You fall to that room and take 1 die of physical damage. If it's not your turn, don't draw a card for that room.<br><br>Keep this card. On later turns, any explorer can attempt this roll to use the Slide.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2026,
			"type": "event",
			"name": "Grave Dirt",
			"text": "<b>This room is covered in a thick layer of dirt. You cough as it gets on your skin and in your lungs.</b><br><br>You must attempt a Might roll:<br><br>4+ You shake it off. Gain 1 Might.<br><br>0-3 Something is wrong. Keep this card. Take 1 point of physical damage at the start of each of your turns. Discard this card if an item card increases one of your traits or if you end your turn in the Balcony, Gardens, Graveyard, Gymnasium, Larder, Patio, or Tower.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2027,
			"type": "event",
			"name": "Groundskeeper",
			"text": "<b>You turn to see a man in groundskeeper clothing.<br>He raises his shovel and charges. Inches from your face, he disappears, leaving muddy footprints, and nothing more.</b><br><br>You must attempt a Knowledge roll. (An explorer in the Gardens rolls 2 fewer dice on this roll.)<br><br>4+ You find something in the mud.<br>Draw an item card.<br><br>0-3 The groundskeeper reappears and strikes you in the face with the shovel. The player on your right rolls a Might 4 attack for the Groundskeeper. You defend against this attack as normal, by rolling dice equal to your Might.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2028,
			"type": "event",
			"name": "Hanged Men",
			"text": "<b>A breeze chills the room.<br>Before you, three men hang from frayed ropes. They stare at you with cold, dead eyes.<br>The trio swing silently, then fade into dust that falls to the ground. You start to choke.<br><br>You must attempt a roll for each trait:<br><br>2+ That trait is unaffected.<br><br>0-1 Lose 1 from that trait.<br><br>If you roll a 2+ on all 4 rolls, gain 1 additional point in a trait of your choice.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2029,
			"type": "event",
			"name": "Hideous Shriek",
			"text": "<b>It starts like a whisper, but ends in a soul-rending shriek.</b><br><br>Each explorer must attempt a Sanity roll:<br><br>4+ You resist the sound.<br><br>1-3 Take 1 die of mental damage.<br><br>O Take 2 dice of mental damage.<br><br>Each result affects only the explorer making that roll.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2030,
			"type": "event",
			"name": "Image in the Mirror",
			"text": "<b>IF YOU DON'T HAVE ANY ITEM CARDS, THIS EVENT AFFECTS THE NEXT EXPLORER TO YOUR LEFT WITH AN ITEM CARD. DISCARD THIS CARD IF NO EXPLORER HAS AN ITEM CARD.<br><br>There is an old mirror in this room.<br>Your frightened reflection moves on its own. You realize it is you from another time. You need to help your reflection, so you write on the mirror:<br><br><i>THIS WILL HELP</i><br><br>You then hand an item through the mirror.</b><br><br>Choose one of your item cards (not an omen card) and shuffle it into the item stack. Gain 1 Knowledge.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2031,
			"type": "event",
			"name": "Image in the Mirror", // TODO: It's great when both mirror cards are used in the game. Add a third mirror card somehow. Maybe you witness the handover from afar. But then it's not mirror related? Maybe you meet a man polishing a mirror, who tells you it's secret, and you can choose to smash it?
			"text": "<b>There is an old mirror in this room.<br>Your frightened reflection moves on its own. You realize it is you from another time. Your reflection writes on the mirror:<br><br><i>THIS WILL HELP</i><br><br>Then it hands you an item through the mirror.</b><br><br>Draw an item card.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2032,
			"type": "event",
			"name": "It is Meant to Be",
			"text": "<b>You collapse to the floor, visions of future events pouring through your head.</b><br><br>Choose one of these 2 options:<br><br>&bull; Draw cards from the item, omen or event stack until you find a card of your choice. Shuffle the unwanted cards back into the stack. Keep the chosen card in you hand and don't tell anyone what it is. The next time anyone should draw that type of card, they draw your chosen card. (Ask them to manually draw the card with that number, then discard yours.)<br><br>&bull; You can choose instead to roll 4 dice and write down the result. For one future die roll of your choice that you attempt, you can use that number instead of rolling. If that number is higher than the maximum possible result, use the maximum possible result instead.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2033,
			"type": "event",
			"name": "Creepy Crawlies",
			"text": "<b>Exactly one thousand bugs spill out on your skin, under your clothes, and in your hair.</b><br><br>You must attempt a Sanity roll:<br><br>5+ You blink, and they're gone.<br>Gain 1 Sanity.<br><br>1-4 Lose 1 Sanity.<br><br>O Lose 2 Sanity.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2034,
			"type": "event",
			"name": "Creepy Puppet", // TODO: Add another item to affect.
			"text": "<b>You see one of those dolls that give you the willies.<br>It jumps at you with a tiny spear.</b><br><br>The player on your right rolls a Might 4 attack for the Creepy Puppet. You defend against this attack as normal, by rolling dice equal to your Might.<br><br>If you take any damage from this attack, the explorer with the Spear gains 2 Might (unless you have the Spear).",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2035,
			"type": "event",
			"name": "Debris",
			"text": "<b>Plaster falls from the walls and ceiling.</b><br><br>You must attempt a Speed roll:<br><br>3+ You dodge the plaster.<br>Gain 1 Speed.<br><br>1-2 You're buried in debris.<br>Take 1 die of physical damage.<br><br>0 You're buried in debris.<br>Take 2 dice of physical damage.<br><br>If you're buried, keep this card. You can't do anything until you're freed. Once during an explorer's turn, that explorer can attempt a Might roll to free you. (You can also attempt this roll.) A 4+ succeeds. After 3 unsuccessful attempts, you break free automatically on your next turn and take your turn normally.<br><br>Discard this card when you're free.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2036,
			"type": "event",
			"name": "Disquieting Sounds",
			"text": "<b>A baby's cry, lost and abandoned.<br>A scream.<br>The crack of breaking glass.<br>Then silence.</b><br><br>Roll 6 dice. If you roll equal to or more than the number of omens that have been revealed, you gain Sanity. If not, take 1 die of mental damage.<br><br>(Note from the editor: aren't all sounds <i>disquieting</i>?)",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2037,
			"type": "event",
			"name": "Drip...<br>Drip...<br>Drip...",
			"text": "<b>A rhythmic sound that needles at your brain.</b><br><br>Put the Drip token in this room.<br><br>Each explorer rolls 1 fewer die (minimum of 1) on all trait rolls while in this room.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2038,
			"type": "event",
			"name": "Footsteps",
			"text": "<b>The floorboards slowly creak.<br>Dust rises. Footprints appear on the dirty floor. And then, as they reach you, they are gone.</b><br><br>Roll 1 die. (An explorer in the Chapel rolls 1 additional die on this roll.)<br><br>4 You and the nearest explorer gain 1 Might.<br><br>3 You gain 1 Might, and the nearest explorer loses 1 Sanity.<br><br>2 Lose 1 Sanity.<br><br>1 Lose 1 Speed.<br><br>0 Each explorer loses 1 point from a trait of his or her choice.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2039,
			"type": "event",
			"name": "Funeral",
			"text": "<b>You see an open coffin.<br>You're inside it.</b><br><br>You must attempt a Sanity roll:<br><br>4+ You blink, and it's gone.<br>Gain 1 Sanity.<br><br>2-3 The vision disturbs you.<br>Lose 1 Sanity.<br><br>0-1 You're really in that coffin.<br>Lose 1 Sanity and 1 Might as you dig yourself out. If the Graveyard or the Crypt has been found, put your explorer in one of those rooms (you choose which one).",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2040,
			"type": "event",
			"name": "A Moment	of Hope",
			"text": "<b>Something feels strangely right about this room. Something is resisting the evil of the house.</b><br><br>Place the Blessing token in this room.<br><br>Each hero rolls 1 additional die (maximum of 8 dice) on all trait rolls while in this room.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2041,
			"type": "event",
			"name": "Angry Being",
			"text": "<b>It emerges from the slime on the wall next to you.</b><br><br>You must attempt a Speed roll:<br><br>5+ You get away. Gain 1 Speed.<br><br>2-4 Take 1 die of mental damage.<br><br>0-1 Take 1 die of mental damage and 1 die of physical damage.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2042,
			"type": "event",
			"name": "Bloody Vision",
			"text": "<b>The walls of this room are damp with blood.<br>The blood drips from the ceiling, down the walls, over the furniture, and onto your shoes.<br>In a blink, it is gone.</b><br><br>You must attempt a Sanity roll:<br><br>4+ You steel yourself. Gain 1 Sanity.<br><br>2-3 Lose 1 Sanity.<br><br>0-1 If an explorer or monster is in your room or an adjacent one, you must attack it (if you can). Choose the explorer with the lowest Might, if possible.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2043,
			"type": "event",
			"name": "Burning Man",
			"text": "<b>A man on fire runs through the room. His skin bubbles and cracks, falling away from him and leaving a fiery skull that clatters to the ground, bounces, rolls, and disappears.</b><br><br>You must attempt a Sanity roll:<br><br>4+ You feel a little hot under the collar, but otherwise fine.<br>Gain 1 Sanity.<br><br>2-3 Out, out, you must get out.<br>Put your explorer in the Entrance Hall.<br><br>0-1 You burst into flames!<br>Take 1 die of physical damage. Then take 1 die of mental damage as you put out the flames.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2044,
			"type": "event",
			"name": "Closet Door",
			"text": "<b>That closet door is open... just a crack. There must be something inside.<br><br>Put the Closet token in this room.<br><br>Once during an explorer's turn, that explorer can roll 2 dice to open the Closet:<br><br>4 Draw an item card.<br><br>2-3 Draw an event card.<br><br>0-1 Draw an event card and remove the Closet token.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 2045,
			"type": "event",
			"name": "What The...?",
			"text": "<b>As you look back the way you came, you see... nothing.<br>Just empty fog and mist where a room used to be.</b><br><br>Pick up the tile for the room you are in. Put it somewhere else on the same floor of the house so its door is attached to a different unexplored doorway. If there isn't an unexplored doorway on this floor, move the room to a different floor.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 3001,
			"type": "omen",
			"name": "Spirit Board",
			"text": "<b>A board with letters and numbers to call the dead.</b><br><br>Before you move during your turn, you can look at the top tile of the room stack.<br><br>If you use the Spirit Board after the haunt has been revealed, the traitor can move any number of monsters 1 space closer to you. (If you are the If the traitor, you don't have to move those monsters.) If there is no traitor, all monsters move 1 space closer to you.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 3002,
			"type": "omen",
			"name": "Spear",
			"text": "<b>WEAPON<br><br>A weapon pulsing with power.</b><br><br>You roll 2 additional dice (maximum of 8 dice) when making a Might attack with this weapon.<br><br>You can't use another weapon while you're using this one.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 3003,
			"type": "omen",
			"name": "Skull",
			"text": "<b>A skull, cracked and missing teeth.</b><br><br>If you take mental damage, you can take all of it as physical damage instead.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 3004,
			"type": "omen",
			"name": "Ring",
			"text": "<b>A battered ring with an incomprehensible inscription.</b><br><br>If you attack an opponent that has a Sanity trait, you can attack with Sanity instead of Might. (Your opponent then defends with Sanity, and damage is mental instead of physical.)",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 3005,
			"type": "omen",
			"name": "Medallion",
			"text": "<b>A medallion inscribed with a pentagram.</b><br><br>You are immune to the effects of the Pentagram Chamber, Crypt, and Graveyard.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 3006,
			"type": "omen",
			"name": "Mask",
			"text": "<b>A somber mask to hide your intentions.</b><br><br>Once during your turn, you can attempt a Sanity roll to use the Mask:<br><br>4+ You can put on or take off the Mask.<br><br>If you put on the Mask, gain 2 Knowledge and lose 2 Sanity.<br><br>If you take off the Mask, gain 2 Sanity and lose 2 Knowledge.<br><br>0-3 You can't use the Mask this turn.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 3007,
			"type": "omen",
			"name": "Madman",
			"text": "<b>COMPANION<br><br>A raving, frothing madman.</b><br><br>Gain 2 Might and lose 1 Sanity now.<br><br>Lose 2 Might and gain 1 Sanity if you lose custody of the Madman.<br><br>This omen can't be dropped, traded, or stolen.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 3008,
			"type": "omen",
			"name": "Holy Symbol",
			"text": "<b>A symbol of calm in an unsettling world.</b><br><br>Gain 2 Sanity now.<br><br>Lose 2 Sanity if you lose the Holy Symbol.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 3009,
			"type": "omen",
			"name": "Girl",
			"text": "<b>COMPANION<br><br>A girl.<br><br>Trapped.<br><br>Alone.<br><br>You free her!</b><br><br>Gain 1 Sanity and 1 Knowledge now.<br><br>Lose 1 Sanity and 1 Knowledge if you lose custody of the Girl.<br><br>This omen can't be dropped, traded, or stolen.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 3010,
			"type": "omen",
			"name": "Dog",
			"text": "<b>COMPANION<br><br>This mangy dog seems friendly.<br>At least you hope it is.</b><br><br>Gain 1 Might and 1 Sanity now.<br><br>Lose 1 Might and 1 Sanity if you lose custody of the Dog.<br><br>Take a small monster token to represent the Dog. Put it in your room. (Use a token of a different color from other monsters, if any.) Once during your turn, the Dog can move to any explored room up to 6 spaces away, using doors and stairs, and then return. It can pick up, carry, and/or drop 1 item before it returns.<br><br>The Dog isn't slowed by opponents. It can't use one-way passages or rooms that require a roll. It can't carry items that slow movement.<br><br>This omen can't be dropped, traded, or stolen.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 3011,
			"type": "omen",
			"name": "Crystal Ball",
			"text": "<b>Hazy images appear in the glass.</b><br><br>Once during your turn after the haunt is revealed, you can attempt a Knowledge roll to peer into the Crystal Ball:<br><br>4+ You see the truth. Draw cards from the item or event stack until you find a card of your choice. Shuffle the unwanted cards back into the stack. Keep the chosen card in you hand and don't tell anyone what it is. The next time anyone should draw that type of card, they draw your chosen card. (Ask them to manually draw the card with that ID number, then discard yours.)<br><br>1-3 You avert your eyes.<br>Lose 1 Sanity.<br><br>0 You stare into Hell.<br>Lose 2 Sanity.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 3012,
			"type": "omen",
			"name": "Book",
			"text": "<b>A diary or lab notes?<br>Ancient script or modern ravings?</b><br><br>Gain 2 Knowledge now.<br><br>Lose 2 Knowledge if you lose the Book.",
			"hand": true,
			"discard": true,
			"deck": true,
		},
		{
			"id": 3013,
			"type": "omen",
			"name": "Bite",
			"text": "<b>A growl, the scent of death.<br>Pain. Darkness. Gone.</b><br><br>When you draw this card, something bites you. The player on your right rolls a Might 4 attack against you for the mysterious something (before it runs away into the darkness). You defend against this attack as normal, by rolling dice equal to your Might.<br><br>This omen can't be dropped, traded, or stolen.",
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
				.html(c.text))
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