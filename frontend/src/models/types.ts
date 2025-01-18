// src/models/types.ts

export interface UserProfile {
    id: string;
    preferredName: string;
    completeName: string;
    email: string;
    movil: string;
    telegram: string;
    var01?: number[];
} // [source](search_result_8)
  
export interface Question {
    id: number;
    variable: string;
    text_en: string;
    text_es: string;
    description_en?: string;
    description_es?: string;
    type?: string;
    options?: QuestionOption[];
} // [source](search_result_8)
  
export interface QuestionOption {
    opcionId: number;
    description_en: string;
    description_es: string;
} // [source](search_result_8)