# OpenAI Codex — System Monitor v1 Run 1

## Run Metadata

- Agent: OpenAI Codex
- Codex CLI: 0.155.1
- Model: `gpt-5.6-terra`
- Reasoning: Low
- Mode: Fast
- Starting fixture: `benchmark-baseline`
- Starting commit: `2ee73b4d2475426982d8e33deeaa2c78791aeb8d`
- Starting state: Detached HEAD, clean worktree
- Canonical workload: `prompts/system-monitor-v1.md`
- Benchmark worktree: `ai-benchmark-codex-system-monitor-v1`

Codex reported one MCP startup issue indicating that one MCP integration needed sign-in. No sign-in, configuration change, or MCP interaction was performed during the benchmark.

The benchmark was executed against the detached `benchmark-baseline` fixture rather than the development `main` branch.

## Baseline

The baseline verifier confirmed the intentionally defective starting state.

Expected baseline test state:

- 3 tests total
- 1 passed
- 2 failed

The two expected failures were:

1. Lowercase `safari` could not find the `Safari` process.
2. A metric exactly at the warning threshold of `75` was classified as normal instead of warning.

The benchmark fixture also contained additional intentionally seeded implementation weaknesses covering sorting, accessibility, responsive layout, duplicated filtering logic, and starter dashboard styling.

## Workload

The canonical benchmark prompt was used unchanged from:

`prompts/system-monitor-v1.md`

The workload required the agent to diagnose the existing implementation, correct functional defects, improve accessibility and responsive behavior, preserve the local/mock telemetry architecture, and validate the result with tests, lint, and production build.

## Changes Made

Codex modified exactly six tracked files:

1. `system-monitor/src/App.css`
2. `system-monitor/src/App.tsx`
3. `system-monitor/src/components/MetricCard.tsx`
4. `system-monitor/src/components/ProcessTable.tsx`
5. `system-monitor/src/components/SettingsModal.tsx`
6. `system-monitor/src/test/App.test.tsx`

### App

- Made process searching case-insensitive and trimmed the search value.
- Memoized the filtered process list.
- Derived the visible process count from the filtered collection.
- Added an accessible search label.
- Improved settings-button accessibility state.
- Added an accessible label/state to the theme control.

### MetricCard

- Corrected threshold comparisons so warning and critical thresholds include their boundary values.

### ProcessTable

- Prevented sorting from mutating the source array.
- Memoized sorted results.
- Centralized sortable-column behavior.
- Added accessible sort button labels.
- Added `aria-sort` state.
- Added responsive table data labels.
- Added an empty-state presentation.

### SettingsModal

- Added dialog semantics.
- Added `aria-modal`.
- Added accessible title/description relationships.
- Added an accessible close-button label.
- Added focus management when opening.
- Restored focus after closing.
- Added Escape-key handling.
- Added keyboard focus trapping.
- Preserved backdrop-close behavior.

### Styling

- Replaced the unused starter Vite styling with System Monitor styling.
- Preserved dark/light theme behavior.
- Preserved compact-table behavior.
- Added responsive layouts for smaller screens.
- Improved the process table's mobile presentation.

### Tests

Codex added four regression tests covering:

- Critical threshold behavior.
- Accessible settings dialog behavior, focus restoration, and Escape handling.
- Sorting state.
- Non-mutating process-row sorting.

The original three baseline tests were preserved.

## Final Validation

Independent post-run validation was performed after Codex completed its work.

### Tests

```text
7 tests passed
0 tests failed
```

The final suite contained:

- renders the dashboard
- should search process names without case sensitivity
- should treat the warning threshold itself as warning
- treats the critical threshold itself as critical
- opens an accessible settings dialog and returns focus when closed
- sorts a copy of process rows and communicates sorting state
- does not mutate the rows it receives while sorting

### Lint

```text
Found 0 warnings and 0 errors.
Finished in 23ms on 9 files with 116 rules using 10 threads.
```

Result: PASS

### Production Build

```text
vite v8.3.0
21 modules transformed
dist/index.html 0.46 kB gzip 0.29 kB
dist/assets/index-Bz53biyN.css 6.06 kB gzip 2.08 kB
dist/assets/index-BHYpF7Aq.js 226.08 kB gzip 70.65 kB
built in 93ms
```

