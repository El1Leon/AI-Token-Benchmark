# Codex results

## Configuration investigation: System Monitor v1

This exploratory four-trial study investigated unexpectedly high agent usage/context pressure against the same System Monitor workload. All trials completed successfully. The observations are not token billing measurements and are not repeated statistical samples.

| Trial | Configuration concept | Skills omitted | Final context occupancy | 5-hour quota delta | Weekly quota delta | Runtime | Completion |
| --- | --- | ---: | ---: | ---: | ---: | --- | --- |
| A | Original configuration | 291 | 44.7K | 13 percentage points | 2 percentage points | 2m24s | Successful |
| B | Disabled ten Claude/plugin-heavy global plugin entries | 177 | 54.8K | 8 percentage points | 1 percentage point | 3m18s | Successful |
| C | Trial B changes plus removal of a large globally discoverable skill collection from active global discovery | 19 | 43K | 6 percentage points | 1 percentage point | 2m04s | Successful |
| D | Trial C changes plus nine Designer Skills plugins disabled; skill descriptions shortened to fit context budget | None | 57K | 8 percentage points | 1 percentage point | 2m34s | Successful |

The practical observation was that Trial C provided the best observed balance in this experiment. It does **not** prove that Trial C lowers token consumption: context occupancy is not billed usage, quota indicators are not exact token counts, and A/B added tests while C/D did not. See [limitations](../../methodology/limitations.md).

The conceptual configuration descriptions are intentionally high level. No private global agent configuration, credentials, paths, session data, or account identifiers are included.
