// frontend/src/store/store.ts
import { create } from 'zustand';

interface RegularOption {
  id: number;
  descripcion: string;
}

interface Questions {
  [id: string] : {
    nombre: string;
    descripcion: string;
    tipo: string;
    categoria: number;
    opciones: RegularOption[] | boolean
  }
}

interface Store {
  questions: Questions;
  setQuestions: (questions: Questions) => void;
}

export const useStore = create<Store>((set) => ({
  questions: {},
  setQuestions: (questions) => set({ questions }),
}));