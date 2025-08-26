# PDF RAG Codebase - Comprehensive Architecture Documentation

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Backend Components](#backend-components)
3. [Frontend Components](#frontend-components)
4. [Worker/Pub-Sub Architecture](#workerpub-sub-architecture)
5. [Why BullMQ?](#why-bullmq)
6. [RAG and Vector Retrieval](#rag-and-vector-retrieval)
7. [Improvement Recommendations](#improvement-recommendations)
8. [Common Patterns and Best Practices](#common-patterns-and-best-practices)

## Architecture Overview

This is a **PDF RAG (Retrieval-Augmented Generation)** application that allows users to upload PDF documents and chat with their content using AI. The system processes PDFs asynchronously, stores document embeddings in a vector database, and provides intelligent responses based on document content.

### High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Infrastructure│
│   (Next.js)     │◄──►│   (Express)     │◄──►│   Services      │
│                 │    │                 │    │                 │
│ • File Upload   │    │ • API Server    │    │ • Redis/Valkey  │
│ • Chat UI       │    │ • Queue Manager │    │ • Qdrant DB     │
│ • Auth (Clerk)  │    │ • Background    │    │ • OpenAI API    │
│                 │    │   Worker        │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS, Clerk Auth
- **Backend**: Node.js, Express.js, BullMQ, LangChain
- **Databases**: Qdrant (Vector DB), Redis/Valkey (Queue storage)
- **AI Services**: OpenAI (Embeddings + Chat Completions)
- **Infrastructure**: Docker Compose

## Backend Components

### 1. Main Server (`server/index.js`)

The Express.js server handles two primary responsibilities:

#### File Upload Endpoint (`POST /upload/pdf`)
```javascript
app.post('/upload/pdf', upload.single('pdf'), async (req, res) => {
  await queue.add('file-ready', JSON.stringify({
    filename: req.file.originalname,
    destination: req.file.destination,
    path: req.file.path,
  }));
  return res.json({ message: 'uploaded' });
});
```

**Flow:**
1. Receives PDF file via multipart/form-data
2. Stores file locally using Multer with unique naming
3. Adds job to BullMQ queue for background processing
4. Returns immediate response to user

#### Chat Endpoint (`GET /chat`)
```javascript
app.get('/chat', async (req, res) => {
  const userQuery = req.query.message;
  
  // 1. Create embeddings for user query
  const embeddings = new OpenAIEmbeddings({
    model: 'text-embedding-3-small',
    apiKey: '',
  });
  
  // 2. Search vector database
  const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
    url: 'http://localhost:6333',
    collectionName: 'langchainjs-testing',
  });
  
  // 3. Retrieve relevant documents
  const ret = vectorStore.asRetriever({ k: 2 });
  const result = await ret.invoke(userQuery);
  
  // 4. Generate AI response
  const chatResult = await client.chat.completions.create({
    model: 'gpt-4.1',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userQuery },
    ],
  });
  
  return res.json({
    message: chatResult.choices[0].message.content,
    docs: result,
  });
});
```

**RAG Flow:**
1. **Retrieval**: Convert user query to embeddings and search Qdrant
2. **Augmentation**: Inject retrieved context into system prompt
3. **Generation**: Use OpenAI GPT-4.1 to generate contextual response

### 2. Background Worker (`server/worker.js`)

The worker processes uploaded PDFs asynchronously:

```javascript
const worker = new Worker('file-upload-queue', async (job) => {
  const data = JSON.parse(job.data);
  
  // 1. Load PDF
  const loader = new PDFLoader(data.path);
  const docs = await loader.load();
  
  // 2. Create embeddings
  const embeddings = new OpenAIEmbeddings({
    model: 'text-embedding-3-small',
    apiKey: '',
  });
  
  // 3. Store in vector database
  const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
    url: 'http://localhost:6333',
    collectionName: 'langchainjs-testing',
  });
  
  await vectorStore.addDocuments(docs);
}, {
  concurrency: 100,
  connection: { host: 'localhost', port: '6379' },
});
```

**Processing Pipeline:**
1. **Document Loading**: LangChain PDFLoader extracts text from PDF
2. **Text Chunking**: Documents are automatically chunked by PDFLoader
3. **Embedding Generation**: OpenAI text-embedding-3-small creates vector representations
4. **Vector Storage**: Embeddings stored in Qdrant with metadata

## Frontend Components

### 1. Application Structure

The frontend is a Next.js application with the following structure:

```
client/
├── app/
│   ├── layout.tsx          # Root layout with Clerk auth
│   ├── page.tsx            # Main page layout
│   └── components/
│       ├── file-upload.tsx # PDF upload component
│       └── chat.tsx        # Chat interface component
├── components/ui/          # Reusable UI components
└── middleware.ts           # Clerk authentication middleware
```

### 2. Main Page (`app/page.tsx`)

Split-screen layout:
```tsx
export default function Home() {
  return (
    <div className="min-h-screen w-screen flex">
      <div className="w-[30vw] min-h-screen p-4 flex justify-center items-center">
        <FileUploadComponent />
      </div>
      <div className="w-[70vw] min-h-screen border-l-2">
        <ChatComponent />
      </div>
    </div>
  );
}
```

### 3. File Upload Component (`components/file-upload.tsx`)

```tsx
const handleFileUploadButtonClick = () => {
  const el = document.createElement('input');
  el.setAttribute('type', 'file');
  el.setAttribute('accept', 'application/pdf');
  el.addEventListener('change', async (ev) => {
    if (el.files && el.files.length > 0) {
      const file = el.files.item(0);
      if (file) {
        const formData = new FormData();
        formData.append('pdf', file);
        
        await fetch('http://localhost:8000/upload/pdf', {
          method: 'POST',
          body: formData,
        });
      }
    }
  });
  el.click();
};
```

**Features:**
- File type validation (PDF only)
- Direct file upload to backend
- Simple click-to-upload interface

### 4. Chat Component (`components/chat.tsx`)

```tsx
const ChatComponent: React.FC = () => {
  const [message, setMessage] = React.useState<string>('');
  const [messages, setMessages] = React.useState<IMessage[]>([]);

  const handleSendChatMessage = async () => {
    setMessages((prev) => [...prev, { role: 'user', content: message }]);
    const res = await fetch(`http://localhost:8000/chat?message=${message}`);
    const data = await res.json();
    setMessages((prev) => [...prev, {
      role: 'assistant',
      content: data?.message,
      documents: data?.docs,
    }]);
  };
  
  // Render messages and input field
};
```

**Features:**
- Real-time chat interface
- Message history management
- Document context display
- Input validation

### 5. Authentication (`layout.tsx`)

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <section>
            <SignedOut>
              <SignUpButton />
            </SignedOut>
          </section>
          <SignedIn>{children}</SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}
```

**Authentication Flow:**
- Clerk handles user authentication
- Protected routes only accessible to signed-in users
- Middleware enforces authentication on all routes

## Worker/Pub-Sub Architecture

### Event-Driven Processing

The application uses an **event-driven architecture** with BullMQ for asynchronous job processing:

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Client    │    │   Server    │    │    Queue    │    │   Worker    │
│             │    │             │    │  (Redis)    │    │             │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       │ 1. Upload PDF     │                   │                   │
       ├──────────────────►│                   │                   │
       │                   │ 2. Add Job        │                   │
       │                   ├──────────────────►│                   │
       │ 3. Response       │                   │ 3. Job Queued    │
       ◄──────────────────┤                   │                   │
       │                   │                   │ 4. Process Job    │
       │                   │                   ├──────────────────►│
       │                   │                   │                   │
       │                   │                   │ 5. Job Complete   │
       │                   │                   ◄──────────────────┤
```

### Benefits of This Architecture

1. **Non-blocking Uploads**: Users get immediate feedback
2. **Scalability**: Multiple workers can process jobs concurrently
3. **Reliability**: Jobs are persisted in Redis, survive server restarts
4. **Monitoring**: BullMQ provides job status, retry mechanisms, and dashboards

### Job Processing Flow

```javascript
// 1. Job Creation (Server)
await queue.add('file-ready', JSON.stringify({
  filename: req.file.originalname,
  destination: req.file.destination,
  path: req.file.path,
}));

// 2. Job Processing (Worker)
const worker = new Worker('file-upload-queue', async (job) => {
  const data = JSON.parse(job.data);
  // Process PDF...
}, {
  concurrency: 100,  // Process up to 100 jobs simultaneously
  connection: { host: 'localhost', port: '6379' },
});
```

## Why BullMQ?

### 1. Redis-Based Queue System

BullMQ was chosen over alternatives because:

**Advantages:**
- **Performance**: Redis-based, extremely fast
- **Reliability**: Job persistence, automatic retries
- **Scalability**: Horizontal scaling with multiple workers
- **Monitoring**: Built-in UI dashboard, job status tracking
- **Type Safety**: TypeScript support
- **Ecosystem**: Rich plugin ecosystem

**Comparison with Alternatives:**
```
┌─────────────────┬─────────────┬─────────────┬─────────────┬─────────────┐
│    Feature      │   BullMQ    │     Bee     │   Agenda    │    Kue      │
├─────────────────┼─────────────┼─────────────┼─────────────┼─────────────┤
│ Performance     │    ⭐⭐⭐⭐⭐    │    ⭐⭐⭐⭐     │    ⭐⭐⭐      │    ⭐⭐       │
│ Reliability     │    ⭐⭐⭐⭐⭐    │    ⭐⭐⭐      │    ⭐⭐⭐⭐     │    ⭐⭐       │
│ TypeScript      │    ⭐⭐⭐⭐⭐    │    ⭐⭐       │    ⭐⭐⭐      │    ⭐        │
│ Monitoring      │    ⭐⭐⭐⭐⭐    │    ⭐⭐⭐      │    ⭐⭐       │    ⭐⭐⭐      │
│ Active Dev      │    ⭐⭐⭐⭐⭐    │    ⭐⭐       │    ⭐⭐       │    ⭐        │
└─────────────────┴─────────────┴─────────────┴─────────────┴─────────────┘
```

### 2. Configuration Options

```javascript
const worker = new Worker('file-upload-queue', processingFunction, {
  concurrency: 100,              // Process multiple jobs simultaneously
  connection: {                  // Redis connection settings
    host: 'localhost',
    port: '6379',
  },
  defaultJobOptions: {
    removeOnComplete: 10,        // Keep last 10 completed jobs
    removeOnFail: 5,             // Keep last 5 failed jobs
    attempts: 3,                 // Retry failed jobs 3 times
    backoff: 'exponential',      // Exponential backoff for retries
  },
});
```

## RAG and Vector Retrieval

### Note: Qdrant vs Pinecone

The codebase uses **Qdrant**, not Pinecone. Here's why:

**Qdrant Advantages:**
- **Self-hosted**: Complete control over data
- **Open source**: No vendor lock-in
- **Performance**: Written in Rust, extremely fast
- **Cost**: No per-vector pricing
- **Privacy**: Data stays in your infrastructure

### RAG Implementation Pipeline

#### 1. Document Processing (Indexing Phase)

```javascript
// Step 1: Load PDF
const loader = new PDFLoader(data.path);
const docs = await loader.load();

// Step 2: Create embeddings
const embeddings = new OpenAIEmbeddings({
  model: 'text-embedding-3-small',  // 1536 dimensions
  apiKey: process.env.OPENAI_API_KEY,
});

// Step 3: Store in vector database
const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
  url: 'http://localhost:6333',
  collectionName: 'langchainjs-testing',
});

await vectorStore.addDocuments(docs);
```

#### 2. Query Processing (Retrieval Phase)

```javascript
// Step 1: Convert query to embeddings
const userQuery = "What is the main topic of the document?";
const embeddings = new OpenAIEmbeddings({
  model: 'text-embedding-3-small',
});

// Step 2: Search similar vectors
const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
  url: 'http://localhost:6333',
  collectionName: 'langchainjs-testing',
});

const retriever = vectorStore.asRetriever({
  k: 2,  // Retrieve top 2 most similar documents
});

const relevantDocs = await retriever.invoke(userQuery);
```

#### 3. Response Generation (Generation Phase)

```javascript
const SYSTEM_PROMPT = `
You are a helpful AI Assistant who answers the user query based on the available context from PDF File.
Context:
${JSON.stringify(relevantDocs)}
`;

const chatResult = await client.chat.completions.create({
  model: 'gpt-4.1',
  messages: [
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'user', content: userQuery },
  ],
});
```

### Vector Search Mechanics

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Query    │    │   Query Vector  │    │  Similar Docs   │
│                 │    │                 │    │                 │
│ "What is the    │───►│ [0.1, 0.3, ... │───►│ Doc 1: 0.87     │
│ main topic?"    │    │  0.2, 0.8]      │    │ Doc 2: 0.82     │
│                 │    │ (1536 dims)     │    │ Doc 3: 0.75     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                       │                       │
        │              OpenAI Embedding           Cosine Similarity
        │                   API                    Search in Qdrant
        └───────────────────────────────────────────────────────────┘
```

