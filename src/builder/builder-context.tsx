import { createContext } from "react";
import { BuilderContextValue } from "./builder-types";

export const BuilderContext = createContext<BuilderContextValue | null>(null);
