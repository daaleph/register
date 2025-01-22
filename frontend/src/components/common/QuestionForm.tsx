// src/components/common/QuestionForm.tsx
import React, { useState, useEffect } from 'react';
import { Question, QuestionOption } from '../../models/interfaces';

interface QuestionFormProps {
  question: Question;
  options: QuestionOption[];
  onAnswerSelected: (answer: number[] | number) => void;
  isMultiSelect?: boolean;
  isLoading?: boolean;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({
  question,
  options,
  onAnswerSelected,
  isMultiSelect = false,
  isLoading = false
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [otherText, setOtherText] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

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
      if (isMultiSelect) {
        const newAnswers = selectedAnswers.includes(optionId)
          ? selectedAnswers.filter(id => id !== optionId)
          : [...selectedAnswers, optionId];
        
        if (newAnswers.length === 0) {
          throw new Error('Please select at least one option');
        }
        
        setSelectedAnswers(newAnswers);
        onAnswerSelected(newAnswers);
      } else {
        setSelectedAnswers([optionId]);
        onAnswerSelected(optionId);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleOtherInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherText(e.target.value);
    const otherOptionId = options?.find(opt => 
      opt.description_en.toLowerCase().includes('other'))?.option_id;
    if (otherOptionId && e.target.value) {
      handleOptionSelect(otherOptionId);
    }
  };

  if (isLoading) {
    return <div className="question-form-loading">Loading...</div>;
  }

  return (
    <div className="question-form">
      <h2>{question.name_en}</h2>
      {question.description_en && <p>{question.description_en}</p>}
      
      <div className="options-container">
        {options?.map((option) => (
          <div key={option.option_id} className="option">
            <label>
              <input
                type={isMultiSelect ? "checkbox" : "radio"}
                name={`question-${question.id}`}
                checked={selectedAnswers.includes(option.option_id)}
                onChange={() => handleOptionSelect(option.option_id)}
                disabled={isLoading}
              />
                { option.description_es }
            </label>
          </div>
        ))}
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};