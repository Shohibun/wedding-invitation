import { redirect } from "next/navigation";
import { AuthRedirectReasonType } from "@/features/auth/constants";

export class RedirectHelpers {
  /**
   * Appends a query parameter reason and redirects to /login.
   */
  static toLogin(reason?: AuthRedirectReasonType): never {
    if (reason) {
      redirect(`/login?reason=${reason}`);
    }
    redirect("/login");
  }

  /**
   * Redirects a user with unauthorized permissions to /unauthorized.
   */
  static toUnauthorized(): never {
    redirect("/unauthorized");
  }

  /**
   * Redirects a suspended or completely blocked user to /forbidden.
   */
  static toForbidden(): never {
    redirect("/forbidden");
  }
}
