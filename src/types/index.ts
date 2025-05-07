/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Client {
    id: string;
    name: string;
    externalId?: string;
    preferredEhr?: string;
    defaultLanguage: string;
    metadata?: Record<string, any>;
    isActive: boolean;
}

export interface BaseQuestion {
    id: string;
    internalCode: string;
    questionType: 'TEXT' | 'MULTIPLE_CHOICE' | 'BOOLEAN' | 'NUMBER' | 'DATE' | 'TIME' | 'DATETIME' | 'FILE' | 'SCALE';
    responseDataType: 'STRING' | 'INTEGER' | 'FLOAT' | 'BOOLEAN' | 'DATE' | 'TIME' | 'DATETIME' | 'JSON' | 'BLOB';
    validationRules: Record<string, any>;
    metadata: Record<string, any>;
}

export interface Question {
    id: string;
    baseQuestionId: string;
    questionSetId: string;
    languageCode: string;
    questionText: string;
    baseQuestion: BaseQuestion;
}

export interface Patient {
    id?: string;
    clientId: string;
    externalId?: string;
    basicInfo: {
        name: string;
        email?: string;
        phone?: string;
        age?: number;
        gender?: string;
    };
    preferredLanguage: string;
}

export interface PatientResponse {
    patientId: string;
    baseQuestionId: string;
    response: string;
    responseMeta?: Record<string, any>;
}

export interface QuestionnaireContextType {
    client: Client | null;
    patient: Patient | null;
    questions: Question[];
    currentQuestionIndex: number;
    responses: Record<string, PatientResponse>;
    setClient: (client: Client) => void;
    setPatient: (patient: Patient) => void;
    setQuestions: (questions: Question[]) => void;
    setCurrentQuestionIndex: (index: number) => void;
    saveResponse: (questionId: string, response: string, meta?: Record<string, any>) => void;
    submitResponses: () => Promise<void>;
    isSubmitting: boolean;
    isCompleted: boolean;
}

export interface Language {
    id: string;
    code: string;
    name: string;
}

export interface LanguagesListProps {
    onLanguageSelect: (languageCode: string) => void;
    selectedLanguageCode?: string;
    label?: string;
    className?: string;
}