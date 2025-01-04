import React, { useState } from 'react';
import User from '../user/user'; // Import the User class

const UserForm: React.FC<{ onSubmit: (nombre_preferido: string, nombre_completo: string, email: string) => void }> = ({ onSubmit }) => {
    const [nombre_preferido, setNombrePreferido] = useState('');
    const [nombre_completo, setNombreCompleto] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newUser = new User(nombre_preferido, nombre_completo, email);
        onSubmit(newUser.nombre_preferido, newUser.nombre_completo, newUser.email);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={nombre_preferido} onChange={(e) => setNombrePreferido(e.target.value)} placeholder="Nombre Preferido" required />
            <input type="text" value={nombre_completo} onChange={(e) => setNombreCompleto(e.target.value)} placeholder="Nombre Completo" required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <button type="submit">Submit</button>
        </form>
    );
};

export default UserForm;