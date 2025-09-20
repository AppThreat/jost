/*
 * Complexity: Advanced
 * Techniques: string-concat, split-join, character-codes, arithmetic-operations
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

var StringConstructor = (function() {
    function concatenateArray(array) {
        var result = '';
        for (var i = 0; i < array.length; i++) {
            result = result.concat(array[i]);
        }
        return result;
    }
    
    function reverseConcatenate(array) {
        var result = '';
        for (var j = array.length - 1; j >= 0; j--) {
            result = array[j] + result;
        }
        return result;
    }
    
    function conditionalConcat(part1, part2, useReverse) {
        if (useReverse) {
            return part2 + part1;
        }
        return part1 + part2;
    }
    
    function nestedConcatenation(level1, level2, level3) {
        var intermediate1 = concatenateArray(level1);
        var intermediate2 = concatenateArray(level2);
        var finalParts = [intermediate1, intermediate2];
        if (level3) {
            finalParts.push(concatenateArray(level3));
        }
        return concatenateArray(finalParts);
    }
    
    return {
        concatArray: concatenateArray,
        reverseConcat: reverseConcatenate,
        conditional: conditionalConcat,
        nested: nestedConcatenation
    };
})();

function ConcatenationPipeline(transformers) {
    this.transformers = transformers;
    this.process = function(data) {
        var result = data;
        for (var i = 0; i < this.transformers.length; i++) {
            result = this.transformers[i](result);
        }
        return result;
    };
}

var concatTransformers = [
    function(data) { return data.filter(function(item) { return item !== ''; }); },
    function(data) { return StringConstructor.concatArray(data); },
    function(data) { return data.split('').reverse().join(''); },
    function(data) { return data.split('').reverse().join(''); }
];

var concatPipeline = new ConcatenationPipeline(concatTransformers);

function SecureConcatExecutor(code) {
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

var concatPayloads = [
    ['al', 'er', 't(', '"', 'Pa', 'rt', ' 1', '"', ')', ';'],
    ['co', 'ns', 'ol', 'e.', 'lo', 'g(', '"', 'Pa', 'rt', ' 2', '"', ')', ';'],
    ['do', 'cu', 'me', 'nt.', 'cr', 'ea', 'te', 'El', 'em', 'en', 't(', '"', 'd', 'iv', '"', ')', ';'],
    ['wi', 'nd', 'ow.', 'lo', 'ca', 'ti', 'on.', 'hr', 'ef', ';']
];

for (var j = 0; j < concatPayloads.length; j++) {
    var decoded = concatPipeline.process(concatPayloads[j]);
    SecureConcatExecutor(decoded);
}

function NestedConcatWrapper(stringParts) {
    function innerConcat(data) {
        return StringConstructor.concatArray(data);
    }
    
    function outerProcessor(data) {
        return innerConcat(data);
    }
    
    return function() {
        var intermediate = outerProcessor(stringParts);
        return eval(intermediate);
    };
}

var nestedConcatPayload = ['al', 'er', 't(', '"', 'Ne', 'st', 'ed', ' Co', 'nc', 'at', '"', ')', ';'];
var concatExecutor = NestedConcatWrapper(nestedConcatPayload);
concatExecutor();

function ConditionalConcatDecoder(selector, data1, data2) {
    var selectedData = selector ? data1 : data2;
    var part1 = StringConstructor.concatArray(selectedData.slice(0, 3));
    var part2 = StringConstructor.concatArray(selectedData.slice(3));
    return part1 + part2;
}

var conditionalConcatResult = ConditionalConcatDecoder(true, ['co', 'ns', 'ol', 'e.', 'lo', 'g(', '"', 'Tr', 'ue', '"', ')', ';'], ['co', 'ns', 'ol', 'e.', 'lo', 'g(', '"', 'Fa', 'ls', 'e', '"', ')', ';']);
eval(conditionalConcatResult);

function ArrayConcatDecoder(arrayOfArrays) {
    var result = '';
    for (var k = 0; k < arrayOfArrays.length; k++) {
        result += StringConstructor.concatArray(arrayOfArrays[k]);
    }
    return result;
}

var concatFragmentArrays = [
    ['al', 'er', 't('],
    ['"', 'Ar', 'ra', 'y'],
    [' Co', 'nc', 'at', '"'],
    [')', ';']
];

var concatCombinedResult = ArrayConcatDecoder(concatFragmentArrays);
eval(concatCombinedResult);

function RecursiveConcatDecoder(data, depth) {
    if (depth <= 0) {
        return StringConstructor.concatArray(data);
    }
    var processed = data.map(function(part) {
        return String.fromCharCode(part.charCodeAt(0) + 1 - 1) + part.substring(1);
    });
    return RecursiveConcatDecoder(processed, depth - 1);
}

var recursiveConcatData = ['co', 'ns', 'ol', 'e.', 'lo', 'g(', '"', 'Re', 'cu', 'rs', 'iv', 'e', '"', ')', ';'];
var recursiveConcatResult = RecursiveConcatDecoder(recursiveConcatData, 2);
eval(recursiveConcatResult);

function ChainedConcatExecution(data) {
    var processors = [
        function(d) { return StringConstructor.concatArray(d); },
        function(d) { return d; },
        function(d) { return eval(d); }
    ];
    
    var result = data;
    for (var l = 0; l < processors.length; l++) {
        result = processors[l](result);
    }
    return result;
}

var concatChainData = [['do', 'cu', 'me', 'nt.', 'ge', 'tE', 'le', 'me', 'nt', 'By', 'Id', '("', 'te', 'st', '")', ';']];
ChainedConcatExecution(concatChainData);

function DynamicConcatDecoderFactory() {
    return {
        decode: function(data) {
            return StringConstructor.concatArray(data);
        },
        execute: function(data) {
            return eval(this.decode(data));
        }
        };
}

var concatFactory = DynamicConcatDecoderFactory();
concatFactory.execute(['al', 'er', 't(', '"', 'Fa', 'ct', 'or', 'y', '"', ')', ';']);

function MultiLayerConcatDecoder(layer1, layer2, layer3) {
    var layerData = layer1;
    layerData = StringConstructor.concatArray(layerData);
    layerData = StringConstructor.reverseConcat(layerData.split(''));
    layerData = StringConstructor.reverseConcat(layerData.split(''));
    return eval(layerData);
}

var layeredConcatData = ['co', 'ns', 'ol', 'e.', 'lo', 'g(', '"', 'Mu', 'lt', 'i-', 'la', 'ye', 'r', '"', ')', ';'];
MultiLayerConcatDecoder(layeredConcatData, null, null);

function ObfuscatedConcatDecoderClass() {
    this.mode = "concat";
    this.decode = function(data) {
        if (this.mode === "concat") {
            return StringConstructor.concatArray(data);
        }
        return data.join('');
    };
    
    this.run = function(data) {
        return eval(this.decode(data));
    };
}

var concatDecoderInstance = new ObfuscatedConcatDecoderClass();
concatDecoderInstance.run(['do', 'cu', 'me', 'nt.', 'wr', 'it', 'e(', '"', 'Ob', 'je', 'ct', ' Or', 'ie', 'nt', 'ed', '"', ')', ';']);

function ComplexConcatExecutionFlow(parts) {
    var steps = {
        step1: function(data) { return data; },
        step2: function(data) { return StringConstructor.concatArray(data); },
        step3: function(data) { return data; },
        step4: function(data) { return eval(data); }
    };
    
    var pipeline = [steps.step1, steps.step2, steps.step3, steps.step4];
    var result = parts;
    
    for (var m = 0; m < pipeline.length; m++) {
        result = pipeline[m](result);
    }
    
    return result;
}

var complexConcatData = ['al', 'er', 't(', '"', 'Co', 'mp', 'le', 'x', ' Ex', 'ec', 'ut', 'io', 'n', ' Fl', 'ow', '"', ')', ';'];
ComplexConcatExecutionFlow(complexConcatData);

function MathematicalConcatProcessor(parts) {
    var result = '';
    for (var n = 0; n < parts.length; n++) {
        var part = parts[n];
        result = result + part;
    }
    return result;
}

var mathConcatData = [['co', 'ns', 'ol', 'e.', 'lo', 'g(', '"', 'Ma', 'th', 'em', 'at', 'ic', 'al', '"', ')', ';']];
eval(MathematicalConcatProcessor(mathConcatData[0]));

function ConcatStringManipulator(parts) {
    var result = '';
    for (var o = 0; o < parts.length; o++) {
        result = result.concat(parts[o]);
    }
    return result;
}

var manipulatedConcat = ['do', 'cu', 'me', 'nt.', 'cr', 'ea', 'te', 'Te', 'xt', 'No', 'de', '("', 'Ma', 'ni', 'pu', 'la', 'te', 'd', '")', ';'];
eval(ConcatStringManipulator(manipulatedConcat));

function ConcatArrayProcessor(arrayOfParts) {
    var combined = [];
    for (var p = 0; p < arrayOfParts.length; p++) {
        combined = combined.concat(arrayOfParts[p]);
    }
    return StringConstructor.concatArray(combined);
}

var concatParts = [["co", "ns"], ["ol", "e."], ["lo", "g("], ['"', "Ar", "ra", "y"], ['"', ")"], [";",]];
eval(ConcatArrayProcessor(concatParts));

function BitwiseConcatProcessor(parts) {
    var result = '';
    for (var q = 0; q < parts.length; q++) {
        var part = parts[q];
        result = result + part;
    }
    return result;
}

var bitwiseConcatData = [['al', 'er', 't(', '"', 'Bi', 'tw', 'is', 'e', '"', ')', ';']];
eval(BitwiseConcatProcessor(bitwiseConcatData[0]));

function AdvancedConcatenation(parts) {
    var result = '';
    var operations = [
        function(a, b) { return a + b; },
        function(a, b) { return b + a; }
    ];
    
    for (var r = 0; r < parts.length; r++) {
        var opIndex = r % operations.length;
        if (r === 0) {
            result = parts[r];
        } else {
            result = operations[opIndex](result, parts[r]);
        }
    }
    return result;
}

var advancedConcatData = ['co', 'ns', 'ol', 'e.', 'lo', 'g(', '"', 'Ad', 'va', 'nc', 'ed', '"', ')', ';'];
eval(AdvancedConcatenation(advancedConcatData));