export type ExplainedItem = {
    item: string;
    description: string;
    isReversed?: boolean;
}

export type BFIAnswer = {
    [key: string]: number[];
}