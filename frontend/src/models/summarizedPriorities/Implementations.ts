// frontend/src/models/questionAnswer/academicEfficacy.ts
import { Prioritizer } from '../../contexts/Entities';
import { AcademicEfficacy } from './AcademicEfficacy'; 
import { MajorIdentity } from './MajorIdentity';

export class Implementor extends Prioritizer {
    private static instance: Implementor;
    protected readonly endPoint: string = '/api/questionAnswer/bfi';

    public static getInstance(): Implementor {
        if (!Implementor.instance) {
            Implementor.instance = new Implementor();
        }
        return Implementor.instance;
    }

    protected async initializeDependencies(): Promise<void> {
        await Promise.all([AcademicEfficacy.getInstance().initialize(), MajorIdentity.getInstance().initialize()]);
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