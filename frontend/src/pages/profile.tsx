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

    const profileId = userProfile?.id || router.query.id as string;
    if (profileId) {
      loadInitialQuestion(profileId);
    }
  }, [router.isReady, userProfile?.id, router.query.id]);

  const handleAnswerSelection = async (answer: number[] | number) => {
    if (!currentQuestion) return;
    const profileId = userProfile?.id || router.query.id as string;
    if (!profileId) return;
    try {
      setIsLoading(true);
      setError(null);
      setResponses(currentQuestion.variable, answer);
      await profileService.submitProfileAnswer(
        profileId,
        currentQuestion.variable,
        answer
      );
      const { question, options } = await profileService.getProfileQuestionWithAnswers(
        profileId,
        currentQuestion.id + 1
      );
      if (question && options) {
        const newProgress = currentProgress + 10;
        setCurrentProgress(newProgress);
        setProgress(newProgress);
        setCurrentQuestion(question);
        setCurrentOptions(options);
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
    </div>
  );
};

export default ProfilePage;