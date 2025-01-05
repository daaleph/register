// frontend/src/useUserStore.ts

import { create } from 'zustand';
import User from '../user/user';
import { Question } from './store';

interface UserStore {
    user: User | null;
    setUser: (user: User) => void;
    updateCurrentQuestion: (nextQuestion: number) => void;
    storeQuestion: (questionName: string, question: Question) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    updateCurrentQuestion: (nextQuestion) => set((state) => {
        if (state.user) {
            state.user.current_question = nextQuestion;
            return { user: state.user };
        }
        return state;
    }),
    storeQuestion: (questionName, question) => set((state) => {
        if (state.user) {
            const updatedQuestions = { ...state.user.questions, [questionName]: question };
            state.user.questions = updatedQuestions;
            return { user: state.user };
        }
        return state;
    }),
}));