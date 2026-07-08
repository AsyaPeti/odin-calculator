// This function adds two numbers together
function addition(num1, num2) {
  return +num1 + +num2;
}

// This function subtracts the second number from the first
function subtraction(num1, num2) {
  return +num1 - +num2;
}

// This function multiplies two numbers
function multiplication(num1, num2) {
  return +num1 * +num2;
}

// This function divides the first number by the second
function division(num1, num2) {
  return +num1 / +num2;
}

// This function calls the calculation function based on the given operator
function operate(num1, num2, op) {
  if (op === "+") return addition(num1, num2);
  if (op === "−") return subtraction(num1, num2);
  if (op === "×") return multiplication(num1, num2);
  if (op === "÷") return division(num1, num2);
}

// These are the variables that will be used in the calculations
let num1;
let num2;
let op;
let result;

// This is the variable for the display
let display = document.querySelector("#display");

// This variable is for all buttons
const buttons = document.querySelector("#buttons");

// This event listener monitors the buttons of the calculator
buttons.addEventListener("click", (event) => {
  let targetBtn = event.target;

  // The actions to take when there is no values of calculating variables
  if (!(num1 || op || num2)) {
    if (targetBtn.className === "digit") {
      num1 = targetBtn.textContent;
      display.textContent = targetBtn.textContent;
    }

  // The actions to take when there is only num1 has a value
  } else if (num1 && !(op || num2)) {
    if (targetBtn.className === "digit") {
      if (+num1) {
      num1 += targetBtn.textContent;
      display.textContent += targetBtn.textContent;
      } else {
        num1 = targetBtn.textContent;
        display.textContent = targetBtn.textContent;
      }
    }

    if (targetBtn.className === "operator") {
      op = targetBtn.textContent;
    }

    if (targetBtn.id === "all-clear") {
      num1 = null;
      display.textContent = "";
    }

  // The actions to take when there are num1 and op have values
  } else if (num1 && op && !num2) {
    if (targetBtn.className === "digit") {
      num2 = targetBtn.textContent;
      display.textContent = targetBtn.textContent;
    }

    if (targetBtn.className === "operator") {
      op = targetBtn.textContent;
    }

    if (targetBtn.id === "calculate") {
      num2 = num1;
      result = operate(num1, num2, op);
      num1 = result;
      display.textContent = result;
    }

    if (targetBtn.id === "all-clear") {
      num1 = null;
      op = null;
      display.textContent = "";
      result = null;
    }

  // The actions to take when all calculating variables have values
  } else if (num1 && op && num2) {
    if (targetBtn.className === "digit") {
      if (+num2) {
        num2 += targetBtn.textContent;
        display.textContent += targetBtn.textContent;
      } else {
        num2 = targetBtn.textContent;
        display.textContent = targetBtn.textContent;
      }
    }

    if (targetBtn.className === "operator") {
      if (result == null || result == undefined) {
        result = operate(num1, num2, op);
        num1 = result;
        display.textContent = result;
        result = null;
      }
        op = targetBtn.textContent;
        num2 = null;
    }

    if (targetBtn.id === "calculate") {
      result = operate(num1, num2, op);
      num1 = result;
      display.textContent = result;
    }

    if (targetBtn.id === "all-clear") {
      num1 = null;
      op = null;
      num2 = null;
      display.textContent = "";
      result = null;
    }
  }
});
