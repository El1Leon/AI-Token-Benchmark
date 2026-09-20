# Results

Results are sanitized run records, not a leaderboard. Do not infer an unreported measurement or publish a result for an untested agent.

## Required format

```md
# <Agent> — <Benchmark> — <Run identifier>

| Field | Value |
| --- | --- |
| Agent / version | |
| Model / version, if known | |
| Reasoning or effort mode | |
| Date | |
| OS / architecture | |
| Node / npm | |
| Starting commit or tag | |
| Benchmark / prompt version | |
| Enabled tools, plugins, skills | |
| Runtime | |
| Tests / lint / build | |
| Context occupancy, if available | |
| Provider quota before / after / delta | |
| Files changed / diff size | |
| Warnings | |

## Notable behavior and limitations

Describe the implementation path, correction passes, deviations from the protocol, unavailable measurements, and reasons comparisons may not be direct.
```

Never include credentials, personal data, local paths, raw private transcripts, or unsanitized screenshots/logs.
