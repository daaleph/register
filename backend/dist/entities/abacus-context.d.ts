import { AbacusContext } from "src/types/abacus.types";
export declare class AbacusContextEntity {
    type: 'profile' | 'bfi' | 'product' | 'unknown';
    context: AbacusContext;
    order: number;
}
