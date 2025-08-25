# PDF RAG Architecture Diagrams

## System Architecture Overview

```mermaid
graph TB
    subgraph "Client (Next.js)"
        A[File Upload Component]
        B[Chat Component]
        C[Authentication]
    end
    
    subgraph "Backend Services"
        D[Express Server]
        E[BullMQ Worker]
        F[Queue Manager]
    end
    
    subgraph "External Services"
        G[OpenAI API]
        H[Clerk Auth]
    end
    
    subgraph "Infrastructure"
        I[Redis/Valkey]
        J[Qdrant Vector DB]
        K[File Storage]
    end
    
    A -->|Upload PDF| D
    B -->|Chat Request| D
    C -->|Auth| H
    D -->|Add Job| F
    F -->|Queue Job| I
    E -->|Process Job| I
    E -->|Generate Embeddings| G
    E -->|Store Vectors| J
    D -->|Retrieve Vectors| J
    D -->|Generate Response| G
    D -->|Store Files| K
    E -->|Read Files| K
```

## RAG Pipeline Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant S as Server
    participant Q as Queue
    participant W as Worker
    participant V as Vector DB
    participant AI as OpenAI
    
    Note over U,AI: Document Upload Phase
    U->>F: Upload PDF
    F->>S: POST /upload/pdf
    S->>K: Store file locally
    S->>Q: Add job to queue
    S->>F: Return upload success
    F->>U: Show upload confirmation
    
    Q->>W: Process job
    W->>W: Load PDF content
    W->>AI: Generate embeddings
    AI->>W: Return embeddings
    W->>V: Store embeddings
    W->>Q: Mark job complete
    
    Note over U,AI: Chat Phase
    U->>F: Send message
    F->>S: GET /chat?message=...
    S->>AI: Generate query embedding
    AI->>S: Return query embedding
    S->>V: Search similar vectors
    V->>S: Return relevant docs
    S->>AI: Generate response with context
    AI->>S: Return AI response
    S->>F: Return response + docs
    F->>U: Display AI response
```

## Component Architecture

```mermaid
graph LR
    subgraph "Frontend Components"
        A1[app/page.tsx]
        A2[components/file-upload.tsx]
        A3[components/chat.tsx]
        A4[app/layout.tsx]
        A5[middleware.ts]
    end
    
    subgraph "Backend Components"
        B1[server/index.js]
        B2[server/worker.js]
        B3[package.json]
    end
    
    subgraph "Infrastructure"
        C1[docker-compose.yml]
        C2[Redis/Valkey]
        C3[Qdrant]
    end
    
    A1 --> A2
    A1 --> A3
    A4 --> A1
    A5 --> A4
    
    A2 --> B1
    A3 --> B1
    B1 --> B2
    B2 --> C2
    B2 --> C3
    C1 --> C2
    C1 --> C3
```

## Data Flow Architecture

```mermaid
flowchart TD
    A[PDF Upload] --> B[Multer Storage]
    B --> C[BullMQ Job Queue]
    C --> D[Background Worker]
    D --> E[PDF Loader]
    E --> F[Text Extraction]
    F --> G[Document Chunking]
    G --> H[OpenAI Embeddings]
    H --> I[Vector Storage in Qdrant]
    
    J[User Query] --> K[Query Embedding]
    K --> L[Vector Search]
    I --> L
    L --> M[Relevant Documents]
    M --> N[Context Injection]
    N --> O[GPT-4 Generation]
    O --> P[AI Response]
    P --> Q[User Interface]
    
    style A fill:#e1f5fe
    style J fill:#e8f5e8
    style P fill:#fff3e0
```

## Technology Stack Diagram

```mermaid
graph TB
    subgraph "Frontend Stack"
        F1[Next.js 15]
        F2[React 19]
        F3[TypeScript]
        F4[Tailwind CSS]
        F5[Clerk Auth]
    end
    
    subgraph "Backend Stack"
        B1[Node.js]
        B2[Express.js]
        B3[BullMQ]
        B4[LangChain]
    end
    
    subgraph "AI & ML"
        AI1[OpenAI GPT-4.1]
        AI2[text-embedding-3-small]
    end
    
    subgraph "Databases"
        DB1[Qdrant Vector DB]
        DB2[Redis/Valkey]
    end
    
    subgraph "Infrastructure"
        I1[Docker Compose]
        I2[Local File Storage]
    end
    
    F1 --> F2
    F2 --> F3
    F3 --> F4
    F4 --> F5
    
    B1 --> B2
    B2 --> B3
    B3 --> B4
    
    B4 --> AI1
    B4 --> AI2
    B3 --> DB2
    B4 --> DB1
    
    I1 --> DB1
    I1 --> DB2