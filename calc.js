const display = document.getElementById('display');
const digitButtons = document.getElementsByClassName('digit');
const opButtons = document.getElementsByClassName('op');
document.getElementById('AC').addEventListener('click', clear);
document.getElementById('eq').addEventListener('click', calculate)
const ops = ['+', '-', '*', '/'];
let displayVal = '';
let calculation = '';
display.textContent = displayVal;

function add(a, b) {
    return round(a+b);
}
function sub(a, b) {
    return round(a-b);
}
function mult(a, b) {
    return round(a*b);
}
function div(a, b) {
    return round(a/b);
}
function operate(a, b, op) {
    switch (op) {
        case '+': return String(add(a, b));
        case '-': return String(sub(a, b));
        case '*': return String(mult(a, b));
        case '/': return String(div(a, b));
    }
}
function round(n) {
    return Math.round(n*100000000000)/100000000000;
}
function clear() {
    displayVal = '';
    calculation = '';
    display.textContent = displayVal;
}
function opToSym(op) {
    switch (op) {
        case 'add': return '+';
        case 'sub': return '-';
        case 'mult': return '*';
        case 'div': return '/';
    }
}
function digitPress() {
    if (calculation[calculation.length-1] >= '0' && calculation[calculation.length-1] <= '9' || calculation == ''){
        displayVal += this.id; 
    }
    else {
        displayVal = '';
        displayVal += this.id;
    }
    calculation += this.id;
    display.textContent = displayVal;
}
function calculate() {
    if (checkCalc(calculation)) {
        if (calculation.indexOf('/0')>-1) {
            displayVal = 'NOT ALLOWED';
            calculation = '';
            display.textContent = displayVal;
        }
        else {
            let op = '+';
            for (let i = 0; i < ops.length; i++) {
                if (calculation.indexOf(ops[i]) > -1) op = ops[i];
            }
            let nums = calculation.split(op);
            result = operate(Number(nums[0]), Number(nums[1]), op);
            displayVal = result;
            display.textContent = displayVal;
            calculation = result;
        }
    }
}
function checkCalc(calculation) {
    for (let i=0; i < ops.length; i++) {
        if(calculation.indexOf(ops[i]) > -1 && calculation.indexOf(ops[i]) < calculation.length-1) return true;
    }
    return false;
}
function opPress() {
    displayVal = '';
    display.textContent = displayVal;
    calculate();
    if (calculation[calculation.length-1] >= '0' && calculation[calculation.length-1] <= '9'){
        calculation += opToSym(this.id);
    }
    else if (calculation != ''){
        calculation = calculation.slice(0,calculation.length-1) + opToSym(this.id);
    }
}

for(let i=0; i<digitButtons.length; i++) {
    digitButtons[i].addEventListener('click', digitPress);
}
for(let i=0; i<opButtons.length; i++) {
    opButtons[i].addEventListener('click', opPress);
}