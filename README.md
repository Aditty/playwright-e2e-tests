# Playwright E2E Test Framework

End-to-end test automation framework for the [CURA Healthcare Service](https://katalon-demo-cura.herokuapp.com/) demo application, built with Playwright and TypeScript.

## Tech Stack
- Playwright
- TypeScript
- Node.js

## Prerequisites
- Node.js (v18 or higher)
- npm

## Installation
1. Clone the repository: `git clone https://github.com/Aditty/playwright-e2e-tests.git`
2. Install dependencies: `npm install`
3. Install Playwright browsers: `npx playwright install`

## Running Tests
| Command | Description |
|---|---|
| `npm test` | Run the full test suite |
| `npm run login` | Run login tests (headed) |
| `npm run make-appt:tokyo` | Run Tokyo facility appointment tests (headed) |
| `npm run make-appt:hong-kong` | Run Hong Kong facility appointment tests (headed) |
| `npm run make-appt:seoul` | Run Seoul facility appointment tests (headed) |
| `npm run make-appt:all` | Run all appointment tests across all facilities (headed) |

## Test Coverage
- **Login** — valid login, invalid credentials, logout
- **Make Appointment (Tokyo)** — Medicaid, Medicare, and no health program bookings at Tokyo CURA Healthcare Center
- **Make Appointment (Hong Kong)** — Medicaid, Medicare, and no health program bookings at Hongkong CURA Healthcare Center
- **Make Appointment (Seoul)** — Medicaid, Medicare, and no health program bookings at Seoul CURA Healthcare Center

## Project Structure
Playwright-e2e-tests/
tests/
functional/
login.spec.ts
tokyo-make-appt.spec.ts
hong-kong-make-appt.spec.ts
seoul-make-appt.spec.ts
playwright.config.ts
package.json
README.md

## Notes
- Tests are run against the [Katalon CURA Healthcare Service](https://katalon-demo-cura.herokuapp.com/) demo app
- The demo app is hosted on Heroku and may take a few seconds to wake up on the first run
- Appointment dates are dynamically set 7 days ahead to avoid same-day validation errors

## Reporting
This project uses [Allure](https://allurereport.org/) for test reporting.
### Prerequisites
- [Allure CLI](https://allurereport.org/docs/install/) installed
- Java runtime installed
### Viewing the Report
After running any test command, launch the Allure report with:

| Command | Description |
|---|---|
| `allure serve allure-results` | Generate and open the report in your browser |
