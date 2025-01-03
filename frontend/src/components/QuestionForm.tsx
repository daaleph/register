import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useStore } from '../store/store';
import { motion } from 'framer-motion';

interface FormData {
    pk: number;
}

export const QuestionForm: React.FC = () => {
    const { register, handleSubmit } = useForm<FormData>();
    const setQuestions = useStore((state: { setQuestions: any; }) => state.setQuestions);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        setError(null);
        try {
        const response = await fetch(`http://localhost:3000/api/sb/${data.pk}`);
        console.log("RESPONSE:", response);
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        setQuestions(result);
        } catch (err) {
        setError(err as string);
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