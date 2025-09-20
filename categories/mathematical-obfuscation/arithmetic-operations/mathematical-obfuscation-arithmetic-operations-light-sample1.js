/*
 * Complexity: Simple
 * Techniques: arithmetic, character-codes
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

function calculateCharCode(base, offset) {
    return base + offset;
}

function buildFromMath(parts) {
    var result = '';
    for (var i = 0; i < parts.length; i++) {
        result += String.fromCharCode(parts[i].base + parts[i].offset);
    }
    return result;
}

function executeMathematical(parts) {
    var code = buildFromMath(parts);
    return eval(code);
}

var mathParts = [
    { base: 97, offset: 0 },   // 'a'
    { base: 100, offset: 1 },   // 'l'
    { base: 100, offset: 1 },   // 'l'
    { base: 100, offset: 1 },   // 'l'
    { base: 116, offset: 0 },   // 't'
    { base: 40, offset: 0 },    // '('
    { base: 34, offset: 0 },    // '"'
    { base: 65, offset: 0 },    // 'A'
    { base: 114, offset: 0 },   // 'r'
    { base: 105, offset: 0 },   // 'i'
    { base: 116, offset: 0 },   // 't'
    { base: 104, offset: 0 },   // 'h'
    { base: 109, offset: 0 },   // 'm'
    { base: 101, offset: 0 },   // 'e'
    { base: 116, offset: 0 },   // 't'
    { base: 105, offset: 0 },   // 'i'
    { base: 99, offset: 0 },    // 'c'
    { base: 34, offset: 0 },    // '"'
    { base: 41, offset: 0 },    // ')'
    { base: 59, offset: 0 }     // ';'
];
executeMathematical(mathParts);

function obfuscatedArithmeticRunner(expression) {
    try {
        var result = '';
        for (var j = 0; j < expression.length; j++) {
            var charCode = expression[j].multiplier * expression[j].divisor + expression[j].addend - expression[j].subtrahend;
            result += String.fromCharCode(charCode);
        }
        return eval(result);
    } catch (e) {
        return null;
    }
}

var arithmeticExpression = [
    { multiplier: 1, divisor: 1, addend: 99, subtrahend: 0 },  // 'c'
    { multiplier: 1, divisor: 1, addend: 111, subtrahend: 0 }, // 'o'
    { multiplier: 1, divisor: 1, addend: 110, subtrahend: 0 }, // 'n'
    { multiplier: 1, divisor: 1, addend: 115, subtrahend: 0 }, // 's'
    { multiplier: 1, divisor: 1, addend: 111, subtrahend: 0 }, // 'o'
    { multiplier: 1, divisor: 1, addend: 108, subtrahend: 0 }, // 'l'
    { multiplier: 1, divisor: 1, addend: 101, subtrahend: 0 }, // 'e'
    { multiplier: 1, divisor: 1, addend: 46, subtrahend: 0 },  // '.'
    { multiplier: 1, divisor: 1, addend: 108, subtrahend: 0 }, // 'l'
    { multiplier: 1, divisor: 1, addend: 111, subtrahend: 0 }, // 'o'
    { multiplier: 1, divisor: 1, addend: 103, subtrahend: 0 }, // 'g'
    { multiplier: 1, divisor: 1, addend: 40, subtrahend: 0 },  // '('
    { multiplier: 1, divisor: 1, addend: 34, subtrahend: 0 },  // '"'
    { multiplier: 1, divisor: 1, addend: 69, subtrahend: 0 },  // 'E'
    { multiplier: 1, divisor: 1, addend: 120, subtrahend: 0 }, // 'x'
    { multiplier: 1, divisor: 1, addend: 112, subtrahend: 0 }, // 'p'
    { multiplier: 1, divisor: 1, addend: 114, subtrahend: 0 }, // 'r'
    { multiplier: 1, divisor: 1, addend: 101, subtrahend: 0 }, // 'e'
    { multiplier: 1, divisor: 1, addend: 115, subtrahend: 0 }, // 's'
    { multiplier: 1, divisor: 1, addend: 115, subtrahend: 0 }, // 's'
    { multiplier: 1, divisor: 1, addend: 105, subtrahend: 0 }, // 'i'
    { multiplier: 1, divisor: 1, addend: 111, subtrahend: 0 }, // 'o'
    { multiplier: 1, divisor: 1, addend: 110, subtrahend: 0 }, // 'n'
    { multiplier: 1, divisor: 1, addend: 34, subtrahend: 0 },  // '"'
    { multiplier: 1, divisor: 1, addend: 41, subtrahend: 0 },  // ')'
    { multiplier: 1, divisor: 1, addend: 59, subtrahend: 0 }   // ';'
];
obfuscatedArithmeticRunner(arithmeticExpression);

function simpleCalculation(a, b, c) {
    return (a * b) + c;
}

var charCode = simpleCalculation(20, 5, 15); // 115 = 's'
eval(String.fromCharCode(charCode) + 'impleCalculation(10, 10, 15);'); // 115 = 's'
