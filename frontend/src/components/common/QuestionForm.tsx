import React, { useState } from 'react';
import { Question } from '../../models/types';

interface QuestionFormProps {
  question: Question;
  onAnswerSelected: (answer: number[] | number) => void;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({
  question,
  onAnswerSelected
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number[] | number>([]);

  return (
    <div>
      <h2>{question.text_en}</h2>
      {question.description_en && <p>{question.description_en}</p>}
      {/* Options rendering will be implemented in Phase 2 */}
    </div>
  );
}; // [source](search_result_8)