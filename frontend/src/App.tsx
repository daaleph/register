import React from 'react';
import { QuestionForm } from './components/QuestionForm';
import { useStore } from './store/store';

const App: React.FC = () => {
  const { questions } = useStore();
  const latestKey = Object.keys(questions).pop();
  const latestQuestion = latestKey ? questions[latestKey] : null;
  const latestOptions = latestQuestion ? latestQuestion.opciones : null;

  return (
    <div>
      <h1>Questionnaire</h1>
      <QuestionForm />
      {Object.keys(questions).length > 0 && (
        <div>
          <h2>Fetched Questions</h2>
          <p>{ latestQuestion?.descripcion }</p>
          <ul>
            {Array.isArray(latestOptions) &&
              latestOptions.map((option, index) => (
                <li key={index}>{option.descripcion}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;