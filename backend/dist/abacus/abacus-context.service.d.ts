export interface QuestionContext {
    question: string;
    answer: any;
    order: number;
}
export declare class AbacusContextService {
    buildContext(previousResponses: any[], questionType: string): {
        question: any;
        answer: any;
        order: number;
    }[];
}
