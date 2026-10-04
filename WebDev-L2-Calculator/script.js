"use strict";

/*
    NovaCalc
    Level 2 Calculator

    Important:
    - No eval()
    - Uses addEventListener()
    - Uses switch statements
    - Uses parseFloat()
*/


// =========================================
// DOM ELEMENTS
// =========================================

const resultDisplay = document.getElementById("result");
const expressionDisplay = document.getElementById("expression");

const calculationCount = document.getElementById("calculation-count");

const historyList = document.getElementById("history-list");
const emptyHistory = document.getElementById("empty-history");

const clearHistoryButton =
    document.getElementById("clear-history");

const calculator =
    document.getElementById("calculator");

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toast-message");


// =========================================
// CALCULATOR STATE
// =========================================

let currentInput = "0";
let previousInput = "";

let selectedOperation = null;

let shouldResetDisplay = false;
let errorState = false;

let calculationTotal = 0;

let history = [];

let toastTimer = null;


// =========================================
// OPERATOR SYMBOLS
// =========================================

const operatorSymbols = {
    "+": "+",
    "-": "−",
    "*": "×",
    "/": "÷",
    "%": "%"
};


// =========================================
// FORMAT NUMBER
// =========================================

function formatNumber(value) {

    const number = Number(value);

    if (!Number.isFinite(number)) {
        return String(value);
    }

    if (Number.isInteger(number)) {
        return number.toLocaleString("en-US");
    }

    return number.toLocaleString("en-US", {
        maximumFractionDigits: 10
    });
}


// =========================================
// UPDATE DISPLAY
// =========================================

function updateDisplay() {

    resultDisplay.textContent =
        formatNumber(currentInput);

    if (previousInput && selectedOperation) {

        expressionDisplay.textContent =
            `${formatNumber(previousInput)}
             ${operatorSymbols[selectedOperation]}`;

    } else if (!previousInput && !selectedOperation) {

        if (!errorState) {
            expressionDisplay.textContent = "Ready";
        }
    }

    resultDisplay.classList.remove("pop");

    // Restart animation
    void resultDisplay.offsetWidth;

    resultDisplay.classList.add("pop");
}


// =========================================
// CLEAR CALCULATOR
// =========================================

function clearCalculator() {

    currentInput = "0";
    previousInput = "";

    selectedOperation = null;

    shouldResetDisplay = false;
    errorState = false;

    resultDisplay.classList.remove("error");

    removeActiveOperators();

    expressionDisplay.textContent = "Ready";

    updateDisplay();

    showToast("Calculator cleared");
}


// =========================================
// APPEND NUMBER
// =========================================

function appendNumber(number) {

    if (errorState) {
        clearCalculator();
    }

    if (shouldResetDisplay) {

        currentInput = "0";

        shouldResetDisplay = false;

        removeActiveOperators();
    }


    // Prevent multiple decimals
    if (
        number === "." &&
        currentInput.includes(".")
    ) {
        return;
    }


    // Limit extremely long numbers
    if (
        currentInput.replace(".", "").length >= 15
    ) {
        showToast("Number limit reached");
        return;
    }


    if (
        currentInput === "0" &&
        number !== "."
    ) {
        currentInput = number;

    } else {

        currentInput += number;
    }

    updateDisplay();
}


// =========================================
// DELETE LAST CHARACTER
// =========================================

function deleteLastCharacter() {

    if (errorState) {

        clearCalculator();

        return;
    }

    if (shouldResetDisplay) {
        return;
    }

    if (currentInput.length <= 1) {

        currentInput = "0";

    } else {

        currentInput =
            currentInput.slice(0, -1);
    }

    updateDisplay();

    showToast("Character deleted");
}


// =========================================
// SELECT OPERATION
// =========================================

function chooseOperation(operation) {

    if (errorState) {
        return;
    }


    // If there is already an operation,
    // calculate the previous expression first.
    if (
        selectedOperation !== null &&
        !shouldResetDisplay
    ) {

        calculate(false);
    }


    previousInput = currentInput;

    selectedOperation = operation;

    shouldResetDisplay = true;


    expressionDisplay.textContent =
        `${formatNumber(previousInput)}
         ${operatorSymbols[operation]}`;


    setActiveOperator(operation);
}


