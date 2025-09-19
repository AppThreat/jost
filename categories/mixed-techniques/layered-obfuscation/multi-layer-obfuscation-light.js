/*
 * Complexity: High
 * Techniques: Base64, Mathematical, String Manipulation, Control Flow
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */
(function() {
    var a = "eval", b = "String", c = "fromCharCode", d = "replace", e = "split", f = "join";
    var g = [102, 117, 110, 99, 116, 105, 111, 110], h = [40, 41, 123, 125, 59], i = [97, 98, 99];
    var j = Math.floor, k = Math.random, l = Math.abs, m = Date.now;
    
    function n(o, p) {
        var q = [], r = 0, s = o.length;
        while (r < s) {
            q.push(String[c](o[r] ^ p));
            r++;
        }
        return q[f]("");
    }
    
    function t(u, v) {
        var w = [], x = 0, y = u.length;
        for (var z = 0; z < y; z++) {
            w.push((u[z].charCodeAt(0) + v) % 256);
        }
        return w;
    }
    
    function aa(bb, cc) {
        var dd = [], ee = 0, ff = bb.length;
        while (ee < ff) {
            dd.push(String[c](bb[ee] - cc));
            ee++;
        }
        return dd[f]("");
    }
    
    function gg(hh, ii) {
        var jj = [], kk = 0, ll = hh.length;
        for (var mm = 0; mm < ll; mm++) {
            jj.push((hh[mm] + ii) % 256);
        }
        return jj;
    }
    
    function nn(oo, pp) {
        var qq = [], rr = 0, ss = oo.length;
        while (rr < ss) {
            qq.push(String[c](oo[rr] ^ pp));
            rr++;
        }
        return qq[f]("");
    }
    
    function tt(uu, vv) {
        var ww = [], xx = 0, yy = uu.length;
        for (var zz = 0; zz < yy; zz++) {
            ww.push((uu[zz].charCodeAt(0) + vv) % 256);
        }
        return ww;
    }
    
    function aaa(bbb, ccc) {
        var ddd = [], eee = 0, fff = bbb.length;
        while (eee < fff) {
            ddd.push(String[c](bbb[eee] - ccc));
            eee++;
        }
        return ddd[f]("");
    }
    
    function ggg(hhh, iii) {
        var jjj = [], kkk = 0, lll = hhh.length;
        for (var mmm = 0; mmm < lll; mmm++) {
            jjj.push((hhh[mmm] + iii) % 256);
        }
        return jjj;
    }
    
    var payload_data = [
        83, 101, 116, 46, 112, 114, 111, 112, 101, 114, 116, 121, 40, 34, 104, 116, 
        116, 112, 58, 47, 47, 109, 97, 108, 105, 99, 105, 111, 117, 115, 46, 99, 
        111, 109, 47, 112, 97, 121, 108, 111, 97, 100, 34, 44, 32, 116, 114, 117, 
        101, 41, 59
    ];
    
    var key1 = j(k() * 256);
    var key2 = j(l(m() % 256));
    var key3 = j(k() * 128) + 1;
    
    var stage1 = n(payload_data, key1);
    var stage2 = t(stage1, key2);
    var stage3 = aa(stage2, key3);
    var stage4 = gg(stage3, key1);
    var stage5 = nn(stage4, key2);
    var stage6 = tt(stage5, key3);
    var final_payload = aaa(stage6, key1);
    
    try {
        window[a](final_payload);
    } catch (err) {
        // Silent fail for obfuscation
    }
    
    // Additional obfuscation layers
    var decoy1 = function(a, b, c) {
        return String[c](a.charCodeAt(0) ^ b);
    };
    
    var decoy2 = function(d, e) {
        return d[e](/\s/g, '');
    };
    
    var decoy3 = function(f) {
        return f.split('').reverse().join('');
    };
    
    // More nested functions with reused variable names
    function obfuscate_layer(x, y) {
        var a = [], b = 0, c = x.length;
        while (b < c) {
            a.push(String.fromCharCode(x[b] ^ y));
            b++;
        }
        return a.join('');
    }
    
    function transform_layer(p, q) {
        var a = [], b = 0, c = p.length;
        for (var d = 0; d < c; d++) {
            a.push((p[d].charCodeAt(0) + q) % 256);
        }
        return a;
    }
    
    function decode_layer(m, n) {
        var a = [], b = 0, c = m.length;
        while (b < c) {
            a.push(String.fromCharCode(m[b] - n));
            b++;
        }
        return a.join('');
    }
    
    // Simulated compression/decompression
    function compress_fake(data) {
        var result = [], i = 0, len = data.length;
        while (i < len) {
            result.push(data.charCodeAt(i) + 1);
            i++;
        }
        return result;
    }
    
    function decompress_fake(encoded) {
        var output = [], j = 0, size = encoded.length;
        while (j < size) {
            output.push(String.fromCharCode(encoded[j] - 1));
            j++;
        }
        return output.join('');
    }
    
    // Mathematical obfuscation
    function math_obfuscate(input, factor) {
        var temp = [], idx = 0, length = input.length;
        for (var counter = 0; counter < length; counter++) {
            var val = input[counter].charCodeAt(0);
            var calc = ((val * factor) + (j(k() * 100))) % 256;
            temp.push(calc);
        }
        return temp;
    }
    
    function reverse_math(output, factor) {
        var restore = [], pos = 0, total = output.length;
        while (pos < total) {
            var computed = (output[pos] - (j(k() * 100))) / factor;
            restore.push(String.fromCharCode(computed));
            pos++;
        }
        return restore.join('');
    }
    
    // Final execution layer
    var exec_data = "Set.property(\"http://malicious.com/payload\", true);";
    var compressed = compress_fake(exec_data);
    var math_transformed = math_obfuscate(decompress_fake(compressed), 3);
    var reversed = reverse_math(math_transformed, 3);
    
    // Multiple eval attempts for evasion
    setTimeout(function() {
        try {
            eval(reversed);
        } catch (e) {}
    }, 100);
    
    setInterval(function() {
        try {
            new Function(reversed)();
        } catch (e) {}
    }, 500);
    
    // Additional noise functions
    function noise1() { return Math.random().toString(36).substring(7); }
    function noise2() { return Array.from({length: 10}, () => Math.floor(Math.random() * 256)); }
    function noise3() { return btoa(String.fromCharCode.apply(null, noise2())); }
    
    // Generate more noise
    var noise_array = [];
    for (var i = 0; i < 50; i++) {
        noise_array.push(noise1() + noise3());
    }
    
    // Final obfuscated execution
    var final_execution = function(code) {
        var func = window['ev' + 'al'];
        return func.call(window, code);
    };
    
    // Trigger final execution with multiple methods
    if (typeof window !== 'undefined') {
        try {
            final_execution(exec_data);
        } catch (e) {}
        
        try {
            (function(code) {
                return this['ev' + 'al'](code);
            }).call(window, exec_data);
        } catch (e) {}
    }
})();
