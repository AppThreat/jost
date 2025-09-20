/*
 * Complexity: Simple
 * Techniques: hex, character-codes
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

function hexToString(hex) {
    var str = '';
    for (var i = 0; i < hex.length; i += 2) {
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
}

function executeHex(hexCode) {
    var decoded = hexToString(hexCode);
    return eval(decoded);
}

var hexPayload = "616c6572742822486578206578616d706c6522293b";
executeHex(hexPayload);

function splitHex(hex) {
    var parts = hex.match(/.{1,2}/g);
    var result = '';
    for (var j = 0; j < parts.length; j++) {
        result += String.fromCharCode(parseInt(parts[j], 16));
    }
    return result;
}

var splitPayload = "636f6e736f6c652e6c6f67282253706c69742068657822293b";
eval(splitHex(splitPayload));

function obfuscatedHexRunner(data) {
    try {
        var decoded = '';
        for (var k = 0; k < data.length; k += 2) {
            decoded += String.fromCharCode(parseInt(data.substr(k, 2), 16));
        }
        return eval(decoded);
    } catch (e) {
        return null;
    }
}

var hexData = "646f63756d656e742e637265617465456c656d656e74282264697622293b";
obfuscatedHexRunner(hexData);