// File: src/services/aiService.js (NEW)
import { api } from './api';

export const aiService = {
  generateInsights: async (question) => {
    const response = await api.post('/api/v1/ai/insights', { question });
    return response.data;
  },

  generateEmail: async (type, context) => {
    const response = await api.post('/api/v1/ai/email', { type, context });
    return response.data;
  },

  generateMarketingPost: async (productInfo, promotion) => {
    const response = await api.post('/api/v1/ai/marketing', { 
      productInfo, 
      promotion 
    });
    return response.data;
  },

  processAIRequest: async (type, prompt) => {
    const response = await api.post('/api/v1/ai/request', {
      type,
      prompt,
      context: {}
    });
    return response.data;
  },
};