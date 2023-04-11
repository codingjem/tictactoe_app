const board = document.querySelector("#board");
const info = document.querySelector("#info");

const boxes = ["", "", "", "", "", "", "", "", ""];

let player = "circle";
info.textContent = "It's Now Circle's Turn!";

function createBoard() {
    boxes.forEach((cell, index) => {
        const box = document.createElement("div");
        box.classList.add("square");
        box.id = index;
        board.append(box);
    });
}
createBoard();
