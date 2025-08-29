import { Worker } from 'bullmq';
import { QdrantVectorStore } from '@langchain/qdrant';
import { Document } from '@langchain/core/documents';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { CharacterTextSplitter } from '@langchain/textsplitters';
import { initializeEmbeddings, aiConfig } from './config.js';

console.log(`🤖 Worker using AI Provider: ${aiConfig.provider}`);

const worker = new Worker(
  'file-upload-queue',
  async (job) => {
    console.log(`Job:`, job.data);
    const data = JSON.parse(job.data);
    /*
    Path: data.path
    read the pdf from path,
    chunk the pdf,
    call the openai embedding model for every chunk,
    store the chunk in qdrant db
    */

    // Load the PDF
    const loader = new PDFLoader(data.path);
    const docs = await loader.load();

    // Initialize embeddings with current AI provider
    const embeddings = initializeEmbeddings();

    const vectorStore = await QdrantVectorStore.fromExistingCollection(
      embeddings,
      {
        url: process.env.QDRANT_URL || 'http://localhost:6333',
        collectionName: process.env.QDRANT_COLLECTION_NAME || 'langchainjs-testing',
      }
    );
    await vectorStore.addDocuments(docs);
    console.log(`All docs are added to vector store using ${aiConfig.provider} embeddings`);
  },
  {
    concurrency: 100,
    connection: {
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || '6379',
    },
  }
);
