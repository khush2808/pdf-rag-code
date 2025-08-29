import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { Queue } from 'bullmq';
import { QdrantVectorStore } from '@langchain/qdrant';
import { initializeClient, initializeEmbeddings, getChatModel, aiConfig } from './config.js';

// Initialize AI client based on configuration
const client = initializeClient();

console.log(`🤖 Using AI Provider: ${aiConfig.provider}`);
console.log(`💬 Chat Model: ${getChatModel()}`);
console.log(`🔧 Base URL: ${aiConfig.config.baseURL}`);
const queue = new Queue('file-upload-queue', {
  connection: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || '6379',
  },
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  return res.json({ status: 'All Good!' });
});

app.post('/upload/pdf', upload.single('pdf'), async (req, res) => {
  await queue.add(
    'file-ready',
    JSON.stringify({
      filename: req.file.originalname,
      destination: req.file.destination,
      path: req.file.path,
    })
  );
  return res.json({ message: 'uploaded' });
});

app.get('/chat', async (req, res) => {
  const userQuery = req.query.message;

  // Initialize embeddings with current AI provider
  const embeddings = initializeEmbeddings();
  
  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,
    {
      url: process.env.QDRANT_URL || 'http://localhost:6333',
      collectionName: process.env.QDRANT_COLLECTION_NAME || 'langchainjs-testing',
    }
  );
  const ret = vectorStore.asRetriever({
    k: 2,
  });
  const result = await ret.invoke(userQuery);

  const SYSTEM_PROMPT = `
  You are helpful AI Assistant who answers the user query based on the available context from PDF File.
  Context:
  ${JSON.stringify(result)}
  `;

  const chatResult = await client.chat.completions.create({
    model: getChatModel(),
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userQuery },
    ],
  });

  return res.json({
    message: chatResult.choices[0].message.content,
    docs: result,
    provider: aiConfig.provider,
    model: getChatModel()
  });
});

app.listen(8000, () => console.log(`Server started on PORT:${8000}`));
