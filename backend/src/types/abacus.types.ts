// src/types/abacus.types.ts
export interface PersonalizedQuestion {
    id: number;
    text: string;
    options: PersonalizedOption[];
    context?: any;
  }
  
  export interface PersonalizedOption {
    id: number;
    text: string;
    value: number;
  }

  export interface AbacusContext {
    [key: `var${number}`]: {
      type: 'multiple' | 'unique';
      name_es: string;
      name_en: string;
      description_en: string,
      description_es: string,
      answer_es: string[],
      answer_en: string[],
      date_answer: string
    };
  }