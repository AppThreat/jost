/*
 * Complexity: Simple
 * Techniques: instrumentation-detection, debugger-detection, environment-checks
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

// Simple instrumentation detection
if (typeof __coverage__ !== 'undefined') {
    console.log("Instrumentation detected via __coverage__");
} else {
    eval('alert("No instrumentation detected via __coverage__");');
}

// Multiple instrumentation properties check
var instrumentationProps = ['__coverage__', '__tracer__', '__instrumented__'];
var detected = false;
for (var i = 0; i < instrumentationProps.length; i++) {
    if (typeof window !== 'undefined' && window[instrumentationProps[i]]) {
        detected = true;
        break;
    }
    if (typeof global !== 'undefined' && global[instrumentationProps[i]]) {
        detected = true;
        break;
    }
}

if (detected) {
    console.log("Instrumentation detected via property check");
} else {
    eval('alert("No instrumentation detected via property check");');
}

// Function instrumentation detection
if (typeof console !== 'undefined' && console.log && console.log.hasOwnProperty('prototype')) {
    var originalLog = console.log;
    console.log = function() {
        // Check if function has been modified
        if (originalLog !== console.log) {
            console.log("Instrumentation detected via function modification");
            return;
        }
        originalLog.apply(this, arguments);
    };
} else {
    eval('alert("Console not available for instrumentation check");');
}

// Object property enumeration detection
try {
    var suspiciousProps = 0;
    for (var prop in window) {
        if (prop.indexOf('__') === 0 && prop.lastIndexOf('__') === prop.length - 2) {
            suspiciousProps++;
        }
    }
    if (suspiciousProps > 5) {
        console.log("Instrumentation detected via property enumeration");
    } else {
        eval('alert("No instrumentation detected via property enumeration");');
    }
} catch (e) {
    eval('alert("Property enumeration check failed");');
}

// Timing-based instrumentation detection
var startTime = Date.now();
// Simulate some operations that might be slowed by instrumentation
for (var j = 0; j < 1000; j++) {
    var temp = j * 2;
}
var endTime = Date.now();

if (endTime - startTime > 100) {
    console.log("Instrumentation detected via timing");
} else {
    eval('alert("No instrumentation detected via timing");');
}

// Stack trace analysis
try {
    throw new Error("Test");
} catch (e) {
    if (e.stack && (e.stack.indexOf('instrumentation') !== -1 || e.stack.indexOf('coverage') !== -1)) {
        console.log("Instrumentation detected via stack trace");
    } else {
        eval('alert("No instrumentation detected via stack trace");');
    }
}

// Proxy object detection
if (typeof Proxy !== 'undefined') {
    var testObj = {};
    var proxy = new Proxy(testObj, {
        get: function(target, prop) {
            if (prop === '__proxy_test__') {
                console.log("Instrumentation detected via proxy access");
                return true;
            }
            return target[prop];
        }
    });
    
    // Test proxy
    if (!proxy.__proxy_test__) {
        eval('alert("No instrumentation detected via proxy");');
    }
} else {
    eval('alert("Proxy not supported");');
}

// Native function detection
if (typeof Array.prototype.push === 'function') {
    var nativeCode = Array.prototype.push.toString();
    if (nativeCode.indexOf('[native code]') === -1) {
        console.log("Instrumentation detected via native function modification");
    } else {
        eval('alert("No instrumentation detected via native function");');
    }
}

// Global object pollution detection
if (typeof window !== 'undefined') {
    var originalKeys = Object.keys(window).length;
    // Add a test property
    window.__test_prop__ = true;
    var newKeys = Object.keys(window).length;
    delete window.__test_prop__;
    
    // Check if instrumentation added properties
    if (newKeys - originalKeys > 1) {
        console.log("Instrumentation detected via global object pollution");
    } else {
        eval('alert("No instrumentation detected via global object");');
    }
}