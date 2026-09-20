# AI-Benchmark

AI-Benchmark is a reproducible benchmark framework for evaluating AI coding agents under controlled software-engineering workloads.

It is designed to make engineering behavior observable—not to create an unsupported universal leaderboard. Each comparison should give agents the same repository state, benchmark prompt, requirements, starting defects, equivalent environment and tool constraints where practical, and validation criteria.

## Overview

The first fixture is a deliberately defective React/TypeScript System Monitor application. It is a stable workload for measuring how an agent investigates, implements, validates, and reports a repair. The fixture is historical evidence: its original challenge is preserved at the [`benchmark-baseline`](#reproducibility) tag.

## Why this project exists

AI coding-agent evaluations are often hard to reproduce: the prompt, tools, model settings, starting commit, or validation evidence are missing. This repository keeps those inputs explicit so results can be reviewed in context and extended responsibly.

## Benchmark philosophy

- Compare observable outcomes, not marketing claims.
- Preserve the starting state and canonical prompt for each benchmark version.
- Record environment, agent configuration, and limitations alongside results.
- Avoid treating provider indicators as interchangeable token measurements.
- Prefer repeated runs and transparent uncertainty over single-run rankings.

## Current benchmark

| Benchmark | Fixture | Canonical prompt | Status |
| --- | --- | --- | --- |
| System Monitor v1 | `system-monitor/` | [System Monitor v1](prompts/system-monitor-v1.md) | Implemented |

The v1 fixture intentionally contains seeded defects. Its baseline tests are expected to fail until an agent completes the workload. This is validated transparently in CI; it is not silently ignored.

## Agents

The framework can record runs from Codex, Claude Code, Antigravity, Grok, and future agents. Agent support means a documented result format, not a claim that an agent has been tested. See [results](results/README.md).

## Methodology and metrics

- [Benchmark protocol](methodology/benchmark-protocol.md)
- [Metrics](methodology/metrics.md)
- [Fairness policy](methodology/fairness.md)
- [Limitations](methodology/limitations.md)

## Reproducibility

Use the recorded starting tag for System Monitor v1:

```bash
git clone <repository-url>
cd AI-Benchmark
git reset --hard benchmark-baseline
```

`git reset --hard` discards uncommitted work. Do not run it unless that is intentional. The historical baseline predates later repository and portfolio documentation.

For a run, record the starting commit/tag, prompt version, agent/model/version, enabled tools and plugins, environment, commands, and final diff. The canonical workload is immutable for v1 comparisons.

## Repository structure

```text
.
├── .github/                 # CI, Dependabot, and contribution templates
├── methodology/             # Protocol, metrics, fairness, limitations
├── prompts/                 # Immutable benchmark prompts
├── results/                 # Sanitized, reproducible run records
├── scripts/                 # Repository-level validation helpers
└── system-monitor/          # React/TypeScript benchmark fixture
```

## Running the benchmark

1. Start from the documented tag or commit.
2. Give the agent the exact canonical prompt.
3. Apply the fairness policy and record all meaningful constraints.
4. Run the validation commands and preserve a sanitized result record.

The fixture requires Node 22. From `system-monitor/`:

```bash
npm ci
npm run lint
npm run build
```

## Validation

The normal fixture tests intentionally fail at the baseline. Verify that expected condition without masking arbitrary failures:

```bash
node scripts/verify-system-monitor-baseline.mjs
```

CI runs that baseline verifier separately from lint and production build. A completed agent run should execute the fixture test suite normally and report its actual outcome.

## Results

Use the [result format](results/README.md). Results for untested agents remain pending; no inferred scores are published. The existing [Codex configuration study](results/codex/README.md) is a four-trial observational study with explicit confounders.

## Security

Read [SECURITY.md](SECURITY.md) before contributing a result. Never commit credentials, private agent state, raw session transcripts, or unsanitized screenshots/logs.

After creating a GitHub repository, enable the settings listed in [SECURITY.md](SECURITY.md#github-repository-settings-to-enable-after-publication).

## Limitations

This project does not establish model superiority. Agent behavior is nondeterministic, tools and environments differ, and provider quota indicators are not exact or cross-provider token counts. See [limitations](methodology/limitations.md).

## Roadmap

- **Implemented:** System Monitor v1 fixture, canonical prompt, result format, baseline verification.
- **Planned:** repeated-run protocols and additional debugging, accessibility, refactoring, test-generation, API, security-review, frontend, TypeScript, performance workloads.
- **Experimental:** cross-agent comparisons under carefully documented equivalent constraints.

## Contributing

Contributions are welcome through the process in [CONTRIBUTING.md](CONTRIBUTING.md). Methodology concerns are as valuable as code changes.

## License

This project is licensed under the [MIT License](LICENSE).
