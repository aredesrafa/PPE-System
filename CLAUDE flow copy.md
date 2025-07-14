
# Claude Code Configuration - SPARC Development Environment (Batchtools Optimized)

## 🚨 CRITICAL: CONCURRENT EXECUTION FOR ALL ACTIONS

**ABSOLUTE RULE**: ALL operations MUST be concurrent/parallel in a single message:

### 🔴 MANDATORY CONCURRENT PATTERNS:
1. **TodoWrite**: ALWAYS batch ALL todos in ONE call (5-10+ todos minimum)
2. **Task tool**: ALWAYS spawn ALL agents in ONE message with full instructions
3. **File operations**: ALWAYS batch ALL reads/writes/edits in ONE message
4. **Bash commands**: ALWAYS batch ALL terminal operations in ONE message
5. **Memory operations**: ALWAYS batch ALL memory store/retrieve in ONE message

### ⚡ GOLDEN RULE: "1 MESSAGE = ALL RELATED OPERATIONS"

**Examples of CORRECT concurrent execution:**
```javascript
// ✅ CORRECT: Everything in ONE message
[Single Message]:
  - TodoWrite { todos: [10+ todos with all statuses/priorities] }
  - Task("Agent 1 with full instructions and hooks")
  - Task("Agent 2 with full instructions and hooks")
  - Task("Agent 3 with full instructions and hooks")
  - Read("file1.js")
  - Read("file2.js")
  - Write("output1.js", content)
  - Write("output2.js", content)
  - Bash("npm install")
  - Bash("npm test")
  - Bash("npm run build")
```

**Examples of WRONG sequential execution:**
```javascript
// ❌ WRONG: Multiple messages (NEVER DO THIS)
Message 1: TodoWrite { todos: [single todo] }
Message 2: Task("Agent 1")
Message 3: Task("Agent 2")
Message 4: Read("file1.js")
Message 5: Write("output1.js")
Message 6: Bash("npm install")
// This is 6x slower and breaks coordination!
```

### 🎯 CONCURRENT EXECUTION CHECKLIST:

Before sending ANY message, ask yourself:
- ✅ Are ALL related TodoWrite operations batched together?
- ✅ Are ALL Task spawning operations in ONE message?
- ✅ Are ALL file operations (Read/Write/Edit) batched together?
- ✅ Are ALL bash commands grouped in ONE message?
- ✅ Are ALL memory operations concurrent?

If ANY answer is "No", you MUST combine operations into a single message!

## Project Overview
This project uses the SPARC (Specification, Pseudocode, Architecture, Refinement, Completion) methodology for systematic Test-Driven Development with AI assistance through Claude-Flow orchestration.

**🚀 Batchtools Optimization Enabled**: This configuration includes optimized prompts and parallel processing capabilities for improved performance and efficiency.

## SPARC Development Commands

### Core SPARC Commands (SINTAXE CORRETA)
- `npx claude-flow@alpha sparc modes`: List all available SPARC development modes
- `npx claude-flow@alpha sparc "<task>"`: Auto-select best mode for task
- `npx claude-flow@alpha sparc architect "<task>"`: Use architect mode specifically
- `npx claude-flow@alpha sparc tdd "<feature>"`: Test-driven development workflow
- `npx claude-flow@alpha sparc info <mode>`: Get detailed information about a specific mode

### Available SPARC Modes
- `architect` - System architecture and design
- `code` - Code generation and implementation  
- `debug` - Debugging and troubleshooting
- `refactor` - Code refactoring and optimization
- `review` - Code review and quality checks
- `security` - Security analysis and fixes
- `docs` - Documentation generation
- `tdd` - Test-driven development workflow

### Standard Build Commands (PROJECT SPECIFIC)
- `npm run build`: Build the project
- `npm run check`: Run TypeScript/Svelte checks (NOT typecheck)
- `npm run lint`: Run linter and format checks
- `npx tsc --noEmit`: Pure TypeScript validation

