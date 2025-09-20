/*
 * Complexity: Simple
 * Techniques: function-renaming, identifier-renaming
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

var a = function(code) {
    return eval(code);
};

a('alert("Function renaming example");');

var b = function(parts) {
    var result = '';
    for (var i = 0; i < parts.length; i++) {
        result += parts[i];
    }
    return result;
};

var c = function(builder, data) {
    return eval(builder(data));
};

c(b, ['con', 'sole.', 'log(', '"', 'Renam', 'ed', ' func', 'tion', '"', ')', ';']);

var d = function(data) {
    return eval(data);
};

d('document.createElement("div");');

var e = function(prefix) {
    return function(suffix) {
        return eval(prefix + suffix);
    };
};

e('aler')('t("Curried renamed function");');

var f = function(funcArray, data) {
    for (var j = 0; j < funcArray.length; j++) {
        funcArray[j](data[j]);
    }
};

var g = [
    function(code) { eval(code); },
    function(code) { eval(code); }
];

f(g, [
    'alert("Array renamed executor 1");',
    'console.log("Array renamed executor 2");'
]);

var h = function(condition, trueFunc, falseFunc, data) {
    return condition ? trueFunc(data) : falseFunc(data);
};

h(
    true,
    function(code) { eval(code); },
    function(code) { console.log(code); },
    'alert("Conditional renamed executor");'
);