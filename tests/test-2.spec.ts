import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  // launch url
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

  // click on make appointment
  await page.getByRole("link", { name: "Make Appointment" }).click();

  await expect(page.getByText("Please login to make")).toBeVisible();

  // enter invalid creds
  await page.getByLabel("Username").fill("john");
  await page.getByLabel("Password").fill("this is not a password");

  // click login
  await page.getByRole("button", { name: "Login" }).click();

  // assert failure message
  await expect(page.locator('#login'))
    .toContainText('Login failed! Please ensure the username and password are valid.');
});

