const randNum = (min, max) => (Math.floor(Math.random() * (max - min + 1)) + min);
const pad = document.querySelector(".pad ");
const toggleGrid = document.querySelector(".toggle-grid");
const reset = document.querySelector(".reset");

// slider
const input = document.querySelector("input");
const outputs = document.querySelectorAll("output");
input.addEventListener("input", () => {
    for (let output of outputs) {
        output.innerText = input.value;
    }
})

setGrid(input.value);

input.addEventListener("change", () => {
    while (pad.lastElementChild) {
        pad.removeChild(pad.lastElementChild);
    }
    setGrid(input.value);
})

toggleGrid.addEventListener('click', gridToggle);

reset.addEventListener("click", eraseAll);

let isDrawing = false;
window.addEventListener('mousedown', () => {
    isDrawing = true;
})
window.addEventListener('mouseup', () => {
    isDrawing = false;
})

function setGrid(grid) {
    pad.style.cssText = `grid-template: repeat(${grid}, 1fr) / repeat(${grid}, 1fr)`;
    for (let i = 1; i <= grid * grid; i++) {
        const div = document.createElement('div');
        div.classList.add('grid');
        div.classList.add('grid-border');
        pad.appendChild(div);

        div.addEventListener('mouseover', () => {
            if (isDrawing) {
                const r = randNum(0, 255);
                const g = randNum(0, 255);
                const b = randNum(0, 255);
                div.style.backgroundColor = `rgb(${r},${g},${b})`
            }
        })
    }
}



function eraseAll() {
    const divs = pad.querySelectorAll("div");
    for (let div of divs) {
        div.style.backgroundColor = "white";
    }
}

function gridToggle() {
    const divs = pad.querySelectorAll("div");
    for (let div of divs) {
        div.classList.toggle('grid-border');
    }
}