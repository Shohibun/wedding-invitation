import { format, parseISO, type Locale } from "date-fns";
import { id } from "date-fns/locale/id";

export function formatDate(
  dateString: string,
  formatStr: string = "EEEE, dd MMMM yyyy",
  localeCode: string = "id"
) {
  try {
    const locales: Record<string, Locale> = { id };
    const locale = locales[localeCode] || id;

    return format(parseISO(dateString), formatStr, { locale });
  } catch (_error) {
    return dateString;
  }
}
