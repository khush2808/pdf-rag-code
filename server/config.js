import dotenv from 'dotenv';
import { OpenAIEmbeddings } from '@langchain/openai';
import OpenAI from 'openai';

// Load environment variables
dotenv.config();

const AI_PROVIDER = process.env.AI_PROVIDER || 'gemini';

// Configuration for different AI providers
const providerConfigs = {
  gemini: {
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: process.env.GEMINI_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta/openai/',
    chatModel: process.env.GEMINI_CHAT_MODEL || 'gemini-2.0-flash-exp',
    embeddingModel: process.env.GEMINI_EMBEDDING_MODEL || 'text-embedding-004'
  },
  github: {
    apiKey: process.env.GITHUB_TOKEN,
    baseURL: process.env.GITHUB_BASE_URL || 'https://models.github.ai/inference',
    chatModel: process.env.GITHUB_CHAT_MODEL || 'openai/gpt-4o-mini',
    embeddingModel: process.env.GITHUB_EMBEDDING_MODEL || 'text-embedding-3-small'
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
    chatModel: process.env.OPENAI_CHAT_MODEL || 'gpt-4',
    embeddingModel: process.env.OPENAI_EMBEDDING_MODEL || 'text-embedding-3-small'
  }
};

// Get current provider configuration
const getCurrentConfig = () => {
  const config = providerConfigs[AI_PROVIDER];
  if (!config) {
    throw new Error(`Unsupported AI provider: ${AI_PROVIDER}`);
  }
  if (!config.apiKey) {
    throw new Error(`API key not found for provider: ${AI_PROVIDER}`);
  }
  return config;
};

// Initialize OpenAI client with current provider
export const initializeClient = () => {
  const config = getCurrentConfig();
  return new OpenAI({
    apiKey: config.apiKey,
    baseURL: config.baseURL
  });
};

// Initialize embeddings with current provider
export const initializeEmbeddings = () => {
  const config = getCurrentConfig();
  
  // For Gemini, we need to use OpenAI embeddings with custom configuration
  if (AI_PROVIDER === 'gemini') {
    return new OpenAIEmbeddings({
      model: config.embeddingModel,
      apiKey: config.apiKey,
      configuration: {
        baseURL: config.baseURL
      }
    });
  }
  
  // For GitHub and OpenAI, use standard configuration
  return new OpenAIEmbeddings({
    model: config.embeddingModel,
    apiKey: config.apiKey,
    configuration: {
      baseURL: config.baseURL
    }
  });
};

// Get chat model name
export const getChatModel = () => {
  const config = getCurrentConfig();
  return config.chatModel;
};

// Export configuration for reference
export const aiConfig = {
  provider: AI_PROVIDER,
  config: getCurrentConfig()
};

// Example configurations for different providers (for documentation)
export const exampleConfigurations = {
  gemini: {
    description: 'Google Gemini using OpenAI SDK with custom base URL',
    setup: `
// Gemini Configuration
AI_PROVIDER=gemini
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai/
GEMINI_CHAT_MODEL=gemini-2.0-flash-exp
GEMINI_EMBEDDING_MODEL=text-embedding-004
    `
  },
  github: {
    description: 'GitHub Models using OpenAI SDK with custom base URL',
    setup: `
// GitHub Models Configuration  
AI_PROVIDER=github
GITHUB_TOKEN=your_github_token_here
GITHUB_BASE_URL=https://models.github.ai/inference
GITHUB_CHAT_MODEL=openai/gpt-4o-mini
GITHUB_EMBEDDING_MODEL=text-embedding-3-small
    `
  },
  openai: {
    description: 'OpenAI (original configuration)',
    setup: `
// OpenAI Configuration
AI_PROVIDER=openai
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_CHAT_MODEL=gpt-4
OPENAI_EMBEDDING_MODEL=text-embedding-3-small
    `
  }
};