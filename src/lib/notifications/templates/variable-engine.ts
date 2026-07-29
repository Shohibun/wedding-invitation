export const VariableEngine = {
  extractVariables(content: string): string[] {
    if (!content) return [];
    // Extracts variable names from {{var_name}}
    const regex = /\{\{([^{}]+)\}\}/g;
    const matches = Array.from(content.matchAll(regex));
    return matches.map((match) => match[1].trim());
  },

  resolve(content: string, variables: Record<string, string>, strict: boolean = false): string {
    return content.replace(/\{\{([^{}]+)\}\}/g, (match, key) => {
      const cleanKey = key.trim();
      if (variables[cleanKey] !== undefined) {
        return variables[cleanKey];
      }
      if (strict) {
        throw new Error(`Missing variable: ${cleanKey}`);
      }
      return match; // Leave unreplaced if not strict
    });
  },
};
