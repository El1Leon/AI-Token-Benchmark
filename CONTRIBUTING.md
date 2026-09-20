# Contributing

Thank you for improving AI-Benchmark. Contributions should make a workload, result, or methodology easier to reproduce and review.

## Ways to contribute

- Propose a benchmark with a stable starting state, canonical prompt, validation criteria, and documented limitations.
- Add an agent result using the [standard result format](results/README.md).
- Add support documentation for another AI coding agent.
- Report a fairness, reproducibility, or methodology concern.
- Improve the fixture, validation, or documentation only in a new, clearly versioned benchmark revision.

## Result submissions

State the agent and model versions when known, reasoning mode, date, OS/architecture, Node/npm versions, starting commit/tag, prompt version, enabled tools/plugins/skills, runtime, validation outputs, diff size, and limitations. Do not imply missing measurements.

## Safety requirements

Do not commit secrets, credentials, personal data, proprietary prompts without permission, private provider/model data, private logs, session transcripts, or local agent state. Sanitize screenshots and logs. Keep public configurations explicitly sanitized and reproducible.

## Before opening a pull request

Run relevant validation, inspect the diff, and disclose methodology changes. Preserve existing benchmark tags and historical fixtures. New fixtures should not overwrite old evidence.
