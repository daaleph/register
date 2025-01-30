// src/components/common/QuestionForm.tsx
import styles from '../../styles/components.module.css';
import React, { useEffect, useState } from 'react';
import { Question, QuestionOption } from '../../models/interfaces';
import { QuestionFormController } from '@/controllers';

interface QuestionFormProps {
  hook: {key:string, hook:string, method: string, description:string};
  showDescription: boolean;
  setShowDescription: (showDescription: boolean) => void;
  question: Question;
  options: QuestionOption[];
  onAnswerSelected: (answer: number[] | number, otherText?: string) => void;
  currentPhase: string;
  progressPercentage: number | undefined;
  setAnswerSelected: (selected: boolean) => void;
  isLoading?: boolean;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({
  hook,
  showDescription,
  setShowDescription,
  question,
  options,
  onAnswerSelected,
  currentPhase,
  progressPercentage,
  setAnswerSelected,
  isLoading = false
}) => {
  
  const controller = React.useMemo(() => new QuestionFormController(
    onAnswerSelected,
    question.type === 'multiple'
  ), [onAnswerSelected, question.type]);

  const [formState, setFormState] = useState(() => controller.getState());
  
  useEffect(() => {
    formState.selectedAnswers.length === 0 ? setAnswerSelected(false) : setAnswerSelected(true);
  }, [formState])

  // Reset form when question changes
  useEffect(() => {
    controller.reset();
    setFormState(controller.getState());
  }, [question.id]);

  if (isLoading) {
    return (
      <div className={styles.questionFormLoading}>
        <div className={styles.content}>
          <div className={styles.title}>
            La computación <span className={styles.highlight}>cuántica</span> esto <span className={styles.highlight}>acelerará</span>
          </div>
          
          <div className={styles.hookText}>
            {hook.hook}
          </div>
          
          {!showDescription ? (
            <button 
              className={styles.revealButton}
              onClick={() => setShowDescription(true)}
            >
              {hook.method}
            </button>
          ) : (
            <div className={styles.description}>
              {hook.description}
            </div>
          )}

        </div>
      </div>
    );
  }

  // Create gradient for both background and text
  const gradientStyle = `linear-gradient(to right, 
  var(--primary-color) ${progressPercentage}%, 
  var(--third-color) ${progressPercentage}%)`;
  
  // Create text gradient
  const textGradientStyle = `linear-gradient(to right, 
    var(--text-primary-color) ${progressPercentage}%, 
    var(--text-primary-color) ${progressPercentage}%)`;

  const handleOptionSelect = (optionId: number) => {
    if (isLoading) return;
    controller.handleOptionSelect(optionId, options);
    setFormState(controller.getState());
  };

  const handleOtherInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    controller.handleOtherInput(e.target.value, options);
    setFormState(controller.getState());
  };

  const isMultiple = question.type === 'multiple';

  return (
    <div className={styles.questionForm}>
      <p className={styles.title}>{question.description_es}</p>
      { isMultiple && (
        <p className={styles.multipleChoiceHint} style={{textAlign: 'center', color: 'var(--forth-color)', margin: '1rem'}}>
          Opción múltiple<br/>
          Escoje en orden descendente
        </p>
      )}
      <div className={styles.optionsContainer}>
        {options?.map((option) => {
          const isSelected = formState.selectedAnswers.includes(option.option_id);
          const selectionIndex = formState.selectedAnswers.length - formState.selectedAnswers.indexOf(option.option_id);

          // Calculate brightness based on Fibonacci weights only for multiple selection
          let brightness = 1;
          if (question.type === 'multiple' && isSelected) {
            const weights = calculateFibonacciWeights(options.length);
            const weight = weights[selectionIndex];
            brightness = 0.6 + weight / 2;
          }
          
          return (
            <div key={option.option_id} className={styles.option}>
              <button
                className={`${styles.optionButton} ${isSelected ? styles.selected : ''}`}
                onClick={() => handleOptionSelect(option.option_id)}
                disabled={isLoading}
                style={{
                  filter: isSelected ? `brightness(${brightness})` : 'none',
                  background: gradientStyle,
                }}
              >
                <span 
                  className={styles.optionText}
                  style={{
                    background: textGradientStyle,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {option.description_es}
                </span>
              </button>
              {currentPhase !== 'bfi' &&
                isSelected && 
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
          );
        })}
      </div>
      {formState.error && <div className={styles.errorMessage}>{formState.error}</div>}
    </div>
  );

};

const calculateFibonacciWeights = (length: number): number[] => {
  const weights: number[] = [1, 1];
  for (let i = 2; i < length; i++) {
    weights[i] = weights[i-1] + weights[i-2];
  }
  const maxWeight = Math.max(...weights);
  return weights.map(w => w / maxWeight);
};