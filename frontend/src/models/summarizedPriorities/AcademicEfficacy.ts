// frontend/src/models/questionAnswer/academicEfficacy.ts
import { Prioritizer } from '../../contexts/Entities';
import { BFI } from './BFI';

export class AcademicEfficacy extends Prioritizer {
    private static instance: AcademicEfficacy;
    protected readonly endPoint: string = '/api/questionAnswer/bfi';

    public static getInstance(): AcademicEfficacy {
        if (!AcademicEfficacy.instance) {
            AcademicEfficacy.instance = new AcademicEfficacy();
        }
        return AcademicEfficacy.instance;
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