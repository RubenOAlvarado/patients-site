import { createContext } from "react";
import { QuestionnaireContextType } from "../types";

export const QuestionnaireContext = createContext<QuestionnaireContextType | undefined>(undefined);
