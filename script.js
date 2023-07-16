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

// Add Event Listeners on Equal, Clear, Delete, Remainder and Decimal Buttons
equalButton.addEventListener("click", evaluate);
allClearButton.addEventListener("click", allClear);
deleteButton.addEventListener("click", backSpace);
decimalButton.addEventListener("click", appendDecimal);

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
  if (currentOperationScreen.textContent === "" || shouldReset) resetScreen();
  if (currentOperationScreen.textContent.length > 19)
    return; // Limits the amount of input text to 19 characters
  else {
    currentOperationScreen.textContent += number;
  }
}

function continueOperation(operation) {
  if (currentOperation !== null) evaluate(); // evaluates the existing operation
  firstNumber = currentOperationScreen.textContent;
  currentOperation = operation;
  previousOperationScreen.textContent = `${firstNumber} ${currentOperation} `;
  shouldReset = true; // allows overwriting of the existing screen
}

// Other Buttons Clear, Delete, Decimal Buttons

function allClear() {
  firstNumber = "";
  secondNumber = "";
  currentOperation = null; // Designates whether an operation can be added or not
  currentOperationScreen.textContent = ""; // \xa0 represents a non breaking space in JavaScript
  previousOperationScreen.textContent = 0;
}

function backSpace() {
  if ((currentOperationScreen.textContent = "")) return;
  else {
    return currentOperationScreen.textContent.toString().slice(0, -1);
  }
}

function appendDecimal() {
  if (currentOperationScreen.textContent.includes("."))
    return; // ensures one decimal point at a time
  else {
    currentOperationScreen.textContent += ".";
  }
}

// Operator Functions

function resetScreen() {
  currentOperationScreen.textContent = "";
  shouldReset = false;
}

function evaluate() {
  if (currentOperation === null || shouldReset) return;
  if (currentOperation === "÷" && currentOperationScreen.textContent === "0") {
    currentOperationScreen.textContent = "Cannot be divided by zero"; //
    shouldReset = true;
  } else {
    secondNumber = currentOperationScreen.textContent;
    currentOperationScreen.textContent = roundNumber(
      operate(firstNumber, secondNumber, currentOperation)
    );
    previousOperationScreen.textContent = `${firstNumber} ${currentOperation} ${secondNumber} =`;
    currentOperation = null;
  }
}

function roundNumber(number) {
  Math.round((number * 1000) / 1000); // ensures accuracy when multiplying or dividing in JS
}

function operate(x, y, operator) {
  x = Number(x);
  y = Number(y);
  switch (operator) {
    case "+":
      return add(x, y);
    case "-":
      return subtract(x, y);
    case "x":
      return multiply(x, y);
    case "÷":
      return divide(x, y);
    case "%":
      return remainder(x, y);
    default:
      return null;
  }
}

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

function remainder(x, y) {
  return x % y;
}

// Add window events
window.addEventListener("keydown", controlKeyboardInput);

function controlKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === ".") appendDecimal();
  if (e.key === "=" || e.key === "Enter") evaluate();
  if (e.key === "Escape") allClear();
  if (e.key === "Backspace") backSpace();
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    continueOperation(OperationKeyboardConvert(e.key));
  }
}

function OperationKeyboardConvert(keyboardOperator) {
  switch (keyboardOperator) {
    case "+":
      return "+";
    case "-":
      return "-";
    case "*":
      return "x";
    case "/":
      return "÷";
  }
}
