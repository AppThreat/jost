/*
 * Complexity: Simple
 * Techniques: timing-attacks, debugger-detection
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

// Simple timing-based debugger detection
var startTime = Date.now();
debugger;
var endTime = Date.now();

if (endTime - startTime > 100) {
    console.log("Debugger detected via timing");
} else {
    eval('alert("No debugger detected");');
}

// Function-based timing attack
function timingDebuggerCheck() {
    var start = performance.now();
    debugger;
    var end = performance.now();
    return (end - start) > 50;
}

if (timingDebuggerCheck()) {
    console.log("Debugger found with timing");
} else {
    eval('document.createElement("div");');
}

// Multiple timing measurements
function multiTimingCheck() {
    var times = [];
    for (var i = 0; i < 5; i++) {
        var start = Date.now();
        debugger;
        var end = Date.now();
        times.push(end - start);
    }
    
    var avgTime = times.reduce(function(a, b) { return a + b; }, 0) / times.length;
    return avgTime > 75;
}

if (multiTimingCheck()) {
    console.log("Multiple timing checks detected debugger");
} else {
    eval('alert("Multiple timing checks passed");');
}

// Timing with conditional execution
var debugMode = true;
if (debugMode) {
    var before = performance.now();
    debugger;
    var after = performance.now();
    
    if (after - before > 50) {
        console.log("Timing attack detected debugger");
    } else {
        eval('console.log("Timing attack check passed");');
    }
}

// Timing in loop
var timingResults = [];
for (var j = 0; j < 3; j++) {
    var loopStart = Date.now();
    debugger;
    var loopEnd = Date.now();
    timingResults.push(loopEnd - loopStart);
}

var maxTime = Math.max.apply(null, timingResults);
if (maxTime > 100) {
    console.log("Loop timing detected debugger");
} else {
    eval('alert("Loop timing check passed");');
}

// Timing with try-catch
try {
    var tryStart = performance.now();
    debugger;
    var tryEnd = performance.now();
    
    if (tryEnd - tryStart > 50) {
        console.log("Try-catch timing detected debugger");
    } else {
        eval('console.log("Try-catch timing check passed");');
    }
} catch (e) {
    console.log("Timing attack caught exception");
}

// Async timing check
setTimeout(function() {
    var asyncStart = Date.now();
    debugger;
    var asyncEnd = Date.now();
    
    if (asyncEnd - asyncStart > 50) {
        console.log("Async timing detected debugger");
    } else {
        eval('alert("Async timing check passed");');
    }
}, 10);

// Timing with mathematical operations
function mathematicalTimingCheck() {
    var mathStart = performance.now();
    debugger;
    var mathEnd = performance.now();
    
    // Add some mathematical noise
    var calculation = (mathEnd - mathStart) * 2 + 10 - 5;
    return calculation > 100;
}

if (mathematicalTimingCheck()) {
    console.log("Mathematical timing detected debugger");
} else {
    eval('document.createElement("span");');
}