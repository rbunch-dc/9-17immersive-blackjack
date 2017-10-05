// console.log('sanity check');
$(document).ready(function(){
	// Wait for the DOM JS...
	// BlackJack deal function
	// 	Create deck function
	// 	Shuffle deck function
	// 	Add card[0] and card[2] to player hand, 1 and 3 to dealer
	// 	Place card function
	// 	Push card onto players array

	var playersHand = [];
	var dealersHand = [];
	// freshDeck is the return value of the function createDeck
	const freshDeck = createDeck();
	console.log(freshDeck);
	// Make a FULL copy of teh freshDeck with slice, don't point at it.
	var theDeck = freshDeck.slice();
	// shuffleDeck();

	$('.deal-button').click(()=>{
		// We will create and shuffle a new deck
		theDeck = freshDeck.slice();
		theDeck = shuffleDeck(theDeck);
		playersHand = [];
		dealersHand = [];
		// console.log(theDeck);
		// Update the player and dealer hand arrays...
		// The player ALWAYS gets teh first card in teh deck...
		console.log(theDeck)
		// console.log(theDeck.length);
		var topCard = theDeck.shift();
		// console.log(topCard);
		// console.log(theDeck.length);
		playersHand.push(topCard);

		// Give the dealer the next top card
		topCard = theDeck.shift();
		dealersHand.push(topCard);

		// Give the player the next top card
		topCard = theDeck.shift();
		playersHand.push(topCard);

		// Give the dealer the next top card
		topCard = theDeck.shift();
		dealersHand.push(topCard);

		console.log(playersHand);
		console.log(dealersHand);

		placeCard('player',1,playersHand[0]);
		placeCard('dealer',1,dealersHand[0]);
		placeCard('player',2,playersHand[1]);
		placeCard('dealer',2,dealersHand[1]);

	})

	$('.hit-button').click(()=>{
		// Hit functionallity...
	})	

	$('.stand-button').click(()=>{
		// Stand functionallity...
	})

	function placeCard(who,where,whatToPlace){
						// who = "dealer"
						// where = 1
		var classSelector = `.${who}-cards .card-${where}`;
							 // $('.dealer-cards .card-1')
		// Set the HTML of the div with .who-cards .card-where with the image...
		// $(classSelector).html('<img src="images/cards/'+whatToPlace+'.png" />');
		$(classSelector).html(`<img src="images/cards/${whatToPlace}.png" />`);

	}

	function createDeck(){
		// local var. Per JS scope, no one knows about this var but me (createDeck function)
		var newDeck = [];
		// Card = suit + value
		// suits is a constant. It cannot be reassigned. 
		const suits = ['h','s','d','c'];
		// suits.push("special") //will error!!!
		// outer loop for suit
		// suits.map((s)=>{
		// })
		for(let s = 0; s < suits.length; s++){
			// inner loop for value
			for(let c = 1; c <= 13; c++){
				newDeck.push(c+suits[s]);
			}
		}
		// console.log(newDeck);
		return newDeck;
	}

	function shuffleDeck(aDeckToBeShuffled){
		// Loop. A lot. Like those machines in casinos. 
		// Each time through the loop, we will switch to indicies (cards)
		// When the loop (lots of times) is done, the array (Deck) will be shuffled
		for(let i = 0; i < 50000; i++){
			var rand1 = Math.floor(Math.random() * aDeckToBeShuffled.length);
			var rand2 = Math.floor(Math.random() * aDeckToBeShuffled.length);
			// switch theDeck[rand1] with theDeck[rand2]
			// Stash teh value of theDeck[rand1] inside card1Defender so
			// we can get it back after overwriting theDeck[rand1] with tehDeck[rand2]
			var card1Defender = aDeckToBeShuffled[rand1]; 
			// now it's safe to overwrite theDeck[rand1], becasue we saved it
			aDeckToBeShuffled[rand1] = aDeckToBeShuffled[rand2];
			aDeckToBeShuffled[rand2] = card1Defender;
		}
		// console.log(theDeck);
		return aDeckToBeShuffled;
	}


});