### Embedding Model Details

**OpenAI text-embedding-3-small:**
- **Dimensions**: 1536
- **Max Input**: 8191 tokens
- **Use Case**: General-purpose text embedding
- **Cost**: $0.00002 per 1K tokens
- **Performance**: High quality, fast inference

## Improvement Recommendations

### 1. Security Enhancements

#### Current Issues:
```javascript
// ❌ API keys hardcoded as empty strings
const client = new OpenAI({
  apiKey: '',  // Security vulnerability
});
```

#### Recommended Solutions:
```javascript
// ✅ Use environment variables
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ Add input validation
app.post('/upload/pdf', 
  upload.single('pdf'),
  validateFileSize(10 * 1024 * 1024), // 10MB limit
  validateFileType(['application/pdf']),
  async (req, res) => {
    // Processing...
  }
);

// ✅ Add rate limiting
import rateLimit from 'express-rate-limit';

const uploadLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 uploads per window
});

app.post('/upload/pdf', uploadLimit, upload.single('pdf'), ...);
```

### 2. Error Handling and Monitoring

#### Current Issues:
- No error handling in API endpoints
- No monitoring/logging
- No retry mechanisms

#### Recommended Solutions:
```javascript
// ✅ Comprehensive error handling
app.post('/upload/pdf', async (req, res) => {
  try {
    // Validate file
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    // Add job to queue
    const job = await queue.add('file-ready', {
      filename: req.file.originalname,
      path: req.file.path,
      uploadedAt: new Date().toISOString(),
    });
    
    logger.info('File upload queued', { jobId: job.id, filename: req.file.originalname });
    
    return res.json({ 
      message: 'File uploaded successfully',
      jobId: job.id 
    });
  } catch (error) {
    logger.error('Upload failed', { error: error.message });
    return res.status(500).json({ error: 'Upload failed' });
  }
});

// ✅ Add monitoring with structured logging
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ],
});
```

