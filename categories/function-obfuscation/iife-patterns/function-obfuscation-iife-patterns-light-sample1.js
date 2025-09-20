/*
 * Complexity: Simple
 * Techniques: iife, anonymous-functions
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

(function(code) {
    eval(code);
})('alert("Simple IIFE example");');

(function(parts) {
    var result = '';
    for (var i = 0; i < parts.length; i++) {
        result += parts[i];
    }
    eval(result);
})(['con', 'sole.', 'log(', '"', 'IIFE', ' pat', 'tern', '"', ')', ';']);

(function(data) {
    return eval(data);
})('document.createElement("div");');

(function(prefix) {
    return function(suffix) {
        eval(prefix + suffix);
    };
})('aler')('t("Curried IIFE");');

(function(funcArray, data) {
    for (var j = 0; j < funcArray.length; j++) {
        (function(index) {
            funcArray[index](data[index]);
        })(j);
    }
})([
    function(code) { eval(code); },
    function(code) { eval(code); }
], [
    'alert("Array IIFE executor 1");',
    'console.log("Array IIFE executor 2");'
]);

(function(condition, trueCode, falseCode) {
    (function(code) {
        eval(code);
    })(condition ? trueCode : falseCode);
})(true, 'alert("True IIFE");', 'console.log("False IIFE");');

(function(builder) {
    return function(executor) {
        executor(builder);
    };
})(function() {
    return 'document.getElementById("test");';
})(function(codeFunc) {
    eval(codeFunc());
});