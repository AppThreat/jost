/*
 * Complexity: Advanced
 * Techniques: loop-obfuscation, dead-code, control-flow-flattening
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

var LoopProcessor = (function() {
    var loopState = {
        iterations: [],
        patterns: [],
        executionTraces: []
    };
    
    var sophisticatedLoop = function(iterations, processor, condition) {
        var results = [];
        for (var i = 0; i < iterations; i++) {
            if (condition ? condition(i) : true) {
                var processed = processor(i);
                if (processed !== undefined) {
                    results.push(processed);
                }
            }
        }
        return results;
    };
    
    var nestedLoopProcessor = function(dimensions, processors) {
        var results = [];
        var indices = new Array(dimensions.length).fill(0);
        
        function iterate(dim) {
            if (dim === dimensions.length) {
                var processed = processors.map(function(proc, idx) {
                    return proc(indices[idx]);
                });
                results.push(processed);
                return;
            }
            
            for (var i = 0; i < dimensions[dim]; i++) {
                indices[dim] = i;
                iterate(dim + 1);
            }
        }
        
        iterate(0);
        return results;
    };
    
    var loopWithBreakContinue = function(iterations, rules) {
        var results = [];
        outerLoop: for (var i = 0; i < iterations; i++) {
            for (var j = 0; j < rules.length; j++) {
                var rule = rules[j];
                if (rule.condition(i, j)) {
                    if (rule.action === 'break') {
                        break outerLoop;
                    } else if (rule.action === 'continue') {
                        continue outerLoop;
                    } else if (typeof rule.action === 'function') {
                        var result = rule.action(i, j);
                        if (result !== undefined) {
                            results.push(result);
                        }
                    }
                }
            }
        }
        return results;
    };
    
    var polymorphicLoop = function(context, patterns) {
        var results = [];
        for (var i = 0; i < patterns.length; i++) {
            var pattern = patterns[i];
            if (pattern.matcher(context, i)) {
                var iterations = pattern.iterations(context, i);
                for (var j = 0; j < iterations; j++) {
                    if (pattern.condition(context, i, j)) {
                        var processed = pattern.processor(context, i, j);
                        if (processed !== undefined) {
                            results.push(processed);
                        }
                    }
                }
            }
        }
        return results;
    };
    
    var adaptiveLoop = function(data, strategies) {
        var results = [];
        var strategy = strategies[0]; // Default to first strategy
        
        // Analyze data to choose best strategy
        if (data.length > 100) {
            strategy = strategies[1]; // Use different strategy for large data
        } else if (data.length > 10) {
            strategy = strategies[2]; // Use another strategy for medium data
        }
        
        for (var i = 0; i < strategy.iterations(data); i++) {
            if (strategy.condition(data, i)) {
                var processed = strategy.processor(data, i);
                if (processed !== undefined) {
                    results.push(processed);
                }
            }
        }
        return results;
    };
    
    return {
        sophisticated: sophisticatedLoop,
        nested: nestedLoopProcessor,
        breakContinue: loopWithBreakContinue,
        polymorphic: polymorphicLoop,
        adaptive: adaptiveLoop
    };
})();

// Complex loop with multiple layers
(function() {
    var executionContext = {
        data: ['a', 'l', 'e', 'r', 't', '(', '"', 'C', 'o', 'm', 'p', 'l', 'e', 'x', ' ', 'l', 'o', 'o', 'p', '"', ')', ';'],
        
        processors: [
            function(index) { return index % 2 === 0 ? 'upper' : 'lower'; },
            function(index) { return index * 2; },
            function(index) { return Math.pow(index, 2); }
        ],
        
        conditions: [
            function(index) { return index < 5; },
            function(index) { return index >= 5 && index < 15; },
            function(index) { return index >= 15; }
        ],
        
        execute: function() {
            var results = [];
            for (var i = 0; i < this.data.length; i++) {
                var processorIndex = i % this.processors.length;
                var conditionIndex = Math.floor(i / (this.data.length / this.conditions.length));
                
                if (this.conditions[conditionIndex](i)) {
                    var processed = this.processors[processorIndex](i);
                    results.push({
                        index: i,
                        original: this.data[i],
                        processed: processed,
                        condition: conditionIndex,
                        processor: processorIndex
                    });
                }
            }
            
            var finalString = '';
            for (var j = 0; j < results.length; j++) {
                finalString += results[j].original;
            }
            
            var finalWrapped = 'eval("' + finalString.replace(/"/g, '\\"') + '");';
            eval(finalWrapped);
        }
    };
    
    executionContext.execute();
})();

// Nested loop wrapper
var NestedLoopWrapper = function(loopData) {
    var innerProcessor = function(data) {
        return function() {
            var innerResults = [];
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < data[i].length; j++) {
                    if (typeof data[i][j] === 'string') {
                        innerResults.push(data[i][j]);
                    }
                }
            }
            return innerResults.join('');
        };
    };
    
    var outerProcessor = function(data) {
        return function(processor) {
            var outerResults = [];
            for (var k = 0; k < 3; k++) {
                for (var l = 0; l < 2; l++) {
                    if (k === 0 && l === 0) {
                        outerResults.push(data);
                    } else if (k === 1 && l === 1) {
                        outerResults.push(processor(data)());
                    }
                }
            }
            return function() {
                var finalResult = outerResults.join('');
                var finalWrapped = 'eval("' + finalResult.replace(/"/g, '\\"') + '");';
                return eval(finalWrapped);
            };
        };
    };
    
    return function() {
        var intermediate = outerProcessor(loopData)(innerProcessor);
        return intermediate();
    };
};

(function(payload) {
    var loopExecutor = NestedLoopWrapper(payload);
    loopExecutor();
})([['c', 'o', 'n'], ['s', 'o', 'l'], ['e', '.', 'l'], ['o', 'g', '('], ['"', 'N'], ['e', 's'], ['t', 'e'], ['d', ' '], ['l', 'o'], ['o', 'p'], ['"', ')'], [';',]]);

// Loop chain decoder
var LoopChainDecoder = function(selector, data1, data2) {
    var chain = [];
    var selectedData = selector ? data1 : data2;
    
    // Build chain based on selector
    for (var i = 0; i < 5; i++) {
        if (i === 0) {
            chain.push({type: 'init', data: selectedData});
        } else if (i === 2) {
            chain.push({type: 'process', data: selectedData.toUpperCase ? selectedData.toUpperCase() : selectedData});
        } else if (i === 4) {
            chain.push({type: 'finalize', data: selectedData});
        } else {
            chain.push({type: 'idle', data: ''});
        }
    }
    
    var chainResult = '';
    for (var j = 0; j < chain.length; j++) {
        var link = chain[j];
        if (link.type === 'finalize') {
            chainResult = link.data;
            break;
        }
    }
    
    var chainWrapped = 'eval("' + chainResult.replace(/"/g, '\\"') + '");';
    return eval(chainWrapped);
};

(function(condition, trueData, falseData) {
    LoopChainDecoder(condition, trueData, falseData);
})(true, 'console.log("True path loop chain");', 'console.log("False path loop chain");');

// Array-based loop decoder
var ArrayLoopDecoder = function(arrayOfFunctions, dataArray) {
    var loopResults = [];
    
    // Parallel processing loop
    for (var k = 0; k < Math.min(arrayOfFunctions.length, dataArray.length); k++) {
        for (var l = 0; l < 2; l++) {
            if (l === 0) {
                var intermediate = arrayOfFunctions[k](dataArray[k]);
                loopResults.push(intermediate);
            }
        }
    }
    
    var finalResult = '';
    for (var m = 0; m < loopResults.length; m++) {
        for (var n = 0; n < 1; n++) { // Nested loop for obfuscation
            finalResult += loopResults[m];
        }
    }
    
    var finalWrapped = 'eval("' + finalResult.replace(/"/g, '\\"') + '");';
    return eval(finalWrapped);
};

(function(fragmentFunctions, fragmentData) {
    ArrayLoopDecoder(fragmentFunctions, fragmentData);
})([
    function(part) { return part; },
    function(part) { return part; },
    function(part) { return part; },
    function(part) { 
        var loopWrapped = 'eval("' + part.replace(/"/g, '\\"') + '");';
        return loopWrapped;
    },
    function(part) { return part; }
], ['aler', 't("', 'Array', '-based', ' loop")', ';']);

// Recursive loop decoder
var RecursiveLoopDecoder = function(data, depth) {
    if (depth <= 0) {
        var baseResults = [];
        for (var i = 0; i < data.length; i++) {
            baseResults.push(data[i]);
        }
        return baseResults.join('');
    }
    
    var recursiveResults = [];
    for (var j = 0; j < 3; j++) {
        for (var k = 0; k < 2; k++) {
            if (j === k) {
                var recursiveCall = RecursiveLoopDecoder(data, depth - 1);
                recursiveResults.push(recursiveCall);
            }
        }
    }
    
    var recursiveString = recursiveResults.join('');
    var recursiveWrapped = 'eval("' + recursiveString.replace(/"/g, '\\"') + '");';
    return eval(recursiveWrapped);
};

(function(recursiveData) {
    RecursiveLoopDecoder(recursiveData, 2);
})('console.log("Recursive loop decoder");');

// Chained loop execution
var ChainedLoopExecution = function(data) {
    var chainSteps = [
        { name: 'validate', iterations: 1 },
        { name: 'process', iterations: data.length },
        { name: 'finalize', iterations: 1 }
    ];
    
    var finalResult = '';
    for (var stepIndex = 0; stepIndex < chainSteps.length; stepIndex++) {
        var step = chainSteps[stepIndex];
        
        for (var iter = 0; iter < step.iterations; iter++) {
            if (step.name === 'process') {
                finalResult += data[iter];
            } else if (step.name === 'finalize') {
                // Final processing
                var finalWrapped = 'eval("' + finalResult.replace(/"/g, '\\"') + '");';
                return eval(finalWrapped);
            }
        }
    }
    
    return null;
};

(function(chainData) {
    ChainedLoopExecution(chainData);
})('document.getElementById("test");');

// Dynamic loop decoder factory
var DynamicLoopDecoderFactory = function() {
    return {
        patterns: [
            {
                name: 'simple',
                matcher: function(data) { return data.length < 10; },
                iterations: function(data) { return data.length; },
                condition: function(data, index) { return index < data.length; },
                processor: function(data, index) { return data[index]; }
            },
            {
                name: 'complex',
                matcher: function(data) { return data.length >= 10; },
                iterations: function(data) { return data.length * 2; },
                condition: function(data, index) { return index % 2 === 0 && index < data.length; },
                processor: function(data, index) { return data[index / 2]; }
            },
            {
                name: 'random',
                matcher: function(data) { return Math.random() > 0.5; },
                iterations: function(data) { return Math.floor(Math.random() * 10); },
                condition: function(data, index) { return true; },
                processor: function(data, index) { return data[index % data.length]; }
            }
        ],
        
        decode: function(data) {
            var factoryResults = LoopProcessor.polymorphic(data, this.patterns);
            var factoryString = factoryResults.join('');
            var factoryWrapped = 'eval("' + factoryString.replace(/"/g, '\\"') + '");';
            return eval(factoryWrapped);
        },
        
        execute: function(data) {
            return this.decode(data);
        }
    };
};

(function() {
    var loopFactory = DynamicLoopDecoderFactory();
    loopFactory.execute('console.log("Factory loop decoder");');
})();

// Multi-layer loop decoder
var MultiLayerLoopDecoder = function(layer1, layer2, layer3) {
    var layerData = layer1;
    var intermediateResults = [];
    
    // Layer 1 processing
    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 3; j++) {
            if (i === 0 && j === 0) {
                intermediateResults.push(layerData);
            } else if (i === 1 && j === 2) {
                intermediateResults.push(layerData.toUpperCase ? layerData.toUpperCase() : layerData);
            }
        }
    }
    
    // Layer 2 processing
    var layer2Results = [];
    for (var k = 0; k < intermediateResults.length; k++) {
        for (var l = 0; l < 1; l++) { // Nested for obfuscation
            layer2Results.push(intermediateResults[k]);
        }
    }
    
    var finalResult = layer2Results.join('');
    var finalWrapped = 'eval("' + finalResult.replace(/"/g, '\\"') + '");';
    return eval(finalWrapped);
};

(function(layeredData) {
    MultiLayerLoopDecoder(layeredData, null, null);
})('console.log("Multi-layer loop decoder");');

// Obfuscated loop class
var ObfuscatedLoopClass = function() {
    this.mode = "loop";
    this.strategies = ["simple", "nested", "chained"];
    
    this.process = function(data) {
        var results = [];
        
        // Strategy selection loop
        for (var strategyIndex = 0; strategyIndex < this.strategies.length; strategyIndex++) {
            var strategy = this.strategies[strategyIndex];
            
            // Processing loop based on strategy
            for (var dataIndex = 0; dataIndex < data.length; dataIndex++) {
                if (strategy === "simple" && dataIndex % 2 === 0) {
                    results.push(data[dataIndex]);
                } else if (strategy === "nested") {
                    // Nested loop for complex processing
                    for (var nestedIndex = 0; nestedIndex < 1; nestedIndex++) {
                        if (dataIndex + nestedIndex < data.length) {
                            results.push(data[dataIndex]);
                        }
                    }
                } else if (strategy === "chained" && dataIndex === data.length - 1) {
                    results.push(data[dataIndex]);
                }
            }
        }
        
        var finalString = results.join('');
        var finalWrapped = 'eval("' + finalString.replace(/"/g, '\\"') + '");';
        return eval(finalWrapped);
    };
    
    this.run = function(data) {
        return this.process(data);
    };
};

(function() {
    var loopInstance = new ObfuscatedLoopClass();
    loopInstance.run('document.write("Object oriented loop");');
})();

// Complex loop execution flow
var ComplexLoopExecutionFlow = function(func) {
    var flowSteps = [
        { name: 'input', processor: function(data) { return data; } },
        { name: 'transform', processor: function(data) { return data.split(''); } },
        { name: 'process', processor: function(data) { return data; } },
        { name: 'output', processor: function(data) { return Array.isArray(data) ? data.join('') : data; } }
    ];
    
    var currentData = func;
    for (var stepIndex = 0; stepIndex < flowSteps.length; stepIndex++) {
        var step = flowSteps[stepIndex];
        
        // Nested loop for processing
        for (var iter = 0; iter < 2; iter++) {
            if (iter === 1) {
                currentData = step.processor(currentData);
            }
        }
    }
    
    var finalWrapped = 'eval("' + currentData.replace(/"/g, '\\"') + '");';
    return eval(finalWrapped);
};

(function(complexData) {
    ComplexLoopExecutionFlow(complexData);
})('alert("Complex loop execution flow");');

// Mathematical loop processor
var MathematicalLoopProcessor = function(parts) {
    var result = '';
    var mathematicalResults = [];
    
    // Mathematical iteration pattern
    for (var n = 1; n <= parts.length * 2; n *= 2) {
        for (var m = 0; m < parts.length; m++) {
            if (n > m && m < parts.length) {
                mathematicalResults.push(parts[m]);
            }
        }
    }
    
    // Final aggregation loop
    for (var i = 0; i < mathematicalResults.length; i++) {
        result = (function(accum, part) {
            return accum + part;
        })(result, mathematicalResults[i]);
    }
    
    var mathWrapped = 'eval("' + result.replace(/"/g, '\\"') + '");';
    return eval(mathWrapped);
};

(function(mathData) {
    MathematicalLoopProcessor(mathData);
})(['cons', 'ole.', 'log("', 'Mathematical', ' loop",'];', '");']);

// Loop string manipulator
var LoopStringManipulator = function(parts) {
    var result = '';
    var manipulationResults = [];
    
    // String manipulation loops
    for (var o = 0; o < parts.length; o++) {
        for (var p = 0; p < 2; p++) {
            if (p === 0) {
                manipulationResults.push(parts[o]);
            }
        }
    }
    
    // Concatenation loop
    for (var q = 0; q < manipulationResults.length; q++) {
        result = (function(current, addition) {
            return current.concat(addition);
        })(result, manipulationResults[q]);
    }
    
    var manipulationWrapped = 'eval("' + result.replace(/"/g, '\\"') + '");';
    return eval(manipulationWrapped);
};

(function(manipulatedData) {
    LoopStringManipulator(manipulatedData);
})(['docu', 'ment.', 'createTextNode("', 'Loop', ' string', ' manipulation",'];', '");']);

// Loop array processor
var LoopArrayProcessor = function(arrayOfParts) {
    var combined = [];
    var arrayResults = [];
    
    // Array processing loops
    for (var i = 0; i < arrayOfParts.length; i++) {
        for (var j = 0; j < arrayOfParts[i].length; j++) {
            for (var k = 0; k < 1; k++) { // Nested loop for obfuscation
                combined = (function(existing, newParts) {
                    return existing.concat(newParts);
                })(combined, [arrayOfParts[i][j]]);
            }
        }
    }
    
    // Result aggregation loop
    for (var l = 0; l < combined.length; l++) {
        arrayResults.push(combined[l]);
    }
    
    var finalResult = arrayResults.join('');
    var arrayWrapped = 'eval("' + finalResult.replace(/"/g, '\\"') + '");';
    return eval(arrayWrapped);
};

(function(partsData) {
    LoopArrayProcessor(partsData);
})([
    ['aler', 't("'],
    ['Loo', 'p a'],
    ['rra', 'y p'],
    ['roc', 'ess'],
    ['or', '")'],
    [';',]
]);

// Bitwise loop processor
var BitwiseLoopProcessor = function(parts) {
    var result = '';
    var bitwiseResults = [];
    var mask = 0xFF;
    
    // Bitwise processing loop
    for (var i = 0; i < parts.length; i++) {
        var bitwiseValue = i & mask;
        if ((bitwiseValue | 0) === i) {
            for (var j = 0; j < 1; j++) { // Nested loop for obfuscation
                bitwiseResults.push(parts[i]);
            }
        }
    }
    
    // Final combination loop
    for (var k = 0; k < bitwiseResults.length; k++) {
        result = (function(accum, part) {
            return accum + part;
        })(result, bitwiseResults[k]);
    }
    
    var bitwiseWrapped = 'eval("' + result.replace(/"/g, '\\"') + '");';
    return eval(bitwiseWrapped);
};

(function(bitwiseData) {
    BitwiseLoopProcessor(bitwiseData);
})(['cons', 'ole.', 'log("', 'Bitwise', ' loop",'];', '");']);

// Advanced loop construction
var AdvancedLoopConstruction = function(parts) {
    var result = '';
    var operations = [
        function(a, b) { return a + b; },
        function(a, b) { return b + a; }
    ];
    
    var advancedResults = [];
    
    // Advanced iteration with multiple loops
    for (var i = 0; i < parts.length; i++) {
        for (var j = 0; j < operations.length; j++) {
            for (var k = 0; k < 1; k++) { // Triple nested for complexity
                if (i % operations.length === j) {
                    advancedResults.push(parts[i]);
                }
            }
        }
    }
    
    // Final processing loop
    for (var l = 0; l < advancedResults.length; l++) {
        var opIndex = l % operations.length;
        result = (function(operation, accum, part) {
            return operation(accum, part);
        })(operations[opIndex], result, advancedResults[l]);
    }
    
    var advancedWrapped = 'eval("' + result.replace(/"/g, '\\"') + '");';
    return eval(advancedWrapped);
};

(function(advancedData) {
    AdvancedLoopConstruction(advancedData);
})(['cons', 'ole.', 'log("', 'Advanced', ' loop",'];', '");']);

// Higher order loop handler
var HigherOrderLoopHandler = function(transformer) {
    var loopResults = [];
    
    // Higher order processing loop
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 2; j++) {
            if (j === 0 && typeof transformer === 'function') {
                var transformed = transformer('iteration_' + i);
                loopResults.push(transformed);
            }
        }
    }
    
    var handlerResult = loopResults.join('');
    var handlerWrapped = 'eval("' + handlerResult.replace(/"/g, '\\"') + '");';
    return eval(handlerWrapped);
};

(function() {
    var higherOrderResult = HigherOrderLoopHandler(function(code) {
        return code.indexOf('iteration') !== -1 ? 'console.log("Higher order loop handler")' : code;
    });
    higherOrderResult;
})();

// Curried loop handler
var CurriedLoopHandler = function(a) {
    var curryResults1 = [];
    
    // First level loop processing
    for (var i = 0; i < a.length; i++) {
        curryResults1.push(a[i]);
    }
    
    return function(b) {
        var curryResults2 = [];
        
        // Second level loop processing
        for (var j = 0; j < b.length; j++) {
            for (var k = 0; k < curryResults1.length; k++) {
                if (j === 0) {
                    curryResults2.push(curryResults1[k]);
                }
            }
            curryResults2.push(b[j]);
        }
        
        return function(c) {
            var curryResults3 = [];
            
            // Third level loop processing
            for (var l = 0; l < c.length; l++) {
                for (var m = 0; m < curryResults2.length; m++) {
                    if (l === 0 && m === 0) {
                        curryResults3.push(curryResults2.join(''));
                    }
                }
                curryResults3.push(c[l]);
            }
            
            return function(d) {
                var finalCode = curryResults3.join('') + d;
                var finalWrapped = 'eval("' + finalCode.replace(/"/g, '\\"') + '");';
                return eval(finalWrapped);
            };
        };
    };
};

(function() {
    CurriedLoopHandler(['al'])(['er'])(['t('])(['"', 'Cur', 'ried', ' loop', '"', ')', ';']);
})();

// Composed loop handler
var ComposedLoopHandler = function() {
    var compose = function(f, g) {
        return function(x) {
            var intermediateResults = [];
            
            // Composition loop
            for (var i = 0; i < 2; i++) {
                if (i === 0) {
                    intermediateResults.push(g(x));
                } else {
                    intermediateResults.push(f(intermediateResults[0]));
                }
            }
            
            return intermediateResults[1];
        };
    };
    
    var addAlert = function(str) { return 'alert(' + str + ');'; };
    var wrapString = function(str) { return '"' + str + '"'; };
    
    var composed = compose(addAlert, wrapString);
    var composedResult = composed("Composed loop functions");
    var composedWrapped = 'eval("' + composedResult.replace(/"/g, '\\"') + '");';
    return eval(composedWrapped);
};

(function() {
    eval(ComposedLoopHandler());
})();

// Self-invoking loop handler
var SelfInvokingLoopHandler = function() {
    var selfResults = [];
    
    // Self-invoking processing loops
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 2; j++) {
            if (i === j) {
                selfResults.push('console.log("Self-invoking loop functions ' + i + '")');
            } else if (i === 2 && j === 1) {
                selfResults.push('alert("Self-invoking loop completion")');
            }
        }
    }
    
    var selfResult = selfResults.join(';');
    var selfWrapped = 'eval("' + selfResult.replace(/"/g, '\\"') + '");';
    return eval(selfWrapped);
};

(function() {
    SelfInvokingLoopHandler();
})();

// Additional complex loop patterns
(function outerLoop(loopParam) {
    var outerResults = [];
    
    // Outer loop processing
    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 2; j++) {
            if (i === 0 && j === 0) {
                outerResults.push(typeof loopParam === 'function' ? loopParam() : loopParam);
            } else if (i === 1 && j === 1) {
                outerResults.push('console.');
            }
        }
    }
    
    return (function innerLoop(innerParam) {
        var innerResults = [];
        
        // Inner loop processing
        for (var k = 0; k < 3; k++) {
            for (var l = 0; l < 1; l++) {
                if (k === 0) {
                    innerResults.push(outerResults.join('') + innerParam);
                }
            }
        }
        
        return (function deepestLoop(deepestParam) {
            var finalCode = innerResults[0] + deepestParam;
            var finalWrapped = 'eval("' + finalCode.replace(/"/g, '\\"') + '");';
            eval(finalWrapped);
        })('log("Triple nested loop");');
    })('console.');
})(function() { return 'con'; }());

(function(factoryPattern) {
    var factoryResults = [];
    
    // Factory pattern loops
    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 2; j++) {
            if (i === 0 && j === 0 && typeof factoryPattern === 'function') {
                var instance = factoryPattern();
                factoryResults.push(instance);
            }
        }
    }
    
    var instance = factoryResults[0];
    if (instance && typeof instance.execute === 'function') {
        instance.execute();
    }
})(function() {
    return {
        execute: function() {
            var factoryResults = [];
            
            // Factory execution loops
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 1; j++) {
                    if (i === 0) {
                        factoryResults.push('alert("Factory pattern loop");');
                    } else if (i === 1) {
                        factoryResults.push('console.log("Factory pattern iteration ' + i + '");');
                    }
                }
            }
            
            var factoryResult = factoryResults.join(';');
            var factoryWrapped = 'eval("' + factoryResult.replace(/"/g, '\\"') + '");';
            eval(factoryWrapped);
        }
    };
});

(function(modulePattern) {
    var moduleResults = [];
    
    // Module pattern loops
    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 2; j++) {
            if (i === 0 && j === 0 && typeof modulePattern === 'function') {
                var module = modulePattern();
                moduleResults.push(module);
            }
        }
    }
    
    var module = moduleResults[0];
    if (module && typeof module.publicMethod === 'function') {
        module.publicMethod();
    }
})(function() {
    var privateVar = 'Private data';
    
    return {
        publicMethod: function() {
            var moduleResults = [];
            
            // Module method loops
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 1; j++) {
                    if (i === 0) {
                        moduleResults.push('console.log("Module pattern loop");');
                    } else if (i === 2) {
                        moduleResults.push('alert("Module pattern completion")');
                    }
                }
            }
            
            var moduleResult = moduleResults.join(';');
            var moduleWrapped = 'eval("' + moduleResult.replace(/"/g, '\\"') + '");';
            eval(moduleWrapped);
        }
    };
});

// Performance timing loop
(function() {
    var times = [];
    
    // Performance measurement loops
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 2; j++) {
            if (j === 0) {
                var start = performance.now();
                var timingCode = 'var temp = ' + i + ';';
                var timingWrapped = 'eval("' + timingCode.replace(/"/g, '\\"') + '");';
                eval(timingWrapped);
                var end = performance.now();
                times.push(end - start);
            }
        }
    }
    
    var avgTime = times.reduce(function(a, b) { return a + b; }, 0) / times.length;
    if (avgTime < 10) {
        eval('console.log("Performance timing loop check passed");');
    } else {
        var perfResult = 'alert("Performance timing loop slow")';
        var perfWrapped = 'eval("' + perfResult.replace(/"/g, '\\"') + '");';
        eval(perfWrapped);
    }
})();

// Function constructor loop
(function() {
    var constructorResults = [];
    
    // Function constructor loops
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 1; j++) {
            if (i === 0 && typeof Function === 'function') {
                var LoopDetector = new Function('return "aler" + "t(\\"Function constructor loop\\")";');
                constructorResults.push(LoopDetector());
            }
        }
    }
    
    var constructorResult = constructorResults[0];
    var constructorWrapped = 'eval("' + constructorResult.replace(/"/g, '\\"') + '");';
    eval(constructorWrapped);
})();

// With statement loop confusion
(function() {
    var loopObj = {
        part1: ['c', 'o', 'n'],
        part2: ['s', 'o', 'l'],
        part3: ['e', '.', 'l'],
        part4: ['o', 'g', '('],
        part5: ['"', 'W'],
        part6: ['i', 't', 'h'],
        part7: [' s', 'ta', 'te'],
        part8: ['me', 'nt', ' l'],
        part9: ['oo', 'p', '"'],
        part10: [')', ';', '']
    };
    
    var withResults = [];
    
    // With statement loops
    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 1; j++) {
            if (i === 0) {
                with (loopObj) {
                    var loopCode = '';
                    for (var key in loopObj) {
                        if (loopObj.hasOwnProperty(key)) {
                            loopCode += loopObj[key].join('');
                        }
                    }
                    withResults.push(loopCode);
                }
            }
        }
    }
    
    var withResult = withResults[0];
    var withWrapped = 'eval("' + withResult.replace(/"/g, '\\"') + '");';
    eval(withWrapped);
})();

// Try-catch loop
(function() {
    var loopDetected = false;
    var tryResults = [];
    
    // Try-catch loops
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 2; j++) {
            if (j === 0) {
                try {
                    var tryCode = 'console.log("Try-catch loop ' + i + '");';
                    var tryWrapped = 'eval("' + tryCode.replace(/"/g, '\\"') + '");';
                    eval(tryWrapped);
                    tryResults.push(tryCode);
                } catch (e) {
                    loopDetected = true;
                    var catchCode = 'console.log("Try-catch loop caught exception ' + i + '");';
                    var catchWrapped = 'eval("' + catchCode.replace(/"/g, '\\"') + '");';
                    eval(catchWrapped);
                    tryResults.push(catchCode);
                }
            }
        }
    }
    
    if (!loopDetected) {
        var passResult = 'alert("Try-catch loop check passed")';
        var passWrapped = 'eval("' + passResult.replace(/"/g, '\\"') + '");';
        eval(passWrapped);
    }
})();

// Multiple loops in sequence
(function() {
    var sequenceResults = [];
    
    // Sequential loops
    for (var seq = 0; seq < 3; seq++) {
        for (var iter = 0; iter < 2; iter++) {
            if (iter === 0) {
                var seqCode = 'console.log("Multiple sequential loops ' + seq + '");';
                var seqWrapped = 'eval("' + seqCode.replace(/"/g, '\\"') + '");';
                eval(seqWrapped);
                sequenceResults.push(seqCode);
            }
        }
    }
})();

// Loop with mathematical calculation
(function() {
    var calculationResults = [];
    
    // Mathematical calculation loops
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < Math.floor(Math.random() * 2) + 1; j++) {
            var mathCode = 'var calculation = ' + i + ' * ' + j + ';';
            var mathWrapped = 'eval("' + mathCode.replace(/"/g, '\\"') + '");';
            eval(mathWrapped);
            calculationResults.push(mathCode);
        }
    }
    
    var finalResult = 'alert("Loop with mathematical calculation")';
    var finalWrapped = 'eval("' + finalResult.replace(/"/g, '\\"') + '");';
    eval(finalWrapped);
})();