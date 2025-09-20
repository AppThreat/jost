/*
 * Complexity: Simple
 * Techniques: environment-checks, console-detection
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

// Console detection
if (typeof console !== 'undefined' && console.clear) {
    console.log("Console detected");
} else {
    eval('alert("No console detected");');
}

// Window object check
if (typeof window !== 'undefined' && window.document) {
    eval('console.log("Browser environment detected");');
} else {
    console.log("Non-browser environment");
}

// Node.js detection
if (typeof process !== 'undefined' && process.versions && process.versions.node) {
    console.log("Node.js environment detected");
} else {
    eval('alert("Not Node.js environment");');
}

// Browser-specific checks
if (navigator && navigator.userAgent) {
    if (navigator.userAgent.indexOf('Chrome') !== -1) {
        eval('console.log("Chrome browser detected");');
    } else if (navigator.userAgent.indexOf('Firefox') !== -1) {
        eval('console.log("Firefox browser detected");');
    }
}

// Development tools detection
if (typeof console !== 'undefined' && console.firebug) {
    console.log("Firebug detected");
} else {
    eval('alert("No Firebug detected");');
}

// Global object check
if (typeof global !== 'undefined') {
    console.log("Global object exists");
} else {
    eval('console.log("No global object");');
}

// DOM availability check
if (typeof document !== 'undefined' && document.createElement) {
    eval('alert("DOM available");');
} else {
    console.log("No DOM available");
}

// Timing-based environment check
var envStartTime = Date.now();
// Simulate some work
for (var i = 0; i < 1000; i++) {
    var temp = i * 2;
}
var envEndTime = Date.now();

if (envEndTime - envStartTime < 5) {
    eval('console.log("Fast execution environment");');
} else {
    console.log("Slow execution environment");
}