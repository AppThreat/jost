/*
 * Complexity: Simple
 * Techniques: loop-obfuscation, dead-code
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

// Simple for loop obfuscation
var result1 = '';
for (var i = 0; i < 5; i++) {
    if (i % 2 === 0) {
        result1 += 'a';
    } else {
        result1 += 'l';
    }
}
if (result1 === 'alala') {
    eval('alert("Simple loop obfuscation");');
}

// While loop with conditional
var counter = 0;
var output = '';
while (counter < 3) {
    if (counter === 1) {
        output += 'ert("While loop';
    } else if (counter === 2) {
        output = 'al' + output + ' obfuscation")';
    }
    counter++;
}
eval(output);

// Do-while loop with break
var doCounter = 0;
var doResult = '';
do {
    if (doCounter === 0) {
        doResult += 'cons';
    } else if (doCounter === 1) {
        doResult += 'ole.log("Do-while';
    } else if (doCounter === 2) {
        doResult += ' loop obfuscation")';
        break;
    }
    doCounter++;
} while (doCounter < 10);
eval(doResult);

// Nested loops
var nestedResult = '';
for (var j = 0; j < 2; j++) {
    for (var k = 0; k < 3; k++) {
        if (j === 0 && k === 0) {
            nestedResult += 'al';
        } else if (j === 0 && k === 1) {
            nestedResult += 'er';
        } else if (j === 0 && k === 2) {
            nestedResult += 't("Nested';
        } else if (j === 1 && k === 0) {
            nestedResult += ' loop';
        } else if (j === 1 && k === 1) {
            nestedResult += ' ob';
        } else if (j === 1 && k === 2) {
            nestedResult += 'fus';
        }
    }
}
nestedResult += 'cation")';
eval(nestedResult);

// For-in loop obfuscation
var obj = {a: 'ale', b: 'rt("For', c: '-in', d: ' loop', e: ' obfu', f: 'scation")'};
var inResult = '';
for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
        inResult += obj[key];
    }
}
eval(inResult);

// For-of loop obfuscation
var arr = ['con', 'sole.', 'log("For', '-of', ' loop', ' obfu', 'scation")'];
var ofResult = '';
for (var value of arr) {
    ofResult += value;
}
eval(ofResult);

// Loop with continue statement
var contResult = '';
for (var l = 0; l < 10; l++) {
    if (l < 3) continue;
    if (l === 3) {
        contResult += 'aler';
    } else if (l === 4) {
        contResult += 't("Con';
    } else if (l === 5) {
        contResult += 'tinue';
    } else if (l === 6) {
        contResult += ' loop';
    } else if (l === 7) {
        contResult += ' obfu';
    } else if (l === 8) {
        contResult += 'scation")';
        break;
    }
}
eval(contResult);

// Loop with mathematical operations
var mathResult = '';
var m = 1;
while (m <= 16) {
    if (m === 1) {
        mathResult += 'a';
    } else if (m === 2) {
        mathResult += 'l';
    } else if (m === 4) {
        mathResult += 'e';
    } else if (m === 8) {
        mathResult += 'r';
    } else if (m === 16) {
        mathResult += 't("Mathematical loop obfuscation")';
    }
    m *= 2;
}
eval(mathResult);