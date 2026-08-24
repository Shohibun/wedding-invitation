export function slugify(text: string) {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/s+/g, "-")
    .replace(/[^w-]+/g, "")
    .replace(/--+/g, "-");
}
