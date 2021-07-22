// Variables for HTML elements
var boxInputWord = document.getElementById("box_input_word");
var boxGuessWord = document.getElementById("box_guess_word");
var boxResults = document.getElementById("box_results");

var inputWord = document.getElementById("input_word");
var btnSubmitWord = document.getElementById("submit_word");

var btnLetters = document.getElementsByClassName("btn_letter");

var displayWord = document.getElementById("word_display");
var displayAttempts = document.getElementById("attempts_left")

var resultMessage = document.getElementById("result_message");
var resultWord = document.getElementById("result_word");
var btnReplay = document.getElementById("replay");

// Variables
var wordToGuess;
var wordGuessed;
var wordTemp;
var letter;

var attemptsMax;
var attemptsLeft;

//Display
function showBox (box) {
	switch (box) {
		case "INPUT":
			boxInputWord.style.display = "block";
			boxGuessWord.style.display = "none";
			boxResults.style.display = "none";
			break;
		case "GAME":
			boxInputWord.style.display = "none";
			boxGuessWord.style.display = "block";
			boxResults.style.display = "none";
			break;
		case "RESULTS":
			boxInputWord.style.display = "none";
			boxGuessWord.style.display = "none";
			boxResults.style.display = "block";
			break;
	}
}

//Initialisation
function tidyString(word) {
	var newWord= word.toLowerCase();
    newWord = newWord.replace(new RegExp(/[àáâãäå]/g),"a");
    newWord = newWord.replace(new RegExp(/æ/g),"ae");
    newWord = newWord.replace(new RegExp(/ç/g),"c");
    newWord = newWord.replace(new RegExp(/[èéêë]/g),"e");
    newWord = newWord.replace(new RegExp(/[ìíîï]/g),"i");
    newWord = newWord.replace(new RegExp(/[òóôõö]/g),"o");
    newWord = newWord.replace(new RegExp(/œ/g),"oe");
    newWord = newWord.replace(new RegExp(/[ùúûü]/g),"u");
    return newWord;
}

function submitWord() {
	wordToGuess = tidyString(inputWord.value);
	inputWord.value = "";
	if (/^[a-z]+$/.test(wordToGuess)) {
		showBox("GAME");
		gameInit();
	} else {
		alert("Mot invalide");
	}
}

function gameInit() {
	attemptsMax = wordToGuess.length;
	wordGuessed = "";
	for (i in wordToGuess) {wordGuessed += "_";}
	displayWord.innerHTML = wordGuessed;
	attemptsLeft = attemptsMax;
	displayAttempts.innerHTML = attemptsLeft;
}

//Game
function guessLetter(letter) {
	wordTemp = "";

	for (var i = 0; i < wordToGuess.length; i++) {
		if (wordGuessed.substring(i, i+1) == "_" && letter == wordToGuess.substring(i, i+1)) {
			wordTemp += letter;
		} else {
			wordTemp += wordGuessed.substring(i,i+1);
		}
	}
	
	if (wordGuessed != wordTemp) {
		wordGuessed = wordTemp;
		displayWord.innerHTML = wordGuessed;
	} else {
		attemptsLeft -= 1;
		displayAttempts.innerHTML = attemptsLeft;
	}
	
	//game finished
	if (wordGuessed == wordToGuess || attemptsLeft == 0) { 
		if (attemptsLeft == 0) {
			resultMessage.innerHTML = "Perdu ! Le mot à deviner était :"
		} else {
			resultMessage.innerHTML = "Gagné ! Le mot à deviner était bien :"
		}
		resultWord.innerHTML = wordToGuess;
		showBox("RESULTS");
	}
}

//Replay
function replay () {
	showBox("INPUT");
}


//Events listeners
btnSubmitWord.addEventListener("click", submitWord, false);
btnReplay.addEventListener("click", replay, false);

//Events listeners : keyboard

btnLetters[0].addEventListener("click", function(){
	guessLetter(btnLetters[0].value);
})
btnLetters[1].addEventListener("click", function(){
	guessLetter(btnLetters[1].value);
})
btnLetters[2].addEventListener("click", function(){
	guessLetter(btnLetters[2].value);
})
btnLetters[3].addEventListener("click", function(){
	guessLetter(btnLetters[3].value);
})
btnLetters[4].addEventListener("click", function(){
	guessLetter(btnLetters[4].value);
})
btnLetters[5].addEventListener("click", function(){
	guessLetter(btnLetters[5].value);
})
btnLetters[6].addEventListener("click", function(){
	guessLetter(btnLetters[6].value);
})
btnLetters[7].addEventListener("click", function(){
	guessLetter(btnLetters[7].value);
})
btnLetters[8].addEventListener("click", function(){
	guessLetter(btnLetters[8].value);
})
btnLetters[9].addEventListener("click", function(){
	guessLetter(btnLetters[9].value);
})
btnLetters[10].addEventListener("click", function(){
	guessLetter(btnLetters[10].value);
})
btnLetters[11].addEventListener("click", function(){
	guessLetter(btnLetters[11].value);
})
btnLetters[12].addEventListener("click", function(){
	guessLetter(btnLetters[12].value);
})
btnLetters[13].addEventListener("click", function(){
	guessLetter(btnLetters[13].value);
})
btnLetters[14].addEventListener("click", function(){
	guessLetter(btnLetters[14].value);
})
btnLetters[15].addEventListener("click", function(){
	guessLetter(btnLetters[15].value);
})
btnLetters[16].addEventListener("click", function(){
	guessLetter(btnLetters[16].value);
})
btnLetters[17].addEventListener("click", function(){
	guessLetter(btnLetters[17].value);
})
btnLetters[18].addEventListener("click", function(){
	guessLetter(btnLetters[18].value);
})
btnLetters[19].addEventListener("click", function(){
	guessLetter(btnLetters[19].value);
})
btnLetters[20].addEventListener("click", function(){
	guessLetter(btnLetters[20].value);
})
btnLetters[21].addEventListener("click", function(){
	guessLetter(btnLetters[21].value);
})
btnLetters[22].addEventListener("click", function(){
	guessLetter(btnLetters[22].value);
})
btnLetters[23].addEventListener("click", function(){
	guessLetter(btnLetters[23].value);
})
btnLetters[24].addEventListener("click", function(){
	guessLetter(btnLetters[24].value);
})
btnLetters[25].addEventListener("click", function(){
	guessLetter(btnLetters[25].value);
})
