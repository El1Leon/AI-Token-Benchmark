# Metrics

Record metrics that can be inspected and reproduce their source where practical.

| Metric | Meaning | Interpretation boundary |
| --- | --- | --- |
| Task completion | Whether the stated workload was completed | Requires review against prompt and validation. |
| Tests, lint, build | Validation outcomes | Record commands and expected-baseline context. |
| Runtime | Wall-clock duration of the run | Environment and tool delays can affect it. |
| Context occupancy | Visible context-window occupancy during a run | Not billed token usage. |
| Provider quota indicator delta | Change in a provider's displayed quota percentage | Coarse, provider-specific, delayed/asynchronous, and not an exact token count. |
| Tool activity | Observable commands or tools used | Availability differs by agent/environment. |
| Files changed / diff size | Scope of implementation | Not a direct quality score. |
| Correction passes and warnings | Observable rework or constraints | Record without assuming cause. |
| Configuration/environment | Model, agent, tools, skills, OS, versions | Essential comparison context. |

Cross-provider quota percentages must not be compared as identical units. Agents may take different valid implementation paths, so metrics should be read with the [limitations](limitations.md), not converted into a universal ranking.
