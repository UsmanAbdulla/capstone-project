# CLAUDE.md

This file provides context for Claude Code (or any AI assistant) working in this repository.

## Project overview
This is my capstone project for the Frontend AI Engineering track. [Add a one-line description of what you're building once decided.]

## Tech stack
- Node.js (LTS)
- Git for version control
- VS Code with Claude Code extension

## Conventions
- Commit messages follow Conventional Commits (e.g. `feat:`, `fix:`, `docs:`, `chore:`)
- Keep functions small and single-purpose
- Use clear, descriptive variable and function names
- Comment only where logic isn't self-explanatory

## Notes for AI assistant
- Prefer simple, readable solutions over clever one-liners
- Ask before adding new dependencies
- Follow existing code style in the repo
## Rules learned from AI-assisted workflow drill (FE-03)

1. Always specify validation rules explicitly (exact format, min/max lengths) — never let the AI guess constraints like password length or email format; unstated assumptions lead to weaker, unverified validation logic.
2. Every form must include a verification step: request automated tests as part of the same prompt, and require them to run and pass before accepting the output as done.
3. Explicitly request edge-case handling (empty input, whitespace-only input, leading/trailing spaces on paste) — these are consistently missed unless named directly in the prompt, as shown when Round 1's vague prompt skipped whitespace trimming entirely.