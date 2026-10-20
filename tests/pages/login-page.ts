import { expect, type Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(this.page).toHaveTitle("CURA Healthcare Service");
    await expect(this.page.locator("//h1")).toHaveText("CURA Healthcare Service");

    await this.page.getByRole("link", { name: "Make Appointment" }).click();
    await this.expectLoginPromptVisible();
  }

  async login(username: string, password: string) {
    await this.page.getByLabel("Username").fill(username);
    await this.page.getByLabel("Password").fill(password);
    await this.page.getByRole("button", { name: "Login" }).click();
  }

  async submitLogin() {
    await this.page.getByRole("button", { name: "Login" }).click();
  }

  async expectLoginPromptVisible() {
    await expect(this.page.getByText("Please login to make")).toBeVisible();
  }

  async expectStillOnLoginPage() {
    await expect(this.page).toHaveURL(/profile\.php#login$/);
    await this.expectLoginPromptVisible();
  }
}
