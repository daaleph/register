// frontend/src/App.tsx

import React, { useEffect, useState } from 'react';
import UserForm from './components/UserForm';
import QuestionForm from './components/QuestionForm';
import { useUserStore } from './store/userStore';
import User from './user/user'; // Import the User class

const App: React.FC = () => {
  const userStore = useUserStore();
  const user = userStore.user;
  const [variables, setVariables] = useState<string[]>([]);

  useEffect(() => {
    const fetchVariables = async () => {
      const response = await fetch(`http://localhost:3000/sb/questions`);
      const data = await response.json();
      setVariables(data);
    };
    fetchVariables();
  }, []);

  const handleUserSubmit = (nombre_preferido: string, nombre_completo: string, email: string) => {
    const newUser = new User(nombre_preferido, nombre_completo, email);
    userStore.setUser(newUser);
  };

  return (
    <div>
      <h1>Questionnaire</h1>
      {!user ? (
        <UserForm onSubmit={handleUserSubmit} />
      ) : (
        <QuestionForm variables={variables} />
      )}
    </div>
  );
};

export default App;