## SPARC Methodology Workflow (Batchtools Enhanced)

### 1. Debug Phase (SINTAXE CORRETA)
```bash
# Auto-select debug mode for TypeScript errors
npx claude-flow@alpha sparc "fix typescript errors in high-density files"
```
**Focus**: Identify and resolve TypeScript compilation errors systematically.

### 2. Refactor Phase (SINTAXE CORRETA)
```bash
# Use refactor mode specifically
npx claude-flow@alpha sparc refactor "improve type definitions and interfaces"
```
**Focus**: Optimize existing code structure and type definitions.

### 3. Architecture Phase (SINTAXE CORRETA)
```bash
# Use architect mode specifically
npx claude-flow@alpha sparc architect "review service layer architecture"
```
**Focus**: Design and validate system architecture decisions.

### 4. TDD Phase (SINTAXE CORRETA)
```bash
# Use TDD mode specifically
npx claude-flow@alpha sparc tdd "implement type-safe API adapters"
```
**Focus**: Build new features using test-first approach.

### 5. Auto-Select Mode (SINTAXE CORRETA)
```bash
# Let SPARC choose the best mode automatically
npx claude-flow@alpha sparc "validate and fix all typescript implementations"
```
**Focus**: Comprehensive auto-mode selection for complex tasks.

## Batchtools Integration Features

### Parallel Processing Capabilities
- **Concurrent File Operations**: Read, analyze, and modify multiple files simultaneously
- **Parallel Code Analysis**: Analyze dependencies, patterns, and architecture concurrently
- **Batch Test Generation**: Create comprehensive test suites in parallel
- **Concurrent Documentation**: Generate multiple documentation formats simultaneously

### Performance Optimizations
- **Smart Batching**: Group related operations for optimal performance
- **Pipeline Processing**: Chain dependent operations with parallel stages
- **Resource Management**: Efficient utilization of system resources
- **Error Resilience**: Robust error handling with parallel recovery

## Performance Benchmarks

### Batchtools Performance Improvements
- **File Operations**: Up to 300% faster with parallel processing
- **Code Analysis**: 250% improvement with concurrent pattern recognition
- **Test Generation**: 400% faster with parallel test creation
- **Documentation**: 200% improvement with concurrent content generation
- **Memory Operations**: 180% faster with batched read/write operations

## Code Style and Best Practices (Batchtools Enhanced)

### SPARC Development Principles with Batchtools
- **Modular Design**: Keep files under 500 lines, optimize with parallel analysis
- **Environment Safety**: Never hardcode secrets, validate with concurrent checks
- **Test-First**: Always write tests before implementation using parallel generation
- **Clean Architecture**: Separate concerns with concurrent validation
- **Parallel Documentation**: Maintain clear, up-to-date documentation with concurrent updates

### Batchtools Best Practices
- **Parallel Operations**: Use batchtools for independent tasks
- **Concurrent Validation**: Validate multiple aspects simultaneously
- **Batch Processing**: Group similar operations for efficiency
- **Pipeline Optimization**: Chain operations with parallel stages
- **Resource Management**: Monitor and optimize resource usage

## Important Notes (Enhanced)

- Always run tests before committing with parallel execution (`npm run test --parallel`)
- Use SPARC memory system with concurrent operations to maintain context across sessions
- Follow the Red-Green-Refactor cycle with parallel test generation during TDD phases
- Document architectural decisions with concurrent validation in memory
- Regular security reviews with parallel analysis for authentication or data handling code
- Claude Code slash commands provide quick access to batchtools-optimized SPARC modes
- Monitor system resources during parallel operations for optimal performance

For more information about SPARC methodology and batchtools optimization, see: 
- SPARC Guide: https://github.com/ruvnet/claude-code-flow/docs/sparc.md
- Batchtools Documentation: https://github.com/ruvnet/claude-code-flow/docs/batchtools.md

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.
