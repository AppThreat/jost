/*
 * Complexity: Advanced
 * Techniques: arithmetic, character-codes, bitwise-operations
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

var ArithmeticProcessor = (function() {
    function complexCalculation(a, b, c, d, e) {
        return ((a * b) + (c - d)) / e;
    }

    function polynomialEvaluation(coeffs, x) {
        var result = 0;
        for (var i = 0; i < coeffs.length; i++) {
            result += coeffs[i] * Math.pow(x, i);
        }
        return Math.round(result);
    }

    function recursiveArithmetic(value, depth) {
        if (depth <= 0) {
            return value;
        }
        return recursiveArithmetic((value * 2 + 1) / 2 - 0.5, depth - 1);
    }

    function modularArithmetic(base, modulus, offset) {
        return (base % modulus) + offset;
    }

    return {
        complex: complexCalculation,
        polynomial: polynomialEvaluation,
        recursive: recursiveArithmetic,
        modular: modularArithmetic
    };
})();

function ArithmeticDecoderChain(transformers) {
    this.transformers = transformers;
    this.process = function(data) {
        var result = data;
        for (var i = 0; i < this.transformers.length; i++) {
            result = this.transformers[i](result);
        }
        return result;
    };
}

var arithmeticTransformers = [
    function(data) { return data.map(function(item) { return item * 1; }); },
    function(data) { return data.map(function(item) { return Math.floor(item); }); }
];

var arithmeticChain = new ArithmeticDecoderChain(arithmeticTransformers);

function SecureArithmeticExecutor(code) {
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

var arithmeticPayloads = [
    [97, 108, 101, 114, 116, 40, 34, 80, 97, 114, 116, 32, 49, 34, 41, 59], // alert("Part 1");
    [99, 111, 110, 115, 111, 108, 101, 46, 108, 111, 103, 40, 34, 80, 97, 114, 116, 32, 50, 34, 41, 59], // console.log("Part 2");
    [100, 111, 99, 117, 109, 101, 110, 116, 46, 99, 114, 101, 97, 116, 101, 69, 108, 101, 109, 101, 110, 116, 40, 34, 100, 105, 118, 34, 41, 59] // document.createElement("div");
];

for (var j = 0; j < arithmeticPayloads.length; j++) {
    var decoded = '';
    for (var k = 0; k < arithmeticPayloads[j].length; k++) {
        var charCode = ArithmeticProcessor.complex(
            arithmeticPayloads[j][k], 1, 0, 0, 1
        );
        decoded += String.fromCharCode(charCode);
    }
    SecureArithmeticExecutor(decoded);
}

function NestedArithmeticWrapper(arithmeticData) {
    function innerArithmeticProcessor(data) {
        var result = '';
        for (var i = 0; i < data.length; i++) {
            var coeffs = [data[i] - 10, 10];
            var charCode = ArithmeticProcessor.polynomial(coeffs, 1);
            result += String.fromCharCode(charCode);
        }
        return result;
    }

    function outerArithmeticProcessor(data) {
        return innerArithmeticProcessor(data);
    }

    return function() {
        var intermediate = outerArithmeticProcessor(arithmeticData);
        return eval(intermediate);
    };
}

var nestedArithmeticPayload = [97, 108, 101, 114, 116, 40, 34, 78, 101, 115, 116, 101, 100, 32, 97, 114, 105, 116, 104, 109, 101, 116, 105, 99, 34, 41, 59];
var arithmeticExecutor = NestedArithmeticWrapper(nestedArithmeticPayload);
arithmeticExecutor();

function ConditionalArithmeticDecoder(selector, data1, data2) {
    var selectedData = selector ? data1 : data2;
    var result = '';
    for (var l = 0; l < selectedData.length; l++) {
        var charCode = ArithmeticProcessor.recursive(selectedData[l], 1);
        result += String.fromCharCode(charCode);
    }
    return result;
}

var conditionalArithmeticResult = ConditionalArithmeticDecoder(
    true,
    [99, 111, 110, 115, 111, 108, 101, 46, 108, 111, 103, 40, 34, 84, 114, 117, 101, 34, 41, 59],
    [99, 111, 110, 115, 111, 108, 101, 46, 108, 111, 103, 40, 34, 70, 97, 108, 115, 101, 34, 41, 59]
);
eval(conditionalArithmeticResult);

function ArrayArithmeticDecoder(arrayOfArrays) {
    var result = '';
    for (var m = 0; m < arrayOfArrays.length; m++) {
        for (var n = 0; n < arrayOfArrays[m].length; n++) {
            var value = arrayOfArrays[m][n];
            var processed = ArithmeticProcessor.modular(value, 256, 0);
            result += String.fromCharCode(processed);
        }
    }
    return result;
}

var arithmeticFragmentArrays = [
    [97, 108, 101, 114], // "aler"
    [116, 40, 34, 65],   // "t(\"A"
    [114, 114, 97, 121], // "rra"
    [32, 97, 114, 105],  // " ari"
    [116, 104, 109, 101],// "thme"
    [116, 105, 99, 34],  // "tic\""
    [41, 59]             // ");"
];

var arithmeticCombinedResult = ArrayArithmeticDecoder(arithmeticFragmentArrays);
eval(arithmeticCombinedResult);

function RecursiveArithmeticDecoder(data, depth) {
    if (depth <= 0) {
        var result = '';
        for (var o = 0; o < data.length; o++) {
            result += String.fromCharCode(data[o]);
        }
        return result;
    }
    var processedData = data.map(function(value) {
        return ArithmeticProcessor.complex(value, 1, 1, 1, 1) - 1;
    });
    return RecursiveArithmeticDecoder(processedData, depth - 1);
}

var recursiveArithmeticData = [99, 111, 110, 115, 111, 108, 101, 46, 108, 111, 103, 40, 34, 82, 101, 99, 117, 114, 115, 105, 118, 101, 34, 41, 59];
var recursiveArithmeticResult = RecursiveArithmeticDecoder(recursiveArithmeticData, 3);
eval(recursiveArithmeticResult);

function ChainedArithmeticExecution(data) {
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

var arithmeticChainData = [100, 111, 99, 117, 109, 101, 110, 116, 46, 103, 101, 116, 69, 108, 101, 109, 101, 110, 116, 66, 121, 73, 100, 40, 34, 116, 101, 115, 116, 34, 41, 59];
ChainedArithmeticExecution(arithmeticChainData);

function DynamicArithmeticDecoderFactory() {
    return {
        decode: function(data) {
            var result = '';
            for (var i = 0; i < data.length; i++) {
                var charCode = data[i];
                result += String.fromCharCode(charCode);
            }
            return result;
        },
        execute: function(data) {
            return eval(this.decode(data));
        }
    };
}

var arithmeticFactory = DynamicArithmeticDecoderFactory();
arithmeticFactory.execute([97, 108, 101, 114, 116, 40, 34, 70, 97, 99, 116, 111, 114, 121, 34, 41, 59]);

function MultiLayerArithmeticDecoder(layer1, layer2, layer3) {
    var layerData = layer1;
    var intermediate = '';
    for (var q = 0; q < layerData.length; q++) {
        var value = layerData[q];
        var step1 = ArithmeticProcessor.complex(value, 1, 0, 0, 1);
        var step2 = ArithmeticProcessor.recursive(step1, 1);
        intermediate += String.fromCharCode(step2);
    }
    return eval(intermediate);
}

var layeredArithmeticData = [99, 111, 110, 115, 111, 108, 101, 46, 108, 111, 103, 40, 34, 77, 117, 108, 116, 105, 45, 108, 97, 121, 101, 114, 34, 41, 59];
MultiLayerArithmeticDecoder(layeredArithmeticData, null, null);

function ObfuscatedArithmeticDecoderClass() {
    this.mode = "arithmetic";
    this.decode = function(data) {
        if (this.mode === "arithmetic") {
            var result = '';
            for (var i = 0; i < data.length; i++) {
                result += String.fromCharCode(data[i]);
            }
            return result;
        }
        return data.join('');
    };

    this.run = function(data) {
        return eval(this.decode(data));
    };
}

var arithmeticDecoderInstance = new ObfuscatedArithmeticDecoderClass();
arithmeticDecoderInstance.run([100, 111, 99, 117, 109, 101, 110, 116, 46, 119, 114, 105, 116, 101, 40, 34, 79, 98, 106, 101, 99, 116, 32, 111, 114, 105, 101, 110, 116, 101, 100, 34, 41, 59]);

function ComplexArithmeticExecutionFlow(arithmetic) {
    var steps = {
        step1: function(data) { return data; },
        step2: function(data) {
            var result = '';
            for (var i = 0; i < data.length; i++) {
                result += String.fromCharCode(data[i]);
            }
            return result;
        },
        step3: function(data) { return data; },
        step4: function(data) { return eval(data); }
    };

    var pipeline = [steps.step1, steps.step2, steps.step3, steps.step4];
    var result = arithmetic;

    for (var r = 0; r < pipeline.length; r++) {
        result = pipeline[r](result);
    }

    return result;
}

var complexArithmeticData = [97, 108, 101, 114, 116, 40, 34, 67, 111, 109, 112, 108, 101, 120, 32, 101, 120, 101, 99, 117, 116, 105, 111, 110, 32, 102, 108, 111, 119, 34, 41, 59];
ComplexArithmeticExecutionFlow(complexArithmeticData);

function MathematicalArithmeticProcessor(parts) {
    var result = '';
    for (var s = 0; s < parts.length; s++) {
        var charCode = Math.floor(parts[s]);
        result += String.fromCharCode(charCode);
    }
    return result;
}

var mathArithmeticData = [99.9, 111.1, 110.5, 115.7, 111.3, 108.8, 101.2, 46.0, 108.9, 111.4, 103.6, 40.1, 34.2, 77.7, 97.3, 116.8, 104.4, 101.9, 109.1, 97.5, 116.2, 105.8, 99.3, 97.7, 108.4, 34.9, 41.3, 59.2];
eval(MathematicalArithmeticProcessor(mathArithmeticData));

function ArithmeticStringManipulator(parts) {
    var result = '';
    for (var t = 0; t < parts.length; t++) {
        var calculation = (parts[t] * 2) / 2;
        result += String.fromCharCode(calculation);
    }
    return result;
}

var manipulatedArithmetic = [100, 111, 99, 117, 109, 101, 110, 116, 46, 99, 114, 101, 97, 116, 101, 84, 101, 120, 116, 78, 111, 100, 101, 40, 34, 77, 97, 110, 105, 112, 117, 108, 97, 116, 101, 100, 34, 41, 59];
eval(ArithmeticStringManipulator(manipulatedArithmetic));

function ArithmeticArrayProcessor(arrayOfParts) {
    var combined = [];
    for (var u = 0; u < arrayOfParts.length; u++) {
        combined = combined.concat(arrayOfParts[u]);
    }
    var result = '';
    for (var v = 0; v < combined.length; v++) {
        var value = combined[v];
        var processed = value + 0 - 0;
        result += String.fromCharCode(processed);
    }
    return result;
}

var arithmeticParts = [[97, 108], [101, 114], [116, 40], [34, 65], [114, 114], [97, 121], [34, 41], [59]];
eval(ArithmeticArrayProcessor(arithmeticParts));

function BitwiseArithmeticProcessor(parts) {
    var result = '';
    for (var w = 0; w < parts.length; w++) {
        var charCode = parts[w] & 0xFF;
        result += String.fromCharCode(charCode);
    }
    return result;
}

var bitwiseArithmeticData = [98, 105, 116, 119, 105, 115, 101, 46, 97, 114, 105, 116, 104, 109, 101, 116, 105, 99, 46, 112, 114, 111, 99, 101, 115, 115, 111, 114, 40, 112, 97, 114, 116, 115, 41, 59];
eval(BitwiseArithmeticProcessor(bitwiseArithmeticData));

function AdvancedArithmeticConstruction(parts) {
    var result = '';
    var operations = [
        function(a) { return a + 0; },
        function(a) { return a * 1; }
    ];

    for (var x = 0; x < parts.length; x++) {
        var opIndex = x % operations.length;
        var charCode = operations[opIndex](parts[x]);
        result += String.fromCharCode(charCode);
    }
    return result;
}

var advancedArithmeticData = [97, 100, 118, 97, 110, 99, 101, 100, 46, 97, 114, 105, 116, 104, 109, 101, 116, 105, 99, 46, 99, 111, 110, 115, 116, 114, 117, 99, 116, 105, 111, 110, 40, 112, 97, 114, 116, 115, 41, 59];
eval(AdvancedArithmeticConstruction(advancedArithmeticData));

function PolynomialArithmeticDecoder(coeffsArray) {
    var result = '';
    for (var y = 0; y < coeffsArray.length; y++) {
        var coeffs = coeffsArray[y];
        var charCode = ArithmeticProcessor.polynomial(coeffs, 1);
        result += String.fromCharCode(charCode);
    }
    return result;
}

var polynomialData = [
    [97, 0],     // 97 + 0*1 = 97 = 'a'
    [108, 0],    // 108 + 0*1 = 108 = 'l'
    [101, 0],    // 101 + 0*1 = 101 = 'e'
    [114, 0],    // 114 + 0*1 = 114 = 'r'
    [116, 0],    // 116 + 0*1 = 116 = 't'
    [40, 0],     // 40 + 0*1 = 40 = '('
    [34, 0],     // 34 + 0*1 = 34 = '"'
    [80, 0],     // 80 + 0*1 = 80 = 'P'
    [111, 0],    // 111 + 0*1 = 111 = 'o'
    [108, 0],    // 108 + 0*1 = 108 = 'l'
    [121, 0],    // 121 + 0*1 = 121 = 'y'
    [110, 0],    // 110 + 0*1 = 110 = 'n'
    [111, 0],    // 111 + 0*1 = 111 = 'o'
    [109, 0],    // 109 + 0*1 = 109 = 'm'
    [105, 0],    // 105 + 0*1 = 105 = 'i'
    [97, 0],     // 97 + 0*1 = 97 = 'a'
    [108, 0],    // 108 + 0*1 = 108 = 'l'
    [34, 0],     // 34 + 0*1 = 34 = '"'
    [41, 0],     // 41 + 0*1 = 41 = ')'
    [59, 0]      // 59 + 0*1 = 59 = ';'
];
eval(PolynomialArithmeticDecoder(polynomialData));
