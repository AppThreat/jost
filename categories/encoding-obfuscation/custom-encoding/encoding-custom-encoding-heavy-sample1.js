/*
 * Complexity: Advanced
 * Techniques: custom-encoding, character-codes, arithmetic-operations
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

var CustomEncoder = (function() {
    var defaultKey = 13;
    
    function caesarDecode(text, shift) {
        var result = '';
        for (var i = 0; i < text.length; i++) {
            var charCode = text.charCodeAt(i);
            var decoded = charCode - shift;
            result += String.fromCharCode(decoded);
        }
        return result;
    }
    
    function reverseText(text) {
        return text.split('').reverse().join('');
    }
    
    function xorDecode(text, key) {
        var result = '';
        for (var j = 0; j < text.length; j++) {
            var charCode = text.charCodeAt(j);
            var xored = charCode ^ key;
            result += String.fromCharCode(xored);
        }
        return result;
    }
    
    function multiStepDecode(text, steps) {
        var result = text;
        for (var k = 0; k < steps.length; k++) {
            result = steps[k](result);
        }
        return result;
    }
    
    return {
        caesar: caesarDecode,
        reverse: reverseText,
        xor: xorDecode,
        multiStep: multiStepDecode
    };
})();

function CustomDecoderPipeline(processors) {
    this.processors = processors;
    this.execute = function(data) {
        var result = data;
        for (var i = 0; i < this.processors.length; i++) {
            result = this.processors[i](result);
        }
        return result;
    };
}

var customProcessors = [
    function(data) { return data.replace(/\s/g, ''); },
    function(data) { return CustomEncoder.reverse(data); },
    function(data) { return CustomEncoder.caesar(data, 7); },
    function(data) { return CustomEncoder.reverse(data); },
    function(data) { return CustomEncoder.caesar(data, 7); }
];

var customPipeline = new CustomDecoderPipeline(customProcessors);

function SecureCustomExecutor(code) {
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

var customPayloads = [
    "7~|~7}~|~p~|~7",
    "7s|~7p|~7|~s~|~",
    "7p~|~s~|~7s|~7",
    "7}~|~p~|~7~}~7",
    "7|~s~|~7p|~7s|~"
];

for (var j = 0; j < customPayloads.length; j++) {
    var decoded = customPipeline.execute(customPayloads[j]);
    SecureCustomExecutor(decoded);
}

function NestedCustomWrapper(customData) {
    function innerCustomDecoder(data) {
        return CustomEncoder.caesar(data, 5);
    }
    
    function outerCustomProcessor(data) {
        return CustomEncoder.reverse(innerCustomDecoder(data));
    }
    
    return function() {
        var intermediate = outerCustomProcessor(customData);
        return eval(intermediate);
    };
}

var nestedCustomPayload = "7|~s~|~p~|~s~|~7";
var customExecutor = NestedCustomWrapper(nestedCustomPayload);
customExecutor();

function ConditionalCustomDecoder(selector, data1, data2) {
    var selectedData = selector ? data1 : data2;
    return CustomEncoder.caesar(CustomEncoder.reverse(selectedData), 9);
}

var conditionalCustomResult = ConditionalCustomDecoder(true, "7~}~7p~|~7s|~7", "7|~s~|~7p|~7~}~7");
eval(conditionalCustomResult);

function ArrayCustomDecoder(array) {
    var result = '';
    for (var k = 0; k < array.length; k++) {
        result += CustomEncoder.caesar(array[k], 3);
    }
    return result;
}

var customFragmentArray = [
    "7p~|~",
    "7s|~",
    "7}~|~"
];

var customCombinedResult = ArrayCustomDecoder(customFragmentArray);
eval(customCombinedResult);

function RecursiveCustomDecoder(data, depth, key) {
    if (depth <= 0) {
        return CustomEncoder.caesar(data, key);
    }
    return RecursiveCustomDecoder(CustomEncoder.reverse(CustomEncoder.caesar(data, key)), depth - 1, key);
}

var recursiveCustomData = "7s|~7p|~7|~s~|~";
var recursiveCustomResult = RecursiveCustomDecoder(recursiveCustomData, 2, 4);
eval(recursiveCustomResult);

function ChainedCustomExecution(data) {
    var processors = [
        function(d) { return CustomEncoder.reverse(d); },
        function(d) { return CustomEncoder.caesar(d, 6); },
        function(d) { return CustomEncoder.reverse(d); },
        function(d) { return eval(d); }
    ];
    
    var result = data;
    for (var l = 0; l < processors.length; l++) {
        result = processors[l](result);
    }
    return result;
}

var customChainData = "7~}~7p~|~7s|~7";
ChainedCustomExecution(customChainData);

function DynamicCustomDecoderFactory() {
    var factoryKey = 8;
    return {
        decode: function(data) {
            return CustomEncoder.caesar(data, factoryKey);
        },
        execute: function(data) {
            return eval(this.decode(data));
        }
    };
}

var customFactory = DynamicCustomDecoderFactory();
customFactory.execute("7|~s~|~p~|~s~|~7");

function MultiLayerCustomDecoder(layer1, layer2, layer3) {
    var layerData = layer1;
    layerData = CustomEncoder.caesar(layerData, 2);
    layerData = CustomEncoder.reverse(layerData);
    layerData = CustomEncoder.caesar(layerData, 2);
    return eval(layerData);
}

var layeredCustomData = "7p~|~s~|~7s|~7";
MultiLayerCustomDecoder(layeredCustomData, null, null);

function ObfuscatedCustomDecoderClass() {
    this.key = 11;
    this.decode = function(data) {
        if (this.key > 0) {
            return CustomEncoder.caesar(data, this.key);
        }
        return data;
    };
    
    this.run = function(data) {
        return eval(this.decode(data));
    };
}

var customDecoderInstance = new ObfuscatedCustomDecoderClass();
customDecoderInstance.run("7~}~7|~s~|~7p~|~7");

function ComplexCustomExecutionFlow(custom) {
    var steps = {
        step1: function(data) { return data; },
        step2: function(data) { return CustomEncoder.reverse(data); },
        step3: function(data) { return CustomEncoder.caesar(data, 10); },
        step4: function(data) { return eval(data); }
    };
    
    var pipeline = [steps.step1, steps.step2, steps.step3, steps.step4];
    var result = custom;
    
    for (var m = 0; m < pipeline.length; m++) {
        result = pipeline[m](result);
    }
    
    return result;
}

var complexCustomData = "7s|~7}~|~7p|~7";
ComplexCustomExecutionFlow(complexCustomData);

function MathematicalCustomDecoder(encoded) {
    var result = '';
    for (var n = 0; n < encoded.length; n++) {
        var charCode = encoded.charCodeAt(n);
        var calculated = Math.floor((charCode * 2 - 14) / 2);
        result += String.fromCharCode(calculated);
    }
    return result;
}

var mathCustomData = "88}88";
eval(MathematicalCustomDecoder(mathCustomData));

function CustomStringManipulator(custom) {
    var chars = custom.split('');
    var manipulated = '';
    for (var o = 0; o < chars.length; o++) {
        manipulated += chars[o];
    }
    return CustomEncoder.caesar(manipulated, 1);
}

var manipulatedCustom = "88}88";
eval(CustomStringManipulator(manipulatedCustom));

function CustomArrayProcessor(customArray) {
    var combined = customArray.join('');
    return CustomEncoder.caesar(combined, 12);
}

var customParts = ["8", "", "8", "}", "8", "", "8"];
eval(CustomArrayProcessor(customParts));

function BitwiseCustomProcessor(custom) {
    var result = '';
    for (var p = 0; p < custom.length; p++) {
        var charCode = custom.charCodeAt(p);
        var processed = (charCode & 0xFF) ^ 0x01;
        result += String.fromCharCode(processed);
    }
    return result;
}

var bitwiseCustomData = "99}99";
eval(BitwiseCustomProcessor(bitwiseCustomData));