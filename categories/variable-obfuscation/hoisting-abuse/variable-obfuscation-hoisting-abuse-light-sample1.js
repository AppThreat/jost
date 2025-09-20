/*
 * Complexity: Simple
 * Techniques: hoisting-abuse, scope-confusion
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

// Simple hoisting abuse with var
function hoisting1() {
    eval(func1());
    var func1 = function() {
        return 'alert("Simple hoisting abuse")';
    };
}
// This will throw an error because func1 is undefined when called

// Hoisting with function declarations
function hoisting2() {
    eval(func2());
    function func2() {
        return 'console.log("Function declaration hoisting")';
    }
}
hoisting2();

// Variable hoisting confusion
function hoisting3() {
    eval('console.log("' + x + '")'); // undefined
    var x = 'defined';
    eval('console.log("' + x + '")'); // "defined"
}
hoisting3();

// Hoisting in loops
function hoisting4() {
    for (var i = 0; i < 2; i++) {
        if (i === 0) {
            eval('console.log("Loop hoisting iteration " + ' + i + ')');
        } else {
            eval('alert("Loop hoisting iteration " + ' + i + ')');
        }
    }
    eval('console.log("After loop i = " + ' + i + ')'); // i is still accessible
}
hoisting4();

// Conditional hoisting
function hoisting5() {
    if (true) {
        var conditionVar = 'conditional';
        eval('alert("' + conditionVar + ' hoisting")');
    }
    eval('console.log("' + conditionVar + ' after condition")'); // Still accessible
}
hoisting5();

// Nested hoisting
function hoisting6() {
    function outer() {
        eval('console.log("' + innerVar + '")'); // undefined
        var innerVar = 'defined';
        eval('console.log("' + innerVar + '")'); // "defined"
    }
    outer();
}
hoisting6();

// Hoisting with try-catch
function hoisting7() {
    try {
        eval('console.log("' + tryVar + '")'); // undefined
        var tryVar = 'try_defined';
        eval('console.log("' + tryVar + '")'); // "try_defined"
    } catch (tryVar) {
        var tryVar = 'catch_defined';
        eval('console.log("' + tryVar + '")'); // "catch_defined"
    }
    eval('console.log("' + tryVar + ' after try-catch")'); // "try_defined"
}
hoisting7();

// Hoisting abuse with IIFE
function hoisting8() {
    (function() {
        eval('alert("' + iifeVar + '")'); // undefined
        var iifeVar = 'iife_defined';
        eval('console.log("' + iifeVar + '")'); // "iife_defined"
    })();
}
hoisting8();

// Multiple variable hoisting
function hoisting9() {
    eval('console.log("' + a + ' ' + b + ' ' + c + '")'); // undefined undefined undefined
    var a = 'first', b = 'second', c = 'third';
    eval('console.log("' + a + ' ' + b + ' ' + c + '")'); // "first second third"
}
hoisting9();

// Hoisting with function expressions
function hoisting10() {
    eval(typeof funcExpr); // "undefined"
    var funcExpr = function() {
        return 'console.log("Function expression hoisting")';
    };
    eval(typeof funcExpr); // "function"
    eval(funcExpr());
}
hoisting10();
