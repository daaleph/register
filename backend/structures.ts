// backend/structures.ts

export interface RegularOption {
    id: number;
    descripcion: string;
    otro?: string;
}
  
export interface Question {
    nombre: string;
    descripcion: string;
    tipo: 'unica' | 'multiple' | 'bool';
    categoria: number;
    opciones: RegularOption[] | boolean;
}
  
export default interface Questions {
    [id: string] : Question;
}