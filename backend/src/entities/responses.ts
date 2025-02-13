// src/entities/responses.ts
export class ResponsesEntity {
  profile: string;
  variable: string;
  answer_options: number[];
}

export class PreviousResponsesEntity {
  profile: string;
  variable: string;
  answer_options_en: string[];
  answer_options_es: string[];
}
