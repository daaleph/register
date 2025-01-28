// frontend/src/utils/validation.ts
export const validateAnswer = (answer: number[] | number, isMultiSelect: boolean): string | null => {
    if (isMultiSelect && Array.isArray(answer) && answer.length === 0) {
      return 'Please select at least one option';
    }
    if (!isMultiSelect && !answer) {
      return 'Please select an option';
    }
    return null;
  };