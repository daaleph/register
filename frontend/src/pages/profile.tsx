// frontend/src/pages/profile.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../context/UserContext';
// import { AuthService } from '../services/AuthService';
import { ProfileService } from '../services/ProfileService';
import { Question, QuestionOption } from '../models/interfaces';
import { QuestionForm } from '../components/common/QuestionForm';
import { ProgressBar } from '../components/common/ProgressBar';
import { ErrorDisplay } from '../components/common/ErrorDisplay';
import { captureRejectionSymbol } from 'events';

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const { userProfile } = useUser();
  const profileService = new ProfileService();
  // const { setAuthToken, setResponses, setProgress } = useUser();
  const { setResponses, setProgress } = useUser();
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [currentOptions, setCurrentOptions] = useState<QuestionOption[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentProgress, setCurrentProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number[] | number | null>(null);

  useEffect(() => {
    // Wait for router to be ready
    if (!router.isReady) return;

    const loadInitialQuestion = async (profileId: string) => {
      try {
        setIsLoading(true);
        setError(null);
        const { question, options } = await profileService.getInitialProfileQuestionWithOptions(profileId);
        setCurrentQuestion(question);
        setCurrentOptions(options);
        setProgress(0);
        setIsInitialized(true);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load initial question');
      } finally {
        setIsLoading(false);
      }
    };
    const profileId = userProfile?.id;
    if (profileId) loadInitialQuestion(profileId);
  }, [router.isReady, userProfile?.id]);

  const handleAnswerSelection = (answer: number[] | number) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = async () => {
    if (!currentQuestion || selectedAnswer === null) return;
    
    const profileId = userProfile?.id;
    if (!profileId) return;

    try {
      setIsLoading(true);
      setError(null);
      setResponses(currentQuestion.variable, selectedAnswer);
      
      await profileService.submitProfileAnswer(
        profileId,
        currentQuestion.variable,
        selectedAnswer
      );

      const { question, options } = await profileService.getProfileQuestionWithAnswers(
        profileId,
        nextQuestion(currentQuestion.id, selectedAnswer)
      );

      if (question && options) {
        const newProgress = currentProgress + 10;
        setCurrentProgress(newProgress);
        setProgress(newProgress);
        setCurrentQuestion(question);
        setCurrentOptions(options);
        setSelectedAnswer(null);
      } else {
        router.push('/bfi');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to process answer');
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state while router is not ready or data is loading
  if (!router.isReady || isLoading) {
    return <div className="loading">Loading your profile...</div>;
  }

  // Show error if there is one
  if (error) {
    return <ErrorDisplay message={error} />;
  }

  // Only render main content when we have both question and options
  if (!currentQuestion || !currentOptions) {
    return <div className="loading">Preparing questions...</div>;
  }

  return (
    <div className="profile-container">
      <ProgressBar currentProgress={currentProgress} phase='profile' />
      <QuestionForm
        question={currentQuestion}
        options={currentOptions}
        onAnswerSelected={handleAnswerSelection}
        isMultiSelect={currentQuestion.type === 'multiple'}
        isLoading={isLoading}
      />
      <button 
        className="submit-button"
        onClick={handleSubmit}
        disabled={isLoading || selectedAnswer === null}
      >
        Submit
      </button>
    </div>
  );
};

export default ProfilePage;

const nextQuestion = (id: number, selectedAnswer: number | number[]): number => {
  switch(id) {
    case 1: return Array.isArray(selectedAnswer) ? selectedAnswer[0] + 1 : selectedAnswer + 1;
    case 2:
    case 3:
    case 4:
    case 5:
    case 6: return 7;
    default: return id + 1;
  }
}