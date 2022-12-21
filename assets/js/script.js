/*jshint esversion: 6 */

// MY GLOBAL VARIABLES //
const btn = document.getElementById("btn-guess");
const btnRestart = document.getElementById("btn-new-game");
const btnStart = document.getElementById("btn-start");
const timeLeft = document.getElementById("time-left");
const select = document.getElementById("difficulty");
const hourGlass = document.getElementById("hour-glass");
const highLowMsg = document.getElementById("high-low");
const numGuessed = document.getElementById("num-guessed");
const numGuesses = document.getElementById("num-guesses");
const userGuess = document.getElementById("guess-area");

let computerAnswer = Math.floor(Math.random() * 100) + 1;
let gameTimerId;
let timer = 60;



// MY EVENT LISTENERS //

btn.addEventListener("click", evaluateGuess);
userGuess.addEventListener("keydown", evaluateGuessEnter);
btnRestart.addEventListener("click", restart);
btnStart.addEventListener("click", startGame);


// FUNCTIONS //

function evaluateGuessEnter(e) {
    if (e.key == "Enter") {
        evaluateGuess(e);
    }
}

function evaluateGuess(e) {

    e.preventDefault();

    if (timeLeft.innerText == 60) {
        return;
    }

    if (timeLeft.innerText == 0) {
        return;
    }

    const userGuessVal = userGuess.value;
    console.log(userGuessVal);
    userGuess.value = '';
    if (userGuessVal < 1 || userGuessVal > 100) {
        alert("Please enter a number between 1 and 100.");
    } else if (userGuessVal < computerAnswer) {
        highLowMsg.textContent = "Your guess is too Low!";

        numGuesses.textContent = (parseInt(numGuesses.innerText) + 1);
        if (parseInt(numGuesses.innerText) == 1) {
            numGuessed.textContent = "Guessed Your guessed numbers are: " + userGuessVal;
        } else {
            let sentence = numGuessed.innerText;
            numGuessed.textContent = sentence.slice(0, 21) + sentence.slice(21) + ',' + userGuessVal;
        }
    } else if (userGuessVal > computerAnswer) {
        highLowMsg.textContent = "Your guess is too High!";

        numGuesses.innerText = (parseInt(numGuesses.innerText) + 1);
        if (parseInt(numGuesses.innerText) == 1) {
            numGuessed.textContent = "Guessed Your guessed numbers are: " + userGuessVal;
        } else {
            let sentence = numGuessed.innerText;
            numGuessed.textContent = sentence.slice(0, 21) + sentence.slice(21) + ',' + userGuessVal;
        }
    } else if (userGuessVal == computerAnswer) {

        numGuesses.innerText = (parseInt(numGuesses.innerText) + 1);
        if (parseInt(numGuesses.innerText) == 1) {
            highLowMsg.textContent = "CONGRATULATIONS! YOU MUST BE A PSYCHIC!";
            numGuessed.textContent = "Guessed Your guessed numbers are: " + userGuessVal;
            clearInterval(gameTimerId);
            btn.removeEventListener("click", evaluateGuess);
            userGuess.removeEventListener("keydown", evaluateGuessEnter);
        } else {
            highLowMsg.textContent = "CONGRATULATIONS! YOU GOT IT!";
            let sentence = numGuessed.innerText;
            numGuessed.textContent = sentence.slice(0, 21) + sentence.slice(21) + ',' + userGuessVal;
            clearInterval(gameTimerId);
            btn.removeEventListener("click", evaluateGuess);
            userGuess.removeEventListener("keydown", evaluateGuessEnter);
        }
    }
    if (btnStart.style.visibility == "visible") {
        console.log("startGame", btnStart.style.visibility);
        startGame();
    }
}

function startGame() {
    clearInterval(gameTimerId);
    timer = 60;
    numGuesses.innerText = 0;
    numGuessed.innerText = "Your guessed numbers are: ";
    userGuess.value = '';
    computerAnswer = Math.floor(Math.random() * 100) + 1;
    console.log(computerAnswer);
    const selectValue = select.options[select.selectedIndex].value;
    const faster = {
        "easy": 1000,
        "medium": 500,
        "hard": 250
    };
    gameTimerId = setInterval(gameTimer, faster[selectValue]);
    btnStart.style.visibility = "hidden";
    highLowMsg.innerText = "Start guessing!";

    btn.removeEventListener("click", evaluateGuess);
    btn.addEventListener("click", evaluateGuess);
    userGuess.removeEventListener("keydown", evaluateGuessEnter);
    userGuess.addEventListener("keydown", evaluateGuessEnter);

    if (btnStart.style.visibility = "hidden") {
        select.disabled = true;
    }

}

function gameTimer() {

    if (timer == 30) {
        hourGlass.innerHTML = `<i class="fas fa-hourglass-half"></i>`;
    }

    timer--;
    timeLeft.textContent = timer;

    if (timer == 0) {
        clearInterval(gameTimerId);
        hourGlass.innerHTML = `<i class="fas fa-hourglass-end"></i>`;
        highLowMsg.textContent = "TIME'S UP! THE CORRECT ANSWER WAS: " + computerAnswer;
        btnStart.style.visibility = "visible";
    }

}

function restart(e) {
    e.preventDefault();
    clearInterval(gameTimerId);
    hourGlass.innerHTML = `<i class="fas fa-hourglass-start"></i>`;
    numGuesses.innerText = 0;
    numGuessed.innerText = "Your guessed numbers are: ";
    userGuess.value = '';
    highLowMsg.innerText = "Press the play button to start!";
    computerAnswer = Math.floor(Math.random() * 100) + 1;
    // console.log(computerAnswer);
    document.getElementById("time-left").innerText = 60;
    btnStart.style.visibility = "visible";
    if (btnStart.style.visibility = "visible") {
        select.disabled = false;
    }


}