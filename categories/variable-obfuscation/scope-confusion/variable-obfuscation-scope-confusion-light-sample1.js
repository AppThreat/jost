/*
 * Complexity: Simple
 * Techniques: scope-confusion, variable-shadowing
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

var globalVar = 'alert("Scope confusion example");';

function outerFunc() {
    var globalVar = 'console.log("Shadowed variable");';
    
    function innerFunc() {
        var globalVar = 'document.createElement("div");';
        eval(globalVar);
    }
    
    innerFunc();
    eval(globalVar);
}

outerFunc();
eval(globalVar);

(function() {
    var localVar = 'aler';
    (function() {
        var localVar = 't("Ne';
        (function() {
            var localVar = 'sted';
            (function() {
                var localVar = ' sco';
                (function() {
                    var localVar = 'pe")';
                    var finalCode = localVar + localVar + localVar + localVar + localVar + ';';
                    eval(finalCode);
                })();
            })();
        })();
    })();
})();

var x = 'con';
var y = 'sole.';
var z = 'log(';
var a = '"Glo';
var b = 'bal';
var c = ' var';
var d = '")';

function scopeTest1() {
    var x = 'ale';
    var y = 'rt(';
    var z = '"Loc';
    var a = 'al';
    var b = ' va';
    var c = 'r")';
    
    function scopeTest2() {
        var code = x + y + z + a + b + c + ';';
        eval(code);
    }
    
    scopeTest2();
    
    var code2 = x + y + z + a + b + ';';
    eval(code2);
}

scopeTest1();

var code = x + y + z + a + b + c + d + ';';
eval(code);

// Variable hoisting confusion
function hoistingConfusion() {
    eval(lateVar);
    var lateVar = 'alert("Hoisting confusion");';
}

hoistingConfusion();

// Closure scope confusion
function closureScope() {
    var secret = 'aler';
    return function() {
        var secret = 't("Clo';
        return function() {
            var secret = 'sure';
            var finalSecret = secret + secret + secret + '")';
            eval(secret + finalSecret + ';');
        };
    };
}

closureScope()()();