// frontend/src/components/QuestionForm.tsx

import React, { useEffect, useState } from 'react';
import { useUserStore } from '../store/userStore';
import { Question, RegularOption } from '../store/store';
import { optionIsRegular, optionsAreRegular } from '../user/user';

interface QuestionFormProps {
    variables: string[];
}

const getValue = (x: Question) => Array.isArray(x.opciones) ? (x.tipo === 'unica' ? x.opciones[0].id : x.opciones.map(item => item.id)) : x.opciones;

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
    const [texto, setText] = useState<string>('');
    const [perfil, setPerfil] = useState<string>('');
    const [totalOptions, setTotalOptions] = useState<number>();
    const [selectionOrder, setSelectionOrder] = useState<Map<number, number>>(new Map());

    useEffect(() => {
        const fetchQuestion = async () => {
            if (user) {
                const fetchedQuestion = await user.fetchesQuestion();
                setQuestion(fetchedQuestion);
            }
        };
        fetchQuestion();
        if (Array.isArray(question.opciones)) setTotalOptions(question.opciones.length);
        setCurrentQuestion(user?.current_question!);
    }, [user?.current_question]);

    const calculateWeight = (option: RegularOption, selectedCount: number) => {
        if (!Array.isArray(selectedOptions) || !selectedOptions.includes(option)) return 1;
        
        // Get the selection order (1-based index)
        const order = selectionOrder.get(option.id) || 0;
        
        // Scale the weight to be between 0.2 and 0.8 to maintain strong visibility
        return 0.2 + (0.6 * (order - 1) / (selectedCount - 1 || 1));
    };

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
            if (option.descripcion === "Otro") {
                setText('');
            }
            setSelectedOptions((prev) => {
                const prevArray = Array.isArray(prev) ? prev : [];
                if (prevArray.includes(tempOption)) {
                    // When unselecting an option
                    const newSelectedOptions = prevArray.filter(opt => opt !== tempOption);
                    
                    // Immediately update selection order
                    setSelectionOrder(current => {
                        const newOrder = new Map();
                        const removedOrder = current.get(tempOption.id);
                        
                        // Rebuild the order map for remaining options
                        newSelectedOptions.forEach((opt, index) => {
                            const currentOrder = current.get(opt.id);
                            if (currentOrder && currentOrder > removedOrder!) {
                                newOrder.set(opt.id, currentOrder - 1);
                            } else {
                                newOrder.set(opt.id, currentOrder || index + 1);
                            }
                        });
                        
                        return newOrder;
                    });
                    
                    return newSelectedOptions;
                }
                
                // When selecting a new option
                const newSelectedOptions = [...prevArray, tempOption];
                
                // Immediately update selection order
                setSelectionOrder(current => {
                    const newOrder = new Map(current);
                    newOrder.set(tempOption.id, newSelectedOptions.length);
                    return newOrder;
                });
                
                return newSelectedOptions;
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
        const hasOtherOption = Array.isArray(selectedOptions) && selectedOptions.some(opt => opt.descripcion === "Otro");
        if (hasOtherOption && !texto.trim()) {
            alert('Please specify the "Otro" option before proceeding.');
            return;
        }
        await user!.answer(variables, selectedOptions);
        userStore.updateCurrentQuestion(user!.current_question);
        userStore.storeQuestion(`var${currentQuestion}`, {
            nombre: question.nombre,
            descripcion: question.descripcion,
            tipo: question.tipo,
            categoria: question.categoria,
            opciones: selectedOptions
        });
        question.opciones = selectedOptions;
        if (texto) uploadOtherAnswer();
        if (question.tipo === 'multiple' && Array.isArray(selectedOptions) && selectedOptions.length > 0) uploadAnswers();
        if (question.tipo === 'unica' && !texto) uploadAnswers();
        setSelectedOptions([]);
        setText('');
        setSelectionOrder(new Map());
    };

    const uploadAnswers = async () => {
        try {
            const response = await fetch('http://localhost:3000/sb/vars', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: user?.email,
                    variable: currentQuestion,
                    options: getValue(question)
                })
            });
            if (!response.ok) throw new Error('Error al enviar datos');
            const data = await response.json();
            console.log('Pregunta arriba:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const uploadOtherAnswer = async () => {
        try {
            const variable = 'var' + currentQuestion;
            const luuidperfil = await fetchesLuuid(user?.email!);
            const response = await fetch('http://localhost:3000/sb/other', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    perfil: luuidperfil,
                    variable,
                    texto
                })
            });
            if (!response.ok) throw new Error('Error al enviar datos');
            const data = await response.json();
            console.log('Opción abierta arriba:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const fetchesLuuid = async (email: string): Promise<string> => {
        try {
            const uuid = await fetch(`http://localhost:3000/sb/perfil/${email}`);
            if (!uuid.ok) throw new Error('Network request failed');
            let uuidResponse = await uuid.json();
            uuidResponse = uuidResponse[0].id;
            setPerfil(uuidResponse);
            return uuidResponse;
        } catch (err) {
            throw new Error('An unknown error occurred');
        }
    }

    const buttonStyle = (option: RegularOption | boolean, isSelected: boolean) => {
        if (!optionIsRegular(option) || question.tipo !== 'multiple') {
            return {
                backgroundColor: isSelected ? 'lightblue' : 'blue',
                color: isSelected ? 'black' : 'white',
                border: '1px solid black',
                margin: '5px',
                padding: '10px',
                cursor: 'pointer',
                fontWeight: 'bold'
            };
        }
    
        // For multiple selection questions
        const selectedCount = Array.isArray(selectedOptions) ? selectedOptions.length : 0;
        const weight = calculateWeight(option, selectedCount);
        
        // Adjusted color ranges for stronger contrast
        const baseColor = [173, 216, 230];  // lighter blue RGB
        const targetColor = [0, 0, 139];    // darker blue RGB
        
        const interpolatedColor = baseColor.map((start, index) => {
            const end = targetColor[index];
            return Math.round(start + (end - start) * weight);
        });
    
        return {
            backgroundColor: isSelected 
                ? `rgb(${interpolatedColor.join(',')})` 
                : 'blue',
            border: '1px solid black',
            margin: '5px',
            padding: '10px',
            cursor: 'pointer',
            fontWeight: 'bold',
            color: isSelected ? 'black' : 'white',
            transition: 'background-color 0.3s ease'
        };
    };

    if (!question) return <div>Loading...</div>;

    return (
        <div>
            <h2>{question.tipo}</h2>
            <p>{question.descripcion}</p>
            {
                Array.isArray(question.opciones) ? (
                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                        {(currentQuestion === 8 ? filterOptionsForQuestion8(question.opciones) : question.opciones)
                            .map(option => (
                                <div key={option.id}>
                                    <button
                                        onClick={() => question.tipo === 'unica' 
                                            ? setSelectedOptions([option]) 
                                            : handleOptionSelect(option)}
                                        style={buttonStyle(option, Array.isArray(selectedOptions) && selectedOptions.includes(option))}
                                    >
                                        {option.descripcion}
                                    </button>
                                    {option.descripcion === "Otro" && 
                                     Array.isArray(selectedOptions) && 
                                     selectedOptions.includes(option) && (
                                        <input
                                            type="text"
                                            value={texto}
                                            onChange={(e) => setText(e.target.value)}
                                            placeholder="Especifique aquí..."
                                            style={{
                                                margin: '5px',
                                                padding: '5px',
                                                width: '200px'
                                            }}
                                        />
                                    )}
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    ['Sí', 'No'].map((label, index) => {
                        const value = index === 0;
                        return (
                            <button
                                key={label}
                                onClick={() => handleOptionSelect(value)}
                                style={buttonStyle(value, selectedOptions === value)}
                            >
                                {label}
                            </button>
                        );
                    })
                )
            }
            <button 
                onClick={handleNextQuestion}
                style={buttonStyle(false, false)}
                disabled={Array.isArray(selectedOptions) && 
                         selectedOptions.some(opt => opt.descripcion === "Otro") && 
                         !texto.trim()}
            >
                {user?.current_question! < 47 ? 'Siguiente' : '¡FUEGO!'}
            </button>
        </div>
    );
};

export default QuestionForm;