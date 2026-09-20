# Benchmark protocol

## System Monitor v1

1. Record the starting commit: `benchmark-baseline` for original v1 comparisons.
2. Provide the unchanged [canonical prompt](../prompts/system-monitor-v1.md).
3. Apply the [fairness policy](fairness.md) and record every deviation.
4. Capture the agent's final report, commands, validation results, runtime, warnings, and sanitized diff statistics.
5. Store a result using the [standard format](../results/README.md).

The fixture contains intentional defects. An agent run is evaluated from the same starting state, not from later portfolio commits. To restore that historical state, use `git reset --hard benchmark-baseline` only after deliberately saving any work that should be retained.

## Future repeated-run methodology

Single runs are exploratory observations. When practical, run the same agent/configuration at least five times from clean equivalent states. Report success rate, median runtime, median context occupancy when available, validation pass rates, median files changed/diff size, warnings, and useful variance or ranges.

Do not retroactively represent the four Codex configuration trials as repeated statistical samples.
