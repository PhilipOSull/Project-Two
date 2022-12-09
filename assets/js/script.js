document.addEventListener("DOMContentLoaded", function() {
    let btn = document.getElementById("btn--Guess");

    btn.addEventListener("click", runGame);
})

let computerAnswer = Math.floor(Math.random() * 100) +1;
let numGuesses = document.getElementById("numGuesses");
let numGuessed = document.getElementById("numGuessed");

let 

function runGame(event) {
    let userGuess = document.getElementById("guessArea").value;
    if(userGuess < 1 || userGuess > 100){
        alert("Please enter a number between 1 and 100.");
    } else {
        numGuessed.push(userGuess);
        numGuesses+= 1;
    }


}

function timeLeft() {}