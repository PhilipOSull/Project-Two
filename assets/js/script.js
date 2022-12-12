document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("btn--Guess");
    btn.addEventListener("click", runGame);


const btnRestart = document.getElementById("btn--Restart");
btnRestart.addEventListener("click", restart);
const btnStart = document.getElementById('btn--Start');
btnStart.addEventListener("click", startGame);

const timeLeft = document.getElementById("timeLeft");
const select = document.getElementById("difficulty");
let computerAnswer = Math.floor(Math.random() * 100) + 1;

let gameTimerId;
let timer = 60;

function runGame(e) {

    e.preventDefault();
    const highLowMsg = document.getElementById("highLow");
    const numGuessed = document.getElementById("numGuessed");
    const numGuesses = document.getElementById("numGuesses");

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
    if (btnStart.style.visibility = "visible") {
        startGame();
    }
}

function startGame() {
    clearInterval(gameTimerId);
    timer = 60;
    const selectValue = select.options[select.selectedIndex].value;
    const faster = {
        'easy': 1000,
        'medium': 800,
        'hard': 500
    };
    gameTimerId = setInterval(gameTimer, faster[selectValue]);
    btnStart.style.visibility = 'hidden';
}

function gameTimer() {
    if (btnStart.style.visibility == 'visible') {
        return;
    }

    if (timer == 30) {
        const hourGlass = document.getElementById("hourGlass");
        hourGlass.innerHTML = `<i class="fas fa-hourglass-half"></i>`
    }

    timer--
    timeLeft.textContent = timer

    if (timer == 0) {
        clearInterval(gameTimerId)
        const hourGlass = document.getElementById("hourGlass");
        hourGlass.innerHTML = `<i class="fas fa-hourglass-end"></i>`
        // btn.disable = true;
        const highLowMsg = document.getElementById("highLow");
        highLowMsg.textContent = "GAME OVER!";
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
    const hourGlass = document.getElementById("hourGlass");
        hourGlass.innerHTML = `<i class="fas fa-hourglass-start"></i>`
    // numGuessed.innerText = '';
    // numGuesses.innerText = '';
    document.getElementById("numGuesses").innerText = 0;
    document.getElementById("numGuessed").innerText = '';
    document.getElementById("guessArea").value = '';
    document.getElementById("highLow").innerText = '';
    computerAnswer = Math.floor(Math.random() * 100) + 1;
    document.getElementById("timeLeft").innerText = 60;
    // alert("hi"); // test
    // return;
    btnStart.style.visibility = 'visible';


}
})