export class AbacusContextEntity {
    question: {
      variable: string;
      text_en: string;
      text_es: string;
      description_en: string;
      description_es: string;
      type: string;
    };
    answer: string[];
    date_answer: Date;
    order: number;
}