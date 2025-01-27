// frontend/src/pages/product.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Phases, useUser } from '../context/UserContext';
import { QuestionForm } from '../components/common/QuestionForm';
import { ProgressBar } from '../components/common/ProgressBar';
import { ErrorDisplay } from '../components/common/ErrorDisplay';
import { QuestionController, QuestionState } from '@/controllers';
import { ProductService } from '@/services';
import styles from '../styles/components.module.css';

const ProfilePage: React.FC = () => {
    const QUESTIONTYPE: Phases = 'PRODUCT';
    const router = useRouter();
    const { setResponses, setProgress, progress, userProfile, currentPhase } = useUser();
    const productService = new ProductService();
    
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
                await controllerState.controller.initializeQuestions(
                    userProfile.id,
                    productService.getInitialQuestionWithOptions.bind(productService)
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
        otherText ? controllerState.controller.handleAnswerSelection(answer, otherText) : controllerState.controller.handleAnswerSelection(answer);
        setControllerState(current => ({
        ...current,
        state: current.controller.getState()
        }));
    }, [controllerState.controller]);

    // Handle form submission
    const handleSubmit = useCallback(async () => {
        if (!userProfile?.id) return;

        try {

            await controllerState.controller.submitAnswer(
                userProfile.id,
                productService.submitAnswer.bind(productService),
                progress,
                currentPhase,
                productService.submitOtherAnswer.bind(productService)
            );
            setControllerState(current => ({
                ...current,
                state: controllerState.controller.getState()
            }));

            if (progress.get(currentPhase)! > 100 && QUESTIONTYPE !== currentPhase) return;

            await controllerState.controller.nextQuestionWithOptions(
                userProfile.id,
                controllerState.state,
                productService.getQuestionWithAnswers.bind(productService)
            );
            setControllerState(current => ({
                ...current,
                state: controllerState.controller.getState()
            }));
        
        } catch (error) {
            console.error('Failed to initialize questions:', error);
        }

    }, [userProfile?.id, controllerState.controller, productService]);

    // Loading state
    if (!controllerState.state || !router.isReady) {
        return <div className={styles.loading}>Loading your profile...</div>;
    }

    // Error state
    if (controllerState.state.error) {
        return <ErrorDisplay message={controllerState.state.error} />;
    }

    // Not initialized state
    if (!controllerState.state.currentQuestion || !controllerState.state.currentOptions) {
        return <div className={styles.loading}>Preparing questions...</div>;
    }

    const isSubmitDisabled = 
        controllerState.state.isLoading ||
        controllerState.state.selectedAnswer === null || 
        (controllerState.state.otherText !== undefined && 
        controllerState.state.otherText.trim() === '');

    return (
        <div className={styles.profileContainer}>
            <ProgressBar 
                currentProgress={progress.get(currentPhase)!}
                phase={currentPhase}
            />
            <QuestionForm
                question={controllerState.state.currentQuestion}
                options={controllerState.state.currentOptions}
                onAnswerSelected={handleAnswerSelected}
                currentPhase={currentPhase}
                isLoading={controllerState.state.isLoading}
            />
            <button 
                className={styles.submitButton}
                onClick={handleSubmit}
                disabled={isSubmitDisabled}
            >
                {controllerState.state.isLoading ? 'Entendiéndote...' : 'Contestar'}
            </button>
        </div>
    );
};

export default ProfilePage;