// backend/structures.ts

export interface RegularOption {
    id: number;
    descripcion: string;
    otro?: boolean;
}
  
export interface Question {
    email: string;
    variable: number;
    options: RegularOption[] | boolean;
}