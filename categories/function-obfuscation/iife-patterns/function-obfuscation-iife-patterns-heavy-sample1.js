/*
 * Complexity: Advanced
 * Techniques: iife, anonymous-functions, function-currying
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

var IIFEProcessor = (function() {
    var privateState = {};
    
    (function(initializer) {
        privateState.config = initializer();
    })(function() {
        return { validate: true, mode: 'iife' };
    });
    
    var factory = (function(config) {
        return function(data) {
            (function(validated) {
                return eval(validated);
            })(data);
        };
    })(privateState.config);
    
    var curriedExecutor = (function(level1) {
        return function(level2) {
            return function(level3) {
                (function(executor) {
                    return executor(level1 + level2 + level3);
                })(function(code) {
                    return eval(code);
                });
            };
        };
    })(''); // Empty first level
    
    var composedFunction = (function(func1, func2) {
        return function(data) {
            return (function(intermediate) {
                return func2(intermediate);
            })(func1(data));
        };
    })(function(data) { return data; }, function(data) { return eval(data); });
    
    var recursiveIIFE = (function(depth) {
        return function(data) {
            if (depth <= 0) {
                (function(code) {
                    return eval(code);
                })(data);
            } else {
                (function(recursiveFunc, currentData, currentDepth) {
                    return recursiveFunc(currentDepth - 1)(currentData);
                })(recursiveIIFE, data, depth);
            }
        };
    })(2);
    
    return {
        factory: factory,
        curried: curriedExecutor,
        compose: composedFunction,
        recursive: recursiveIIFE
    };
})();

(function(code) {
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
    executionContext.run();
})('alert("Part 1");');

(function(payloads) {
    for (var j = 0; j < payloads.length; j++) {
        (function(index) {
            var executor = IIFEProcessor.factory;
            (function(code) {
                eval(code);
            })(payloads[index]);
        })(j);
    }
})([
    'alert("Part 1");',
    'console.log("Part 2");',
    'document.createElement("div");',
    'window.location.href;'
]);

var NestedIIFEWrapper = (function(functionData) {
    var innerProcessor = (function(data) {
        return (function(code) {
            return eval(code);
        })(data);
    });
    
    var outerProcessor = (function(data) {
        return (function(processor) {
            return processor(data);
        })(innerProcessor);
    });
    
    return function() {
        (function(intermediate) {
            var finalResult = outerProcessor(intermediate);
            eval(finalResult);
        })(functionData);
    };
});

(function(payload) {
    var iifeExecutor = NestedIIFEWrapper(payload);
    iifeExecutor();
})('alert("Nested IIFE functions");');

var ConditionalIIFEDecoder = (function(selector, data1, data2) {
    var selectedData = selector ? data1 : data2;
    return (function(code) {
        return eval(code);
    })(selectedData);
});

(function(condition, trueData, falseData) {
    var conditionalResult = ConditionalIIFEDecoder(condition, trueData, falseData);
    eval(conditionalResult);
})(true, 'console.log("True path IIFE");', 'console.log("False path IIFE");');

var ArrayIIFEDecoder = (function(arrayOfFunctions, dataArray) {
    var result = '';
    (function(processors, data) {
        for (var k = 0; k < processors.length; k++) {
            (function(index) {
                result += processors[index](data[index]);
            })(k);
        }
    })(arrayOfFunctions, dataArray);
    return result;
});

(function(fragmentFunctions, fragmentData) {
    var iifeCombinedResult = ArrayIIFEDecoder(fragmentFunctions, fragmentData);
    eval(iifeCombinedResult);
})([
    function(part) { return part; },
    function(part) { return part; },
    function(part) { return part; },
    function(part) { return part; }
], ['aler', 't("', 'Array', ' IIFE");']);

var RecursiveIIFEDecoder = (function(data, depth) {
    if (depth <= 0) {
        return (function(code) {
            return eval(code);
        })(data);
    }
    return (function(recursiveFunc, currentData, currentDepth) {
        return recursiveFunc(currentData, currentDepth - 1);
    })(RecursiveIIFEDecoder, data, depth);
});

(function(recursiveData) {
    var recursiveResult = RecursiveIIFEDecoder(recursiveData, 2);
    eval(recursiveResult);
})('console.log("Recursive IIFE functions");');

var ChainedIIFEExecution = (function(data) {
    var processors = [
        function(d) { return d; },
        function(d) { return eval(d); }
    ];
    
    var result = data;
    (function(pipeline) {
        for (var l = 0; l < pipeline.length; l++) {
            (function(step, input) {
                result = step(input);
            })(pipeline[l], result);
        }
    })(processors);
    return result;
});

(function(chainData) {
    ChainedIIFEExecution(chainData);
})('document.getElementById("test");');

var DynamicIIFEDecoderFactory = (function() {
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
})();

(function() {
    var iifeFactory = DynamicIIFEDecoderFactory();
    iifeFactory.execute('alert("Factory IIFE functions");');
})();

var MultiLayerIIFEDecoder = (function(layer1, layer2, layer3) {
    var layerData = layer1;
    (function(data) {
        layerData = data;
    })(layerData);
    (function(data) {
        layerData = data;
    })(layerData);
    return eval(layerData);
});

(function(layeredData) {
    MultiLayerIIFEDecoder(layeredData, null, null);
})('console.log("Multi-layer IIFE functions");');

var ObfuscatedIIFEDecoderClass = (function() {
    this.mode = "iife";
    this.decode = function(data) {
        if (this.mode === "iife") {
            return (function(code) {
                return eval(code);
            })(data);
        }
        return data;
    };
    
    this.run = function(data) {
        return this.decode(data);
    };
});

(function() {
    var iifeDecoderInstance = new ObfuscatedIIFEDecoderClass();
    iifeDecoderInstance.run('document.write("Object oriented IIFE functions");');
})();

var ComplexIIFEExecutionFlow = (function(func) {
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
    
    (function(flow) {
        for (var m = 0; m < flow.length; m++) {
            (function(step, input) {
                result = step(input);
            })(flow[m], result);
        }
    })(pipeline);
    
    return result;
});

(function(complexData) {
    ComplexIIFEExecutionFlow(complexData);
})('alert("Complex IIFE execution flow");');

var MathematicalIIFEProcessor = (function(parts) {
    var result = '';
    (function(components) {
        for (var n = 0; n < components.length; n++) {
            (function(accum, part) {
                result = accum + part;
            })(result, components[n]);
        }
    })(parts);
    return result;
});

(function(mathData) {
    eval(MathematicalIIFEProcessor(mathData));
})(['cons', 'ole.', 'log("', 'Mathematical', ' IIFE",'];', '");']);

var IIFEStringManipulator = (function(parts) {
    var result = '';
    (function(components) {
        for (var o = 0; o < components.length; o++) {
            (function(current, addition) {
                result = current.concat(addition);
            })(result, components[o]);
        }
    })(parts);
    return result;
});

(function(manipulatedData) {
    eval(IIFEStringManipulator(manipulatedData));
})(['docu', 'ment.', 'createTextNode("', 'Manipulated', ' IIFE");']);

var IIFEArrayProcessor = (function(arrayOfParts) {
    var combined = [];
    (function(arrays) {
        for (var p = 0; p < arrays.length; p++) {
            (function(existing, newParts) {
                combined = existing.concat(newParts);
            })(combined, arrays[p]);
        }
    })(arrayOfParts);
    var result = '';
    (function(elements) {
        for (var q = 0; q < elements.length; q++) {
            (function(accum, part) {
                result = accum + part;
            })(result, elements[q]);
        }
    })(combined);
    return result;
});

(function(partsData) {
    eval(IIFEArrayProcessor(partsData));
})([['aler', 't("'], ['Arr', 'ay'], [' IIFE', '");']]);

var BitwiseIIFEProcessor = (function(parts) {
    var result = '';
    (function(components) {
        for (var r = 0; r < components.length; r++) {
            (function(accum, part) {
                result = accum + part;
            })(result, components[r]);
        }
    })(parts);
    return result;
});

(function(bitwiseData) {
    eval(BitwiseIIFEProcessor(bitwiseData));
})(['cons', 'ole.', 'log("', 'Bitwise', ' IIFE");']);

var AdvancedIIFEConstruction = (function(parts) {
    var result = '';
    var operations = [
        function(a, b) { return a + b; },
        function(a, b) { return b + a; }
    ];
    
    (function(components) {
        for (var s = 0; s < components.length; s++) {
            (function(index, part) {
                var opIndex = index % operations.length;
                (function(operation, accum, currentPart) {
                    result = operation(accum, currentPart);
                })(operations[opIndex], result, part);
            })(s, components[s]);
        }
    })(parts);
    return result;
});

(function(advancedData) {
    eval(AdvancedIIFEConstruction(advancedData));
})(['cons', 'ole.', 'log("', 'Advanced', ' IIFE");']);

var HigherOrderIIFEHandler = (function(transformer) {
    return function(data) {
        return (function(t, d) {
            return t(d);
        })(transformer, data);
    };
});

(function() {
    var higherOrderResult = HigherOrderIIFEHandler(function(code) {
        return eval(code);
    })('document.getElementById("higher-order-iife");');
    eval(higherOrderResult);
})();

var CurriedIIFEHandler = (function(a) {
    return function(b) {
        return function(c) {
            return function(d) {
                return (function(parts) {
                    return eval(parts[0] + parts[1] + parts[2] + parts[3]);
                })([a, b, c, d]);
            };
        };
    };
});

(function() {
    CurriedIIFEHandler('aler')('t("')('Cur', 'ried IIFE");');
})();

var ComposedIIFEHandler = (function() {
    var compose = function(f, g) {
        return function(x) {
            return (function(innerF, innerG, input) {
                return innerF(innerG(input));
            })(f, g, x);
        };
    };
    
    var addAlert = function(str) { return 'alert(' + str + ');'; };
    var wrapString = function(str) { return '"' + str + '"'; };
    
    var composed = compose(addAlert, wrapString);
    return (function(comp, data) {
        return comp(data);
    })(composed, "Composed IIFE functions");
});

(function() {
    eval(ComposedIIFEHandler());
})();

var SelfInvokingIIFEHandler = (function() {
    return (function(data) {
        return eval(data);
    })('console.log("Self-invoking IIFE functions");');
});

(function() {
    SelfInvokingIIFEHandler();
})();

// Additional complex IIFE patterns
(function outerIIFE(outerParam) {
    return (function innerIIFE(innerParam) {
        return (function deepestIIFE(deepestParam) {
            eval(outerParam + innerParam + deepestParam);
        })('log("Triple nested IIFE");');
    })('console.');
})('con');

(function(factoryPattern) {
    var instance = factoryPattern();
    instance.execute();
})(function() {
    return {
        execute: function() {
            (function(code) {
                eval(code);
            })('alert("Factory pattern IIFE");');
        }
    };
});

(function(modulePattern) {
    var module = modulePattern();
    module.publicMethod();
})(function() {
    var privateVar = 'Private data';
    
    return {
        publicMethod: function() {
            (function(data) {
                eval(data);
            })('console.log("Module pattern IIFE");');
        }
    };
});