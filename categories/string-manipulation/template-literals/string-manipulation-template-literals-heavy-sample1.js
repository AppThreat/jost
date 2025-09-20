/*
 * Complexity: Advanced
 * Techniques: template-literals, string-concat, arithmetic-operations
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

var TemplateProcessor = (function() {
    function taggedTemplate(strings, ...values) {
        var result = '';
        for (var i = 0; i < strings.length; i++) {
            result += strings[i];
            if (values[i] !== undefined) {
                result += values[i];
            }
        }
        return result;
    }
    
    function nestedTemplate(level1, level2) {
        var inner = `${level1.prefix}${level1.suffix}`;
        var outer = `${level2.start}${inner}${level2.end}`;
        return outer;
    }
    
    function conditionalTemplate(selector, option1, option2) {
        return selector ? `${option1.truePart}${option1.falsePart}` : `${option2.truePart}${option2.falsePart}`;
    }
    
    function recursiveTemplate(data, depth) {
        if (depth <= 0) {
            return `${data.base}${data.extension}`;
        }
        var recursiveData = {
            base: `${data.base}`,
            extension: `${data.extension}`
        };
        return recursiveTemplate(recursiveData, depth - 1);
    }
    
    return {
        tagged: taggedTemplate,
        nested: nestedTemplate,
        conditional: conditionalTemplate,
        recursive: recursiveTemplate
    };
})();

function TemplatePipeline(transformers) {
    this.transformers = transformers;
    this.process = function(data) {
        var result = data;
        for (var i = 0; i < this.transformers.length; i++) {
            result = this.transformers[i](result);
        }
        return result;
    };
}

var templateTransformers = [
    function(data) { return data.replace(/\s/g, ''); },
    function(data) { return data.split('').reverse().join(''); },
    function(data) { return data.split('').reverse().join(''); }
];

var templatePipeline = new TemplatePipeline(templateTransformers);

function SecureTemplateExecutor(code) {
    var executionContext = {
        run: function() {
            try {
                return eval(code);
            } catch (error) {
                return 'Error: ' + error.message;
            }
        }
    };
    return executionContext.run();
}

var templatePayloads = [
    { parts: ['ale', 'rt(', '"Par', 't 1"', ');'] },
    { parts: ['con', 'sol', 'e.l', 'og(', '"Par', 't 2"', ');'] },
    { parts: ['doc', 'umen', 't.cr', 'eat', 'eEl', 'emen', 't("', 'div', '")', ';'] }
];

for (var j = 0; j < templatePayloads.length; j++) {
    var payload = templatePayloads[j];
    var templateString = `${payload.parts[0]}${payload.parts[1]}${payload.parts[2]}${payload.parts[3]}${payload.parts[4]}${payload.parts[5]}${payload.parts[6] || ''}`;
    var processed = templatePipeline.process(templateString);
    SecureTemplateExecutor(processed);
}

function NestedTemplateWrapper(templateData) {
    function innerTemplate(data) {
        return `${data.part1}${data.part2}`;
    }
    
    function outerTemplate(data) {
        return innerTemplate(data);
    }
    
    return function() {
        var intermediate = outerTemplate(templateData);
        return eval(intermediate);
    };
}

var nestedTemplatePayload = {
    part1: 'aler',
    part2: 't("Nested template");'
};
var templateExecutor = NestedTemplateWrapper(nestedTemplatePayload);
templateExecutor();

function ConditionalTemplateDecoder(selector, data1, data2) {
    var selectedData = selector ? data1 : data2;
    return `${selectedData.part1}${selectedData.part2}${selectedData.part3}`;
}

var conditionalTemplateResult = ConditionalTemplateDecoder(
    true,
    { part1: 'cons', part2: 'ole.', part3: 'log("True");' },
    { part1: 'cons', part2: 'ole.', part3: 'log("False");' }
);
eval(conditionalTemplateResult);

function ArrayTemplateDecoder(arrayOfTemplates) {
    var result = '';
    for (var k = 0; k < arrayOfTemplates.length; k++) {
        var template = arrayOfTemplates[k];
        result += `${template.prefix}${template.suffix}`;
    }
    return result;
}

var templateFragmentArrays = [
    { prefix: 'aler', suffix: 't("' },
    { prefix: 'Arr', suffix: 'ay template");' }
];

var templateCombinedResult = ArrayTemplateDecoder(templateFragmentArrays);
eval(templateCombinedResult);

function RecursiveTemplateDecoder(data, depth) {
    if (depth <= 0) {
        return `${data.start}${data.middle}${data.end}`;
    }
    var processedData = {
        start: `${data.start}`,
        middle: `${data.middle}`,
        end: `${data.end}`
    };
    return RecursiveTemplateDecoder(processedData, depth - 1);
}

var recursiveTemplateData = {
    start: 'cons',
    middle: 'ole.',
    end: 'log("Recursive template");'
};
var recursiveTemplateResult = RecursiveTemplateDecoder(recursiveTemplateData, 2);
eval(recursiveTemplateResult);

function ChainedTemplateExecution(data) {
    var processors = [
        function(d) { return `${d.part1}${d.part2}`; },
        function(d) { return d; },
        function(d) { return eval(d); }
    ];
    
    var result = data;
    for (var l = 0; l < processors.length; l++) {
        result = processors[l](result);
    }
    return result;
}

var templateChainData = {
    part1: 'docu',
    part2: 'ment.getElementById("test");'
};
ChainedTemplateExecution(templateChainData);

function DynamicTemplateDecoderFactory() {
    return {
        decode: function(data) {
            return `${data.first}${data.second}`;
        },
        execute: function(data) {
            return eval(this.decode(data));
        }
    };
}

var templateFactory = DynamicTemplateDecoderFactory();
templateFactory.execute({ first: 'aler', second: 't("Factory template");' });

function MultiLayerTemplateDecoder(layer1, layer2, layer3) {
    var layerData = layer1;
    layerData = `${layerData.part1}${layerData.part2}`;
    layerData = layerData.split('').reverse().join('');
    layerData = layerData.split('').reverse().join('');
    return eval(layerData);
}

var layeredTemplateData = {
    part1: 'cons',
    part2: 'ole.log("Multi-layer template");'
};
MultiLayerTemplateDecoder(layeredTemplateData, null, null);

function ObfuscatedTemplateDecoderClass() {
    this.mode = "template";
    this.decode = function(data) {
        if (this.mode === "template") {
            return `${data.a}${data.b}`;
        }
        return data.a + data.b;
    };
    
    this.run = function(data) {
        return eval(this.decode(data));
    };
}

var templateDecoderInstance = new ObfuscatedTemplateDecoderClass();
templateDecoderInstance.run({ a: 'docu', b: 'ment.write("Object oriented template");' });

function ComplexTemplateExecutionFlow(template) {
    var steps = {
        step1: function(data) { return data; },
        step2: function(data) { return `${data.first}${data.second}`; },
        step3: function(data) { return data; },
        step4: function(data) { return eval(data); }
    };
    
    var pipeline = [steps.step1, steps.step2, steps.step3, steps.step4];
    var result = template;
    
    for (var m = 0; m < pipeline.length; m++) {
        result = pipeline[m](result);
    }
    
    return result;
}

var complexTemplateData = {
    first: 'aler',
    second: 't("Complex template execution flow");'
};
ComplexTemplateExecutionFlow(complexTemplateData);

function MathematicalTemplateProcessor(parts) {
    var result = '';
    for (var n = 0; n < parts.length; n++) {
        result = `${result}${parts[n]}`;
    }
    return result;
}

var mathTemplateData = ['cons', 'ole.', 'log("', 'Mathematical template', '");'];
eval(MathematicalTemplateProcessor(mathTemplateData));

function TemplateStringManipulator(parts) {
    var result = '';
    for (var o = 0; o < parts.length; o++) {
        result = `${result}${parts[o]}`;
    }
    return result;
}

var manipulatedTemplate = ['docu', 'ment.', 'createTextNode("', 'Manipulated template', '");'];
eval(TemplateStringManipulator(manipulatedTemplate));

function TemplateArrayProcessor(arrayOfParts) {
    var combined = '';
    for (var p = 0; p < arrayOfParts.length; p++) {
        combined = `${combined}${arrayOfParts[p]}`;
    }
    return combined;
}

var templateParts = ['aler', 't("', 'Array template', '");'];
eval(TemplateArrayProcessor(templateParts));

function BitwiseTemplateProcessor(parts) {
    var result = '';
    for (var q = 0; q < parts.length; q++) {
        result = `${result}${parts[q]}`;
    }
    return result;
}

var bitwiseTemplateData = ['cons', 'ole.', 'log("', 'Bitwise template', '");'];
eval(BitwiseTemplateProcessor(bitwiseTemplateData));

function AdvancedTemplateConstruction(parts) {
    var result = '';
    var operations = [
        function(a, b) { return `${a}${b}`; },
        function(a, b) { return `${b}${a}`; }
    ];
    
    for (var r = 0; r < parts.length; r++) {
        var opIndex = r % operations.length;
        if (r === 0) {
            result = parts[r];
        } else {
            result = operations[opIndex](result, parts[r]);
        }
    }
    return result;
}

var advancedTemplateData = ['cons', 'ole.', 'log("', 'Advanced template', '");'];
eval(AdvancedTemplateConstruction(advancedTemplateData));

function TaggedTemplateHandler(strings, ...values) {
    var result = '';
    for (var s = 0; s < strings.length; s++) {
        result += strings[s];
        if (values[s] !== undefined) {
            result += values[s];
        }
    }
    return result;
}

var taggedResult = TaggedTemplateHandler`doc${'ume'}nt.${'ge'}tEl${'eme'}ntBy${'Id'}("${'tag'}ged${'");'}`;
eval(taggedResult);