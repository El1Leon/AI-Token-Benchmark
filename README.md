# AI Token Benchmark

AI Token Benchmark is a reproducible, multiplatform framework for observing how AI coding-agent configurations affect token-related signals and engineering outcomes under controlled software-engineering workloads.

The project evaluates observable engineering behavior, including debugging, implementation, validation, and reporting. It does not claim to measure exact billed-token consumption or establish a universal ranking of AI models.

Each comparison should use the same starting repository state, canonical prompt, requirements, seeded defects, equivalent environment and tool constraints where practical, and validation criteria.

## Overview

The first benchmark is **System Monitor v1**, a deliberately defective React/TypeScript application designed to evaluate AI coding agents performing realistic software-engineering tasks.

The project maintains two distinct environments:

| Environment | Purpose | Runtime |
| --- | --- | --- |
| Modern development configuration | Framework development, dependency maintenance, and new experiments | Node.js 26, npm 12 |
| Historical System Monitor v1 | Reproducing the original benchmark conditions | Node.js 22.23.1, npm 10.9.8 |

The historical benchmark is preserved at the `benchmark-baseline` Git tag.

**Important:** Results obtained under different runtime and dependency configurations must be identified separately. They are not automatically equivalent.

## Why this project exists

AI coding-agent configurations differ in their models, tools, plugins, hooks, skills, context management, and execution environments.

These differences can affect:

- Task completion and correctness
- Token-related usage indicators
- Development efficiency
- Debugging effectiveness
- Test and build outcomes
- Reproducibility
- Security and code quality

AI Token Benchmark makes these differences observable through documented workloads, controlled starting conditions, and inspectable results.

## Benchmark philosophy

- Compare observable outcomes rather than marketing claims.
- Preserve the original starting state and canonical prompt.
- Record agent configuration, runtime, dependencies, and tool access.
- Distinguish measured data from estimates.
- Avoid treating provider-specific token indicators as equivalent measurements.
- Prefer repeated trials and transparent uncertainty.
- Preserve historical evidence rather than silently rewriting previous benchmarks.

## Current benchmark

| Benchmark | Fixture | Canonical prompt | Status |
| --- | --- | --- | --- |
| System Monitor v1 | `system-monitor/` | [System Monitor v1](prompts/system-monitor-v1.md) | Implemented |

### Intentional benchmark defects

System Monitor v1 contains two deliberately seeded application bugs:

**1. Case-sensitive process searching**

Searching for `safari` fails to find a process named `Safari`.

**2. Incorrect warning-threshold comparison**

A metric equal to its warning threshold is incorrectly classified as normal instead of warning.

These are intentional benchmark challenges, not unresolved dependency-security findings.

The original baseline test suite contains three tests:

| Test | Expected baseline outcome |
| --- | --- |
| Dashboard rendering | Pass |
| Case-insensitive process searching | Fail |
| Warning threshold equality | Fail |

An AI agent's task is to identify and repair the defects in an isolated working copy.

Do not repair these defects in the canonical baseline, modify the expected assertions, or suppress the failing tests.

## Supported agent configurations

The framework can document experiments involving:

- OpenAI Codex
- Anthropic Claude Code
- Google Antigravity
- xAI Grok
- Other coding agents and configurations

Inclusion does not imply that an agent has been evaluated or that results are available.

See [results](results/README.md) for documented experiments.

## Methodology and metrics

- [Benchmark protocol](methodology/benchmark-protocol.md)
- [Metrics](methodology/metrics.md)
- [Fairness policy](methodology/fairness.md)
- [Limitations](methodology/limitations.md)

## Development environment

### Modern configuration

The updated development configuration uses:

| Component | Validated version |
| --- | --- |
| Node.js | 26.13.0 |
| npm | 12.2.1 |
| Vite | 8.3.5 |
| Vitest | 5.0.5 |
| Language | TypeScript |
| Frontend | React |
| Build tooling | Vite |

The Node 26 configuration was validated on an Apple Silicon Mac running macOS.

The framework is intended to be multiplatform, but validation on macOS does not establish equivalent behavior on Windows or Linux.

### Requirements

Use Node.js 26 and npm 12 for the updated development configuration.

On macOS with Homebrew:

```bash
brew install node
```

Verify the installed runtime:

```bash
node --version
npm --version
```

If using nvm alongside Homebrew:

```bash
nvm use system
```

### Installation

Clone the repository:

```bash
git clone https://github.com/El1Leon/AI-Token-Benchmark.git
cd AI-Token-Benchmark
```

Install the System Monitor dependencies:

```bash
cd system-monitor
npm ci
```

### Development commands

Run the development server:

```bash
npm run dev
```

Build the application:

```bash
npm run build
```

Check linting:

```bash
npm run lint
```

Execute the benchmark tests:

```bash
npm test
```

The two intentional baseline failures are expected until an agent repairs the fixture.

## Historical benchmark reproducibility

The original System Monitor v1 benchmark is preserved at the immutable Git tag:

`benchmark-baseline`

Its historical runtime is:

- Node.js 22.23.1
- npm 10.9.8

