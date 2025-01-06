// frontend/src/store/store.ts

export interface RegularOption {
  id: number;
  descripcion: string;
  otro?: boolean;
}

export interface Question {
  nombre: string;
  descripcion: string;
  tipo: 'unica' | 'multiple' | 'bool';
  categoria: number;
  opciones: RegularOption[] | boolean
}

export interface Questions {
  [id: string] : Question;
}