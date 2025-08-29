// =====================================================
// AI PROVIDER CONFIGURATION EXAMPLES
// =====================================================
// This file demonstrates how to configure different AI providers
// Copy the relevant section to your .env file

// =====================================================
// 1. GEMINI CONFIGURATION (RECOMMENDED - DEFAULT)
// =====================================================
/*
Set these in your .env file to use Gemini with OpenAI SDK:

AI_PROVIDER=gemini
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai/
GEMINI_CHAT_MODEL=gemini-2.0-flash-exp
GEMINI_EMBEDDING_MODEL=text-embedding-004

Example code usage:
*/
import OpenAI from "openai";

// Gemini example (this is handled automatically by our config)
const geminiClient = new OpenAI({
    apiKey: "GEMINI_API_KEY",
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

const geminiResponse = await geminiClient.chat.completions.create({
    model: "gemini-2.0-flash-exp",
    messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Explain to me how AI works" }
    ]
});

// =====================================================
// 2. GITHUB MODELS CONFIGURATION (COMMENTED OUT)
// =====================================================
/*
Uncomment and set these in your .env file to use GitHub Models:

# AI_PROVIDER=github
# GITHUB_TOKEN=your_github_token_here
# GITHUB_BASE_URL=https://models.github.ai/inference
# GITHUB_CHAT_MODEL=openai/gpt-4o-mini
# GITHUB_EMBEDDING_MODEL=text-embedding-3-small

Example code usage:
*/
/*
import OpenAI from "openai";

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4o-mini";

export async function githubModelsExample() {
  const client = new OpenAI({ baseURL: endpoint, apiKey: token });

  const response = await client.chat.completions.create({
    messages: [
        { role:"system", content: "You are a helpful assistant." },
        { role:"user", content: "What is the capital of France?" }
      ],
      model: model
    });

  console.log(response.choices[0].message.content);
}

// Available GitHub Models:
// - openai/gpt-4o-mini
// - openai/gpt-4o
// - microsoft/phi-3-medium-4k-instruct
// - microsoft/phi-3-mini-4k-instruct
// - meta-llama/llama-3.1-8b-instruct
// - mistralai/mistral-7b-instruct
*/

// =====================================================
// 3. OPENAI CONFIGURATION (FALLBACK)
// =====================================================
/*
Uncomment and set these in your .env file to use OpenAI:

# AI_PROVIDER=openai
# OPENAI_API_KEY=your_openai_api_key_here
# OPENAI_BASE_URL=https://api.openai.com/v1
# OPENAI_CHAT_MODEL=gpt-4
# OPENAI_EMBEDDING_MODEL=text-embedding-3-small

This is the original configuration that was used before.
*/

// =====================================================
// HOW TO SWITCH PROVIDERS
// =====================================================
/*
1. Update your .env file with the desired provider configuration
2. Restart both the server and worker:
   - npm run dev (in one terminal)
   - npm run dev:worker (in another terminal)
3. Check the console output to confirm the provider is loaded:
   🤖 Using AI Provider: gemini
   💬 Chat Model: gemini-2.0-flash-exp
   🔧 Base URL: https://generativelanguage.googleapis.com/v1beta/openai/
*/

// =====================================================
// TESTING YOUR CONFIGURATION
// =====================================================
/*
Test with a simple curl request:

curl "http://localhost:8000/chat?message=Hello"

The response will include provider information:
{
  "message": "Hello! How can I help you today?",
  "docs": [...],
  "provider": "gemini",
  "model": "gemini-2.0-flash-exp"
}
*/

export default {
  geminiExample: geminiClient,
  // githubModelsExample, // Uncomment to test GitHub models
  supportedProviders: ['gemini', 'github', 'openai'],
  defaultProvider: 'gemini'
};