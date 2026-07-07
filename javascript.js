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
  if (op === "-") return subtraction(num1, num2);
  if (op === "*") return multiplication(num1, num2);
  if (op === "/") return division(num1, num2);
}

// These are the variables that will be used in the calculations
let num1;
let num2;
let op;
