# AI-Assisted Workflow Drill — Login Form

## Round 1: Vague Prompt
**Prompt used:** "Make me a login form."

**Output:** A working login form (index.html, styles.css, app.js) with email/password fields, a "remember me" checkbox, inline validation, and basic accessible labels. Functional, but built on assumption — no explicit request for tests, specific validation rules, or edge-case handling. The AI had to guess password rules, error message wording, and what "complete" meant.

**Time to usable result:** Fast — one prompt, one response, accepted as-is per drill instructions.

## Round 2: Precise Prompt
**Prompt used:** A detailed prompt specifying exact files, validation rules (email format, 8+ character password), edge cases (empty, whitespace-only, pasted values with spaces), accessibility requirements (aria-live regions, linked labels, aria-invalid), and a verification step requiring automated tests to be written and run before finishing.

**Output:** login.html, login.css, login.js, login.test.js, and package.json. All 10 automated tests passed on the first run, covering valid submission, invalid email, short password, empty fields, whitespace-only input, and pasted-value trimming.

## Comparison

**Correctness:** Round 1's validation logic was basic (likely just checked for "@" and non-empty fields) with no visible test coverage, so correctness was unverified — I had to trust the output. Round 2 came with 10 passing automated tests covering exactly the edge cases I specified, so correctness was demonstrated, not assumed.

**Accessibility:** Round 1 had "accessible labels" per its own description, but no aria-live regions or aria-invalid states were requested or confirmed. Round 2 explicitly included aria-live="polite" regions with role="alert" for error messages, aria-required, aria-invalid, and aria-describedby — all verifiable in the code, not just claimed.

**Edge cases:** Round 1 didn't handle whitespace-only input or pasted values with leading/trailing spaces — I only noticed this gap by comparing to Round 2's explicit trimValue() handling. This is the one concrete AI mistake/gap I caught: Round 1's form would likely accept "   " as a password if it only checked for non-empty length, since no trimming was mentioned in its output description.

**Review effort:** Round 1 took less upfront time (one prompt, immediate accept) but left me with zero confidence in correctness — I'd need to manually test every edge case myself before trusting it in the capstone. Round 2 took longer to prompt (writing the detailed spec took a few minutes) but the built-in test suite meant I reviewed test *results* instead of manually re-deriving every edge case by hand. End-to-end, Round 2 was slower to start but faster to trust — matching the lesson that verification loops pay for themselves once you count review time, not just generation time.

## Conclusion
The vague prompt produces something that looks done. The precise prompt with constraints and a verification step produces something that is demonstrably done. For anything going into the capstone, Round 2's approach — explicit constraints, edge cases, and automated tests run before accepting output — is the workflow I'll default to going forward.