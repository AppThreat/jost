/*
 * Complexity: Simple
 * Techniques: identifier-renaming, scope-confusion
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

var a = 'alert("Identifier renaming example");';
eval(a);

var b = ['con', 'sole.', 'log(', '"', 'Renam', 'ed', ' vari', 'able', '"', ')', ';'];
var c = '';
for (var d = 0; d < b.length; d++) {
    c += b[d];
}
eval(c);

var e = function(f) {
    var g = f;
    return eval(g);
};

e('document.createElement("div");');

var h = 'aler';
var i = 't("Cu';
var j = 'rried';
var k = ' rena';
var l = 'med")';
var m = h + i + j + k + l + ';';
eval(m);

var n = [
    function(o) { eval(o); },
    function(p) { eval(p); }
];

var q = [
    'alert("Array renamed executor 1");',
    'console.log("Array renamed executor 2");'
];

for (var r = 0; r < n.length; r++) {
    n[r](q[r]);
}

var s = true;
var t = function(u) { eval(u); };
var v = function(w) { console.log(w); };
var x = 'alert("Conditional renamed executor");';

if (s) {
    t(x);
} else {
    v(x);
}

var y = 'docu';
var z = 'ment.';
var aa = 'getE';
var ab = 'lemen';
var ac = 'tById';
var ad = '("tes';
var ae = 't")';
var af = y + z + aa + ab + ac + ad + ae + ';';
eval(af);