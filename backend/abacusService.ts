// abacusService.ts

import axios from 'axios';

const abacusApi = axios.create({
  baseURL: process.env.ABACUS_API_URL,
  headers: {
    'Authorization': `Bearer ${process.env.ABACUS_API_KEY}`,
  },
});

export const fetchAIResponse = async (data: any) => {
  const response = await abacusApi.post('/generate', data);
  return response.data;
};