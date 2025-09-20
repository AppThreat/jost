/*
 * Complexity: Advanced
 * Techniques: hoisting-abuse, scope-confusion, identifier-renaming
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

var HoistingProcessor = (function() {
    var hoistingState = {
        variables: [],
        functions: [],
        scopes: []
    };

    var sophisticatedHoisting = function(declarations, usages) {
        var results = [];
        var hoistedVars = {};

        // Simulate hoisting by processing declarations first
        for (var i = 0; i < declarations.length; i++) {
            var decl = declarations[i];
            if (decl.type === 'var') {
                hoistedVars[decl.name] = {
                    value: decl.initializer !== undefined ? decl.initializer : undefined,
                    scope: decl.scope,
                    hoisted: true
                };
            }
        }

        // Process usages
        for (var j = 0; j < usages.length; j++) {
            var usage = usages[j];
            if (hoistedVars[usage.variable]) {
                results.push({
                    variable: usage.variable,
                    value: hoistedVars[usage.variable].value,
                    scope: hoistedVars[usage.variable].scope,
                    hoisted: true,
                    usage: usage.context
                });
            }
        }

        return results;
    };

    var nestedHoisting = function(depth, scopes) {
        var results = [];

        function createHoistedScope(level, parentVars) {
            if (level <= 0) {
                return function() {
                    var localResults = [];
                    for (var i = 0; i < parentVars.length; i++) {
                        localResults.push({
                            name: parentVars[i].name,
                            value: parentVars[i].value,
                            level: level
                        });
                    }
                    return localResults;
                };
            }

            return function() {
                var hoistedVars = [];
                // Hoist variables in nested scope
                for (var i = 0; i < parentVars.length; i++) {
                    hoistedVars.push({
                        name: parentVars[i].name,
                        value: parentVars[i].value + '_hoisted_' + level,
                        level: level
                    });
                }

                var innerScope = createHoistedScope(level - 1, hoistedVars);
                var scopeResults = innerScope();
                return scopeResults.concat(hoistedVars);
            };
        }

        var topLevelScope = createHoistedScope(depth, scopes[0] || []);
        results = topLevelScope();
        return results;
    };

    var polymorphicHoisting = function(context, patterns) {
        var results = [];
        for (var i = 0; i < patterns.length; i++) {
            var pattern = patterns[i];
            if (pattern.matcher(context, i)) {
                var hoisted = pattern.hoister(context, i);
                if (hoisted) {
                    results.push(hoisted);
                }
            }
        }
        return results;
    };

    var adaptiveHoisting = function(variables, strategies) {
        var strategy = strategies[0]; // Default strategy

        // Choose strategy based on variable characteristics
        if (variables.length > 100) {
            strategy = strategies[1]; // Complex strategy for many variables
        } else if (variables.some(function(v) { return v.nested; })) {
            strategy = strategies[2]; // Nested strategy
        } else if (variables.some(function(v) { return v.dynamic; })) {
            strategy = strategies[3]; // Dynamic strategy
        }

        return strategy.hoister(variables);
    };

    var recursiveHoisting = function(variables, depth) {
        if (depth <= 0) {
            return variables.map(function(v) {
                return {
                    name: v.name,
                    value: v.value,
                    hoisted: true
                };
            });
        }

        var hoistedVars = variables.map(function(v) {
            return {
                name: v.name,
                value: v.value + '_recursive_' + depth,
                hoisted: true,
                original: v
            };
        });

        return recursiveHoisting(hoistedVars, depth - 1);
    };

    return {
        sophisticated: sophisticatedHoisting,
        nested: nestedHoisting,
        polymorphic: polymorphicHoisting,
        adaptive: adaptiveHoisting,
        recursive: recursiveHoisting
    };
})();

// Complex hoisting abuse with multiple layers
(function() {
    var executionContext = {
        declarations: [
            { type: 'var', name: 'hoistedData', initializer: 'initial', scope: 'global' },
            { type: 'var', name: 'hoistedData', initializer: 'module', scope: 'module' },
            { type: 'var', name: 'hoistedData', initializer: 'function', scope: 'function' }
        ],
        usages: [
            { variable: 'hoistedData', context: 'early' },
            { variable: 'hoistedData', context: 'late' }
        ],

        execute: function() {
            var hoistedResults = HoistingProcessor.sophisticated(this.declarations, this.usages);
            var resultString = '';

            for (var i = 0; i < hoistedResults.length; i++) {
                var result = hoistedResults[i];
                if (result.hoisted) {
                    resultString += 'console.log("' + result.value + ' hoisting");';
                }
            }

            var finalWrapped = 'eval("' + resultString.replace(/"/g, '\\"') + '");';
            eval(finalWrapped);
        }
    };

    executionContext.execute();
})();

// Nested hoisting abuse wrapper
var NestedHoistingWrapper = function(hoistingData) {
    var innerProcessor = function(data) {
        return function() {
            var innerScope = function() {
                // Hoisting abuse: use variable before declaration
                try {
                    eval(innerVar);
                } catch (e) {
                    // Expected: innerVar is undefined
                }
                var innerVar = 'inner_' + data;
                return innerVar;
            };
            return innerScope();
        };
    };

    var outerProcessor = function(data) {
        return function(processor) {
            var outerScope = function() {
                // Hoisting abuse: variable declared after use
                eval(outerVar || 'undefined');
                var outerVar = 'outer_' + data;
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
        var intermediate = outerProcessor(hoistingData)(innerProcessor);
        return intermediate();
    };
};

(function(payload) {
    var hoistingExecutor = NestedHoistingWrapper(payload);
    hoistingExecutor();
})('console.log("Nested hoisting abuse wrapper");');

// Hoisting chain decoder
var HoistingChainDecoder = function(selector, data1, data2) {
    var selectedData = selector ? data1 : data2;

    var chainScope = function() {
        // Hoisting abuse: use function before declaration
        try {
            eval(chainFunction());
        } catch (e) {
            // Expected: chainFunction is not yet defined as expression
        }

        var chainFunction = function() {
            var selectedData = 'chain_' + selectedData;
            var chainWrapped = 'eval("' + selectedData.replace(/"/g, '\\"') + '");';
            return chainWrapped;
        };

        return eval(chainFunction());
    };

    return chainScope();
};

(function(condition, trueData, falseData) {
    HoistingChainDecoder(condition, trueData, falseData);
})(true, 'console.log("True path hoisting chain");', 'console.log("False path hoisting chain");');

// Array-based hoisting decoder
var ArrayHoistingDecoder = function(arrayOfFunctions, dataArray) {
    var hoistingArray = [];

    // Hoisting abuse: access array before full initialization
    try {
        eval(hoistingArray[0] ? hoistingArray[0].data : 'undefined');
    } catch (e) {
        // Expected: array is empty
    }

    for (var i = 0; i < dataArray.length; i++) {
        (function(index) {
            hoistingArray.push({
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
    for (var j = 0; j < hoistingArray.length; j++) {
        arrayResult += hoistingArray[j].scope();
    }

    var arrayWrapped = 'eval("' + arrayResult.replace(/"/g, '\\"') + '");';
    return eval(arrayWrapped);
};

(function(fragmentFunctions, fragmentData) {
    ArrayHoistingDecoder(fragmentFunctions, fragmentData);
})([
    function(part) { return part; },
    function(part) { return part; },
    function(part) { return part; },
    function(part) {
        var hoistingWrapped = 'eval("' + part.replace(/"/g, '\\"') + '");';
        return hoistingWrapped;
    },
    function(part) { return part; }
], ['aler', 't("', 'Array', '-based', ' hoisting")', ';']);

// Recursive hoisting decoder
var RecursiveHoistingDecoder = function(data, depth) {
    if (depth <= 0) {
        var baseScope = function() {
            // Hoisting abuse: use variable before declaration
            try {
                eval(baseVar);
            } catch (e) {
                // Expected: baseVar is undefined
            }
            var baseVar = 'base_' + data;
            return baseVar;
        };
        var baseResult = baseScope();
        return baseResult ? eval(baseResult) : null;
    }

    var recursiveScope = function() {
        // Hoisting abuse: recursive variable usage
        try {
            eval(recursiveVar);
        } catch (e) {
            // Expected: recursiveVar is undefined
        }
        var recursiveVar = 'recursive_' + data;
        var recursiveResult = RecursiveHoistingDecoder(recursiveVar, depth - 1);
        return recursiveResult ? recursiveResult.toString() : '';
    };

    var recursiveResult = recursiveScope();
    return recursiveResult ? eval(recursiveResult) : null;
};

(function(recursiveData) {
    RecursiveHoistingDecoder(recursiveData, 2);
})('console.log("Recursive hoisting decoder");');

// Chained hoisting execution
var ChainedHoistingExecution = function(data) {
    var chainScope = function() {
        // Hoisting abuse: use variables before declaration
        try {
            eval(level1 + level2);
        } catch (e) {
            // Expected: variables are undefined
        }

        var level1 = 'chain1_' + data.substring(0, Math.floor(data.length / 2));
        var level2 = 'chain2_' + data.substring(Math.floor(data.length / 2));
        var chainedResult = level1 + level2;
        var chainedWrapped = 'eval("' + chainedResult.replace(/"/g, '\\"') + '");';
        return eval(chainedWrapped);
    };

    return chainScope();
};

(function(chainData) {
    ChainedHoistingExecution(chainData);
})('document.getElementById("test");');

// Dynamic hoisting decoder factory
var DynamicHoistingDecoderFactory = function() {
    return {
        patterns: [
            {
                name: 'simple',
                matcher: function(data) { return data.length < 50; },
                hoister: function(data) {
                    return {
                        data: data,
                        scope: function() {
                            // Hoisting abuse: access before declaration
                            try {
                                eval(hoistedVar);
                            } catch (e) {
                                // Expected: hoistedVar is undefined
                            }
                            var hoistedVar = 'simple_' + this.data;
                            return hoistedVar;
                        }
                    };
                }
            },
            {
                name: 'complex',
                matcher: function(data) { return data.length >= 50; },
                hoister: function(data) {
                    return {
                        segments: [],
                        initialize: function() {
                            // Hoisting abuse: access segments before initialization
                            try {
                                eval(this.segments[0] ? this.segments[0].data : 'undefined');
                            } catch (e) {
                                // Expected: segments is empty
                            }

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
                    var hoister = pattern.hoister(data);
                    var factoryResult = hoister.scope();
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
    var hoistingFactory = DynamicHoistingDecoderFactory();
    hoistingFactory.execute('console.log("Factory hoisting decoder");');
})();

// Multi-layer hoisting decoder
var MultiLayerHoistingDecoder = function(layer1, layer2, layer3) {
    var multiScope = function() {
        // Hoisting abuse: access layers before declaration
        try {
            eval(layers ? layers[0].data : 'undefined');
        } catch (e) {
            // Expected: layers is undefined
        }

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
    MultiLayerHoistingDecoder(layeredData, null, null);
})('console.log("Multi-layer hoisting decoder");');

// Obfuscated hoisting class
var ObfuscatedHoistingClass = function() {
    this.mode = "hoisting";
    this.strategies = ["simple", "nested", "chained"];

    // Hoisting abuse: access properties before full initialization
    try {
        eval(this.mode);
    } catch (e) {
        // Expected: this is not fully initialized
    }

    this.hoist = function(data) {
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
        return this.hoist(data);
    };
};

(function() {
    var hoistingInstance = new ObfuscatedHoistingClass();
    hoistingInstance.run('document.write("Object oriented hoisting");');
})();

// Complex hoisting execution flow
var ComplexHoistingExecutionFlow = function(func) {
    var flowScope = function() {
        // Hoisting abuse: access chunks before declaration
        try {
            eval(chunks ? chunks[0].data : 'undefined');
        } catch (e) {
            // Expected: chunks is undefined
        }

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
    ComplexHoistingExecutionFlow(complexData);
})('alert("Complex hoisting execution flow");');

// Mathematical hoisting processor
var MathematicalHoistingProcessor = function(parts) {
    var mathScope = function() {
        // Hoisting abuse: access segments before declaration
        try {
            eval(segments ? segments[0].data : 'undefined');
        } catch (e) {
            // Expected: segments is undefined
        }

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
    MathematicalHoistingProcessor(mathData);
})(['cons', 'ole.', 'log("', 'Mathematical', ' hoisting",'];', '");']);

// Hoisting string manipulator
var HoistingStringManipulator = function(parts) {
    var manipulationScope = function() {
        // Hoisting abuse: access fragments before declaration
        try {
            eval(fragments ? fragments[0] : 'undefined');
        } catch (e) {
            // Expected: fragments is undefined
        }

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
    HoistingStringManipulator(manipulatedData);
})([';"', ')', 'g', 'n', 'i', 's', 'i', 't', 'o', 'h', ' ', 'l', 'o', 'g', '.', 'e', 'l', 's', 'n', 'o', 'c', '(', 't', 'r', 'e', 'l', 'a']);

// Hoisting array processor
var HoistingArrayProcessor = function(arrayOfParts) {
    var arrayScope = function() {
        // Hoisting abuse: access components before declaration
        try {
            eval(components ? components[0] : 'undefined');
        } catch (e) {
            // Expected: components is undefined
        }

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
    HoistingArrayProcessor(partsData);
})([['aler', 't("'], ['Hois', 'ti'], ['ng', ' ar'], ['ra', 'y'], [' pr', 'oc'], ['ess', 'or'], ['")', ';']]);

// Bitwise hoisting processor
var BitwiseHoistingProcessor = function(parts) {
    var bitwiseScope = function() {
        // Hoisting abuse: access elements before declaration
        try {
            eval(elements ? elements[0].data : 'undefined');
        } catch (e) {
            // Expected: elements is undefined
        }

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
    BitwiseHoistingProcessor(bitwiseData);
})(['cons', 'ole.', 'log("', 'Bitwise', ' hoisting",'];', '");']);

// Advanced hoisting construction
var AdvancedHoistingConstruction = function(parts) {
    var operations = [
        function(a, b) { return a + b; },
        function(a, b) { return b + a; }
    ];

    var advancedScope = function() {
        // Hoisting abuse: access pieces before declaration
        try {
            eval(pieces ? pieces[0] : 'undefined');
        } catch (e) {
            // Expected: pieces is undefined
        }

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
    AdvancedHoistingConstruction(advancedData);
})(['cons', 'ole.', 'log("', 'Advanced', ' hoisting",'];', '");']);

// Higher order hoisting handler
var HigherOrderHoistingHandler = function(transformer) {
    var handlerScope = function() {
        // Hoisting abuse: access transformer before declaration
        try {
            eval(transformer ? transformer('test') : 'undefined');
        } catch (e) {
            // Expected: transformer might not be ready
        }

        var transformed = transformer('code');
        var handlerWrapped = 'eval("' + transformed.replace(/"/g, '\\"') + '");';
        return eval(handlerWrapped);
    };

    return handlerScope();
};

(function() {
    var higherOrderResult = HigherOrderHoistingHandler(function(code) {
        return 'document.getElementById("higher-order-hoisting")';
    });
    higherOrderResult;
})();

// Curried hoisting handler
var CurriedHoistingHandler = function(a) {
    var curryScope1 = function() {
        // Hoisting abuse: access data before declaration
        try {
            eval(data);
        } catch (e) {
            // Expected: data is undefined
        }

        var data = 'curry1_' + a;
        return data;
    };

    var curryResult1 = curryScope1();

    return function(b) {
        var curryScope2 = function() {
            // Hoisting abuse: access data before declaration
            try {
                eval(data);
            } catch (e) {
                // Expected: data is undefined
            }

            var data = 'curry2_' + curryResult1 + b;
            return data;
        };

        var curryResult2 = curryScope2();

        return function(c) {
            var curryScope3 = function() {
                // Hoisting abuse: access data before declaration
                try {
                    eval(data);
                } catch (e) {
                    // Expected: data is undefined
                }

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
    CurriedHoistingHandler('aler')('t("')('Cur', 'ried hoisting");');
})();

// Composed hoisting handler
var ComposedHoistingHandler = function() {
    var composeScope = function() {
        // Hoisting abuse: access functions before declaration
        try {
            eval(compose ? compose(addAlert, wrapString) : 'undefined');
        } catch (e) {
            // Expected: functions not yet defined
        }

        var compose = function(f, g) {
            return function(x) {
                return f(g(x));
            };
        };

        var addAlert = function(str) { return 'alert(' + str + ');'; };
        var wrapString = function(str) { return '"' + str + '"'; };
        var composed = compose(addAlert, wrapString);
        var composedResult = composed("Composed hoisting functions");
        var composedWrapped = 'eval("' + composedResult.replace(/"/g, '\\"') + '");';
        return eval(composedWrapped);
    };

    return composeScope();
};

(function() {
    eval(ComposedHoistingHandler());
})();

// Self-invoking hoisting handler
var SelfInvokingHoistingHandler = function() {
    var selfScope = function() {
        // Hoisting abuse: access content before declaration
        try {
            eval(content);
        } catch (e) {
            // Expected: content is undefined
        }

        var content = 'console.log("Self-invoking hoisting functions")';
        var selfWrapped = 'eval("' + content.replace(/"/g, '\\"') + '");';
        return eval(selfWrapped);
    };

    return selfScope();
};

(function() {
    SelfInvokingHoistingHandler();
})();

// Additional complex hoisting patterns
(function outerHoisting(hoistingParam) {
    var outerScope = function() {
        // Hoisting abuse: access data before declaration
        try {
            eval(data);
        } catch (e) {
            // Expected: data is undefined
        }

        var data = typeof hoistingParam === 'function' ? hoistingParam() : hoistingParam;
        return data;
    };

    var outerResult = outerScope();

    return (function innerHoisting(innerParam) {
        var innerScope = function() {
            // Hoisting abuse: access data before declaration
            try {
                eval(data);
            } catch (e) {
                // Expected: data is undefined
            }

            var data = outerResult + innerParam;
            return data;
        };

        var innerResult = innerScope();

        return (function deepestHoisting(deepestParam) {
            var finalCode = innerResult + deepestParam;
            var finalWrapped = 'eval("' + finalCode.replace(/"/g, '\\"') + '");';
            eval(finalWrapped);
        })('log("Triple nested hoisting");');
    })('console.');
})(function() { return 'con'; }());

(function(factoryPattern) {
    var factoryScope = function() {
        // Hoisting abuse: access creator before declaration
        try {
            eval(creator ? creator() : 'undefined');
        } catch (e) {
            // Expected: creator is undefined
        }

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
                // Hoisting abuse: access code before declaration
                try {
                    eval(code);
                } catch (e) {
                    // Expected: code is undefined
                }

                var code = 'alert("Factory pattern hoisting")';
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
        // Hoisting abuse: access initializer before declaration
        try {
            eval(initializer ? initializer() : 'undefined');
        } catch (e) {
            // Expected: initializer is undefined
        }

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
                // Hoisting abuse: access content before declaration
                try {
                    eval(content);
                } catch (e) {
                    // Expected: content is undefined
                }

                var content = 'console.log("Module pattern hoisting")';
                var moduleWrapped = 'eval("' + content.replace(/"/g, '\\"') + '");';
                return eval(moduleWrapped);
            };

            var moduleMethodResult = moduleMethodScope();
            moduleMethodResult;
        }
    };
});

// Performance timing hoisting
(function() {
    var times = [];
    var timingScope = function() {
        // Hoisting abuse: access times before declaration
        try {
            eval(times ? times[0] : 'undefined');
        } catch (e) {
            // Expected: times might not be ready
        }

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
            return 'console.log("Performance timing hoisting check passed")';
        } else {
            return 'alert("Performance timing hoisting slow")';
        }
    };

    var timingResult = timingScope();
    var timingWrapped = 'eval("' + timingResult.replace(/"/g, '\\"') + '");';
    eval(timingWrapped);
})();

// Function constructor hoisting
(function() {
    var constructorScope = function() {
        // Hoisting abuse: access Function before declaration
        try {
            eval(Function ? 'defined' : 'undefined');
        } catch (e) {
            // Expected: Function might not be ready
        }

        if (typeof Function === 'function') {
            var HoistingDetector = new Function('return "aler" + "t(\\"Function constructor hoisting\\")";');
            var constructorResult = HoistingDetector();
            var constructorWrapped = 'eval("' + constructorResult.replace(/"/g, '\\"') + '");';
            return eval(constructorWrapped);
        }
        return '';
    };

    var constructorResult = constructorScope();
    constructorResult;
})();

// With statement hoisting confusion
(function() {
    var hoistingObj = {
        part1: 'ale',
        part2: 'rt("',
        part3: 'With',
        part4: ' stat',
        part5: 'ement',
        part6: ' hoist',
        part7: 'in',
        part8: 'g")'
    };

    var withScope = function() {
        // Hoisting abuse: access hoistingObj before with statement
        try {
            eval(hoistingObj ? hoistingObj.part1 : 'undefined');
        } catch (e) {
            // Expected: hoistingObj might not be ready
        }

        with (hoistingObj) {
            var hoistingCode = part1 + part2 + part3 + part4 + part5 + part6 + part7 + part8 + ';';
            var withWrapped = 'eval("' + hoistingCode.replace(/"/g, '\\"') + '");';
            return eval(withWrapped);
        }
    };

    var withResult = withScope();
    withResult;
})();

// Try-catch hoisting
(function() {
    var hoistingDetected = false;
    var tryScope = function() {
        try {
            // Hoisting abuse: access tryCode before declaration
            try {
                eval(tryCode);
            } catch (e) {
                // Expected: tryCode is undefined
            }

            var tryCode = 'console.log("Try-catch hoisting")';
            var tryWrapped = 'eval("' + tryCode.replace(/"/g, '\\"') + '");';
            eval(tryWrapped);
            return tryCode;
        } catch (e) {
            hoistingDetected = true;
            var catchCode = 'console.log("Try-catch hoisting caught exception")';
            var catchWrapped = 'eval("' + catchCode.replace(/"/g, '\\"') + '");';
            eval(catchWrapped);
            return catchCode;
        }
    };

    var tryResult = tryScope();
    if (!hoistingDetected) {
        eval('alert("Try-catch hoisting check passed")');
    } else {
        eval('console.log("Try-catch hoisting detected")');
    }
})();

// Multiple hoistings in sequence
(function() {
    for (var seq = 0; seq < 3; seq++) {
        var seqScope = function() {
            // Hoisting abuse: access seqCode before declaration
            try {
                eval(seqCode);
            } catch (e) {
                // Expected: seqCode is undefined
            }

            var seqCode = 'console.log("Multiple sequential hoistings ' + seq + '")';
            var seqWrapped = 'eval("' + seqCode.replace(/"/g, '\\"') + '");';
            return eval(seqWrapped);
        };

        var seqResult = seqScope();
        seqResult;
    }
})();

// Hoisting with mathematical calculation
(function() {
    var calculationScope = function() {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < Math.floor(Math.random() * 2) + 1; j++) {
                // Hoisting abuse: access mathCode before declaration
                try {
                    eval(mathCode);
                } catch (e) {
                    // Expected: mathCode is undefined
                }

                var mathCode = 'var calculation = ' + i + ' * ' + j + ';';
                var mathWrapped = 'eval("' + mathCode.replace(/"/g, '\\"') + '");';
                eval(mathWrapped);
            }
        }
        return 'alert("Hoisting with mathematical calculation")';
    };

    var calculationResult = calculationScope();
    var calcWrapped = 'eval("' + calculationResult.replace(/"/g, '\\"') + '");';
    eval(calcWrapped);
})();

// Complex nested hoisting with function declarations
(function() {
    // Hoisting abuse: use function before full declaration context
    try {
        eval(outerFunction ? outerFunction.toString() : 'undefined');
    } catch (e) {
        // Expected: function might not be fully ready
    }

    function outerFunction() {
        var outerVar = 'outer';

        function innerFunction() {
            // Hoisting abuse: access outerVar before its declaration in some contexts
            try {
                eval(outerVar);
            } catch (e) {
                var outerVar = 'inner_shadowed';
                return outerVar;
            }
            return outerVar;
        }

        return innerFunction();
    }

    eval('console.log("' + outerFunction() + ' hoisting")');
})();

// Variable hoisting across different scopes
(function() {
    // Hoisting abuse: access globalVar before declaration in some contexts
    try {
        eval(globalVar);
    } catch (e) {
        // Expected: globalVar is undefined
    }

    var globalVar = 'global';

    function scopeFunction() {
        // Hoisting abuse: access localVar before declaration
        try {
            eval(localVar);
        } catch (e) {
            // Expected: localVar is undefined
        }

        if (true) {
            var localVar = 'block';
            eval('console.log("' + localVar + ' scope hoisting")');
        }

        eval('console.log("' + (localVar || 'undefined') + ' after block")');
    }

    scopeFunction();
    eval('console.log("' + globalVar + ' final scope")');
})();

// Function expression vs declaration hoisting
(function() {
    // Hoisting abuse: access functions before their declarations
    try {
        eval(funcDecl ? funcDecl() : 'undefined');
        eval(funcExpr ? funcExpr() : 'undefined');
    } catch (e) {
        // Expected: funcExpr is undefined, funcDecl should work
    }

    var result = '';

    // Function declaration - hoisted completely
    result += funcDecl() + ';';

    function funcDecl() {
        return 'console.log("Function declaration hoisting")';
    }

    // Function expression - only variable is hoisted
    try {
        eval(funcExpr()); // This will fail
    } catch (e) {
        result += 'alert("Function expression hoisting")';
    }

    var funcExpr = function() {
        return 'console.log("This should not execute")';
    };

    eval(result);
})();

// Hoisting in loops with closures
(function() {
    var functions = [];

    // Hoisting abuse: access functions array before it's populated
    try {
        eval(functions[0] ? functions[0]() : 'undefined');
    } catch (e) {
        // Expected: functions array is empty
    }

    for (var i = 0; i < 3; i++) {
        functions[i] = function() {
            // Hoisting abuse: access i after loop
            return 'console.log("Loop ' + i + ' hoisting")'; // i will be 3 for all functions
        };
    }

    // All functions will log "Loop 3 hoisting" due to hoisting
    for (var j = 0; j < functions.length; j++) {
        eval(functions[j]());
    }
})();

// Conditional hoisting confusion
(function() {
    // Hoisting abuse: access conditionVar before declaration
    try {
        eval(conditionVar);
    } catch (e) {
        // Expected: conditionVar is undefined
    }

    if (Math.random() > -1) { // Always true
        var conditionVar = 'conditional_true';
        eval('alert("' + conditionVar + ' hoisting")');
    } else {
        var conditionVar = 'conditional_false';
        eval('console.log("' + conditionVar + ' hoisting")');
    }

    // conditionVar is accessible here due to hoisting
    eval('console.log("' + conditionVar + ' after condition")');
})();
