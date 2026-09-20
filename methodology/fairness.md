# Fairness policy

Every result must declare what the agent could see and use. Equivalent constraints are the goal; exact equivalence is not always technically possible.

## Required disclosure

Record whether the agent had access to repository contents, tests, source comments, Git history, canonical prompt, network access, shell/browser tools, MCP servers, plugins, skills, memory, reasoning settings, agent/version, model/version, and any additional instructions.

## System Monitor v1 limitation

The current fixture's source comments and tests reveal some seeded defects. This is known solution leakage. For a fair v1 comparison, all agents should receive the same visibility into these files and the result should state that condition.

A future benchmark revision may separate public challenge code from a validation harness to reduce leakage. That would be a new version, not a rewrite of v1 evidence.

## Configuration discipline

Avoid private credentials and provider-specific hidden context where possible. If skills, plugins, memory, MCP access, network access, or reasoning effort differ, disclose the difference instead of presenting the runs as directly comparable.
