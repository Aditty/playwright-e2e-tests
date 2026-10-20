import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";

test.describe("Login Functionality", () => {
  test.beforeEach("Go to login page", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test("Should login successfully", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login("John Doe", "ThisIsNotAPassword");

    await expect(page.locator("h2")).toContainText("Make Appointment");
  });

  test("Should prevent login with empty credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.submitLogin();

    await loginPage.expectStillOnLoginPage();
  });

  test("Should log out successfully", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login("John Doe", "ThisIsNotAPassword");

    await expect(page.locator("h2")).toContainText("Make Appointment");

    await page.locator("#menu-toggle").click();
    await page.getByRole("link", { name: "Logout" }).click();

    await expect(page.locator("h1")).toContainText("CURA Healthcare Service");
  });

  test("Should prevent login with incorrect creds", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login("John Doe", "WrongPassword");

    await expect(page.locator("#login")).toContainText(
      "Login failed! Please ensure the username and password are valid.",
    );
  });
});