// =========================================
// CALCULATE
// =========================================

function calculate(saveToHistory = true) {

    if (
        selectedOperation === null ||
        shouldResetDisplay
    ) {
        return;
    }


    const firstNumber =
        parseFloat(previousInput);

    const secondNumber =
        parseFloat(currentInput);


    if (
        Number.isNaN(firstNumber) ||
        Number.isNaN(secondNumber)
    ) {

        showError("Invalid input");

        return;
    }


    const operation =
        selectedOperation;


    let result;


    switch (operation) {

        case "+":

            result =
                firstNumber + secondNumber;

            break;


        case "-":

            result =
                firstNumber - secondNumber;

            break;


        case "*":

            result =
                firstNumber * secondNumber;

            break;


        case "/":

            if (secondNumber === 0) {

                showError(
                    "Cannot divide by zero"
                );

                return;
            }

            result =
                firstNumber / secondNumber;

            break;


        case "%":

            if (secondNumber === 0) {

                showError(
                    "Cannot divide by zero"
                );

                return;
            }

            result =
                firstNumber % secondNumber;

            break;


        default:

            return;
    }


    // Reduce floating-point noise
    result =
        Number(result.toPrecision(12));


    const expression =
        `${formatNumber(firstNumber)}
         ${operatorSymbols[operation]}
         ${formatNumber(secondNumber)}`;


    currentInput =
        String(result);

    previousInput = "";

    selectedOperation = null;

    shouldResetDisplay = true;

    errorState = false;


    removeActiveOperators();

    resultDisplay.classList.remove("error");

    expressionDisplay.textContent =
        expression;


    updateDisplay();


    if (saveToHistory) {

        addToHistory(
            expression,
            result
        );

        calculationTotal++;

        calculationCount.textContent =
            calculationTotal;

        showToast("Calculation completed");
    }
}


// =========================================
// ERROR
// =========================================

function showError(message) {

    currentInput = message;

    previousInput = "";

    selectedOperation = null;

    shouldResetDisplay = true;

    errorState = true;


    removeActiveOperators();


    resultDisplay.classList.add("error");

    expressionDisplay.textContent =
        "ERROR";


    updateDisplay();

    showToast(message, true);
}


// =========================================
// ACTIVE OPERATOR
// =========================================

function setActiveOperator(operation) {

    removeActiveOperators();

    const button =
        document.querySelector(
            `[data-operation="${operation}"]`
        );

    if (button) {
        button.classList.add("active");
    }
}


function removeActiveOperators() {

    const operators =
        document.querySelectorAll(
            "[data-operation]"
        );

    operators.forEach(function(button) {

        button.classList.remove("active");

    });
}


// =========================================
// HISTORY
// =========================================

function addToHistory(expression, result) {

    const item = {
        expression: expression,
        result: String(result),
        time: new Date()
    };


    history.unshift(item);


    // Keep only latest 12
    if (history.length > 12) {
        history.pop();
    }


    renderHistory();
}


function renderHistory() {

    historyList.innerHTML = "";


    if (history.length === 0) {

        historyList.appendChild(
            createEmptyHistory()
        );

        return;
    }


    history.forEach(function(item) {

        const historyItem =
            document.createElement("div");

        historyItem.className =
            "history-item";


        const expression =
            document.createElement("div");

        expression.className =
            "history-expression";

        expression.textContent =
            item.expression;


        const result =
            document.createElement("div");

        result.className =
            "history-result";

        result.textContent =
            `= ${formatNumber(item.result)}`;


        const time =
            document.createElement("div");

        time.className =
            "history-time";

        time.textContent =
            formatTime(item.time);


        historyItem.appendChild(expression);

        historyItem.appendChild(result);

        historyItem.appendChild(time);


        /*
            Clicking a history result
            loads it into the calculator.
        */
        historyItem.addEventListener(
            "click",
            function() {

                currentInput =
                    item.result;

                previousInput = "";

                selectedOperation = null;

                shouldResetDisplay = true;

                errorState = false;

                resultDisplay.classList.remove(
                    "error"
                );

                expressionDisplay.textContent =
                    item.expression;

                removeActiveOperators();

                updateDisplay();

                showToast(
                    "Result loaded"
                );
            }
        );


        historyList.appendChild(
            historyItem
        );

    });
}


