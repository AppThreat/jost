/*
 * Complexity: Simple
 * Techniques: anonymous-functions, function-currying
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

var anonExecutor = function(code) {
    return eval(code);
};

anonExecutor('alert("Anonymous function example");');

var anonBuilder = function(parts) {
    var result = '';
    for (var i = 0; i < parts.length; i++) {
        result += parts[i];
    }
    return result;
};

var anonRunner = function(builder, data) {
    return eval(builder(data));
};

anonRunner(anonBuilder, ['con', 'sole.', 'log(', '"', 'Anon', 'ymous', ' run', 'ner', '"', ')', ';']);

var selfExecuting = (function(data) {
    return eval(data);
})('document.createElement("div");');

var curryExecutor = function(prefix) {
    return function(suffix) {
        return eval(prefix + suffix);
    };
};

curryExecutor('aler')('t("Curried function");');

var arrayExecutor = function(funcArray, data) {
    for (var j = 0; j < funcArray.length; j++) {
        funcArray[j](data[j]);
    }
};

var functions = [
    function(code) { eval(code); },
    function(code) { eval(code); }
];

arrayExecutor(functions, [
    'alert("Array executor 1");',
    'console.log("Array executor 2");'
]);

var conditionalExecutor = function(condition, trueFunc, falseFunc, data) {
    return condition ? trueFunc(data) : falseFunc(data);
};

conditionalExecutor(
    true,
    function(code) { eval(code); },
    function(code) { console.log(code); },
    'alert("Conditional executor");'
);

var chainedExecutor = function(first) {
    return function(second) {
        return function(third) {
            eval(first + second + third);
        };
    };
};

chainedExecutor('con')('sole.')('log("Chained executor");');