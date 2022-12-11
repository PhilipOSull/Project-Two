document.addEventListener("DOMContentLoaded", function () {
    let btn = document.getElementById("btn--Guess");


    btn.addEventListener("click", runGame, startGame);
})

// let btnRestart = document.getElementById("btn--Restart");
// btnRestart.addEventListener("click", restart)

let computerAnswer = Math.floor(Math.random() * 100) + 1;

let timeLeft = document.getElementById("timeLeft");
let timerId = null;


// let gameTimerId = setInterval(gameTimer, 1000);

function runGame(event) {

    event.preventDefault();
    let highLowMsg = document.getElementById("highLow");
    let numGuessed = document.getElementById("numGuessed");
    let numGuesses = document.getElementById("numGuesses");

    let userGuess = document.getElementById("guessArea").value;
    if (userGuess < 1 || userGuess > 100) {
        alert("Please enter a number between 1 and 100.");
    } else if (userGuess < computerAnswer) {
        highLowMsg.textContent = "Your guess is too Low!";

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
        if (parseInt(numGuesses.innerText) == 1) {
            highLowMsg.textContent = "Got it on your first go! You must be a psychic!";
            numGuessed.textContent = "Guessed numbers are: " + userGuess;
        } else {
            highLowMsg.textContent = "Yay you got it right!";
            let sentence = numGuessed.innerText;
            numGuessed.textContent = sentence.slice(0, 21) + sentence.slice(21) + ',' + userGuess;
        }
    }
}

let btnRestart = document.getElementById("btn--Restart");
btnRestart.addEventListener("click", restart);

// document.getElementById("btn--Start").addEventListener("click", function () {
//     let btnStart = document.getElementById('btn--Start');

let btnStart = document.getElementById('btn--Start');
btnStart.addEventListener("click", startGame);


let gameTimerId;
let timer = 60;

function startGame() {
    clearInterval(gameTimerId);
    timer = 60;
    gameTimerId = setInterval(gameTimer, 1000);
    btnStart.style.visibility = 'hidden';
}

function gameTimer() {

    if (btnStart.style.visibility == 'visible') {
        return;
    }

    timer--
    timeLeft.textContent = timer

    if (timer == 0) {
        clearInterval(gameTimerId)
        // btn.disable = true;
        alert("Game over!");
    }

    ;

}


// async function start(game) {
//     let btnStart = document.getElementById("btn--Start");
//     if(btnStart.addEventListener("click")) {
//     gameTimer();
//     }
// }


function restart(e) {
    e.preventDefault()
    clearInterval(gameTimerId);
    // numGuessed.innerText = '';
    // numGuesses.innerText = '';
    document.getElementById("numGuesses").innerText = 0;
    document.getElementById("numGuessed").innerText = '';
    document.getElementById("guessArea").value = '';
    document.getElementById("highLow").innerText = '';
    document.getElementById("timeLeft").innerText = 60;
    computerAnswer = Math.floor(Math.random() * 100) + 1;
    // alert("hi"); // test
    // return;
    btnStart.style.visibility = 'visible';


}