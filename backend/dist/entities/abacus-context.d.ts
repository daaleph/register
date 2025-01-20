interface Context {
    [key: `var${number}`]: {
        type: 'multiple' | 'unique';
        name_es: string;
        name_en: string;
        description_en: string;
        description_es: string;
        answer_es: string[];
        answer_en: string[];
        date_answer: string;
    };
}
export declare class AbacusContextEntity {
    type: 'profile' | 'bfi' | 'product' | 'unknown';
    context: Context;
    order: number;
}
export {};
