// frontend/src/pages/bfi.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Phases, useUser } from '../context/UserContext';
import { QuestionForm } from '../components/common/QuestionForm';
import { ErrorDisplay } from '../components/common/ErrorDisplay';
import { QuestionController, QuestionState } from '@/controllers';
import { BfiService } from '@/services';
import { hookManager } from '@/marketing/hooks';
import styles from '../styles/components.module.css';
import { LoadingState } from '@/components/common/LoadingState';
import Head from 'next/head';
import { QuestionWithOptions } from '@/models/interfaces';

const BfiPage: React.FC = () => {
  const QUESTIONTYPE: Phases = 'BFI';
  const router = useRouter();
  const [answerSelected, setAnswerSelected] = useState<boolean>(false);
  const [showDescription, setShowDescription] = useState<boolean>(false);
  const { setResponses, setProgress, progress, userProfile, currentPhase } = useUser();
  const bfiService = BfiService.getInstance();

  const [hook, setHook] = useState<{
    key: string;
    hook: string;
    method: string;
    description: string;
  }>(hookManager.getRandomHook());

  // Single state for the question controller and its state
  const [controllerState, setControllerState] = useState<{
    controller: QuestionController;
    state: QuestionState;
  }>(() => {
    const controller = new QuestionController({
      initialState: {
        currentPhase,
        currentQuestion: null,
        currentOptions: null,
        isLoading: true,
        currentProgress: 0,
        error: null,
        isInitialized: false,
        selectedAnswer: null,
        otherText: undefined
      },
      onProgressUpdate: () => {
        setProgress();
      },
      onAnswerSubmitted: (variable: string, answer: number[] | number) => {
        setResponses(variable, answer);
      }
    });

    return {
      controller,
      state: controller.getState()
    };
  });

  // Initialize questions when component mounts
  useEffect(() => {
    const initQuestions = async () => {
      if (!router.isReady || typeof userProfile?.id !== "string") return;
      try {
        await controllerState.controller.initializeQuestions<QuestionWithOptions>(
          userProfile.id,
          bfiService.getInitialQuestionWithOptions.bind(bfiService)
        );
        setControllerState(current => ({
          ...current,
          state: current.controller.getState()
        }));
      } catch (error) {
        console.error('Failed to initialize questions:', error);
      }
    };
    initQuestions();
  }, [router.isReady, userProfile?.id]);

  // Handle answer selection
  const handleAnswerSelected = useCallback((answer: number[] | number, otherText?: string) => {
    controllerState.controller.handleAnswerSelection(answer, otherText);
    setControllerState(current => ({
      ...current,
      state: current.controller.getState()
    }));
  }, [controllerState.controller]);

  // Handle form submission
  const handleSubmit = useCallback(async () => {
    if (!userProfile?.id) return;
    setHook(hookManager.getRandomHook());
    setShowDescription(false);
    try {
      await controllerState.controller.submitAnswer(
        userProfile.id,
        bfiService.submitAnswer.bind(bfiService),
        progress,
        currentPhase
      );
      setControllerState(current => ({
        ...current,
        state: controllerState.controller.getState()
      }));

      if (progress.get(currentPhase)! > 100 && QUESTIONTYPE !== currentPhase) return;

      await controllerState.controller.nextQuestionWithOptions<QuestionWithOptions>(
        userProfile.id,
        controllerState.state,
        bfiService.getQuestionWithOptions.bind(bfiService)
      );
      setControllerState(current => ({
        ...current,
        state: controllerState.controller.getState()
      }));
      
    } catch (error) {
      console.error('Failed to initialize questions:', error);
    }

  }, [userProfile?.id, controllerState.state]);

  // Loading state
  if (!controllerState.state || !router.isReady) {
    return <LoadingState message='Cargando Perfil...'/>;
  }

  // Error state
  if (controllerState.state.error) {
    return <ErrorDisplay message={controllerState.state.error} />;
  }

  // Not initialized state
  if (!controllerState.state.currentQuestion || !controllerState.state.currentOptions) {
    return <LoadingState message='Preparando...'/>;
  }

  const isSubmitDisabled = 
    !answerSelected ||
    controllerState.state.isLoading ||
    controllerState.state.selectedAnswer === null;

  return (
    <>
      <Head><title>Psicología</title></Head>
      <div className={styles.content}>
        <QuestionForm
          hook={hook}
          showDescription={showDescription}
          setShowDescription={setShowDescription}
          question={controllerState.state.currentQuestion}
          options={controllerState.state.currentOptions}
          onAnswerSelected={handleAnswerSelected}
          currentPhase={currentPhase}
          progressPercentage={progress.get(currentPhase)}
          setAnswerSelected={setAnswerSelected}
          isLoading={controllerState.state.isLoading}
        />
        {
          controllerState.controller.getState().isLoading ? 
          <div className={styles.loading} /> :
          <button 
            className={styles.submitButton}
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
          >
            Contestar
          </button>
        }
      </div>
    </>
  );
};

export default BfiPage;