// frontend/src/pages/profile.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../context/UserContext';
import { QuestionForm } from '../components/common/QuestionForm';
import { ProgressBar } from '../components/common/ProgressBar';
import { ErrorDisplay } from '../components/common/ErrorDisplay';
import styles from '../styles/components.module.css';
import { QuestionController, QuestionState } from '@/controllers';
import { ProfileService } from '@/services';


const ProfilePage: React.FC = () => {
  const router = useRouter();
  const { userProfile, setResponses, setProgress } = useUser();
  const profileService = new ProfileService();
  const [statedQuestionControllerStated, setStatedQuestionControllerStated] = useState<QuestionState>();

  const questionController = new QuestionController({
    initialState: {
      currentQuestion: null,
      currentOptions: null,
      isLoading: true,
      currentProgress: 0,
      error: null,
      isInitialized: false,
      selectedAnswer: null,
      otherText: undefined
    },
    onProgressUpdate: (progress: number) => {
      setProgress(progress);
    },
    onAnswerSubmitted: (variable: string, answer: number[] | number) => {
      setResponses(variable, answer);
    },
    onCompletion: () => {
      router.push('/bfi');
    }
  });

  useEffect(() => {
    const initQuestions = async () => {
      if (!router.isReady || typeof userProfile?.id !== "string") return;
      await questionController.initializeQuestions(
        userProfile.id,
        profileService.getInitialQuestionWithOptions.bind(profileService)
      );
      const statedQuestionControllerStated = questionController.getState();
      if (!statedQuestionControllerStated.isLoading) setStatedQuestionControllerStated(questionController.getState());
    };

    initQuestions();
  }, [router.isReady, userProfile?.id]);

  const handleSubmit = async () => {
    if (!userProfile?.id) return;
    
    await questionController.submitAnswer(
      userProfile.id,
      profileService.submitAnswer.bind(profileService),
      profileService.submitOtherAnswer.bind(profileService),
      profileService.getQuestionWithAnswers.bind(profileService),
      1
    );

  };

  if (!router.isReady || !statedQuestionControllerStated) {
    return <div className={styles.loading}>Loading your profile...</div>;
  }

  if (statedQuestionControllerStated.error) {
    return <ErrorDisplay message={statedQuestionControllerStated.error} />;
  }

  if (!statedQuestionControllerStated.currentQuestion || !statedQuestionControllerStated.currentOptions) {
    return <div className={styles.loading}>Preparing questions...</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <ProgressBar 
        currentProgress={statedQuestionControllerStated.currentProgress} 
        phase='profile' 
      />
      <QuestionForm
        question={statedQuestionControllerStated.currentQuestion}
        options={statedQuestionControllerStated.currentOptions}
        onAnswerSelected={questionController.handleAnswerSelection}
        isLoading={statedQuestionControllerStated.isLoading}
      />
      <button 
        className={styles.submitButton}
        onClick={handleSubmit}
        disabled={
          statedQuestionControllerStated.isLoading ||
          statedQuestionControllerStated.selectedAnswer === null || 
          (statedQuestionControllerStated.otherText !== undefined && statedQuestionControllerStated.otherText.trim() === '')
        }
      >
        Submit
      </button>
    </div>
  );
};

export default ProfilePage;