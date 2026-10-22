# Copilot Instructions

## Core standards
- Use TypeScript for all new automation code.
- Use the Page Object Model for all UI interactions.
- Keep test files focused on scenario flow; do not put selectors or reusable logic directly in the spec.
- Place locators inside page object classes.
- Reusable actions belong in page objects, not in the test file.
- Follow the AAA pattern in every test: Arrange, Act, Assert.
- All tests must be independent and runnable in isolation.
- Do not rely on shared state between tests.
- Do not modify unrelated test files or helper code unless required for the change.

## Selector rules
- Prefer `data-testid` selectors when available.
- If `data-testid` is not present, prefer accessible selectors such as:
  - `getByRole`
  - `getByLabel`
  - `getByText`
- Avoid brittle selectors such as long CSS chains, XPath when avoidable, or DOM structure selectors that are likely to change.
- Store selectors in page objects and reuse them from there.

## Playwright rules
- Never use `waitForTimeout()`.
- Prefer explicit waits based on UI state, such as `expect(locator).toBeVisible()`, `toHaveText()`, or `toBeEnabled()`.
- Use Playwright fixtures for shared setup, especially authentication and environment configuration.
- Keep test data deterministic and explicit.
- Avoid hardcoded sleeps or polling loops unless absolutely necessary.

## Test design
- Test one behavior per test case.
- Use descriptive test names that describe the user-visible behavior.
- Add or update a regression test when fixing a bug.
- Prefer small, focused scenarios over broad end-to-end flows when the same behavior can be validated more directly.

## Structure
- Feature specs live under `tests/functional`.
- Shared page logic belongs under `tests/pages`.
- Keep page objects thin, readable, and reuse-friendly.
- Use method names that reflect user actions like `login()`, `submitLogin()`, `goto()`, `expectStillOnLoginPage()`.

## Validation
- Run the smallest relevant Playwright command for the changed behavior.
- Do not suggest broad suites when a targeted run is enough.
- Do not add tests that are redundant or purely duplicate existing coverage.
- Ensure new tests fail on the bug scenario and pass once the fix is in place.

## Quality
- Do not commit secrets, credentials, or environment-specific values.
- Do not add debug logs or noisy test output.
- Prefer clear, maintainable code over clever or condensed logic.
- Keep changes surgical and aligned with the repo’s current patterns.
