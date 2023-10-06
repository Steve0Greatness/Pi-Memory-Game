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
    GenerateFailScreen(inputted, curIndex);
});

document.querySelector("#reset-game").addEventListener("click", resetGame)

/**
 * Fully restarts the game
 */
function resetGame() {
    LastInputtedNumbers = "";
    PreviouslyInputted.innerText = "";
    HintText.style.display = "block";
    ResetScreen.style.display = "none";
    Game.style.display = "initial";
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