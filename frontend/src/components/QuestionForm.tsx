// frontend/src/components/QuestionForm.tsx

import React, { useEffect, useState } from 'react';
import { useUserStore } from '../store/userStore';
import { Question, RegularOption } from '../store/store';
import { optionIsRegular, optionsAreRegular } from '../user/user';

interface QuestionFormProps {
    variables: string[];
}

const getValue = (x: boolean | RegularOption[]) => typeof x === 'boolean' ? x : Array.isArray(x) ? (x.length === 1 ? x[0].id : x.map(item => item.id)) : null;

const QuestionForm: React.FC<QuestionFormProps> = ({ variables }) => {
    const [currentQuestion, setCurrentQuestion] = useState<number>(1)
    const userStore = useUserStore();
    const user = userStore.user;
    const [question, setQuestion] = useState<Question>({ 
        nombre: '',
        descripcion: '',
        tipo: 'unica',
        categoria: 0,
        opciones: false
    });
    const [selectedOptions, setSelectedOptions] = useState<RegularOption[] | boolean>([]);

    useEffect(() => {
        const fetchQuestion = async () => {
            if (user) {
                const fetchedQuestion = await user.fetchesQuestion();
                setQuestion(fetchedQuestion);
            }
        };
        fetchQuestion();
        setCurrentQuestion(user?.current_question!);
    }, [user?.current_question]);

    const filterOptionsForQuestion8 = (options: RegularOption[]) => {
        const var1Answer = user?.questions['var1']?.opciones;
        if (!Array.isArray(var1Answer)) return options;

        const var1OptionId = var1Answer[0]?.id;
        if (!var1OptionId) return options;

        const maxAllowedId = (() => {
            if (var1OptionId === 1) return 2;
            if (var1OptionId === 2 || var1OptionId === 3) return 3;
            if (var1OptionId === 4 || var1OptionId === 5) return 4;
            return options.length;
        })();

        return options.filter(option => option.id <= maxAllowedId);
    };

    const handleOptionSelect = (option: RegularOption | boolean) => {
        if (optionIsRegular(option)) {
            const tempOption = option;
            setSelectedOptions((prev) => {
                const prevArray = Array.isArray(prev) ? prev : [];
                if (prevArray.includes(tempOption)) return prevArray.filter(option => option !== tempOption);
                return [...prevArray, tempOption];
            });
            return;
        }
        setSelectedOptions(option);
    };

    const handleNextQuestion = async () => {
        if (optionsAreRegular(selectedOptions) && selectedOptions.length === 0) {
            alert('Please select an option before proceeding.');
            return;
        }
        await user!.answer(variables, selectedOptions);
        userStore.updateCurrentQuestion(user!.current_question);
        userStore.storeQuestion("var"+currentQuestion, {
            nombre: question.nombre,
            descripcion: question.descripcion,
            tipo: question.tipo,
            categoria: question.categoria,
            opciones: selectedOptions
        });
        try {
            const response = await fetch('http://localhost:3000/sb/vars', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: user?.email,
                    variable: currentQuestion,
                    options: getValue(selectedOptions)
                })
            });
            if (!response.ok) throw new Error('Error al enviar datos');
            const data = await response.json();
            console.log('Pregunta arriba:', data);
        } catch (error) {
            console.error('Error:', error);
        }
        setSelectedOptions([]);
    };

    const buttonStyle = (isSelected: boolean) => ({
        backgroundColor: isSelected ? 'lightblue' : 'blue',
        border: '1px solid black',
        margin: '5px',
        padding: '10px',
        cursor: 'pointer',
        fontWeight: 'bold'
    });

    if (!question) return <div>Loading...</div>;

    return (
        <div>
            <h2>{question.tipo}</h2>
            <p>{question.descripcion}</p>
            {
                Array.isArray(question.opciones) && Array.isArray(selectedOptions) && (
                    (currentQuestion === 8 ? 
                        filterOptionsForQuestion8(question.opciones) : 
                        question.opciones
                    ).map((option: RegularOption) => (
                        <button
                            key={option.id}
                            onClick={() => handleOptionSelect(option)}
                            style={buttonStyle(selectedOptions.includes(option))}
                        >
                            {option.descripcion}
                        </button>
                    ))
                )
            }
            {
                typeof question.opciones === 'boolean' && (
                    <div>
                        {[
                            { value: true, label: 'Sí' },
                            { value: false, label: 'No' }
                        ].map(({ value, label }) => (
                            <button
                                key={String(value)}
                                onClick={() => handleOptionSelect(value)}
                                style={buttonStyle(selectedOptions === value)}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                )
            }
            {
                user?.current_question! < 47 ?
                <button onClick={handleNextQuestion}>Siguiente</button> : 
                <button onClick={handleNextQuestion}>¡FUEGO!</button>
            }
        </div>
    );
};

export default QuestionForm;