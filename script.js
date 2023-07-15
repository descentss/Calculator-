let firstNumber = "";
let secondNumber = "";
let currentOperation = null;
let shouldReset = false;

// Assigning a variable to each Calculator Button
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const equalButton = document.getElementById("equalBtn");
const allClearButton = document.getElementById("allClearBtn");
const deleteButton = document.getElementById("deleteBtn");
const decimalButton = document.getElementById("decimalBtn");
const previousOperationScreen = document.querySelector(".screen-previous");
const currentOperationScreen = document.querySelector(".screen-current");

// Add Event Listeners on Equal, Clear, Delete and Decimal Buttons
// equalButton.addEventListener("click", );
allClearButton.addEventListener("click", allClear);
// deleteButton.addEventListener("click", delete);
// decimalButton.addEventListener("click", appendDecimal);

// Number and Operator Buttons Functions
// Add Event Listeners for Number Buttons
numberButtons.forEach((button) =>
  button.addEventListener("click", () => appendNumber(button.textContent))
);

// Add Event Listeners for Operator Buttons
operatorButtons.forEach((button) =>
  button.addEventListener("click", () => continueOperation(button.textContent))
);

function appendNumber(number) {
  if (currentOperationScreen.textContent === "\xa0" || shouldReset)
    resetScreen();
  currentOperationScreen.textContent += number;
}

function continueOperation(operation) {
  firstNumber = currentOperationScreen.textContent;
  currentOperation = operation;
  currentOperationScreen.textContent = `${firstNumber} ${currentOperation}`;
}

// Other Buttons Clear, Delete, Decimal Buttons

function allClear() {
  firstNumber = "";
  secondNumber = "";
  currentOperation = null;
  currentOperationScreen.textContent = "\xa0"; // \xa0 represents a non breaking space in JavaScript
  lastOperationScreen.textContent = 0;
}

function resetScreen() {
  currentOperationScreen.textContent = "";
  shouldReset = false;
}

// Operator Functions
function evaluate(firstOperand, secondOperand, currentOperator) {
  firstOperand = Number(firstNumber);
  secondOperand = Number(secondNumber);
  currentOperator = currentOperation;
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "×":
      return multiply(a, b);
    case "÷":
      return divide(a, b);
  }
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}
