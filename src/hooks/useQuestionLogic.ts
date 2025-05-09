/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useQuestionnaire } from "../context/useQuestionnaire";

export interface UseQuestionLogicProps {
    questionId: string;
    responses: Record<string, any>;
    onNext?: () => void;
    onPrevious?: () => void;
}

export const useQuestionLogic = ({
    questionId,
    responses,
    onNext,
    onPrevious,
}: UseQuestionLogicProps) => {
    const [value, setValue] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const { saveResponse } = useQuestionnaire();

    useEffect(() => {
        const existingResponse = responses[questionId];
        if (existingResponse) {
            setValue(existingResponse.response || "");
            setSubmitted(true);
        }
    }, [questionId, responses]);

    useEffect(() => {
        if (value) {
            const progress = JSON.parse(localStorage.getItem("questionnaire-progress") || "{}");
            progress[questionId] = value;
            localStorage.setItem("questionnaire-progress", JSON.stringify(progress));
        }
    }, [value, questionId]);

    const validate = (rules: any): boolean => {
        setError(null);

        if (rules?.required && !value.trim()) {
            setError("This question is required");
            return false;
        }

        return true;
    };

    const submit = () => {
        if (!validate({})) return;

        try {
            saveResponse(questionId, value);

            setSubmitted(true);
            if (onNext) setTimeout(onNext, 300);
        } catch (err) {
            console.error(err);
            setError("Failed to save response. Please try again.");
        }
    };

    const back = () => {
        if (onPrevious) onPrevious();
    };

    return {
        value,
        setValue,
        error,
        submitted,
        validate,
        submit,
        back,
    };
};