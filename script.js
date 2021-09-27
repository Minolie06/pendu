// Variables for HTML elements
var boxInputWord = document.getElementById("box_input_word");
var boxGuessWord = document.getElementById("box_guess_word");
var boxResults = document.getElementById("box_results");

var inputWord = document.getElementById("input_word");
var btnSubmitWord = document.getElementById("submit_word");
var errorWord = document.getElementById("error_word");

var inputLetter = document.getElementById("input_letter");
var btnSubmitLetter = document.getElementById("submit_letter");
var errorLetterRepeat = document.getElementById("error_letter_repeat");
var errorLetterInvalid = document.getElementById("error_letter_invalid");

var displayWord = document.getElementById("word_display");
var displayAttempts = document.getElementById("attempts_left")

var resultMessage = document.getElementById("result_message");
var resultWord = document.getElementById("result_word");
var btnReplay = document.getElementById("replay");

// Variables
var wordToGuess;
var wordGuessed;
var wordTemp;

var letterUser;
var lettersGuessed;

var attemptsMax;
var attemptsLeft;

//Display
function showBox(box) {
	switch (box) {
		case "INPUT":
			boxInputWord.style.display = "block";
			boxGuessWord.style.display = "none";
			boxResults.style.display = "none";
			inputWord.focus();
			break;
		case "GAME":
			boxInputWord.style.display = "none";
			boxGuessWord.style.display = "block";
			boxResults.style.display = "none";
			inputLetter.focus();
			break;
		case "RESULTS":
			boxInputWord.style.display = "none";
			boxGuessWord.style.display = "none";
			boxResults.style.display = "block";
			btnReplay.focus();
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
function submitWord() {
	wordToGuess = inputWord.value.toLowerCase();
	inputWord.value = "";
	if (/^[a-z-àáâãäåæçèéêëìíîïòóôõöœùúûü]+$/.test(wordToGuess)) {
		showBox("GAME");
		gameInit();
	} else if (wordToGuess != "") {
		errorWord.style.visibility = "visible";
	}
}

function gameInit() {
	attemptsMax = Math.min(2*wordToGuess.length, 20);
	wordGuessed = "";
	lettersGuessed = [];
	for (i in wordToGuess) {wordGuessed += "_";}
	displayWord.innerHTML = wordGuessed;
	attemptsLeft = attemptsMax;
	displayAttempts.innerHTML = attemptsLeft;
}

//Game
function submitLetter() {
	letterUser = inputLetter.value;
	inputLetter.value = "";
	if (/^[a-z-àáâãäåæçèéêëìíîïòóôõöœùúûü]+$/.test(letterUser)) {
		if (!(lettersGuessed.includes(letterUser))) {
			guessLetter(letterUser);
			lettersGuessed.push(letterUser);
		} else {
			errorLetterRepeat.style.visibility = "visible";
			
		}
	} else if (letterUser != "") {
		errorLetterInvalid.style.visibility = "visible";
	}
}

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
		displayWord.classList.add("apply-shake");
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
function replay() {
	showBox("INPUT");
	displayWord.classList.remove("apply-shake");
}


//Events listeners
btnSubmitWord.addEventListener("click", submitWord, false);
btnSubmitLetter.addEventListener("click", function(){
	submitLetter();
	inputLetter.focus();
}, false);
btnReplay.addEventListener("click", replay, false);

//Enter = clic button
inputWord.addEventListener("keypress", function(e) {
	if(e.key === "Enter") {
		btnSubmitWord.click();
	}
}, false);

inputLetter.addEventListener("keyup", function(e) {
	if(e.key === "Enter") {
		btnSubmitLetter.click();
	}
}, false);

//Hide error messages
inputWord.addEventListener("keydown", function() {
	errorWord.style.visibility = "hidden";
}, false);

inputLetter.addEventListener("keydown", function() {
	errorLetterInvalid.style.visibility = "hidden";
	errorLetterRepeat.style.visibility = "hidden";
}, false);

//Shaking animation - remove class
displayWord.addEventListener("animationend", function(e) {
    displayWord.classList.remove("apply-shake");
}, false);

//On-load
windows.onload = showBox("INPUT");

