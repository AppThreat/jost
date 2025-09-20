/*
 * Complexity: Simple
 * Techniques: bitwise, character-codes
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

function bitwiseDecode(value) {
    return value & 0xFF;
}

function buildFromBitwise(parts) {
    var result = '';
    for (var i = 0; i < parts.length; i++) {
        result += String.fromCharCode(parts[i] & 0xFF);
    }
    return result;
}

function executeBitwise(parts) {
    var code = buildFromBitwise(parts);
    return eval(code);
}

var bitwiseParts = [
    97,   // 'a'
    108,  // 'l'
    101,  // 'e'
    114,  // 'r'
    116,  // 't'
    40,   // '('
    34,   // '"'
    66,   // 'B'
    105,  // 'i'
    116,  // 't'
    119,  // 'w'
    105,  // 'i'
    115,  // 's'
    101,  // 'e'
    34,   // '"'
    41,   // ')'
    59    // ';'
];
executeBitwise(bitwiseParts);

function obfuscatedBitwiseRunner(expression) {
    try {
        var result = '';
        for (var j = 0; j < expression.length; j++) {
            var charCode = (expression[j] ^ 0x00) | 0x00;
            result += String.fromCharCode(charCode);
        }
        return eval(result);
    } catch (e) {
        return null;
    }
}

var bitwiseExpression = [
    99,   // 'c'
    111,  // 'o'
    110,  // 'n'
    115,  // 's'
    111,  // 'o'
    108,  // 'l'
    101,  // 'e'
    46,   // '.'
    108,  // 'l'
    111,  // 'o'
    103,  // 'g'
    40,   // '('
    34,   // '"'
    69,   // 'E'
    120,  // 'x'
    112,  // 'p'
    114,  // 'r'
    101,  // 'e'
    115,  // 's'
    115,  // 's'
    105,  // 'i'
    111,  // 'o'
    110,  // 'n'
    34,   // '"'
    41,   // ')'
    59    // ';'
];
obfuscatedBitwiseRunner(bitwiseExpression);

function simpleBitwise(a, b) {
    return a ^ b ^ b;
}

var charCode = simpleBitwise(115, 10); // 115 = 's'
eval(String.fromCharCode(charCode) + 'impleBitwise(115, 15);');