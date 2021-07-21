// Variables for HTML elements
var boxInputWord = document.getElementById("box_input_word");
var boxGuessWord = document.getElementById("box_guess_word");
var boxResults = document.getElementById("box_results");

var inputWord = document.getElementById("input_word");
var btnSubmitWord = document.getElementById("submit_word");

var inputLetter = document.getElementById("input_letter");
var btnSubmitLetter = document.getElementById("submit_letter");

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
function submitWord() {
	wordToGuess = inputWord.value;
	inputWord.value = "";
		console.log("mot à deviner : " + wordToGuess);
	showBox("GAME");
	gameInit();
}

function gameInit() {
	attemptsMax = wordToGuess.length;
		console.log("Nombre d'essais max: " + attemptsMax);
	wordGuessed = "";
	for (i in wordToGuess) {wordGuessed += "_";}
	displayWord.innerHTML = wordGuessed;
	attemptsLeft = attemptsMax;
	displayAttempts.innerHTML = attemptsLeft;
}

//Game
function guessLetter() {
	letter = inputLetter.value;
	inputLetter.value = "";
		console.log("lettre entrée : "+letter);
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
btnSubmitLetter.addEventListener("click", guessLetter, false);
btnReplay.addEventListener("click", replay, false);

