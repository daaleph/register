"use strict";
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
// backend/index.ts
require('dotenv').config({ path: '.env' });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
// import { fetchAIResponse } from './abacusService';
const supabaseClient_1 = require("./supabaseClient");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
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
        let { data, error } = yield supabaseClient_1.supabase
            .from('tabla' + pk)
            .select('*');
        if (error)
            throw error;
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ error: 'Error comunicando Supabase' });
    }
}));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
