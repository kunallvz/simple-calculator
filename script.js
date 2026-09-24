let display = document.getElementById('display');
let currentInput = '0';
let previousInput = '';
let operation = null;
let shouldResetDisplay = false;

function appendNumber(number) {
    if (shouldResetDisplay) {
        currentInput = number === '.' ? '0.' : number;
        shouldResetDisplay = false;
    } else if (number === '.') {
        if (currentInput.includes('.')) {
            return;
        }
        currentInput = currentInput === '' ? '0.' : currentInput + '.';
    } else {
        if (currentInput === '0') {
            currentInput = number;
        } else {
            currentInput += number;
        }
    }

    updateDisplay();
}

function appendOperator(op) {
    if (operation !== null && !shouldResetDisplay) {
        calculateResult();
    }
    previousInput = currentInput;
    operation = op;
    shouldResetDisplay = true;
}

function calculateResult() {
    if (operation === null || shouldResetDisplay) {
        return;
    }

    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('Cannot divide by zero!');
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = Number.isInteger(result) ? result.toString() : result.toFixed(10).replace(/\.0+$|(?<=\.[0-9]*?)0+$/g, '').replace(/\.$/, '');
    operation = null;
    shouldResetDisplay = true;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteLast() {
    if (shouldResetDisplay) {
        currentInput = previousInput || '0';
        shouldResetDisplay = false;
    } else if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
        if (currentInput === '-0') {
            currentInput = '0';
        }
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

function updateDisplay() {
    display.value = currentInput;
}

window.addEventListener('keydown', (event) => {
    if (/^[0-9]$/.test(event.key)) {
        appendNumber(event.key);
    } else if (event.key === '.') {
        appendNumber('.');
    } else if (['+', '-', '*', '/'].includes(event.key)) {
        appendOperator(event.key);
    } else if (event.key === 'Enter' || event.key === '=') {
        calculateResult();
    } else if (event.key === 'Backspace') {
        deleteLast();
    } else if (event.key === 'Escape') {
        clearDisplay();
    }
});

updateDisplay();
