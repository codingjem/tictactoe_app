const board = document.querySelector("#board");
const info = document.querySelector("#info");
const circleButton = document.querySelector(".circle_btn");
const crossButton = document.querySelector(".cross_btn");

const boxes = ["", "", "", "", "", "", "", "", ""];

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

// game function
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

function activePlayer(e) {
    circleButton.removeEventListener("click", circlePlaying);
    crossButton.removeEventListener("click", crossPlaying);

    const playing = document.createElement("div");
    playing.classList.add(player);

    e.target.append(playing);
    player = player === "circle" ? "cross" : "circle";

    info.textContent = `It's Now ${player}'s Turn!`;
    e.target.removeEventListener("click", activePlayer);

    checkWinner();
}

function createBoard() {
    boxes.forEach((cell, index) => {
        const box = document.createElement("div");
        box.classList.add("square");
        box.id = index;
        box.addEventListener("click", activePlayer);

        board.append(box);
    });
}
createBoard();
