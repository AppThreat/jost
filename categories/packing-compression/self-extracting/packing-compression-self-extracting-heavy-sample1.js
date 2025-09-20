/*
 * Complexity: Advanced
 * Techniques: self-extracting, eval-wrappers, custom-decompression
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

var SelfExtractingProcessor = (function() {
    var extractionState = {
        archives: [],
        extracted: [],
        metadata: {}
    };

    var sophisticatedExtractor = function(archive, options) {
        var result = '';
        var maxAttempts = options.maxAttempts || 3;
        var attemptCount = 0;

        while (attemptCount < maxAttempts) {
            try {
                if (archive.verify && archive.verify()) {
                    result = archive.extract();
                    break;
                } else {
                    attemptCount++;
                }
            } catch (e) {
                attemptCount++;
                if (attemptCount >= maxAttempts) {
                    throw new Error('Extraction failed after ' + maxAttempts + ' attempts');
                }
            }
        }

        return result;
    };

    var multiStageExtractor = function(archives, pipeline) {
        var results = [];
        for (var i = 0; i < archives.length; i++) {
            var archive = archives[i];
            var stageResult = null;

            for (var j = 0; j < pipeline.length; j++) {
                var stage = pipeline[j];
                if (stage.condition(archive)) {
                    stageResult = stage.processor(archive);
                    if (stageResult) {
                        break;
                    }
                }
            }

            if (stageResult) {
                results.push(stageResult);
            }
        }
        return results;
    };

    var polymorphicExtractor = function(context, patterns) {
        var results = [];
        for (var i = 0; i < patterns.length; i++) {
            var pattern = patterns[i];
            if (pattern.matcher(context, i)) {
                var extracted = pattern.extractor(context, i);
                if (extracted) {
                    results.push(extracted);
                }
            }
        }
        return results;
    };

    var adaptiveExtractor = function(archive, strategies) {
        var strategy = strategies[0]; // Default strategy

        // Choose strategy based on archive characteristics
        if (archive.size > 1000000) {
            strategy = strategies[1]; // Large archive strategy
        } else if (archive.compression) {
            strategy = strategies[2]; // Compressed archive strategy
        } else if (archive.encrypted) {
            strategy = strategies[3]; // Encrypted archive strategy
        }

        return strategy.extractor(archive);
    };

    var streamingExtractor = function(archiveStream, chunkSize) {
        var results = [];
        var buffer = '';
        var position = 0;

        while (position < archiveStream.length) {
            var chunk = archiveStream.substr(position, chunkSize);
            buffer += chunk;

            // Try to extract if buffer has enough data
            try {
                var partialResult = atob(buffer);
                if (partialResult.length > 0) {
                    results.push(partialResult);
                    buffer = '';
                }
            } catch (e) {
                // Continue buffering
            }

            position += chunkSize;
        }

        return results.join('');
    };

    return {
        sophisticated: sophisticatedExtractor,
        multiStage: multiStageExtractor,
        polymorphic: polymorphicExtractor,
        adaptive: adaptiveExtractor,
        streaming: streamingExtractor
    };
})();

// Complex self-extracting with multiple layers
(function() {
    var executionContext = {
        archive: {
            metadata: {
                name: 'complex-archive',
                version: '3.2.1',
                created: Date.now(),
                layers: 3
            },
            layers: [
                {
                    id: 'layer1',
                    data: 'Y29uc29sZS5sb2coIkxheWVyIDEgZXh0cmFjdGVkIik7',
                    type: 'base64',
                    extract: function() {
                        return atob(this.data);
                    }
                },
                {
                    id: 'layer2',
                    data: 'YWxlcnQoIkxheWVyIDIgZXh0cmFjdGVkIik7',
                    type: 'base64',
                    extract: function() {
                        return atob(this.data);
                    }
                },
                {
                    id: 'layer3',
                    data: 'ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgiZGl2Iik7',
                    type: 'base64',
                    extract: function() {
                        return atob(this.data);
                    }
                }
            ],
            verify: function() {
                return this.metadata.layers === this.layers.length;
            },
            extract: function() {
                var results = [];
                for (var i = 0; i < this.layers.length; i++) {
                    results.push(this.layers[i].extract());
                }
                return results;
            }
        },

        execute: function() {
            var extractedLayers = this.archive.extract();
            for (var i = 0; i < extractedLayers.length; i++) {
                var layerWrapped = 'eval("' + extractedLayers[i].replace(/"/g, '\\"') + '");';
                eval(layerWrapped);
            }
        }
    };

    executionContext.execute();
})();

// Nested self-extracting wrapper
var NestedSelfExtractingWrapper = function(archiveData) {
    var innerProcessor = function(data) {
        return function() {
            var innerArchive = {
                data: data,
                extract: function() {
                    return atob(this.data);
                }
            };
            return innerArchive.extract();
        };
    };

    var outerProcessor = function(data) {
        return function(processor) {
            var outerArchive = {
                data: btoa(data),
                checksum: 'outer-checksum',
                verify: function() {
                    return this.checksum === 'outer-checksum';
                },
                extract: function() {
                    if (this.verify()) {
                        return processor(data)();
                    }
                    return '';
                }
            };
            var outerResult = outerArchive.extract();
            var outerWrapped = 'eval("' + outerResult.replace(/"/g, '\\"') + '");';
            return function() {
                return eval(outerWrapped);
            };
        };
    };

    return function() {
        var intermediate = outerProcessor(archiveData)(innerProcessor);
        return intermediate();
    };
};

(function(payload) {
    var extractingExecutor = NestedSelfExtractingWrapper(payload);
    extractingExecutor();
})('console.log("Nested self-extracting wrapper");');

// Self-extracting chain decoder
var SelfExtractingChainDecoder = function(selector, data1, data2) {
    var selectedData = selector ? data1 : data2;

    var chainArchive = {
        segments: [
            { data: selectedData.substring(0, Math.floor(selectedData.length / 2)), type: 'first' },
            { data: selectedData.substring(Math.floor(selectedData.length / 2)), type: 'second' }
        ],
        extract: function() {
            var result = '';
            for (var i = 0; i < this.segments.length; i++) {
                result += this.segments[i].data;
            }
            return result;
        }
    };

    var chainResult = chainArchive.extract();
    var chainWrapped = 'eval("' + chainResult.replace(/"/g, '\\"') + '");';
    return eval(chainWrapped);
};

(function(condition, trueData, falseData) {
    SelfExtractingChainDecoder(condition, trueData, falseData);
})(true, 'console.log("True path self-extracting chain");', 'console.log("False path self-extracting chain");');

// Array-based self-extracting decoder
var ArraySelfExtractingDecoder = function(arrayOfFunctions, dataArray) {
    var archiveArray = [];

    for (var i = 0; i < dataArray.length; i++) {
        (function(index) {
            archiveArray.push({
                data: dataArray[index],
                processor: arrayOfFunctions[index] || function(d) { return d; },
                extract: function() {
                    return this.processor(this.data);
                }
            });
        })(i);
    }

    var arrayResult = '';
    for (var j = 0; j < archiveArray.length; j++) {
        arrayResult += archiveArray[j].extract();
    }

    var arrayWrapped = 'eval("' + arrayResult.replace(/"/g, '\\"') + '");';
    return eval(arrayWrapped);
};

(function(fragmentFunctions, fragmentData) {
    ArraySelfExtractingDecoder(fragmentFunctions, fragmentData);
})([
    function(part) { return part; },
    function(part) { return part; },
    function(part) { return part; },
    function(part) {
        var extractingWrapped = 'eval("' + part.replace(/"/g, '\\"') + '");';
        return extractingWrapped;
    },
    function(part) { return part; }
], ['aler', 't("', 'Array', '-based', ' self-extracting")', ';']);

// Recursive self-extracting decoder
var RecursiveSelfExtractingDecoder = function(data, depth) {
    if (depth <= 0) {
        var baseArchive = {
            data: data,
            extract: function() {
                return this.data;
            }
        };
        var baseResult = baseArchive.extract();
        return baseResult ? eval(baseResult) : null;
    }

    var recursiveArchive = {
        data: btoa(data),
        extract: function() {
            var decoded = atob(this.data);
            var recursiveResult = RecursiveSelfExtractingDecoder(decoded, depth - 1);
            return recursiveResult ? recursiveResult.toString() : '';
        }
    };

    var recursiveResult = recursiveArchive.extract();
    return recursiveResult ? eval(recursiveResult) : null;
};

(function(recursiveData) {
    RecursiveSelfExtractingDecoder(recursiveData, 2);
})('console.log("Recursive self-extracting decoder");');

// Chained self-extracting execution
var ChainedSelfExtractingExecution = function(data) {
    var chainArchive = {
        parts: [
            { content: data.substring(0, Math.floor(data.length / 2)), order: 1 },
            { content: data.substring(Math.floor(data.length / 2)), order: 2 }
        ],
        extract: function() {
            this.parts.sort(function(a, b) { return a.order - b.order; });
            var result = '';
            for (var i = 0; i < this.parts.length; i++) {
                result += this.parts[i].content;
            }
            var chainedWrapped = 'eval("' + result.replace(/"/g, '\\"') + '");';
            return chainedWrapped;
        }
    };

    var chainedResult = chainArchive.extract();
    return chainedResult ? eval(chainedResult) : null;
};

(function(chainData) {
    ChainedSelfExtractingExecution(chainData);
})('document.getElementById("test");');

// Dynamic self-extracting decoder factory
var DynamicSelfExtractingDecoderFactory = function() {
    return {
        patterns: [
            {
                name: 'simple',
                matcher: function(data) { return data.length < 50; },
                extractor: function(data) {
                    return {
                        data: data,
                        extract: function() {
                            return this.data;
                        }
                    };
                }
            },
            {
                name: 'complex',
                matcher: function(data) { return data.length >= 50; },
                extractor: function(data) {
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
                        extract: function() {
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
                    var archive = pattern.extractor(data);
                    var factoryResult = archive.extract();
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
    var extractingFactory = DynamicSelfExtractingDecoderFactory();
    extractingFactory.execute('console.log("Factory self-extracting decoder");');
})();

// Multi-layer self-extracting decoder
var MultiLayerSelfExtractingDecoder = function(layer1, layer2, layer3) {
    var multiArchive = {
        layers: [
            { data: layer1 || '', level: 1 },
            { data: layer2 ? 'eval("' + layer2.replace(/"/g, '\\"') + '");' : '', level: 2 },
            { data: layer3 || '', level: 3 }
        ],
        extract: function() {
            this.layers.sort(function(a, b) { return a.level - b.level; });
            var result = '';
            for (var i = 0; i < this.layers.length; i++) {
                result += this.layers[i].data;
            }
            return result;
        }
    };

    var layerResult = multiArchive.extract();
    return layerResult ? eval(layerResult) : null;
};

(function(layeredData) {
    MultiLayerSelfExtractingDecoder(layeredData, null, null);
})('console.log("Multi-layer self-extracting decoder");');

// Obfuscated self-extracting class
var ObfuscatedSelfExtractingClass = function() {
    this.mode = "extracting";
    this.formats = ["simple", "nested", "chained"];

    this.extract = function(data) {
        var classArchive = {
            content: data,
            format: this.determineFormat(data),
            determineFormat: function(content) {
                if (content.indexOf('atob') !== -1) return 'base64';
                if (content.indexOf('{') !== -1) return 'json';
                return 'raw';
            },
            extract: function() {
                var result = this.content;
                if (this.format === 'base64') {
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

        var classResult = classArchive.extract();
        return classResult ? eval(classResult) : null;
    };

    this.run = function(data) {
        return this.extract(data);
    };
};

(function() {
    var extractingInstance = new ObfuscatedSelfExtractingClass();
    extractingInstance.run('document.write("Object oriented self-extracting");');
})();

// Complex self-extracting execution flow
var ComplexSelfExtractingExecutionFlow = function(func) {
    var flowArchive = {
        chunks: [
            { data: func.substring(0, Math.floor(func.length / 3)), position: 0 },
            { data: func.substring(Math.floor(func.length / 3), Math.floor(2 * func.length / 3)), position: 1 },
            { data: func.substring(Math.floor(2 * func.length / 3)), position: 2 }
        ],
        reconstruct: function() {
            this.chunks.sort(function(a, b) { return a.position - b.position; });
            var result = '';
            for (var i = 0; i < this.chunks.length; i++) {
                result += this.chunks[i].data;
            }
            var flowWrapped = 'eval("' + result.replace(/"/g, '\\"') + '");';
            return flowWrapped;
        }
    };

    var flowResult = flowArchive.reconstruct();
    return flowResult ? eval(flowResult) : null;
};

(function(complexData) {
    ComplexSelfExtractingExecutionFlow(complexData);
})('alert("Complex self-extracting execution flow");');

// Mathematical self-extracting processor
var MathematicalSelfExtractingProcessor = function(parts) {
    var mathArchive = {
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
        extract: function() {
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

    var mathResult = mathArchive.extract();
    return mathResult ? eval(mathResult) : null;
};

(function(mathData) {
    MathematicalSelfExtractingProcessor(mathData);
})(['cons', 'ole.', 'log("', 'Mathematical', ' self-extracting",'];', '");']);

// Self-extracting string manipulator
var SelfExtractingStringManipulator = function(parts) {
    var manipulationArchive = {
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
        extract: function() {
            var processed = this.process();
            // Reverse the order of fragments to restore original
            processed.reverse();
            var result = processed.join('');
            var manipulationWrapped = 'eval("' + result.replace(/"/g, '\\"') + '");';
            return manipulationWrapped;
        }
    };

    var manipulationResult = manipulationArchive.extract();
    return manipulationResult ? eval(manipulationResult) : null;
};

(function(manipulatedData) {
    SelfExtractingStringManipulator(manipulatedData);
})([';"', ')', 'g', 'n', 'i', 't', 'c', 'a', 'r', 't', 'x', 'e', '-', 'f', 'l', 'e', 's', ' ', 'l', 'o', 'g', '.', 'e', 'l', 's', 'n', 'o', 'c', '(', 't', 'r', 'e', 'l', 'a']);

// Self-extracting array processor
var SelfExtractingArrayProcessor = function(arrayOfParts) {
    var arrayArchive = {
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
        extract: function() {
            var flattened = this.flatten();
            var result = flattened.join('');
            var arrayWrapped = 'eval("' + result.replace(/"/g, '\\"') + '");';
            return arrayWrapped;
        }
    };

    var arrayResult = arrayArchive.extract();
    return arrayResult ? eval(arrayResult) : null;
};

(function(partsData) {
    SelfExtractingArrayProcessor(partsData);
})([['aler', 't("'], ['Self', '-ext'], ['ract', 'ing'], [' arr', 'ay'], [' pro', 'ces'], ['sor', '")'], [';',]]);

// Bitwise self-extracting processor
var BitwiseSelfExtractingProcessor = function(parts) {
    var bitwiseArchive = {
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
        extract: function() {
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

    var bitwiseResult = bitwiseArchive.extract();
    return bitwiseResult ? eval(bitwiseResult) : null;
};

(function(bitwiseData) {
    BitwiseSelfExtractingProcessor(bitwiseData);
})(['cons', 'ole.', 'log("', 'Bitwise', ' self-extracting",'];', '");']);

// Advanced self-extracting construction
var AdvancedSelfExtractingConstruction = function(parts) {
    var operations = [
        function(a, b) { return a + b; },
        function(a, b) { return b + a; }
    ];

    var advancedArchive = {
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
        extract: function() {
            var transformed = this.transform();
            var result = transformed.join('');
            var advancedWrapped = 'eval("' + result.replace(/"/g, '\\"') + '");';
            return advancedWrapped;
        }
    };

    var advancedResult = advancedArchive.extract();
    return advancedResult ? eval(advancedResult) : null;
};

(function(advancedData) {
    AdvancedSelfExtractingConstruction(advancedData);
})(['cons', 'ole.', 'log("', 'Advanced', ' self-extracting",'];', '");']);

// Higher order self-extracting handler
var HigherOrderSelfExtractingHandler = function(transformer) {
    var handlerArchive = {
        transformer: transformer,
        data: 'code',
        extract: function() {
            var transformed = this.transformer(this.data);
            var handlerWrapped = 'eval("' + transformed.replace(/"/g, '\\"') + '");';
            return handlerWrapped;
        }
    };

    var handlerResult = handlerArchive.extract();
    return handlerResult ? eval(handlerResult) : null;
};

(function() {
    var higherOrderResult = HigherOrderSelfExtractingHandler(function(code) {
        return 'document.getElementById("higher-order-self-extracting")';
    });
    higherOrderResult;
})();

// Curried self-extracting handler
var CurriedSelfExtractingHandler = function(a) {
    var curryArchive1 = {
        data: a,
        extract: function() {
            return this.data;
        }
    };

    var curryResult1 = curryArchive1.extract();

    return function(b) {
        var curryArchive2 = {
            data: curryResult1 + b,
            extract: function() {
                return this.data;
            }
        };

        var curryResult2 = curryArchive2.extract();

        return function(c) {
            var curryArchive3 = {
                data: curryResult2 + c,
                extract: function() {
                    return this.data;
                }
            };

            var curryResult3 = curryArchive3.extract();

            return function(d) {
                var finalCode = curryResult3 + d;
                var finalWrapped = 'eval("' + finalCode.replace(/"/g, '\\"') + '");';
                return eval(finalWrapped);
            };
        };
    };
};

(function() {
    CurriedSelfExtractingHandler('aler')('t("')('Cur', 'ried self-extracting");');
})();

// Composed self-extracting handler
var ComposedSelfExtractingHandler = function() {
    var composeArchive = {
        compose: function(f, g) {
            return function(x) {
                return f(g(x));
            };
        },
        extract: function() {
            var addAlert = function(str) { return 'alert(' + str + ');'; };
            var wrapString = function(str) { return '"' + str + '"'; };
            var composed = this.compose(addAlert, wrapString);
            var composedResult = composed("Composed self-extracting functions");
            var composedWrapped = 'eval("' + composedResult.replace(/"/g, '\\"') + '");';
            return composedWrapped;
        }
    };

    var composedResult = composeArchive.extract();
    return eval(composedResult);
};

(function() {
    eval(ComposedSelfExtractingHandler());
})();

// Self-invoking self-extracting handler
var SelfInvokingSelfExtractingHandler = function() {
    var selfArchive = {
        content: 'console.log("Self-invoking self-extracting functions")',
        extract: function() {
            var selfWrapped = 'eval("' + this.content.replace(/"/g, '\\"') + '");';
            return selfWrapped;
        }
    };

    var selfResult = selfArchive.extract();
    return selfResult ? eval(selfResult) : null;
};

(function() {
    SelfInvokingSelfExtractingHandler();
})();

// Additional complex self-extracting patterns
(function outerExtracting(extractingParam) {
    var outerArchive = {
        data: typeof extractingParam === 'function' ? extractingParam() : extractingParam,
        metadata: { type: 'outer' },
        extract: function() {
            return this.data;
        }
    };

    var outerResult = outerArchive.extract();

    return (function innerExtracting(innerParam) {
        var innerArchive = {
            data: outerResult + innerParam,
            metadata: { type: 'inner' },
            extract: function() {
                return this.data;
            }
        };

        var innerResult = innerArchive.extract();

        return (function deepestExtracting(deepestParam) {
            var finalCode = innerResult + deepestParam;
            var finalWrapped = 'eval("' + finalCode.replace(/"/g, '\\"') + '");';
            eval(finalWrapped);
        })('log("Triple nested self-extracting");');
    })('console.');
})(function() { return 'con'; }());

(function(factoryPattern) {
    var factoryArchive = {
        creator: factoryPattern,
        extract: function() {
            return typeof this.creator === 'function' ? this.creator() : null;
        }
    };

    var factoryResult = factoryArchive.extract();

    var instance = factoryResult;
    if (instance && typeof instance.execute === 'function') {
        instance.execute();
    }
})(function() {
    return {
        execute: function() {
            var factoryExecArchive = {
                code: 'alert("Factory pattern self-extracting")',
                extract: function() {
                    var factoryWrapped = 'eval("' + this.code.replace(/"/g, '\\"') + '");';
                    return factoryWrapped;
                }
            };

            var factoryExecResult = factoryExecArchive.extract();
            factoryExecResult ? eval(factoryExecResult) : null;
        }
    };
});

(function(modulePattern) {
    var moduleArchive = {
        initializer: modulePattern,
        extract: function() {
            return typeof this.initializer === 'function' ? this.initializer() : null;
        }
    };

    var moduleResult = moduleArchive.extract();

    var module = moduleResult;
    if (module && typeof module.publicMethod === 'function') {
        module.publicMethod();
    }
})(function() {
    var privateVar = 'Private data';

    return {
        publicMethod: function() {
            var moduleMethodArchive = {
                content: 'console.log("Module pattern self-extracting")',
                extract: function() {
                    var moduleWrapped = 'eval("' + this.content.replace(/"/g, '\\"') + '");';
                    return moduleWrapped;
                }
            };

            var moduleMethodResult = moduleMethodArchive.extract();
            moduleMethodResult ? eval(moduleMethodResult) : null;
        }
    };
});

// Performance timing self-extracting
(function() {
    var times = [];
    var timingArchive = {
        data: 'timing',
        measure: function() {
            var start = performance.now();
            var timingCode = 'var temp = Math.random();';
            var timingWrapped = 'eval("' + timingCode.replace(/"/g, '\\"') + '");';
            eval(timingWrapped);
            var end = performance.now();
            return end - start;
        },
        extract: function() {
            for (var i = 0; i < 5; i++) {
                times.push(this.measure());
            }
            var avgTime = times.reduce(function(a, b) { return a + b; }, 0) / times.length;
            if (avgTime < 10) {
                return 'console.log("Performance timing self-extracting check passed")';
            } else {
                return 'alert("Performance timing self-extracting slow")';
            }
        }
    };

    var timingResult = timingArchive.extract();
    var timingWrapped = 'eval("' + timingResult.replace(/"/g, '\\"') + '");';
    eval(timingWrapped);
})();

// Function constructor self-extracting
(function() {
    var constructorArchive = {
        builder: 'Function',
        extract: function() {
            if (typeof Function === 'function') {
                var ExtractingDetector = new Function('return "aler" + "t(\\"Function constructor self-extracting\\")";');
                var constructorResult = ExtractingDetector();
                var constructorWrapped = 'eval("' + constructorResult.replace(/"/g, '\\"') + '");';
                return constructorWrapped;
            }
            return '';
        }
    };

    var constructorResult = constructorArchive.extract();
    constructorResult ? eval(constructorResult) : null;
})();

// With statement self-extracting confusion
(function() {
    var extractingObj = {
        part1: 'ale',
        part2: 'rt("',
        part3: 'With',
        part4: ' stat',
        part5: 'ement',
        part6: ' self',
        part7: '-ext',
        part8: 'ract',
        part9: 'ing")'
    };

    var withArchive = {
        context: extractingObj,
        extract: function() {
            with (this.context) {
                var extractingCode = part1 + part2 + part3 + part4 + part5 + part6 + part7 + part8 + part9 + ';';
                var withWrapped = 'eval("' + extractingCode.replace(/"/g, '\\"') + '");';
                return withWrapped;
            }
        }
    };

    var withResult = withArchive.extract();
    withResult ? eval(withResult) : null;
})();

// Try-catch self-extracting
(function() {
    var extractingDetected = false;
    var tryArchive = {
        safeExtract: function() {
            try {
                var tryCode = 'console.log("Try-catch self-extracting")';
                var tryWrapped = 'eval("' + tryCode.replace(/"/g, '\\"') + '");';
                eval(tryWrapped);
                return tryCode;
            } catch (e) {
                extractingDetected = true;
                var catchCode = 'console.log("Try-catch self-extracting caught exception")';
                var catchWrapped = 'eval("' + catchCode.replace(/"/g, '\\"') + '");';
                eval(catchWrapped);
                return catchCode;
            }
        },
        extract: function() {
            var safeResult = this.safeExtract();
            if (!extractingDetected) {
                return 'alert("Try-catch self-extracting check passed")';
            } else {
                return 'console.log("Try-catch self-extracting detected")';
            }
        }
    };

    var tryResult = tryArchive.extract();
    var tryWrapped = 'eval("' + tryResult.replace(/"/g, '\\"') + '");';
    eval(tryWrapped);
})();

// Multiple self-extractings in sequence
(function() {
    for (var seq = 0; seq < 3; seq++) {
        var seqArchive = {
            index: seq,
            extract: function() {
                var seqCode = 'console.log("Multiple sequential self-extractings ' + this.index + '")';
                var seqWrapped = 'eval("' + seqCode.replace(/"/g, '\\"') + '");';
                return seqWrapped;
            }
        };

        var seqResult = seqArchive.extract();
        seqResult ? eval(seqResult) : null;
    }
})();

// Self-extracting with mathematical calculation
(function() {
    var calculationArchive = {
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
            return 'alert("Self-extracting with mathematical calculation")';
        },
        extract: function() {
            var calcResult = this.calculate();
            var calcWrapped = 'eval("' + calcResult.replace(/"/g, '\\"') + '");';
            return calcWrapped;
        }
    };

    var calculationResult = calculationArchive.extract();
    eval(calculationResult);
})();
