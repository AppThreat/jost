/*
 * Complexity: High
 * Techniques: Advanced debugger detection, timing attacks, environment fingerprinting, obfuscated checks
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

(function(root, factory) {
    'use strict';
    
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.AntiAnalysisHeavy = factory();
    }
}(typeof self !== 'undefined' ? self : this, function() {
    'use strict';
    
    // Configuration
    var config = {
        thresholds: {
            timing: 100,
            memory: 1000000,
            loops: 10000
        },
        features: {
            enableDebugger: true,
            enableTiming: true,
            enableMemory: true,
            enableConsole: true,
            enableDOM: true,
            enableNetwork: true,
            enableAPI: true
        }
    };
    
    // Utility functions
    var utils = {
        uid: function() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },
        
        hash: function(str) {
            var hash = 0, i, chr;
            if (str.length === 0) return hash;
            for (i = 0; i < str.length; i++) {
                chr = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + chr;
                hash |= 0;
            }
            return hash;
        },
        
        random: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        
        now: function() {
            return performance.now ? performance.now() : Date.now();
        }
    };
    
    // Core detection engine
    var DetectionEngine = function(options) {
        this.options = options || {};
        this.results = {};
        this.scores = {};
        this.init();
    };
    
    DetectionEngine.prototype.init = function() {
        this.detectors = [
            new DebuggerDetector(),
            new TimingDetector(),
            new MemoryDetector(),
            new ConsoleDetector(),
            new DOMDetector(),
            new NetworkDetector(),
            new APIDetector(),
            new EnvironmentDetector(),
            new FingerprintDetector(),
            new BehaviorDetector()
        ];
    };
    
    DetectionEngine.prototype.run = function() {
        var totalScore = 0;
        var detectionCount = 0;
        
        for (var i = 0; i < this.detectors.length; i++) {
            var detector = this.detectors[i];
            var result = detector.detect();
            
            this.results[detector.name] = result;
            this.scores[detector.name] = detector.score || 0;
            
            if (result) {
                totalScore += detector.score || 1;
                detectionCount++;
            }
        }
        
        return {
            detected: detectionCount > 0,
            score: totalScore,
            count: detectionCount,
            results: this.results,
            scores: this.scores
        };
    };
    
    // Detector classes
    var DebuggerDetector = function() {
        this.name = 'debugger';
        this.score = 10;
    };
    
    DebuggerDetector.prototype.detect = function() {
        var start = utils.now();
        var count = 0;
        
        // Multiple debugger statements to increase detection chance
        for (var i = 0; i < 5; i++) {
            debugger;
            count++;
        }
        
        var end = utils.now();
        var duration = end - start;
        
        // Check if execution was paused
        return duration > config.thresholds.timing || count !== 5;
    };
    
    var TimingDetector = function() {
        this.name = 'timing';
        this.score = 8;
    };
    
    TimingDetector.prototype.detect = function() {
        var samples = [];
        var iterations = config.thresholds.loops;
        
        // Run timing tests
        for (var test = 0; test < 10; test++) {
            var start = utils.now();
            
            // CPU intensive operation
            for (var i = 0; i < iterations; i++) {
                Math.sin(Math.random());
            }
            
            var end = utils.now();
            samples.push(end - start);
        }
        
        // Calculate average and variance
        var sum = samples.reduce(function(a, b) { return a + b; }, 0);
        var avg = sum / samples.length;
        var variance = samples.reduce(function(acc, val) { 
            return acc + Math.pow(val - avg, 2); 
        }, 0) / samples.length;
        
        // High variance may indicate debugging
        return variance > (avg * 0.5);
    };
    
    var MemoryDetector = function() {
        this.name = 'memory';
        this.score = 7;
    };
    
    MemoryDetector.prototype.detect = function() {
        if (!performance.memory) return false;
        
        var samples = [];
        
        // Take memory samples
        for (var i = 0; i < 5; i++) {
            samples.push({
                used: performance.memory.usedJSHeapSize,
                total: performance.memory.totalJSHeapSize,
                limit: performance.memory.jsHeapSizeLimit
            });
            
            // Force garbage collection simulation
            if (window.gc) window.gc();
            
            // Small delay
            var start = Date.now();
            while (Date.now() - start < 10) {}
        }
        
        // Check for memory anomalies
        var usedChanges = [];
        for (var j = 1; j < samples.length; j++) {
            usedChanges.push(samples[j].used - samples[j-1].used);
        }
        
        // Large memory changes may indicate instrumentation
        var avgChange = usedChanges.reduce(function(a, b) { return a + b; }, 0) / usedChanges.length;
        return Math.abs(avgChange) > config.thresholds.memory;
    };
    
    var ConsoleDetector = function() {
        this.name = 'console';
        this.score = 6;
    };
    
    ConsoleDetector.prototype.detect = function() {
        if (!console) return false;
        
        // Check console properties
        var props = ['log', 'info', 'warn', 'error', 'debug', 'table', 'trace'];
        var found = 0;
        
        for (var i = 0; i < props.length; i++) {
            if (typeof console[props[i]] === 'function') {
                found++;
            }
        }
        
        // DevTools often add extra console methods
        if (found > props.length) return true;
        
        // Check console output behavior
        var startLength = 0;
        if (console.history) {
            startLength = console.history.length;
        }
        
        console.log('%c', 'color: transparent');
        
        // Check if output was captured
        if (console.history && console.history.length > startLength) {
            return true;
        }
        
        return false;
    };
    
    var DOMDetector = function() {
        this.name = 'dom';
        this.score = 5;
    };
    
    DOMDetector.prototype.detect = function() {
        // Check for DOM modifications by devtools
        var testDiv = document.createElement('div');
        testDiv.innerHTML = '<!--[if IE]><i></i><![endif]-->';
        var isIE = testDiv.getElementsByTagName('i').length === 1;
        
        // Check element inspection
        var x = /./;
        x.toString = function() {
            this.opened = true;
            return '';
        };
        
        console.log('%c', x);
        var wasOpened = !!x.opened;
        
        // Check computed styles
        var computedStyle = window.getComputedStyle ? 
            window.getComputedStyle(document.body, null) : 
            document.body.currentStyle;
            
        // Check for unusual style properties
        var styleKeys = computedStyle ? Object.keys(computedStyle) : [];
        var devtoolIndicators = styleKeys.filter(function(key) {
            return key.indexOf('webkit') !== -1 || key.indexOf('moz') !== -1;
        });
        
        return wasOpened || devtoolIndicators.length > 100;
    };
    
    var NetworkDetector = function() {
        this.name = 'network';
        this.score = 4;
    };
    
    NetworkDetector.prototype.detect = function() {
        // Check for network throttling
        if (navigator.connection) {
            var conn = navigator.connection;
            if (conn.downlink && conn.downlink < 0.1) {
                // Very slow connection might be simulated
                return true;
            }
        }
        
        // Check for unusual request patterns
        var originalXHR = window.XMLHttpRequest;
        var requestCount = 0;
        
        // Monkey patch XHR to monitor requests
        window.XMLHttpRequest = function() {
            requestCount++;
            return new originalXHR();
        };
        
        // Restore original
        window.XMLHttpRequest = originalXHR;
        
        // Check for request interception
        return requestCount > 1000; // Unlikely normal count
    };
    
    var APIDetector = function() {
        this.name = 'api';
        this.score = 6;
    };
    
    APIDetector.prototype.detect = function() {
        var suspiciousAPIs = [
            'webkitStorageInfo',
            'webkitIndexedDB',
            'mozAnimationStartTime',
            'chrome',
            '__firefox__',
            '__IE_DEVTOOLBAR_CONSOLE_COMMAND_LINE',
            '__BROWSERTOOLS_CONSOLE'
        ];
        
        var found = 0;
        for (var i = 0; i < suspiciousAPIs.length; i++) {
            if (suspiciousAPIs[i] in window) {
                found++;
            }
        }
        
        // Check for function tampering
        var nativeFunctions = [
            'Function.prototype.toString',
            'Object.defineProperty',
            'Array.prototype.push'
        ];
        
        var tampered = 0;
        for (var j = 0; j < nativeFunctions.length; j++) {
            var parts = nativeFunctions[j].split('.');
            var obj = window;
            for (var k = 0; k < parts.length - 1; k++) {
                obj = obj[parts[k]];
            }
            var funcName = parts[parts.length - 1];
            var func = obj[funcName];
            
            if (func && func.toString().indexOf('[native code]') === -1) {
                tampered++;
            }
        }
        
        return found > 2 || tampered > 1;
    };
    
    var EnvironmentDetector = function() {
        this.name = 'environment';
        this.score = 7;
    };
    
    EnvironmentDetector.prototype.detect = function() {
        var results = [];
        
        // Window dimension checks
        results.push(
            window.outerHeight - window.innerHeight > 200 ||
            window.outerWidth - window.innerWidth > 200
        );
        
        // Console dimension checks
        if (console && console.Console) {
            results.push(true);
        }
        
        // Check for unusual global properties
        var globalProps = Object.getOwnPropertyNames(window);
        var devtoolProps = globalProps.filter(function(prop) {
            return prop.indexOf('_') === 0 || 
                   prop.indexOf('webkit') === 0 ||
                   prop.indexOf('moz') === 0;
        });
        
        results.push(devtoolProps.length > 50);
        
        // Check for function constructor tampering
        var funcConstructor = (function() {}).constructor;
        results.push(
            funcConstructor.toString().indexOf('Function') === -1
        );
        
        // Check for proxy objects
        if (typeof Proxy !== 'undefined') {
            try {
                var p = new Proxy({}, {});
                results.push(p !== null);
            } catch (e) {
                results.push(true);
            }
        }
        
        return results.some(function(r) { return r; });
    };
    
    var FingerprintDetector = function() {
        this.name = 'fingerprint';
        this.score = 5;
    };
    
    FingerprintDetector.prototype.detect = function() {
        var fingerprints = [];
        
        // Canvas fingerprinting
        try {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            ctx.textBaseline = "top";
            ctx.font = "14px 'Arial'";
            ctx.fillStyle = "#f60";
            ctx.fillRect(125,1,62,20);
            ctx.fillStyle = "#069";
            ctx.fillText("Hello, World!", 2, 15);
            ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
            ctx.fillText("Hello, World!", 4, 17);
            var data = canvas.toDataURL();
            fingerprints.push(utils.hash(data));
        } catch (e) {
            fingerprints.push(0);
        }
        
        // WebGL fingerprinting
        try {
            var glCanvas = document.createElement('canvas');
            var gl = glCanvas.getContext('webgl') || glCanvas.getContext('experimental-webgl');
            if (gl) {
                var debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                if (debugInfo) {
                    var vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
                    var renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                    fingerprints.push(utils.hash(vendor + renderer));
                }
            }
        } catch (e) {
            fingerprints.push(0);
        }
        
        // Audio fingerprinting
        try {
            var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            var oscillator = audioCtx.createOscillator();
            var analyser = audioCtx.createAnalyser();
            var gain = audioCtx.createGain();
            var scriptProcessor = audioCtx.createScriptProcessor(4096, 1, 1);
            
            oscillator.type = "triangle";
            oscillator.connect(analyser);
            analyser.connect(scriptProcessor);
            scriptProcessor.connect(gain);
            gain.connect(audioCtx.destination);
            
            oscillator.start(0);
            var audioData = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(audioData);
            oscillator.stop();
            audioCtx.close();
            
            fingerprints.push(utils.hash(Array.prototype.join.call(audioData, '')));
        } catch (e) {
            fingerprints.push(0);
        }
        
        // Check for fingerprint consistency
        var uniqueFingerprints = fingerprints.filter(function(fp, index, self) {
            return self.indexOf(fp) === index && fp !== 0;
        });
        
        return uniqueFingerprints.length !== fingerprints.filter(function(fp) { return fp !== 0; }).length;
    };
    
    var BehaviorDetector = function() {
        this.name = 'behavior';
        this.score = 9;
    };
    
    BehaviorDetector.prototype.detect = function() {
        var behaviors = [];
        
        // Mouse movement analysis
        var mouseMovements = [];
        var mouseHandler = function(e) {
            mouseMovements.push({
                x: e.clientX,
                y: e.clientY,
                time: Date.now()
            });
        };
        
        document.addEventListener('mousemove', mouseHandler);
        
        // Wait a bit to collect data
        var start = Date.now();
        while (Date.now() - start < 100) {}
        
        document.removeEventListener('mousemove', mouseHandler);
        
        // Analyze movement patterns
        if (mouseMovements.length > 10) {
            var distances = [];
            for (var i = 1; i < mouseMovements.length; i++) {
                var dx = mouseMovements[i].x - mouseMovements[i-1].x;
                var dy = mouseMovements[i].y - mouseMovements[i-1].y;
                distances.push(Math.sqrt(dx*dx + dy*dy));
            }
            
            // Check for unnatural movement (too perfect)
            var avgDistance = distances.reduce(function(a, b) { return a + b; }, 0) / distances.length;
            var variance = distances.reduce(function(acc, val) { 
                return acc + Math.pow(val - avgDistance, 2); 
            }, 0) / distances.length;
            
            behaviors.push(variance < 1); // Too consistent
        }
        
        // Keyboard timing analysis
        var keyTimings = [];
        var keyHandler = function(e) {
            keyTimings.push(Date.now());
        };
        
        document.addEventListener('keydown', keyHandler);
        
        // Simulate key presses
        var keyEvent = new KeyboardEvent('keydown', { keyCode: 65 });
        document.dispatchEvent(keyEvent);
        
        document.removeEventListener('keydown', keyHandler);
        
        // Check for unnatural timing
        if (keyTimings.length >= 2) {
            var timeDiff = keyTimings[1] - keyTimings[0];
            behaviors.push(timeDiff < 10); // Too fast for human
        }
        
        // Scroll behavior analysis
        var scrollPositions = [];
        var scrollHandler = function() {
            scrollPositions.push(window.scrollY);
        };
        
        window.addEventListener('scroll', scrollHandler);
        
        // Simulate scroll
        window.scrollTo(0, 100);
        window.scrollTo(0, 0);
        
        window.removeEventListener('scroll', scrollHandler);
        
        // Check for scroll behavior
        behaviors.push(scrollPositions.length > 10); // Too many events
        
        return behaviors.some(function(b) { return b; });
    };
    
    // Obfuscation layer
    var Obfuscator = {
        encode: function(str) {
            var encoded = '';
            for (var i = 0; i < str.length; i++) {
                encoded += String.fromCharCode(str.charCodeAt(i) ^ 42);
            }
            return btoa(encoded);
        },
        
        decode: function(str) {
            var decoded = atob(str);
            var result = '';
            for (var i = 0; i < decoded.length; i++) {
                result += String.fromCharCode(decoded.charCodeAt(i) ^ 42);
            }
            return result;
        },
        
        scramble: function(obj) {
            var keys = Object.keys(obj);
            var scrambled = {};
            
            // Shuffle keys
            for (var i = keys.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = keys[i];
                keys[i] = keys[j];
                keys[j] = temp;
            }
            
            // Reassign with scrambled keys
            for (var k = 0; k < keys.length; k++) {
                scrambled[this.encode(keys[k])] = obj[keys[k]];
            }
            
            return scrambled;
        }
    };
    
    // Main execution
    var detector = new DetectionEngine(config);
    var results = detector.run();
    
    // Obfuscate results for additional challenge
    var obfuscatedResults = Obfuscator.scramble(results);
    
    // Export API
    return {
        version: '1.0.0',
        config: config,
        detect: function() {
            return detector.run();
        },
        getResults: function() {
            return obfuscatedResults;
        },
        utils: utils,
        DetectionEngine: DetectionEngine,
        detectors: {
            DebuggerDetector: DebuggerDetector,
            TimingDetector: TimingDetector,
            MemoryDetector: MemoryDetector,
            ConsoleDetector: ConsoleDetector,
            DOMDetector: DOMDetector,
            NetworkDetector: NetworkDetector,
            APIDetector: APIDetector,
            EnvironmentDetector: EnvironmentDetector,
            FingerprintDetector: FingerprintDetector,
            BehaviorDetector: BehaviorDetector
        }
    };
}));

// Additional self-defense mechanisms
(function() {
    'use strict';
    
    // Protect against instrumentation
    var protect = function() {
        // Override common analysis functions
        var originals = {
            toString: Function.prototype.toString,
            valueOf: Object.prototype.valueOf,
            hasOwnProperty: Object.prototype.hasOwnProperty
        };
        
        // Restore originals periodically
        setInterval(function() {
            Function.prototype.toString = originals.toString;
            Object.prototype.valueOf = originals.valueOf;
            Object.prototype.hasOwnProperty = originals.hasOwnProperty;
        }, 1000);
        
        // Detect function tampering
        var checkTampering = function() {
            return Function.prototype.toString !== originals.toString ||
                   Object.prototype.valueOf !== originals.valueOf;
        };
        
        return checkTampering();
    };
    
    // Runtime integrity checking
    var integrity = {
        checksum: function() {
            // Calculate script checksum
            var script = document.currentScript;
            if (script) {
                return utils.hash(script.innerHTML);
            }
            return 0;
        },
        
        verify: function(expected) {
            return this.checksum() === expected;
        }
    };
    
    // Execute protection
    var isProtected = protect();
    
    // Export for testing
    if (typeof window !== 'undefined') {
        window.AntiAnalysisHeavyProtection = {
            protect: protect,
            integrity: integrity,
            isProtected: isProtected
        };
    }
})();
