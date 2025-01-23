// frontend/src/pages/bfi.tsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../context/UserContext';
import { Question, QuestionOption } from '../models/interfaces';
import { QuestionForm } from '../components/common/QuestionForm';
import { ProgressBar } from '../components/common/ProgressBar';
import { ErrorDisplay } from '../components/common/ErrorDisplay';
import { QuestionController } from '../controllers/QuestionController';
import styles from '../styles/components.module.css';
import { BfiService } from '@/services';

const BfiPage: React.FC = () => {
  const router = useRouter();
  const { userProfile, setResponses, setProgress } = useUser();
  const bfiService = new BfiService();

  // Initialize QuestionController with configuration
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
      router.push('/product');
    }
  });

  // Initialize question flow
  useEffect(() => {
    if (!router.isReady || !userProfile?.id) return;

    questionController.initializeQuestions(
      userProfile.id,
      bfiService.getInitialQuestionWithOptions.bind(bfiService)
    );
  }, [router.isReady, userProfile?.id]);

  // Handle answer submission
  const handleSubmit = async () => {
    if (!userProfile?.id) return;

    await questionController.submitAnswer(
      userProfile.id,
      bfiService.submitAnswer.bind(bfiService),
      bfiService.submitOtherAnswer.bind(bfiService),
      bfiService.getQuestionWithAnswers.bind(bfiService),
      2 // nature for BFI questions
    );
  };

  const state = questionController.getState();

  // Show loading state
  if (!router.isReady || state.isLoading) {
    return <div className={styles.loading}>Loading BFI questions...</div>;
  }

  // Show error if there is one
  if (state.error) {
    return <ErrorDisplay message={state.error} />;
  }

  // Only render main content when we have both question and options
  if (!state.currentQuestion || !state.currentOptions) {
    return <div className={styles.loading}>Preparing questions...</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <ProgressBar 
        currentProgress={state.currentProgress} 
        phase='bfi' 
      />
      <QuestionForm
        question={state.currentQuestion}
        options={state.currentOptions}
        onAnswerSelected={questionController.handleAnswerSelection}
        isLoading={state.isLoading}
      />
      <button 
        className={styles.submitButton}
        onClick={handleSubmit}
        disabled={
          state.isLoading || 
          state.selectedAnswer === null || 
          (state.otherText !== undefined && state.otherText.trim() === '')
        }
      >
        Submit
      </button>
    </div>
  );
};

export default BfiPage;