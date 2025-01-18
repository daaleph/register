// src/entities/profile.entity.ts
export class ProfileEntity {
    id: string;
    preferredName: string;
    completeName: string;
    email: string;
    movil: string;
    telegram: string;
    [key: `var${number}`]: number[] | number;
} // [source](search_result_13)

