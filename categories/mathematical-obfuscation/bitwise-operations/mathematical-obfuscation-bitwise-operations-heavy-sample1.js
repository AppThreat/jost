/*
 * Complexity: Advanced
 * Techniques: bitwise, character-codes, arithmetic-operations
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

var BitwiseProcessor = (function() {
    function xorShift(value, shift) {
        return (value << shift) | (value >> (32 - shift));
    }

    function bitwiseMask(value, mask) {
        return value & mask;
    }

    function rotateLeft(value, bits) {
        return (value << bits) | (value >>> (32 - bits));
    }

    function complexBitwise(a, b, c, d) {
        return ((a ^ b) & c) | d;
    }

    return {
        xorShift: xorShift,
        mask: bitwiseMask,
        rotate: rotateLeft,
        complex: complexBitwise
    };
})();

function BitwiseDecoderChain(transformers) {
    this.transformers = transformers;
    this.process = function(data) {
        var result = data;
        for (var i = 0; i < this.transformers.length; i++) {
            result = this.transformers[i](result);
        }
        return result;
    };
}

var bitwiseTransformers = [
    function(data) { return data.map(function(item) { return item >>> 0; }); },
    function(data) { return data.map(function(item) { return item & 0xFFFFFFFF; }); }
];

var bitwiseChain = new BitwiseDecoderChain(bitwiseTransformers);

function SecureBitwiseExecutor(code) {
    var executionContext = {
        run: function() {
            try {
                return eval(code);
            } catch (error) {
                return 'Error: ' + error.message;
            }
        }
    };
    return executionContext.run();
}

var bitwisePayloads = [
    [97, 108, 101, 114, 116, 40, 34, 80, 97, 114, 116, 32, 49, 34, 41, 59], // alert("Part 1");
    [99, 111, 110, 115, 111, 108, 101, 46, 108, 111, 103, 40, 34, 80, 97, 114, 116, 32, 50, 34, 41, 59], // console.log("Part 2");
    [100, 111, 99, 117, 109, 101, 110, 116, 46, 99, 114, 101, 97, 116, 101, 69, 108, 101, 109, 101, 110, 116, 40, 34, 100, 105, 118, 34, 41, 59] // document.createElement("div");
];

for (var j = 0; j < bitwisePayloads.length; j++) {
    var decoded = '';
    for (var k = 0; k < bitwisePayloads[j].length; k++) {
        var charCode = BitwiseProcessor.mask(bitwisePayloads[j][k], 0xFF);
        decoded += String.fromCharCode(charCode);
    }
    SecureBitwiseExecutor(decoded);
}

function NestedBitwiseWrapper(bitwiseData) {
    function innerBitwiseProcessor(data) {
        var result = '';
        for (var i = 0; i < data.length; i++) {
            var masked = BitwiseProcessor.mask(data[i], 0xFF);
            var rotated = BitwiseProcessor.rotate(masked, 1) & 0xFF;
            result += String.fromCharCode(rotated);
        }
        return result;
    }

    function outerBitwiseProcessor(data) {
        return innerBitwiseProcessor(data);
    }

    return function() {
        var intermediate = outerBitwiseProcessor(bitwiseData);
        return eval(intermediate);
    };
}

var nestedBitwisePayload = [97, 108, 101, 114, 116, 40, 34, 78, 101, 115, 116, 101, 100, 32, 98, 105, 116, 119, 105, 115, 101, 34, 41, 59];
var bitwiseExecutor = NestedBitwiseWrapper(nestedBitwisePayload);
bitwiseExecutor();

function ConditionalBitwiseDecoder(selector, data1, data2) {
    var selectedData = selector ? data1 : data2;
    var result = '';
    for (var l = 0; l < selectedData.length; l++) {
        var processed = BitwiseProcessor.complex(selectedData[l], 0, 0xFF, 0);
        result += String.fromCharCode(processed);
    }
    return result;
}

var conditionalBitwiseResult = ConditionalBitwiseDecoder(
    true,
    [99, 111, 110, 115, 111, 108, 101, 46, 108, 111, 103, 40, 34, 84, 114, 117, 101, 34, 41, 59],
    [99, 111, 110, 115, 111, 108, 101, 46, 108, 111, 103, 40, 34, 70, 97, 108, 115, 101, 34, 41, 59]
);
eval(conditionalBitwiseResult);

function ArrayBitwiseDecoder(arrayOfArrays) {
    var result = '';
    for (var m = 0; m < arrayOfArrays.length; m++) {
        for (var n = 0; n < arrayOfArrays[m].length; n++) {
            var value = arrayOfArrays[m][n];
            var processed = BitwiseProcessor.mask(value, 0xFF);
            result += String.fromCharCode(processed);
        }
    }
    return result;
}

var bitwiseFragmentArrays = [
    [97, 108, 101, 114], // "aler"
    [116, 40, 34, 65],   // "t(\"A"
    [114, 114, 97, 121], // "rra"
    [32, 98, 105, 116],  // " bit"
    [119, 105, 115, 101],// "wise"
    [34, 41, 59]         // "\");"
];

var bitwiseCombinedResult = ArrayBitwiseDecoder(bitwiseFragmentArrays);
eval(bitwiseCombinedResult);

function RecursiveBitwiseDecoder(data, depth) {
    if (depth <= 0) {
        var result = '';
        for (var o = 0; o < data.length; o++) {
            result += String.fromCharCode(data[o]);
        }
        return result;
    }
    var processedData = data.map(function(value) {
        return BitwiseProcessor.mask(value, 0xFF);
    });
    return RecursiveBitwiseDecoder(processedData, depth - 1);
}

var recursiveBitwiseData = [99, 111, 110, 115, 111, 108, 101, 46, 108, 111, 103, 40, 34, 82, 101, 99, 117, 114, 115, 105, 118, 101, 34, 41, 59];
var recursiveBitwiseResult = RecursiveBitwiseDecoder(recursiveBitwiseData, 3);
eval(recursiveBitwiseResult);

function ChainedBitwiseExecution(data) {
    var processors = [
        function(d) {
            var result = '';
            for (var i = 0; i < d.length; i++) {
                result += String.fromCharCode(d[i]);
            }
            return result;
        },
        function(d) { return d; },
        function(d) { return eval(d); }
    ];

    var result = data;
    for (var p = 0; p < processors.length; p++) {
        result = processors[p](result);
    }
    return result;
}

var bitwiseChainData = [100, 111, 99, 117, 109, 101, 110, 116, 46, 103, 101, 116, 69, 108, 101, 109, 101, 110, 116, 66, 121, 73, 100, 40, 34, 116, 101, 115, 116, 34, 41, 59];
ChainedBitwiseExecution(bitwiseChainData);

function DynamicBitwiseDecoderFactory() {
    return {
        decode: function(data) {
            var result = '';
            for (var i = 0; i < data.length; i++) {
                var charCode = data[i] & 0xFF;
                result += String.fromCharCode(charCode);
            }
            return result;
        },
        execute: function(data) {
            return eval(this.decode(data));
        }
    };
}

var bitwiseFactory = DynamicBitwiseDecoderFactory();
bitwiseFactory.execute([97, 108, 101, 114, 116, 40, 34, 70, 97, 99, 116, 111, 114, 121, 34, 41, 59]);

function MultiLayerBitwiseDecoder(layer1, layer2, layer3) {
    var layerData = layer1;
    var intermediate = '';
    for (var q = 0; q < layerData.length; q++) {
        var value = layerData[q];
        var step1 = BitwiseProcessor.mask(value, 0xFF);
        var step2 = BitwiseProcessor.rotate(step1, 2) & 0xFF;
        intermediate += String.fromCharCode(step2);
    }
    return eval(intermediate);
}

var layeredBitwiseData = [99, 111, 110, 115, 111, 108, 101, 46, 108, 111, 103, 40, 34, 77, 117, 108, 116, 105, 45, 108, 97, 121, 101, 114, 34, 41, 59];
MultiLayerBitwiseDecoder(layeredBitwiseData, null, null);

function ObfuscatedBitwiseDecoderClass() {
    this.mode = "bitwise";
    this.decode = function(data) {
        if (this.mode === "bitwise") {
            var result = '';
            for (var i = 0; i < data.length; i++) {
                result += String.fromCharCode(data[i] & 0xFF);
            }
            return result;
        }
        return data.join('');
    };

    this.run = function(data) {
        return eval(this.decode(data));
    };
}

var bitwiseDecoderInstance = new ObfuscatedBitwiseDecoderClass();
bitwiseDecoderInstance.run([100, 111, 99, 117, 109, 101, 110, 116, 46, 119, 114, 105, 116, 101, 40, 34, 79, 98, 106, 101, 99, 116, 32, 111, 114, 105, 101, 110, 116, 101, 100, 34, 41, 59]);

function ComplexBitwiseExecutionFlow(bitwise) {
    var steps = {
        step1: function(data) { return data; },
        step2: function(data) {
            var result = '';
            for (var i = 0; i < data.length; i++) {
                result += String.fromCharCode(data[i] & 0xFF);
            }
            return result;
        },
        step3: function(data) { return data; },
        step4: function(data) { return eval(data); }
    };

    var pipeline = [steps.step1, steps.step2, steps.step3, steps.step4];
    var result = bitwise;

    for (var r = 0; r < pipeline.length; r++) {
        result = pipeline[r](result);
    }

    return result;
}

var complexBitwiseData = [97, 108, 101, 114, 116, 40, 34, 67, 111, 109, 112, 108, 101, 120, 32, 101, 120, 101, 99, 117, 116, 105, 111, 110, 32, 102, 108, 111, 119, 34, 41, 59];
ComplexBitwiseExecutionFlow(complexBitwiseData);

function MathematicalBitwiseProcessor(parts) {
    var result = '';
    for (var s = 0; s < parts.length; s++) {
        var charCode = Math.floor(parts[s]) & 0xFF;
        result += String.fromCharCode(charCode);
    }
    return result;
}

var mathBitwiseData = [99.9, 111.1, 110.5, 115.7, 111.3, 108.8, 101.2, 46.0, 108.9, 111.4, 103.6, 40.1, 34.2, 77.7, 97.3, 116.8, 104.4, 101.9, 109.1, 97.5, 116.2, 105.8, 99.3, 97.7, 108.4, 34.9, 41.3, 59.2];
eval(MathematicalBitwiseProcessor(mathBitwiseData));

function BitwiseStringManipulator(parts) {
    var result = '';
    for (var t = 0; t < parts.length; t++) {
        var calculation = (parts[t] & 0xFF) | 0x00;
        result += String.fromCharCode(calculation);
    }
    return result;
}

var manipulatedBitwise = [100, 111, 99, 117, 109, 101, 110, 116, 46, 99, 114, 101, 97, 116, 101, 84, 101, 120, 116, 78, 111, 100, 101, 40, 34, 77, 97, 110, 105, 112, 117, 108, 97, 116, 101, 100, 34, 41, 59];
eval(BitwiseStringManipulator(manipulatedBitwise));

function BitwiseArrayProcessor(arrayOfParts) {
    var combined = [];
    for (var u = 0; u < arrayOfParts.length; u++) {
        combined = combined.concat(arrayOfParts[u]);
    }
    var result = '';
    for (var v = 0; v < combined.length; v++) {
        var value = combined[v];
        var processed = value & 0xFF;
        result += String.fromCharCode(processed);
    }
    return result;
}

var bitwiseParts = [[97, 108], [101, 114], [116, 40], [34, 65], [114, 114], [97, 121], [34, 41], [59]];
eval(BitwiseArrayProcessor(bitwiseParts));

function AdvancedBitwiseConstruction(parts) {
    var result = '';
    var operations = [
        function(a) { return a & 0xFF; },
        function(a) { return a | 0x00; }
    ];

    for (var x = 0; x < parts.length; x++) {
        var opIndex = x % operations.length;
        var charCode = operations[opIndex](parts[x]);
        result += String.fromCharCode(charCode);
    }
    return result;
}

var advancedBitwiseData = [97, 100, 118, 97, 110, 99, 101, 100, 46, 98, 105, 116, 119, 105, 115, 101, 46, 99, 111, 110, 115, 116, 114, 117, 99, 116, 105, 111, 110, 40, 112, 97, 114, 116, 115, 41, 59];
eval(AdvancedBitwiseConstruction(advancedBitwiseData));

function XorBitwiseDecoder(keyArray) {
    var result = '';
    for (var y = 0; y < keyArray.length; y++) {
        var pair = keyArray[y];
        var charCode = pair.value ^ pair.key;
        result += String.fromCharCode(charCode);
    }
    return result;
}

var xorData = [
    { value: 3, key: 96 },    // 3 ^ 96 = 99 = 'c'
    { value: 15, key: 96 },   // 15 ^ 96 = 111 = 'o'
    { value: 14, key: 96 },   // 14 ^ 96 = 110 = 'n'
    { value: 19, key: 96 },   // 19 ^ 96 = 115 = 's'
    { value: 15, key: 96 },   // 15 ^ 96 = 111 = 'o'
    { value: 12, key: 96 },   // 12 ^ 96 = 108 = 'l'
    { value: 14, key: 96 },   // 14 ^ 96 = 110 = 'n'
    { value: 46, key: 0 },    // 46 ^ 0 = 46 = '.'
    { value: 12, key: 96 },   // 12 ^ 96 = 108 = 'l'
    { value: 15, key: 96 },   // 15 ^ 96 = 111 = 'o'
    { value: 7, key: 96 },    // 7 ^ 96 = 103 = 'g'
    { value: 40, key: 0 },    // 40 ^ 0 = 40 = '('
    { value: 34, key: 0 },    // 34 ^ 0 = 34 = '"'
    { value: 22, key: 96 },   // 22 ^ 96 = 118 = 'v'
    { value: 24, key: 96 },   // 24 ^ 96 = 120 = 'x'
    { value: 16, key: 96 },   // 16 ^ 96 = 112 = 'p'
    { value: 18, key: 96 },   // 18 ^ 96 = 114 = 'r'
    { value: 14, key: 96 },   // 14 ^ 96 = 110 = 'n'
    { value: 19, key: 96 },   // 19 ^ 96 = 115 = 's'
    { value: 19, key: 96 },   // 19 ^ 96 = 115 = 's'
    { value: 9, key: 96 },    // 9 ^ 96 = 105 = 'i'
    { value: 15, key: 96 },   // 15 ^ 96 = 111 = 'o'
    { value: 14, key: 96 },   // 14 ^ 96 = 110 = 'n'
    { value: 34, key: 0 },    // 34 ^ 0 = 34 = '"'
    { value: 41, key: 0 },    // 41 ^ 0 = 41 = ')'
    { value: 59, key: 0 }     // 59 ^ 0 = 59 = ';'
];
eval(XorBitwiseDecoder(xorData));

function ShiftBitwiseDecoder(shiftArray) {
    var result = '';
    for (var z = 0; z < shiftArray.length; z++) {
        var item = shiftArray[z];
        var charCode = (item.value << item.leftShift) >> item.rightShift;
        result += String.fromCharCode(charCode);
    }
    return result;
}

var shiftData = [
    { value: 97, leftShift: 0, rightShift: 0 },   // 'a'
    { value: 108, leftShift: 0, rightShift: 0 },  // 'l'
    { value: 101, leftShift: 0, rightShift: 0 },  // 'e'
    { value: 114, leftShift: 0, rightShift: 0 },  // 'r'
    { value: 116, leftShift: 0, rightShift: 0 },  // 't'
    { value: 40, leftShift: 0, rightShift: 0 },   // '('
    { value: 34, leftShift: 0, rightShift: 0 },   // '"'
    { value: 83, leftShift: 0, rightShift: 0 },   // 'S'
    { value: 104, leftShift: 0, rightShift: 0 },  // 'h'
    { value: 105, leftShift: 0, rightShift: 0 },  // 'i'
    { value: 102, leftShift: 0, rightShift: 0 },  // 'f'
    { value: 116, leftShift: 0, rightShift: 0 },  // 't'
    { value: 34, leftShift: 0, rightShift: 0 },   // '"'
    { value: 41, leftShift: 0, rightShift: 0 },   // ')'
    { value: 59, leftShift: 0, rightShift: 0 }    // ';'
];
eval(ShiftBitwiseDecoder(shiftData));
