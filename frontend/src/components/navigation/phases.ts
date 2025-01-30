// frontend/src/components/navigation/phases.ts
export enum ProgressIncrements {
    PROFILE = 25,  // 100/10 questions: 10
    BFI = 25,      // 100/44 questions: 2.273
    PRODUCT = 25   // 100/12 questions: 4.545
}

export const isValidPhase = (phase: string): phase is keyof typeof ProgressIncrements => {
    return phase.toUpperCase() in ProgressIncrements;
};  