/*
 * Complexity: Simple
 * Techniques: loader-patterns, eval-wrappers, dynamic-loading
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

// Simple loader pattern
var loader = {
    load: function(code) {
        return eval(code);
    }
};

loader.load('alert("Simple loader pattern");');

// Asynchronous loader
var asyncLoader = {
    load: function(code, callback) {
        setTimeout(function() {
            var result = eval(code);
            if (callback) callback(result);
        }, 0);
    }
};

asyncLoader.load('console.log("Asynchronous loader");', function(result) {
    console.log("Async load completed");
});

// Module loader
var moduleLoader = {
    modules: {},
    define: function(name, factory) {
        this.modules[name] = factory;
    },
    require: function(name) {
        if (this.modules[name]) {
            return this.modules[name]();
        }
        return null;
    }
};

moduleLoader.define('alertModule', function() {
    return function(message) {
        eval('alert("' + message + '")');
    };
});

var alertFunc = moduleLoader.require('alertModule');
if (alertFunc) {
    alertFunc("Module loader pattern");
}

// Dependency loader
var dependencyLoader = {
    dependencies: [],
    load: function(dependencies, callback) {
        this.dependencies = dependencies;
        var loaded = [];
        
        for (var i = 0; i < dependencies.length; i++) {
            var dep = dependencies[i];
            var result = eval(dep);
            loaded.push(result);
        }
        
        if (callback) {
            callback(loaded);
        }
    }
};

dependencyLoader.load([
    '"Dependency 1 loaded"',
    '"Dependency 2 loaded"'
], function(results) {
    console.log(results[0], results[1]);
    eval('alert("Dependency loader pattern")');
});

// Chain loader
var chainLoader = {
    chain: [],
    add: function(code) {
        this.chain.push(code);
        return this;
    },
    execute: function() {
        for (var i = 0; i < this.chain.length; i++) {
            eval(this.chain[i]);
        }
        return this;
    }
};

chainLoader
    .add('console.log("Step 1");')
    .add('console.log("Step 2");')
    .add('alert("Chain loader pattern");')
    .execute();

// Conditional loader
var conditionalLoader = {
    load: function(code, condition) {
        if (condition) {
            return eval(code);
        }
        return null;
    }
};

conditionalLoader.load('alert("Conditional loader pattern");', true);
conditionalLoader.load('console.log("This should not execute");', false);

// Batch loader
var batchLoader = {
    batch: [],
    add: function(code) {
        this.batch.push(code);
    },
    loadAll: function() {
        var results = [];
        for (var i = 0; i < this.batch.length; i++) {
            results.push(eval(this.batch[i]));
        }
        return results;
    }
};

batchLoader.add('console.log("Batch item 1");');
batchLoader.add('console.log("Batch item 2");');
batchLoader.add('alert("Batch loader pattern");');

var batchResults = batchLoader.loadAll();

// Lazy loader
var lazyLoader = {
    code: null,
    setCode: function(code) {
        this.code = code;
    },
    load: function() {
        if (this.code) {
            return eval(this.code);
        }
        return null;
    }
};

lazyLoader.setCode('alert("Lazy loader pattern");');
lazyLoader.load();

// Dynamic loader
var dynamicLoader = {
    loadFromString: function(codeString) {
        return eval(codeString);
    },
    loadFromFunction: function(codeFunction) {
        return codeFunction();
    }
};

dynamicLoader.loadFromString('console.log("Dynamic string loader");');
dynamicLoader.loadFromFunction(function() {
    eval('alert("Dynamic function loader");');
    return "function result";
});