Historical reproduction should use those original versions and the corresponding locked dependencies.

### Create an isolated historical worktree

From the repository root:

```bash
git worktree add --detach \
  ../ai-benchmark-system-monitor-v1 \
  benchmark-baseline
```

This creates a separate checkout without changing the current development branch.

### Install historical dependencies

For exact historical reproduction, install Node.js 22.23.1 through a suitable version manager, then run:

```bash
nvm exec 22.23.1 npm --prefix \
  ../ai-benchmark-system-monitor-v1/system-monitor ci
```

### Verify the historical fixture

From the current framework checkout:

```bash
nvm exec 22.23.1 node \
  scripts/verify-system-monitor-baseline.mjs \
  --fixture ../ai-benchmark-system-monitor-v1/system-monitor
```

The verifier requires exactly three baseline tests, with one passing and two specifically documented failures.

The historical fixture was also successfully installed, built, and baseline-verified under Node.js 26.13.0 and npm 12.2.1.

However, successful execution under Node 26 does not establish identical behavior or benchmark comparability with the original Node 22 configuration.

### Preserve historical evidence

Before removing the worktree, retain:

- Starting commit and benchmark tag
- Agent and model versions
- Canonical prompt
- Runtime and dependency versions
- Enabled tools, plugins, and permissions
- Validation output
- Final source changes
- Token-related measurements and their limitations

Remove the worktree only after preserving the relevant evidence:

```bash
git worktree remove ../ai-benchmark-system-monitor-v1
```

This removes the worktree directory. Do not use this command while it contains unpreserved work.

## Validation

The updated development configuration has completed the following checks:

| Validation | Last observed result |
| --- | --- |
| Dependency installation | Passed |
| TypeScript/Vite production build | Passed |
| Oxlint | 0 errors, 0 warnings |
| Strict baseline verification | Passed |
| Vitest baseline | 1 pass, 2 intentional failures |
| npm audit | 0 reported vulnerabilities |

The baseline verifier checks that the expected defects remain present. It is not a substitute for a comprehensive functional test suite.

A completed agent repair should run the full test suite and report the actual outcome.

## Dependency security

The modern development configuration received dependency updates following an npm security audit.

### Remediation summary

| Metric | Before | After |
| --- | --- | --- |
| Reported npm vulnerabilities | 5 | 0 |
| High-severity findings | 3 | 0 |
| Moderate-severity findings | 2 | 0 |

Updated dependency groups include Vite, Vitest, and affected transitive dependencies.

The validated updated configuration includes Vite 8.3.5 and Vitest 5.0.5.

### Security limitations

A clean npm audit means that npm reported no known vulnerabilities in the audited dependency tree at the time of the check.

It does not establish that the repository is free of:

- Application security defects
- Malicious or unsafe scripts
- Exposed secrets
- Supply-chain compromises
- Insecure CI/CD configuration
- Undiscovered vulnerabilities

The historical benchmark fixture intentionally retains its original locked dependencies and must not be treated as a security-maintained production application.

On the validated macOS installation, npm 12 also reported that an installation script for `fsevents@2.3.3` was blocked by its script-approval policy. The application still built successfully. The blocked script was not itself an npm audit vulnerability.

Read [SECURITY.md](SECURITY.md) for disclosure and repository-security guidance.

## Repository structure

```text
.
├── .github/                 # CI and repository automation
├── methodology/             # Protocol, metrics, fairness, limitations
├── prompts/                 # Canonical benchmark prompts
├── results/                 # Reproducible experiment records
├── scripts/                 # Validation helpers
└── system-monitor/          # React/TypeScript benchmark fixture
```

## Results

Use the [result format](results/README.md) when publishing experiments.

Results must distinguish actual measurements from estimates and record relevant environment differences.

The existing [Codex configuration study](results/codex/README.md) contains four observational trials with documented confounders.

Untested agents must not be assigned inferred scores.

## Limitations

AI Token Benchmark does not establish universal model superiority.

Results can be affected by:

- Model nondeterminism
- Runtime and dependency differences
- Tool permissions and availability
- Context and memory configuration
- Prompt interpretation
- Hardware and operating systems
- Provider-specific usage reporting
- Trial count and experimental design

See [limitations](methodology/limitations.md).

## Roadmap

### Implemented

- System Monitor v1 fixture
- Canonical benchmark prompt
- Strict baseline verification
- Result-recording framework
- Dependency vulnerability remediation in the updated development configuration

### Planned

- Versioned Node 26 benchmark protocol
- Repeated-run comparison procedures
- Additional debugging workloads
- Accessibility evaluations
- Refactoring challenges
- Test-generation tasks
- API development workloads
- Security-review challenges
- Frontend and TypeScript benchmarks
- Performance optimization workloads

### Experimental

Cross-agent comparisons using documented equivalent constraints and repeatable workloads.

## Contributing

Contributions are welcome through [CONTRIBUTING.md](CONTRIBUTING.md).

Methodology improvements, reproducibility findings, security reports, and benchmark proposals are encouraged.

## License

Licensed under the [MIT License](LICENSE).
