# AI Token Benchmark

AI Token Benchmark is a reproducible framework for observing how AI coding-agent configurations affect token-related signals and engineering outcomes under controlled software-engineering workloads.

It is designed to make configuration effects observable—not to create an unsupported universal leaderboard or claim exact billed-token counts. Each comparison should give agents the same repository state, benchmark prompt, requirements, starting defects, equivalent environment and tool constraints where practical, and validation criteria.

## Overview

The first fixture is a deliberately defective React/TypeScript System Monitor application. It is a stable workload for measuring how an agent investigates, implements, validates, and reports a repair. The fixture is historical evidence: its original challenge is preserved at the [`benchmark-baseline`](#reproducibility) tag.

## Why this project exists

AI coding-agent setups can vary widely as skills, plugins, hooks, tools, and model settings change. Their effects are difficult to compare when the prompt, starting commit, configuration, or validation evidence is missing. This repository keeps those inputs explicit so results can be reviewed in context and extended responsibly.

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

Keep the current framework checkout and create a separate, disposable worktree for the historical System Monitor v1 fixture:

```bash
git clone <repository-url>
cd AI-Token-Benchmark
git worktree add --detach ../ai-benchmark-system-monitor-v1 benchmark-baseline
```

The framework stays on `main`; the temporary worktree contains the exact historical fixture. Give the agent the unchanged [System Monitor v1 prompt](prompts/system-monitor-v1.md), then work in `../ai-benchmark-system-monitor-v1/system-monitor`. Before the run, verify the fixture from the framework checkout:

```bash
nvm exec 22.23.1 npm --prefix ../ai-benchmark-system-monitor-v1/system-monitor ci
nvm exec 22.23.1 node scripts/verify-system-monitor-baseline.mjs \
  --fixture ../ai-benchmark-system-monitor-v1/system-monitor
```

Collect the agent result and validation evidence before removing the worktree:

```bash
git worktree remove ../ai-benchmark-system-monitor-v1
```

`git worktree remove` removes that worktree, so use it only after preserving the run evidence. `git reset --hard benchmark-baseline` remains an advanced destructive option, not the recommended workflow. The historical baseline intentionally predates the portfolio framework.

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

The fixture was validated with Node `22.23.1` and npm `10.9.8`. The root [`.nvmrc`](.nvmrc) pins the tested Node version; `system-monitor/package.json` accepts compatible Node 22 and npm 10 releases. From `system-monitor/`:

```bash
nvm exec 22.23.1 npm ci
nvm exec 22.23.1 npm run lint
nvm exec 22.23.1 npm run build
```

## Validation

The normal fixture tests intentionally fail at the baseline. Verify that expected condition without masking arbitrary failures:

```bash
nvm exec 22.23.1 node scripts/verify-system-monitor-baseline.mjs
```

The verifier consumes Vitest's JSON report and requires exactly three tests: one pass and the two documented seeded failures. CI also executes its synthetic adversarial cases before strict baseline verification. A completed agent run should execute the fixture test suite normally and report its actual outcome.

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
