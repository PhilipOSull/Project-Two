document.addEventListener("DOMContentLoaded", function () {
    let btn = document.getElementById("btn--Guess");

    btn.addEventListener("click", runGame);
})

let numGuesses = document.getElementById("numGuesses");
let numGuessed = document.getElementById("numGuessed");
let computerAnswer = Math.floor(Math.random() * 100) + 1;
let highLowMsg = document.getElementById("highLow");




function runGame(event) {

    event.preventDefault();

    let userGuess = document.getElementById("guessArea").value;
    if (userGuess < 1 || userGuess > 100) {
        alert('Please enter a number between 1 and 100.');
    } else if (userGuess < computerAnswer) {
        highLowMsg.textContent = "Your guess is too Low!"

        numGuesses.textContent = (parseInt(numGuesses.innerText) + 1);
        if (parseInt(numGuesses.innerText) == 1) {
            numGuessed.textContent = "Guessed numbers are: " + userGuess;
        } else {
            let sentence = numGuessed.innerText
            numGuessed.textContent = sentence.slice(0, 21) + sentence.slice(21) + ',' + userGuess;
        }
    } else if (userGuess > computerAnswer) {
        highLowMsg.textContent = "Your guess is too High!";

        numGuesses.innerText = (parseInt(numGuesses.innerText) + 1);
        if (parseInt(numGuesses.innerText) == 1) {
            numGuessed.textContent = "Guessed numbers are: " + userGuess;
        } else {
            let sentence = numGuessed.innerText;
            numGuessed.textContent = sentence.slice(0, 21) + sentence.slice(21) + ',' + userGuess;
        }
    } else if (userGuess == computerAnswer) {

        numGuesses.innerText = (parseInt(numGuesses.innerText) + 1);
        if (parseInt(numGuesses.innerText) == 1)
         { highLowMsg.textContent = "Got it on your first go! You must be a psychic!";
            numGuessed.textContent = "Guessed numbers are: " + userGuess;
        } else {
            highLowMsg.textContent = "Yay you got it right!";
            let sentence = numGuessed.innerText;
            numGuessed.textContent = sentence.slice(0, 21) + sentence.slice(21) + ',' + userGuess;
        }
    }
}

document.getElementById('guessArea').value = null;


function timeLeft() {}