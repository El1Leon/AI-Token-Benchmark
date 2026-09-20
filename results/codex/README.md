# Codex results

## Configuration investigation: System Monitor v1

This exploratory four-trial configuration investigation used the same System Monitor v1 starting fixture. All trials completed successfully. The observations are not token billing measurements and are not repeated statistical samples.

## Common provenance

| Field | Value |
| --- | --- |
| Agent / version | Codex CLI v0.154.0 |
| Model | gpt-5.6-terra |
| Reasoning / fast mode | low / enabled |
| Summary behavior | auto |
| Benchmark / starting fixture | System Monitor v1 / `benchmark-baseline` |
| Canonical workload | [`prompts/system-monitor-v1.md`](../../prompts/system-monitor-v1.md) |
| Host OS / architecture | macOS / arm64 |
| Git version | 2.55.0 |
| Benchmark Node / npm | Node 22.23.1 via `nvm exec 22` / npm 10.9.8 |
| Run date | Not recorded |
| Exact provider/model revision | Not available |
| Enabled tools and MCP access | Not recorded |
| Exact plugin/skill inventory | Not recorded; only the configuration changes below are available |
| Tests, lint, build detail | Not recorded; task completion was recorded as successful |
| Files changed / diff size / correction passes | Not recorded |

| Trial | Configuration concept | Skills omitted | Final context occupancy | 5-hour quota delta | Weekly quota delta | Runtime | Completion |
| --- | --- | ---: | ---: | ---: | ---: | --- | --- |
| A | Original configuration | 291 | 44.7K | 13 percentage points | 2 percentage points | 2m24s | Successful |
| B | Disabled ten Claude/plugin-heavy global plugin entries | 177 | 54.8K | 8 percentage points | 1 percentage point | 3m18s | Successful |
| C | Trial B changes plus removal of a large globally discoverable skill collection from active global discovery | 19 | 43K | 6 percentage points | 1 percentage point | 2m04s | Successful |
| D | Trial C changes plus nine Designer Skills plugins disabled; no hard skill omission; skill descriptions shortened to fit context budget | None | 57K | 8 percentage points | 1 percentage point | 2m34s | Successful |

Trial C had the lowest observed final context occupancy and the smallest observed 5-hour quota-indicator delta among these four exploratory trials. This does **not** prove lower token consumption: context occupancy is not billing, quota indicators are not exact token counts, the sample is one run per configuration, and trials differed behaviorally.

> **Confounder:** Trials A and B added tests during task execution. Trials C and D did not. Direct quota or context comparisons are therefore behaviorally confounded. See [limitations](../../methodology/limitations.md).

The conceptual configuration descriptions are intentionally high level. No private global agent configuration, credentials, paths, session data, or account identifiers are included.
