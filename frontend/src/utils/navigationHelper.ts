// src/utils/navigationHelpers.ts
export const getNextPhase = (currentPhase: string): string => {
    const phases = ['profile', 'bfi', 'product'];
    const currentIndex = phases.indexOf(currentPhase);
    return phases[currentIndex + 1] || currentPhase;
  };