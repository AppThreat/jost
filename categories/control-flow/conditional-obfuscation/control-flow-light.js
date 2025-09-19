/*
 * Complexity: Simple
 * Techniques: conditional-obfuscation, dead-code, jump-tables
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */
(function() {
    'use strict';
    
    // Simple conditional obfuscation
    var condition1 = function(a, b) {
        var result = 0;
        if (a > b) {
            result = 1;
        } else {
            result = 0;
        }
        return result;
    };
    
    // Nested conditional obfuscation
    var condition2 = function(x, y, z) {
        var output = 0;
        if (x > 0) {
            if (y > 0) {
                if (z > 0) {
                    output = 1;
                } else {
                    output = 2;
                }
            } else {
                output = 3;
            }
        } else {
            output = 4;
        }
        return output;
    };
    
    // Switch statement obfuscation
    var switchObfuscation = function(value) {
        var result = 0;
        switch (value) {
            case 1:
                result = 10;
                break;
            case 2:
                result = 20;
                break;
            case 3:
                result = 30;
                break;
            case 4:
                result = 40;
                break;
            case 5:
                result = 50;
                break;
            default:
                result = 0;
        }
        return result;
    };
    
    // Dead code insertion
    var withDeadCode = function(input) {
        var realResult = input * 2;
        
        // Dead code - never executed
        if (false) {
            var unusedVar = Math.random() * 1000;
            var unusedCalc = unusedVar * 3.14159;
            console.log("This should never appear");
        }
        
        // More dead code
        if (0 === 1) {
            for (var i = 0; i < 100; i++) {
                var temp = i * i;
            }
        }
        
        return realResult;
    };
    
    // Loop obfuscation with breaks
    var loopWithBreaks = function(limit) {
        var result = 0;
        for (var i = 0; i < limit; i++) {
            if (i === 5) {
                break;
            }
            if (i === 3) {
                continue;
            }
            result += i;
        }
        return result;
    };
    
    // Complex conditional chain
    var complexChain = function(a, b, c) {
        var x = 0;
        if (a > 0) {
            x = 1;
        } else if (b > 0) {
            x = 2;
        } else if (c > 0) {
            x = 3;
        } else if (a + b > 0) {
            x = 4;
        } else if (a + c > 0) {
            x = 5;
        } else if (b + c > 0) {
            x = 6;
        } else {
            x = 7;
        }
        return x;
    };
    
    // Jump table simulation
    var jumpTable = function(opcode, a, b) {
        var operations = [
            function() { return a + b; },      // 0
            function() { return a - b; },      // 1
            function() { return a * b; },      // 2
            function() { return a / b; },      // 3
            function() { return a % b; },      // 4
            function() { return Math.pow(a, b); }, // 5
            function() { return 0; },          // 6
            function() { return 0; }           // 7
        ];
        
        if (opcode >= 0 && opcode < operations.length) {
            return operations[opcode]();
        }
        return 0;
    };
    
    // Conditional assignment obfuscation
    var conditionalAssignment = function(flag) {
        var value = 0;
        if (flag) {
            value = 1;
        } else {
            value = 0;
        }
        return value;
    };
    
    // Ternary operator obfuscation
    var ternaryObfuscation = function(a, b) {
        return (a > b) ? ((a < 100) ? 1 : 2) : ((b < 100) ? 3 : 4);
    };
    
    // Multiple exit points
    var multipleExits = function(input) {
        if (input < 0) {
            return -1;
        }
        
        if (input === 0) {
            return 0;
        }
        
        if (input > 100) {
            return 100;
        }
        
        return input;
    };
    
    // Conditional variable initialization
    var conditionalInit = function(type) {
        var result;
        if (type === 'string') {
            result = 'default';
        } else if (type === 'number') {
            result = 0;
        } else if (type === 'boolean') {
            result = false;
        } else {
            result = null;
        }
        return result;
    };
    
    // Loop with conditional increments
    var conditionalLoop = function(count) {
        var sum = 0;
        for (var i = 0; i < count; i++) {
            if (i % 2 === 0) {
                sum += i;
            } else if (i % 3 === 0) {
                sum += i * 2;
            } else {
                sum += 1;
            }
        }
        return sum;
    };
    
    // Early return obfuscation
    var earlyReturns = function(value) {
        if (value === null) return 0;
        if (value === undefined) return 0;
        if (typeof value !== 'number') return 0;
        if (value < 0) return -1;
        if (value > 1000) return 1000;
        if (value === 42) return 84;
        return value;
    };
    
    // Conditional object property access
    var conditionalProperty = function(obj, key) {
        if (obj && typeof obj === 'object') {
            if (key in obj) {
                return obj[key];
            } else {
                return 'missing';
            }
        } else {
            return 'invalid';
        }
    };
    
    // Nested ternary obfuscation
    var nestedTernary = function(a, b, c) {
        return a > b ? (b > c ? 1 : (c > a ? 2 : 3)) : (a > c ? 4 : (b > c ? 5 : 6));
    };
    
    // Conditional array access
    var conditionalArray = function(arr, index) {
        if (Array.isArray(arr)) {
            if (index >= 0 && index < arr.length) {
                return arr[index];
            } else if (index < 0) {
                return arr[arr.length + index];
            } else {
                return undefined;
            }
        } else {
            return null;
        }
    };
    
    // State machine simulation
    var stateMachine = function(input) {
        var state = 0;
        var result = 0;
        
        while (state !== 3) {
            switch (state) {
                case 0:
                    if (input > 0) {
                        state = 1;
                    } else {
                        state = 2;
                    }
                    break;
                case 1:
                    result = input * 2;
                    state = 3;
                    break;
                case 2:
                    result = input * -1;
                    state = 3;
                    break;
            }
        }
        
        return result;
    };
    
    // Conditional function calls
    var conditionalCalls = function(operation, a, b) {
        var add = function(x, y) { return x + y; };
        var sub = function(x, y) { return x - y; };
        var mul = function(x, y) { return x * y; };
        var div = function(x, y) { return x / y; };
        
        if (operation === 'add') {
            return add(a, b);
        } else if (operation === 'sub') {
            return sub(a, b);
        } else if (operation === 'mul') {
            return mul(a, b);
        } else if (operation === 'div' && b !== 0) {
            return div(a, b);
        } else {
            return 0;
        }
    };
})();