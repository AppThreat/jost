/*
 * Complexity: Advanced
 * Techniques: eval-wrappers, base64, custom-encoding
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

var EvalWrapperProcessor = (function() {
    var wrapperState = {
        encodings: [],
        executions: 0,
        nestedDepth: 0
    };
    
    var sophisticatedEvalWrapper = function(code, encoding) {
        switch(encoding) {
            case 'base64':
                return eval(atob(code));
            case 'custom':
                var decoded = '';
                for (var i = 0; i < code.length; i += 2) {
                    decoded += String.fromCharCode(parseInt(code.substr(i, 2), 16));
                }
                return eval(decoded);
            default:
                return eval(code);
        }
    };
    
    var nestedEvalWrapper = function(code, depth) {
        if (depth <= 0) {
            return eval(code);
        }
        
        var nestedCode = 'eval("' + code.replace(/"/g, '\\"') + '");';
        return nestedEvalWrapper(nestedCode, depth - 1);
    };
    
    var conditionalEvalWrapper = function(code, conditions) {
        var result = code;
        for (var i = 0; i < conditions.length; i++) {
            if (conditions[i]) {
                result = 'eval("' + result.replace(/"/g, '\\"') + '");';
            }
        }
        return eval(result);
    };
    
    var recursiveEvalWrapper = function(codeArray, index) {
        if (index >= codeArray.length) {
            return;
        }
        
        eval(codeArray[index]);
        return recursiveEvalWrapper(codeArray, index + 1);
    };
    
    return {
        sophisticated: sophisticatedEvalWrapper,
        nested: nestedEvalWrapper,
        conditional: conditionalEvalWrapper,
        recursive: recursiveEvalWrapper
    };
})();

// Complex eval wrapper with multiple layers
(function() {
    var executionContext = {
        wrap: function(code) {
            return 'eval("' + code.replace(/"/g, '\\"') + '");';
        },
        
        execute: function(wrappedCode) {
            return eval(wrappedCode);
        }
    };
    
    var initialCode = 'console.log("Complex eval wrapper execution");';
    var wrapped = executionContext.wrap(initialCode);
    executionContext.execute(wrapped);
})();

// Nested eval wrapper
var NestedEvalWrapper = function(evalData) {
    var innerProcessor = function(data) {
        return function() {
            return eval(data);
        };
    };
    
    var outerProcessor = function(data) {
        return function(processor) {
            var outerWrapped = 'eval("' + data.replace(/"/g, '\\"') + '");';
            return function() {
                return eval(outerWrapped);
            };
        };
    };
    
    return function() {
        var intermediate = outerProcessor(evalData)(innerProcessor);
        return intermediate();
    };
};

(function(payload) {
    var evalExecutor = NestedEvalWrapper(payload);
    evalExecutor();
})('console.log("Nested eval wrapper functions");');

// Conditional eval wrapper with complex logic
var ConditionalEvalDecoder = function(selector, data1, data2) {
    var selectedData = selector ? data1 : data2;
    
    if (selector) {
        return (function(code) {
            var wrapped1 = 'eval("' + code.replace(/"/g, '\\"') + '");';
            var wrapped2 = 'eval("' + wrapped1.replace(/"/g, '\\"') + '");';
            return eval(wrapped2);
        })(selectedData);
    } else {
        return (function(code) {
            var simpleWrap = 'eval("' + code.replace(/"/g, '\\"') + '");';
            return eval(simpleWrap);
        })(selectedData);
    }
};

(function(condition, trueData, falseData) {
    var conditionalResult = ConditionalEvalDecoder(condition, trueData, falseData);
    eval(conditionalResult);
})(true, 'console.log("True path eval wrapper");', 'console.log("False path eval wrapper");');

// Array-based eval wrapper
var ArrayEvalDecoder = function(arrayOfFunctions, dataArray) {
    var result = '';
    for (var k = 0; k < arrayOfFunctions.length; k++) {
        result += arrayOfFunctions[k](dataArray[k]);
    }
    return result;
};

(function(fragmentFunctions, fragmentData) {
    var evalCombinedResult = ArrayEvalDecoder(fragmentFunctions, fragmentData);
    eval(evalCombinedResult);
})([
    function(part) { 
        var wrapped = 'eval("' + part + '");';
        return wrapped;
    },
    function(part) { 
        return part;
    },
    function(part) { 
        var doubleWrapped = 'eval("eval(\\"" + "' + part.replace(/"/g, '\\"') + '".replace(/"/g, \'\\\\"\') + "\\")");';
        return doubleWrapped;
    },
    function(part) { return part; }
], ['aler', 't("', 'Array', ' eval")', ';']);

// Recursive eval wrapper
var RecursiveEvalDecoder = function(data, depth) {
    if (depth <= 0) {
        return (function(code) {
            return eval(code);
        })(data);
    }
    
    return (function(recursiveFunc, currentData, currentDepth) {
        var recursiveWrapped = 'eval("' + currentData.replace(/"/g, '\\"') + '");';
        return recursiveFunc(recursiveWrapped, currentDepth - 1);
    })(RecursiveEvalDecoder, data, depth);
};

(function(recursiveData) {
    var recursiveResult = RecursiveEvalDecoder(recursiveData, 3);
    eval(recursiveResult);
})('console.log("Recursive eval wrapper functions");');

// Chained eval wrapper execution
var ChainedEvalExecution = function(data) {
    var processors = [
        function(d) { 
            return 'eval("' + d.replace(/"/g, '\\"') + '");';
        },
        function(d) { 
            return eval(d);
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
    ChainedEvalExecution(chainData);
})('document.getElementById("test");');

// Dynamic eval wrapper factory
var DynamicEvalDecoderFactory = function() {
    return {
        decode: function(data) {
            return (function(code) {
                var factoryWrapped = 'eval("' + code.replace(/"/g, '\\"') + '");';
                return eval(factoryWrapped);
            })(data);
        },
        execute: function(data) {
            return this.decode(data);
        }
    };
};

(function() {
    var evalFactory = DynamicEvalDecoderFactory();
    evalFactory.execute('alert("Factory eval wrapper functions");');
})();

// Multi-layer eval wrapper
var MultiLayerEvalDecoder = function(layer1, layer2, layer3) {
    var layerData = layer1;
    layerData = (function(data) {
        return 'eval("' + data.replace(/"/g, '\\"') + '");';
    })(layerData);
    layerData = (function(data) {
        return eval(data);
    })(layerData);
    return eval(layerData);
};

(function(layeredData) {
    MultiLayerEvalDecoder(layeredData, null, null);
})('console.log("Multi-layer eval wrapper functions");');

// Obfuscated eval wrapper class
var ObfuscatedEvalDecoderClass = function() {
    this.mode = "eval";
    this.wrap = function(data) {
        if (this.mode === "eval") {
            return 'eval("' + data.replace(/"/g, '\\"') + '");';
        }
        return data;
    };
    
    this.decode = function(data) {
        return (function(code) {
            return eval(code);
        })(this.wrap(data));
    };
    
    this.run = function(data) {
        return this.decode(data);
    };
};

(function() {
    var evalDecoderInstance = new ObfuscatedEvalDecoderClass();
    evalDecoderInstance.run('document.write("Object oriented eval wrapper functions");');
})();

// Complex eval wrapper execution flow
var ComplexEvalExecutionFlow = function(func) {
    var steps = {
        step1: function(data) { 
            return data;
        },
        step2: function(data) { 
            return (function(code) {
                var complexWrapped = 'eval("' + code.replace(/"/g, '\\"') + '");';
                return eval(complexWrapped);
            })(data);
        },
        step3: function(data) { 
            return data; 
        },
        step4: function(data) { 
            return eval(data); 
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
    ComplexEvalExecutionFlow(complexData);
})('alert("Complex eval wrapper execution flow");');

// Mathematical eval wrapper processor
var MathematicalEvalProcessor = function(parts) {
    var result = '';
    for (var n = 0; n < parts.length; n++) {
        result = (function(accum, part) {
            return accum + part;
        })(result, parts[n]);
    }
    var mathWrapped = 'eval("' + result.replace(/"/g, '\\"') + '");';
    return eval(mathWrapped);
};

(function(mathData) {
    eval(MathematicalEvalProcessor(mathData));
})(['cons', 'ole.', 'log("', 'Mathematical', ' eval")', ';']);

// Eval wrapper string manipulator
var EvalStringManipulator = function(parts) {
    var result = '';
    for (var o = 0; o < parts.length; o++) {
        result = (function(current, addition) {
            return current.concat(addition);
        })(result, parts[o]);
    }
    var manipulatedWrapped = 'eval("' + result.replace(/"/g, '\\"') + '");';
    return eval(manipulatedWrapped);
};

(function(manipulatedData) {
    eval(EvalStringManipulator(manipulatedData));
})(['docu', 'ment.', 'createTextNode("', 'Manipulated', ' eval");']);

// Eval wrapper array processor
var EvalArrayProcessor = function(arrayOfParts) {
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
    var arrayWrapped = 'eval("' + result.replace(/"/g, '\\"') + '");';
    return eval(arrayWrapped);
};

(function(partsData) {
    eval(EvalArrayProcessor(partsData));
})([['aler', 't("'], ['Arr', 'ay'], [' eval', ' wrap', 'per")', ';']]);

// Bitwise eval wrapper processor
var BitwiseEvalProcessor = function(parts) {
    var result = '';
    for (var r = 0; r < parts.length; r++) {
        result = (function(accum, part) {
            return accum + part;
        })(result, parts[r]);
    }
    var bitwiseWrapped = 'eval("' + result.replace(/"/g, '\\"') + '");';
    return eval(bitwiseWrapped);
};

(function(bitwiseData) {
    eval(BitwiseEvalProcessor(bitwiseData));
})(['cons', 'ole.', 'log("', 'Bitwise', ' eval");']);

// Advanced eval wrapper construction
var AdvancedEvalConstruction = function(parts) {
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
    var advancedWrapped = 'eval("' + result.replace(/"/g, '\\"') + '");';
    return eval(advancedWrapped);
};

(function(advancedData) {
    eval(AdvancedEvalConstruction(advancedData));
})(['cons', 'ole.', 'log("', 'Advanced', ' eval");']);

// Higher order eval wrapper handler
var HigherOrderEvalHandler = function(transformer) {
    return function(data) {
        return transformer(data);
    };
};

(function() {
    var higherOrderResult = HigherOrderEvalHandler(function(code) {
        var higherWrapped = 'eval("' + code.replace(/"/g, '\\"') + '");';
        return eval(higherWrapped);
    })('document.getElementById("higher-order-eval");');
    eval(higherOrderResult);
})();

// Curried eval wrapper handler
var CurriedEvalHandler = function(a) {
    return function(b) {
        return function(c) {
            return function(d) {
                var curriedCode = a + b + c + d;
                var curriedWrapped = 'eval("' + curriedCode.replace(/"/g, '\\"') + '");';
                return eval(curriedWrapped);
            };
        };
    };
};

(function() {
    CurriedEvalHandler('aler')('t("')('Cur', 'ried eval");');
})();

// Composed eval wrapper handler
var ComposedEvalHandler = function() {
    var compose = function(f, g) {
        return function(x) {
            return f(g(x));
        };
    };
    
    var addAlert = function(str) { return 'alert(' + str + ');'; };
    var wrapString = function(str) { return '"' + str + '"'; };
    
    var composed = compose(addAlert, wrapString);
    var composedResult = composed("Composed eval wrapper functions");
    var composedWrapped = 'eval("' + composedResult.replace(/"/g, '\\"') + '");';
    return eval(composedWrapped);
};

(function() {
    eval(ComposedEvalHandler());
})();

// Self-invoking eval wrapper handler
var SelfInvokingEvalHandler = function() {
    return (function(data) {
        var selfWrapped = 'eval("' + data.replace(/"/g, '\\"') + '");';
        return eval(selfWrapped);
    })('console.log("Self-invoking eval wrapper functions");');
};

(function() {
    SelfInvokingEvalHandler();
})();

// Additional complex eval wrapper patterns
(function outerEval(evalParam) {
    return (function innerEval(innerParam) {
        return (function deepestEval(deepestParam) {
            var tripleCode = evalParam + innerParam + deepestParam;
            var tripleWrapped = 'eval("' + tripleCode.replace(/"/g, '\\"') + '");';
            eval(tripleWrapped);
        })('log("Triple nested eval wrapper");');
    })('console.');
})(function() { return 'con'; }());

(function(factoryPattern) {
    var instance = factoryPattern();
    instance.execute();
})(function() {
    return {
        execute: function() {
            (function(code) {
                var factoryPatternWrapped = 'eval("' + code.replace(/"/g, '\\"') + '");';
                eval(factoryPatternWrapped);
            })('alert("Factory pattern eval wrapper");');
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
                var modulePatternWrapped = 'eval("' + data.replace(/"/g, '\\"') + '");';
                eval(modulePatternWrapped);
            })('console.log("Module pattern eval wrapper");');
        }
    };
});

// Performance timing eval wrapper
(function() {
    var times = [];
    for (var i = 0; i < 5; i++) {
        var start = performance.now();
        var timingCode = 'var temp = ' + i + ';';
        var timingWrapped = 'eval("' + timingCode.replace(/"/g, '\\"') + '");';
        eval(timingWrapped);
        var end = performance.now();
        times.push(end - start);
    }
    
    var avgTime = times.reduce(function(a, b) { return a + b; }, 0) / times.length;
    if (avgTime < 5) {
        eval('console.log("Performance timing eval wrapper check passed");');
    } else {
        eval('alert("Performance timing eval wrapper");');
    }
})();

// Function constructor eval wrapper
(function() {
    var EvalDetector = new Function('return "aler" + "t(\\"Function constructor eval wrapper\\")";');
    var constructorResult = EvalDetector();
    var constructorWrapped = 'eval("' + constructorResult.replace(/"/g, '\\"') + '");';
    eval(constructorWrapped);
})();

// With statement eval wrapper confusion
(function() {
    var evalObj = {
        part1: 'ale',
        part2: 'rt("',
        part3: 'With',
        part4: ' stat',
        part5: 'ement',
        part6: ' eval',
        part7: ' wrap',
        part8: 'per")'
    };
    
    with (evalObj) {
        var evalCode = part1 + part2 + part3 + part4 + part5 + part6 + part7 + part8 + ';';
        var withWrapped = 'eval("' + evalCode.replace(/"/g, '\\"') + '");';
        eval(withWrapped);
    }
})();

// Try-catch eval wrapper
(function() {
    var evalDetected = false;
    
    try {
        var tryCode = 'console.log("Try-catch eval wrapper");';
        var tryWrapped = 'eval("' + tryCode.replace(/"/g, '\\"') + '");';
        eval(tryWrapped);
    } catch (e) {
        evalDetected = true;
        eval('console.log("Try-catch eval wrapper caught exception");');
    }
    
    if (!evalDetected) {
        eval('alert("Try-catch eval wrapper check passed");');
    }
})();

// Multiple eval wrappers in sequence
(function() {
    for (var seq = 0; seq < 5; seq++) {
        var seqCode = 'console.log("Multiple sequential eval wrappers ' + seq + '");';
        var seqWrapped = 'eval("' + seqCode.replace(/"/g, '\\"') + '");';
        eval(seqWrapped);
    }
})();

// Conditional eval wrapper with mathematical calculation
(function() {
    var condition = (Math.random() * 100) > 50;
    
    if (condition) {
        for (var i = 0; i < Math.floor(Math.random() * 5); i++) {
            var mathCode = 'var calculation = ' + i + ' * 2;';
            var mathWrapped = 'eval("' + mathCode.replace(/"/g, '\\"') + '");';
            eval(mathWrapped);
        }
        eval('alert("Conditional mathematical eval wrapper");');
    } else {
        eval('console.log("Else path eval wrapper");');
    }
})();

// Base64 eval wrapper with decoding
(function() {
    var base64Code = 'YWxlcnQoIkJhc2U2NCBlbmNvZGVkIGV2YWwgd3JhcHBlciIpOw==';
    var decoded = atob(base64Code);
    var base64Wrapped = 'eval("' + decoded.replace(/"/g, '\\"') + '");';
    eval(base64Wrapped);
})();

// Hex eval wrapper
(function() {
    var hexCode = "616c657274282248657820656e636f646564206576616c207772617070657222293b";
    var hexDecoded = '';
    for (var i = 0; i < hexCode.length; i += 2) {
        hexDecoded += String.fromCharCode(parseInt(hexCode.substr(i, 2), 16));
    }
    var hexWrapped = 'eval("' + hexDecoded.replace(/"/g, '\\"') + '");';
    eval(hexWrapped);
})();

// Custom encoding eval wrapper
(function() {
    var customCode = "97,108,101,114,116,40,34,67,117,115,116,111,109,32,101,110,99,111,100,105,110,103,32,101,118,97,108,32,119,114,97,112,112,101,114,34,41,59";
    var customParts = customCode.split(',');
    var customDecoded = '';
    for (var i = 0; i < customParts.length; i++) {
        customDecoded += String.fromCharCode(parseInt(customParts[i]));
    }
    var customWrapped = 'eval("' + customDecoded.replace(/"/g, '\\"') + '");';
    eval(customWrapped);
})();

// Nested base64 eval wrapper
(function() {
    var nestedBase64 = 'ZXZhbChhdG9iKCJhVzFwYm1jZ1lXeHNJRlJ5YVdGc0lHRjBaU0k9IikpOw==';
    var nestedDecoded1 = atob(nestedBase64);
    var nestedDecoded2 = atob('YVcxcGJtY2dZV3hzSUVKeWFXRnNJR0YwWlNJPS');
    var nestedWrapped = 'eval("' + nestedDecoded1.replace(/"/g, '\\"') + '");';
    eval(nestedWrapped);
})();

// Eval wrapper with string obfuscation
(function() {
    var obfuscatedString = ['a','l','e','r','t','(','"','O','b','f','u','s','c','a','t','e','d',' ','e','v','a','l',' ','w','r','a','p','p','e','r','"',')',';'];
    var obfuscatedCode = obfuscatedString.join('');
    var obfuscatedWrapped = 'eval("' + obfuscatedCode.replace(/"/g, '\\"') + '");';
    eval(obfuscatedWrapped);
})();

// Eval wrapper with reverse string
(function() {
    var reverseString = ';)"esrever gnirts htiw elpwar evae"(trela';
    var reversed = reverseString.split('').reverse().join('');
    var reverseWrapped = 'eval("' + reversed.replace(/"/g, '\\"') + '");';
    eval(reverseWrapped);
})();

// Eval wrapper with character codes
(function() {
    var charCodes = [97, 108, 101, 114, 116, 40, 34, 67, 104, 97, 114, 97, 99, 116, 101, 114, 32, 99, 111, 100, 101, 115, 32, 101, 118, 97, 108, 32, 119, 114, 97, 112, 112, 101, 114, 34, 41, 59];
    var charCodeString = '';
    for (var i = 0; i < charCodes.length; i++) {
        charCodeString += String.fromCharCode(charCodes[i]);
    }
    var charCodeWrapped = 'eval("' + charCodeString.replace(/"/g, '\\"') + '");';
    eval(charCodeWrapped);
})();