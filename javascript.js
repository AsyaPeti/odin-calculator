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

// These are the variables for the buttons that can be pressed with the keyboard
let allClearBtn = buttons.querySelector("#all-clear");
let backspaceBtn = buttons.querySelector("#backspace");
let exponentBtn = buttons.querySelector("#exponent");
let divisionBtn = buttons.querySelector("#division");
let sevenBtn = buttons.querySelector("#seven");
let eightBtn = buttons.querySelector("#eight");
let nineBtn = buttons.querySelector("#nine");
let multiplicationBtn = buttons.querySelector("#multiplication");
let fourBtn = buttons.querySelector("#four");
let fiveBtn = buttons.querySelector("#five");
let sixBtn = buttons.querySelector("#six");
let subtractionBtn = buttons.querySelector("#subtraction");
let oneBtn = buttons.querySelector("#one");
let twoBtn = buttons.querySelector("#two");
let threeBtn = buttons.querySelector("#three");
let additionBtn = buttons.querySelector("#addition");
let signToggleBtn = buttons.querySelector("#sign-toggle");
let zeroBtn = buttons.querySelector("#zero");
let pointBtn = buttons.querySelector("#point");
let calculateBtn = buttons.querySelector("#calculate");

// This event mimics the action of clicking a button
let clickEvent = new Event("click", { bubbles: true });

// This event listener tracks which keys are pressed on the keyboard
window.addEventListener("keydown", (event) => {
  let targetKey = event.key;
  console.log(targetKey);
  if (targetKey === "C") allClearBtn.dispatchEvent(clickEvent);
  if (targetKey === "Backspace") backspaceBtn.dispatchEvent(clickEvent);
  if (targetKey === "^") exponentBtn.dispatchEvent(clickEvent);
  if (targetKey === "/") divisionBtn.dispatchEvent(clickEvent);
  if (targetKey === "7") sevenBtn.dispatchEvent(clickEvent);
  if (targetKey === "8") eightBtn.dispatchEvent(clickEvent);
  if (targetKey === "9") nineBtn.dispatchEvent(clickEvent);
  if (targetKey === "*") multiplicationBtn.dispatchEvent(clickEvent);
  if (targetKey === "4") fourBtn.dispatchEvent(clickEvent);
  if (targetKey === "5") fiveBtn.dispatchEvent(clickEvent);
  if (targetKey === "6") sixBtn.dispatchEvent(clickEvent);
  if (targetKey === "-") subtractionBtn.dispatchEvent(clickEvent);
  if (targetKey === "1") oneBtn.dispatchEvent(clickEvent);
  if (targetKey === "2") twoBtn.dispatchEvent(clickEvent);
  if (targetKey === "3") threeBtn.dispatchEvent(clickEvent);
  if (targetKey === "+") additionBtn.dispatchEvent(clickEvent);
  if (targetKey === "~") signToggleBtn.dispatchEvent(clickEvent);
  if (targetKey === "0") zeroBtn.dispatchEvent(clickEvent);
  if (targetKey === ".") pointBtn.dispatchEvent(clickEvent);
  if (targetKey === "=" || targetKey === "Enter")
    calculateBtn.dispatchEvent(clickEvent);
});

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
});

// This event is for the manual button that shows or hides the manual
let manualTxt = document.querySelector("#manual-text");
let manualBtn = document.querySelector("#manual-toggle");

manualBtn.addEventListener("click", () => {
  manualTxt.classList.toggle("hidden");
});
