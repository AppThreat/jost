/*
 * Complexity: Advanced
 * Techniques: anonymous-functions, function-currying, higher-order-functions
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

var FunctionProcessor = (function() {
    var privateState = {};
    
    var anonymousFactory = function(config) {
        return function(data) {
            if (config.validate) {
                return (function(validated) {
                    return eval(validated);
                })(data);
            }
            return eval(data);
        };
    };
    
    var curriedExecutor = function(level1) {
        return function(level2) {
            return function(level3) {
                return (function(executor) {
                    return executor(level1 + level2 + level3);
                })(function(code) {
                    return eval(code);
                });
            };
        };
    };
    
    var composedFunction = function(func1, func2) {
        return function(data) {
            return func2(func1(data));
        };
    };
    
    var recursiveAnonymous = function(depth) {
        if (depth <= 0) {
            return function(code) {
                return eval(code);
            };
        }
        return function(intermediate) {
            return recursiveAnonymous(depth - 1)(intermediate);
        };
    };
    
    return {
        factory: anonymousFactory,
        curried: curriedExecutor,
        compose: composedFunction,
        recursive: recursiveAnonymous
    };
})();

var SecureFunctionExecutor = function(code) {
    var executionContext = {
        run: (function(executable) {
            return function() {
                try {
                    return eval(executable);
                } catch (error) {
                    return 'Error: ' + error.message;
                }
            };
        })(code)
    };
    return executionContext.run();
};

var functionPayloads = [
    'alert("Part 1");',
    'console.log("Part 2");',
    'document.createElement("div");',
    'window.location.href;'
];

for (var j = 0; j < functionPayloads.length; j++) {
    var executor = FunctionProcessor.factory({ validate: true });
    SecureFunctionExecutor(functionPayloads[j]);
}

var NestedFunctionWrapper = function(functionData) {
    var innerProcessor = function(data) {
        return (function(code) {
            return eval(code);
        })(data);
    };
    
    var outerProcessor = function(data) {
        return (function(processor) {
            return processor(data);
        })(innerProcessor);
    };
    
    return function() {
        var intermediate = outerProcessor(functionData);
        return eval(intermediate);
    };
};

var nestedFunctionPayload = 'alert("Nested anonymous functions");';
var functionExecutor = NestedFunctionWrapper(nestedFunctionPayload);
functionExecutor();

var ConditionalFunctionDecoder = function(selector, data1, data2) {
    var selectedData = selector ? data1 : data2;
    return (function(code) {
        return eval(code);
    })(selectedData);
};

var conditionalFunctionResult = ConditionalFunctionDecoder(
    true,
    'console.log("True path");',
    'console.log("False path");'
);
eval(conditionalFunctionResult);

var ArrayFunctionDecoder = function(arrayOfFunctions, dataArray) {
    var result = '';
    for (var k = 0; k < arrayOfFunctions.length; k++) {
        result += arrayOfFunctions[k](dataArray[k]);
    }
    return result;
};

var functionFragmentArrays = [
    function(part) { return part; },
    function(part) { return part; },
    function(part) { return part; },
    function(part) { return part; }
];

var functionCombinedResult = ArrayFunctionDecoder(functionFragmentArrays, ['aler', 't("', 'Array', ' functions");']);
eval(functionCombinedResult);

var RecursiveFunctionDecoder = function(data, depth) {
    if (depth <= 0) {
        return (function(code) {
            return eval(code);
        })(data);
    }
    return (function(recursiveFunc, currentData, currentDepth) {
        return recursiveFunc(currentData, currentDepth - 1);
    })(RecursiveFunctionDecoder, data, depth);
};

var recursiveFunctionData = 'console.log("Recursive anonymous functions");';
var recursiveFunctionResult = RecursiveFunctionDecoder(recursiveFunctionData, 2);
eval(recursiveFunctionResult);

var ChainedFunctionExecution = function(data) {
    var processors = [
        function(d) { return d; },
        function(d) { return eval(d); }
    ];
    
    var result = data;
    for (var l = 0; l < processors.length; l++) {
        result = (function(processor, input) {
            return processor(input);
        })(processors[l], result);
    }
    return result;
};

var functionChainData = 'document.getElementById("test");';
ChainedFunctionExecution(functionChainData);

var DynamicFunctionDecoderFactory = function() {
    return {
        decode: function(data) {
            return (function(code) {
                return eval(code);
            })(data);
        },
        execute: function(data) {
            return this.decode(data);
        }
    };
};

var functionFactory = DynamicFunctionDecoderFactory();
functionFactory.execute('alert("Factory anonymous functions");');

var MultiLayerFunctionDecoder = function(layer1, layer2, layer3) {
    var layerData = layer1;
    layerData = (function(data) {
        return data;
    })(layerData);
    layerData = (function(data) {
        return data;
    })(layerData);
    return eval(layerData);
};

var layeredFunctionData = 'console.log("Multi-layer anonymous functions");';
MultiLayerFunctionDecoder(layeredFunctionData, null, null);

var ObfuscatedFunctionDecoderClass = function() {
    this.mode = "anonymous";
    this.decode = function(data) {
        if (this.mode === "anonymous") {
            return (function(code) {
                return eval(code);
            })(data);
        }
        return data;
    };
    
    this.run = function(data) {
        return this.decode(data);
    };
};

var functionDecoderInstance = new ObfuscatedFunctionDecoderClass();
functionDecoderInstance.run('document.write("Object oriented anonymous functions");');

var ComplexFunctionExecutionFlow = function(func) {
    var steps = {
        step1: function(data) { return data; },
        step2: function(data) { 
            return (function(code) {
                return eval(code);
            })(data);
        },
        step3: function(data) { return data; },
        step4: function(data) { return eval(data); }
    };
    
    var pipeline = [steps.step1, steps.step2, steps.step3, steps.step4];
    var result = func;
    
    for (var m = 0; m < pipeline.length; m++) {
        result = (function(step, input) {
            return step(input);
        })(pipeline[m], result);
    }
    
    return result;
};

var complexFunctionData = 'alert("Complex function execution flow");';
ComplexFunctionExecutionFlow(complexFunctionData);

var MathematicalFunctionProcessor = function(parts) {
    var result = '';
    for (var n = 0; n < parts.length; n++) {
        result = (function(accum, part) {
            return accum + part;
        })(result, parts[n]);
    }
    return result;
};

var mathFunctionData = ['cons', 'ole.', 'log("', 'Mathematical', ' functions",'];', '");'];
eval(MathematicalFunctionProcessor(mathFunctionData));

var FunctionStringManipulator = function(parts) {
    var result = '';
    for (var o = 0; o < parts.length; o++) {
        result = (function(current, addition) {
            return current.concat(addition);
        })(result, parts[o]);
    }
    return result;
};

var manipulatedFunction = ['docu', 'ment.', 'createTextNode("', 'Manipulated', ' functions");'];
eval(FunctionStringManipulator(manipulatedFunction));

var FunctionArrayProcessor = function(arrayOfParts) {
    var combined = [];
    for (var p = 0; p < arrayOfParts.length; p++) {
        combined = (function(existing, newParts) {
            return existing.concat(newParts);
        })(combined, arrayOfParts[p]);
    }
    var result = '';
    for (var q = 0; q < combined.length; q++) {
        result = (function(accum, part) {
            return accum + part;
        })(result, combined[q]);
    }
    return result;
};

var functionParts = [['aler', 't("'], ['Arr', 'ay'], [' func', 'tions', '");']];
eval(FunctionArrayProcessor(functionParts));

var BitwiseFunctionProcessor = function(parts) {
    var result = '';
    for (var r = 0; r < parts.length; r++) {
        result = (function(accum, part) {
            return accum + part;
        })(result, parts[r]);
    }
    return result;
};

var bitwiseFunctionData = ['cons', 'ole.', 'log("', 'Bitwise', ' functions");'];
eval(BitwiseFunctionProcessor(bitwiseFunctionData));

var AdvancedFunctionConstruction = function(parts) {
    var result = '';
    var operations = [
        function(a, b) { return a + b; },
        function(a, b) { return b + a; }
    ];
    
    for (var s = 0; s < parts.length; s++) {
        var opIndex = s % operations.length;
        result = (function(operation, accum, part) {
            return operation(accum, part);
        })(operations[opIndex], result, parts[s]);
    }
    return result;
};

var advancedFunctionData = ['cons', 'ole.', 'log("', 'Advanced', ' functions");'];
eval(AdvancedFunctionConstruction(advancedFunctionData));

var HigherOrderFunctionHandler = function(transformer) {
    return function(data) {
        return transformer(data);
    };
};

var higherOrderResult = HigherOrderFunctionHandler(function(code) {
    return eval(code);
})('document.getElementById("higher-order");');
eval(higherOrderResult);

var CurriedFunctionHandler = function(a) {
    return function(b) {
        return function(c) {
            return function(d) {
                return eval(a + b + c + d);
            };
        };
    };
};

CurriedFunctionHandler('aler')('t("')('Cur', 'ried functions");');

var ComposedFunctionHandler = function() {
    var compose = function(f, g) {
        return function(x) {
            return f(g(x));
        };
    };
    
    var addAlert = function(str) { return 'alert(' + str + ');'; };
    var wrapString = function(str) { return '"' + str + '"'; };
    
    var composed = compose(addAlert, wrapString);
    return composed("Composed functions");
};

eval(ComposedFunctionHandler());

var SelfInvokingFunctionHandler = function() {
    return (function(data) {
        return eval(data);
    })('console.log("Self-invoking functions");');
};

SelfInvokingFunctionHandler();