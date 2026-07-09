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

// This function limits the number of digits
function round(result) {
  if ((result < Number.MIN_SAFE_INTEGER) ||
    (Number.MAX_SAFE_INTEGER < result)) {
    return "Error!";
  
  } else if (String(Math.abs(result)).length > 16) {
      const dec = 16 - 1 - String(Math.abs(Math.trunc(result))).length;
      if (dec > 0) {
        return String(parseFloat(result.toFixed(dec)));
      } else {
        return String(Math.round(result));
      }

  } else {
    return String(parseFloat(result.toFixed(14)));
  }
}

// These are the variables that will be used in the calculations
let num1;
let num2;
let op;
let result;
let equals = false;

// This is the variable for the display
let display = document.querySelector("#display");

// This variable is for all buttons
const buttons = document.querySelector("#buttons");

// This event listener monitors the buttons of the calculator
buttons.addEventListener("click", (event) => {
  let targetBtn = event.target;

  if ((targetBtn.id === "all-clear") || (display.textContent === "Error!")) {
      num1 = null;
      op = null;
      num2 = null;
      display.textContent = "";
      result = null;
      equals = false;
  
  // The actions to take when there is no values of calculating variables
  } else if (!(num1)) {
    if (targetBtn.className === "digit") {
      num1 = targetBtn.textContent;
      display.textContent = targetBtn.textContent;
    }    

  // The actions to take when there is only num1 has a value
  } else if (num1 && !(op || num2)) {
    if ((targetBtn.className === "digit") && (num1.length < 16)) {
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
      num1 = round(result);
      display.textContent = round(result);
      equals = true;
    }

  // The actions to take when all calculating variables have values
  } else if (num1 && op && num2) {
    if ((targetBtn.className === "digit") && (num2.length < 16)) {
      if (+num2) {
        num2 += targetBtn.textContent;
        display.textContent += targetBtn.textContent;
      } else {
        num2 = targetBtn.textContent;
        display.textContent = targetBtn.textContent;
      }
    }

    if (targetBtn.className === "operator") {
      if (equals) {
        op = targetBtn.textContent;
        num2 = null;
        equals = false;
      } else {
        result = operate(num1, num2, op);
        num1 = round(result);
        display.textContent = round(result);
        op = targetBtn.textContent;
        num2 = null;
      }
      
    }

    if (targetBtn.id === "calculate") {
      result = operate(num1, num2, op);
      num1 = round(result);
      display.textContent = round(result);
      equals = true;
    }
  }
  
  console.log(num1, op, num2, result, equals);
});
