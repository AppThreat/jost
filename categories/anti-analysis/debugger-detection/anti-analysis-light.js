/*
 * Complexity: Low
 * Techniques: Debugger detection, timing checks, console checks
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */
(function() {
    'use strict';
    
    // Simple debugger detection
    var detectDebugger = function() {
        var start = new Date().getTime();
        debugger;
        var end = new Date().getTime();
        return (end - start) > 100;
    };
    
    // Console detection
    var detectConsole = function() {
        var c = console;
        return c && c.log && c.warn && c.error;
    };
    
    // Timing-based detection
    var timingCheck = function() {
        var start = performance.now();
        for (var i = 0; i < 1000; i++) {
            // Empty loop
        }
        var end = performance.now();
        return (end - start) > 5;
    };
    
    // DevTools detection through element inspection
    var devtoolsDetection = function() {
        var x = /./;
        x.toString = function() {
            return "\n";
        };
        console.log("%c", x);
        return x.toString() === "\n";
    };
    
    // Function length check
    var checkFunctionLength = function() {
        return (function() {}).length !== 0;
    };
    
    // toString tampering detection
    var toStringDetection = function() {
        var x = Function.prototype.toString;
        return x.toString().indexOf("[native code]") === -1;
    };
    
    // Simple environment checks
    var environmentChecks = function() {
        return (
            window.outerHeight - window.innerHeight > 200 ||
            window.outerWidth - window.innerWidth > 200
        );
    };
    
    // Performance monitor
    var performanceMonitor = function() {
        if (window.performance && window.performance.timing) {
            return window.performance.timing.loadEventEnd - window.performance.timing.navigationStart > 10000;
        }
        return false;
    };
    
    // Memory check
    var memoryCheck = function() {
        if (performance.memory) {
            return performance.memory.usedJSHeapSize > performance.memory.totalJSHeapSize;
        }
        return false;
    };
    
    // Call stack inspection
    var inspectCallStack = function() {
        try {
            throw new Error();
        } catch (e) {
            return e.stack && e.stack.indexOf("devtools") > -1;
        }
        return false;
    };
    
    // RegExp-based detection
    var regexpDetection = function() {
        var re = /test/;
        re.toString = function() { return "modified"; };
        return re.toString() !== "/test/";
    };
    
    // Date manipulation detection
    var dateManipulation = function() {
        var start = Date.now();
        debugger;
        var end = Date.now();
        return (end - start) > 1000;
    };
    
    // Self-checksum verification
    var selfChecksum = function() {
        var script = document.currentScript || (function() {
            var scripts = document.getElementsByTagName('script');
            return scripts[scripts.length - 1];
        })();
        if (script) {
            var content = script.innerHTML;
            var sum = 0;
            for (var i = 0; i < content.length; i++) {
                sum += content.charCodeAt(i);
            }
            return sum % 1000 !== 42; // Expected checksum
        }
        return false;
    };
    
    // Proxy detection
    var proxyDetection = function() {
        if (typeof Proxy !== 'undefined') {
            try {
                new Proxy({}, {});
                return false;
            } catch (e) {
                return true;
            }
        }
        return false;
    };
    
    // Canvas fingerprinting detection
    var canvasDetection = function() {
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
            return data.indexOf("data:image/png") === -1;
        } catch (e) {
            return true;
        }
    };
    
    // WebRTC detection
    var webrtcDetection = function() {
        return typeof RTCPeerConnection === 'undefined' && 
               typeof webkitRTCPeerConnection === 'undefined' &&
               typeof mozRTCPeerConnection === 'undefined';
    };
    
    // Battery API detection
    var batteryDetection = function() {
        if (navigator.getBattery) {
            navigator.getBattery().then(function(battery) {
                return battery.charging !== true;
            }).catch(function() {
                return true;
            });
        }
        return false;
    };
    
    // Geolocation detection
    var geolocationDetection = function() {
        return !navigator.geolocation;
    };
    
    // Touch detection
    var touchDetection = function() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };
    
    // Cookie detection
    var cookieDetection = function() {
        document.cookie = "test=1";
        return document.cookie.indexOf("test=1") === -1;
    };
    
    // Local storage detection
    var localStorageDetection = function() {
        try {
            localStorage.setItem('test', '1');
            localStorage.removeItem('test');
            return false;
        } catch (e) {
            return true;
        }
    };
    
    // Session storage detection
    var sessionStorageDetection = function() {
        try {
            sessionStorage.setItem('test', '1');
            sessionStorage.removeItem('test');
            return false;
        } catch (e) {
            return true;
        }
    };
    
    // IndexedDB detection
    var indexedDBDetection = function() {
        return !window.indexedDB;
    };
    
    // WebSQL detection
    var webSQLDetection = function() {
        return !window.openDatabase;
    };
    
    // Application cache detection
    var appCacheDetection = function() {
        return !window.applicationCache;
    };
    
    // Service worker detection
    var serviceWorkerDetection = function() {
        return !navigator.serviceWorker;
    };
    
    // Notification detection
    var notificationDetection = function() {
        return !window.Notification;
    };
    
    // Vibration detection
    var vibrationDetection = function() {
        return !navigator.vibrate;
    };
    
    // Ambient light detection
    var ambientLightDetection = function() {
        return !window.DeviceLightEvent;
    };
    
    // Proximity detection
    var proximityDetection = function() {
        return !window.DeviceProximityEvent;
    };
    
    // Orientation detection
    var orientationDetection = function() {
        return !window.DeviceOrientationEvent;
    };
    
    // Motion detection
    var motionDetection = function() {
        return !window.DeviceMotionEvent;
    };
    
    // Network information detection
    var networkInfoDetection = function() {
        return !navigator.connection;
    };
    
    // Bluetooth detection
    var bluetoothDetection = function() {
        return !navigator.bluetooth;
    };
    
    // USB detection
    var usbDetection = function() {
        return !navigator.usb;
    };
    
    // MIDI detection
    var midiDetection = function() {
        return !navigator.requestMIDIAccess;
    };
    
    // Media devices detection
    var mediaDevicesDetection = function() {
        return !navigator.mediaDevices;
    };
    
    // Speech recognition detection
    var speechRecognitionDetection = function() {
        return !window.SpeechRecognition && !window.webkitSpeechRecognition;
    };
    
    // Speech synthesis detection
    var speechSynthesisDetection = function() {
        return !window.speechSynthesis;
    };
    
    // Payment request detection
    var paymentRequestDetection = function() {
        return !window.PaymentRequest;
    };
    
    // Clipboard detection
    var clipboardDetection = function() {
        return !navigator.clipboard;
    };
    
    // Share detection
    var shareDetection = function() {
        return !navigator.share;
    };
    
    // Wake lock detection
    var wakeLockDetection = function() {
        return !navigator.wakeLock;
    };
    
    // Idle detection
    var idleDetection = function() {
        return !window.IdleDetector;
    };
    
    // Contact picker detection
    var contactPickerDetection = function() {
        return !navigator.contacts;
    };
    
    // File system detection
    var fileSystemDetection = function() {
        return !window.showDirectoryPicker;
    };
    
    // Virtual keyboard detection
    var virtualKeyboardDetection = function() {
        return !navigator.virtualKeyboard;
    };
})();
