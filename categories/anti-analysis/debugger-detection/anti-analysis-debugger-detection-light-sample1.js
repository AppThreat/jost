/*
 * Complexity: Simple
 * Techniques: debugger-detection, timing-attacks
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

// Simple debugger detection
if (typeof console !== 'undefined' && typeof console.clear === 'function') {
    debugger;
    console.log("Simple debugger detection");
}

// Timing-based debugger detection
var startTime = Date.now();
debugger;
var endTime = Date.now();

if (endTime - startTime > 100) {
    console.log("Debugger detected via timing");
} else {
    eval('alert("No debugger detected");');
}

// Function-based debugger detection
function checkDebugger() {
    var start = new Date().getTime();
    debugger;
    var end = new Date().getTime();
    return (end - start) > 100;
}

if (checkDebugger()) {
    console.log("Debugger found");
} else {
    eval('document.createElement("div");');
}

// Multiple debugger statements
function multiDebuggerCheck() {
    debugger;
    debugger;
    debugger;
    return 'aler' + 't("Multiple debugger check");';
}

eval(multiDebuggerCheck());

// Conditional debugger
var debugMode = true;
if (debugMode) {
    debugger;
    eval('console.log("Conditional debugger");');
}

// Debugger in loop
for (var i = 0; i < 3; i++) {
    debugger;
}
eval('alert("Debugger loop completed");');

// Debugger with try-catch
try {
    debugger;
    eval('console.log("Debugger in try block");');
} catch (e) {
    console.log("Debugger caught exception");
}