function createEmptyHistory() {

    const empty =
        document.createElement("div");

    empty.className =
        "empty-history";


    empty.innerHTML = `
        <div class="history-icon">⌁</div>
        <h3>No calculations yet</h3>
        <p>Your recent calculations will appear here.</p>
    `;


    return empty;
}


function formatTime(date) {

    return date.toLocaleTimeString(
        [], {
            hour: "2-digit",
            minute: "2-digit"
        }
    );
}


// =========================================
// CLEAR HISTORY
// =========================================

clearHistoryButton.addEventListener(
    "click",
    function() {

        history = [];

        calculationTotal = 0;

        calculationCount.textContent = "0";

        renderHistory();

        showToast(
            "History cleared"
        );
    }
);


// =========================================
// NUMBER BUTTONS
// =========================================

const numberButtons =
    document.querySelectorAll(
        "[data-number]"
    );


numberButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            appendNumber(
                button.dataset.number
            );

        }
    );

});


// =========================================
// OPERATOR BUTTONS
// =========================================

const operationButtons =
    document.querySelectorAll(
        "[data-operation]"
    );


operationButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            chooseOperation(
                button.dataset.operation
            );

        }
    );

});


// =========================================
// ACTION BUTTONS
// =========================================

const clearButton =
    document.querySelector(
        '[data-action="clear"]'
    );


clearButton.addEventListener(
    "click",
    clearCalculator
);


const backspaceButton =
    document.querySelector(
        '[data-action="backspace"]'
    );


backspaceButton.addEventListener(
    "click",
    deleteLastCharacter
);


const equalsButton =
    document.querySelector(
        '[data-action="equals"]'
    );


equalsButton.addEventListener(
    "click",
    function() {

        calculate(true);

    }
);


// =========================================
// KEYBOARD SUPPORT
// =========================================

document.addEventListener(
    "keydown",
    function(event) {

        const key = event.key;


        // Numbers
        if (
            key >= "0" &&
            key <= "9"
        ) {

            appendNumber(key);

            return;
        }


        // Decimal
        if (key === ".") {

            appendNumber(".");

            return;
        }


        // Operators
        if (
            key === "+" ||
            key === "-" ||
            key === "*" ||
            key === "/" ||
            key === "%"
        ) {

            event.preventDefault();

            chooseOperation(key);

            return;
        }


        // Enter
        if (
            key === "Enter" ||
            key === "="
        ) {

            event.preventDefault();

            calculate(true);

            return;
        }


        // Backspace
        if (key === "Backspace") {

            event.preventDefault();

            deleteLastCharacter();

            return;
        }


        // Escape
        if (key === "Escape") {

            clearCalculator();

        }

    }
);


// =========================================
// TOAST
// =========================================

function showToast(message, isError = false) {

    toastMessage.textContent =
        message;


    const icon =
        toast.querySelector(
            ".toast-icon"
        );


    icon.textContent =
        isError ? "!" : "✓";


    icon.style.color =
        isError ?
        "var(--danger)" :
        "var(--success)";


    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(
            function() {

                toast.classList.remove(
                    "show"
                );

            },
            1800
        );
}


// =========================================
// 3D TILT EFFECT
// =========================================

function enableTilt() {

    // Don't use tilt on touch devices
    if (
        window.matchMedia(
            "(pointer: coarse)"
        ).matches
    ) {
        return;
    }


    calculator.addEventListener(
        "mousemove",
        function(event) {

            const rect =
                calculator.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const rotateY =
                ((x - centerX) /
                    centerX) * 2;


            const rotateX = -((y - centerY) /
                centerY) * 2;


            calculator.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-2px)`;

        }
    );


    calculator.addEventListener(
        "mouseleave",
        function() {

            calculator.style.transform =
                "perspective(1000px) rotateX(0deg) rotateY(0deg)";

        }
    );
}


enableTilt();


// =========================================
// INITIAL STATE
// =========================================

renderHistory();

updateDisplay();