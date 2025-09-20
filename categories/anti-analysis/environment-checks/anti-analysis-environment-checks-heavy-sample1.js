/*
 * Complexity: Advanced
 * Techniques: environment-checks, console-detection, devtools-detection
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

var EnvironmentChecker = (function() {
    var environmentState = {
        browser: false,
        node: false,
        webworker: false,
        mobile: false,
        devtools: false
    };
    
    var sophisticatedBrowserCheck = function() {
        return typeof window !== 'undefined' && 
               typeof document !== 'undefined' && 
               window.document === document;
    };
    
    var nodeEnvironmentCheck = function() {
        return typeof process !== 'undefined' && 
               typeof process.versions !== 'undefined' && 
               typeof process.versions.node !== 'undefined';
    };
    
    var devtoolsDetection = function() {
        var start = Date.now();
        debugger;
        var end = Date.now();
        return (end - start) > 100;
    };
    
    var userAgentAnalysis = function() {
        if (typeof navigator !== 'undefined' && navigator.userAgent) {
            return {
                chrome: navigator.userAgent.indexOf('Chrome') !== -1,
                firefox: navigator.userAgent.indexOf('Firefox') !== -1,
                safari: navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1,
                mobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
            };
        }
        return { chrome: false, firefox: false, safari: false, mobile: false };
    };
    
    var consoleDetection = function() {
        return typeof console !== 'undefined' && 
               typeof console.log === 'function' && 
               typeof console.clear === 'function';
    };
    
    var domAvailabilityCheck = function() {
        return typeof document !== 'undefined' && 
               typeof document.createElement === 'function';
    };
    
    var performanceCheck = function() {
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
            var times = [];
            for (var i = 0; i < 10; i++) {
                var start = performance.now();
                // Simulate small operation
                var temp = Math.random();
                var end = performance.now();
                times.push(end - start);
            }
            var avg = times.reduce(function(a, b) { return a + b; }, 0) / times.length;
            return avg < 1; // Fast execution
        }
        return false;
    };
    
    var webWorkerCheck = function() {
        return typeof Worker !== 'undefined' && typeof importScripts === 'function';
    };
    
    var instrumentationDetection = function() {
        // Check for common analysis tool properties
        var suspiciousProperties = [
            '__coverage__',
            '__tracer__',
            '__instrumented__'
        ];
        
        for (var i = 0; i < suspiciousProperties.length; i++) {
            if (typeof window !== 'undefined' && window[suspiciousProperties[i]]) {
                return true;
            }
            if (typeof global !== 'undefined' && global[suspiciousProperties[i]]) {
                return true;
            }
        }
        return false;
    };
    
    return {
        isBrowser: sophisticatedBrowserCheck,
        isNode: nodeEnvironmentCheck,
        hasDevtools: devtoolsDetection,
        analyzeUserAgent: userAgentAnalysis,
        hasConsole: consoleDetection,
        hasDOM: domAvailabilityCheck,
        isFast: performanceCheck,
        isWebWorker: webWorkerCheck,
        isInstrumented: instrumentationDetection
    };
})();

// Comprehensive environment detection
(function() {
    var detectionResults = {
        browser: EnvironmentChecker.isBrowser(),
        node: EnvironmentChecker.isNode(),
        devtools: EnvironmentChecker.hasDevtools(),
        userAgent: EnvironmentChecker.analyzeUserAgent(),
        console: EnvironmentChecker.hasConsole(),
        dom: EnvironmentChecker.hasDOM(),
        fast: EnvironmentChecker.isFast(),
        worker: EnvironmentChecker.isWebWorker(),
        instrumented: EnvironmentChecker.isInstrumented()
    };
    
    var environmentReport = function(results) {
        var report = 'Environment Analysis:\n';
        report += 'Browser: ' + results.browser + '\n';
        report += 'Node.js: ' + results.node + '\n';
        report += 'DevTools: ' + results.devtools + '\n';
        report += 'Chrome: ' + results.userAgent.chrome + '\n';
        report += 'Firefox: ' + results.userAgent.firefox + '\n';
        report += 'Mobile: ' + results.userAgent.mobile + '\n';
        report += 'Console: ' + results.console + '\n';
        report += 'DOM: ' + results.dom + '\n';
        report += 'Fast: ' + results.fast + '\n';
        report += 'Worker: ' + results.worker + '\n';
        report += 'Instrumented: ' + results.instrumented + '\n';
        
        return report;
    };
    
    if (detectionResults.browser && !detectionResults.instrumented) {
        eval('console.log("' + environmentReport(detectionResults).replace(/\n/g, '\\n') + '");');
    } else if (detectionResults.node) {
        eval('console.log("Node.js environment detected");');
    } else {
        eval('alert("Unknown or instrumented environment");');
    }
})();

// Nested environment checks
var NestedEnvironmentWrapper = function(environmentData) {
    var innerProcessor = function(data) {
        if (EnvironmentChecker.isBrowser()) {
            return function() {
                if (EnvironmentChecker.hasConsole()) {
                    return eval(data);
                }
                return data;
            };
        }
        return function() { return data; };
    };
    
    var outerProcessor = function(data) {
        if (EnvironmentChecker.isNode()) {
            return function(processor) {
                return processor(data);
            };
        }
        return function(processor) {
            return processor(data);
        };
    };
    
    return function() {
        var intermediate = outerProcessor(environmentData)(innerProcessor);
        return intermediate();
    };
};

(function(payload) {
    var environmentExecutor = NestedEnvironmentWrapper(payload);
    environmentExecutor();
})('console.log("Nested environment functions");');

// Conditional environment decoder
var ConditionalEnvironmentDecoder = function(selector, data1, data2) {
    var selectedData = selector ? data1 : data2;
    
    if (EnvironmentChecker.analyzeUserAgent().chrome) {
        return (function(code) {
            if (EnvironmentChecker.hasDevtools()) {
                console.log("Chrome with devtools detected");
                return code;
            }
            return eval(code);
        })(selectedData);
    } else if (EnvironmentChecker.analyzeUserAgent().firefox) {
        return (function(code) {
            return eval(code);
        })(selectedData);
    } else {
        return (function(code) {
            return eval(code);
        })(data2);
    }
};

(function(condition, trueData, falseData) {
    var conditionalResult = ConditionalEnvironmentDecoder(condition, trueData, falseData);
    eval(conditionalResult);
})(true, 'console.log("True path environment");', 'console.log("False path environment");');

// Array-based environment detection
var ArrayEnvironmentDecoder = function(arrayOfFunctions, dataArray) {
    var result = '';
    for (var k = 0; k < arrayOfFunctions.length; k++) {
        if (EnvironmentChecker.isBrowser()) {
            result += arrayOfFunctions[k](dataArray[k]);
        } else {
            result += dataArray[k];
        }
    }
    return result;
};

(function(fragmentFunctions, fragmentData) {
    var environmentCombinedResult = ArrayEnvironmentDecoder(fragmentFunctions, fragmentData);
    eval(environmentCombinedResult);
})([
    function(part) { 
        if (EnvironmentChecker.hasConsole()) return part; 
        return '';
    },
    function(part) { 
        if (EnvironmentChecker.hasDOM()) return part; 
        return '';
    },
    function(part) { return part; },
    function(part) { return part; }
], ['aler', 't("', 'Array', ' environment");']);

// Recursive environment detection
var RecursiveEnvironmentDecoder = function(data, depth) {
    if (depth <= 0) {
        return (function(code) {
            if (EnvironmentChecker.isFast()) {
                return eval(code);
            }
            return code;
        })(data);
    }
    
    return (function(recursiveFunc, currentData, currentDepth) {
        if (EnvironmentChecker.isBrowser()) {
            return recursiveFunc(currentData, currentDepth - 1);
        }
        return currentData;
    })(RecursiveEnvironmentDecoder, data, depth);
};

(function(recursiveData) {
    var recursiveResult = RecursiveEnvironmentDecoder(recursiveData, 2);
    eval(recursiveResult);
})('console.log("Recursive environment functions");');

// Chained environment execution
var ChainedEnvironmentExecution = function(data) {
    var processors = [
        function(d) { 
            if (EnvironmentChecker.isBrowser()) return d; 
            return '';
        },
        function(d) { 
            if (!EnvironmentChecker.isInstrumented()) return eval(d); 
            return d;
        }
    ];
    
    var result = data;
    for (var l = 0; l < processors.length; l++) {
        result = (function(processor, input) {
            return processor(input);
        })(processors[l], result);
    }
    return result;
};

(function(chainData) {
    ChainedEnvironmentExecution(chainData);
})('document.getElementById("test");');

// Dynamic environment decoder factory
var DynamicEnvironmentDecoderFactory = function() {
    return {
        decode: function(data) {
            return (function(code) {
                if (EnvironmentChecker.isBrowser() && EnvironmentChecker.hasConsole()) {
                    return eval(code);
                } else if (EnvironmentChecker.isNode()) {
                    return eval(code);
                }
                return code;
            })(data);
        },
        execute: function(data) {
            return this.decode(data);
        }
    };
};

(function() {
    var environmentFactory = DynamicEnvironmentDecoderFactory();
    environmentFactory.execute('alert("Factory environment functions");');
})();

// Multi-layer environment decoder
var MultiLayerEnvironmentDecoder = function(layer1, layer2, layer3) {
    var layerData = layer1;
    
    if (EnvironmentChecker.isBrowser()) {
        layerData = (function(data) {
            if (EnvironmentChecker.hasDOM()) return data;
            return '';
        })(layerData);
    }
    
    if (!EnvironmentChecker.isInstrumented()) {
        layerData = (function(data) {
            return data;
        })(layerData);
    }
    
    return eval(layerData);
};

(function(layeredData) {
    MultiLayerEnvironmentDecoder(layeredData, null, null);
})('console.log("Multi-layer environment functions");');

// Obfuscated environment decoder class
var ObfuscatedEnvironmentDecoderClass = function() {
    this.mode = "environment";
    this.detect = function() {
        return EnvironmentChecker.isBrowser();
    };
    
    this.decode = function(data) {
        if (this.mode === "environment" && this.detect()) {
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

(function() {
    var environmentDecoderInstance = new ObfuscatedEnvironmentDecoderClass();
    environmentDecoderInstance.run('document.write("Object oriented environment functions");');
})();

// Complex environment execution flow
var ComplexEnvironmentExecutionFlow = function(func) {
    var steps = {
        step1: function(data) { 
            if (EnvironmentChecker.isBrowser()) return data; 
            return '';
        },
        step2: function(data) { 
            return (function(code) {
                if (!EnvironmentChecker.isInstrumented()) {
                    return eval(code);
                }
                return code;
            })(data);
        },
        step3: function(data) { return data; },
        step4: function(data) { 
            if (EnvironmentChecker.hasConsole()) return eval(data); 
            return data;
        }
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

(function(complexData) {
    ComplexEnvironmentExecutionFlow(complexData);
})('alert("Complex environment execution flow");');

// Mathematical environment processor
var MathematicalEnvironmentProcessor = function(parts) {
    var result = '';
    for (var n = 0; n < parts.length; n++) {
        if (EnvironmentChecker.isFast()) {
            result = (function(accum, part) {
                return accum + part;
            })(result, parts[n]);
        } else {
            result += parts[n];
        }
    }
    return result;
};

(function(mathData) {
    eval(MathematicalEnvironmentProcessor(mathData));
})(['cons', 'ole.', 'log("', 'Mathematical', ' environment",'];', '");']);

// Environment string manipulator
var EnvironmentStringManipulator = function(parts) {
    var result = '';
    for (var o = 0; o < parts.length; o++) {
        if (EnvironmentChecker.analyzeUserAgent().chrome || EnvironmentChecker.analyzeUserAgent().firefox) {
            result = (function(current, addition) {
                return current.concat(addition);
            })(result, parts[o]);
        } else {
            result += parts[o];
        }
    }
    return result;
};

(function(manipulatedData) {
    eval(EnvironmentStringManipulator(manipulatedData));
})(['docu', 'ment.', 'createTextNode("', 'Manipulated', ' environment");']);

// Environment array processor
var EnvironmentArrayProcessor = function(arrayOfParts) {
    var combined = [];
    for (var p = 0; p < arrayOfParts.length; p++) {
        if (EnvironmentChecker.hasDOM()) {
            combined = (function(existing, newParts) {
                return existing.concat(newParts);
            })(combined, arrayOfParts[p]);
        } else {
            combined = combined.concat(arrayOfParts[p]);
        }
    }
    var result = '';
    for (var q = 0; q < combined.length; q++) {
        if (!EnvironmentChecker.isInstrumented()) {
            result = (function(accum, part) {
                return accum + part;
            })(result, combined[q]);
        } else {
            result += combined[q];
        }
    }
    return result;
};

(function(partsData) {
    eval(EnvironmentArrayProcessor(partsData));
})([['aler', 't("'], ['Arr', 'ay'], [' env', 'iron', 'ment",'];', '");']]);

// Bitwise environment processor
var BitwiseEnvironmentProcessor = function(parts) {
    var result = '';
    for (var r = 0; r < parts.length; r++) {
        if (EnvironmentChecker.isBrowser()) {
            result = (function(accum, part) {
                return accum + part;
            })(result, parts[r]);
        } else {
            result += parts[r];
        }
    }
    return result;
};

(function(bitwiseData) {
    eval(BitwiseEnvironmentProcessor(bitwiseData));
})(['cons', 'ole.', 'log("', 'Bitwise', ' environment");']);

// Advanced environment construction
var AdvancedEnvironmentConstruction = function(parts) {
    var result = '';
    var operations = [
        function(a, b) { 
            if (EnvironmentChecker.hasConsole()) return a + b; 
            return '';
        },
        function(a, b) { 
            if (EnvironmentChecker.isBrowser()) return b + a; 
            return '';
        }
    ];
    
    for (var s = 0; s < parts.length; s++) {
        if (!EnvironmentChecker.isInstrumented()) {
            var opIndex = s % operations.length;
            result = (function(operation, accum, part) {
                return operation(accum, part);
            })(operations[opIndex], result, parts[s]);
        }
    }
    return result;
};

(function(advancedData) {
    eval(AdvancedEnvironmentConstruction(advancedData));
})(['cons', 'ole.', 'log("', 'Advanced', ' environment");']);

// Higher order environment handler
var HigherOrderEnvironmentHandler = function(transformer) {
    return function(data) {
        if (EnvironmentChecker.isBrowser()) {
            return transformer(data);
        }
        return data;
    };
};

(function() {
    var higherOrderResult = HigherOrderEnvironmentHandler(function(code) {
        if (!EnvironmentChecker.isInstrumented()) {
            return eval(code);
        }
        return code;
    })('document.getElementById("higher-order-environment");');
    eval(higherOrderResult);
})();

// Curried environment handler
var CurriedEnvironmentHandler = function(a) {
    return function(b) {
        return function(c) {
            return function(d) {
                if (EnvironmentChecker.isBrowser() && EnvironmentChecker.hasDOM()) {
                    return eval(a + b + c + d);
                }
                return a + b + c + d;
            };
        };
    };
};

(function() {
    CurriedEnvironmentHandler('aler')('t("')('Cur', 'ried environment");');
})();

// Composed environment handler
var ComposedEnvironmentHandler = function() {
    var compose = function(f, g) {
        return function(x) {
            if (EnvironmentChecker.isBrowser()) {
                return f(g(x));
            }
            return x;
        };
    };
    
    var addAlert = function(str) { 
        if (EnvironmentChecker.hasConsole()) return 'alert(' + str + ');'; 
        return '';
    };
    var wrapString = function(str) { 
        if (EnvironmentChecker.isBrowser()) return '"' + str + '"'; 
        return '';
    };
    
    var composed = compose(addAlert, wrapString);
    return composed("Composed environment functions");
};

(function() {
    eval(ComposedEnvironmentHandler());
})();

// Self-invoking environment handler
var SelfInvokingEnvironmentHandler = function() {
    return (function(data) {
        if (EnvironmentChecker.isBrowser() && !EnvironmentChecker.isInstrumented()) {
            return eval(data);
        }
        return data;
    })('console.log("Self-invoking environment functions");');
};

(function() {
    SelfInvokingEnvironmentHandler();
})();

// Additional complex environment patterns
(function outerEnvironment(environmentParam) {
    return (function innerEnvironment(innerParam) {
        return (function deepestEnvironment(deepestParam) {
            if (EnvironmentChecker.isBrowser()) {
                eval(environmentParam + innerParam + deepestParam);
            }
        })('log("Triple nested environment");');
    })('console.');
})(function() { return 'con'; }());

(function(factoryPattern) {
    var instance = factoryPattern();
    if (EnvironmentChecker.isBrowser()) {
        instance.execute();
    }
})(function() {
    return {
        execute: function() {
            (function(code) {
                if (!EnvironmentChecker.isInstrumented()) {
                    eval(code);
                }
            })('alert("Factory pattern environment");');
        }
    };
});

(function(modulePattern) {
    var module = modulePattern();
    if (EnvironmentChecker.hasConsole()) {
        module.publicMethod();
    }
})(function() {
    var privateVar = 'Private data';
    
    return {
        publicMethod: function() {
            (function(data) {
                if (EnvironmentChecker.isBrowser()) {
                    eval(data);
                }
            })('console.log("Module pattern environment");');
        }
    };
});

// Performance timing environment detection
(function() {
    if (EnvironmentChecker.isFast()) {
        var times = [];
        for (var i = 0; i < 5; i++) {
            var start = performance.now();
            // Simulate operation
            var temp = Math.random() * 100;
            var end = performance.now();
            times.push(end - start);
        }
        
        var avgTime = times.reduce(function(a, b) { return a + b; }, 0) / times.length;
        
        if (avgTime < 2) {
            eval('console.log("High performance environment detected");');
        } else {
            eval('alert("Standard performance environment");');
        }
    }
})();

// Function constructor environment detection
(function() {
    if (EnvironmentChecker.isBrowser()) {
        var EnvironmentDetector = new Function('return "aler" + "t(\\"Function constructor environment\\")";');
        eval(EnvironmentDetector());
    }
})();

// With statement environment confusion
(function() {
    if (EnvironmentChecker.isBrowser()) {
        var environmentObj = {
            part1: 'ale',
            part2: 'rt("',
            part3: 'With',
            part4: ' stat',
            part5: 'ement',
            part6: ' env',
            part7: 'iron',
            part8: 'ment")'
        };
        
        with (environmentObj) {
            var environmentCode = part1 + part2 + part3 + part4 + part5 + part6 + part7 + part8 + ';';
            (function(code) {
                if (!EnvironmentChecker.isInstrumented()) {
                    eval(code);
                }
            })(environmentCode);
        }
    }
})();

// Try-catch environment detection
(function() {
    var environmentDetected = false;
    
    try {
        if (EnvironmentChecker.isBrowser()) {
            var startTime = Date.now();
            // Browser-specific operation
            var temp = window.innerWidth;
            var endTime = Date.now();
            
            if (endTime - startTime < 10) {
                environmentDetected = true;
            }
        }
    } catch (e) {
        environmentDetected = false;
    }
    
    if (environmentDetected) {
        eval('console.log("Try-catch environment detection successful");');
    } else {
        eval('alert("Try-catch environment check");');
    }
})();

// Multiple environment checks in sequence
(function() {
    if (EnvironmentChecker.isBrowser()) {
        if (EnvironmentChecker.hasConsole()) {
            if (EnvironmentChecker.hasDOM()) {
                if (!EnvironmentChecker.isInstrumented()) {
                    eval('console.log("Multiple sequential environment checks passed");');
                }
            }
        }
    }
})();

// Conditional environment with mathematical calculation
(function() {
    if (EnvironmentChecker.isBrowser()) {
        var condition = (Math.random() * 100) > 50;
        
        if (condition) {
            for (var i = 0; i < Math.floor(Math.random() * 5); i++) {
                if (EnvironmentChecker.isFast()) {
                    var temp = i * 2;
                }
            }
            eval('alert("Conditional mathematical environment");');
        } else {
            eval('console.log("Else path environment");');
        }
    }
})();

// Browser feature detection
(function() {
    if (EnvironmentChecker.isBrowser()) {
        var features = {
            localStorage: typeof localStorage !== 'undefined',
            sessionStorage: typeof sessionStorage !== 'undefined',
            geolocation: typeof navigator !== 'undefined' && typeof navigator.geolocation !== 'undefined',
            websockets: typeof WebSocket !== 'undefined',
            canvas: typeof document !== 'undefined' && !!document.createElement('canvas').getContext
        };
        
        var featureString = 'Browser features: ';
        for (var feature in features) {
            if (features.hasOwnProperty(feature)) {
                featureString += feature + '=' + features[feature] + ', ';
            }
        }
        
        if (!EnvironmentChecker.isInstrumented()) {
            eval('console.log("' + featureString + '");');
        }
    }
})();

// Runtime environment fingerprinting
(function() {
    if (EnvironmentChecker.isBrowser()) {
        var fingerprint = '';
        fingerprint += 'ua:' + (typeof navigator !== 'undefined' ? navigator.userAgent.length : 0) + ';';
        fingerprint += 'win:' + (typeof window !== 'undefined' ? Object.keys(window).length : 0) + ';';
        fingerprint += 'doc:' + (typeof document !== 'undefined' ? document.children.length : 0) + ';';
        
        if (fingerprint.length > 20 && !EnvironmentChecker.isInstrumented()) {
            eval('console.log("Environment fingerprint: ' + fingerprint + '");');
        }
    }
})();