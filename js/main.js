
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
	(async () => {
		document.querySelector( "#random" ).disabled =true;
		let app = document.querySelector("#app");
		let element = document.createElement("div");
		element.classList.add("loader");
		app.innerHTML = '';
		app.appendChild(element);
		await new Promise(resolve => setTimeout(resolve, (Math.random()*2000)+1));
		let arr = define.deck.cards;
		arr = arr[Math.floor((Math.random() * arr.length) )].image;
		rndCard = '<img class="card"  src="' + arr + '" />';
		app.innerHTML = rndCard;
		document.querySelector( "#random" ).disabled = false;
	})();
}

const show = document.querySelector( "#random" );
show.addEventListener('click' ,function (event){
	showCard();
});

const night =  document.querySelector( "#night" );
night.addEventListener('click' ,function (event){
	if ( night.value == "Night On" )
	{
	document.querySelector( "body" ).style.backgroundColor = "orange", opacity = .7;
	document.querySelector( "#random" ).style.color = "black";
	night.value = "Night Off";
	console.log( night.value );
	}else 
	{
		document.querySelector( "body" ).style.backgroundColor = "#e6e6e6";
		document.querySelector( "#random" ).style.color = "white";
		night.value = "Night On";
		console.log( night.value );
	}});

getDeck('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');

