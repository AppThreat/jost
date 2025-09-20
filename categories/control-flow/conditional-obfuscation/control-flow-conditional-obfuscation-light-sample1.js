/*
 * Complexity: Simple
 * Techniques: conditional-obfuscation, dead-code
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

// Simple conditional obfuscation
var condition1 = true;
if (condition1) {
    eval('alert("Simple conditional obfuscation");');
} else {
    eval('console.log("Dead code path");');
}

// Complex boolean expression
var a = 5;
var b = 10;
if ((a > 3 && b < 15) || (a < 2 && b > 20)) {
    eval('console.log("Complex boolean expression");');
} else {
    eval('alert("False path");');
}

// Nested conditions
var x = 1;
if (x > 0) {
    if (x < 5) {
        eval('alert("Nested conditions");');
    } else {
        eval('console.log("Inner false path");');
    }
} else {
    eval('console.log("Outer false path");');
}

// Ternary operator obfuscation
var result = (Math.random() > 0.5) ? 'alert("Ternary true")' : 'console.log("Ternary false")';
eval(result);

// Switch statement with conditions
var choice = Math.floor(Math.random() * 3);
switch (choice) {
    case 0:
        eval('alert("Switch case 0");');
        break;
    case 1:
        if (true) {
            eval('console.log("Switch case 1 with condition");');
        }
        break;
    case 2:
        eval('document.createElement("div");');
        break;
    default:
        eval('console.log("Default case");');
}

// Conditional with mathematical operations
var num = 42;
if (num % 2 === 0) {
    eval('alert("Even number condition");');
} else {
    eval('console.log("Odd number condition");');
}

// Multiple conditions with logical operators
var flag1 = true;
var flag2 = false;
var flag3 = true;
if (flag1 && (flag2 || flag3)) {
    eval('console.log("Multiple logical operators");');
} else {
    eval('alert("Complex condition false");');
}

// Conditional with string operations
var str = "test";
if (str.length > 0 && str.indexOf("test") !== -1) {
    eval('alert("String condition");');
} else {
    eval('console.log("String condition false");');
}

// Conditional with array operations
var arr = [1, 2, 3];
if (arr.length > 0 && arr[0] === 1) {
    eval('console.log("Array condition");');
} else {
    eval('alert("Array condition false");');
}