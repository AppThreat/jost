/*
 * Complexity: Simple
 * Techniques: string-concat, character-codes
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

function buildString(parts) {
    var result = '';
    for (var i = 0; i < parts.length; i++) {
        result += parts[i];
    }
    return result;
}

function executeBuiltString(parts) {
    var code = buildString(parts);
    return eval(code);
}

var stringParts = ['al', 'er', 't(', '"', 'Co', 'nc', 'at', 'en', 'at', 'ed', '"', ')', ';'];
executeBuiltString(stringParts);

function splitAndJoin(data, separator) {
    return data.split(separator).join('');
}

var splitData = 'a|l|e|r|t|(|"|S|p|l|i|t| |J|o|i|n|"|)|;';
var joinedCode = splitAndJoin(splitData, '|');
eval(joinedCode);

function obfuscatedConcatRunner(parts) {
    try {
        var result = '';
        for (var j = 0; j < parts.length; j++) {
            result = result + parts[j];
        }
        return eval(result);
    } catch (e) {
        return null;
    }
}

var concatParts = ['co', 'ns', 'ol', 'e.', 'lo', 'g(', '"', 'Co', 'nc', 'at', '"', ')', ';'];
obfuscatedConcatRunner(concatParts);