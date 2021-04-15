const randNum = (min, max) => (Math.floor(Math.random() * (max - min + 1)) + min);
const pad = document.querySelector(".pad ");
const toggleGrid = document.querySelector(".toggle-grid-gap");
const reset = document.querySelector(".reset");
const button2s = document.querySelectorAll(".button2");
const input = document.querySelector("input");
const outputs = document.querySelectorAll("output");
const blackColor = document.querySelector(".black");
const rainbowColor = document.querySelector(".rainbow");
const picker = document.querySelector(".picker");
const eraser = document.querySelector(".eraser");
const customColor = document.querySelector(".picked-color");
const backColor = document.querySelector(".background-color");
const backColorPicker = document.querySelector(".background-color-picker");
const span = document.querySelector("span");

for (let button2 of button2s) {
    button2.addEventListener("click", () => {
        for (let button2 of button2s) {
            button2.classList.remove("selected");
        }
        button2.classList.toggle('selected');
    })
}

// slider

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
});


let color = "rainbow";


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
})



function setGrid(grid) {
    pad.style.cssText = `grid-template: repeat(${grid}, 1fr) / repeat(${grid}, 1fr)`;
    let bC = backColor.value;
    for (let i = 1; i <= grid * grid; i++) {
        const div = document.createElement('div');
        // div.classList.add('grid');
        div.style.backgroundColor = bC;
        pad.appendChild(div);
        div.addEventListener('mouseover', () => {
            if (isDrawing) chooseBrush(div)
        })
        div.addEventListener('mousedown', () => { chooseBrush(div) });
    }
}

function chooseBrush(div) {
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
    div.style.backgroundColor = backColor.value;
}

function eraseAll() {
    const divs = pad.querySelectorAll("div");
    for (let div of divs) {
        div.style.backgroundColor = backColor.value;
    }
}

backColor.addEventListener("change", () => {
    span.innerText = "Click to change";
    const { r, g, b } = hexToRgb(backColor.value);
    if ((r + g + b) < 383) {
        span.style.color = "white";
    } else {
        span.style.color = "black";
    }
    backColorPicker.style.backgroundColor = backColor.value;
})

backColorPicker.addEventListener("click", changeBackColor);

function changeBackColor() {
    const divs = pad.querySelectorAll("div");
    backColorPicker.style.backgroundColor = "";
    span.innerText = "BG Color: ";
    span.style.fontSize = "inherit";
    span.style.color = "inherit";
    for (let div of divs) {
        div.style.backgroundColor = backColor.value;
    }
}

function gridToggle() {
    pad.classList.toggle('grid-gap');
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}