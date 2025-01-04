// frontend/src/components/QuestionForm.tsx

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useStore } from '../store/store';
import { motion } from 'framer-motion';

interface FormData {
    pk: number;
}

export const QuestionForm: React.FC = () => {
    const { register, handleSubmit } = useForm<FormData>();
    const setQuestions = useStore((state) => state.setQuestions);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        setError(null);
        try {
            const questionResponse = await fetch(`http://localhost:3000/sb/question/${data.pk}`);
            const optionsResponse = await fetch(`http://localhost:3000/sb/options/${data.pk}`);
            if (!questionResponse.ok || !optionsResponse.ok) throw new Error('Network request failed');
            const fetchedQuestion = await questionResponse.json();
            const fetchedOptions = await optionsResponse.json();
            const questionData = Array.isArray(fetchedQuestion) ? fetchedQuestion[0] : fetchedQuestion;
            const optionsData = Array.isArray(fetchedOptions) ? fetchedOptions : [];
            const item = {
                nombre: questionData?.nombre,
                descripcion: questionData?.descripcion,
                tipo: questionData?.tipo,
                categoria: questionData?.categoria,
                opciones: optionsData,
            };
            setQuestions({ [questionData?.variable]: item });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <input type="number" {...register('pk')} placeholder="Enter question number" required />
            <button type="submit" disabled={loading}>
                {loading ? 'Loading...' : 'Fetch Questions'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </motion.form>
    );
};