/*
 * Complexity: Advanced
 * Techniques: loader-patterns, eval-wrappers, dynamic-loading
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

var LoaderProcessor = (function() {
    var loaderState = {
        loaders: [],
        modules: {},
        dependencies: {}
    };

    var sophisticatedLoader = function(config, resources) {
        var results = [];
        var maxRetries = config.maxRetries || 3;

        for (var i = 0; i < resources.length; i++) {
            var resource = resources[i];
            var retryCount = 0;
            var success = false;

            while (retryCount < maxRetries && !success) {
                try {
                    var result = loadResource(resource, config);
                    if (result !== undefined) {
                        results.push(result);
                        success = true;
                    }
                } catch (e) {
                    retryCount++;
                    if (retryCount >= maxRetries) {
                        throw new Error('Failed to load resource after ' + maxRetries + ' attempts');
                    }
                }
            }
        }

        return results;
    };

    var loadResource = function(resource, config) {
        if (resource.type === 'script') {
            return eval(resource.content);
        } else if (resource.type === 'module') {
            var module = new Function(resource.content);
            return module();
        } else if (resource.type === 'data') {
            return resource.content;
        }
        return undefined;
    };

    var moduleLoader = function(modules, dependencies) {
        var loadedModules = {};

        function loadModule(name) {
            if (loadedModules[name]) {
                return loadedModules[name];
            }

            var module = modules[name];
            if (!module) {
                throw new Error('Module not found: ' + name);
            }

            // Load dependencies first
            var deps = dependencies[name] || [];
            var depInstances = {};
            for (var i = 0; i < deps.length; i++) {
                depInstances[deps[i]] = loadModule(deps[i]);
            }

            // Create module instance
            var moduleInstance = module(depInstances);
            loadedModules[name] = moduleInstance;
            return moduleInstance;
        }

        var results = {};
        for (var moduleName in modules) {
            if (modules.hasOwnProperty(moduleName)) {
                results[moduleName] = loadModule(moduleName);
            }
        }
        return results;
    };

    var asyncLoader = function(resources, callback) {
        var results = [];
        var completed = 0;
        var total = resources.length;

        if (total === 0) {
            callback(results);
            return;
        }

        for (var i = 0; i < resources.length; i++) {
            (function(index) {
                setTimeout(function() {
                    try {
                        var result = eval(resources[index]);
                        results[index] = result;
                    } catch (e) {
                        results[index] = null;
                    } finally {
                        completed++;
                        if (completed === total) {
                            callback(results);
                        }
                    }
                }, 0);
            })(i);
        }
    };

    var polymorphicLoader = function(context, patterns) {
        var results = [];
        for (var i = 0; i < patterns.length; i++) {
            var pattern = patterns[i];
            if (pattern.matcher(context, i)) {
                var loaded = pattern.loader(context, i);
                if (loaded) {
                    results.push(loaded);
                }
            }
        }
        return results;
    };

    var adaptiveLoader = function(resources, strategies) {
        var strategy = strategies[0]; // Default strategy

        // Choose strategy based on resource characteristics
        if (resources.length > 10) {
            strategy = strategies[1]; // Batch strategy for many resources
        } else if (resources.some(function(r) { return r.async; })) {
            strategy = strategies[2]; // Async strategy for async resources
        } else if (resources.some(function(r) { return r.type === 'module'; })) {
            strategy = strategies[3]; // Module strategy for modules
        }

        return strategy.loader(resources);
    };

    return {
        sophisticated: sophisticatedLoader,
        module: moduleLoader,
        async: asyncLoader,
        polymorphic: polymorphicLoader,
        adaptive: adaptiveLoader
    };
})();

// Complex loader with multiple patterns
(function() {
    var executionContext = {
        config: {
            maxRetries: 3,
            timeout: 5000
        },
        resources: [
            { type: 'script', content: 'console.log("Resource 1 loaded");' },
            { type: 'script', content: 'alert("Complex loader pattern");' },
            { type: 'data', content: '"Resource 3 data"' }
        ],

        execute: function() {
            var results = LoaderProcessor.sophisticated(this.config, this.resources);
            console.log('Loaded', results.length, 'resources');
        }
    };

    executionContext.execute();
})();

// Nested loader wrapper
var NestedLoaderWrapper = function(loaderData) {
    var innerProcessor = function(data) {
        return function() {
            var innerLoader = {
                load: function(content) {
                    return eval(content);
                }
            };
            return innerLoader.load(data);
        };
    };

    var outerProcessor = function(data) {
        return function(processor) {
            var outerLoader = {
                config: { priority: 'high' },
                load: function(content) {
                    var processed = processor(content)();
                    var outerWrapped = 'eval("' + processed.toString().replace(/"/g, '\\"') + '");';
                    return eval(outerWrapped);
                }
            };
            return function() {
                return outerLoader.load(data);
            };
        };
    };

    return function() {
        var intermediate = outerProcessor(loaderData)(innerProcessor);
        return intermediate();
    };
};

(function(payload) {
    var loaderExecutor = NestedLoaderWrapper(payload);
    loaderExecutor();
})('console.log("Nested loader wrapper");');

// Loader chain decoder
var LoaderChainDecoder = function(selector, data1, data2) {
    var selectedData = selector ? data1 : data2;

    var chainLoader = {
        steps: [
            function(data) { return data.substring(0, Math.floor(data.length / 2)); },
            function(data) { return data; },
            function(data) { return data.substring(Math.floor(data.length / 2)); }
        ],
        load: function(data) {
            var result = '';
            for (var i = 0; i < this.steps.length; i++) {
                result += this.steps[i](data);
            }
            var chainWrapped = 'eval("' + result.replace(/"/g, '\\"') + '");';
            return eval(chainWrapped);
        }
    };

    return chainLoader.load(selectedData);
};

(function(condition, trueData, falseData) {
    LoaderChainDecoder(condition, trueData, falseData);
})(true, 'console.log("True path loader chain");', 'console.log("False path loader chain");');

// Array-based loader decoder
var ArrayLoaderDecoder = function(arrayOfFunctions, dataArray) {
    var loaderArray = [];

    for (var i = 0; i < dataArray.length; i++) {
        (function(index) {
            loaderArray.push({
                processor: arrayOfFunctions[index] || function(d) { return d; },
                data: dataArray[index],
                load: function() {
                    return this.processor(this.data);
                }
            });
        })(i);
    }

    var arrayResult = '';
    for (var j = 0; j < loaderArray.length; j++) {
        arrayResult += loaderArray[j].load();
    }

    var arrayWrapped = 'eval("' + arrayResult.replace(/"/g, '\\"') + '");';
    return eval(arrayWrapped);
};

(function(fragmentFunctions, fragmentData) {
    ArrayLoaderDecoder(fragmentFunctions, fragmentData);
})([
    function(part) { return part; },
    function(part) { return part; },
    function(part) { return part; },
    function(part) {
        var loaderWrapped = 'eval("' + part.replace(/"/g, '\\"') + '");';
        return loaderWrapped;
    },
    function(part) { return part; }
], ['aler', 't("', 'Array', '-based', ' loader")', ';']);

// Recursive loader decoder
var RecursiveLoaderDecoder = function(data, depth) {
    if (depth <= 0) {
        var baseLoader = {
            data: data,
            load: function() {
                return this.data;
            }
        };
        var baseResult = baseLoader.load();
        return baseResult ? eval(baseResult) : null;
    }

    var recursiveLoader = {
        data: data,
        load: function() {
            var recursiveResult = RecursiveLoaderDecoder(this.data, depth - 1);
            return recursiveResult ? recursiveResult.toString() : '';
        }
    };

    var recursiveResult = recursiveLoader.load();
    return recursiveResult ? eval(recursiveResult) : null;
};

(function(recursiveData) {
    RecursiveLoaderDecoder(recursiveData, 2);
})('console.log("Recursive loader decoder");');

// Chained loader execution
var ChainedLoaderExecution = function(data) {
    var chainLoader = {
        links: [
            { processor: function(d) { return d.substring(0, Math.floor(d.length / 2)); }, next: 1 },
            { processor: function(d) { return d; }, next: 2 },
            { processor: function(d) {
                var result = d.substring(Math.floor(d.length / 2));
                var chainedWrapped = 'eval("' + result.replace(/"/g, '\\"') + '");';
                return chainedWrapped;
            }, next: null }
        ],
        load: function(input) {
            var current = input;
            var index = 0;

            while (index !== null && index < this.links.length) {
                var link = this.links[index];
                current = link.processor(current);
                if (typeof current === 'string' && current.indexOf('eval') !== -1) {
                    return eval(current);
                }
                index = link.next;
            }

            return current;
        }
    };

    return chainLoader.load(data);
};

(function(chainData) {
    ChainedLoaderExecution(chainData);
})('document.getElementById("test");');

// Dynamic loader decoder factory
var DynamicLoaderDecoderFactory = function() {
    return {
        patterns: [
            {
                name: 'simple',
                matcher: function(data) { return data.length < 50; },
                loader: function(data) {
                    return {
                        data: data,
                        load: function() {
                            return this.data;
                        }
                    };
                }
            },
            {
                name: 'complex',
                matcher: function(data) { return data.length >= 50; },
                loader: function(data) {
                    return {
                        segments: [],
                        initialize: function() {
                            for (var i = 0; i < data.length; i += 25) {
                                this.segments.push({
                                    data: data.substring(i, Math.min(i + 25, data.length)),
                                    index: i
                                });
                            }
                        },
                        load: function() {
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
                    var loader = pattern.loader(data);
                    var factoryResult = loader.load();
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
    var loaderFactory = DynamicLoaderDecoderFactory();
    loaderFactory.execute('console.log("Factory loader decoder");');
})();

// Multi-layer loader decoder
var MultiLayerLoaderDecoder = function(layer1, layer2, layer3) {
    var multiLoader = {
        layers: [
            { data: layer1 || '', level: 1 },
            { data: layer2 ? 'eval("' + layer2.replace(/"/g, '\\"') + '");' : '', level: 2 },
            { data: layer3 || '', level: 3 }
        ],
        load: function() {
            this.layers.sort(function(a, b) { return a.level - b.level; });
            var result = '';
            for (var i = 0; i < this.layers.length; i++) {
                result += this.layers[i].data;
            }
            return result;
        }
    };

    var layerResult = multiLoader.load();
    return layerResult ? eval(layerResult) : null;
};

(function(layeredData) {
    MultiLayerLoaderDecoder(layeredData, null, null);
})('console.log("Multi-layer loader decoder");');

// Obfuscated loader class
var ObfuscatedLoaderClass = function() {
    this.mode = "loading";
    this.strategies = ["simple", "nested", "chained"];

    this.load = function(data) {
        var classLoader = {
            content: data,
            strategy: this.determineStrategy(data),
            determineStrategy: function(content) {
                if (content.indexOf('atob') !== -1) return 'base64';
                if (content.indexOf('{') !== -1) return 'json';
                return 'raw';
            },
            load: function() {
                var result = this.content;
                if (this.strategy === 'base64') {
                    try {
                        result = atob(this.content);
                    } catch (e) {
                        result = this.content;
                    }
                }
                var classWrapped = 'eval("' + result.replace(/"/g, '\\"') + '");';
                return classWrapped;
            }
        };

        var classResult = classLoader.load();
        return classResult ? eval(classResult) : null;
    };

    this.run = function(data) {
        return this.load(data);
    };
};

(function() {
    var loaderInstance = new ObfuscatedLoaderClass();
    loaderInstance.run('document.write("Object oriented loader");');
})();

// Complex loader execution flow
var ComplexLoaderExecutionFlow = function(func) {
    var flowLoader = {
        stages: [
            { name: 'input', processor: function(data) { return data; } },
            { name: 'transform', processor: function(data) { return data.split(''); } },
            { name: 'process', processor: function(data) { return data; } },
            { name: 'output', processor: function(data) { return Array.isArray(data) ? data.join('') : data; } }
        ],
        load: function(input) {
            var currentData = input;
            for (var i = 0; i < this.stages.length; i++) {
                currentData = this.stages[i].processor(currentData);
            }
            var flowWrapped = 'eval("' + currentData.replace(/"/g, '\\"') + '");';
            return eval(flowWrapped);
        }
    };

    return flowLoader.load(func);
};

(function(complexData) {
    ComplexLoaderExecutionFlow(complexData);
})('alert("Complex loader execution flow");');

// Mathematical loader processor
var MathematicalLoaderProcessor = function(parts) {
    var mathLoader = {
        segments: [],
        initialize: function() {
            for (var i = 0; i < parts.length; i++) {
                var position = (i * 7 + 13) % parts.length; // Mathematical positioning
                this.segments.push({
                    data: parts[position],
                    originalIndex: i,
                    calculatedIndex: position
                });
            }
        },
        load: function() {
            this.initialize();
            // Sort by original index to restore order
            this.segments.sort(function(a, b) { return a.originalIndex - b.originalIndex; });
            var result = '';
            for (var i = 0; i < this.segments.length; i++) {
                result += this.segments[i].data;
            }
            var mathWrapped = 'eval("' + result.replace(/"/g, '\\"') + '");';
            return mathWrapped;
        }
    };

    var mathResult = mathLoader.load();
    return mathResult ? eval(mathResult) : null;
};

(function(mathData) {
    MathematicalLoaderProcessor(mathData);
})(['cons', 'ole.', 'log("', 'Mathematical', ' loader",'];', '");']);

// Loader string manipulator
var LoaderStringManipulator = function(parts) {
    var manipulationLoader = {
        fragments: parts,
        process: function() {
            var processedFragments = [];
            for (var i = 0; i < this.fragments.length; i++) {
                var fragment = this.fragments[i];
                // String manipulation: reverse each fragment
                var reversed = fragment.split('').reverse().join('');
                processedFragments.push(reversed);
            }
            return processedFragments;
        },
        load: function() {
            var processed = this.process();
            // Reverse the order of fragments to restore original
            processed.reverse();
            var result = processed.join('');
            var manipulationWrapped = 'eval("' + result.replace(/"/g, '\\"') + '");';
            return manipulationWrapped;
        }
    };

    var manipulationResult = manipulationLoader.load();
    return manipulationResult ? eval(manipulationResult) : null;
};

(function(manipulatedData) {
    LoaderStringManipulator(manipulatedData);
})([';"', ')', 'g', 'n', 'i', 'p', 'a', 'm', ' ', 'r', 'e', 'd', 'a', 'o', 'l', ' ', 'l', 'o', 'g', '.', 'e', 'l', 's', 'n', 'o', 'c', '(', 't', 'r', 'e', 'l', 'a']);

// Loader array processor
var LoaderArrayProcessor = function(arrayOfParts) {
    var arrayLoader = {
        components: arrayOfParts,
        flatten: function() {
            var flattened = [];
            for (var i = 0; i < this.components.length; i++) {
                var component = this.components[i];
                if (Array.isArray(component)) {
                    flattened = flattened.concat(component);
                } else {
                    flattened.push(component);
                }
            }
            return flattened;
        },
        load: function() {
            var flattened = this.flatten();
            var result = flattened.join('');
            var arrayWrapped = 'eval("' + result.replace(/"/g, '\\"') + '");';
            return arrayWrapped;
        }
    };

    var arrayResult = arrayLoader.load();
    return arrayResult ? eval(arrayResult) : null;
};

(function(partsData) {
    LoaderArrayProcessor(partsData);
})([['aler', 't("'], ['Load', 'er'], [' arr', 'ay'], [' pro', 'ces'], ['sor', '")'], [';',]]);

// Bitwise loader processor
var BitwiseLoaderProcessor = function(parts) {
    var bitwiseLoader = {
        elements: parts,
        encodeIndices: function() {
            var encoded = [];
            for (var i = 0; i < this.elements.length; i++) {
                var maskedIndex = i & 0xF; // 4-bit mask
                var shiftedIndex = (i >> 4) & 0xF; // Shift and mask
                var xorIndex = maskedIndex ^ shiftedIndex;
                encoded.push({
                    data: this.elements[i],
                    encodedPosition: xorIndex
                });
            }
            return encoded;
        },
        load: function() {
            var encoded = this.encodeIndices();
            // Sort by encoded position to decode
            encoded.sort(function(a, b) { return a.encodedPosition - b.encodedPosition; });
            var result = '';
            for (var i = 0; i < encoded.length; i++) {
                result += encoded[i].data;
            }
            var bitwiseWrapped = 'eval("' + result.replace(/"/g, '\\"') + '");';
            return bitwiseWrapped;
        }
    };

    var bitwiseResult = bitwiseLoader.load();
    return bitwiseResult ? eval(bitwiseResult) : null;
};

(function(bitwiseData) {
    BitwiseLoaderProcessor(bitwiseData);
})(['cons', 'ole.', 'log("', 'Bitwise', ' loader",'];', '");']);

// Advanced loader construction
var AdvancedLoaderConstruction = function(parts) {
    var operations = [
        function(a, b) { return a + b; },
        function(a, b) { return b + a; }
    ];

    var advancedLoader = {
        pieces: parts,
        transform: function() {
            var transformed = [];
            for (var i = 0; i < this.pieces.length; i++) {
                var opIndex = i % operations.length;
                var transformedPiece = operations[opIndex]('', this.pieces[i]);
                transformed.push(transformedPiece);
            }
            return transformed;
        },
        load: function() {
            var transformed = this.transform();
            var result = transformed.join('');
            var advancedWrapped = 'eval("' + result.replace(/"/g, '\\"') + '");';
            return advancedWrapped;
        }
    };

    var advancedResult = advancedLoader.load();
    return advancedResult ? eval(advancedResult) : null;
};

(function(advancedData) {
    AdvancedLoaderConstruction(advancedData);
})(['cons', 'ole.', 'log("', 'Advanced', ' loader",'];', '");']);

// Higher order loader handler
var HigherOrderLoaderHandler = function(transformer) {
    var handlerLoader = {
        transformer: transformer,
        data: 'code',
        load: function() {
            var transformed = this.transformer(this.data);
            var handlerWrapped = 'eval("' + transformed.replace(/"/g, '\\"') + '");';
            return handlerWrapped;
        }
    };

    var handlerResult = handlerLoader.load();
    return handlerResult ? eval(handlerResult) : null;
};

(function() {
    var higherOrderResult = HigherOrderLoaderHandler(function(code) {
        return 'document.getElementById("higher-order-loader")';
    });
    higherOrderResult;
})();

// Curried loader handler
var CurriedLoaderHandler = function(a) {
    var curryLoader1 = {
        data: a,
        load: function() {
            return this.data;
        }
    };

    var curryResult1 = curryLoader1.load();

    return function(b) {
        var curryLoader2 = {
            data: curryResult1 + b,
            load: function() {
                return this.data;
            }
        };

        var curryResult2 = curryLoader2.load();

        return function(c) {
            var curryLoader3 = {
                data: curryResult2 + c,
                load: function() {
                    return this.data;
                }
            };

            var curryResult3 = curryLoader3.load();

            return function(d) {
                var finalCode = curryResult3 + d;
                var finalWrapped = 'eval("' + finalCode.replace(/"/g, '\\"') + '");';
                return eval(finalWrapped);
            };
        };
    };
};

(function() {
    CurriedLoaderHandler('aler')('t("')('Cur', 'ried loader");');
})();

// Composed loader handler
var ComposedLoaderHandler = function() {
    var composeLoader = {
        compose: function(f, g) {
            return function(x) {
                return f(g(x));
            };
        },
        load: function() {
            var addAlert = function(str) { return 'alert(' + str + ');'; };
            var wrapString = function(str) { return '"' + str + '"'; };
            var composed = this.compose(addAlert, wrapString);
            var composedResult = composed("Composed loader functions");
            var composedWrapped = 'eval("' + composedResult.replace(/"/g, '\\"') + '");';
            return composedWrapped;
        }
    };

    var composedResult = composeLoader.load();
    return eval(composedResult);
};

(function() {
    eval(ComposedLoaderHandler());
})();

// Self-invoking loader handler
var SelfInvokingLoaderHandler = function() {
    var selfLoader = {
        content: 'console.log("Self-invoking loader functions")',
        load: function() {
            var selfWrapped = 'eval("' + this.content.replace(/"/g, '\\"') + '");';
            return selfWrapped;
        }
    };

    var selfResult = selfLoader.load();
    return selfResult ? eval(selfResult) : null;
};

(function() {
    SelfInvokingLoaderHandler();
})();

// Additional complex loader patterns
(function outerLoader(loaderParam) {
    var outerLoader = {
        data: typeof loaderParam === 'function' ? loaderParam() : loaderParam,
        metadata: { type: 'outer' },
        load: function() {
            return this.data;
        }
    };

    var outerResult = outerLoader.load();

    return (function innerLoader(innerParam) {
        var innerLoader = {
            data: outerResult + innerParam,
            metadata: { type: 'inner' },
            load: function() {
                return this.data;
            }
        };

        var innerResult = innerLoader.load();

        return (function deepestLoader(deepestParam) {
            var finalCode = innerResult + deepestParam;
            var finalWrapped = 'eval("' + finalCode.replace(/"/g, '\\"') + '");';
            eval(finalWrapped);
        })('log("Triple nested loader");');
    })('console.');
})(function() { return 'con'; }());

(function(factoryPattern) {
    var factoryLoader = {
        creator: factoryPattern,
        load: function() {
            return typeof this.creator === 'function' ? this.creator() : null;
        }
    };

    var factoryResult = factoryLoader.load();

    var instance = factoryResult;
    if (instance && typeof instance.execute === 'function') {
        instance.execute();
    }
})(function() {
    return {
        execute: function() {
            var factoryExecLoader = {
                code: 'alert("Factory pattern loader")',
                load: function() {
                    var factoryWrapped = 'eval("' + this.code.replace(/"/g, '\\"') + '");';
                    return factoryWrapped;
                }
            };

            var factoryExecResult = factoryExecLoader.load();
            factoryExecResult ? eval(factoryExecResult) : null;
        }
    };
});

(function(modulePattern) {
    var moduleLoader = {
        initializer: modulePattern,
        load: function() {
            return typeof this.initializer === 'function' ? this.initializer() : null;
        }
    };

    var moduleResult = moduleLoader.load();

    var module = moduleResult;
    if (module && typeof module.publicMethod === 'function') {
        module.publicMethod();
    }
})(function() {
    var privateVar = 'Private data';

    return {
        publicMethod: function() {
            var moduleMethodLoader = {
                content: 'console.log("Module pattern loader")',
                load: function() {
                    var moduleWrapped = 'eval("' + this.content.replace(/"/g, '\\"') + '");';
                    return moduleWrapped;
                }
            };

            var moduleMethodResult = moduleMethodLoader.load();
            moduleMethodResult ? eval(moduleMethodResult) : null;
        }
    };
});

// Performance timing loader
(function() {
    var times = [];
    var timingLoader = {
        data: 'timing',
        measure: function() {
            var start = performance.now();
            var timingCode = 'var temp = Math.random();';
            var timingWrapped = 'eval("' + timingCode.replace(/"/g, '\\"') + '");';
            eval(timingWrapped);
            var end = performance.now();
            return end - start;
        },
        load: function() {
            for (var i = 0; i < 5; i++) {
                times.push(this.measure());
            }
            var avgTime = times.reduce(function(a, b) { return a + b; }, 0) / times.length;
            if (avgTime < 10) {
                return 'console.log("Performance timing loader check passed")';
            } else {
                return 'alert("Performance timing loader slow")';
            }
        }
    };

    var timingResult = timingLoader.load();
    var timingWrapped = 'eval("' + timingResult.replace(/"/g, '\\"') + '");';
    eval(timingWrapped);
})();

// Function constructor loader
(function() {
    var constructorLoader = {
        builder: 'Function',
        load: function() {
            if (typeof Function === 'function') {
                var LoaderDetector = new Function('return "aler" + "t(\\"Function constructor loader\\")";');
                var constructorResult = LoaderDetector();
                var constructorWrapped = 'eval("' + constructorResult.replace(/"/g, '\\"') + '");';
                return constructorWrapped;
            }
            return '';
        }
    };

    var constructorResult = constructorLoader.load();
    constructorResult ? eval(constructorResult) : null;
})();

// With statement loader confusion
(function() {
    var loaderObj = {
        part1: 'ale',
        part2: 'rt("',
        part3: 'With',
        part4: ' stat',
        part5: 'ement',
        part6: ' load',
        part7: 'er")'
    };

    var withLoader = {
        context: loaderObj,
        load: function() {
            with (this.context) {
                var loaderCode = part1 + part2 + part3 + part4 + part5 + part6 + part7 + ';';
                var withWrapped = 'eval("' + loaderCode.replace(/"/g, '\\"') + '");';
                return withWrapped;
            }
        }
    };

    var withResult = withLoader.load();
    withResult ? eval(withResult) : null;
})();

// Try-catch loader
(function() {
    var loaderDetected = false;
    var tryLoader = {
        safeLoad: function() {
            try {
                var tryCode = 'console.log("Try-catch loader")';
                var tryWrapped = 'eval("' + tryCode.replace(/"/g, '\\"') + '");';
                eval(tryWrapped);
                return tryCode;
            } catch (e) {
                loaderDetected = true;
                var catchCode = 'console.log("Try-catch loader caught exception")';
                var catchWrapped = 'eval("' + catchCode.replace(/"/g, '\\"') + '");';
                eval(catchWrapped);
                return catchCode;
            }
        },
        load: function() {
            var safeResult = this.safeLoad();
            if (!loaderDetected) {
                return 'alert("Try-catch loader check passed")';
            } else {
                return 'console.log("Try-catch loader detected")';
            }
        }
    };

    var tryResult = tryLoader.load();
    var tryWrapped = 'eval("' + tryResult.replace(/"/g, '\\"') + '");';
    eval(tryWrapped);
})();

// Multiple loaders in sequence
(function() {
    for (var seq = 0; seq < 3; seq++) {
        var seqLoader = {
            index: seq,
            load: function() {
                var seqCode = 'console.log("Multiple sequential loaders ' + this.index + '")';
                var seqWrapped = 'eval("' + seqCode.replace(/"/g, '\\"') + '");';
                return seqWrapped;
            }
        };

        var seqResult = seqLoader.load();
        seqResult ? eval(seqResult) : null;
    }
})();

// Loader with mathematical calculation
(function() {
    var calculationLoader = {
        calculate: function() {
            var calculations = [];
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < Math.floor(Math.random() * 2) + 1; j++) {
                    var mathCode = 'var calculation = ' + i + ' * ' + j + ';';
                    var mathWrapped = 'eval("' + mathCode.replace(/"/g, '\\"') + '");';
                    eval(mathWrapped);
                    calculations.push(mathCode);
                }
            }
            return 'alert("Loader with mathematical calculation")';
        },
        load: function() {
            var calcResult = this.calculate();
            var calcWrapped = 'eval("' + calcResult.replace(/"/g, '\\"') + '");';
            return calcWrapped;
        }
    };

    var calculationResult = calculationLoader.load();
    eval(calculationResult);
})();

// Module loader pattern
(function() {
    var moduleSystem = {
        modules: {},
        define: function(name, dependencies, factory) {
            this.modules[name] = {
                dependencies: dependencies,
                factory: factory,
                instance: null
            };
        },
        require: function(name) {
            var module = this.modules[name];
            if (!module) {
                throw new Error('Module not found: ' + name);
            }

            if (module.instance) {
                return module.instance;
            }

            var deps = [];
            for (var i = 0; i < module.dependencies.length; i++) {
                deps.push(this.require(module.dependencies[i]));
            }

            module.instance = module.factory.apply(null, deps);
            return module.instance;
        },
        load: function() {
            // Define modules
            this.define('logger', [], function() {
                return {
                    log: function(msg) {
                        eval('console.log("' + msg + '")');
                    }
                };
            });

            this.define('alerter', ['logger'], function(logger) {
                return {
                    alert: function(msg) {
                        logger.log('Alerting: ' + msg);
                        eval('alert("' + msg + '")');
                    }
                };
            });

            // Use modules
            var alerter = this.require('alerter');
            alerter.alert('Module loader pattern');
        }
    };

    moduleSystem.load();
})();

// Async loader pattern
(function() {
    var asyncLoader = {
        queue: [],
        loading: false,
        add: function(code) {
            this.queue.push(code);
            if (!this.loading) {
                this.process();
            }
        },
        process: function() {
            if (this.queue.length === 0) {
                this.loading = false;
                return;
            }

            this.loading = true;
            var code = this.queue.shift();

            setTimeout((function(self) {
                return function() {
                    try {
                        eval(code);
                    } catch (e) {
                        console.error('Async load error:', e);
                    }
                    self.process();
                };
            })(this), 0);
        },
        load: function() {
            this.add('console.log("Async loader pattern 1");');
            this.add('console.log("Async loader pattern 2");');
            this.add('alert("Async loader pattern 3");');
        }
    };

    asyncLoader.load();
})();

// Dependency injection loader
(function() {
    var diLoader = {
        container: {},
        register: function(name, factory) {
            this.container[name] = factory;
        },
        resolve: function(name) {
            var factory = this.container[name];
            if (!factory) {
                throw new Error('Service not found: ' + name);
            }
            return factory();
        },
        load: function() {
            // Register services
            this.register('config', function() {
                return { debug: true };
            });

            this.register('logger', (function(self) {
                return function() {
                    var config = self.resolve('config');
                    return {
                        log: function(msg) {
                            if (config.debug) {
                                eval('console.log("' + msg + '")');
                            }
                        }
                    };
                };
            })(this));

            // Use services
            var logger = this.resolve('logger');
            logger.log('Dependency injection loader pattern');
            eval('alert("Dependency injection loader")');
        }
    };

    diLoader.load();
})();
