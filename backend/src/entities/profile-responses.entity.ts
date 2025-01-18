// src/entities/profile-responses.entity.ts
export class ProfileResponsesEntity {
    id: number;
    profile: string; // UUID
    variable: string;
    answerOptions: number[];
    dateAnswer: Date;
} // [source](search_result_18)