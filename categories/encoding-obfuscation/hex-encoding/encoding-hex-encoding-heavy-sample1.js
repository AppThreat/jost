/*
 * Complexity: Advanced
 * Techniques: hex, character-codes, bitwise-operations
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

var HexProcessor = (function() {
    function parseHex(hex) {
        var result = '';
        for (var i = 0; i < hex.length; i += 2) {
            var byte = parseInt(hex.substr(i, 2), 16);
            result += String.fromCharCode(byte);
        }
        return result;
    }
    
    function reverseHex(hex) {
        var reversed = '';
        for (var j = hex.length - 2; j >= 0; j -= 2) {
            reversed += hex.substr(j, 2);
        }
        return reversed;
    }
    
    function xorHex(hex, key) {
        var result = '';
        for (var k = 0; k < hex.length; k += 2) {
            var byte = parseInt(hex.substr(k, 2), 16);
            var xored = byte ^ key;
            result += ('0' + xored.toString(16)).slice(-2);
        }
        return result;
    }
    
    return {
        decode: parseHex,
        reverse: reverseHex,
        xor: xorHex
    };
})();

function HexDecoderChain(transformers) {
    this.transformers = transformers;
    this.process = function(data) {
        var result = data;
        for (var i = 0; i < this.transformers.length; i++) {
            result = this.transformers[i](result);
        }
        return result;
    };
}

var hexTransformers = [
    function(data) { return data.replace(/\s/g, ''); },
    function(data) { return HexProcessor.reverse(data); },
    function(data) { return HexProcessor.reverse(data); },
    function(data) { return HexProcessor.decode(data); }
];

var hexChain = new HexDecoderChain(hexTransformers);

function SecureHexExecutor(code) {
    var context = {
        run: function() {
            try {
                return eval(code);
            } catch (error) {
                return 'Error: ' + error.message;
            }
        }
    };
    return context.run();
}

var hexPayloads = [
    "74282248656c6c6f22293b616c6572",
    "676f6c2e636e736f6c652e6c6f6728",
    "65617465456c656d656e7428226469",
    "6174696f6e2e687265663d22687474",
    "656c656d656e744279496428227465"
];

for (var j = 0; j < hexPayloads.length; j++) {
    var decoded = hexChain.process(hexPayloads[j]);
    SecureHexExecutor(decoded);
}

function NestedHexWrapper(hexData) {
    function innerHexDecoder(data) {
        return HexProcessor.decode(data);
    }
    
    function outerHexProcessor(data) {
        return innerHexDecoder(data);
    }
    
    return function() {
        var intermediate = outerHexProcessor(hexData);
        return eval(intermediate);
    };
}

var nestedHexPayload = "616c65727428224e657374656420686578206465636f64696e6722293b";
var hexExecutor = NestedHexWrapper(nestedHexPayload);
hexExecutor();

function ConditionalHexDecoder(selector, data1, data2) {
    var selectedData = selector ? data1 : data2;
    return HexProcessor.decode(selectedData);
}

var conditionalHexResult = ConditionalHexDecoder(true, "636f6e736f6c652e6c6f6728225472756522293b", "636f6e736f6c652e6c6f67282246616c736522293b");
eval(conditionalHexResult);

function ArrayHexDecoder(array) {
    var result = '';
    for (var k = 0; k < array.length; k++) {
        result += HexProcessor.decode(array[k]);
    }
    return result;
}

var hexFragmentArray = [
    "616c65727428",
    "225061727420",
    "3122293b"
];

var hexCombinedResult = ArrayHexDecoder(hexFragmentArray);
eval(hexCombinedResult);

function RecursiveHexDecoder(data, depth) {
    if (depth <= 0) {
        return HexProcessor.decode(data);
    }
    return RecursiveHexDecoder(HexProcessor.decode(data), depth - 1);
}

var recursiveHexData = "616c6572742822526563757273697665206465636f64696e6722293b";
var recursiveHexResult = RecursiveHexDecoder(recursiveHexData, 1);
eval(recursiveHexResult);

function ChainedHexExecution(data) {
    var processors = [
        function(d) { return HexProcessor.decode(d); },
        function(d) { return d; },
        function(d) { return eval(d); }
    ];
    
    var result = data;
    for (var l = 0; l < processors.length; l++) {
        result = processors[l](result);
    }
    return result;
}

var hexChainData = "636f6e736f6c652e6c6f672822436861696e65642068657820657865637574696f6e22293b";
ChainedHexExecution(hexChainData);

function DynamicHexDecoderFactory() {
    return {
        decode: function(data) {
            return HexProcessor.decode(data);
        },
        execute: function(data) {
            return eval(this.decode(data));
        }
    };
}

var hexFactory = DynamicHexDecoderFactory();
hexFactory.execute("616c6572742822466163746f72792068657820657865637574696f6e22293b");

function MultiLayerHexDecoder(layer1, layer2, layer3) {
    var layerData = layer1;
    layerData = HexProcessor.decode(layerData);
    layerData = HexProcessor.decode(layerData);
    layerData = HexProcessor.decode(layerData);
    return eval(layerData);
}

var layeredHexData = "616c65727428224d756c74692d6c6179657220686578206465636f64696e6722293b";
MultiLayerHexDecoder(layeredHexData, null, null);

function ObfuscatedHexDecoderClass() {
    this.key = "hex";
    this.decode = function(data) {
        if (this.key === "hex") {
            return HexProcessor.decode(data);
        }
        return data;
    };
    
    this.run = function(data) {
        return eval(this.decode(data));
    };
}

var hexDecoderInstance = new ObfuscatedHexDecoderClass();
hexDecoderInstance.run("616c65727428224f626a656374206f7269656e7465642068657822293b");

function ComplexHexExecutionFlow(hex) {
    var steps = {
        step1: function(data) { return data; },
        step2: function(data) { return HexProcessor.decode(data); },
        step3: function(data) { return data; },
        step4: function(data) { return eval(data); }
    };
    
    var pipeline = [steps.step1, steps.step2, steps.step3, steps.step4];
    var result = hex;
    
    for (var m = 0; m < pipeline.length; m++) {
        result = pipeline[m](result);
    }
    
    return result;
}

var complexHexData = "636f6e736f6c652e6c6f672822436f6d706c65782068657820657865637574696f6e20666c6f7722293b";
ComplexHexExecutionFlow(complexHexData);

function BitwiseHexProcessor(hex) {
    var result = '';
    for (var n = 0; n < hex.length; n += 2) {
        var byte = parseInt(hex.substr(n, 2), 16);
        var processed = (byte & 0xFF) | 0x00;
        result += String.fromCharCode(processed);
    }
    return result;
}

var bitwiseHexData = "626974776973652e6865782e70726f63657373696e67";
eval(BitwiseHexProcessor(bitwiseHexData));

function HexStringManipulator(hex) {
    var chars = hex.split('');
    var manipulated = '';
    for (var o = 0; o < chars.length; o += 2) {
        manipulated += chars[o] + (chars[o+1] || '');
    }
    return HexProcessor.decode(manipulated);
}

var manipulatedHex = "68656c6c6f2e776f726c64";
eval(HexStringManipulator(manipulatedHex));

function HexArrayProcessor(hexArray) {
    var combined = hexArray.join('');
    return HexProcessor.decode(combined);
}

var hexParts = ["61", "6c", "65", "72", "74", "28", "22", "41", "72", "72", "61", "79", "20", "68", "65", "78", "22", "29", "3b"];
eval(HexArrayProcessor(hexParts));