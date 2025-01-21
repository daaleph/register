// models/interfaces.ts

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
    text_en: string;
    text_es: string;
    description_en?: string;
    description_es?: string;
    type?: string;
    options?: QuestionOption[];
}
  
export interface QuestionOption {
    opcionId: number;
    description_en: string;
    description_es: string;
}