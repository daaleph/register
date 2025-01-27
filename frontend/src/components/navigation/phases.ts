// frontend/src/components/navigation/phases.ts
export enum ProgressIncrements {
    PROFILE = 50,  // 100/10 questions
    BFI = 50,      // 100/44 questions
    PRODUCT = 8.334   // 100/12 questions
}

export const isValidPhase = (phase: string): phase is keyof typeof ProgressIncrements => {
    return phase.toUpperCase() in ProgressIncrements;
};  