### 3. Performance Optimizations

#### Text Chunking Strategy:
```javascript
// ✅ Add intelligent text splitter
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,        // Optimal for embeddings
  chunkOverlap: 200,      // Maintain context
  separators: ['\n\n', '\n', ' ', ''],
});

const splitDocs = await textSplitter.splitDocuments(docs);
```

#### Caching Strategy:
```javascript
// ✅ Add Redis caching for frequent queries
import Redis from 'ioredis';

const redis = new Redis({
  host: 'localhost',
  port: 6379,
});

app.get('/chat', async (req, res) => {
  const userQuery = req.query.message;
  const cacheKey = `chat:${Buffer.from(userQuery).toString('base64')}`;
  
  // Check cache first
  const cachedResult = await redis.get(cacheKey);
  if (cachedResult) {
    return res.json(JSON.parse(cachedResult));
  }
  
  // Process query...
  const result = await processQuery(userQuery);
  
  // Cache result for 1 hour
  await redis.setex(cacheKey, 3600, JSON.stringify(result));
  
  return res.json(result);
});
```

### 4. Document Processing Improvements

#### Metadata Enhancement:
```javascript
// ✅ Add rich metadata
const docs = await loader.load();
const enrichedDocs = docs.map((doc, index) => ({
  ...doc,
  metadata: {
    ...doc.metadata,
    chunkId: `${filename}-chunk-${index}`,
    uploadedAt: new Date().toISOString(),
    fileSize: fileStats.size,
    processingVersion: '1.0',
  }
}));
```

