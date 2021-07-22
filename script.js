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

function colorWord(word) {
	var coloredWord = "";
	for (var i=0; i<word.length; i++) {
		if (word.substring(i, i+1) == "_") {
			coloredWord += '<span class="accent_color">' + wordToGuess.substring(i, i+1) + '</span>';
		} else {
			coloredWord += word.substring(i, i+1);
		}
	}
	return coloredWord;
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
	
	//reset keyboard
	for (var i=0; i<btnLetters.length; i++) {
		btnLetters[i].disabled = false;
	}
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
			resultWord.innerHTML = colorWord(wordGuessed);
		} else {
			resultMessage.innerHTML = "Gagné ! Le mot à deviner était bien :"
			resultWord.innerHTML = wordToGuess;
		}
		
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

for (var i=0; i<btnLetters.length; i++) {
	btnLetters[i].addEventListener("click", function(ev) {
		guessLetter(ev.target.value);
		ev.target.disabled = true;
	},false);
}

