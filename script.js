const randNum = (min, max) => (Math.floor(Math.random() * (max - min + 1)) + min);
const pad = document.querySelector(".pad ");
const toggleGrid = document.querySelector(".toggle-grid-gap");
const reset = document.querySelector(".reset");
const button2s = document.querySelectorAll(".button2");

for (let button2 of button2s) {
    button2.addEventListener("click", () => {
        for (let button2 of button2s) {
            button2.classList.remove("selected");
        }
        button2.classList.toggle('selected');
    })
}

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

toggleGrid.addEventListener('click', () => {
    gridToggle();
    toggleGrid.classList.toggle('selected');
});

reset.addEventListener("click", eraseAll);

let isDrawing = false;

window.addEventListener('mousedown', () => {
    isDrawing = true;
})
window.addEventListener('mouseup', () => {
    isDrawing = false;
})


let color = "rainbow";
const blackColor = document.querySelector(".black");
const rainbowColor = document.querySelector(".rainbow");
const picker = document.querySelector(".picker");
const eraser = document.querySelector(".eraser");
const customColor = document.querySelector(".picked-color");

blackColor.addEventListener("click", () => {
    color = "black";
})
rainbowColor.addEventListener("click", () => {
    color = "rainbow";
})
picker.addEventListener("click", () => {
    color = "custom";
})
eraser.addEventListener("click", () => {
    color = "eraser";
    eraser.classList.toggle('selected');
})

function setGrid(grid) {
    pad.style.cssText = `grid-template: repeat(${grid}, 1fr) / repeat(${grid}, 1fr)`;
    for (let i = 1; i <= grid * grid; i++) {
        const div = document.createElement('div');
        div.classList.add('grid');
        pad.appendChild(div);
        div.addEventListener('mouseover', () => {
            if (isDrawing) {
                switch (color) {
                    case "rainbow":
                        rainbow(div);
                        break;
                    case "black":
                        black(div);
                        break;
                    case "custom":
                        custom(div);
                        break;
                    case "eraser":
                        erase(div);
                }
            }

        })
    }
}

function rainbow(div) {
    const r = randNum(0, 255);
    const g = randNum(0, 255);
    const b = randNum(0, 255);
    div.style.backgroundColor = `rgb(${r},${g},${b})`
}

function black(div) {
    div.style.backgroundColor = "black";
}

function custom(div) {
    div.style.backgroundColor = customColor.value;
}

function erase(div) {
    div.style.backgroundColor = "white";
}

function eraseAll() {
    const divs = pad.querySelectorAll("div");
    for (let div of divs) {
        div.style.backgroundColor = "white";
    }
}

function gridToggle() {
    pad.classList.toggle('grid-gap');
}