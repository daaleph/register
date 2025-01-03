import { create } from 'zustand';

interface Question {
  text: string;
}

interface Store {
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
}

export const useStore = create<Store>((set) => ({
  questions: [],
  setQuestions: (questions) => set({ questions }),
}));