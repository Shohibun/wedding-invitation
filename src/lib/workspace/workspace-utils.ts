export const WorkspaceUtils = {
  generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  },

  isSlugValid(slug: string): boolean {
    return /^[a-z0-9-]+$/.test(slug) && slug.length >= 3 && slug.length <= 50;
  },
};
