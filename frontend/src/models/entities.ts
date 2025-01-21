// frontend/src/models/entities.ts
export class ProfileEntity {
    id: string;
    preferred_name: string;
    complete_name: string;
    email: string;
    movil: string;
    telegram: string | undefined;
    constructor(
        id: string,
        preferred_name: string,
        complete_name: string,
        email: string,
        movil: string,
        telegram?: string
    ) {
        this.id = id;
        this.preferred_name = preferred_name;
        this.complete_name = complete_name;
        this.email = email;
        this.movil = movil;
        this.telegram = telegram;
    }
}
  