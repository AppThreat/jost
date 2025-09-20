/*
 * Complexity: Advanced
 * Techniques: scope-confusion, variable-shadowing, hoisting-abuse
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

var _0x1a2b = 'global';

(function(_0x2b3c) {
    var _0x1a2b = 'outer1';

    (function(_0x3c4d) {
        var _0x1a2b = 'inner1';

        (function(_0x4d5e) {
            var _0x1a2b = 'deepest1';

            var _0x5e6f = function(_0x6f7a) {
                return eval(_0x6f7a);
            };

            // Multiple nested scopes with same variable names
            _0x5e6f(_0x2b3c + _0x3c4d + _0x4d5e + _0x1a2b);
        })('log("Multiple nested scopes - ');
    })('console.');
})(function() { return 'con'; }());

// Complex scope chain with variable shadowing
var _0x1b2c = 'level0';

function _0x1c2d() {
    var _0x1b2c = 'level1';

    function _0x1d2e() {
        var _0x1b2c = 'level2';

        function _0x1e2f() {
            var _0x1b2c = 'level3';

            function _0x1f2a() {
                var _0x1b2c = 'level4';

                return function() {
                    // This should reference the innermost _0x1b2c
                    var _0x2a3b = function(_0x3b4c) {
                        return eval(_0x3b4c);
                    };
                    _0x2a3b('alert("' + _0x1b2c + ' scope");');
                };
            }

            return _0x1f2a()();
        }

        return _0x1e2f();
    }

    return _0x1d2e();
}

_0x1c2d();

// Scope confusion with closures and IIFEs
var _0x1a3b = 'outer';

var _0x1b3c = (function(_0x2c3d) {
    var _0x1a3b = 'iife_outer';

    return function(_0x3d4e) {
        var _0x1a3b = 'iife_inner';

        return (function(_0x4e5f) {
            var _0x1a3b = 'iife_deepest';

            var _0x5f6a = _0x2c3d + _0x3d4e + _0x4e5f + _0x1a3b;
            var _0x6a7b = function(_0x7b8c) {
                return eval(_0x7b8c);
            };

            return _0x6a7b(_0x5f6a);
        })(' scope")');
    };
})(function() { return 'alert("'; }())('with');

// Variable hoisting abuse with scope confusion
function _0x1c3d() {
    var _0x2d3e = function() {
        return _0x3e4f;
    };

    var _0x3e4f = 'aler';
    var _0x4f5a = 't("Ho';
    var _0x5a6b = 'isti';
    var _0x6b7c = 'ng ';
    var _0x7c8d = 'abuse';
    var _0x8d9e = '")';

    var _0x9e0f = _0x3e4f + _0x4f5a + _0x5a6b + _0x6b7c + _0x7c8d + _0x8d9e + ';';

    (function() {
        var _0x3e4f = 'console.log("Shadowed hoisting")';
        var _0x0f1a = function(_0x1a2b) {
            return eval(_0x1a2b);
        };
        _0x0f1a(_0x3e4f);
    })();

    var _0x1b2c = _0x2d3e();
    eval(_0x9e0f);
}

_0x1c3d();

// Complex closure with multiple scope levels
var _0x1d3e = 'module';

var _0x1e3f = (function() {
    var _0x1d3e = 'private_module';

    var _0x1f3a = function() {
        var _0x1d3e = 'private_function';

        return {
            publicMethod: function() {
                var _0x1d3e = 'public_scope';

                var _0x2a3b = function(_0x3b4c) {
                    var _0x1d3e = 'callback_scope';
                    return eval(_0x3b4c);
                };

                _0x2a3b('console.log("' + _0x1d3e + ' in closure");');
            },

            anotherMethod: function(_0x4c5d) {
                var _0x1d3e = 'parameter_scope';

                (function(_0x5d6e) {
                    var _0x1d3e = 'iife_parameter_scope';

                    var _0x6e7f = 'alert("' + _0x1d3e + ' in nested IIFE");';
                    var _0x7f8a = function(_0x8a9b) {
                        return eval(_0x8a9b);
                    };
                    _0x7f8a(_0x6e7f);
                })(_0x4c5d);
            }
        };
    };

    return _0x1f3a();
})();

_0x1e3f.publicMethod();
_0x1e3f.anotherMethod('parameter_data');

// Scope chain with dynamic variable access
function _0x1f3b() {
    var _0x2a3c = 'start';
    var _0x3b4d = '_';
    var _0x4c5e = 'middle';
    var _0x5d6f = '_';
    var _0x6e7a = 'end';

    function _0x7f8b() {
        var _0x2a3c = 'nested';
        var _0x3b4d = '_';
        var _0x4c5e = 'scope';
        var _0x5d6f = '_';
        var _0x6e7a = 'chain';

        function _0x8a9c() {
            var _0x2a3c = 'deepest';
            var _0x3b4d = '_';
            var _0x4c5e = 'level';
            var _0x5d6f = '_';
            var _0x6e7a = 'access';

            // Build string from variables in different scopes
            var _0x9b0d = _0x2a3c + _0x3b4d + _0x4c5e + _0x5d6f + _0x6e7a;
            var _0x0c1e = arguments.callee.caller.arguments.callee.caller.name || 'anonymous';

            return function() {
                var _0x1d2f = function(_0x2e3a) {
                    return eval(_0x2e3a);
                };
                _0x1d2f('alert("' + _0x9b0d + ' from ' + _0x0c1e + '");');
            };
        }

        return _0x8a9c();
    }

    // Mix variables from different scopes
    var _0x9c0e = _0x2a3c + _0x3b4d + _0x4c5e + _0x5d6f + _0x6e7a;
    var _0x0d1f = _0x7f8b();
    _0x0d1f();

    var _0x1e2a = function(_0x2f3b) {
        return eval(_0x2f3b);
    };
    _0x1e2a('console.log("' + _0x9c0e + ' scope chain");');
}

_0x1f3b();

// With statement scope confusion (deprecated but still relevant for analysis)
function _0x1f2b() {
    var _0x2a3c = {
        part1: 'ale',
        part2: 'rt("',
        part3: 'With',
        part4: ' stat',
        part5: 'ement',
        part6: '")'
    };

    with (_0x2a3c) {
        var _0x3b4d = part1 + part2 + part3 + part4 + part5 + part6 + ';';

        (function() {
            var part1 = 'console';
            var part2 = '.log("';
            var part3 = 'Nested';
            var part4 = ' with';
            var part5 = ' scope';
            var part6 = '")';

            with ({}) {
                var _0x4c5e = part1 + part2 + part3 + part4 + part5 + part6 + ';';
                var _0x5d6f = function(_0x6e7a) {
                    return eval(_0x6e7a);
                };
                _0x5d6f(_0x4c5e);
            }
        })();

        var _0x7e8b = function(_0x8f9c) {
            return eval(_0x8f9c);
        };
        _0x7e8b(_0x3b4d);
    }
}

_0x1f2b();

// Try-catch scope confusion
function _0x1a4b() {
    var _0x2b5c = 'outer_try';

    try {
        var _0x2b5c = 'inner_try';
        throw 'aler';
    } catch (_0x2b5c) {
        var _0x3c6d = _0x2b5c + 't("Catch block scope")';
        var _0x4d7e = function(_0x5e8f) {
            return eval(_0x5e8f);
        };
        _0x4d7e(_0x3c6d);
    }

    var _0x6f9a = function(_0x7a0b) {
        return eval(_0x7a0b);
    };
    _0x6f9a('console.log("' + _0x2b5c + ' after catch");');
}

_0x1a4b();

// Function constructor scope confusion
var _0x1b4c = function(_0x2c5d) {
    var _0x3d6e = 'Function';
    var _0x4e7f = ' scope';
    var _0x5f8a = ' confusion';

    return new Function('var _0x3d6e = "dynamic"; var _0x4e7f = " code"; var _0x5f8a = " execution"; return "' + _0x2c5d + '" + _0x3d6e + _0x4e7f + _0x5f8a;')();
};

var _0x1c4d = _0x1b4c('alert("');
eval(_0x1c4d + '");');

// Arrow function scope confusion
var _0x1d4e = (() => {
    var _0x1d4e = 'arrow';
    return () => {
        var _0x1d4e = 'nested_arrow';
        return () => {
            var _0x1d4e = 'deepest_arrow';
            var _0x2e5f = function(_0x3f6a) {
                return eval(_0x3f6a);
            };
            _0x2e5f('console.log("' + _0x1d4e + ' scope");');
        };
    };
})()()();

_0x1d4e;

// Class scope confusion
class _0x1e4f {
    constructor() {
        var _0x1e4f = 'class_constructor';
        this.method = function() {
            var _0x1e4f = 'class_method';
            return function() {
                var _0x1e4f = 'returned_function';
                var _0x2f5a = function(_0x3a6b) {
                    return eval(_0x3a6b);
                };
                _0x2f5a('alert("' + _0x1e4f + ' in class");');
            };
        };
    }
}

var _0x1f5a = new _0x1e4f();
_0x1f5a.method()();

// Generator function scope confusion
function* _0x1a5b() {
    var _0x1a5b = 'generator';
    yield function() {
        var _0x1a5b = 'yielded';
        return function*() {
            var _0x1a5b = 'nested_generator';
            yield function() {
                var _0x2b6c = function(_0x3c7d) {
                    return eval(_0x3c7d);
                };
                _0x2b6c('console.log("' + _0x1a5b + ' scope");');
            };
        };
    };
}

var _0x1b5c = _0x1a5b().next().value()().next().value;
_0x1b5c();

// Async function scope confusion
async function _0x1c5d() {
    var _0x1c5d = 'async';

    var _0x2d6e = async function() {
        var _0x1c5d = 'nested_async';

        var _0x3e7f = async function() {
            var _0x1c5d = 'deepest_async';
            var _0x4f8a = function(_0x5a9b) {
                return eval(_0x5a9b);
            };
            await _0x4f8a('alert("' + _0x1c5d + ' scope");');
        };

        await _0x3e7f();
    };

    await _0x2d6e();
}

_0x1c5d();

// Complex nested scope with multiple variable redeclarations
(function(_0x2e6f) {
    var _0x2e6f = 'param_shadow';

    (function(_0x2e6f) {
        var _0x2e6f = 'nested_param_shadow';

        return function(_0x2e6f) {
            var _0x2e6f = 'returned_param_shadow';

            return {
                method: function(_0x2e6f) {
                    var _0x2e6f = 'method_param_shadow';

                    var _0x3f7a = function(_0x4a8b) {
                        var _0x2e6f = 'callback_param_shadow';
                        return eval(_0x4a8b);
                    };

                    return _0x3f7a('console.log("' + _0x2e6f + ' in complex scope");');
                }
            };
        };
    })(_0x2e6f)();
})('initial')().method('call');

// Variable lookup chain confusion
var _0x1d5e = 'global_level';

function _0x1e5f() {
    var _0x1d5e = 'function_level';

    return {
        get: function() {
            var _0x1d5e = 'object_method_level';

            return (function() {
                var _0x1d5e = 'iife_level';

                return {
                    value: function() {
                        var _0x1d5e = 'nested_object_level';

                        // This creates confusion about which _0x1d5e is being referenced
                        var _0x2f6a = 'alert("';
                        var _0x3a7b = _0x1d5e;
                        var _0x4b8c = '")';
                        var _0x5c9d = _0x2f6a + _0x3a7b + _0x4b8c + ';';

                        var _0x6d0e = function(_0x7e1f) {
                            return eval(_0x7e1f);
                        };
                        return _0x6d0e(_0x5c9d);
                    }
                };
            })().value();
        }
    };
}

_0x1e5f().get();
