// frontend/src/components/UserForm.tsx
import React, { useState } from 'react';

const UserForm: React.FC<{ onSubmit: (nombrePreferido: string, nombreCompleto: string, email: string, movil: string, telegram: string) => void }> = ({ onSubmit }) => {
    const [nombrePreferido, setNombrePreferido] = useState('');
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [email, setEmail] = useState('');
    const [movil, setMovil] = useState('');
    const [telegram, setTelegram] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/sb/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre_preferido: nombrePreferido,
                    nombre_completo: nombreCompleto,
                    email: email,
                    movil: movil,
                    telegram: telegram
                })
            });
            if (!response.ok) throw new Error('Error al enviar datos');
            const data = await response.json();
            console.log('Usuario creado:', data);
            onSubmit(nombrePreferido, nombreCompleto, email, movil, telegram);
            setNombrePreferido('');
            setNombreCompleto('');
            setEmail('');
            setMovil('');
            setTelegram('');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={nombrePreferido} onChange={(e) => setNombrePreferido(e.target.value)} placeholder="Nombre Preferido" required />
            <input type="text" value={nombreCompleto} onChange={(e) => setNombreCompleto(e.target.value)} placeholder="Nombre Completo" required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="movil" value={movil} onChange={(e) => setMovil(e.target.value)} placeholder="Movil" required />
            <input type="telegram" value={telegram} onChange={(e) => setTelegram(e.target.value)} placeholder="Telegram" required />
            <button type="submit">Aquí Estoy</button>
        </form>
    );
};

export default UserForm;