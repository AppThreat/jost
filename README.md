# JOST - JavaScript Obfuscated Source Testing

**JOST** (JavaScript Obfuscated Source Testing) is a comprehensive repository of categorized JavaScript obfuscation samples designed for testing and evaluating static analysis tools. qwen3-coder was used to generate the payloads and documentation in this repo.

## Purpose

JOST provides security researchers, tool developers, and analysts with a standardized collection of obfuscated JavaScript code to:
- Test static analysis tool effectiveness
- Benchmark detection capabilities
- Evaluate false positive/negative rates
- Study obfuscation techniques
- Develop better analysis methodologies

## Categories

Samples are organized into 10 primary categories with subcategories:

1. **Encoding Obfuscation** - Base64, hex, custom encoding
2. **String Manipulation** - Concatenation, template literals
3. **Control Flow** - Conditional obfuscation, jump tables
4. **Mathematical Obfuscation** - Arithmetic, bitwise operations
5. **Function Obfuscation** - Anonymous functions, IIFE patterns
6. **Variable Obfuscation** - Identifier renaming, scope confusion
7. **Anti-Analysis** - Debugger detection, environment checks
8. **Packing/Compression** - Eval wrappers, custom decompression
9. **Polyglot Obfuscation** - Mixed syntax samples
10. **Mixed Techniques** - Layered obfuscation approaches

## Classification System

All samples follow a standardized classification system with:
- **Complexity Levels** (1-5: Simple to Expert)
- **Technique Tags** (standardized technique identifiers)
- **Metadata Headers** (consistent sample information)
- **Naming Conventions** (structured file names)

See [`docs/classification-guide.md`](docs/classification-guide.md) for complete details.

### For Security Researchers
Browse samples by category to study specific obfuscation techniques and their detection challenges.

## Contributing

Contributions are welcome! Please:
1. Follow the classification guide
2. Include proper metadata headers
3. Use standardized naming conventions
4. Ensure samples are non-malicious
5. Submit pull requests with clear descriptions

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

All samples in this repository are designed for security testing and research purposes only. They contain no actual malicious code but are intended to challenge static analysis tools. Use responsibly and only in appropriate testing environments.
