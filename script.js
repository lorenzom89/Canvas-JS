let currentColor = 'black';
let drawing = false;
let cursorX = 0;
let cursorY = 0;

let screen = document.querySelector('#tela');
let context = screen.getContext('2d');

document.querySelector('#colorpicker').addEventListener('change', colorChange)
screen.addEventListener('mousedown', onPress);
screen.addEventListener('mousemove', onMove);
screen.addEventListener('mouseup', onRelease);
document.querySelector('.clear').addEventListener('click', clearScreen)

function colorChange(e) {
    let color = document.querySelector('#colorpicker').value;
    currentColor = color;
}


function onPress(e) {
    drawing = true;
    cursorX = e.pageX - screen.offsetLeft;
    cursorY = e.pageY - screen.offsetTop;
    colorChange();
}

function onMove(e) {
    if (drawing) {
        draw(e.pageX, e.pageY);
    }
}

function onRelease() {
    drawing = false;
}

function draw(posX, posY) {
    let x = posX - screen.offsetLeft;
    let y = posY - screen.offsetTop;

    context.beginPath();
    context.lineWidth = 5;
    context.lineJoin = 'round';
    context.moveTo(cursorX, cursorY);
    context.lineTo(x, y);
    context.closePath();
    context.strokeStyle = currentColor;
    context.stroke();

    cursorX = x;
    cursorY = y;
}

function clearScreen() {
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    document.querySelector('#colorpicker').reset();
    document.querySelector('#colorpicker').value = '#000000'
}