import { test, expect } from "@playwright/test";

test.describe("Make an Appointment at Tokyo Cura Healthcare center", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://katalon-demo-cura.herokuapp.com/profile.php#login");
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.locator("h2")).toContainText("Make Appointment");
    await expect(page.getByLabel("Facility")).toContainText(
      "Tokyo CURA Healthcare Center",
    );
  });

  test.afterEach(async ({ page }) => {
    const logout = page.getByRole("link", { name: "Logout" });
    await page.locator("#menu-toggle").click();
    await expect(logout).toBeVisible();
    await logout.click();
    await expect(page.locator("h1")).toContainText("CURA Healthcare Service");
  });

  // Requirement: appointments can be made 1 day and 30 days out
  for (const daysAhead of [1, 30]) {
    test(`Should book an appointment ${daysAhead} day(s) from today`, async ({
      page,
    }) => {
      await page.getByRole("radio", { name: "Medicare" }).check();
      await page.getByRole("textbox", { name: "Visit Date (Required)" }).click();

      const today = new Date();
      const target = new Date();
      target.setDate(today.getDate() + daysAhead);

      // how many times to click the datepicker's next-month arrow
      const monthsAhead =
        (target.getFullYear() - today.getFullYear()) * 12 +
        (target.getMonth() - today.getMonth());

      const calendar = page.locator(".datepicker-days");
      await expect(calendar).toBeVisible();

      for (let i = 0; i < monthsAhead; i++) {
        await calendar.locator("th.next").click();
      }

      await calendar
        .locator(".day:not(.old):not(.new)")
        .getByText(new RegExp(`^${target.getDate()}$`))
        .click();

      await page.getByRole("button", { name: "Book Appointment" }).click();
      await expect(page.locator("h2")).toContainText("Appointment Confirmation");
    });
  }
});