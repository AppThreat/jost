/*
 * Complexity: Advanced
 * Techniques: variable-shadowing, scope-confusion, identifier-renaming
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

var ShadowingProcessor = (function() {
    var shadowingState = {
        scopes: [],
        variables: [],
        conflicts: []
    };

    var sophisticatedShadowing = function(scopes, variables) {
        var results = [];
        var shadowedVars = {};

        for (var i = 0; i < scopes.length; i++) {
            var scope = scopes[i];
            var scopeVars = variables[i] || [];

            for (var j = 0; j < scopeVars.length; j++) {
                var varName = scopeVars[j].name;
                var varValue = scopeVars[j].value;

                if (shadowedVars[varName]) {
                    // Variable is shadowed
                    results.push({
                        name: varName,
                        value: varValue,
                        scope: scope,
                        shadowed: true,
                        original: shadowedVars[varName]
                    });
                } else {
                    // First occurrence
                    shadowedVars[varName] = {
                        value: varValue,
                        scope: scope,
                        index: i
                    };
                    results.push({
                        name: varName,
                        value: varValue,
                        scope: scope,
                        shadowed: false
                    });
                }
            }
        }

        return results;
    };

    var nestedShadowing = function(depth, variableSets) {
        var results = [];

        function createScope(level, vars) {
            if (level <= 0) {
                return function() {
                    var localResults = [];
                    for (var i = 0; i < vars.length; i++) {
                        localResults.push(vars[i]);
                    }
                    return localResults;
                };
            }

            return function() {
                var nestedVars = [];
                // Shadow variables in nested scope
                for (var i = 0; i < vars.length; i++) {
                    nestedVars.push({
                        name: vars[i].name,
                        value: vars[i].value + '_shadowed_' + level,
                        level: level
                    });
                }

                var innerScope = createScope(level - 1, nestedVars);
                var scopeResults = innerScope();
                return scopeResults.concat(nestedVars);
            };
        }

        var topLevelScope = createScope(depth, variableSets[0] || []);
        results = topLevelScope();
        return results;
    };

    var polymorphicShadowing = function(context, patterns) {
        var results = [];
        for (var i = 0; i < patterns.length; i++) {
            var pattern = patterns[i];
            if (pattern.matcher(context, i)) {
                var shadowed = pattern.shadower(context, i);
                if (shadowed) {
                    results.push(shadowed);
                }
            }
        }
        return results;
    };

    var adaptiveShadowing = function(variables, strategies) {
        var strategy = strategies[0]; // Default strategy

        // Choose strategy based on variable characteristics
        if (variables.length > 100) {
            strategy = strategies[1]; // Complex strategy for many variables
        } else if (variables.some(function(v) { return v.nested; })) {
            strategy = strategies[2]; // Nested strategy
        } else if (variables.some(function(v) { return v.dynamic; })) {
            strategy = strategies[3]; // Dynamic strategy
        }

        return strategy.shadower(variables);
    };

    var recursiveShadowing = function(variables, depth) {
        if (depth <= 0) {
            return variables.map(function(v) {
                return {
                    name: v.name,
                    value: v.value,
                    shadowed: false
                };
            });
        }

        var shadowedVars = variables.map(function(v) {
            return {
                name: v.name,
                value: v.value + '_recursive_' + depth,
                shadowed: true,
                original: v
            };
        });

        return recursiveShadowing(shadowedVars, depth - 1);
    };

    return {
        sophisticated: sophisticatedShadowing,
        nested: nestedShadowing,
        polymorphic: polymorphicShadowing,
        adaptive: adaptiveShadowing,
        recursive: recursiveShadowing
    };
})();

// Complex variable shadowing with multiple layers
(function() {
    var executionContext = {
        scopes: ['global', 'module', 'function', 'block'],
        variables: [
            [{ name: 'data', value: 'global_data' }],
            [{ name: 'data', value: 'module_data' }],
            [{ name: 'data', value: 'function_data' }],
            [{ name: 'data', value: 'block_data' }]
        ],

        execute: function() {
            var shadowedResults = ShadowingProcessor.sophisticated(this.scopes, this.variables);
            var resultString = '';

            for (var i = 0; i < shadowedResults.length; i++) {
                var result = shadowedResults[i];
                if (result.shadowed) {
                    resultString += result.value + ';';
                }
            }

            var finalWrapped = 'eval("' + resultString.replace(/"/g, '\\"') + '");';
            eval(finalWrapped);
        }
    };

    executionContext.execute();
})();

// Nested variable shadowing wrapper
var NestedShadowingWrapper = function(shadowingData) {
    var innerProcessor = function(data) {
        return function() {
            var innerScope = function() {
                var data = 'inner_' + data;
                return data;
            };
            return innerScope();
        };
    };

    var outerProcessor = function(data) {
        return function(processor) {
            var outerScope = function() {
                var data = 'outer_' + data;
                var processed = processor(data)();
                var outerWrapped = 'eval("' + processed.replace(/"/g, '\\"') + '");';
                return function() {
                    return eval(outerWrapped);
                };
            };
            return outerScope();
        };
    };

    return function() {
        var intermediate = outerProcessor(shadowingData)(innerProcessor);
        return intermediate();
    };
};

(function(payload) {
    var shadowingExecutor = NestedShadowingWrapper(payload);
    shadowingExecutor();
})('console.log("Nested variable shadowing wrapper");');

// Shadowing chain decoder
var ShadowingChainDecoder = function(selector, data1, data2) {
    var selectedData = selector ? data1 : data2;

    var chainScope = function() {
        var selectedData = 'chain_' + selectedData;
        var chainWrapped = 'eval("' + selectedData.replace(/"/g, '\\"') + '");';
        return eval(chainWrapped);
    };

    return chainScope();
};

(function(condition, trueData, falseData) {
    ShadowingChainDecoder(condition, trueData, falseData);
})(true, 'console.log("True path shadowing chain");', 'console.log("False path shadowing chain");');

// Array-based shadowing decoder
var ArrayShadowingDecoder = function(arrayOfFunctions, dataArray) {
    var shadowingArray = [];

    for (var i = 0; i < dataArray.length; i++) {
        (function(index) {
            shadowingArray.push({
                processor: arrayOfFunctions[index] || function(d) { return d; },
                data: dataArray[index],
                scope: function() {
                    var data = 'array_' + this.data;
                    return this.processor(data);
                }
            });
        })(i);
    }

    var arrayResult = '';
    for (var j = 0; j < shadowingArray.length; j++) {
        arrayResult += shadowingArray[j].scope();
    }

    var arrayWrapped = 'eval("' + arrayResult.replace(/"/g, '\\"') + '");';
    return eval(arrayWrapped);
};

(function(fragmentFunctions, fragmentData) {
    ArrayShadowingDecoder(fragmentFunctions, fragmentData);
})([
    function(part) { return part; },
    function(part) { return part; },
    function(part) { return part; },
    function(part) {
        var shadowingWrapped = 'eval("' + part.replace(/"/g, '\\"') + '");';
        return shadowingWrapped;
    },
    function(part) { return part; }
], ['aler', 't("', 'Array', '-based', ' shadowing")', ';']);

// Recursive shadowing decoder
var RecursiveShadowingDecoder = function(data, depth) {
    if (depth <= 0) {
        var baseScope = function() {
            var data = 'base_' + data;
            return data;
        };
        var baseResult = baseScope();
        return baseResult ? eval(baseResult) : null;
    }

    var recursiveScope = function() {
        var data = 'recursive_' + data;
        var recursiveResult = RecursiveShadowingDecoder(data, depth - 1);
        return recursiveResult ? recursiveResult.toString() : '';
    };

    var recursiveResult = recursiveScope();
    return recursiveResult ? eval(recursiveResult) : null;
};

(function(recursiveData) {
    RecursiveShadowingDecoder(recursiveData, 2);
})('console.log("Recursive shadowing decoder");');

// Chained shadowing execution
var ChainedShadowingExecution = function(data) {
    var chainScope = function() {
        var level1 = 'chain1_' + data.substring(0, Math.floor(data.length / 2));
        var level2 = 'chain2_' + data.substring(Math.floor(data.length / 2));
        var chainedResult = level1 + level2;
        var chainedWrapped = 'eval("' + chainedResult.replace(/"/g, '\\"') + '");';
        return eval(chainedWrapped);
    };

    return chainScope();
};

(function(chainData) {
    ChainedShadowingExecution(chainData);
})('document.getElementById("test");');

// Dynamic shadowing decoder factory
var DynamicShadowingDecoderFactory = function() {
    return {
        patterns: [
            {
                name: 'simple',
                matcher: function(data) { return data.length < 50; },
                shadower: function(data) {
                    return {
                        data: data,
                        scope: function() {
                            var data = 'simple_' + this.data;
                            return data;
                        }
                    };
                }
            },
            {
                name: 'complex',
                matcher: function(data) { return data.length >= 50; },
                shadower: function(data) {
                    return {
                        segments: [],
                        initialize: function() {
                            for (var i = 0; i < data.length; i += 25) {
                                this.segments.push({
                                    data: 'complex_' + data.substring(i, Math.min(i + 25, data.length)),
                                    index: i
                                });
                            }
                        },
                        scope: function() {
                            this.initialize();
                            var result = '';
                            for (var i = 0; i < this.segments.length; i++) {
                                result += this.segments[i].data;
                            }
                            return result;
                        }
                    };
                }
            }
        ],

        decode: function(data) {
            for (var i = 0; i < this.patterns.length; i++) {
                var pattern = this.patterns[i];
                if (pattern.matcher(data)) {
                    var shadower = pattern.shadower(data);
                    var factoryResult = shadower.scope();
                    var factoryWrapped = 'eval("' + factoryResult.replace(/"/g, '\\"') + '");';
                    return eval(factoryWrapped);
                }
            }
            return null;
        },

        execute: function(data) {
            return this.decode(data);
        }
    };
};

(function() {
    var shadowingFactory = DynamicShadowingDecoderFactory();
    shadowingFactory.execute('console.log("Factory shadowing decoder");');
})();

// Multi-layer shadowing decoder
var MultiLayerShadowingDecoder = function(layer1, layer2, layer3) {
    var multiScope = function() {
        var layers = [
            { data: 'layer1_' + (layer1 || ''), level: 1 },
            { data: 'layer2_' + (layer2 ? 'eval("' + layer2.replace(/"/g, '\\"') + '");' : ''), level: 2 },
            { data: 'layer3_' + (layer3 || ''), level: 3 }
        ];

        layers.sort(function(a, b) { return a.level - b.level; });
        var result = '';
        for (var i = 0; i < layers.length; i++) {
            result += layers[i].data;
        }
        return result;
    };

    var layerResult = multiScope();
    return layerResult ? eval(layerResult) : null;
};

(function(layeredData) {
    MultiLayerShadowingDecoder(layeredData, null, null);
})('console.log("Multi-layer shadowing decoder");');

// Obfuscated shadowing class
var ObfuscatedShadowingClass = function() {
    this.mode = "shadowing";
    this.strategies = ["simple", "nested", "chained"];

    this.shadow = function(data) {
        var classScope = function() {
            var content = data;
            var format = this.determineFormat(content);
            this.determineFormat = function(content) {
                if (content.indexOf('atob') !== -1) return 'base64';
                if (content.indexOf('{') !== -1) return 'json';
                return 'raw';
            };
            var result = content;
            if (format === 'base64') {
                try {
                    result = atob(content);
                } catch (e) {
                    result = content;
                }
            }
            var classWrapped = 'eval("' + result.replace(/"/g, '\\"') + '");';
            return classWrapped;
        };

        var classResult = classScope.call(this);
        return classResult ? eval(classResult) : null;
    };

    this.run = function(data) {
        return this.shadow(data);
    };
};

(function() {
    var shadowingInstance = new ObfuscatedShadowingClass();
    shadowingInstance.run('document.write("Object oriented shadowing");');
})();

// Complex shadowing execution flow
var ComplexShadowingExecutionFlow = function(func) {
    var flowScope = function() {
        var chunks = [
            { data: func.substring(0, Math.floor(func.length / 3)), position: 0 },
            { data: func.substring(Math.floor(func.length / 3), Math.floor(2 * func.length / 3)), position: 1 },
            { data: func.substring(Math.floor(2 * func.length / 3)), position: 2 }
        ];

        chunks.sort(function(a, b) { return a.position - b.position; });
        var result = '';
        for (var i = 0; i < chunks.length; i++) {
            result += chunks[i].data;
        }
        var flowWrapped = 'eval("' + result.replace(/"/g, '\\"') + '");';
        return eval(flowWrapped);
    };

    return flowScope();
};

(function(complexData) {
    ComplexShadowingExecutionFlow(complexData);
})('alert("Complex shadowing execution flow");');

// Mathematical shadowing processor
var MathematicalShadowingProcessor = function(parts) {
    var mathScope = function() {
        var segments = [];
        for (var i = 0; i < parts.length; i++) {
            var position = (i * 7 + 13) % parts.length; // Mathematical positioning
            segments.push({
                data: 'math_' + parts[position],
                originalIndex: i,
                calculatedIndex: position
            });
        }

        // Sort by original index to restore order
        segments.sort(function(a, b) { return a.originalIndex - b.originalIndex; });
        var result = '';
        for (var i = 0; i < segments.length; i++) {
            result += segments[i].data;
        }
        var mathWrapped = 'eval("' + result.replace(/"/g, '\\"') + '");';
        return eval(mathWrapped);
    };

    return mathScope();
};

(function(mathData) {
    MathematicalShadowingProcessor(mathData);
})(['cons', 'ole.', 'log("', 'Mathematical', ' shadowing",'];', '");']);

// Shadowing string manipulator
var ShadowingStringManipulator = function(parts) {
    var manipulationScope = function() {
        var fragments = parts;
        var processedFragments = [];
        for (var i = 0; i < fragments.length; i++) {
            var fragment = fragments[i];
            // String manipulation: reverse each fragment
            var reversed = fragment.split('').reverse().join('');
            processedFragments.push('manip_' + reversed);
        }

        // Reverse the order of fragments to restore original
        processedFragments.reverse();
        var result = processedFragments.join('');
        var manipulationWrapped = 'eval("' + result.replace(/"/g, '\\"') + '");';
        return eval(manipulationWrapped);
    };

    return manipulationScope();
};

(function(manipulatedData) {
    ShadowingStringManipulator(manipulatedData);
})([';"', ')', 'g', 'n', 'i', 'w', 'o', 'd', 'a', 'h', 's', ' ', 'l', 'o', 'g', '.', 'e', 'l', 's', 'n', 'o', 'c', '(', 't', 'r', 'e', 'l', 'a']);

// Shadowing array processor
var ShadowingArrayProcessor = function(arrayOfParts) {
    var arrayScope = function() {
        var components = arrayOfParts;
        var flattened = [];
        for (var i = 0; i < components.length; i++) {
            var component = components[i];
            if (Array.isArray(component)) {
                for (var j = 0; j < component.length; j++) {
                    flattened.push('array_' + component[j]);
                }
            } else {
                flattened.push('array_' + component);
            }
        }
        var result = flattened.join('');
        var arrayWrapped = 'eval("' + result.replace(/"/g, '\\"') + '");';
        return eval(arrayWrapped);
    };

    return arrayScope();
};

(function(partsData) {
    ShadowingArrayProcessor(partsData);
})([['aler', 't("'], ['Shad', 'ow'], ['ing', ' ar'], ['ra', 'y'], [' pr', 'oc'], ['ess', 'or'], ['")', ';']]);

// Bitwise shadowing processor
var BitwiseShadowingProcessor = function(parts) {
    var bitwiseScope = function() {
        var elements = parts;
        var encoded = [];
        for (var i = 0; i < elements.length; i++) {
            var maskedIndex = i & 0xF; // 4-bit mask
            var shiftedIndex = (i >> 4) & 0xF; // Shift and mask
            var xorIndex = maskedIndex ^ shiftedIndex;
            encoded.push({
                data: 'bitwise_' + elements[i],
                encodedPosition: xorIndex
            });
        }

        // Sort by encoded position to decode
        encoded.sort(function(a, b) { return a.encodedPosition - b.encodedPosition; });
        var result = '';
        for (var i = 0; i < encoded.length; i++) {
            result += encoded[i].data;
        }
        var bitwiseWrapped = 'eval("' + result.replace(/"/g, '\\"') + '");';
        return eval(bitwiseWrapped);
    };

    return bitwiseScope();
};

(function(bitwiseData) {
    BitwiseShadowingProcessor(bitwiseData);
})(['cons', 'ole.', 'log("', 'Bitwise', ' shadowing",'];', '");']);

// Advanced shadowing construction
var AdvancedShadowingConstruction = function(parts) {
    var operations = [
        function(a, b) { return a + b; },
        function(a, b) { return b + a; }
    ];

    var advancedScope = function() {
        var pieces = parts;
        var transformed = [];
        for (var i = 0; i < pieces.length; i++) {
            var opIndex = i % operations.length;
            var transformedPiece = operations[opIndex]('advanced_', pieces[i]);
            transformed.push(transformedPiece);
        }
        var result = transformed.join('');
        var advancedWrapped = 'eval("' + result.replace(/"/g, '\\"') + '");';
        return eval(advancedWrapped);
    };

    return advancedScope();
};

(function(advancedData) {
    AdvancedShadowingConstruction(advancedData);
})(['cons', 'ole.', 'log("', 'Advanced', ' shadowing",'];', '");']);

// Higher order shadowing handler
var HigherOrderShadowingHandler = function(transformer) {
    var handlerScope = function() {
        var transformed = transformer('code');
        var handlerWrapped = 'eval("' + transformed.replace(/"/g, '\\"') + '");';
        return eval(handlerWrapped);
    };

    return handlerScope();
};

(function() {
    var higherOrderResult = HigherOrderShadowingHandler(function(code) {
        return 'document.getElementById("higher-order-shadowing")';
    });
    higherOrderResult;
})();

// Curried shadowing handler
var CurriedShadowingHandler = function(a) {
    var curryScope1 = function() {
        var data = 'curry1_' + a;
        return data;
    };

    var curryResult1 = curryScope1();

    return function(b) {
        var curryScope2 = function() {
            var data = 'curry2_' + curryResult1 + b;
            return data;
        };

        var curryResult2 = curryScope2();

        return function(c) {
            var curryScope3 = function() {
                var data = 'curry3_' + curryResult2 + c;
                return data;
            };

            var curryResult3 = curryScope3();

            return function(d) {
                var finalCode = curryResult3 + d;
                var finalWrapped = 'eval("' + finalCode.replace(/"/g, '\\"') + '");';
                return eval(finalWrapped);
            };
        };
    };
};

(function() {
    CurriedShadowingHandler('aler')('t("')('Cur', 'ried shadowing");');
})();

// Composed shadowing handler
var ComposedShadowingHandler = function() {
    var composeScope = function() {
        var compose = function(f, g) {
            return function(x) {
                return f(g(x));
            };
        };

        var addAlert = function(str) { return 'alert(' + str + ');'; };
        var wrapString = function(str) { return '"' + str + '"'; };
        var composed = compose(addAlert, wrapString);
        var composedResult = composed("Composed shadowing functions");
        var composedWrapped = 'eval("' + composedResult.replace(/"/g, '\\"') + '");';
        return eval(composedWrapped);
    };

    return composeScope();
};

(function() {
    eval(ComposedShadowingHandler());
})();

// Self-invoking shadowing handler
var SelfInvokingShadowingHandler = function() {
    var selfScope = function() {
        var content = 'console.log("Self-invoking shadowing functions")';
        var selfWrapped = 'eval("' + content.replace(/"/g, '\\"') + '");';
        return eval(selfWrapped);
    };

    return selfScope();
};

(function() {
    SelfInvokingShadowingHandler();
})();

// Additional complex shadowing patterns
(function outerShadowing(shadowingParam) {
    var outerScope = function() {
        var data = typeof shadowingParam === 'function' ? shadowingParam() : shadowingParam;
        return data;
    };

    var outerResult = outerScope();

    return (function innerShadowing(innerParam) {
        var innerScope = function() {
            var data = outerResult + innerParam;
            return data;
        };

        var innerResult = innerScope();

        return (function deepestShadowing(deepestParam) {
            var finalCode = innerResult + deepestParam;
            var finalWrapped = 'eval("' + finalCode.replace(/"/g, '\\"') + '");';
            eval(finalWrapped);
        })('log("Triple nested shadowing");');
    })('console.');
})(function() { return 'con'; }());

(function(factoryPattern) {
    var factoryScope = function() {
        var creator = factoryPattern;
        return typeof creator === 'function' ? creator() : null;
    };

    var factoryResult = factoryScope();

    var instance = factoryResult;
    if (instance && typeof instance.execute === 'function') {
        instance.execute();
    }
})(function() {
    return {
        execute: function() {
            var factoryExecScope = function() {
                var code = 'alert("Factory pattern shadowing")';
                var factoryWrapped = 'eval("' + code.replace(/"/g, '\\"') + '");';
                return eval(factoryWrapped);
            };

            var factoryExecResult = factoryExecScope();
            factoryExecResult;
        }
    };
});

(function(modulePattern) {
    var moduleScope = function() {
        var initializer = modulePattern;
        return typeof initializer === 'function' ? initializer() : null;
    };

    var moduleResult = moduleScope();

    var module = moduleResult;
    if (module && typeof module.publicMethod === 'function') {
        module.publicMethod();
    }
})(function() {
    var privateVar = 'Private data';

    return {
        publicMethod: function() {
            var moduleMethodScope = function() {
                var content = 'console.log("Module pattern shadowing")';
                var moduleWrapped = 'eval("' + content.replace(/"/g, '\\"') + '");';
                return eval(moduleWrapped);
            };

            var moduleMethodResult = moduleMethodScope();
            moduleMethodResult;
        }
    };
});

// Performance timing shadowing
(function() {
    var times = [];
    var timingScope = function() {
        for (var i = 0; i < 5; i++) {
            var start = performance.now();
            var timingCode = 'var temp = Math.random();';
            var timingWrapped = 'eval("' + timingCode.replace(/"/g, '\\"') + '");';
            eval(timingWrapped);
            var end = performance.now();
            times.push(end - start);
        }
        var avgTime = times.reduce(function(a, b) { return a + b; }, 0) / times.length;
        if (avgTime < 10) {
            return 'console.log("Performance timing shadowing check passed")';
        } else {
            return 'alert("Performance timing shadowing slow")';
        }
    };

    var timingResult = timingScope();
    var timingWrapped = 'eval("' + timingResult.replace(/"/g, '\\"') + '");';
    eval(timingWrapped);
})();

// Function constructor shadowing
(function() {
    var constructorScope = function() {
        if (typeof Function === 'function') {
            var ShadowingDetector = new Function('return "aler" + "t(\\"Function constructor shadowing\\")";');
            var constructorResult = ShadowingDetector();
            var constructorWrapped = 'eval("' + constructorResult.replace(/"/g, '\\"') + '");';
            return eval(constructorWrapped);
        }
        return '';
    };

    var constructorResult = constructorScope();
    constructorResult;
})();

// With statement shadowing confusion
(function() {
    var shadowingObj = {
        part1: 'ale',
        part2: 'rt("',
        part3: 'With',
        part4: ' stat',
        part5: 'ement',
        part6: ' shad',
        part7: 'owi',
        part8: 'ng")'
    };

    var withScope = function() {
        with (shadowingObj) {
            var shadowingCode = part1 + part2 + part3 + part4 + part5 + part6 + part7 + part8 + ';';
            var withWrapped = 'eval("' + shadowingCode.replace(/"/g, '\\"') + '");';
            return eval(withWrapped);
        }
    };

    var withResult = withScope();
    withResult;
})();

// Try-catch shadowing
(function() {
    var shadowingDetected = false;
    var tryScope = function() {
        try {
            var tryCode = 'console.log("Try-catch shadowing")';
            var tryWrapped = 'eval("' + tryCode.replace(/"/g, '\\"') + '");';
            eval(tryWrapped);
            return tryCode;
        } catch (e) {
            shadowingDetected = true;
            var catchCode = 'console.log("Try-catch shadowing caught exception")';
            var catchWrapped = 'eval("' + catchCode.replace(/"/g, '\\"') + '");';
            eval(catchWrapped);
            return catchCode;
        }
    };

    var tryResult = tryScope();
    if (!shadowingDetected) {
        eval('alert("Try-catch shadowing check passed")');
    } else {
        eval('console.log("Try-catch shadowing detected")');
    }
})();

// Multiple shadowings in sequence
(function() {
    for (var seq = 0; seq < 3; seq++) {
        var seqScope = function() {
            var seqCode = 'console.log("Multiple sequential shadowings ' + seq + '")';
            var seqWrapped = 'eval("' + seqCode.replace(/"/g, '\\"') + '");';
            return eval(seqWrapped);
        };

        var seqResult = seqScope();
        seqResult;
    }
})();

// Shadowing with mathematical calculation
(function() {
    var calculationScope = function() {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < Math.floor(Math.random() * 2) + 1; j++) {
                var mathCode = 'var calculation = ' + i + ' * ' + j + ';';
                var mathWrapped = 'eval("' + mathCode.replace(/"/g, '\\"') + '");';
                eval(mathWrapped);
            }
        }
        return 'alert("Shadowing with mathematical calculation")';
    };

    var calculationResult = calculationScope();
    var calcWrapped = 'eval("' + calculationResult.replace(/"/g, '\\"') + '");';
    eval(calcWrapped);
})();

// Complex nested shadowing
(function() {
    var globalVar = 'global';

    function level1() {
        var globalVar = 'level1';

        function level2() {
            var globalVar = 'level2';

            function level3() {
                var globalVar = 'level3';

                // Create shadowing confusion
                return function() {
                    var result = globalVar;
                    eval('console.log("' + result + ' shadowing")');
                };
            }

            return level3()();
        }

        return level2();
    }

    level1();

    // Additional shadowing at different levels
    {
        let globalVar = 'block';
        eval('alert("' + globalVar + ' scope shadowing")');
    }

    eval('console.log("' + globalVar + ' final scope")');
})();

// Function parameter and local variable shadowing
(function() {
    var shadowTest = 'outer';

    function testFunction(shadowTest) {
        var shadowTest = 'inner_local';

        if (true) {
            let shadowTest = 'block';
            eval('console.log("' + shadowTest + ' block shadowing")');
        }

        for (var shadowTest = 0; shadowTest < 2; shadowTest++) {
            if (shadowTest === 1) {
                eval('alert("' + shadowTest + ' loop shadowing")');
            }
        }

        eval('console.log("' + shadowTest + ' function shadowing")');
    }

    testFunction('parameter');
    eval('console.log("' + shadowTest + ' global shadowing")');
})();

// Class and method shadowing
(function() {
    var className = 'global_class';

    class TestClass {
        constructor() {
            var className = 'constructor';
            eval('console.log("' + className + ' constructor shadowing")');
        }

        methodName() {
            var className = 'method';
            eval('alert("' + className + ' method shadowing")');
        }

        static staticMethod() {
            var className = 'static';
            eval('console.log("' + className + ' static shadowing")');
        }
    }

    var className = 'local';
    var instance = new TestClass();
    instance.methodName();
    TestClass.staticMethod();
    eval('console.log("' + className + ' local shadowing")');
})();

// Arrow function and closure shadowing
(function() {
    var closureVar = 'outer_closure';

    var arrowFunction = (closureVar) => {
        var closureVar = 'arrow_param';

        var innerFunction = function() {
            var closureVar = 'inner_function';
            eval('console.log("' + closureVar + ' closure shadowing")');
        };

        innerFunction();
        eval('alert("' + closureVar + ' arrow shadowing")');
    };

    arrowFunction('parameter');
    eval('console.log("' + closureVar + ' outer shadowing")');
})();

// Generator function shadowing
(function() {
    var genVar = 'global_generator';

    function* generatorFunction() {
        var genVar = 'generator_local';
        yield function() {
            var genVar = 'yield_local';
            eval('console.log("' + genVar + ' generator shadowing")');
        };
    }

    var genVar = 'local';
    var gen = generatorFunction();
    var yielded = gen.next().value;
    yielded();
    eval('alert("' + genVar + ' local shadowing")');
})();

// Async function shadowing
(async function() {
    var asyncVar = 'global_async';

    var asyncFunction = async function() {
        var asyncVar = 'async_local';

        var promise = new Promise(function(resolve) {
            var asyncVar = 'promise_local';
            eval('console.log("' + asyncVar + ' promise shadowing")');
            resolve();
        });

        await promise;
        eval('alert("' + asyncVar + ' async shadowing")');
    };

    var asyncVar = 'local';
    await asyncFunction();
    eval('console.log("' + asyncVar + ' final shadowing")');
})();
