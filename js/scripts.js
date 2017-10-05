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
	shuffleDeck();

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

	function shuffleDeck(){
		// Loop. A lot. Like those machines in casinos. 
		// Each time through the loop, we will switch to indicies (cards)
		// When the loop (lots of times) is done, the array (Deck) will be shuffled
		for(let i = 0; i < 50000; i++){
			var rand1 = Math.floor(Math.random() * theDeck.length);
			var rand2 = Math.floor(Math.random() * theDeck.length);
			// switch theDeck[rand1] with theDeck[rand2]
			// Stash teh value of theDeck[rand1] inside card1Defender so
			// we can get it back after overwriting theDeck[rand1] with tehDeck[rand2]
			var card1Defender = theDeck[rand1]; 
			// now it's safe to overwrite theDeck[rand1], becasue we saved it
			theDeck[rand1] = theDeck[rand2];
			theDeck[rand2] = card1Defender;
		}
		console.log(theDeck);
	}


});