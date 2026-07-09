// These functions perform basic mathematical operations
function addition(num1, num2) {
  return +num1 + +num2;
}
function subtraction(num1, num2) {
  return num1 - num2;
}
function multiplication(num1, num2) {
  return num1 * num2;
}
function division(num1, num2) {
  return num1 / num2;
}
function exponent(num1, num2) {
  return num1 ** num2;
}

// This function calls the calculation function based on the given operator
function operate(num1, num2, op) {
  if (op === "+") return addition(num1, num2);
  if (op === "−") return subtraction(num1, num2);
  if (op === "×") return multiplication(num1, num2);
  if (op === "÷") return division(num1, num2);
  if (op === "xy") return exponent(num1, num2);
}

// This function limits the number of digits
function round(result) {
  if ((result < Number.MIN_SAFE_INTEGER) ||
    (Number.MAX_SAFE_INTEGER < result) || Number.isNaN(result)) {
    return "Out of range!";
  
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

  if ((targetBtn.id === "all-clear") ||
    (display.textContent === "Out of range!")) {
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
      display.textContent = num1;
    }    

  // The actions to take when there is only num1 has a value
  } else if (num1 && !(op || num2)) {
    if ((targetBtn.className === "digit") && (num1.length < 16)) {
      if (+num1) {
        num1 += targetBtn.textContent;
      } else {
        num1 = targetBtn.textContent;
      }
      display.textContent = num1;
    }

    if ((targetBtn.id === "point") &&
      !num1.includes(".") && (num1.length < 16)) {
      num1 += targetBtn.textContent;
      display.textContent = num1;
    }

    if (targetBtn.id === "sign-toggle") {
      if (num1[0] === "-") {
        num1 = num1.slice(1);
      } else {
        num1 = "-" + num1.slice();
      }
      display.textContent = num1;
    }

    if (targetBtn.id === "backspace") {
      num1 = num1.slice(0, num1.length - 1);
      display.textContent = num1;
    }

    if (targetBtn.className === "operator") {
      op = targetBtn.textContent;
    }

  // The actions to take when there are num1 and op have values
  } else if (num1 && op && !num2) {
    if (targetBtn.className === "digit") {
      num2 = targetBtn.textContent;
      display.textContent = num2;
    }

    if (targetBtn.className === "operator") {
      op = targetBtn.textContent;
    }

    if (targetBtn.id === "calculate") {
      num2 = num1;
      result = operate(num1, num2, op);
      num1 = round(result);
      display.textContent = num1;
      equals = true;
    }

  // The actions to take when all calculating variables have values
  } else if (num1 && op && num2) {
    if (targetBtn.className === "digit") {
      if (equals) {
        num1 = targetBtn.textContent;
        display.textContent = num1;
        op = null;
        num2 = null;
        result = null;
        equals = false;
      } else if (num2.length < 16) {
        if (+num2) {
          num2 += targetBtn.textContent;
        } else {
          num2 = targetBtn.textContent;
        }
        display.textContent = num2;
      }
    }

    if ((targetBtn.id === "point") && !equals &&
      !num2.includes(".") && (num2.length < 16)) {
      num2 += targetBtn.textContent;
      display.textContent = num2;
    }

    if ((targetBtn.id === "sign-toggle") && !equals) {
      if (num2[0] === "-") {
        num2 = num2.slice(1);
      } else {
        num2 = "-" + num2.slice();
      }
      display.textContent = num2;
    }

    if ((targetBtn.id === "backspace") && !equals) {
      num2 = num2.slice(0, num2.length - 1);
      display.textContent = num2;
    }

    if (targetBtn.className === "operator") {
      if (equals) {
        op = targetBtn.textContent;
        num2 = null;
        result = null;
        equals = false;
      } else {
        result = operate(num1, num2, op);
        num1 = round(result);
        display.textContent = num1;
        op = targetBtn.textContent;
        num2 = null;
      } 
    }

    if (targetBtn.id === "calculate") {
      result = operate(num1, num2, op);
      num1 = round(result);
      display.textContent = num1;
      equals = true;
    }
  }
  
  console.log(num1, op, num2, result, equals);
});
