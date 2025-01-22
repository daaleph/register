// src/entities/profile-responses.ts
export class ProfileResponsesEntity {
  profile: string; // UUID
  variable: string;
  answer_options: number[];
}

export class ProfilePreviousResponsesEntity {
  profile: string; // UUID
  variable: string;
  answer_options_en: string[];
  answer_options_es: string[];
}