
// console.log("Sanity Check");

// var jQuery = {}
// var $ = jQuery;

$(document).ready(()=>{

	const freshDeck = createDeck();
	// console.log(freshDeck);
	var theDeck = [];
	var playersHand = [];
	var dealersHand = [];
	var handInProgress = true;

	// $('.form-submit').submit(function(event){
	// 	event.preventDefault();
	// })

	$('.deal-button').click((e)=>{
		// console.log("User clicked Deal!");
		// console.log(e)
		// theDeck = freshDeck is like theDeck ---> freshDeck
		$('.hit-button').prop('disabled',false);
		playersHand = [];
		dealersHand = [];
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
		// placeCard('dealer',2,dealersHand[1])

		calculateTotal(playersHand,'player');
		// calculateTotal(dealersHand,'dealer');

	});

	$('.hit-button').click(()=>{
		// only let the player hit, if they have less than 21.
		if(calculateTotal(playersHand,'player') < 21){
			// console.log("User clicked Hit!");
			var topCard = theDeck.shift();
			playersHand.push(topCard);
			placeCard('player',playersHand.length,topCard);
			calculateTotal(playersHand,'player');
		}else{

		}
	});

	$('.stand-button').click(()=>{
		// control passes to the dealer. 
		// disable the hit button
		// keep the dealer drawing carfds until he has at least 17 
		// Then stop
		// console.log("User clicked Stand!");
		placeCard('dealer',2,dealersHand[1])
		$('.hit-button').prop('disabled',true);
		var dealerTotal = calculateTotal(dealersHand, 'dealer');
		while(dealerTotal < 17){
			var topCard = theDeck.shift();
			dealersHand.push(topCard);
			placeCard('dealer',dealersHand.length,topCard);
			dealerTotal = calculateTotal(dealersHand,'dealer');
		}
		// in order to get this far, the dealer MUST have at least 17
	});

	// hand = the array with cards to total up
	// who = which section of the DOM to change
	function calculateTotal(hand,who){
		var handTotal = 0;
		var thisCardTotal = 0;
		var hasAce = false;
		var totalAces = 0;
		for(let i = 0; i < hand.length; i++){
			thisCardTotal = Number(hand[i].slice(0,-1));

			if(thisCardTotal == 1){
				// this is an Ace!!!
				hasAce = true;
				thisCardTotal = 11;
				totalAces++;
			}else if (thisCardTotal > 10){
				// you have a facecard... reset value to 10
				thisCardTotal = 10;
			}

			handTotal += thisCardTotal;
		}

		// We now know the total with ALL aces = 11, and ALL face cards = 10
		// We now need to reduce the value of any ace from 11 to 1, if it busts the,
		for(let i = 0; i < totalAces; i++){
			if(handTotal > 21){
				handTotal -= 10;
			}
		}

		var classSelector = `.${who}-total`;
		$(classSelector).html(handTotal);
		return handTotal;
	}


	function placeCard(who,where,card){
		var classSelector = `.${who}-cards .card-${where}`;
		$(classSelector).html(`<img src="images/cards/${card}.png" />`);
		// $(classSelector).innerHTML = ""
	}

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
