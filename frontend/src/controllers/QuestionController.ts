// frontend/src/controllers/QuestionController.ts

import { Phases } from "@/context/UserContext";
import { Question, QuestionOption } from "@/models/interfaces";

export interface QuestionState {
    currentPhase: string;
    currentQuestion: Question | null;
    currentOptions: QuestionOption[] | null;
    isLoading: boolean;
    currentProgress: number;
    error: string | null;
    isInitialized: boolean;
    selectedAnswer: number[] | number | null;
    otherText?: string;
}
  
interface QuestionControllerConfig {
    initialState: QuestionState;
    onProgressUpdate: () => void;
    onAnswerSubmitted: (variable: string, answer: number[] | number) => void;
}
  
export class QuestionController {
    private state: QuestionState;
    private config: QuestionControllerConfig;
  
    constructor(config: QuestionControllerConfig) {
        this.state = config.initialState;
        this.config = config;
    }
  
    getState(): QuestionState {
        return this.state;
    }
  
    setState(newState: Partial<QuestionState>) {
        this.state = { ...this.state, ...newState };
    }
  
    async initializeQuestions(profileId: string, getInitialQuestion: Function) {
        try {
            this.setState({ isLoading: true, error: null });
            const { question, options } = await getInitialQuestion(profileId);
            this.setState({
                currentQuestion: question,
                currentOptions: options,
                isInitialized: true,
                isLoading: false
            });
        } catch (error) {
            this.setState({
                error: error instanceof Error ? error.message : 'Failed to load initial question',
                isLoading: false
            });
        }
    }

    async nextQuestionWithOptions(profileId: string, state: QuestionState, getNextQuestion: Function) {
        try {
            if (!state.currentQuestion) {
                throw new Error('Current question is null');
            }
            this.setState({ isLoading: true, error: null });
            const nextQuestionId = state.currentPhase === 'PROFILE' ? this.getNextQuestionId(
                state.currentQuestion.id,
                state.selectedAnswer || 0
            ) : state.currentQuestion.id + 1;
            const { question, options } = await getNextQuestion(
                profileId,
                nextQuestionId
            );
            if (!question || !options) {
                throw new Error('Failed to load next question or options');
            }

            this.setState({
                currentQuestion: question,
                currentOptions: options,
                isLoading: false,
                selectedAnswer: null,
                otherText: undefined
            });
        } catch (error) {
            this.setState({
                error: error instanceof Error ? error.message : 'Failed to load initial question',
                isLoading: false
            });
        }
    }
  
    handleAnswerSelection = (answer: number[] | number | null, otherText?: string) => {
        this.setState({
            selectedAnswer: answer,
            otherText
        });
    };
  
    async submitAnswer(
        profileId: string,
        submitAnswer: Function,
        progress: Map<Phases, number>,
        currentPhase: Phases,
        submitOtherAnswer?: Function
    ) {
        const { currentQuestion, selectedAnswer, otherText } = this.state;
        if (!currentQuestion || selectedAnswer === null) return;
    
        try {
            this.setState({ isLoading: true, error: null });
            const answers = Array.isArray(selectedAnswer) ? selectedAnswer : [selectedAnswer];
            if ( submitOtherAnswer && otherText && currentQuestion) {
                await submitOtherAnswer(profileId, currentQuestion.variable, otherText);
            }
            await submitAnswer(profileId, currentQuestion.variable, answers);
            this.config.onAnswerSubmitted(currentQuestion.variable, selectedAnswer);
            this.config.onProgressUpdate();
            this.setState({ currentProgress: progress.get(currentPhase)})
        } catch (error) {
            this.setState({
                error: error instanceof Error ? error.message : 'Failed to process answer',
                isLoading: false
            });
        }
    }

    canTransitionToNextPhase = (progress: Map<Phases, number>, currentPhase: Phases): boolean => {
        const advanceOfPhase = progress.get(currentPhase);
        return advanceOfPhase ? advanceOfPhase >= 100: false;
    };
  
    public getNextQuestionId(id: number | string, selectedAnswer: number | number[]): number {
        const numberId = Number(id);
        switch(numberId) {
            case 1: return Array.isArray(selectedAnswer) ? selectedAnswer[0] + 1 : selectedAnswer + 1;
            case 2:
            case 3:
            case 4:
            case 5:
            case 6: return 7;
            default: return numberId + 1;
        }
    }
}