const board = document.querySelector("#board");
const info = document.querySelector("#info");
const circleButton = document.querySelector(".circle_btn");
const crossButton = document.querySelector(".cross_btn");

let boardGame = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
];

let player = "circle";
info.textContent = `Choose Player!`;

// alternate Player
function circlePlaying() {
    player = "circle";
    info.textContent = `It's now ${player}'s turn!`;
}
function crossPlaying() {
    player = "cross";
    info.textContent = `It's now ${player}'s turn!`;
}

circleButton.addEventListener("click", circlePlaying);
crossButton.addEventListener("click", crossPlaying);

// prev and next button
const backButton = document.querySelector(".back_btn");
const nextButton = document.querySelector(".next_btn");

let history = [];
let historyCounter = 1;

function prevStep() {
    if (historyCounter < history.length) {
        historyCounter++;
        const array = history[history.length - historyCounter];

        const newArray = array.flat();
        const allSquares = document.querySelectorAll(".square");
        allSquares.forEach((square, index) => {
            const cell = square.firstChild;
            if (cell) {
                cell.className = `${newArray[index]}`;
                console.log(cell.className);
            }
        });
    }
}
function nextStep() {
    if (historyCounter > 1) {
        historyCounter--;
        const array = history[history.length - historyCounter];

        const newArray = array.flat();
        const allSquares = document.querySelectorAll(".square");
        allSquares.forEach((square, index) => {
            const cell = square.firstChild;
            if (cell) {
                cell.className = `${newArray[index]}`;
                console.log(cell.className);
            }
        });
    }
}

backButton.addEventListener("click", prevStep);
nextButton.addEventListener("click", nextStep);

function checkWinner() {
    const allSquares = document.querySelectorAll(".square");
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    let tie = true;

    winningCombos.forEach((array) => {
        const circleWins = array.every((cell) =>
            allSquares[cell].firstChild?.classList.contains("circle")
        );
        const crossWins = array.every((cell) =>
            allSquares[cell].firstChild?.classList.contains("cross")
        );

        if (circleWins) {
            info.textContent = "Circle Wins!";
            allSquares.forEach((square) =>
                square.replaceWith(square.cloneNode(true))
            ); // another way to remove event listeners
            tie = false;

            return;
        }
        if (crossWins) {
            info.textContent = "Cross Wins!";
            allSquares.forEach((square) =>
                square.replaceWith(square.cloneNode(true))
            );
            tie = false;

            return;
        }
    });

    if (tie) {
        let num = 0;
        allSquares.forEach((square) => {
            if (square.firstChild) num++;
        });
        if (num === 9) info.textContent = "It's a Tie!";
    }
}

function setPlayer(e) {
    // disable switch player buttons
    circleButton.removeEventListener("click", circlePlaying);
    crossButton.removeEventListener("click", crossPlaying);

    const playing = document.createElement("div");
    playing.classList.add(player);
    e.target.append(playing);

    console.log(e.target.id);
    const move = boardGame.map((boxes) => {
        return boxes.map((value) => {
            if (e.target.id === String(value)) {
                value = player;
                return value;
            }
            return value;
        });
    });
    boardGame = move;
    history.push(boardGame);
    console.log(history);

    player = player === "circle" ? "cross" : "circle";
    info.textContent = `It's Now ${player}'s Turn!`;
    e.target.removeEventListener("click", setPlayer);

    checkWinner();
}

function startGame() {
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach((square, index) => {
        square.id = index;
        square.addEventListener("click", setPlayer);
    });
}
startGame();

function reset() {
    boardGame = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
    ];

    player = "circle";
    info.textContent = `Choose Player!`;

    circleButton.addEventListener("click", circlePlaying);
    crossButton.addEventListener("click", crossPlaying);

    history = [];
    historyCounter = 1;

    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach((square) => {
        square.firstChild?.remove();
    });

    startGame();
}
