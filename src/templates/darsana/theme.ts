import { TemplateTheme } from "../core/types";
import { ThemeTokensSchema, compileThemeToCssVariables } from "../themes/tokens";

// 1. Import the pure JSON file natively
import darsanaThemeJson from "./theme.json";

// 2. Validate the JSON strictly against the Zod schema at startup
const tokens = ThemeTokensSchema.parse(darsanaThemeJson);

// 3. Compile tokens into CSS Variables and expose the Theme object
export const darsanaTheme: TemplateTheme = {
  name: "darsana",
  tokens,
  cssVariables: compileThemeToCssVariables(tokens, "light"), // Generate light mode CSS variables statically, dark mode handles can be generated dynamically if needed
};
