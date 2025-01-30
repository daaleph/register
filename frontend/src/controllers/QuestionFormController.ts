// frontend/src/components/common/QuestionFormController.ts
import { QuestionOption } from "@/models/interfaces";

export class QuestionFormController {
    private selectedAnswers: number[] = [];
    private otherText: string = '';
    private error: string | null = null;

    constructor(
        private onAnswerSelected: (answer: number[] | number, otherText?: string) => void,
        private isMultiple: boolean = false
    ) {}

    handleOptionSelect(optionId: number, options: QuestionOption[]): void {
        try {
            this.error = null;
            if (this.isMultiple) {
                this.handleMultipleSelect(optionId);
            } else {
                this.handleSingleSelect(optionId);
            }
            this.notifyAnswerSelected(options);
        } catch (err: any) {
            this.error = err.message;
        }
    }

    private handleMultipleSelect(optionId: number): void {
        this.selectedAnswers = this.selectedAnswers.includes(optionId)
            ? this.selectedAnswers.filter(id => id !== optionId)
            : [...this.selectedAnswers, optionId];
        
        if (this.selectedAnswers.length === 0) {
            throw new Error('Please select at least one option');
        }
    }

    private handleSingleSelect(optionId: number): void {
        this.selectedAnswers = [optionId];
    }

    private notifyAnswerSelected(options: QuestionOption[]): void {
        const hasOtherOption = this.selectedAnswers.some(id => 
            this.isOtherOption(id, options)
        );
        
        this.onAnswerSelected(
            this.isMultiple ? this.selectedAnswers : this.selectedAnswers[0],
            hasOtherOption ? this.otherText : undefined
        );
    }

    handleOtherInput(value: string, options: QuestionOption[]): void {
        this.otherText = value;
        if (this.selectedAnswers.length > 0) {
            this.notifyAnswerSelected(options);
        }
    }

    isOtherOption(optionId: number, options: QuestionOption[]): boolean {
        const option = options.find(opt => opt.option_id === optionId);
        return option?.description_es.length === 4 && option?.description_es.toLowerCase().startsWith('otr');
    }

    reset(): void {
        this.selectedAnswers = [];
        this.otherText = '';
        this.error = null;
    }

    getState() {
        return {
            selectedAnswers: this.selectedAnswers,
            otherText: this.otherText,
            error: this.error
        };
    }
}