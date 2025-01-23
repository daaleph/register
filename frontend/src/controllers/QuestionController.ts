// frontend/src/controllers/QuestionController.ts

import { Question, QuestionOption } from "@/models/interfaces";

export interface QuestionState {
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
    onProgressUpdate: (progress: number) => void;
    onAnswerSubmitted: (variable: string, answer: number[] | number) => void;
    onCompletion: () => void;
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
  
    handleAnswerSelection = (answer: number[] | number, otherText?: string) => {
        this.setState({
            selectedAnswer: answer,
            otherText
        });
    };
  
    async submitAnswer(
        profileId: string,
        submitAnswer: Function,
        submitOtherAnswer: Function,
        getNextQuestion: Function,
        nature: number
    ) {
        const { currentQuestion, selectedAnswer, otherText } = this.state;
        if (!currentQuestion || selectedAnswer === null) return;
    
        try {
            this.setState({ isLoading: true, error: null });
            
            // Handle answer submission
            this.config.onAnswerSubmitted(currentQuestion.variable, selectedAnswer);
            
            // Submit answers
            const answers = Array.isArray(selectedAnswer) ? selectedAnswer : [selectedAnswer];
            
            if (otherText && currentQuestion) {
                await submitOtherAnswer(profileId, currentQuestion.variable, otherText, nature);
            }
            await submitAnswer(profileId, currentQuestion.variable, answers);
    
            // Get next question
            const { question, options } = await getNextQuestion(
                profileId,
                this.getNextQuestionId(currentQuestion.id, selectedAnswer)
            );
    
            if (question && options) {
            const newProgress = this.state.currentProgress + 10;
            this.setState({
                currentQuestion: question,
                currentOptions: options,
                selectedAnswer: null,
                otherText: undefined,
                currentProgress: newProgress
            });
                this.config.onProgressUpdate(newProgress);
            } else {
                this.config.onCompletion();
            }
        } catch (error) {
            this.setState({
                error: error instanceof Error ? error.message : 'Failed to process answer',
                isLoading: false
            });
        }
    }
  
    private getNextQuestionId(id: number | string, selectedAnswer: number | number[]): number {
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