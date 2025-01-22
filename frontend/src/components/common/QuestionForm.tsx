// src/components/common/QuestionForm.tsx
import styles from '../../styles/components.module.css';
import React, { useState, useEffect } from 'react';
import { Question, QuestionOption } from '../../models/interfaces';

interface QuestionFormProps {
  question: Question;
  options: QuestionOption[];
  onAnswerSelected: (answer: number[] | number, otherText?: string) => void;
  isMultiSelect?: boolean;
  isLoading?: boolean;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({
  question,
  options,
  onAnswerSelected,
  isLoading = false
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [otherText, setOtherText] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const isMultiple = question.type === 'multiple';

  // Reset form when question changes
  useEffect(() => {
    setSelectedAnswers([]);
    setOtherText('');
    setError(null);
  }, [question.id]);

  const handleOptionSelect = (optionId: number) => {
    if (isLoading) return;
    
    try {
      setError(null);
      if (isMultiple) {
        const newAnswers = selectedAnswers.includes(optionId)
          ? selectedAnswers.filter(id => id !== optionId)
          : [...selectedAnswers, optionId];
        if (newAnswers.length === 0) throw new Error('Please select at least one option');
        setSelectedAnswers(newAnswers);
        
        // Check if "other" option is selected and pass otherText
        const hasOtherOption = newAnswers.some(id => isOtherSelected(id));
        onAnswerSelected(newAnswers, hasOtherOption ? otherText : undefined);
      } else {
        setSelectedAnswers([optionId]);
        onAnswerSelected(optionId, isOtherSelected(optionId) ? otherText : undefined);
      }

      // Clear other text if the "Otro" option is deselected
      const isOtherOption = isOtherSelected(optionId);
      if (isOtherOption && !selectedAnswers.includes(optionId)) {
        setOtherText('');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleOtherInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newOtherText = e.target.value;
    setOtherText(newOtherText);
    
    // Propagate the change immediately
    if (selectedAnswers.length > 0) {
      if (isMultiple) {
        onAnswerSelected(selectedAnswers, newOtherText);
      } else {
        onAnswerSelected(selectedAnswers[0], newOtherText);
      }
    }
  };

  const isOtherSelected = (optionId: number): boolean => {
    const option = options.find(opt => opt.option_id === optionId);
    return ['otra', 'otro'].some(text => option?.description_es.toLowerCase().includes(text));
  };

  if (isLoading) {
    return <div className={styles.questionFormLoading}>Loading...</div>;
  }

  return (
    <div className={styles.questionForm}>
      <h2>{question.name_es}</h2>
      <p>{question.description_es}</p>
      <div className={styles.optionsContainer}>
        {options?.map((option) => (
          <div key={option.option_id} className={styles.option}>
            <label>
              <input
                type={isMultiple ? "checkbox" : "radio"}
                name={`question-${question.id}`}
                checked={selectedAnswers.includes(option.option_id)}
                onChange={() => handleOptionSelect(option.option_id)}
                disabled={isLoading}
              />
              {option.description_es}
            </label>
            {selectedAnswers.includes(option.option_id) && 
             isOtherSelected(option.option_id) && (
              <input
                type="text"
                className={styles.otherInput}
                placeholder="Por favor especifica"
                value={otherText}
                onChange={handleOtherInput}
                disabled={isLoading}
                required
              />
            )}
          </div>
        ))}
      </div>
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};