# Benchmark protocol

## System Monitor v1

1. Keep the framework checkout on its current commit and create a detached worktree with `git worktree add --detach ../ai-benchmark-system-monitor-v1 benchmark-baseline`.
2. Record `benchmark-baseline` as the starting fixture commit and provide the unchanged [canonical prompt](../prompts/system-monitor-v1.md).
3. Before the run, execute `nvm exec 22.23.1 npm --prefix ../ai-benchmark-system-monitor-v1/system-monitor ci`, then `nvm exec 22.23.1 node scripts/verify-system-monitor-baseline.mjs --fixture ../ai-benchmark-system-monitor-v1/system-monitor` from the framework checkout.
4. Apply the [fairness policy](fairness.md) and record every deviation.
5. Capture the agent's final report, commands, validation results, runtime, warnings, and sanitized diff statistics.
6. Store a result using the [standard format](../results/README.md), then remove the disposable worktree after preserving evidence.

The fixture contains intentional defects. An agent run is evaluated from the same starting state, not from later portfolio commits. The historical fixture is preserved byte-for-byte for reproducibility; legacy mock labels in historical commits are not carried into the current sanitized portfolio tree.

## Future repeated-run methodology

Single runs are exploratory observations. When practical, run the same agent/configuration at least five times from clean equivalent states. Report success rate, median runtime, median context occupancy when available, validation pass rates, median files changed/diff size, warnings, and useful variance or ranges.

Do not retroactively represent the four Codex configuration trials as repeated statistical samples.
