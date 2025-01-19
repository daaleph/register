// src/components/common/QuestionForm.tsx
import React, { useState, useEffect } from 'react';
import { Question, QuestionOption } from '../../models/interfaces';

interface QuestionFormProps {
  question: Question;
  onAnswerSelected: (answer: number[] | number) => void;
  isMultiSelect?: boolean;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({
  question,
  onAnswerSelected,
  isMultiSelect = false
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [otherText, setOtherText] = useState<string>('');

  const handleOptionSelect = (optionId: number) => {
    if (isMultiSelect) {
      const newAnswers = selectedAnswers.includes(optionId)
        ? selectedAnswers.filter(id => id !== optionId)
        : [...selectedAnswers, optionId];
      setSelectedAnswers(newAnswers);
      onAnswerSelected(newAnswers);
    } else {
      setSelectedAnswers([optionId]);
      onAnswerSelected(optionId);
    }
  };

  const handleOtherInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherText(e.target.value);
  };

  return (
    <div className="question-form">
      <h2>{question.text_en}</h2>
      {question.description_en && <p>{question.description_en}</p>}
      
      <div className="options-container">
        {question.options?.map((option: QuestionOption) => (
          <div key={option.opcionId} className="option">
            <label>
              <input
                type={isMultiSelect ? "checkbox" : "radio"}
                name="question-option"
                checked={selectedAnswers.includes(option.opcionId)}
                onChange={() => handleOptionSelect(option.opcionId)}
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
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};