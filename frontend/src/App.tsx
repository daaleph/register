import React from 'react';
import { QuestionForm } from './components/QuestionForm';
import { useStore } from './store/store';

const App: React.FC = () => {
  const { questions } = useStore();

  return (
    <div>
      <h1>Questionnaire</h1>
      <QuestionForm />
      {questions.length > 0 && (
        <div>
          <h2>Fetched Questions</h2>
          <ul>
            {questions.map((question, index) => (
              <li key={index}>{question.text}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;