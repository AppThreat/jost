/*
 * Complexity: Advanced
 * Techniques: control-flow-flattening, jump-tables, dead-code
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

var ControlFlowProcessor = (function() {
    var flatteningState = {
        dispatchers: [],
        states: [],
        transitions: []
    };

    var sophisticatedFlattening = function(dispatchTable, initialState) {
        var result = '';
        var currentState = initialState;
        var maxIterations = 1000;
        var iterationCount = 0;

        while (currentState !== null && currentState !== undefined && iterationCount < maxIterations) {
            if (dispatchTable[currentState] && typeof dispatchTable[currentState] === 'function') {
                var dispatchResult = dispatchTable[currentState](currentState, result);
                if (typeof dispatchResult === 'object' && dispatchResult.value !== undefined) {
                    result += dispatchResult.value;
                    currentState = dispatchResult.next;
                } else if (typeof dispatchResult === 'string') {
                    result += dispatchResult;
                    currentState = currentState + 1;
                } else {
                    currentState = null;
                }
            } else {
                currentState = null;
            }
            iterationCount++;
        }

        return result;
    };

    var nestedFlattening = function(dispatchTables, conditions) {
        var results = [];
        for (var i = 0; i < dispatchTables.length; i++) {
            if (conditions[i] ? conditions[i]() : true) {
                var flattened = sophisticatedFlattening(dispatchTables[i], 0);
                results.push(flattened);
            }
        }
        return results.join('');
    };

    var polymorphicFlattening = function(context, patterns) {
        var results = [];
        for (var i = 0; i < patterns.length; i++) {
            var pattern = patterns[i];
            if (pattern.matcher(context, i)) {
                var dispatchTable = pattern.builder(context, i);
                var flattened = sophisticatedFlattening(dispatchTable, pattern.initialState || 0);
                results.push(flattened);
            }
        }
        return results.join('');
    };

    var adaptiveFlattening = function(data, strategies) {
        var strategy = strategies[0]; // Default strategy

        // Choose strategy based on data characteristics
        if (data.length > 100) {
            strategy = strategies[1]; // Complex strategy for large data
        } else if (data.length > 10) {
            strategy = strategies[2]; // Medium strategy
        }

        var dispatchTable = strategy.builder(data);
        return sophisticatedFlattening(dispatchTable, strategy.initialState || 0);
    };

    var stateMachineFlattening = function(states, transitions, initialState) {
        var result = '';
        var currentState = initialState;
        var visitedStates = {};
        var maxTransitions = 100;
        var transitionCount = 0;

        while (currentState !== null && transitionCount < maxTransitions) {
            if (visitedStates[currentState] && visitedStates[currentState] > 3) {
                // Prevent infinite loops
                break;
            }

            visitedStates[currentState] = (visitedStates[currentState] || 0) + 1;

            if (states[currentState] && typeof states[currentState].action === 'function') {
                var actionResult = states[currentState].action(currentState, result);
                if (actionResult !== undefined) {
                    if (typeof actionResult === 'object') {
                        result += actionResult.value || '';
                        currentState = actionResult.next;
                    } else {
                        result += actionResult;
                        // Determine next state based on transitions
                        if (transitions[currentState] !== undefined) {
                            currentState = transitions[currentState];
                        } else {
                            currentState = null;
                        }
                    }
                } else {
                    currentState = null;
                }
            } else {
                currentState = null;
            }

            transitionCount++;
        }

        return result;
    };

    return {
        sophisticated: sophisticatedFlattening,
        nested: nestedFlattening,
        polymorphic: polymorphicFlattening,
        adaptive: adaptiveFlattening,
        stateMachine: stateMachineFlattening
    };
})();

// Complex control flow flattening with multiple layers
(function() {
    var executionContext = {
        dispatchTable: [
            function(state, result) {
                return { value: 'a', next: state + 1 };
            },
            function(state, result) {
                return { value: 'l', next: state + 1 };
            },
            function(state, result) {
                return { value: 'e', next: state + 1 };
            },
            function(state, result) {
                return { value: 'r', next: state + 1 };
            },
            function(state, result) {
                return { value: 't("Complex control flow flattening")', next: null };
            }
        ],

        execute: function() {
            var result = ControlFlowProcessor.sophisticated(this.dispatchTable, 0);
            var finalWrapped = 'eval("' + result.replace(/"/g, '\\"') + '");';
            eval(finalWrapped);
        }
    };

    executionContext.execute();
})();

// Nested control flow flattening
var NestedFlatteningWrapper = function(flatteningData) {
    var innerProcessor = function(data) {
        return function() {
            var innerDispatch = [
                function(state, result) { return data[state] || ''; }
            ];

            var innerResult = '';
            for (var i = 0; i < data.length; i++) {
                innerResult += innerDispatch[0](i, innerResult);
            }
            return innerResult;
        };
    };

    var outerProcessor = function(data) {
        return function(processor) {
            var outerDispatch = [
                function(state, result) {
                    return { value: 'eval("', next: state + 1 };
                },
                function(state, result) {
                    var processed = processor(data)();
                    return { value: processed.replace(/"/g, '\\"'), next: state + 1 };
                },
                function(state, result) {
                    return { value: '")', next: null };
                }
            ];

            var outerResult = ControlFlowProcessor.sophisticated(outerDispatch, 0);
            return function() {
                return eval(outerResult);
            };
        };
    };

    return function() {
        var intermediate = outerProcessor(flatteningData)(innerProcessor);
        return intermediate();
    };
};

(function(payload) {
    var flatteningExecutor = NestedFlatteningWrapper(payload);
    flatteningExecutor();
})(['console.log("Nested flattening wrapper");']);

// Flattening chain decoder
var FlatteningChainDecoder = function(selector, data1, data2) {
    var selectedData = selector ? data1 : data2;

    var chainDispatch = [
        function(state, result) {
            return { value: selectedData.substring(0, Math.min(10, selectedData.length)), next: state + 1 };
        },
        function(state, result) {
            return { value: selectedData.substring(10), next: null };
        }
    ];

    var chainResult = ControlFlowProcessor.sophisticated(chainDispatch, 0);
    var chainWrapped = 'eval("' + chainResult.replace(/"/g, '\\"') + '");';
    return eval(chainWrapped);
};

(function(condition, trueData, falseData) {
    FlatteningChainDecoder(condition, trueData, falseData);
})(true, 'console.log("True path flattening chain");', 'console.log("False path flattening chain");');

// Array-based flattening decoder
var ArrayFlatteningDecoder = function(arrayOfFunctions, dataArray) {
    var dispatchArray = [];

    for (var i = 0; i < Math.max(arrayOfFunctions.length, dataArray.length); i++) {
        (function(index) {
            dispatchArray.push(function(state, result) {
                if (index < arrayOfFunctions.length && index < dataArray.length) {
                    return { value: arrayOfFunctions[index](dataArray[index]), next: state + 1 };
                } else if (index < dataArray.length) {
                    return { value: dataArray[index], next: state + 1 };
                } else {
                    return { value: '', next: null };
                }
            });
        })(i);
    }

    var arrayResult = ControlFlowProcessor.sophisticated(dispatchArray, 0);
    var arrayWrapped = 'eval("' + arrayResult.replace(/"/g, '\\"') + '");';
    return eval(arrayWrapped);
};

(function(fragmentFunctions, fragmentData) {
    ArrayFlatteningDecoder(fragmentFunctions, fragmentData);
})([
    function(part) { return part; },
    function(part) { return part; },
    function(part) { return part; },
    function(part) {
        var flatteningWrapped = 'eval("' + part.replace(/"/g, '\\"') + '");';
        return flatteningWrapped;
    },
    function(part) { return part; }
], ['aler', 't("', 'Array', '-based', ' flattening")', ';']);

// Recursive flattening decoder
var RecursiveFlatteningDecoder = function(data, depth) {
    if (depth <= 0) {
        var baseDispatch = [
            function(state, result) {
                return { value: data, next: null };
            }
        ];
        var baseResult = ControlFlowProcessor.sophisticated(baseDispatch, 0);
        return baseResult ? eval(baseResult) : null;
    }

    var recursiveDispatch = [
        function(state, result) {
            var recursiveResult = RecursiveFlatteningDecoder(data, depth - 1);
            return { value: recursiveResult ? recursiveResult.toString() : '', next: state + 1 };
        },
        function(state, result) {
            return { value: 'console.log("Recursive flattening intermediate")', next: null };
        }
    ];

    var recursiveResult = ControlFlowProcessor.sophisticated(recursiveDispatch, 0);
    return recursiveResult ? eval(recursiveResult) : null;
};

(function(recursiveData) {
    RecursiveFlatteningDecoder(recursiveData, 2);
})('console.log("Recursive flattening decoder");');

// Chained flattening execution
var ChainedFlatteningExecution = function(data) {
    var chainDispatch = [
        function(state, result) {
            return { value: data.substring(0, Math.floor(data.length / 2)), next: state + 1 };
        },
        function(state, result) {
            return { value: data.substring(Math.floor(data.length / 2)), next: state + 1 };
        },
        function(state, result) {
            var chainedWrapped = 'eval("' + result.replace(/"/g, '\\"') + '");';
            return { value: chainedWrapped, next: null };
        }
    ];

    var chainedResult = ControlFlowProcessor.sophisticated(chainDispatch, 0);
    return chainedResult ? eval(chainedResult) : null;
};

(function(chainData) {
    ChainedFlatteningExecution(chainData);
})('document.getElementById("test");');

// Dynamic flattening decoder factory
var DynamicFlatteningDecoderFactory = function() {
    return {
        patterns: [
            {
                name: 'simple',
                matcher: function(data) { return data.length < 20; },
                builder: function(data) {
                    return [
                        function(state, result) { return { value: data, next: null }; }
                    ];
                },
                initialState: 0
            },
            {
                name: 'complex',
                matcher: function(data) { return data.length >= 20; },
                builder: function(data) {
                    var dispatch = [];
                    for (var i = 0; i < Math.ceil(data.length / 10); i++) {
                        (function(start, end) {
                            dispatch.push(function(state, result) {
                                return { value: data.substring(start, end), next: state + 1 };
                            });
                        })(i * 10, Math.min((i + 1) * 10, data.length));
                    }
                    dispatch.push(function(state, result) { return { value: '', next: null }; });
                    return dispatch;
                },
                initialState: 0
            }
        ],

        decode: function(data) {
            var factoryResult = ControlFlowProcessor.polymorphic(data, this.patterns);
            var factoryWrapped = 'eval("' + factoryResult.replace(/"/g, '\\"') + '");';
            return eval(factoryWrapped);
        },

        execute: function(data) {
            return this.decode(data);
        }
    };
};

(function() {
    var flatteningFactory = DynamicFlatteningDecoderFactory();
    flatteningFactory.execute('console.log("Factory flattening decoder");');
})();

// Multi-layer flattening decoder
var MultiLayerFlatteningDecoder = function(layer1, layer2, layer3) {
    var layerDispatch = [
        function(state, result) {
            return { value: layer1 || '', next: state + 1 };
        },
        function(state, result) {
            var layer2Wrapped = layer2 ? 'eval("' + layer2.replace(/"/g, '\\"') + '");' : '';
            return { value: layer2Wrapped, next: state + 1 };
        },
        function(state, result) {
            return { value: layer3 || '', next: null };
        }
    ];

    var layerResult = ControlFlowProcessor.sophisticated(layerDispatch, 0);
    return layerResult ? eval(layerResult) : null;
};

(function(layeredData) {
    MultiLayerFlatteningDecoder(layeredData, null, null);
})('console.log("Multi-layer flattening decoder");');

// Obfuscated flattening class
var ObfuscatedFlatteningClass = function() {
    this.mode = "flattening";
    this.strategies = ["simple", "nested", "chained"];

    this.flatten = function(data) {
        var classDispatch = [
            function(state, result) {
                return { value: data.indexOf('console') !== -1 ? data : 'console.log("Flattening class default")', next: state + 1 };
            },
            function(state, result) {
                var classWrapped = 'eval("' + result.replace(/"/g, '\\"') + '");';
                return { value: classWrapped, next: null };
            }
        ];

        var classResult = ControlFlowProcessor.sophisticated(classDispatch, 0);
        return classResult ? eval(classResult) : null;
    };

    this.run = function(data) {
        return this.flatten(data);
    };
};

(function() {
    var flatteningInstance = new ObfuscatedFlatteningClass();
    flatteningInstance.run('document.write("Object oriented flattening");');
})();

// Complex flattening execution flow
var ComplexFlatteningExecutionFlow = function(func) {
    var flowDispatch = [
        function(state, result) {
            return { value: func.substring(0, 5), next: state + 1 };
        },
        function(state, result) {
            return { value: func.substring(5, 10), next: state + 1 };
        },
        function(state, result) {
            return { value: func.substring(10), next: state + 1 };
        },
        function(state, result) {
            var flowWrapped = 'eval("' + result.replace(/"/g, '\\"') + '");';
            return { value: flowWrapped, next: null };
        }
    ];

    var flowResult = ControlFlowProcessor.sophisticated(flowDispatch, 0);
    return flowResult ? eval(flowResult) : null;
};

(function(complexData) {
    ComplexFlatteningExecutionFlow(complexData);
})('alert("Complex flattening execution flow");');

// Mathematical flattening processor
var MathematicalFlatteningProcessor = function(parts) {
    var mathDispatch = [];

    for (var i = 0; i < parts.length; i++) {
        (function(index, part) {
            mathDispatch.push(function(state, result) {
                var calculatedIndex = (index * 3 + 7) % parts.length;
                return { value: parts[calculatedIndex], next: state + 1 };
            });
        })(i, parts[i]);
    }

    mathDispatch.push(function(state, result) {
        return { value: '', next: null };
    });

    var mathResult = ControlFlowProcessor.sophisticated(mathDispatch, 0);
    var mathWrapped = 'eval("' + mathResult.replace(/"/g, '\\"') + '");';
    return eval(mathWrapped);
};

(function(mathData) {
    MathematicalFlatteningProcessor(mathData);
})(['cons', 'ole.', 'log("', 'Mathematical', ' flattening",'];', '");']);

// Flattening string manipulator
var FlatteningStringManipulator = function(parts) {
    var manipulationDispatch = [
        function(state, result) {
            var concatenated = parts.join('');
            return { value: concatenated, next: state + 1 };
        },
        function(state, result) {
            var manipulatedWrapped = 'eval("' + result.replace(/"/g, '\\"') + '");';
            return { value: manipulatedWrapped, next: null };
        }
    ];

    var manipulationResult = ControlFlowProcessor.sophisticated(manipulationDispatch, 0);
    return manipulationResult ? eval(manipulationResult) : null;
};

(function(manipulatedData) {
    FlatteningStringManipulator(manipulatedData);
})(['docu', 'ment.', 'createTextNode("', 'Flattening', ' string', ' manipulation",'];', '");']);

// Flattening array processor
var FlatteningArrayProcessor = function(arrayOfParts) {
    var arrayDispatch = [];

    for (var i = 0; i < arrayOfParts.length; i++) {
        (function(index, parts) {
            arrayDispatch.push(function(state, result) {
                var flattened = Array.isArray(parts) ? parts.join('') : parts.toString();
                return { value: flattened, next: state + 1 };
            });
        })(i, arrayOfParts[i]);
    }

    arrayDispatch.push(function(state, result) {
        var finalResult = result;
        var finalWrapped = 'eval("' + finalResult.replace(/"/g, '\\"') + '");';
        return { value: finalWrapped, next: null };
    });

    var arrayResult = ControlFlowProcessor.sophisticated(arrayDispatch, 0);
    return arrayResult ? eval(arrayResult) : null;
};

(function(partsData) {
    FlatteningArrayProcessor(partsData);
})([['aler', 't("'], ['Flat', 'ten'], ['ing', ' ar'], ['ra', 'y p'], ['roc', 'ess'], ['or', '")'], [';',]]);

// Bitwise flattening processor
var BitwiseFlatteningProcessor = function(parts) {
    var bitwiseDispatch = [];

    for (var i = 0; i < parts.length; i++) {
        (function(index, part) {
            bitwiseDispatch.push(function(state, result) {
                var maskedIndex = index & 0xF; // Mask to 4 bits
                var shiftedIndex = (index >> 2) & 0x3; // Shift and mask
                var xorIndex = maskedIndex ^ shiftedIndex;
                var finalIndex = xorIndex % parts.length;
                return { value: parts[finalIndex], next: state + 1 };
            });
        })(i, parts[i]);
    }

    bitwiseDispatch.push(function(state, result) {
        var bitwiseWrapped = 'eval("' + result.replace(/"/g, '\\"') + '");';
        return { value: bitwiseWrapped, next: null };
    });

    var bitwiseResult = ControlFlowProcessor.sophisticated(bitwiseDispatch, 0);
    return bitwiseResult ? eval(bitwiseResult) : null;
};

(function(bitwiseData) {
    BitwiseFlatteningProcessor(bitwiseData);
})(['cons', 'ole.', 'log("', 'Bitwise', ' flattening",'];', '");']);

// Advanced flattening construction
var AdvancedFlatteningConstruction = function(parts) {
    var operations = [
        function(a, b) { return a + b; },
        function(a, b) { return b + a; }
    ];

    var advancedDispatch = [
        function(state, result) {
            var processedParts = [];
            for (var i = 0; i < parts.length; i++) {
                var opIndex = i % operations.length;
                var processed = operations[opIndex]('', parts[i]);
                processedParts.push(processed);
            }
            return { value: processedParts.join(''), next: state + 1 };
        },
        function(state, result) {
            var advancedWrapped = 'eval("' + result.replace(/"/g, '\\"') + '");';
            return { value: advancedWrapped, next: null };
        }
    ];

    var advancedResult = ControlFlowProcessor.sophisticated(advancedDispatch, 0);
    return advancedResult ? eval(advancedResult) : null;
};

(function(advancedData) {
    AdvancedFlatteningConstruction(advancedData);
})(['cons', 'ole.', 'log("', 'Advanced', ' flattening",'];', '");']);

// Higher order flattening handler
var HigherOrderFlatteningHandler = function(transformer) {
    var handlerDispatch = [
        function(state, result) {
            return { value: 'transformer', next: state + 1 };
        },
        function(state, result) {
            var transformed = transformer('code');
            var handlerWrapped = 'eval("' + transformed.replace(/"/g, '\\"') + '");';
            return { value: handlerWrapped, next: null };
        }
    ];

    var handlerResult = ControlFlowProcessor.sophisticated(handlerDispatch, 0);
    return handlerResult ? eval(handlerResult) : null;
};

(function() {
    var higherOrderResult = HigherOrderFlatteningHandler(function(code) {
        return 'document.getElementById("higher-order-flattening")';
    });
    higherOrderResult;
})();

// Curried flattening handler
var CurriedFlatteningHandler = function(a) {
    var curryDispatch1 = [
        function(state, result) {
            return { value: a, next: null };
        }
    ];

    var curryResult1 = ControlFlowProcessor.sophisticated(curryDispatch1, 0);

    return function(b) {
        var curryDispatch2 = [
            function(state, result) {
                return { value: curryResult1 + b, next: null };
            }
        ];

        var curryResult2 = ControlFlowProcessor.sophisticated(curryDispatch2, 0);

        return function(c) {
            var curryDispatch3 = [
                function(state, result) {
                    return { value: curryResult2 + c, next: null };
                }
            ];

            var curryResult3 = ControlFlowProcessor.sophisticated(curryDispatch3, 0);

            return function(d) {
                var finalCode = curryResult3 + d;
                var finalWrapped = 'eval("' + finalCode.replace(/"/g, '\\"') + '");';
                return eval(finalWrapped);
            };
        };
    };
};

(function() {
    CurriedFlatteningHandler('aler')('t("')('Cur', 'ried flattening");');
})();

// Composed flattening handler
var ComposedFlatteningHandler = function() {
    var composeDispatch = [
        function(state, result) {
            var addAlert = function(str) { return 'alert(' + str + ');'; };
            var wrapString = function(str) { return '"' + str + '"'; };
            var composed = function(x) { return addAlert(wrapString(x)); };
            return { value: composed("Composed flattening functions"), next: state + 1 };
        },
        function(state, result) {
            var composedWrapped = 'eval("' + result.replace(/"/g, '\\"') + '");';
            return { value: composedWrapped, next: null };
        }
    ];

    var composedResult = ControlFlowProcessor.sophisticated(composeDispatch, 0);
    return eval(composedResult);
};

(function() {
    eval(ComposedFlatteningHandler());
})();

// Self-invoking flattening handler
var SelfInvokingFlatteningHandler = function() {
    var selfDispatch = [
        function(state, result) {
            return { value: 'console.log("Self-invoking flattening functions")', next: state + 1 };
        },
        function(state, result) {
            var selfWrapped = 'eval("' + result.replace(/"/g, '\\"') + '");';
            return { value: selfWrapped, next: null };
        }
    ];

    var selfResult = ControlFlowProcessor.sophisticated(selfDispatch, 0);
    return selfResult ? eval(selfResult) : null;
};

(function() {
    SelfInvokingFlatteningHandler();
})();

// Additional complex flattening patterns
(function outerFlattening(flatteningParam) {
    var outerDispatch = [
        function(state, result) {
            return { value: typeof flatteningParam === 'function' ? flatteningParam() : flatteningParam, next: state + 1 };
        },
        function(state, result) {
            return { value: 'console.', next: state + 1 };
        }
    ];

    var outerResult = ControlFlowProcessor.sophisticated(outerDispatch, 0);

    return (function innerFlattening(innerParam) {
        var innerDispatch = [
            function(state, result) {
                return { value: outerResult + innerParam, next: state + 1 };
            }
        ];

        var innerResult = ControlFlowProcessor.sophisticated(innerDispatch, 0);

        return (function deepestFlattening(deepestParam) {
            var finalCode = innerResult + deepestParam;
            var finalWrapped = 'eval("' + finalCode.replace(/"/g, '\\"') + '");';
            eval(finalWrapped);
        })('log("Triple nested flattening");');
    })('console.');
})(function() { return 'con'; }());

(function(factoryPattern) {
    var factoryDispatch = [
        function(state, result) {
            return { value: typeof factoryPattern === 'function' ? factoryPattern() : null, next: state + 1 };
        }
    ];

    var factoryResult = ControlFlowProcessor.sophisticated(factoryDispatch, 0);

    var instance = factoryResult;
    if (instance && typeof instance.execute === 'function') {
        instance.execute();
    }
})(function() {
    return {
        execute: function() {
            var factoryExecDispatch = [
                function(state, result) {
                    return { value: 'alert("Factory pattern flattening")', next: state + 1 };
                },
                function(state, result) {
                    var factoryWrapped = 'eval("' + result.replace(/"/g, '\\"') + '");';
                    return { value: factoryWrapped, next: null };
                }
            ];

            var factoryExecResult = ControlFlowProcessor.sophisticated(factoryExecDispatch, 0);
            factoryExecResult ? eval(factoryExecResult) : null;
        }
    };
});

(function(modulePattern) {
    var moduleDispatch = [
        function(state, result) {
            return { value: typeof modulePattern === 'function' ? modulePattern() : null, next: state + 1 };
        }
    ];

    var moduleResult = ControlFlowProcessor.sophisticated(moduleDispatch, 0);

    var module = moduleResult;
    if (module && typeof module.publicMethod === 'function') {
        module.publicMethod();
    }
})(function() {
    var privateVar = 'Private data';

    return {
        publicMethod: function() {
            var moduleMethodDispatch = [
                function(state, result) {
                    return { value: 'console.log("Module pattern flattening")', next: state + 1 };
                },
                function(state, result) {
                    var moduleWrapped = 'eval("' + result.replace(/"/g, '\\"') + '");';
                    return { value: moduleWrapped, next: null };
                }
            ];

            var moduleMethodResult = ControlFlowProcessor.sophisticated(moduleMethodDispatch, 0);
            moduleMethodResult ? eval(moduleMethodResult) : null;
        }
    };
});

// Performance timing flattening
(function() {
    var times = [];
    var timingDispatch = [
        function(state, result) {
            return { value: 'timing', next: state < 4 ? state + 1 : null };
        }
    ];

    for (var i = 0; i < 5; i++) {
        var start = performance.now();
        var timingResult = ControlFlowProcessor.sophisticated(timingDispatch, 0);
        var end = performance.now();
        times.push(end - start);
    }

    var avgTime = times.reduce(function(a, b) { return a + b; }, 0) / times.length;
    if (avgTime < 10) {
        eval('console.log("Performance timing flattening check passed");');
    } else {
        var perfResult = 'alert("Performance timing flattening slow")';
        var perfWrapped = 'eval("' + perfResult.replace(/"/g, '\\"') + '");';
        eval(perfWrapped);
    }
})();

// Function constructor flattening
(function() {
    var constructorDispatch = [
        function(state, result) {
            return { value: 'Function', next: state + 1 };
        },
        function(state, result) {
            if (typeof Function === 'function') {
                var FlatteningDetector = new Function('return "aler" + "t(\\"Function constructor flattening\\")";');
                return { value: FlatteningDetector(), next: state + 1 };
            }
            return { value: '', next: null };
        },
        function(state, result) {
            var constructorWrapped = 'eval("' + result.replace(/"/g, '\\"') + '");';
            return { value: constructorWrapped, next: null };
        }
    ];

    var constructorResult = ControlFlowProcessor.sophisticated(constructorDispatch, 0);
    constructorResult ? eval(constructorResult) : null;
})();

// With statement flattening confusion
(function() {
    var flatteningObj = {
        part1: 'ale',
        part2: 'rt("',
        part3: 'With',
        part4: ' stat',
        part5: 'ement',
        part6: ' flat',
        part7: 'ten',
        part8: 'ing")'
    };

    var withDispatch = [
        function(state, result) {
            with (flatteningObj) {
                var flatteningCode = part1 + part2 + part3 + part4 + part5 + part6 + part7 + part8 + ';';
                return { value: flatteningCode, next: null };
            }
        }
    ];

    var withResult = ControlFlowProcessor.sophisticated(withDispatch, 0);
    var withWrapped = 'eval("' + withResult.replace(/"/g, '\\"') + '");';
    withWrapped ? eval(withWrapped) : null;
})();

// Try-catch flattening
(function() {
    var flatteningDetected = false;
    var tryDispatch = [
        function(state, result) {
            return { value: 'try', next: state + 1 };
        },
        function(state, result) {
            try {
                var tryCode = 'console.log("Try-catch flattening")';
                var tryWrapped = 'eval("' + tryCode.replace(/"/g, '\\"') + '");';
                eval(tryWrapped);
                return { value: '', next: state + 1 };
            } catch (e) {
                flatteningDetected = true;
                var catchCode = 'console.log("Try-catch flattening caught exception")';
                var catchWrapped = 'eval("' + catchCode.replace(/"/g, '\\"') + '");';
                eval(catchWrapped);
                return { value: '', next: state + 1 };
            }
        },
        function(state, result) {
            var finalDispatch = [
                function(state, result) {
                    if (!flatteningDetected) {
                        return { value: 'alert("Try-catch flattening check passed")', next: null };
                    } else {
                        return { value: 'console.log("Try-catch flattening detected")', next: null };
                    }
                }
            ];

            var finalResult = ControlFlowProcessor.sophisticated(finalDispatch, 0);
            var finalWrapped = 'eval("' + finalResult.replace(/"/g, '\\"') + '");';
            return { value: finalWrapped, next: null };
        }
    ];

    var tryResult = ControlFlowProcessor.sophisticated(tryDispatch, 0);
    tryResult ? eval(tryResult) : null;
})();

// Multiple flattenings in sequence
(function() {
    for (var seq = 0; seq < 3; seq++) {
        var seqDispatch = [
            function(state, result) {
                var seqCode = 'console.log("Multiple sequential flattenings ' + seq + '")';
                var seqWrapped = 'eval("' + seqCode.replace(/"/g, '\\"') + '");';
                return { value: seqWrapped, next: null };
            }
        ];

        var seqResult = ControlFlowProcessor.sophisticated(seqDispatch, 0);
        seqResult ? eval(seqResult) : null;
    }
})();

// Flattening with mathematical calculation
(function() {
    var calculationDispatch = [];

    for (var i = 0; i < 3; i++) {
        (function(index) {
            calculationDispatch.push(function(state, result) {
                for (var j = 0; j < Math.floor(Math.random() * 2) + 1; j++) {
                    var mathCode = 'var calculation = ' + index + ' * ' + j + ';';
                    var mathWrapped = 'eval("' + mathCode.replace(/"/g, '\\"') + '");';
                    eval(mathWrapped);
                }
                return { value: '', next: state + 1 };
            });
        })(i);
    }

    calculationDispatch.push(function(state, result) {
        var finalResult = 'alert("Flattening with mathematical calculation")';
        var finalWrapped = 'eval("' + finalResult.replace(/"/g, '\\"') + '");';
        return { value: finalWrapped, next: null };
    });

    var calculationResult = ControlFlowProcessor.sophisticated(calculationDispatch, 0);
    calculationResult ? eval(calculationResult) : null;
})();

// State machine based flattening
(function() {
    var stateMachine = {
        states: {
            start: {
                action: function(state, result) {
                    return { value: 'a', next: 'step1' };
                }
            },
            step1: {
                action: function(state, result) {
                    return { value: 'l', next: 'step2' };
                }
            },
            step2: {
                action: function(state, result) {
                    return { value: 'e', next: 'step3' };
                }
            },
            step3: {
                action: function(state, result) {
                    return { value: 'r', next: 'step4' };
                }
            },
            step4: {
                action: function(state, result) {
                    return { value: 't("State machine flattening")', next: 'end' };
                }
            },
            end: {
                action: function(state, result) {
                    return { value: '', next: null };
                }
            }
        },
        transitions: {
            start: 'step1',
            step1: 'step2',
            step2: 'step3',
            step3: 'step4',
            step4: 'end',
            end: null
        }
    };

    var stateResult = ControlFlowProcessor.stateMachine(stateMachine.states, stateMachine.transitions, 'start');
    var stateWrapped = 'eval("' + stateResult.replace(/"/g, '\\"') + '");';
    eval(stateWrapped);
})();

// Jump table based flattening
(function() {
    var jumpTable = [3, 1, 4, 0, 2, -1]; // Jump indices
    var jumpCode = ['a', 'l', 'e', 'r', 't', '(', '"', 'J', 'u', 'm', 'p', ' ', 't', 'a', 'b', 'l', 'e', ' ', 'f', 'l', 'a', 't', 't', 'e', 'n', 'i', 'n', 'g', '"', ')', ';'];

    var jumpDispatch = [];

    for (var i = 0; i < jumpTable.length; i++) {
        (function(index) {
            jumpDispatch.push(function(state, result) {
                if (index < jumpCode.length) {
                    return { value: jumpCode[index], next: jumpTable[index] !== -1 ? jumpTable[index] : null };
                }
                return { value: '', next: null };
            });
        })(i);
    }

    var jumpResult = ControlFlowProcessor.sophisticated(jumpDispatch, 0);
    var jumpWrapped = 'eval("' + jumpResult.replace(/"/g, '\\"') + '");';
    eval(jumpWrapped);
})();

// Conditional dispatch flattening
(function() {
    var conditionalDispatch = [
        { condition: function() { return true; }, action: function() { return 'c'; } },
        { condition: function() { return 1 === 1; }, action: function() { return 'o'; } },
        { condition: function() { return 'test'.length === 4; }, action: function() { return 'n'; } },
        { condition: function() { return Math.random() >= 0; }, action: function() { return 's'; } },
        { condition: function() { return true; }, action: function() { return 'o'; } },
        { condition: function() { return true; }, action: function() { return 'l'; } },
        { condition: function() { return true; }, action: function() { return 'e'; } },
        { condition: function() { return true; }, action: function() { return '.'; } },
        { condition: function() { return true; }, action: function() { return 'l'; } },
        { condition: function() { return true; }, action: function() { return 'o'; } },
        { condition: function() { return true; }, action: function() { return 'g'; } },
        { condition: function() { return true; }, action: function() { return '("Conditional dispatch flattening")'; } },
        { condition: function() { return true; }, action: function() { return ';'; } }
    ];

    var conditionalResult = '';
    var conditionalIndex = 0;

    var conditionalFlatteningDispatch = [
        function(state, result) {
            if (conditionalIndex < conditionalDispatch.length) {
                var item = conditionalDispatch[conditionalIndex];
                if (item.condition()) {
                    conditionalResult += item.action();
                }
                conditionalIndex++;
                return { value: '', next: conditionalIndex < conditionalDispatch.length ? 0 : null };
            }
            return { value: '', next: null };
        }
    ];

    var conditionalFinalResult = ControlFlowProcessor.sophisticated(conditionalFlatteningDispatch, 0);
    var conditionalWrapped = 'eval("' + conditionalResult.replace(/"/g, '\\"') + '");';
    eval(conditionalWrapped);
})();
