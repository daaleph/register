// frontend/src/components/navigation/phases.ts
export enum ProgressIncrements {
    PROFILE = 51,      // 10 
    BFI = 52,      // 100/44
    PRODUCT = 53   // 100/22
}

export const isValidPhase = (phase: string): phase is keyof typeof ProgressIncrements => {
    return phase.toUpperCase() in ProgressIncrements;
};  