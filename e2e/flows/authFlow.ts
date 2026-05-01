import { DashboardScreen } from "../pageObjects/dashboardScreen";
import { LoginScreen } from "../pageObjects/loginScreen";

export class AuthFlow {
  private readonly loginScreen = new LoginScreen();
  private readonly dashboardScreen = new DashboardScreen();

  async signInSuccessfully(email: string, password: string): Promise<void> {
    await this.loginScreen.waitUntilLoaded();
    await this.loginScreen.signIn(email, password);
    await this.dashboardScreen.waitUntilLoaded();
  }
}
