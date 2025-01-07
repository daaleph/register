// frontend/src/user/user.ts

import { Question, Questions, RegularOption } from '../store/store';
import CONTEXT from '../contextualizer';

class User {
    nombre_preferido: string;
    nombre_completo: string;
    email: string;
    movil: string;
    telegram: string;
    current_question: number = 1;
    private _questions: Questions = {};

    constructor(nombre_preferido: string, nombre_completo: string, email: string, movil: string, telegram: string) {
        this.nombre_completo = nombre_completo;
        this.nombre_preferido = nombre_preferido;
        this.email = email;
        this.movil = movil;
        this.telegram = telegram;
    }
    
    get questions(): Questions {
        return this._questions;
    }

    set questions(newQuestions: Questions) {
        console.log('Questions updated:', {
            previousQuestions: this._questions,
            newQuestions: newQuestions,
            timestamp: new Date().toISOString()
        });
        this._questions = newQuestions;
    }

    async answer(variables: string[], option: RegularOption[] | boolean, otro?: string) {
        const currentQuestionId = this.current_question;
        let question = await this.fetchesQuestion();
        question = this.selects(question, option, otro);
        this.storesQuestion(variables[currentQuestionId], question);
        let nextQuestionId;
        if (currentQuestionId === 1 && optionsAreRegular(question.opciones)) {
            nextQuestionId = currentQuestionId + question.opciones[0].id;
        } else if (currentQuestionId < 7) {
            nextQuestionId = 7;
        } else {
            nextQuestionId = currentQuestionId + 1;
        }
        this.current_question = nextQuestionId;
    }

    async fetchesQuestion() {
        let question: Question;
        try {
            console.log('Fetching question - Current state:', {
                timestamp: new Date().toISOString(),
                questionId: this.current_question,
                previousAnswers: this._questions
            });

            const filteredQuestions = Object.entries(this._questions)
            .filter(([key, _]) => {
                const match = key.match(/^var(\d+)$/);
                return match ? CONTEXT.has(Number(match[1])) : false;
            })
            .reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {} as Questions);
            const params = new URLSearchParams({
                previousAnswers: JSON.stringify(filteredQuestions),
            });

            const questionResponse = await fetch(
                `http://localhost:3000/sb/question/${this.current_question}?${params.toString()}`, 
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            const optionsResponse = await fetch(
                `http://localhost:3000/sb/options/${this.current_question}?${params.toString()}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            if (!questionResponse.ok || !optionsResponse.ok) {
                console.error('Network request failed:', {
                    timestamp: new Date().toISOString(),
                    questionStatus: questionResponse.status,
                    optionsStatus: optionsResponse.status,
                    questionStatusText: questionResponse.statusText,
                    optionsStatusText: optionsResponse.statusText
                });
                throw new Error('Network request failed');
            }
    
            const fetchedQuestion = await questionResponse.json();
            const fetchedOptions = await optionsResponse.json();
            const questionData = Array.isArray(fetchedQuestion) ? fetchedQuestion[0] : fetchedQuestion;
            const optionsData = fetchedOptions;
            question = {
                nombre: questionData?.nombre,
                descripcion: questionData?.descripcion,
                tipo: questionData?.tipo,
                categoria: questionData?.categoria,
                opciones: optionsData,
            };
            console.log('Processed question:', {
                timestamp: new Date().toISOString(),
                questionId: this.current_question,
                processedQuestion: question
            });
    
        } catch (err) {
            console.error('Error in fetchesQuestion:', {
                timestamp: new Date().toISOString(),
                questionId: this.current_question,
                error: err instanceof Error ? err.message : 'Unknown error',
                stack: err instanceof Error ? err.stack : undefined
            });
            throw new Error('An unknown error occurred');
        }
        return question;
    }

    selects(current_question: Question, option: RegularOption[] | boolean, otro?: string) {
        if (optionsAreRegular(current_question.opciones) && optionsAreRegular(option)) {
            current_question.opciones = current_question.opciones.filter(item => 
                option.some(opt => opt.id === item.id)
            );
            if (otro) {
                current_question.opciones[0].descripcion = "Otr@";
                current_question.opciones[0].otro = otro;
            }
        } else {
            current_question.opciones = option;
        }
        return current_question;
    }

    storesQuestion(questionName: string, question: Question): void {
        const updatedQuestions = { ...this._questions, [questionName]: question };
        this.questions = updatedQuestions;
    }
    
}

export default User;

export function optionsAreRegular(option: RegularOption[] | boolean): option is RegularOption[] {
    return typeof option === 'boolean' ? false : (
        typeof option === "object" &&
        option !== null &&
        typeof option[0].id === "number" &&
        typeof option[0].descripcion === "string"
    )
}

export function optionIsRegular(option: RegularOption | boolean): option is RegularOption {
    return typeof option === 'boolean' ? false : (
        typeof option === "object" &&
        option !== null &&
        typeof option.id === "number" &&
        typeof option.descripcion === "string"
    )
}