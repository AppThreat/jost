/*
 * Complexity: Advanced
 * Techniques: function-renaming, identifier-renaming, scope-confusion
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

var _0x1a2b = (function() {
    var _0x2c3d = {};
    
    var _0x3e4f = function(_0x4f5a) {
        return function(_0x5a6b) {
            if (_0x4f5a.validate) {
                return (function(_0x6b7c) {
                    return eval(_0x6b7c);
                })(_0x5a6b);
            }
            return eval(_0x5a6b);
        };
    };
    
    var _0x7c8d = function(_0x8d9e) {
        return function(_0x9e0f) {
            return function(_0x0f1a) {
                return (function(_0x1a2b) {
                    return _0x1a2b(_0x8d9e + _0x9e0f + _0x0f1a);
                })(function(_0x2b3c) {
                    return eval(_0x2b3c);
                });
            };
        };
    };
    
    var _0x3c4d = function(_0x4d5e, _0x5e6f) {
        return function(_0x6f7a) {
            return _0x5e6f(_0x4d5e(_0x6f7a));
        };
    };
    
    var _0x7a8b = function(_0x8b9c) {
        if (_0x8b9c <= 0) {
            return function(_0x9c0d) {
                return eval(_0x9c0d);
            };
        }
        return function(_0x0d1e) {
            return _0x7a8b(_0x8b9c - 1)(_0x0d1e);
        };
    };
    
    return {
        factory: _0x3e4f,
        curried: _0x7c8d,
        compose: _0x3c4d,
        recursive: _0x7a8b
    };
})();

var _0x1b2c = function(_0x2c3d) {
    var _0x3d4e = {
        run: (function(_0x4e5f) {
            return function() {
                try {
                    return eval(_0x4e5f);
                } catch (_0x5f6a) {
                    return 'Error: ' + _0x5f6a.message;
                }
            };
        })(_0x2c3d)
    };
    return _0x3d4e.run();
};

var _0x1c2d = [
    'alert("Part 1");',
    'console.log("Part 2");',
    'document.createElement("div");',
    'window.location.href;'
];

for (var _0x2d3e = 0; _0x2d3e < _0x1c2d.length; _0x2d3e++) {
    var _0x3e4f = _0x1a2b.factory({ validate: true });
    _0x1b2c(_0x1c2d[_0x2d3e]);
}

var _0x1d2e = function(_0x2e3f) {
    var _0x3f4a = function(_0x4a5b) {
        return (function(_0x5b6c) {
            return eval(_0x5b6c);
        })(_0x4a5b);
    };
    
    var _0x6c7d = function(_0x7d8e) {
        return (function(_0x8e9f) {
            return _0x8e9f(_0x7d8e);
        })(_0x3f4a);
    };
    
    return function() {
        var _0x9f0a = _0x6c7d(_0x2e3f);
        return eval(_0x9f0a);
    };
};

var _0x1e2f = 'alert("Nested renamed functions");';
var _0x1f2a = _0x1d2e(_0x1e2f);
_0x1f2a();

var _0x1a3b = function(_0x2b3c, _0x3c4d, _0x4d5e, _0x5e6f) {
    var _0x6f7a = _0x2b3c ? _0x3c4d : _0x4d5e;
    return (function(_0x7a8b) {
        return eval(_0x7a8b);
    })(_0x6f7a(_0x5e6f));
};

var _0x1b3c = _0x1a3b(
    true,
    function(_0x2c3d) { return _0x2c3d; },
    function(_0x3d4e) { return _0x3d4e; },
    'console.log("True path renamed");'
);
eval(_0x1b3c);

var _0x1c3d = function(_0x2d3e, _0x3e4f) {
    var _0x4f5a = '';
    for (var _0x5a6b = 0; _0x5a6b < _0x2d3e.length; _0x5a6b++) {
        _0x4f5a += _0x2d3e[_0x5a6b](_0x3e4f[_0x5a6b]);
    }
    return _0x4f5a;
};

var _0x1d3e = [
    function(_0x2e3f) { return _0x2e3f; },
    function(_0x3f4a) { return _0x3f4a; },
    function(_0x4a5b) { return _0x4a5b; },
    function(_0x5b6c) { return _0x5b6c; }
];

var _0x1e3f = _0x1c3d(_0x1d3e, ['aler', 't("', 'Array', ' renamed");']);
eval(_0x1e3f);

var _0x1f3a = function(_0x2a3b, _0x3b4c) {
    if (_0x3b4c <= 0) {
        return (function(_0x4c5d) {
            return eval(_0x4c5d);
        })(_0x2a3b);
    }
    return (function(_0x5d6e, _0x6e7f, _0x7f8a) {
        return _0x5d6e(_0x6e7f, _0x7f8a - 1);
    })(_0x1f3a, _0x2a3b, _0x3b4c);
};

var _0x1a4b = 'console.log("Recursive renamed functions");';
var _0x1b4c = _0x1f3a(_0x1a4b, 2);
eval(_0x1b4c);

var _0x1c4d = function(_0x2d4e) {
    var _0x3e4f = [
        function(_0x4f5a) { return _0x4f5a; },
        function(_0x5a6b) { return eval(_0x5a6b); }
    ];
    
    var _0x6b7c = _0x2d4e;
    for (var _0x7c8d = 0; _0x7c8d < _0x3e4f.length; _0x7c8d++) {
        _0x6b7c = (function(_0x8d9e, _0x9e0f) {
            return _0x8d9e(_0x9e0f);
        })(_0x3e4f[_0x7c8d], _0x6b7c);
    }
    return _0x6b7c;
};

var _0x1d4e = 'document.getElementById("test");';
_0x1c4d(_0x1d4e);

var _0x1e4f = function() {
    return {
        decode: function(_0x2f5a) {
            return (function(_0x3a4b) {
                return eval(_0x3a4b);
            })(_0x2f5a);
        },
        execute: function(_0x4b5c) {
            return this.decode(_0x4b5c);
        }
    };
};

var _0x1f5a = _0x1e4f();
_0x1f5a.execute('alert("Factory renamed functions");');

var _0x1a5b = function(_0x2b5c, _0x3c5d, _0x4d5e) {
    var _0x5e5f = _0x2b5c;
    _0x5e5f = (function(_0x6f6a) {
        return _0x6f6a;
    })(_0x5e5f);
    _0x5e5f = (function(_0x7a6b) {
        return _0x7a6b;
    })(_0x5e5f);
    return eval(_0x5e5f);
};

var _0x1b5c = 'console.log("Multi-layer renamed functions");';
_0x1a5b(_0x1b5c, null, null);

var _0x1c5d = function() {
    this.mode = "renamed";
    this.decode = function(_0x2d5e) {
        if (this.mode === "renamed") {
            return (function(_0x3e5f) {
                return eval(_0x3e5f);
            })(_0x2d5e);
        }
        return _0x2d5e;
    };
    
    this.run = function(_0x4f6a) {
        return this.decode(_0x4f6a);
    };
};

var _0x1d5e = new _0x1c5d();
_0x1d5e.run('document.write("Object oriented renamed functions");');

var _0x1e5f = function(_0x2f6a) {
    var _0x3a6b = {
        step1: function(_0x4b6c) { return _0x4b6c; },
        step2: function(_0x5c6d) { 
            return (function(_0x6d6e) {
                return eval(_0x6d6e);
            })(_0x5c6d);
        },
        step3: function(_0x7e6f) { return _0x7e6f; },
        step4: function(_0x8f7a) { return eval(_0x8f7a); }
    };
    
    var _0x9a7b = [_0x3a6b.step1, _0x3a6b.step2, _0x3a6b.step3, _0x3a6b.step4];
    var _0x0b7c = _0x2f6a;
    
    for (var _0x1c7d = 0; _0x1c7d < _0x9a7b.length; _0x1c7d++) {
        _0x0b7c = (function(_0x2d7e, _0x3e7f) {
            return _0x2d7e(_0x3e7f);
        })(_0x9a7b[_0x1c7d], _0x0b7c);
    }
    
    return _0x0b7c;
};

var _0x1f6a = 'alert("Complex renamed execution flow");';
_0x1e5f(_0x1f6a);

var _0x1a6b = function(_0x2b6c) {
    var _0x3c6d = '';
    for (var _0x4d6e = 0; _0x4d6e < _0x2b6c.length; _0x4d6e++) {
        _0x3c6d = (function(_0x5e6f, _0x6f7a) {
            return _0x5e6f + _0x6f7a;
        })(_0x3c6d, _0x2b6c[_0x4d6e]);
    }
    return _0x3c6d;
};

var _0x1b6c = ['cons', 'ole.', 'log("', 'Mathematical', ' renamed",'];', '");'];
eval(_0x1a6b(_0x1b6c));

var _0x1c6d = function(_0x2d6e) {
    var _0x3e6f = '';
    for (var _0x4f7a = 0; _0x4f7a < _0x2d6e.length; _0x4f7a++) {
        _0x3e6f = (function(_0x5a7b, _0x6b7c) {
            return _0x5a7b.concat(_0x6b7c);
        })(_0x3e6f, _0x2d6e[_0x4f7a]);
    }
    return _0x3e6f;
};

var _0x1d6e = ['docu', 'ment.', 'createTextNode("', 'Manipulated', ' renamed");'];
eval(_0x1c6d(_0x1d6e));

var _0x1e6f = function(_0x2f7a) {
    var _0x3a7b = [];
    for (var _0x4b7c = 0; _0x4b7c < _0x2f7a.length; _0x4b7c++) {
        _0x3a7b = (function(_0x5c7d, _0x6d7e) {
            return _0x5c7d.concat(_0x6d7e);
        })(_0x3a7b, _0x2f7a[_0x4b7c]);
    }
    var _0x7e7f = '';
    for (var _0x8f8a = 0; _0x8f8a < _0x3a7b.length; _0x8f8a++) {
        _0x7e7f = (function(_0x9a8b, _0x0b8c) {
            return _0x9a8b + _0x0b8c;
        })(_0x7e7f, _0x3a7b[_0x8f8a]);
    }
    return _0x7e7f;
};

var _0x1f7a = [['aler', 't("'], ['Arr', 'ay'], [' ren', 'amed', '");']];
eval(_0x1e6f(_0x1f7a));

var _0x1a7b = function(_0x2b7c) {
    var _0x3c7d = '';
    for (var _0x4d7e = 0; _0x4d7e < _0x2b7c.length; _0x4d7e++) {
        _0x3c7d = (function(_0x5e7f, _0x6f8a) {
            return _0x5e7f + _0x6f8a;
        })(_0x3c7d, _0x2b7c[_0x4d7e]);
    }
    return _0x3c7d;
};

var _0x1b7c = ['cons', 'ole.', 'log("', 'Bitwise', ' renamed");'];
eval(_0x1a7b(_0x1b7c));

var _0x1c7d = function(_0x2d7e) {
    var _0x3e7f = '';
    var _0x4f8a = [
        function(_0x5a8b, _0x6b8c) { return _0x5a8b + _0x6b8c; },
        function(_0x7c8d, _0x8d8e) { return _0x8d8e + _0x7c8d; }
    ];
    
    for (var _0x9e8f = 0; _0x9e8f < _0x2d7e.length; _0x9e8f++) {
        var _0x0f9a = _0x9e8f % _0x4f8a.length;
        _0x3e7f = (function(_0x1a9b, _0x2b9c, _0x3c9d) {
            return _0x1a9b(_0x2b9c, _0x3c9d);
        })(_0x4f8a[_0x0f9a], _0x3e7f, _0x2d7e[_0x9e8f]);
    }
    return _0x3e7f;
};

var _0x1d7e = ['cons', 'ole.', 'log("', 'Advanced', ' renamed");'];
eval(_0x1c7d(_0x1d7e));

var _0x1e7f = function(_0x2f8a) {
    return function(_0x3a9b) {
        return _0x2f8a(_0x3a9b);
    };
};

var _0x1f8a = _0x1e7f(function(_0x2b9c) {
    return eval(_0x2b9c);
})('document.getElementById("higher-order-renamed");');
eval(_0x1f8a);

var _0x1a8b = function(_0x2c9d) {
    return function(_0x3d9e) {
        return function(_0x4e9f) {
            return function(_0x5f0a) {
                return eval(_0x2c9d + _0x3d9e + _0x4e9f + _0x5f0a);
            };
        };
    };
};

_0x1a8b('aler')('t("')('Cur', 'ried renamed");');

var _0x1b8c = function() {
    var _0x2c9d = function(_0x3d9e, _0x4e9f) {
        return function(_0x5f0a) {
            return _0x3d9e(_0x4e9f(_0x5f0a));
        };
    };
    
    var _0x6a0b = function(_0x7b0c) { return 'alert(' + _0x7b0c + ');'; };
    var _0x8c0d = function(_0x9d0e) { return '"' + _0x9d0e + '"'; };
    
    var _0x0e0f = _0x2c9d(_0x6a0b, _0x8c0d);
    return _0x0e0f("Composed renamed functions");
};

eval(_0x1b8c());

var _0x1c8d = function() {
    return (function(_0x2d9e) {
        return eval(_0x2d9e);
    })('console.log("Self-invoking renamed functions");');
};

_0x1c8d();