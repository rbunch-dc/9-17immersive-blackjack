// console.log("Sanity Check");

// var jQuery = {}
// var $ = jQuery;

$(document).ready(()=>{

	const freshDeck = createDeck();
	// console.log(freshDeck);
	var theDeck = [];
	var playersHand = [];
	var dealersHand = [];

	// $('.form-submit').submit(function(event){
	// 	event.preventDefault();
	// })

	$('.deal-button').click((e)=>{
		// console.log("User clicked Deal!");
		// console.log(e)
		// theDeck = freshDeck is like theDeck ---> freshDeck
		var newDeck = freshDeck.slice();
		theDeck = shuffleDeck(newDeck);
		// console.log(theDeck);
		var topCard = theDeck.shift();
		playersHand.push(topCard);
		// playersHand.push(theDeck.shift());
		topCard = theDeck.shift();
		dealersHand.push(topCard);
		
		topCard = theDeck.shift();
		playersHand.push(topCard);

		topCard = theDeck.shift();
		dealersHand.push(topCard);
		
		placeCard('player',1,playersHand[0])
		placeCard('dealer',1,dealersHand[0])
		placeCard('player',2,playersHand[1])
		placeCard('dealer',2,dealersHand[1])

	});

	function placeCard(who,where,card){
		var classSelector = `.${who}-cards .card-${where}`;
		$(classSelector).html(`<img src="images/cards/${card}.png" />`);
		// $(classSelector).innerHTML = ""
	}

	$('.hit-button').click(()=>{
		// console.log("User clicked Hit!");
	});

	$('.stand-button').click(()=>{
		// console.log("User clicked Stand!");
	});

	function createDeck(){
		// local var, newDeck. No one outside of createDeck can see it
		var newDeck = [];
		// outter loop for suit, inner loop for value
		const suits = ['h','s','d','c'];
		for(let s = 0; s < suits.length; s++){
			for(let c = 1; c <= 13; c++){
				newDeck.push(c+suits[s]);
			}
		}
		return newDeck;
	}

	function shuffleDeck(arrayToBeShuffled){
		for(let i = 0; i < 50000; i++){
			var rand1 = Math.floor(Math.random() * arrayToBeShuffled.length);
			var rand2 = Math.floor(Math.random() * arrayToBeShuffled.length);
			var saveValueOfCard1 = arrayToBeShuffled[rand1];
			arrayToBeShuffled[rand1] = arrayToBeShuffled[rand2];
			arrayToBeShuffled[rand2] = saveValueOfCard1;
		}
		return arrayToBeShuffled;
	}

});
