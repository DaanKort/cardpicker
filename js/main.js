
function reqDeck () {
	let json = JSON.parse( this.responseText );
	let deck_id = json.deck_id;
	console.log(deck_id);
  }

let define = {
	deckId:undefined,
	deck:undefined
};

function getDeck(url){
	fetch(url)
	.then(function(response) {
		return response.json();
	})
	.then(function(myJson) {
		define.deckId = myJson.deck_id;
		getCards(`https://deckofcardsapi.com/api/deck/${define.deckId}/draw/?count=9`);
	});

  }

function getCards(url){
	fetch(url)
	.then(function(response) {
	  return response.json();
	})
	.then(function(myJson) {
		define.deck = myJson;
		console.log(define);
	});
  }

  function showCard () {
	let x = document.createElement("IMG");
	let arr = define.deck.cards;
	arr = arr[Math.floor((Math.random() * arr.length) )].image;
	rndCard = '<img class="card"  src="' + arr + '" />';
	document.querySelector("#app").innerHTML = rndCard;
  }
  
  const show = document.querySelector( "#random" );
  show.addEventListener('click' ,function (event){
	showCard();
  });
  
  getDeck('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
  //getResponse('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
  
