/*
 * Complexity: Simple
 * Techniques: base64, eval-wrappers
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

function b64decode(str) {
    return atob(str);
}

function executePayload(encoded) {
    var decoded = b64decode(encoded);
    return eval(decoded);
}

var payload = "YWxlcnQoIlNpbXBsZSBiYXNlNjQgZXhhbXBsZSIpOw==";
executePayload(payload);

function chainedDecode(first, second) {
    var step1 = atob(first);
    var step2 = atob(second);
    return step1 + step2;
}

var part1 = "YWxlcnQo";
var part2 = "IlBhcnQgMiIpOw==";
eval(chainedDecode(part1, part2));

function obfuscatedRunner(data) {
    try {
        return eval(atob(data));
    } catch (e) {
        return null;
    }
}

var testData = "Y29uc29sZS5sb2coIkhlbGxvIFdvcmxkIik7";
obfuscatedRunner(testData);