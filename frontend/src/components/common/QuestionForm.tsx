// src/components/common/QuestionForm.tsx
import React, { useState, useEffect } from 'react';
import { Question, QuestionOption } from '../../models/interfaces';

interface QuestionFormProps {
  question: Question;
  onAnswerSelected: (answer: number[] | number) => void;
  isMultiSelect?: boolean;
  isLoading?: boolean; // Add loading state [source](search_result_24)
}

export const QuestionForm: React.FC<QuestionFormProps> = ({
  question,
  onAnswerSelected,
  isMultiSelect = false,
  isLoading = false
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [otherText, setOtherText] = useState<string>('');
  const [error, setError] = useState<string | null>(null); // Add error state [source](search_result_24)

  // Reset form when question changes
  useEffect(() => {
    setSelectedAnswers([]);
    setOtherText('');
    setError(null);
  }, [question.id]);

  const handleOptionSelect = (optionId: number) => {
    try {
      setError(null);
      if (isMultiSelect) {
        const newAnswers = selectedAnswers.includes(optionId)
          ? selectedAnswers.filter(id => id !== optionId)
          : [...selectedAnswers, optionId];
        
        // Validate selection [source](search_result_24)
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
    const otherOptionId = question.options?.find(opt => 
      opt.description_en.toLowerCase().includes('other'))?.opcionId;
    if (otherOptionId && e.target.value) {
      handleOptionSelect(otherOptionId);
    }
  };

  if (isLoading) {
    return <div className="question-form-loading">Loading...</div>;
  }

  return (
    <div className="question-form">
      <h2>{question.text_en}</h2>
      {question.description_en && <p>{question.description_en}</p>}
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="options-container">
        {question.options?.map((option: QuestionOption) => (
          <div key={option.opcionId} className="option">
            <label>
              <input
                type={isMultiSelect ? "checkbox" : "radio"}
                name={`question-${question.id}`}
                checked={selectedAnswers.includes(option.opcionId)}
                onChange={() => handleOptionSelect(option.opcionId)}
                disabled={isLoading}
              />
              {option.description_en}
            </label>
            
            {option.description_en.toLowerCase().includes('other') && (
              <input
                type="text"
                value={otherText}
                onChange={handleOtherInput}
                placeholder="Please specify"
                className="other-input"
                disabled={!selectedAnswers.includes(option.opcionId)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};