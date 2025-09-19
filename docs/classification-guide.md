# JOST Classification Guide

This guide provides a standardized system for classifying JavaScript obfuscated source code samples in the JOST (JavaScript Obfuscated Source Testing) repository.

## Table of Contents
1. [Classification Categories](#classification-categories)
2. [Technique Tags](#technique-tags)
3. [Metadata Standards](#metadata-standards)
4. [File Naming Conventions](#file-naming-conventions)
5. [Directory Structure](#directory-structure)
6. [Classification Examples](#classification-examples)

## Classification Categories

### Primary Categories
Each sample must be placed in one of these primary categories:

#### 1. Encoding Obfuscation (`encoding-obfuscation`)
Techniques that transform code through various encoding schemes
- Subcategories: `base64-variants`, `hex-encoding`, `custom-encoding`

#### 2. String Manipulation (`string-manipulation`)
Obfuscation through string construction and manipulation
- Subcategories: `concatenation-obfuscation`, `template-literals`

#### 3. Control Flow (`control-flow`)
Techniques that modify program execution flow
- Subcategories: `conditional-obfuscation`, `loop-obfuscation`, `jump-tables`

#### 4. Mathematical Obfuscation (`mathematical-obfuscation`)
Use of mathematical operations to obscure logic
- Subcategories: `arithmetic-operations`, `bitwise-operations`

#### 5. Function Obfuscation (`function-obfuscation`)
Techniques targeting function definitions and calls
- Subcategories: `anonymous-functions`, `function-renaming`, `iife-patterns`

#### 6. Variable Obfuscation (`variable-obfuscation`)
Obfuscation of variable names and scope
- Subcategories: `identifier-renaming`, `scope-confusion`

#### 7. Anti-Analysis (`anti-analysis`)
Techniques designed to detect or prevent analysis
- Subcategories: `debugger-detection`, `environment-checks`, `timing-attacks`

#### 8. Packing/Compression (`packing-compression`)
Code packing and compression techniques
- Subcategories: `eval-wrappers`, `custom-decompression`

#### 9. Polyglot Obfuscation (`polyglot-obfuscation`)
Code that is valid in multiple contexts/languages
- Subcategories: `mixed-syntax`

#### 10. Mixed Techniques (`mixed-techniques`)
Samples combining multiple obfuscation approaches
- Subcategories: `layered-obfuscation`, `real-world-samples`

## Technique Tags

Standardized tags for identifying specific obfuscation techniques:

### Encoding Techniques
- `base64`: Base64 encoding/decoding
- `hex`: Hexadecimal encoding
- `unicode`: Unicode escape sequences
- `binary`: Binary encoding
- `octal`: Octal encoding
- `custom-encoding`: Proprietary encoding schemes

### String Techniques
- `string-concat`: String concatenation obfuscation
- `template-literals`: ES6 template literal usage
- `split-join`: Split/join string manipulation
- `character-codes`:.fromCharCode usage

### Control Flow Techniques
- `conditional-obfuscation`: Complex conditional logic
- `loop-obfuscation`: Obfuscated loops
- `jump-tables`: Switch statement obfuscation
- `dead-code`: Irrelevant code insertion
- `control-flow-flattening`: Flattened control structures

### Mathematical Techniques
- `arithmetic`: Complex arithmetic operations
- `bitwise`: Bitwise operation obfuscation
- `math-functions`: Mathematical function usage
- `randomization`: Random value generation

### Function Techniques
- `anonymous-functions`: Anonymous/lambda functions
- `function-renaming`: Variable function names
- `iife`: Immediately Invoked Function Expressions
- `function-currying`: Curried function patterns
- `higher-order-functions`: Functions as parameters/returns

### Variable Techniques
- `identifier-renaming`: Variable name obfuscation
- `scope-confusion`: Scope manipulation
- `variable-shadowing`: Variable shadowing
- `hoisting-abuse`: Hoisting manipulation

### Anti-Analysis Techniques
- `debugger-detection`: Debugger statement usage
- `timing-attacks`: Execution timing checks
- `environment-checks`: Runtime environment inspection
- `console-detection`: Console API detection
- `devtools-detection`: Developer tools detection
- `instrumentation-detection`: Analysis tool detection

### Packing Techniques
- `eval-wrappers`: Eval-based code execution
- `custom-decompression`: Custom decompression algorithms
- `self-extracting`: Self-extracting archives
- `loader-patterns`: Code loading patterns

## Metadata Standards

Each sample file should include a standardized metadata header:

```javascript
/*
 * Complexity: [Level 1-5]
 * Techniques: [comma-separated technique tags]
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */
```

## File Naming Conventions

### General Format
`[category]-[subcategory]-[complexity]-[identifier].js`

### Examples
- `encoding-base64-simple-sample1.js`
- `anti-analysis-debugger-advanced-detection.js`
- `mixed-layered-intermediate-obfuscation.js`

### Special Identifiers
- `sample1`, `sample2`, etc. for multiple examples
- `light`, `heavy` for complexity variants
- `real-world` for actual samples
- `test-case` for specific testing scenarios

## Directory Structure

```
categories/
├── [primary-category]/
│   ├── [subcategory]/
│   │   ├── sample-files.js
```

Each subcategory directory should contain:
1. Sample JavaScript files following naming conventions
2. README.md with subcategory description
3. Links to related samples

## Classification Examples

### Example 1: Simple Base64 Encoding
```
/*
 * Complexity: Simple
 * Techniques: base64, eval-wrappers
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */
```
**File:** `encoding-base64-simple-sample1.js`

### Example 2: Advanced Anti-Analysis
```
/*
 * Complexity: Advanced
 * Techniques: debugger-detection, timing-attacks, environment-checks, behavioral-analysis
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */
```
**File:** `anti-analysis-debugger-advanced-detection.js`

### Example 3: Mixed Techniques
```
/*
 * Complexity: Expert
 * Techniques: base64, arithmetic, bitwise, function-renaming, debugger-detection, eval-wrappers
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */
```
**File:** `mixed-layered-expert-obfuscation.js`

## Quality Assurance

### Classification Review Process
1. **Primary Category Assignment**: Ensure correct primary category
2. **Subcategory Verification**: Confirm appropriate subcategory
3. **Complexity Assessment**: Validate complexity level
4. **Technique Tagging**: Verify all relevant techniques are tagged
5. **Metadata Validation**: Check metadata completeness
6. **File Naming**: Confirm naming convention compliance

### Update Procedures
- Update `Last Updated` date for any modifications
- Reclassify if techniques significantly change
- Add new technique tags as needed
- Adjust complexity level if warranted

## Contributing Guidelines

### Adding New Samples
1. Determine appropriate classification
2. Add standardized metadata header
3. Follow naming conventions
4. Place in correct directory
5. Update relevant README files
6. Submit pull request with classification rationale

### Adding New Categories
1. Propose new category/subcategory
2. Provide use case justification
3. Suggest sample placement
4. Create directory structure
5. Update this guide
6. Add to automated classification tools

### Reporting Issues
- **Misclassification**: File issue with correct classification
- **Missing Categories**: Propose new categories
- **Incomplete Metadata**: Report missing information
- **Naming Issues**: Suggest better naming conventions
