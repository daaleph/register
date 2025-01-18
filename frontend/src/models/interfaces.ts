// models/interfaces.ts
interface UserProfile {
    id: string;
    preferredName: string;
    completeName: string;
    email: string;
    movil: string;
    telegram: string;
}
  
interface Question {
    id: number;
    variable: string;
    text_en: string;
    text_es: string;
    description_en?: string;
    description_es?: string;
    type?: string;
    options?: QuestionOption[];
}
  
interface QuestionOption {
    opcionId: number;
    description_en: string;
    description_es: string;
}