import { useContext } from "react";
import { QuestionnaireContext } from "./QuestionnareContextImpl";

export const useQuestionnaire = () => {
    const context = useContext(QuestionnaireContext);
    if (context === undefined) {
        throw new Error('useQuestionnaire must be used within a QuestionnaireProvider');
    }
    return context;
};