/*
 * Complexity: Simple
 * Techniques: custom-decompression, eval-wrappers
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

// Simple custom decompression
function simpleDecompress(compressed) {
    var decompressed = '';
    for (var i = 0; i < compressed.length; i++) {
        decompressed += String.fromCharCode(compressed[i]);
    }
    return decompressed;
}

var compressedData = [97, 108, 101, 114, 116, 40, 34, 83, 105, 109, 112, 108, 101, 32, 99, 117, 115, 116, 111, 109, 32, 100, 101, 99, 111, 109, 112, 114, 101, 115, 115, 105, 111, 110, 34, 41, 59];
var decompressedCode = simpleDecompress(compressedData);
eval(decompressedCode);

// Run-length decompression
function runLengthDecompress(data) {
    var result = '';
    for (var i = 0; i < data.length; i += 2) {
        var char = data[i];
        var count = data[i + 1];
        for (var j = 0; j < count; j++) {
            result += char;
        }
    }
    return result;
}

var runLengthData = ['a', 1, 'l', 1, 'e', 1, 'r', 1, 't', 1, '(', 1, '"', 1, 'R', 1, 'u', 1, 'n', 1, '-', 1, 'l', 1, 'e', 1, 'n', 1, 'g', 1, 't', 1, 'h', 1, ' ', 1, 'd', 1, 'e', 1, 'c', 1, 'o', 1, 'm', 1, 'p', 1, 'r', 1, 'e', 1, 's', 1, 's', 1, 'i', 1, 'o', 1, 'n', 1, '"', 1, ')', 1, ';', 1];
var runLengthCode = runLengthDecompress(runLengthData);
eval(runLengthCode);

// Dictionary decompression
function dictionaryDecompress(compressed, dictionary) {
    var result = '';
    for (var i = 0; i < compressed.length; i++) {
        result += dictionary[compressed[i]];
    }
    return result;
}

var dictCompressed = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var dict = ['a', 'l', 'e', 'r', 't', '(', '"', 'D', 'i', 'c', 't'];
var dictCode1 = dictionaryDecompress(dictCompressed, dict);
var dictCode2 = 'ionary decompression");';
eval(dictCode1 + dictCode2);

// XOR decompression
function xorDecompress(data, key) {
    var result = '';
    for (var i = 0; i < data.length; i++) {
        result += String.fromCharCode(data[i] ^ key);
    }
    return result;
}

var xorData = [3, 14, 7, 20, 25, 42, 39, 12, 13, 24, 23, 18, 29, 12, 23, 28, 28, 13, 24, 23, 3, 18, 7, 28, 28, 13, 24, 23];
var xorKey = 96;
var xorCode = xorDecompress(xorData, xorKey);
eval(xorCode);

// Base64 with custom decompression
function base64CustomDecompress(data) {
    var base64Decoded = atob(data);
    var customResult = '';
    for (var i = 0; i < base64Decoded.length; i++) {
        customResult += String.fromCharCode(base64Decoded.charCodeAt(i));
    }
    return customResult;
}

var base64CustomData = 'YWxlcnQoIkJhc2U2NCB3aXRoIGN1c3RvbSBkZWNvbXByZXNzaW9uIik7';
var base64CustomCode = base64CustomDecompress(base64CustomData);
eval(base64CustomCode);

// Reverse and decompress
function reverseDecompress(data) {
    var reversed = data.split('').reverse().join('');
    var result = '';
    for (var i = 0; i < reversed.length; i += 2) {
        result += reversed[i];
    }
    return result.split('').reverse().join('');
}

var reverseData = ';)"esrever dna hpargzed"(trela';
var reverseCode = reverseDecompress(reverseData);
eval(reverseCode);

// Multi-step decompression
function multiStepDecompress(step1, step2) {
    var intermediate = '';
    for (var i = 0; i < step1.length; i++) {
        intermediate += String.fromCharCode(step1[i]);
    }
    return intermediate + step2;
}

var step1Data = [99, 111, 110, 115, 111, 108, 101, 46, 108, 111, 103, 40, 34, 77, 117, 108, 116, 105, 45];
var step2Data = 'step decompression");';
var multiStepCode = multiStepDecompress(step1Data, step2Data);
eval(multiStepCode);