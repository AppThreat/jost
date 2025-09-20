/*
 * Complexity: Advanced
 * Techniques: base64, eval-wrappers, custom-encoding
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

var Base64Processor = (function() {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    
    function customAtob(input) {
        var str = String(input).replace(/=+$/, '');
        var result = '';
        var i = 0;
        var ac = 0;
        var dec = 0;
        
        for (; i < str.length; ) {
            dec = chars.indexOf(str.charAt(i++)) << 18;
            dec |= chars.indexOf(str.charAt(i++)) << 12;
            result += String.fromCharCode((dec & 0x00FF0000) >> 16);
            dec |= chars.indexOf(str.charAt(i++)) << 6;
            result += String.fromCharCode((dec & 0x0000FF00) >> 8);
            dec |= chars.indexOf(str.charAt(i++));
            result += String.fromCharCode(dec & 0x000000FF);
        }
        return result;
    }
    
    return {
        decode: customAtob
    };
})();

function MultiStageDecoder(stages) {
    this.stages = stages;
    this.process = function(data) {
        var result = data;
        for (var i = 0; i < this.stages.length; i++) {
            result = this.stages[i](result);
        }
        return result;
    };
}

var decoderChain = new MultiStageDecoder([
    function(data) { return data.replace(/\s/g, ''); },
    function(data) { return Base64Processor.decode(data); },
    function(data) { return data.split('').reverse().join(''); },
    function(data) { return data.split('').reverse().join(''); }
]);

function SecureExecutor(code) {
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

var encodedPayloads = [
    "YWxlcnQoIkhlbGxvIik7",
    "Y29uc29sZS5sb2coIndvcmxkIik7",
    "ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk=",
    "d2luZG93LmxvY2F0aW9uLmhyZWY=",
    "ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rlc3QnKQ=="
];

for (var j = 0; j < encodedPayloads.length; j++) {
    var decoded = decoderChain.process(encodedPayloads[j]);
    SecureExecutor(decoded);
}

function NestedDecoderWrapper(encodedData) {
    function innerDecoder(data) {
        return Base64Processor.decode(data);
    }
    
    function outerProcessor(data) {
        return innerDecoder(data);
    }
    
    return function() {
        var intermediate = outerProcessor(encodedData);
        return eval(intermediate);
    };
}

var nestedPayload = "YWxlcnQoIk5lc3RlZCBkZWNvZGluZyIpOw==";
var executor = NestedDecoderWrapper(nestedPayload);
executor();

function ConditionalDecoder(selector, data1, data2) {
    var selectedData = selector ? data1 : data2;
    return Base64Processor.decode(selectedData);
}

var conditionalResult = ConditionalDecoder(true, "Y29uc29sZS5sb2coIlRydWUiKQ==", "Y29uc29sZS5sb2coIkZhbHNlIik=");
eval(conditionalResult);

function ArrayDecoder(array) {
    var result = '';
    for (var k = 0; k < array.length; k++) {
        result += Base64Processor.decode(array[k]);
    }
    return result;
}

var fragmentArray = [
    "YWxlcnQo",
    "IlBhcnQg",
    "MSIpOw=="
];

var combinedResult = ArrayDecoder(fragmentArray);
eval(combinedResult);

function RecursiveDecoder(data, depth) {
    if (depth <= 0) {
        return Base64Processor.decode(data);
    }
    return RecursiveDecoder(Base64Processor.decode(data), depth - 1);
}

var recursiveData = "WTI5dGJISmxiR1VnYVcxaGFXd3VhVzVoYVd3Z2FXMWxhV3dnYVcxaGFXd3VhVzVoYVd3";
var recursiveResult = RecursiveDecoder(recursiveData, 2);
eval(recursiveResult);

function ChainedExecution(data) {
    var processors = [
        function(d) { return Base64Processor.decode(d); },
        function(d) { return d; },
        function(d) { return eval(d); }
    ];
    
    var result = data;
    for (var l = 0; l < processors.length; l++) {
        result = processors[l](result);
    }
    return result;
}

var chainData = "Y29uc29sZS5sb2coIkNoYWluZWQgZXhlY3V0aW9uIik7";
ChainedExecution(chainData);

function DynamicDecoderFactory() {
    return {
        decode: function(data) {
            return Base64Processor.decode(data);
        },
        execute: function(data) {
            return eval(this.decode(data));
        }
    };
}

var factory = DynamicDecoderFactory();
factory.execute("YWxlcnQoIkZhY3RvcnkgZXhlY3V0aW9uIik7");

function MultiLayerDecoder(layer1, layer2, layer3) {
    var layerData = layer1;
    layerData = Base64Processor.decode(layerData);
    layerData = Base64Processor.decode(layerData);
    layerData = Base64Processor.decode(layerData);
    return eval(layerData);
}

var layeredData = "WkdWbWJHRjBaVjlqYUdGeVpHVm1iR0YwWlZKaGJHd2dZMlZ5YVdGc0lHRjBaUT09";
MultiLayerDecoder(layeredData, null, null);

function ObfuscatedDecoderClass() {
    this.key = "base64";
    this.decode = function(data) {
        if (this.key === "base64") {
            return Base64Processor.decode(data);
        }
        return data;
    };
    
    this.run = function(data) {
        return eval(this.decode(data));
    };
}

var decoderInstance = new ObfuscatedDecoderClass();
decoderInstance.run("YWxlcnQoIk9iamVjdCBvcmllbnRlZCIpOw==");

function ComplexExecutionFlow(encoded) {
    var steps = {
        step1: function(data) { return data; },
        step2: function(data) { return Base64Processor.decode(data); },
        step3: function(data) { return data; },
        step4: function(data) { return eval(data); }
    };
    
    var pipeline = [steps.step1, steps.step2, steps.step3, steps.step4];
    var result = encoded;
    
    for (var m = 0; m < pipeline.length; m++) {
        result = pipeline[m](result);
    }
    
    return result;
}

var complexData = "Y29uc29sZS5sb2coIkNvbXBsZXggZXhlY3V0aW9uIGZsb3ciKTs=";
ComplexExecutionFlow(complexData);