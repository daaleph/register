// src/utils/navigationHelpers.ts
export const getNextPhase = (currentPhase: string): string => {
    const phases = ['PROFILE', 'BFI', 'PRODUCT'];
    const currentIndex = phases.indexOf(currentPhase);
    return phases[currentIndex + 1] || currentPhase;
  };