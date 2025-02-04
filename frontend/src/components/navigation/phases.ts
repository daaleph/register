// frontend/src/components/navigation/phases.ts
export enum ProgressIncrements {
    PROFILE = 10,                   // 100/10 questions: 10
    BFI = 2.27272727272727272,      // 100/44 questions: 2.273
    PRODUCT = 4.545454545454546     // 100/22 questions: 4.545
}

export const isValidPhase = (phase: string): phase is keyof typeof ProgressIncrements => {
    return phase.toUpperCase() in ProgressIncrements;
};  