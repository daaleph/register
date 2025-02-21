// frontend/src/models/questionAnswer/bfi.ts
import { Prioritizer } from '../../contexts/Entities';

export class BFI extends Prioritizer {
    private static instance: BFI;
    protected readonly endPoint: string = '/api/questionAnswer/bfi';

    public static getInstance(): BFI {
        if (!BFI.instance) {
            BFI.instance = new BFI();
        }
        return BFI.instance;
    }

    protected async initializeDependencies(): Promise<void> {
        // Entity1 has no dependencies
    }

    protected summarize(): any {
        return this.rawData;
    }

    protected prioritize(): any {
        return this.rawData;
    }

    protected get cacheKey(): string {
        return 'bfiPrioritizedSummary_cache';
    }
}