function calculate(a, b, op, log = false) {
    let result;

    switch(op) {
        case '+': result = a + b; break;
        case '-': result = a - b; break;
        case '*': result = a * b; break;
        case '/': result = b !== 0 ? a / b : 'Undefined'; break;
        default: result = 'Invalid'; break;
    }

    if (log) {
        console.log(`Calculated: ${a} ${op} ${b} = ${result}`);
    }

    return result;
}

let a = parseFloat(prompt("Enter first number:"));
let b = parseFloat(prompt("Enter second number:"));
let op = prompt("Enter operation (+ - * /):");

// Optional variable usage
let logResult = confirm("Do you want to log the result to console?");
alert("Result: " + calculate(a, b, op, logResult));
