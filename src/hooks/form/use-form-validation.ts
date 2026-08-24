import { ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Resolver, FieldValues } from "react-hook-form";

/**
 * Standardizes Zod resolver for the Form Engine.
 * Allows extending validation behavior across the CMS in the future without changing component code.
 */

export function useFormValidation<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends ZodSchema<any, any, any>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TFieldValues extends FieldValues = any,
>(schema: T): Resolver<TFieldValues> {
  return zodResolver(schema) as unknown as Resolver<TFieldValues>;
}
