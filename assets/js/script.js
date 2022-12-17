    // document.addEventListener("keydown", function (event) {
    //     if (event.key === 'Enter') {
    //         alert("test");
    //     }
    // });

    const btn = document.getElementById("btn--Guess");
    const btnRestart = document.getElementById("btn--Restart");
    const btnStart = document.getElementById('btn--Start');
    const timeLeft = document.getElementById("time-left");
    const select = document.getElementById("difficulty");
    const hourGlass = document.getElementById("hour-glass");
    const highLowMsg = document.getElementById("high-low");

    let computerAnswer = Math.floor(Math.random() * 100) + 1;
    let gameTimerId;
    let timer = 60;

    btn.addEventListener("click", evaluateGuess);
    btnRestart.addEventListener("click", restart);
    btnStart.addEventListener("click", startGame);

    function evaluateGuess(e) {

        e.preventDefault();
        const numGuessed = document.getElementById("num-guessed");
        const numGuesses = document.getElementById("num-guesses");

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
            hourGlass.innerHTML = `<i class="fas fa-hourglass-half"></i>`;
        }

        timer--
        timeLeft.textContent = timer;

        if (timer == 0) {
            clearInterval(gameTimerId)
            hourGlass.innerHTML = `<i class="fas fa-hourglass-end"></i>`;
            highLowMsg.textContent = "GAME OVER!";
        }

        ;

    }

    function restart(e) {
        e.preventDefault()
        clearInterval(gameTimerId);
        hourGlass.innerHTML = `<i class="fas fa-hourglass-start"></i>`;
        document.getElementById("num-guesses").innerText = 0;
        document.getElementById("num-guessed").innerText = '';
        document.getElementById("guess-area").value = '';
        document.getElementById("high-low").innerText = '';
        computerAnswer = Math.floor(Math.random() * 100) + 1;
        document.getElementById("time-left").innerText = 60;
        btnStart.style.visibility = 'visible';


    }