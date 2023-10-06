(async function() {

const loading = document.querySelector("#loading");
loading.style.display = "initial";

const Pi = await (await fetch("pi.txt")).text();

loading.style.display = "none";


const PreviouslyInputted = document.querySelector("#inputted-text");
const HintText = document.querySelector("#start-hint");
const GameInput = document.querySelector("#game-input");
const Game = document.querySelector("#game");
const ResetScreen = document.querySelector("#retry-screen");
const CanBeatHS = document.querySelector("#can-beat");

if (localStorage.getItem("high-score") !== null)
    CanBeatHSQuestionGen(localStorage.getItem("high-score").toString());

Game.style.display = "initial";
GameInput.focus();

var LastInputtedNumbers = "";

GameInput.addEventListener("keyup", event => {
    const isDigit = /[0-9\.]/.test(event.key);
    if (!isDigit) {
        GameInput.value = "";
        return;
    }
    if (HintText.style.display != "none")
        HintText.style.display = "none";
    let inputted = GameInput.value;
    GameInput.value = "";
    let curIndex = LastInputtedNumbers.length
    let isRight = CheckDigit(inputted, curIndex);
    if (isRight) {
        LastInputtedNumbers += inputted;
        PreviouslyInputted.innerText = LastInputtedNumbers.toString();
        return;
    }
    var currentHighScore = localStorage.getItem("high-score");
    if (localStorage.getItem("high-score") === null || parseInt(currentHighScore) < curIndex) {
        localStorage.setItem("high-score", curIndex.toString());
        document.querySelector("#new-high-score").style.display = "inline-block";
    }
    GenerateFailScreen(inputted, curIndex);
});

document.querySelector("#reset-game").addEventListener("click", resetGame)


/**
 * Appends a `Can you beat your high score of ___?` to the __To start__ text
 * @param {string | number} highScore 
 */
function CanBeatHSQuestionGen(highScore) {
    CanBeatHS.innerText = `Can you beat your high score of ${highScore}?`;
}

/**
 * Fully restarts the game
 */
function resetGame() {
    LastInputtedNumbers = "";
    PreviouslyInputted.innerText = "";
    HintText.style.display = "block";
    ResetScreen.style.display = "none";
    Game.style.display = "initial";
    CanBeatHSQuestionGen(localStorage.getItem("high-score"));
}

/**
 * 
 * @param {string} inputtedDigit 
 * @param {number} currentDigit 
 */
function CheckDigit(inputtedDigit, currentDigit) {
    return Pi[currentDigit] == inputtedDigit;
}

/**
 * 
 * @param {string} inputtedDigit 
 * @param {number} currentDigit 
 */
function GenerateFailScreen(inputtedDigit, currentDigit) {
    document.querySelector("#got-to-num").innerText = currentDigit.toString();
    document.querySelector("#final-inputted-digit").innerText = inputtedDigit;
    document.querySelector("#actual-digit").innerText = Pi[currentDigit];
    ResetScreen.style.display = "initial";
    Game.style.display = "none";
}

})()