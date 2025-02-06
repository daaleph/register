// frontend/src/components/navigation/phases.ts
export enum ProgressIncrements {
    PROFILE = 10, 
    BFI = 100/44, 
    PRODUCT = 100/22
}

export const isValidPhase = (phase: string): phase is keyof typeof ProgressIncrements => {
    return phase.toUpperCase() in ProgressIncrements;
};  