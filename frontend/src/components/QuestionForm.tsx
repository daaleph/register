import React, { useEffect, useState } from 'react';
import { useUserStore } from '../store/userStore';
import { RegularOption } from '../store/store';

interface QuestionFormProps {
    variables: string[];
}

const QuestionForm: React.FC<QuestionFormProps> = ({ variables }) => {
    const userStore = useUserStore();
    const user = userStore.user;
    const [question, setQuestion] = useState<any>(null);
    const [selectedOptions, setSelectedOptions] = useState<RegularOption[] | boolean>([]);

    useEffect(() => {
        const fetchQuestion = async () => {
            if (user) {
                const fetchedQuestion = await user.fetchesQuestion();
                setQuestion(fetchedQuestion);
            }
        };
        fetchQuestion();
    }, [user?.current_question]);

    const handleOptionSelect = (id: number) => {
        setSelectedOptions((prev) => {
            if (prev.includes(id)) {
                return prev.filter(optionId => optionId !== id);
            }
            return [...prev, id];
        });
    };

    const handleNextQuestion = async () => {
        if (selectedOptions.length === 0) {
            alert('Please select an option before proceeding.');
            return;
        }
        await user!.answer(variables, selectedOptions);
        userStore.updateCurrentQuestion(user!.current_question);
        userStore.storeQuestion(question.nombre, {
            nombre: question.nombre,
            descripcion: question.descripcion,
            tipo: question.tipo,
            categoria: question.categoria,
            opciones: selectedOptions
        });
        setSelectedOptions([]);
    };

    if (!question) return <div>Loading...</div>;

    return (
        <div>
            <h2>{question.nombre}</h2>
            <p>{question.descripcion}</p>
            {question.opciones.map((option: any) => (
                <button
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    style={{
                        backgroundColor: selectedOptions.includes(option.id) ? 'lightblue' : 'white',
                        border: '1px solid black',
                        margin: '5px',
                        padding: '10px',
                        cursor: 'pointer',
                    }}
                >
                    {option.descripcion}
                </button>
            ))}
            <button onClick={handleNextQuestion}>Next Question</button>
        </div>
    );
};

export default QuestionForm;