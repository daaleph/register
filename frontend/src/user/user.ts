import { Question, Questions, RegularOption } from '../store/store';

class User {
    nombre_preferido: string;
    nombre_completo: string;
    email: string;
    current_question: number = 1;
    questions: Questions = {};

    constructor(nombre_preferido: string, nombre_completo: string, email: string) {
        this.nombre_completo = nombre_completo;
        this.nombre_preferido = nombre_preferido;
        this.email = email;
    }

    async answer(variables: string[], check?: number[], otro?: string, uncheck?: false) {
        const c_q = this.current_question;
        let question = await this.fetchesQuestion();
        question = this.selects(question, check, otro, uncheck);
        this.storesQuestion(variables[c_q], question);
        const options = question.opciones;
        const next_question = c_q === 1 && optionsAreRegular(options) ? c_q + options[0].id : c_q + 1;
        this.current_question = next_question;
    }

    async fetchesQuestion() {
        let question: Question;
        try {
            const questionResponse = await fetch(`http://localhost:3000/sb/question/${this.current_question}`);
            const optionsResponse = await fetch(`http://localhost:3000/sb/options/${this.current_question}`);
            if (!questionResponse.ok || !optionsResponse.ok) throw new Error('Network request failed');
            const fetchedQuestion = await questionResponse.json();
            const fetchedOptions = await optionsResponse.json();
            const questionData = Array.isArray(fetchedQuestion) ? fetchedQuestion[0] : fetchedQuestion;
            const optionsData = Array.isArray(fetchedOptions) ? fetchedOptions : [];
            question = {
                nombre: questionData?.nombre,
                descripcion: questionData?.descripcion,
                tipo: questionData?.tipo,
                categoria: questionData?.categoria,
                opciones: optionsData,
            };
        } catch (err) {
            throw new Error('An unknown error occurred');
        }
        return question;
    }

    selects(current_question: Question, check?: number[], otro?: string, uncheck?: false) {
        if (check && optionsAreRegular(current_question.opciones)) {
            current_question.opciones = current_question.opciones.filter(item => check.includes(item.id));
            if (otro) {
                current_question.opciones[0].descripcion = otro;
                current_question.opciones[0].otro = true;
            }
        } else if (uncheck !== undefined) {
            current_question.opciones = uncheck;
        }
        return current_question;
    }

    storesQuestion(questionName: string, question: Question): void {
        this.questions[questionName] = question;
    }
}

export default User;

function optionsAreRegular(option: any): option is RegularOption[] {
    return (
        typeof option === "object" &&
        option !== null &&
        typeof option[0].id === "number" &&
        typeof option[0].descripcion === "string"
    );
}