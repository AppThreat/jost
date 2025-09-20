/*
 * Complexity: Simple
 * Techniques: control-flow-flattening, jump-tables
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

// Simple control flow flattening with switch
var state = 0;
var result = '';

while (state !== -1) {
    switch (state) {
        case 0:
            result += 'a';
            state = 1;
            break;
        case 1:
            result += 'l';
            state = 2;
            break;
        case 2:
            result += 'e';
            state = 3;
            break;
        case 3:
            result += 'r';
            state = 4;
            break;
        case 4:
            result += 't("Simple control flow flattening")';
            state = -1;
            break;
        default:
            state = -1;
    }
}

eval(result);

// Control flow flattening with array dispatch
var dispatchTable = [
    function() { return 'c'; },
    function() { return 'o'; },
    function() { return 'n'; },
    function() { return 's'; },
    function() { return 'o'; },
    function() { return 'l'; },
    function() { return 'e'; },
    function() { return '.'; },
    function() { return 'l'; },
    function() { return 'o'; },
    function() { return 'g'; },
    function() { return '("'; },
    function() { return 'A'; },
    function() { return 'r'; },
    function() { return 'r'; },
    function() { return 'a'; },
    function() { return 'y'; },
    function() { return ' '; },
    function() { return 'd'; },
    function() { return 'i'; },
    function() { return 's'; },
    function() { return 'p'; },
    function() { return 'a'; },
    function() { return 't'; },
    function() { return 'c'; },
    function() { return 'h'; },
    function() { return '")'; },
    function() { return ';'; }
];

var flattenedResult = '';
var currentIndex = 0;

while (currentIndex < dispatchTable.length) {
    flattenedResult += dispatchTable[currentIndex]();
    currentIndex++;
}

eval(flattenedResult);

// Control flow flattening with object dispatch
var dispatchObject = {
    0: function() { return 'd'; },
    1: function() { return 'o'; },
    2: function() { return 'c'; },
    3: function() { return 'u'; },
    4: function() { return 'm'; },
    5: function() { return 'e'; },
    6: function() { return 'n'; },
    7: function() { return 't'; },
    8: function() { return '.'; },
    9: function() { return 'c'; },
    10: function() { return 'r'; },
    11: function() { return 'e'; },
    12: function() { return 'a'; },
    13: function() { return 't'; },
    14: function() { return 'e'; },
    15: function() { return 'E'; },
    16: function() { return 'l'; },
    17: function() { return 'e'; },
    18: function() { return 'm'; },
    19: function() { return 'e'; },
    20: function() { return 'n'; },
    21: function() { return 't'; },
    22: function() { return '("'; },
    23: function() { return 'd'; },
    24: function() { return 'i'; },
    25: function() { return 'v'; },
    26: function() { return '")'; },
    27: function() { return ';'; }
};

var objectResult = '';
var objectIndex = 0;

while (objectIndex <= 27) {
    if (dispatchObject[objectIndex]) {
        objectResult += dispatchObject[objectIndex]();
    }
    objectIndex++;
}

eval(objectResult);

// Control flow flattening with conditional dispatch
var conditionalDispatch = [
    { condition: function() { return true; }, action: function() { return 'a'; } },
    { condition: function() { return 1 === 1; }, action: function() { return 'l'; } },
    { condition: function() { return 'test'.length === 4; }, action: function() { return 'e'; } },
    { condition: function() { return Math.random() >= 0; }, action: function() { return 'r'; } },
    { condition: function() { return true; }, action: function() { return 't("Conditional dispatch flattening")'; } }
];

var conditionalResult = '';
var conditionalIndex = 0;

while (conditionalIndex < conditionalDispatch.length) {
    var item = conditionalDispatch[conditionalIndex];
    if (item.condition()) {
        conditionalResult += item.action();
        conditionalIndex++;
    } else {
        conditionalIndex++;
    }
}

eval(conditionalResult);

// Control flow flattening with state machine
var stateMachine = {
    currentState: 'start',
    states: {
        start: { action: function() { return 'c'; }, next: 'step1' },
        step1: { action: function() { return 'o'; }, next: 'step2' },
        step2: { action: function() { return 'n'; }, next: 'step3' },
        step3: { action: function() { return 's'; }, next: 'step4' },
        step4: { action: function() { return 'o'; }, next: 'step5' },
        step5: { action: function() { return 'l'; }, next: 'step6' },
        step6: { action: function() { return 'e'; }, next: 'step7' },
        step7: { action: function() { return '.'; }, next: 'step8' },
        step8: { action: function() { return 'l'; }, next: 'step9' },
        step9: { action: function() { return 'o'; }, next: 'step10' },
        step10: { action: function() { return 'g'; }, next: 'step11' },
        step11: { action: function() { return '("State machine flattening")'; }, next: 'end' },
        end: { action: function() { return ''; }, next: null }
    }
};

var stateMachineResult = '';

while (stateMachine.currentState !== null && stateMachine.states[stateMachine.currentState]) {
    var currentState = stateMachine.states[stateMachine.currentState];
    stateMachineResult += currentState.action();
    stateMachine.currentState = currentState.next;
}

eval(stateMachineResult);

// Control flow flattening with jump table
var jumpTable = [
    5, // jump to index 5
    3, // jump to index 3
    7, // jump to index 7
    1, // jump to index 1
    -1, // exit
    2, // jump to index 2
    4, // jump to index 4
    0  // jump to index 0
];

var jumpCode = ['a', 'l', 'e', 'r', 't', '(', '"', 'J', 'u', 'm', 'p', ' ', 't', 'a', 'b', 'l', 'e', ' ', 'f', 'l', 'a', 't', 't', 'e', 'n', 'i', 'n', 'g', '"', ')', ';'];
var jumpResult = '';
var jumpIndex = 0;

while (jumpIndex !== -1 && jumpIndex < jumpTable.length) {
    if (jumpCode[jumpIndex]) {
        jumpResult += jumpCode[jumpIndex];
    }
    jumpIndex = jumpTable[jumpIndex];
}

eval(jumpResult);

// Control flow flattening with mathematical dispatch
var mathDispatch = [
    function(x) { return x * 1; }, // 0
    function(x) { return x + 1; }, // 1
    function(x) { return x * 2; }, // 2
    function(x) { return x - 1; }, // 3
    function(x) { return x / 1; }  // 4
];

var mathCode = ['a', 'l', 'e', 'r', 't', '(', '"', 'M', 'a', 't', 'h', ' ', 'd', 'i', 's', 'p', 'a', 't', 'c', 'h', ' ', 'f', 'l', 'a', 't', 't', 'e', 'n', 'i', 'n', 'g', '"', ')', ';'];
var mathResult = '';
var mathIndex = 0;

while (mathIndex < mathCode.length) {
    var operation = mathDispatch[mathIndex % mathDispatch.length];
    var calculatedIndex = operation(mathIndex);
    if (calculatedIndex >= 0 && calculatedIndex < mathCode.length) {
        mathResult += mathCode[mathIndex];
    }
    mathIndex++;
}

eval(mathResult);