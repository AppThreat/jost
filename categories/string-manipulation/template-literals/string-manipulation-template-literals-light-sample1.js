/*
 * Complexity: Simple
 * Techniques: template-literals, string-concat
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

function buildWithTemplate(part1, part2) {
    return `${part1}${part2}`;
}

function executeTemplateBuilt(part1, part2) {
    var code = buildWithTemplate(part1, part2);
    return eval(code);
}

var templatePart1 = 'aler';
var templatePart2 = 't("Template literal example");';
executeTemplateBuilt(templatePart1, templatePart2);

function splitTemplateExpression(strings, ...values) {
    var result = strings[0];
    for (var i = 0; i < values.length; i++) {
        result += values[i] + strings[i + 1];
    }
    return result;
}

var templateResult = splitTemplateExpression`co${'nso'}le.${'lo'}g(${'"Sp'}lit${' te'}mplat${'e"'});`;
eval(templateResult);

function obfuscatedTemplateRunner(part1, part2, part3) {
    try {
        var result = `${part1}${part2}${part3}`;
        return eval(result);
    } catch (e) {
        return null;
    }
}

var templateParts1 = 'doc';
var templateParts2 = 'ume';
var templateParts3 = 'nt.createElement("div");';
obfuscatedTemplateRunner(templateParts1, templateParts2, templateParts3);