# Security policy

## Reporting a vulnerability

For a public repository, use GitHub's private vulnerability-reporting workflow when it is enabled. Until then, do not post exploitable details, credentials, or personal data in a public issue. Open a minimal issue asking for a private reporting channel if necessary.

## Submission safety

Benchmark submissions must be sanitized. Never commit API keys, tokens, passwords, private keys, `.env` files, cookies, credentials, private provider data, local AI-agent state, or raw session transcripts.

Review result logs and screenshots for account details, local usernames, machine paths, identifiers, and private prompts before submission. Do not include live credentials in an example configuration. The repository `.gitignore` excludes common environment and credential files, but an ignore rule is not a substitute for review.

## GitHub repository settings to enable after publication

- Secret scanning and push protection.
- Dependabot alerts and security updates.
- Dependency review for pull requests.
- CodeQL, when the repository's scope and supported languages make it useful.
- Branch protection or rulesets requiring the validation workflow.
- Private vulnerability reporting.

These are recommendations only; this repository does not configure GitHub remotely.
