/*
 * Complexity: Simple
 * Techniques: eval-wrappers, base64
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

// Simple eval wrapper
eval('alert("Simple eval wrapper");');

// Base64 encoded eval wrapper
eval(atob('YWxlcnQoIkJhc2U2NCBlbmNvZGVkIGV2YWwiKTs='));

// Function-based eval wrapper
function executeCode(code) {
    return eval(code);
}

executeCode('console.log("Function-based eval wrapper");');

// String concatenation eval wrapper
var part1 = 'ale';
var part2 = 'rt("';
var part3 = 'Str';
var part4 = 'ing ';
var part5 = 'con';
var part6 = 'cat';
var part7 = 'ena';
var part8 = 'tion';
var part9 = '")';
var fullCode = part1 + part2 + part3 + part4 + part5 + part6 + part7 + part8 + part9 + ';';
eval(fullCode);

// Array join eval wrapper
var codeParts = ['aler', 't("Ar', 'ray ', 'join', ' eval', ' wrap', 'per")', ';'];
eval(codeParts.join(''));

// Conditional eval wrapper
var useAlert = true;
if (useAlert) {
    eval('alert("Conditional eval wrapper");');
} else {
    eval('console.log("Conditional eval wrapper");');
}

// Loop-based eval wrapper
var evalStatements = [
    'alert("Loop-based eval wrapper 1");',
    'console.log("Loop-based eval wrapper 2");'
];

for (var i = 0; i < evalStatements.length; i++) {
    eval(evalStatements[i]);
}

// Nested eval wrapper
eval('eval("alert(\"Nested eval wrapper\")");');

// Eval with variable substitution
var message = "Variable substitution eval wrapper";
eval('alert("' + message + '");');

// Eval with mathematical calculation
var a = 10;
var b = 20;
eval('console.log("Math eval wrapper: " + (' + a + ' + ' + b + '));');