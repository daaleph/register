// src/pages/profile.tsx

import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { AuthService } from '../services/AuthService';
import { ProfileService } from '../services/ProfileService';
import { Question } from '../models/interfaces';
import { QuestionForm } from '../components/common/QuestionForm';
import { ProgressBar } from '../components/common/ProgressBar';

const ProfilePage: React.FC = () => {
  const { setAuthToken, setResponses, setProgress } = useUser();
  const authService = new AuthService();
  const profileService = new ProfileService();
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentProgress, setCurrentProgress] = useState<number>(0);

  useEffect(() => {
    const loadInitialQuestion = async () => {
      try {
        setIsLoading(true);
        const question = await profileService.getInitialProfileQuestion();
        setCurrentQuestion(question);
        setProgress(0);
      } catch (error) {
        console.error('Error loading initial question:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialQuestion();
  }, []); // [source](search_result_14)[source](search_result_4)

  const handleAnswerSelection = async (answer: number[] | number) => {
    try {
      if (!currentQuestion) return;
  
      setIsLoading(true);
      
      // Store the response in context
      setResponses(currentQuestion.variable, answer);
  
      // Submit the answer to backend
      await profileService.submitProfileAnswer(
        'temp-profile-id',
        currentQuestion.variable,
        answer
      );
  
      // Get next question
      const nextQuestion = await profileService.getNextProfileQuestion(
        currentQuestion.id,
        answer
      );
      
      // Update both local and global progress
      const newProgress = currentProgress + 10;
      setCurrentProgress(newProgress);
      setProgress(newProgress);
      
      setCurrentQuestion(nextQuestion);
    } catch (error) {
      console.error('Error handling answer:', error);
    } finally {
      setIsLoading(false);
    }
  }; // [source](search_result_14)[source](search_result_3)

  return (
    <div>
      <ProgressBar currentProgress={0} />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        currentQuestion && (
          <QuestionForm
            question={currentQuestion}
            onAnswerSelected={handleAnswerSelection}
          />
        )
      )}
    </div>
  );
}; // [source](search_result_8)

export default ProfilePage;