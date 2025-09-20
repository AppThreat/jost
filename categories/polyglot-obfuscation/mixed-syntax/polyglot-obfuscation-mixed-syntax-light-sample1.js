/*
 * Complexity: Simple
 * Techniques: mixed-syntax, string-concat, eval-wrappers
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

// JavaScript with HTML-like syntax
var htmlMixed = '<script>alert("HTML mixed with JavaScript")</script>';
eval(htmlMixed.substring(8, htmlMixed.length - 9));

// JavaScript with CSS-like syntax
var cssMixed = '/* */ console.log("CSS comment syntax in JS") /* */';
eval(cssMixed.replace(/\/\* \*\//g, '').replace(/\/\* \*\//g, ''));

// JavaScript with JSON-like syntax
var jsonMixed = '{"code": "alert(\\"JSON mixed syntax\\")"}';
var jsonObj = JSON.parse(jsonMixed);
eval(jsonObj.code);

// JavaScript with XML-like syntax
var xmlMixed = '<root><code>alert("XML mixed syntax")</code></root>';
var xmlMatch = xmlMixed.match(/<code>(.*?)<\/code>/);
if (xmlMatch) {
    eval(xmlMatch[1]);
}

// JavaScript with SQL-like syntax
var sqlMixed = '-- SELECT * FROM code WHERE action = \'alert("SQL comment syntax")\'';
var sqlClean = sqlMixed.substring(2).split('\'')[1];
eval(sqlClean);

// JavaScript with RegExp-like syntax
var regexMixed = '/alert\\("RegExp mixed syntax"\\)/g';
var regexMatch = regexMixed.match(/\/(.*?)\\\)/);
if (regexMatch) {
    eval(regexMatch[1] + ')');
}

// JavaScript with Markdown-like syntax
var markdownMixed = '`alert("Markdown code block syntax")`';
eval(markdownMixed.substring(1, markdownMixed.length - 1));

// JavaScript with Python-like syntax
var pythonMixed = '# This is a Python comment\nalert("Python comment syntax") # Another comment';
var pythonClean = pythonMixed.split('\n')[1].split(' #')[0];
eval(pythonClean);

// JavaScript with Bash-like syntax
var bashMixed = '#!/usr/bin/env node\n# Bash comment\nalert("Bash comment syntax")';
var bashClean = bashMixed.split('\n')[2];
eval(bashClean);

// JavaScript with C-like syntax
var cMixed = '// C++ style comment\n/* C style comment */ alert("C style comment syntax")';
var cClean = cMixed.split('\n')[2];
eval(cClean);