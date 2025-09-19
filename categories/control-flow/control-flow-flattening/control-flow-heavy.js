/*
 * Complexity: Advanced
 * Techniques: control-flow-flattening, jump-tables, state-machines, conditional-obfuscation
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
        root.ControlFlowHeavy = factory();
    }
}(typeof self !== 'undefined' ? self : this, function() {
    'use strict';

    // Configuration
    var config = {
        maxIterations: 1000,
        stateMachineSize: 16,
        jumpTableEntries: 32,
        obfuscationDepth: 5
    };

    // Utility functions
    var utils = {
        random: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        uid: function() {
            return 's' + Math.random().toString(36).substr(2, 9);
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

        shuffle: function(array) {
            var result = array.slice();
            for (var i = result.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = result[i];
                result[i] = result[j];
                result[j] = temp;
            }
            return result;
        }
    };

    // Control Flow Flattening Engine
    var ControlFlowFlattener = function(options) {
        this.options = options || {};
        this.states = [];
        this.transitions = [];
        this.currentId = 0;
    };

    ControlFlowFlattener.prototype.generateStateId = function() {
        return 'state_' + (this.currentId++);
    };

    ControlFlowFlattener.prototype.createLinearFlow = function(statements) {
        var states = [];
        var transitions = [];

        // Create initial state
        var initialState = {
            id: this.generateStateId(),
            type: 'start',
            code: null
        };
        states.push(initialState);

        // Create statement states
        for (var i = 0; i < statements.length; i++) {
            var state = {
                id: this.generateStateId(),
                type: 'statement',
                code: statements[i],
                index: i
            };
            states.push(state);
        }

        // Create final state
        var finalState = {
            id: this.generateStateId(),
            type: 'end',
            code: null
        };
        states.push(finalState);

        // Create transitions
        for (var j = 0; j < states.length - 1; j++) {
            transitions.push({
                from: states[j].id,
                to: states[j + 1].id,
                condition: 'true'
            });
        }

        return {
            states: states,
            transitions: transitions,
            initialState: initialState.id,
            finalState: finalState.id
        };
    };

    ControlFlowFlattener.prototype.createConditionalFlow = function(conditions, branches) {
        var states = [];
        var transitions = [];

        // Create decision state
        var decisionState = {
            id: this.generateStateId(),
            type: 'decision',
            conditions: conditions
        };
        states.push(decisionState);

        // Create branch states
        var branchStates = [];
        for (var i = 0; i < branches.length; i++) {
            var branchState = {
                id: this.generateStateId(),
                type: 'branch',
                code: branches[i],
                branchId: i
            };
            branchStates.push(branchState);
            states.push(branchState);
        }

        // Create convergence state
        var convergenceState = {
            id: this.generateStateId(),
            type: 'convergence',
            code: null
        };
        states.push(convergenceState);

        // Create transitions
        for (var j = 0; j < conditions.length && j < branchStates.length; j++) {
            transitions.push({
                from: decisionState.id,
                to: branchStates[j].id,
                condition: conditions[j]
            });
        }

        // Transitions from branches to convergence
        for (var k = 0; k < branchStates.length; k++) {
            transitions.push({
                from: branchStates[k].id,
                to: convergenceState.id,
                condition: 'true'
            });
        }

        return {
            states: states,
            transitions: transitions,
            decisionState: decisionState.id,
            convergenceState: convergenceState.id
        };
    };

    ControlFlowFlattener.prototype.createLoopFlow = function(loopBody, condition) {
        var states = [];
        var transitions = [];

        // Create loop entry
        var entryState = {
            id: this.generateStateId(),
            type: 'loop_entry',
            code: null
        };
        states.push(entryState);

        // Create loop body
        var bodyState = {
            id: this.generateStateId(),
            type: 'loop_body',
            code: loopBody
        };
        states.push(bodyState);

        // Create loop condition check
        var conditionState = {
            id: this.generateStateId(),
            type: 'loop_condition',
            condition: condition
        };
        states.push(conditionState);

        // Create loop exit
        var exitState = {
            id: this.generateStateId(),
            type: 'loop_exit',
            code: null
        };
        states.push(exitState);

        // Create transitions
        transitions.push({
            from: entryState.id,
            to: bodyState.id,
            condition: 'true'
        });

        transitions.push({
            from: bodyState.id,
            to: conditionState.id,
            condition: 'true'
        });

        transitions.push({
            from: conditionState.id,
            to: bodyState.id,
            condition: condition
        });

        transitions.push({
            from: conditionState.id,
            to: exitState.id,
            condition: '!' + condition
        });

        return {
            states: states,
            transitions: transitions,
            entryState: entryState.id,
            exitState: exitState.id
        };
    };

    // Jump Table Generator
    var JumpTableGenerator = function(size) {
        this.size = size || config.jumpTableEntries;
        this.table = [];
        this.generateTable();
    };

    JumpTableGenerator.prototype.generateTable = function() {
        for (var i = 0; i < this.size; i++) {
            this.table.push({
                id: i,
                operation: this.getRandomOperation(),
                operands: this.getRandomOperands(),
                next: this.getNextState(i)
            });
        }
    };

    JumpTableGenerator.prototype.getRandomOperation = function() {
        var operations = ['add', 'sub', 'mul', 'div', 'mod', 'pow', 'and', 'or', 'xor', 'shl', 'shr'];
        return operations[utils.random(0, operations.length - 1)];
    };

    JumpTableGenerator.prototype.getRandomOperands = function() {
        return [utils.random(1, 100), utils.random(1, 100)];
    };

    JumpTableGenerator.prototype.getNextState = function(current) {
        var options = [
            (current + 1) % this.size,
            utils.random(0, this.size - 1),
            utils.random(0, this.size - 1),
            current
        ];
        return options[utils.random(0, options.length - 1)];
    };

    JumpTableGenerator.prototype.execute = function(startIndex, iterations) {
        var currentIndex = startIndex;
        var result = 0;

        for (var i = 0; i < iterations && i < config.maxIterations; i++) {
            var entry = this.table[currentIndex];
            var op1 = entry.operands[0];
            var op2 = entry.operands[1];

            switch (entry.operation) {
                case 'add':
                    result += op1 + op2;
                    break;
                case 'sub':
                    result += op1 - op2;
                    break;
                case 'mul':
                    result += op1 * op2;
                    break;
                case 'div':
                    result += op2 !== 0 ? op1 / op2 : 0;
                    break;
                case 'mod':
                    result += op2 !== 0 ? op1 % op2 : 0;
                    break;
                case 'pow':
                    result += Math.pow(op1, op2);
                    break;
                case 'and':
                    result += op1 & op2;
                    break;
                case 'or':
                    result += op1 | op2;
                    break;
                case 'xor':
                    result += op1 ^ op2;
                    break;
                case 'shl':
                    result += op1 << op2;
                    break;
                case 'shr':
                    result += op1 >> op2;
                    break;
            }

            currentIndex = entry.next;
        }

        return result;
    };

    // State Machine Engine
    var StateMachine = function(states, transitions) {
        this.states = states || [];
        this.transitions = transitions || [];
        this.currentState = null;
        this.context = {};
    };

    StateMachine.prototype.addState = function(state) {
        this.states.push(state);
    };

    StateMachine.prototype.addTransition = function(transition) {
        this.transitions.push(transition);
    };

    StateMachine.prototype.setState = function(stateId) {
        this.currentState = stateId;
    };

    StateMachine.prototype.getCurrentState = function() {
        return this.currentState;
    };

    StateMachine.prototype.evaluateCondition = function(condition) {
        // Simple condition evaluator
        try {
            // Create a function to evaluate the condition in context
            var func = new Function('context', 'with(context) { return ' + condition + '; }');
            return func(this.context);
        } catch (e) {
            return false;
        }
    };

    StateMachine.prototype.getNextState = function() {
        if (!this.currentState) return null;

        // Find applicable transitions
        var applicable = this.transitions.filter(function(transition) {
            return transition.from === this.currentState &&
                   this.evaluateCondition(transition.condition);
        }.bind(this));

        if (applicable.length > 0) {
            // Return random applicable transition (for obfuscation)
            return applicable[utils.random(0, applicable.length - 1)].to;
        }

        return null;
    };

    StateMachine.prototype.execute = function(initialState, maxSteps) {
        this.setState(initialState);
        var steps = 0;
        var results = [];

        while (this.currentState && steps < maxSteps) {
            // Find current state
            var state = this.states.find(function(s) {
                return s.id === this.currentState;
            }.bind(this));

            if (state) {
                // Execute state logic
                if (state.code) {
                    try {
                        var func = new Function('context', 'with(context) { ' + state.code + ' }');
                        var result = func(this.context);
                        results.push(result);
                    } catch (e) {
                        results.push(null);
                    }
                }
            }

            // Move to next state
            var nextState = this.getNextState();
            if (!nextState) break;

            this.setState(nextState);
            steps++;
        }

        return results;
    };

    // Control Flow Obfuscator
    var ControlFlowObfuscator = function() {
        this.flattener = new ControlFlowFlattener();
        this.jumpTable = new JumpTableGenerator();
    };

    ControlFlowObfuscator.prototype.obfuscateLinear = function(statements) {
        return this.flattener.createLinearFlow(statements);
    };

    ControlFlowObfuscator.prototype.obfuscateConditional = function(conditions, branches) {
        return this.flattener.createConditionalFlow(conditions, branches);
    };

    ControlFlowObfuscator.prototype.obfuscateLoop = function(loopBody, condition) {
        return this.flattener.createLoopFlow(loopBody, condition);
    };

    ControlFlowObfuscator.prototype.executeJumpTable = function(startIndex, iterations) {
        return this.jumpTable.execute(startIndex, iterations);
    };

    ControlFlowObfuscator.prototype.createStateMachine = function(states, transitions) {
        return new StateMachine(states, transitions);
    };

    // Complex Control Flow Patterns

    // Pattern 1: Nested Conditional Flattening
    var nestedConditionalPattern = function(a, b, c, d) {
        var flattener = new ControlFlowFlattener();
        var conditions = [
            'a > 0',
            'b > 0',
            'c > 0',
            'd > 0'
        ];
        var branches = [
            'return a + b;',
            'return a - b;',
            'return a * b;',
            'return a / (b || 1);'
        ];

        var flow = flattener.createConditionalFlow(conditions, branches);
        var machine = new StateMachine(flow.states, flow.transitions);
        machine.context = {a: a, b: b, c: c, d: d};

        return machine.execute(flow.decisionState, 10);
    };

    // Pattern 2: Loop with Conditional Exits
    var loopWithExitsPattern = function(iterations, exitCondition) {
        var flattener = new ControlFlowFlattener();
        var loopBody = 'context.counter = (context.counter || 0) + 1; if (context.counter > ' + exitCondition + ') { context.shouldExit = true; }';
        var condition = '!context.shouldExit && context.counter < ' + iterations;

        var flow = flattener.createLoopFlow(loopBody, condition);
        var machine = new StateMachine(flow.states, flow.transitions);
        machine.context = {counter: 0, shouldExit: false};

        return machine.execute(flow.entryState, iterations * 2);
    };

    // Pattern 3: State Machine with Random Transitions
    var randomStateMachinePattern = function(statesCount) {
        var states = [];
        var transitions = [];

        // Generate states
        for (var i = 0; i < statesCount; i++) {
            states.push({
                id: 's' + i,
                type: 'processing',
                code: 'context.value = (context.value || 0) + ' + i + ';'
            });
        }

        // Generate random transitions
        for (var j = 0; j < statesCount * 2; j++) {
            var from = 's' + utils.random(0, statesCount - 1);
            var to = 's' + utils.random(0, statesCount - 1);
            var condition = 'Math.random() > ' + (0.3 + Math.random() * 0.4);

            transitions.push({
                from: from,
                to: to,
                condition: condition
            });
        }

        var machine = new StateMachine(states, transitions);
        machine.context = {value: 0};

        return machine.execute('s0', statesCount * 3);
    };

    // Pattern 4: Multi-Level Jump Tables
    var multiLevelJumpTablePattern = function(levels, operationsPerLevel) {
        var obfuscator = new ControlFlowObfuscator();
        var result = 0;

        for (var i = 0; i < levels; i++) {
            result += obfuscator.executeJumpTable(
                utils.random(0, operationsPerLevel - 1),
                utils.random(5, 15)
            );
        }

        return result;
    };

    // Pattern 5: Conditional Dead Code Paths
    var conditionalDeadCodePattern = function(input) {
        var flattener = new ControlFlowFlattener();
        var conditions = [
            'input > 100',
            'input < 0',
            'input === 42',
            'input % 2 === 0'
        ];
        var branches = [
            'return input * 2;',  // Real path
            'return input;',      // Real path
            '// Dead code path 1\n for(var i=0;i<1000;i++){var x=i*i;}', // Dead code
            'return input + 1;'   // Real path
        ];

        var flow = flattener.createConditionalFlow(conditions, branches);
        var machine = new StateMachine(flow.states, flow.transitions);
        machine.context = {input: input};

        return machine.execute(flow.decisionState, 5);
    };

    // Pattern 6: Complex State Transitions
    var complexStateTransitionPattern = function() {
        var states = [
            {id: 'init', type: 'start', code: 'context.phase = 1;'},
            {id: 'phase1', type: 'process', code: 'context.result = (context.result || 0) + 1; context.phase = 2;'},
            {id: 'phase2', type: 'process', code: 'context.result = (context.result || 0) * 2; context.phase = 3;'},
            {id: 'phase3', type: 'process', code: 'context.result = (context.result || 0) - 1; context.phase = 1;'},
            {id: 'end', type: 'finish', code: 'return context.result;'}
        ];

        var transitions = [
            {from: 'init', to: 'phase1', condition: 'true'},
            {from: 'phase1', to: 'phase2', condition: 'context.phase === 2'},
            {from: 'phase2', to: 'phase3', condition: 'context.phase === 3'},
            {from: 'phase3', to: 'phase1', condition: 'context.phase === 1 && (context.result || 0) < 10'},
            {from: 'phase3', to: 'end', condition: 'context.phase === 1 && (context.result || 0) >= 10'}
        ];

        var machine = new StateMachine(states, transitions);
        machine.context = {result: 0, phase: 0};

        return machine.execute('init', 50);
    };

    // Pattern 7: Recursive State Machine
    var recursiveStateMachinePattern = function(depth) {
        if (depth <= 0) return [];

        var states = [
            {id: 'level_' + depth + '_start', type: 'begin', code: 'context.depth = ' + depth + ';'},
            {id: 'level_' + depth + '_process', type: 'work', code: 'context.value = (context.value || 0) + ' + depth + ';'},
            {id: 'level_' + depth + '_end', type: 'finish', code: 'context.completed = true;'}
        ];

        var transitions = [
            {from: 'level_' + depth + '_start', to: 'level_' + depth + '_process', condition: 'true'},
            {from: 'level_' + depth + '_process', to: 'level_' + depth + '_end', condition: 'true'}
        ];

        // Add recursive call for next level
        if (depth > 1) {
            var subResults = recursiveStateMachinePattern(depth - 1);
            // Combine results would go here in a real implementation
        }

        var machine = new StateMachine(states, transitions);
        machine.context = {value: 0, depth: depth};

        return machine.execute('level_' + depth + '_start', 5);
    };

    // Pattern 8: Parallel Execution Paths
    var parallelExecutionPattern = function(paths) {
        var results = [];

        for (var i = 0; i < paths; i++) {
            var states = [
                {id: 'path_' + i + '_start', type: 'init', code: 'context.path = ' + i + ';'},
                {id: 'path_' + i + '_work', type: 'compute', code: 'context.result = Math.pow(' + i + ', 2);'},
                {id: 'path_' + i + '_end', type: 'finish', code: 'return context.result;'}
            ];

            var transitions = [
                {from: 'path_' + i + '_start', to: 'path_' + i + '_work', condition: 'true'},
                {from: 'path_' + i + '_work', to: 'path_' + i + '_end', condition: 'true'}
            ];

            var machine = new StateMachine(states, transitions);
            machine.context = {path: i, result: 0};

            var pathResult = machine.execute('path_' + i + '_start', 3);
            results.push(pathResult);
        }

        return results;
    };

    // Pattern 9: Dynamic State Generation
    var dynamicStatePattern = function(input) {
        var stateCount = Math.min(Math.abs(input) || 5, 20);
        var states = [];
        var transitions = [];

        // Generate dynamic states based on input
        for (var i = 0; i < stateCount; i++) {
            var operation = i % 4;
            var code = '';

            switch (operation) {
                case 0:
                    code = 'context.accumulator = (context.accumulator || 0) + ' + i + ';';
                    break;
                case 1:
                    code = 'context.accumulator = (context.accumulator || 0) - ' + i + ';';
                    break;
                case 2:
                    code = 'context.accumulator = (context.accumulator || 1) * ' + (i + 1) + ';';
                    break;
                case 3:
                    code = 'context.accumulator = (context.accumulator || 0) / ' + (i + 1) + ';';
                    break;
            }

            states.push({
                id: 'dynamic_' + i,
                type: 'dynamic',
                code: code
            });
        }

        // Create sequential transitions
        for (var j = 0; j < states.length - 1; j++) {
            transitions.push({
                from: states[j].id,
                to: states[j + 1].id,
                condition: 'true'
            });
        }

        var machine = new StateMachine(states, transitions);
        machine.context = {accumulator: 0};

        return machine.execute(states[0].id, stateCount + 5);
    };

    // Pattern 10: Obfuscated Control Flow with Mathematical Conditions
    var mathematicalControlFlowPattern = function(a, b, c) {
        var flattener = new ControlFlowFlattener();

        // Complex mathematical conditions
        var conditions = [
            'Math.sin(a) > Math.cos(b)',
            'Math.pow(a, 2) + Math.pow(b, 2) === Math.pow(c, 2)',
            'Math.log(a || 1) * Math.exp(b) > c',
            'Math.floor(a) === Math.ceil(b) && c !== 0'
        ];

        var branches = [
            'return Math.sqrt(a*a + b*b);',
            'return a * b / (c || 1);',
            'return Math.atan2(b, a);',
            'return Math.abs(a - b - c);'
        ];

        var flow = flattener.createConditionalFlow(conditions, branches);
        var machine = new StateMachine(flow.states, flow.transitions);
        machine.context = {a: a, b: b, c: c};

        return machine.execute(flow.decisionState, 8);
    };

    // Main execution engine
    var executeControlFlowSuite = function() {
        var obfuscator = new ControlFlowObfuscator();
        var results = {};

        // Execute all patterns
        results.nestedConditional = nestedConditionalPattern(10, 5, 3, 7);
        results.loopWithExits = loopWithExitsPattern(20, 15);
        results.randomStateMachine = randomStateMachinePattern(8);
        results.multiLevelJumpTable = multiLevelJumpTablePattern(3, 10);
        results.conditionalDeadCode = conditionalDeadCodePattern(42);
        results.complexStateTransition = complexStateTransitionPattern();
        results.recursiveStateMachine = recursiveStateMachinePattern(3);
        results.parallelExecution = parallelExecutionPattern(4);
        results.dynamicState = dynamicStatePattern(12);
        results.mathematicalControlFlow = mathematicalControlFlowPattern(3, 4, 5);

        return results;
    };

    // Export API
    var api = {
        version: '1.0.0',
        config: config,
        utils: utils,
        ControlFlowFlattener: ControlFlowFlattener,
        JumpTableGenerator: JumpTableGenerator,
        StateMachine: StateMachine,
        ControlFlowObfuscator: ControlFlowObfuscator,
        patterns: {
            nestedConditionalPattern: nestedConditionalPattern,
            loopWithExitsPattern: loopWithExitsPattern,
            randomStateMachinePattern: randomStateMachinePattern,
            multiLevelJumpTablePattern: multiLevelJumpTablePattern,
            conditionalDeadCodePattern: conditionalDeadCodePattern,
            complexStateTransitionPattern: complexStateTransitionPattern,
            recursiveStateMachinePattern: recursiveStateMachinePattern,
            parallelExecutionPattern: parallelExecutionPattern,
            dynamicStatePattern: dynamicStatePattern,
            mathematicalControlFlowPattern: mathematicalControlFlowPattern
        },
        execute: executeControlFlowSuite
    };

    // Run execution suite
    var testResults = executeControlFlowSuite();

    // Export for testing
    if (typeof window !== 'undefined') {
        window.ControlFlowHeavy = api;
    }

    return api;
}));

// Additional control flow obfuscation utilities
(function() {
    'use strict';

    // Control Flow Graph Analyzer
    var CFGAnalyzer = function() {
        this.nodes = [];
        this.edges = [];
    };

    CFGAnalyzer.prototype.addNode = function(id, type, properties) {
        this.nodes.push({
            id: id,
            type: type,
            properties: properties || {}
        });
    };

    CFGAnalyzer.prototype.addEdge = function(from, to, condition) {
        this.edges.push({
            from: from,
            to: to,
            condition: condition
        });
    };

    CFGAnalyzer.prototype.analyzeComplexity = function() {
        var cyclomatic = this.edges.length - this.nodes.length + 2;
        var nodeTypes = {};

        // Count node types
        this.nodes.forEach(function(node) {
            nodeTypes[node.type] = (nodeTypes[node.type] || 0) + 1;
        });

        return {
            cyclomaticComplexity: cyclomatic,
            nodeCount: this.nodes.length,
            edgeCount: this.edges.length,
            nodeTypes: nodeTypes
        };
    };

    // Flow Obfuscation Validator
    var FlowValidator = function() {
        this.validations = [];
    };

    FlowValidator.prototype.addValidation = function(name, validator) {
        this.validations.push({
            name: name,
            validator: validator
        });
    };

    FlowValidator.prototype.validate = function(flow) {
        var results = {};
        this.validations.forEach(function(validation) {
            try {
                results[validation.name] = validation.validator(flow);
            } catch (e) {
                results[validation.name] = false;
            }
        });
        return results;
    };

    // Export utilities
    if (typeof window !== 'undefined') {
        window.ControlFlowHeavyUtils = {
            CFGAnalyzer: CFGAnalyzer,
            FlowValidator: FlowValidator
        };
    }
})();