Result: PASS

### Git Validation

`git diff --check` passed with no whitespace errors.

## Runtime

Codex reported:

```text
Worked for 2m 9s
```

This is an **agent-reported benchmark completion duration**, not an independently measured wall-clock runtime. Subsequent evidence-gathering and validation occurred after the benchmark completion and are not included in this duration.

## Change Size

The final Codex worktree contained exactly six modified tracked files.

Diff statistics:

```text
231 insertions(+)
222 deletions(-)
```

No commit was created from the benchmark worktree.

No branch was created or advanced.

Nothing was pushed from the benchmark worktree.

## Environment

The dependency installation before the benchmark was performed with:

```text
Node 22.23.1
npm 11.19.1
```

The installation added 110 packages and audited 111 packages with 0 vulnerabilities.

npm reported an install-script warning concerning `fsevents@2.3.3` and `allowScripts`. This did not affect the benchmark result.

Codex's own benchmark execution reported Node/npm information from its execution environment separately. These observations are preserved rather than normalized into a single claimed environment value.

## Token Usage Caveat

Codex later exposed cumulative session usage during post-run evidence gathering:

```text
Total: 112,051
Input: 104,022
Cached input: 582,656
Output: 8,029
Reasoning: 814
```

These values were observed **after benchmark completion** and represent session-reported usage at that later point. They are therefore not treated as benchmark-only token consumption and are not used as a direct efficiency measurement.

The private Codex session identifier is intentionally not recorded in this public report.

## Reproducibility and Artifact Verification

The exact Codex patch was preserved at:

`results/codex/system-monitor-v1-run-1.patch`

Patch SHA-256:

```text
3d527b52c9e6be59a3be54a684615574bdaa0c646f468eb04df4338256ee460f
```

The patch contains exactly the six modified files listed in this report.

A fresh detached worktree was created from `benchmark-baseline`, and the preserved patch was checked against that clean fixture with:

```text
git apply --check
```

Result: PASS

The frozen Codex worktree was then compared directly with the preserved patch.

Live Codex diff SHA-256:

```text
3d527b52c9e6be59a3be54a684615574bdaa0c646f468eb04df4338256ee460f
```

The live worktree hash exactly matches the preserved patch hash.

This establishes that the public patch artifact corresponds byte-for-byte to the frozen Codex benchmark diff.

## Privacy and Security Review

The preserved patch was scanned for:

- local `/Users/` paths
- private Codex session identifiers
- repository owner identifiers
- API keys
- tokens
- passwords
- secrets
- authorization headers
- bearer credentials
- MCP configuration references

No matches were found.

No credentials, private configuration, agent state, transcripts, logs, or other private runtime artifacts were included in the preserved patch.

The benchmark application continues to use mocked/local telemetry only and does not introduce external APIs or real system monitoring.

## Preserved Patch Artifact

The official preserved patch is:

`results/codex/system-monitor-v1-run-1.patch`

SHA-256:

```text
3d527b52c9e6be59a3be54a684615574bdaa0c646f468eb04df4338256ee460f
```

Files represented by the patch:

- `system-monitor/src/App.css`
- `system-monitor/src/App.tsx`
- `system-monitor/src/components/MetricCard.tsx`
- `system-monitor/src/components/ProcessTable.tsx`
- `system-monitor/src/components/SettingsModal.tsx`
- `system-monitor/src/test/App.test.tsx`

The patch is intentionally preserved as generated evidence. It should not be reformatted or normalized because its exact contents and SHA-256 are part of the reproducibility record.

## Final Outcome

OpenAI Codex completed the System Monitor v1 workload from the reproducible `benchmark-baseline` fixture.

Final independent validation:

- Tests: **7 passed / 0 failed**
- Lint: **PASS**
- Production build: **PASS**
- `git diff --check`: **PASS**
- Patch application against clean baseline: **PASS**
- Live Codex diff and preserved patch: **exact SHA-256 match**
- Private-data scan of preserved patch: **no matches**
- External APIs introduced: **none**
- Real system monitoring introduced: **none**

The benchmark worktree remained detached and uncommitted so that the exact generated change set could be preserved independently of the repository's archival commit.
