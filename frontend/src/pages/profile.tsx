import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../context/UserContext';
import { AuthService } from '../services/AuthService';
import { ProfileService } from '../services/ProfileService';
import { Question } from '../models/interfaces';
import { QuestionForm } from '../components/common/QuestionForm';
import { ProgressBar } from '../components/common/ProgressBar';
import { ErrorDisplay } from '../components/common/ErrorDisplay';

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Get the id from the query
  const uuid = id as string;
  const { setAuthToken, setResponses, setProgress } = useUser();
  const authService = new AuthService();
  const profileService = new ProfileService();
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentProgress, setCurrentProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const loadInitialQuestion = async () => {
    if (!uuid) {
      console.error("ID is not available, waiting for it to be defined.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const question = await profileService.getInitialProfileQuestion(id as string);
      setCurrentQuestion(question);
      setProgress(0);
    } catch (error) {
      console.error('Error loading initial question:', error);
      setError(error instanceof Error ? error.message : 'Failed to load initial question');
    } finally {
      setIsLoading(false);
    }
  };

  loadInitialQuestion();

  const handleAnswerSelection = async (answer: number[] | number) => {
    try {
      if (!currentQuestion || !id) return;

      setIsLoading(true);
      setError(null);
      
      // Store the response in context
      setResponses(currentQuestion.variable, answer);
  
      // Submit the answer to backend
      await profileService.submitProfileAnswer(
        id as string,
        currentQuestion.variable,
        answer
      );
  
      // Get next question
      const nextQuestion = await profileService.getNextProfileQuestion(
        id as string,
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
      setError(error instanceof Error ? error.message : 'Failed to submit answer');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <ProgressBar currentProgress={currentProgress} phase='profile' />
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <ErrorDisplay message={error} />
      ) : currentQuestion ? (
        <QuestionForm
          question={currentQuestion}
          onAnswerSelected={handleAnswerSelection}
        />
      ) : (
        <div>No questions available</div>
      )}
    </div>
  );
};

export default ProfilePage;