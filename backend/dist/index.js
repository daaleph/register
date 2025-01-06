"use strict";
// backend/index.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: '.env' });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
// import { fetchAIResponse } from './abacusService';
const supabaseClient_1 = require("./supabaseClient");
const app = (0, express_1.default)();
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174'], // Add your frontend URLs
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Enable credentials (cookies, authorization headers, etc)
    optionsSuccessStatus: 200 // Some legacy browsers (IE11) choke on 204
};
// Apply CORS middleware with options
app.use((0, cors_1.default)(corsOptions));
// Body parser middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/sb/questions', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { data, error } = yield supabaseClient_1.supabase
            .from('catalogo_variables')
            .select('variable');
        if (error)
            throw error;
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ error: 'Error comunicando Supabase' });
    }
}));
app.get('/sb/question/:pk', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pk } = req.params;
    try {
        let { data, error } = yield supabaseClient_1.supabase
            .from('catalogo_variables')
            .select('*')
            .eq('variable', 'var' + pk);
        if (error)
            throw error;
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ error: 'Error comunicando Supabase' });
    }
}));
app.get('/sb/options/:pk', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pk } = req.params;
    try {
        let { data, error } = pk != '35' ? yield supabaseClient_1.supabase
            .from('tabla' + pk)
            .select('*') : { data: false };
        if (error)
            throw error;
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ error: 'Error comunicando Supabase' });
    }
}));
app.post('/sb/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre_preferido, nombre_completo, email, movil, telegram } = req.body;
        let { data, error } = yield supabaseClient_1.supabase
            .from('perfil')
            .insert([
            {
                nombre_preferido,
                nombre_completo,
                email,
                movil,
                telegram
            }
        ]);
        if (error)
            throw error;
        res.status(201).json({ message: 'Usuario creado exitosamente', data });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al crear usuario' });
    }
}));
app.post('/sb/vars', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let question;
    try {
        question = req.body;
        // Update the specific column dynamically
        const { data, error } = yield supabaseClient_1.supabase
            .from('perfil')
            .update({
            [`var${question.variable}`]: question.options, // Update only the specific variable column
        })
            .eq('email', question.email); // Match the row by email
        if (error)
            throw error;
        res.status(200).json({ message: 'Variable actualizada exitosamente', data });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error al actualizar variable' });
    }
}));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
