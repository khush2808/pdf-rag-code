# AI Model Provider Setup Guide

This PDF RAG application now supports multiple AI providers using the OpenAI SDK with custom base URLs.

## Environment Setup

Copy `.env.example` to `.env` and configure your preferred provider:

```bash
cp .env.example .env
```

## Supported Providers

### 1. Gemini (Default - Recommended)

Set up Gemini using OpenAI SDK with custom base URL:

```env
AI_PROVIDER=gemini
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai/
GEMINI_CHAT_MODEL=gemini-2.0-flash-exp
GEMINI_EMBEDDING_MODEL=text-embedding-004
```

**How to get Gemini API Key:**
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key to your `.env` file

### 2. GitHub Models (Commented Example)

GitHub also acts as a model provider. Here's how to set it up:

```env
# Uncomment and configure these lines to use GitHub Models
# AI_PROVIDER=github
# GITHUB_TOKEN=your_github_token_here
# GITHUB_BASE_URL=https://models.github.ai/inference
# GITHUB_CHAT_MODEL=openai/gpt-4o-mini
# GITHUB_EMBEDDING_MODEL=text-embedding-3-small
```

**How to get GitHub Token:**
1. Go to GitHub Settings > Developer settings > Personal access tokens
2. Generate a new token with appropriate permissions
3. Copy the token to your `.env` file

**Example GitHub Models Usage:**
```javascript
import OpenAI from "openai";

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4o-mini";

const client = new OpenAI({ baseURL: endpoint, apiKey: token });

const response = await client.chat.completions.create({
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "What is the capital of France?" }
  ],
  model: model
});
```

### 3. OpenAI (Fallback)

Original OpenAI configuration:

```env
# AI_PROVIDER=openai
# OPENAI_API_KEY=your_openai_api_key_here
# OPENAI_BASE_URL=https://api.openai.com/v1
# OPENAI_CHAT_MODEL=gpt-4
# OPENAI_EMBEDDING_MODEL=text-embedding-3-small
```

## Required Environment Variables

### Core Configuration
- `AI_PROVIDER`: Choose 'gemini', 'github', or 'openai'
- `QDRANT_URL`: Vector database URL (default: http://localhost:6333)
- `REDIS_HOST`: Redis host for job queue (default: localhost)
- `REDIS_PORT`: Redis port (default: 6379)

### Provider-Specific Variables

#### For Gemini:
- `GEMINI_API_KEY`: Your Gemini API key
- `GEMINI_BASE_URL`: Gemini OpenAI-compatible endpoint
- `GEMINI_CHAT_MODEL`: Chat model name
- `GEMINI_EMBEDDING_MODEL`: Embedding model name

#### For GitHub Models:
- `GITHUB_TOKEN`: Your GitHub personal access token
- `GITHUB_BASE_URL`: GitHub models endpoint
- `GITHUB_CHAT_MODEL`: Chat model name  
- `GITHUB_EMBEDDING_MODEL`: Embedding model name

## Example Code Configurations

### Gemini with OpenAI SDK
```javascript
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: "GEMINI_API_KEY",
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

const response = await openai.chat.completions.create({
    model: "gemini-2.0-flash-exp",
    messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Explain to me how AI works" }
    ]
});
```

### GitHub Models with OpenAI SDK
```javascript
import OpenAI from "openai";

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4o-mini";

const client = new OpenAI({ baseURL: endpoint, apiKey: token });

const response = await client.chat.completions.create({
    messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "What is the capital of France?" }
    ],
    model: model
});
```

## Testing Your Setup

1. Start the services:
```bash
# Terminal 1: Start the API server
npm run dev

# Terminal 2: Start the worker
npm run dev:worker
```

2. Check the console output for provider confirmation:
```
🤖 Using AI Provider: gemini
💬 Chat Model: gemini-2.0-flash-exp
🔧 Base URL: https://generativelanguage.googleapis.com/v1beta/openai/
```

3. Test with a chat request:
```bash
curl "http://localhost:8000/chat?message=Hello"
```

The response will include the provider and model information:
```json
{
  "message": "Hello! How can I help you today?",
  "docs": [...],
  "provider": "gemini",
  "model": "gemini-2.0-flash-exp"
}
```

## Switching Providers

To switch between providers, simply change the `AI_PROVIDER` value in your `.env` file and restart the services:

```env
# Switch to GitHub Models
AI_PROVIDER=github

# Switch to Gemini
AI_PROVIDER=gemini

# Switch to OpenAI
AI_PROVIDER=openai
```

## Troubleshooting

### Common Issues:

1. **API Key not found**: Ensure your API key environment variable is set correctly
2. **Invalid model**: Check that the model name is correct for your provider
3. **Network errors**: Verify the base URL is correct for your provider
4. **Embedding model not supported**: Some providers may have different embedding model names

### Debug Mode:
Check the console output when starting the server to see which provider and models are being used.