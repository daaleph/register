// frontend/src/models/interfaces.ts

export interface UserProfile {
    id: string;
    preferred_name: string;
    complete_name: string;
    email: string;
    movil: string;
    telegram: string;
}
  
export interface Question {
    id: number;
    variable: string;
    description_es: string;
    description_en: string;
    name_es?: string;
    name_en?: string;
    type?: string;
}
  
export interface QuestionOption {
    variable: string;
    option_id: number;
    description_es: string;
    description_en: string;
}

export interface QuestionWithOptions {
    question: Question;
    options: QuestionOption[];
}