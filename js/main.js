
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
	var UID = {
		_current: 0,
		getNew: function(){
			this._current++;
			return this._current;
		}
	};
	
	HTMLElement.prototype.pseudoStyle = function(element,prop,value){
		var _this = this;
		var _sheetId = "pseudoStyles";
		var _head = document.head || document.getElementsByTagName('head')[0];
		var _sheet = document.getElementById(_sheetId) || document.createElement('style');
		_sheet.id = _sheetId;
		var className = "pseudoStyle" + UID.getNew();
		
		_this.className +=  " "+className; 
		
		_sheet.innerHTML += "\n."+className+":"+element+"{"+prop+":"+value+"}";
		_head.appendChild(_sheet);
		return this;
	};
const sun = document.querySelector ("#sun");
const moon = document.querySelector ("#moon");
const invert = document.querySelector ( "img" )
const header = document.querySelector( "#header" );
const expand = document.querySelector( "#expand" );
const fold = document.querySelector( "#fold" );
const contract = document.querySelector( "#contract" );
expand.addEventListener( 'click', (event) =>{
	moon.style.opacity = "0";
	sun.style.opacity = "1";
	expand.innerHTML = "<style>.card {filter: invert(100%) grayscale(100%);}</style>";
	expand.style.cursor = "default";
	contract.style.cursor = "pointer";
	header.classList.toggle("whitetext");
	fold.pseudoStyle("before", "border-bottom", "2200px solid #e6e6e6");
	fold.pseudoStyle("before", "border-left", "2200px solid transparent");
	fold.pseudoStyle("after", "border-top", "2200px solid #272822");
	fold.pseudoStyle("after", "border-right", "2200px solid transparent");
	console.log( "pls" );
});

contract.addEventListener( 'click', (event) =>{
	moon.style.opacity = "1";
	sun.style.opacity = "0";
	expand.innerHTML = "";
	expand.style.cursor = "pointer";
	contract.style.cursor = "default";
	header.classList.toggle("whitetext");
	fold.pseudoStyle("before", "border-bottom", "70px solid #e6e6e6");
	fold.pseudoStyle("before", "border-left", "70px solid transparent");
	fold.pseudoStyle("after", "border-top", "70px solid #272822");
	fold.pseudoStyle("after", "border-right", "70px solid transparent");
	console.log( "pls1" );
});



getDeck('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');