#### Multi-format Support:
```javascript
// ✅ Support multiple document types
const getLoader = (filePath, mimeType) => {
  switch (mimeType) {
    case 'application/pdf':
      return new PDFLoader(filePath);
    case 'text/plain':
      return new TextLoader(filePath);
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return new DocxLoader(filePath);
    default:
      throw new Error(`Unsupported file type: ${mimeType}`);
  }
};
```

### 5. Frontend Enhancements

#### Real-time Updates:
```typescript
// ✅ Add WebSocket for real-time job status
import { io } from 'socket.io-client';

const socket = io('http://localhost:8000');

socket.on('job-progress', (data) => {
  setUploadProgress(data.progress);
});

socket.on('job-complete', (data) => {
  setUploadStatus('completed');
  // Enable chat functionality
});
```

#### Better UI/UX:
```tsx
// ✅ Add loading states and progress indicators
const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'processing' | 'complete'>('idle');

return (
  <div>
    {uploadStatus === 'processing' && (
      <div className="flex items-center space-x-2">
        <Spinner />
        <span>Processing your PDF...</span>
      </div>
    )}
    
    <Upload 
      disabled={uploadStatus !== 'idle'} 
      onUpload={handleUpload}
    />
  </div>
);
```

## Common Patterns and Best Practices

