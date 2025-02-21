// frontend/src/models/questionAnswer/academicEfficacy.ts
import { Prioritizer } from '../../contexts/Entities';
import { BFI } from './BFI';

export class MajorIdentity extends Prioritizer {
    private static instance: MajorIdentity;
    protected readonly endPoint: string = '/api/questionAnswer/bfi';

    public static getInstance(): MajorIdentity {
        if (!MajorIdentity.instance) {
            MajorIdentity.instance = new MajorIdentity();
        }
        return MajorIdentity.instance;
    }

    protected async initializeDependencies(): Promise<void> {
        await BFI.getInstance().initialize();
    }

    protected summarize(): any {
        return this.rawData;
    }

    protected prioritize(): any {
        return this.rawData;
    }

    protected get cacheKey(): string {
        return 'academicEfficacyPrioritizedSummary_cache';
    }
}