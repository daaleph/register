// backend/index.ts

require('dotenv').config({path: '.env'});
import cors from 'cors';
import express from 'express';
// import { fetchAIResponse } from './abacusService';
import { supabase } from './supabaseClient';

const app = express();

const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/sb/questions', async (_, res) => {
  try {
    let { data, error } = await supabase
    .from('catalogo_variables')
    .select('variable');
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error comunicando Supabase' });
  }
});

app.get('/sb/question/:pk', async (req, res) => {
  const { pk } = req.params;
  try {
    const previousAnswers = req.query.previousAnswers ? 
      JSON.parse(decodeURIComponent(req.query.previousAnswers as string)) : 
      null;
  } catch (parseError) {
    console.error('Error parsing previousAnswers:', parseError);
  }
  try {
    let { data, error } = await supabase
    .from('catalogo_variables')
    .select('*')
    .eq('variable', 'var' + pk);
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error comunicando Supabase' });
  }
});

app.get('/sb/options/:pk', async (req, res) => {
  const { pk } = req.params;

  try {
    const previousAnswers = req.query.previousAnswers ? 
      JSON.parse(decodeURIComponent(req.query.previousAnswers as string)) : 
      null;
  } catch (parseError) {
    console.error('Error parsing previousAnswers:', parseError);
  }

  try {
    let { data, error } = pk != '35' ? await supabase
      .from('tabla' + pk)
      .select('*'): { data: false };
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error comunicando Supabase' });
  }
});

app.get('/sb/perfil/:email', async (req, res) => {
  const { email } = req.params;
  try {
    let { data, error } = await supabase
      .from('perfil')
      .select('id')
      .eq('email', email);
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error comunicando Supabase' });
  }
});

app.post('/sb/user', async (req, res) => {
  try {
    const { nombre_preferido, nombre_completo, email, movil, telegram } = req.body;
    let { data, error } = await supabase
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
    if (error) throw error;
    res.status(201).json({ message: 'Usuario creado exitosamente', data });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear usuario' });
  }
});

app.post('/sb/vars', async (req, res) => {
  let question;
  try {
    question = req.body;
    const { data, error } = await supabase
      .from('perfil')
      .update({
        [`var${question.variable}`]: question.options,
      })
      .eq('email', question.email);
    if (error) throw error;
    res.status(200).json({ message: 'Variable actualizada exitosamente', data });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al actualizar variable' });
  }
});

app.post('/sb/other', async (req, res) => {
  try {
    const { perfil, variable, texto } = req.body;
    const { data, error } = await supabase
      .from('otros')
      .insert([{
        perfil,
        variable,
        texto
      }]);
    if (error) throw error;
    res.status(200).json({ message: 'Opción abierta arriba', data });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al actualizar variable' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});