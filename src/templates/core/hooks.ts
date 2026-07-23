import { useContext } from "react";
import { TemplateContext } from "./template-context";

export function useTemplate() {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error("useTemplate must be used within a TemplateProvider");
  }
  return context;
}

export function useTemplateConfig() {
  return useTemplate().config;
}

export function useTemplateTheme() {
  return useTemplate().theme;
}

export function useTemplateData<T = Record<string, unknown>>() {
  return useTemplate().data as T;
}
