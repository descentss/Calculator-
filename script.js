"use strict";

function operate(firstNumber, operator, secondNumber) {
  switch (operator) {
    case "+":
      return firstNumber + secondNumber;
      break;
    case "-":
      return firstNumber - secondNumber;
      break;
    case "*":
      return firstNumber * secondNumber;
      break;
    case "/":
      return firstNumber / secondNumber;
      break;
    default:
      alert("Invalid output");
  }
}
