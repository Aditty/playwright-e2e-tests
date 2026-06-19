import { test, expect } from "@playwright/test";

test.describe("Make an Appointment at Hongkong Cura Healthcare center", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await page.locator("#menu-toggle").click();
    await page.getByRole("link", { name: "Login" }).click();
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.locator("h2")).toContainText("Make Appointment");
    await page.getByLabel('Facility').selectOption('Hongkong CURA Healthcare Center');
  });

  test.afterEach(async ({ page }) => {
    const logout = page.getByRole("link", { name: "Logout" });
    await page.locator("#menu-toggle").click();
    await expect(logout).toBeVisible();
    await logout.click();
    await expect(page.locator("h1")).toContainText("CURA Healthcare Service");
  });

  test("Should book a Medicaid Appointment", async ({ page }) => {
    await page.getByRole("radio", { name: "Medicaid" }).check();
    await page.getByRole("textbox", { name: "Visit Date (Required)" }).click();

    // 7 days ahead/dynamic
    const target = new Date();
    target.setDate(target.getDate() + 7);

    const day = target.getDate().toString();
    const calendar = page.locator(".datepicker").first();
    await expect(calendar).toBeVisible();
    await page
      .locator(".day:not(.old):not(.new)")
      .filter({ hasText: day })
      .first()
      .click();
    await page.getByRole("button", { name: "Book Appointment" }).click();
    await expect(page.locator("h2")).toContainText("Appointment Confirmation");
  });

  test("Should book a Medicare Appointment", async ({ page }) => {
    await page.getByRole("radio", { name: "Medicare" }).check();
    await page.getByRole("textbox", { name: "Visit Date (Required)" }).click();

    // 7 days ahead/dynamic
    const target = new Date();
    target.setDate(target.getDate() + 7);

    const day = target.getDate().toString();
    const calendar = page.locator(".datepicker").first();
    await expect(calendar).toBeVisible();
    await page
      .locator(".day:not(.old):not(.new)")
      .filter({ hasText: day })
      .first()
      .click();

    await page.getByRole("button", { name: "Book Appointment" }).click();
    await expect(page.locator("h2")).toContainText("Appointment Confirmation");
  });

  test("Should book an appointment for someone with no health programs", async ({ page }) => {
    await page.getByRole("radio", { name: "None" }).check();
    await page.getByRole("textbox", { name: "Visit Date (Required)" }).click();

    // 7 days ahead/dynamic
    const target = new Date();
    target.setDate(target.getDate() + 7);

    const day = target.getDate().toString();
    const calendar = page.locator(".datepicker").first();
    await expect(calendar).toBeVisible();
    await page
      .locator(".day:not(.old):not(.new)")
      .filter({ hasText: day })
      .first()
      .click();

      await page.getByRole('textbox', { name: 'Comment' }).click();
      await page.getByRole('textbox', { name: 'Comment' }).fill('I dont have insurance.');

    await page.getByRole("button", { name: "Book Appointment" }).click();
    await expect(page.locator("h2")).toContainText("Appointment Confirmation");

  });
});
