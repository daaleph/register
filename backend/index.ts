// backend/index.ts
require('dotenv').config({path: '.env'});
import cors from 'cors';
import express from 'express';
// import { fetchAIResponse } from './abacusService';
import { supabase } from './supabaseClient';

const app = express();
app.use(express.json());
app.use(cors());

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
    let { data, error } = pk != '35' ? await supabase
      .from('tabla' + pk)
      .select('*'): { data: false };
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error comunicando Supabase' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});