### 1. Environment Configuration

```javascript
// ✅ Use environment-specific configs
const config = {
  development: {
    redis: { host: 'localhost', port: 6379 },
    qdrant: { url: 'http://localhost:6333' },
    openai: { apiKey: process.env.OPENAI_API_KEY },
  },
  production: {
    redis: { 
      host: process.env.REDIS_HOST, 
      port: parseInt(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
    },
    qdrant: { 
      url: process.env.QDRANT_URL,
      apiKey: process.env.QDRANT_API_KEY,
    },
    openai: { apiKey: process.env.OPENAI_API_KEY },
  },
};

const currentConfig = config[process.env.NODE_ENV || 'development'];
```

### 2. Database Connection Management

```javascript
// ✅ Connection pooling and health checks
class QdrantManager {
  constructor(config) {
    this.config = config;
    this.embeddings = new OpenAIEmbeddings(config.openai);
  }
  
  async getVectorStore() {
    if (!this.vectorStore) {
      this.vectorStore = await QdrantVectorStore.fromExistingCollection(
        this.embeddings,
        this.config.qdrant
      );
    }
    return this.vectorStore;
  }
  
  async healthCheck() {
    try {
      const store = await this.getVectorStore();
      // Perform a simple search to verify connection
      await store.similaritySearch('test', 1);
      return true;
    } catch (error) {
      console.error('Qdrant health check failed:', error);
      return false;
    }
  }
}
```

### 3. Job Processing Patterns

