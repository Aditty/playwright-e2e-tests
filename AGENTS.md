# AGENTS.md

## Project overview
- This repository contains Playwright end-to-end tests for the CURA Healthcare demo application.
- All automation work should follow the existing Playwright and TypeScript patterns in this repo.

## Required standards
- Use TypeScript for all new automation code.
- Use the Page Object Model for all UI interactions.
- Keep test files focused on scenario flow; do not place locators or reusable UI logic inline in specs.
- Place locators inside page object classes.
- Reusable actions belong in page classes, not in test files.
- Follow the AAA pattern in every test: Arrange, Act, Assert.
- Ensure all tests are independent and can run in isolation.
- Do not depend on test ordering or shared mutable state.
- Do not modify unrelated files or broad test infrastructure without a clear reason.

## Selector expectations
- Prefer `data-testid` selectors when available.
- If `data-testid` is unavailable, prefer accessible selectors such as `getByRole`, `getByLabel`, or `getByText`.
- Avoid brittle selectors including long CSS chains, XPath whenever avoidable, and DOM-structure-based selectors that are likely to break.
- Keep selectors inside page objects and reuse them where possible.

## Playwright requirements
- Never use `waitForTimeout()`.
- Prefer explicit UI-state waits such as `expect(locator).toBeVisible()`, `toHaveText()`, or `toBeEnabled()`.
- Use Playwright fixtures for shared setup, especially authentication and environment configuration.
- Keep test data deterministic and explicit.
- Avoid hardcoded sleeps and polling loops unless truly necessary.

## Test development rules
- Write one test per behavior or user flow.
- Use descriptive test names that reflect the user-visible behavior being validated.
- Add or update a regression test when fixing a bug.
- Prefer small, focused scenarios over broad end-to-end flows when a targeted check is sufficient.

## Repo structure expectations
- Feature specs should live under `tests/functional`.
- Shared page logic belongs under `tests/pages`.
- Keep page objects thin, readable, and reuse-friendly.
- Use method names that reflect user actions such as `goto()`, `login()`, `submitLogin()`, and `expectStillOnLoginPage()`.

## Validation rules
- Run the smallest relevant Playwright command for the changed behavior.
- Do not suggest broad test suites when a targeted run is enough.
- Do not add redundant coverage that duplicates existing tests.
- Ensure a fix includes a test that covers the bug scenario and passes once the change is correct.

## Quality constraints
- Do not commit secrets, credentials, or environment-specific values.
- Do not add noisy debug logs or unnecessary output.
- Prefer clear, maintainable code over clever or condensed logic.
- Keep changes surgical and aligned with current repo conventions.
