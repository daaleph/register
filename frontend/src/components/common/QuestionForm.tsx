// src/components/common/QuestionForm.tsx
import styles from '../../styles/components.module.css';
import React, { useEffect, useState } from 'react';
import { Question, QuestionOption } from '../../models/interfaces';
import { QuestionFormController } from '@/controllers';

interface QuestionFormProps {
  question: Question;
  options: QuestionOption[];
  onAnswerSelected: (answer: number[] | number, otherText?: string) => void;
  currentPhase: string;
  isLoading?: boolean;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({
  question,
  options,
  onAnswerSelected,
  currentPhase,
  isLoading = false
}) => {
  // Initialize controller with props
  
  const controller = React.useMemo(() => new QuestionFormController(
    onAnswerSelected,
    question.type === 'multiple'
  ), [onAnswerSelected, question.type]);

  const [formState, setFormState] = useState(() => controller.getState());

  // Reset form when question changes
  useEffect(() => {
    controller.reset();
    setFormState(controller.getState());
  }, [question.id]);

  if (isLoading) {
    return <div className={styles.questionFormLoading}>Loading...</div>;
  }

  const handleOptionSelect = (optionId: number) => {
    if (isLoading) return;
    controller.handleOptionSelect(optionId, options);
    setFormState(controller.getState());
  };

  const handleOtherInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    controller.handleOtherInput(e.target.value, options);
    setFormState(controller.getState());
  };

  return (
    <div className={styles.questionForm}>
      <h2>{question.name_es}</h2>
      <p>{question.description_es}</p>
      <div className={styles.optionsContainer}>
        {options?.map((option) => (
          <div key={option.option_id} className={styles.option}>
            <label>
              <input
                type={question.type === 'multiple' ? "checkbox" : "radio"}
                name={`question-${question.id}`}
                checked={formState.selectedAnswers.includes(option.option_id)}
                onChange={() => handleOptionSelect(option.option_id)}
                disabled={isLoading}
              />
              {option.description_es}
            </label>
            { currentPhase !== 'bfi' && formState.selectedAnswers.includes(option.option_id) && 
              controller.isOtherOption(option.option_id, options) && (
              <input
                type="text"
                className={styles.otherInput}
                placeholder="Por favor especifica"
                value={formState.otherText}
                onChange={handleOtherInput}
                disabled={isLoading}
                required
              />
            )}
          </div>
        ))}
      </div>
      {formState.error && <div className={styles.errorMessage}>{formState.error}</div>}
    </div>
  );
};