```javascript
// ✅ Robust job processing with retry logic
const worker = new Worker('file-upload-queue', async (job) => {
  const { path, filename } = job.data;
  
  try {
    // Update job progress
    await job.updateProgress(10);
    
    // Load document
    const docs = await loadDocument(path);
    await job.updateProgress(30);
    
    // Generate embeddings
    const embeddings = await generateEmbeddings(docs);
    await job.updateProgress(70);
    
    // Store in vector database
    await storeEmbeddings(embeddings);
    await job.updateProgress(100);
    
    // Cleanup uploaded file
    await fs.unlink(path);
    
    return { success: true, documentsProcessed: docs.length };
  } catch (error) {
    // Log error with context
    logger.error('Job processing failed', {
      jobId: job.id,
      filename,
      error: error.message,
      stack: error.stack,
    });
    
    throw error; // Re-throw to trigger retry
  }
}, {
  concurrency: 10,
  defaultJobOptions: {
    removeOnComplete: 10,
    removeOnFail: 5,
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
  },
});

// Add event listeners for monitoring
worker.on('completed', (job) => {
  logger.info('Job completed', { jobId: job.id });
});

worker.on('failed', (job, err) => {
  logger.error('Job failed', { jobId: job.id, error: err.message });
});
```

### 4. API Design Patterns

```javascript
// ✅ RESTful API with proper status codes
app.post('/documents', async (req, res) => {
  try {
    const { file } = req;
    
    if (!file) {
      return res.status(400).json({
        error: 'MISSING_FILE',
        message: 'No file provided'
      });
    }
    
    const job = await queue.add('process-document', {
      filename: file.originalname,
      path: file.path,
    });
    
    res.status(202).json({
      message: 'Document queued for processing',
      jobId: job.id,
      status: 'processing'
    });
  } catch (error) {
    res.status(500).json({
      error: 'INTERNAL_ERROR',
      message: 'Document processing failed'
    });
  }
});

// Job status endpoint
app.get('/documents/:jobId/status', async (req, res) => {
  try {
    const job = await queue.getJob(req.params.jobId);
    
    if (!job) {
      return res.status(404).json({
        error: 'JOB_NOT_FOUND',
        message: 'Job not found'
      });
    }
    
    res.json({
      id: job.id,
      status: await job.getState(),
      progress: job.progress,
      result: job.returnvalue,
    });
  } catch (error) {
    res.status(500).json({
      error: 'INTERNAL_ERROR',
      message: 'Could not retrieve job status'
    });
  }
});
```

### 5. Testing Strategies

```javascript
// ✅ Unit tests for core functions
describe('Document Processing', () => {
  test('should process PDF successfully', async () => {
    const mockFile = { path: 'test.pdf', originalname: 'test.pdf' };
    const job = await queue.add('process-document', mockFile);
    
    // Wait for job completion
    await job.finished();
    
    expect(job.returnvalue.success).toBe(true);
    expect(job.returnvalue.documentsProcessed).toBeGreaterThan(0);
  });
  
  test('should handle invalid file gracefully', async () => {
    const mockFile = { path: 'invalid.txt', originalname: 'invalid.txt' };
    const job = await queue.add('process-document', mockFile);
    
    await expect(job.finished()).rejects.toThrow();
  });
});

// ✅ Integration tests for API endpoints
describe('API Endpoints', () => {
  test('POST /documents should accept PDF upload', async () => {
    const response = await request(app)
      .post('/documents')
      .attach('file', 'test-files/sample.pdf')
      .expect(202);
    
    expect(response.body.jobId).toBeDefined();
    expect(response.body.status).toBe('processing');
  });
});
```

## Conclusion

This PDF RAG application demonstrates a well-architected system for document processing and AI-powered chat. The event-driven architecture with BullMQ provides scalability and reliability, while the RAG implementation with Qdrant and OpenAI delivers high-quality responses.

Key strengths:
- **Scalable Architecture**: Event-driven with job queues
- **Modern Tech Stack**: Latest versions of frameworks
- **Clean Separation**: Frontend, backend, and worker processes
- **Vector Search**: Efficient similarity search with Qdrant

Areas for improvement:
- **Security**: Environment variables, input validation
- **Error Handling**: Comprehensive error management
- **Monitoring**: Logging and observability
- **Performance**: Caching and optimization
- **Testing**: Unit and integration tests

The codebase provides a solid foundation that can be enhanced with the recommended improvements for production deployment.