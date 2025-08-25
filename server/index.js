import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { Queue } from 'bullmq';
import { OpenAIEmbeddings } from '@langchain/openai';
import { QdrantVectorStore } from '@langchain/qdrant';
import OpenAI from 'openai';

// Environment variables with fallbacks
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const QDRANT_URL = process.env.QDRANT_URL || 'http://localhost:6333';
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || '6379';
const PORT = process.env.PORT || 8000;

const client = new OpenAI({
  apiKey: OPENAI_API_KEY,
});
const queue = new Queue('file-upload-queue', {
  connection: {
    host: REDIS_HOST,
    port: REDIS_PORT,
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
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    await queue.add(
      'file-ready',
      JSON.stringify({
        filename: req.file.originalname,
        destination: req.file.destination,
        path: req.file.path,
      })
    );
    return res.json({ message: 'File uploaded successfully and queued for processing' });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'Failed to upload file' });
  }
});

app.get('/chat', async (req, res) => {
  try {
    const userQuery = req.query.message;
    
    if (!userQuery) {
      return res.status(400).json({ error: 'Message parameter is required' });
    }

    if (!OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    const embeddings = new OpenAIEmbeddings({
      model: 'text-embedding-3-small',
      apiKey: OPENAI_API_KEY,
    });
    
    const vectorStore = await QdrantVectorStore.fromExistingCollection(
      embeddings,
      {
        url: QDRANT_URL,
        collectionName: 'langchainjs-testing',
      }
    );
    
    const ret = vectorStore.asRetriever({
      k: 2,
    });
    const result = await ret.invoke(userQuery);

    const SYSTEM_PROMPT = `
    You are a helpful AI Assistant who answers the user query based on the available context from PDF files.
    Context:
    ${JSON.stringify(result)}
    `;

    const chatResult = await client.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userQuery },
      ],
    });

    return res.json({
      message: chatResult.choices[0].message.content,
      docs: result,
    });
  } catch (error) {
    console.error('Chat error:', error);
    return res.status(500).json({ error: 'Failed to process chat message' });
  }
});

app.listen(PORT, () => console.log(`Server started on PORT:${PORT}`));
