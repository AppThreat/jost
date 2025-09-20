/*
 * Complexity: Simple
 * Techniques: custom-encoding, character-codes
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

function customDecode(encoded) {
    var decoded = '';
    var key = 5;
    for (var i = 0; i < encoded.length; i++) {
        var charCode = encoded.charCodeAt(i) - key;
        decoded += String.fromCharCode(charCode);
    }
    return decoded;
}

function executeCustom(encoded) {
    var decoded = customDecode(encoded);
    return eval(decoded);
}

var customPayload = "fqjwy%~j}fsuqj\";";
executeCustom(customPayload);

function reverseCustom(encoded) {
    var reversed = encoded.split('').reverse().join('');
    return customDecode(reversed);
}

var reversePayload = ";\"j}fsuqj%~jwyfq";
eval(reverseCustom(reversePayload));

function obfuscatedCustomRunner(data) {
    try {
        var key = 3;
        var result = '';
        for (var j = 0; j < data.length; j++) {
            result += String.fromCharCode(data.charCodeAt(j) - key);
        }
        return eval(result);
    } catch (e) {
        return null;
    }
}

var customData = "frphqgdgrfxphqw";
obfuscatedCustomRunner(customData);