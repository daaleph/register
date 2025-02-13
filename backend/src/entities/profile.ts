// src/entities/profile.ts
export class ProfileEntity {
  id: string;
  preferredName: string;
  completeName: string;
  email: string;
  movil: string;
  telegram: string;
  [key: `var${number}`]: number[] | number;
}
