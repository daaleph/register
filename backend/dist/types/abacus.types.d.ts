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
