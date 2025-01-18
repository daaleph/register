// src/entities/question.entity.ts

export class ProfileQuestionsEntity {
    id: number;
    variable: string;
    nameEs: string;
    nameEn: string;
    descriptionEs: string;
    descriptionEn: string;
    type: string;
} //[source](search_result_11)
  
export class BfiQuestionsEntity {
    id: number;
    variable: string;
    questionEs: string;
    questionEn: string;
    isReverseScored: boolean;
} //[source](search_result_11)
  
export class ProductQuestionsEntity {
    id: number;
    variable: string;
    nameEs: string;
    nameEn: string;
    descriptionEs: string;
    descriptionEn: string;
    type: string;
} //[source](search_result_15)