# Create visually appealing mermaid graph
_Exported on 8/26/2025 at 16:23:29 GMT+5:30 from Cursor (1.5.5)_

---

**User**

can you pls make the md so that its actually visually looking like a graph/mermaid graph. right now it doesn't ,
or like just show it in the chat using the mermaid tool.

---

**Cursor**

```markdown
# PDF RAG Architecture Diagrams

## 🏗️ System Architecture Overview

```mermaid
graph TB
    %% Define styles for different components
    classDef clientNode fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef backendNode fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    classDef externalNode fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px
    classDef infraNode fill:#fff3e0,stroke:#e65100,stroke-width:2px

    subgraph "🌐 Client (Next.js)"
        A[📤 File Upload<br/>Component]:::clientNode
        B[💬 Chat Component]:::clientNode
        C[🔐 Authentication]:::clientNode
    end

    subgraph "⚙️ Backend Services"
        D[🚀 Express Server]:::backendNode
        E[👷 BullMQ Worker]:::backendNode
        F[📋 Queue Manager]:::backendNode
    end

    subgraph "🔗 External Services"
        G[🤖 OpenAI API]:::externalNode
        H[🛡️ Clerk Auth]:::externalNode
    end

    subgraph "🗄️ Infrastructure"
        I[⚡ Redis/Valkey]:::infraNode
        J[🧮 Qdrant Vector DB]:::infraNode
        K[📁 File Storage]:::infraNode
    end

    %% Define connections with better labels
    A -->|"📄 Upload PDF"| D
    B -->|"💬 Chat Request"| D
    C -->|"🔐 Authenticate"| H
    D -->|"➕ Add Job"| F
    F -->|"📤 Queue Job"| I
    E -->|"⚙️ Process Job"| I
    E -->|"🧠 Generate Embeddings"| G
    E -->|"💾 Store Vectors"| J
    D -->|"🔍 Retrieve Vectors"| J
    D -->|"🎯 Generate Response"| G
    D -->|"💾 Store Files"| K
    E -->|"📖 Read Files"| K

    %% Add title
    title[📊 PDF RAG System Architecture]
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
```

```markdown
# PDF RAG Architecture Diagrams

## 🏗️ System Architecture Overview

```mermaid
graph TB
    %% Define styles for different components
    classDef clientNode fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef backendNode fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    classDef externalNode fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px
    classDef infraNode fill:#fff3e0,stroke:#e65100,stroke-width:2px

    subgraph "🌐 Client (Next.js)"
        A[📤 File Upload<br/>Component]:::clientNode
        B[💬 Chat Component]:::clientNode
        C[🔐 Authentication]:::clientNode
    end

    subgraph "⚙️ Backend Services"
        D[🚀 Express Server]:::backendNode
        E[👷 BullMQ Worker]:::backendNode
        F[📋 Queue Manager]:::backendNode
    end

    subgraph "🔗 External Services"
        G[🤖 OpenAI API]:::externalNode
        H[🛡️ Clerk Auth]:::externalNode
    end

    subgraph "🗄️ Infrastructure"
        I[⚡ Redis/Valkey]:::infraNode
        J[🧮 Qdrant Vector DB]:::infraNode
        K[📁 File Storage]:::infraNode
    end

    %% Define connections with better labels
    A -->|"📄 Upload PDF"| D
    B -->|"💬 Chat Request"| D
    C -->|"🔐 Authenticate"| H
    D -->|"➕ Add Job"| F
    F -->|"📤 Queue Job"| I
    E -->|"⚙️ Process Job"| I
    E -->|"🧠 Generate Embeddings"| G
    E -->|"💾 Store Vectors"| J
    D -->|"🔍 Retrieve Vectors"| J
    D -->|"🎯 Generate Response"| G
    D -->|"💾 Store Files"| K
    E -->|"📖 Read Files"| K

    %% Add title
    title[📊 PDF RAG System Architecture]
```

## 🔄 RAG Pipeline Flow

```mermaid
sequenceDiagram
    %% Define participants with emojis and better names
    participant U as 👤 User
    participant F as 🌐 Frontend<br/>(Next.js)
    participant S as 🚀 Server<br/>(Express)
    participant Q as 📋 Queue<br/>(BullMQ)
    participant W as 👷 Worker<br/>(Background)
    participant V as 🧮 Vector DB<br/>(Qdrant)
    participant AI as 🤖 OpenAI<br/>(GPT-4)

    %% Document Upload Phase with visual separator
    box rgb(173, 216, 230) Document Upload Phase
    U->>F: 📤 Upload PDF file
    F->>S: POST /upload/pdf
    S->>S: 💾 Store file locally
    S->>Q: ➕ Add job to queue
    S->>F: ✅ Return upload success
    F->>U: 📋 Show upload confirmation
    end

    %% Background processing
    Q->>W: ⚙️ Process job from queue
    W->>W: 📖 Load PDF content
    W->>AI: 🧠 Generate text embeddings
    AI->>W: 📊 Return embeddings vector
    W->>V: 💾 Store embeddings in vector DB
    W->>Q: ✅ Mark job complete

    %% Chat Phase with visual separator
    box rgb(144, 238, 144) Chat Phase
    U->>F: 💬 Send chat message
    F->>S: GET /chat?message=...
    S->>AI: 🧠 Generate query embedding
    AI->>S: 📊 Return query embedding
    S->>V: 🔍 Search similar vectors
    V->>S: 📄 Return relevant documents
    S->>AI: 🎯 Generate response with context
    AI->>S: 💬 Return AI response
    S->>F: 📦 Return response + source docs
    F->>U: 🖥️ Display AI response
    end
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
```

```markdown
# PDF RAG Architecture Diagrams

## 🏗️ System Architecture Overview

```mermaid
graph TB
    %% Define styles for different components
    classDef clientNode fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef backendNode fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    classDef externalNode fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px
    classDef infraNode fill:#fff3e0,stroke:#e65100,stroke-width:2px

    subgraph "🌐 Client (Next.js)"
        A[📤 File Upload<br/>Component]:::clientNode
        B[💬 Chat Component]:::clientNode
        C[🔐 Authentication]:::clientNode
    end

    subgraph "⚙️ Backend Services"
        D[🚀 Express Server]:::backendNode
        E[👷 BullMQ Worker]:::backendNode
        F[📋 Queue Manager]:::backendNode
    end

    subgraph "🔗 External Services"
        G[🤖 OpenAI API]:::externalNode
        H[🛡️ Clerk Auth]:::externalNode
    end

    subgraph "🗄️ Infrastructure"
        I[⚡ Redis/Valkey]:::infraNode
        J[🧮 Qdrant Vector DB]:::infraNode
        K[📁 File Storage]:::infraNode
    end

    %% Define connections with better labels
    A -->|"📄 Upload PDF"| D
    B -->|"💬 Chat Request"| D
    C -->|"🔐 Authenticate"| H
    D -->|"➕ Add Job"| F
    F -->|"📤 Queue Job"| I
    E -->|"⚙️ Process Job"| I
    E -->|"🧠 Generate Embeddings"| G
    E -->|"💾 Store Vectors"| J
    D -->|"🔍 Retrieve Vectors"| J
    D -->|"🎯 Generate Response"| G
    D -->|"💾 Store Files"| K
    E -->|"📖 Read Files"| K

    %% Add title
    title[📊 PDF RAG System Architecture]
```

## 🔄 RAG Pipeline Flow

```mermaid
sequenceDiagram
    %% Define participants with emojis and better names
    participant U as 👤 User
    participant F as 🌐 Frontend<br/>(Next.js)
    participant S as 🚀 Server<br/>(Express)
    participant Q as 📋 Queue<br/>(BullMQ)
    participant W as 👷 Worker<br/>(Background)
    participant V as 🧮 Vector DB<br/>(Qdrant)
    participant AI as 🤖 OpenAI<br/>(GPT-4)

    %% Document Upload Phase with visual separator
    box rgb(173, 216, 230) Document Upload Phase
    U->>F: 📤 Upload PDF file
    F->>S: POST /upload/pdf
    S->>S: 💾 Store file locally
    S->>Q: ➕ Add job to queue
    S->>F: ✅ Return upload success
    F->>U: 📋 Show upload confirmation
    end

    %% Background processing
    Q->>W: ⚙️ Process job from queue
    W->>W: 📖 Load PDF content
    W->>AI: 🧠 Generate text embeddings
    AI->>W: 📊 Return embeddings vector
    W->>V: 💾 Store embeddings in vector DB
    W->>Q: ✅ Mark job complete

    %% Chat Phase with visual separator
    box rgb(144, 238, 144) Chat Phase
    U->>F: 💬 Send chat message
    F->>S: GET /chat?message=...
    S->>AI: 🧠 Generate query embedding
    AI->>S: 📊 Return query embedding
    S->>V: 🔍 Search similar vectors
    V->>S: 📄 Return relevant documents
    S->>AI: 🎯 Generate response with context
    AI->>S: 💬 Return AI response
    S->>F: 📦 Return response + source docs
    F->>U: 🖥️ Display AI response
    end
```

## 🧩 Component Architecture

```mermaid
graph LR
    %% Define styles for different component types
    classDef frontendNode fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    classDef backendNode fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    classDef infraNode fill:#fff8e1,stroke:#f57c00,stroke-width:2px

    subgraph "🌐 Frontend Components"
        A1[📄 app/page.tsx<br/>Main Page]:::frontendNode
        A2[📤 components/file-upload.tsx<br/>File Upload]:::frontendNode
        A3[💬 components/chat.tsx<br/>Chat Interface]:::frontendNode
        A4[🏗️ app/layout.tsx<br/>Root Layout]:::frontendNode
        A5[🛡️ middleware.ts<br/>Auth Middleware]:::frontendNode
    end

    subgraph "⚙️ Backend Components"
        B1[🚀 server/index.js<br/>Express Server]:::backendNode
        B2[👷 server/worker.js<br/>Background Worker]:::backendNode
        B3[📦 package.json<br/>Dependencies]:::backendNode
    end

    subgraph "🗄️ Infrastructure"
        C1[🐳 docker-compose.yml<br/>Container Orchestration]:::infraNode
        C2[⚡ Redis/Valkey<br/>Job Queue]:::infraNode
        C3[🧮 Qdrant<br/>Vector Database]:::infraNode
    end

    %% Define connections with clear labels
    A4 -->|"📄 Renders"| A1
    A1 -->|"📤 Uses"| A2
    A1 -->|"💬 Uses"| A3
    A5 -->|"🔐 Protects"| A4

    A2 -->|"📨 HTTP Requests"| B1
    A3 -->|"💬 HTTP Requests"| B1
    B1 -->|"⚙️ Delegates Work"| B2
    B3 -->|"📦 Manages"| B1
    B3 -->|"📦 Manages"| B2

    B2 -->|"📋 Queue Jobs"| C2
    B2 -->|"💾 Store Vectors"| C3
    C1 -->|"🏗️ Provisions"| C2
    C1 -->|"🏗️ Provisions"| C3

    %% Add diagram title
    title[🔗 Component Relationships & Dependencies]
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
```

```markdown
# PDF RAG Architecture Diagrams

## 🏗️ System Architecture Overview

```mermaid
graph TB
    %% Define styles for different components
    classDef clientNode fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef backendNode fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    classDef externalNode fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px
    classDef infraNode fill:#fff3e0,stroke:#e65100,stroke-width:2px

    subgraph "🌐 Client (Next.js)"
        A[📤 File Upload<br/>Component]:::clientNode
        B[💬 Chat Component]:::clientNode
        C[🔐 Authentication]:::clientNode
    end

    subgraph "⚙️ Backend Services"
        D[🚀 Express Server]:::backendNode
        E[👷 BullMQ Worker]:::backendNode
        F[📋 Queue Manager]:::backendNode
    end

    subgraph "🔗 External Services"
        G[🤖 OpenAI API]:::externalNode
        H[🛡️ Clerk Auth]:::externalNode
    end

    subgraph "🗄️ Infrastructure"
        I[⚡ Redis/Valkey]:::infraNode
        J[🧮 Qdrant Vector DB]:::infraNode
        K[📁 File Storage]:::infraNode
    end

    %% Define connections with better labels
    A -->|"📄 Upload PDF"| D
    B -->|"💬 Chat Request"| D
    C -->|"🔐 Authenticate"| H
    D -->|"➕ Add Job"| F
    F -->|"📤 Queue Job"| I
    E -->|"⚙️ Process Job"| I
    E -->|"🧠 Generate Embeddings"| G
    E -->|"💾 Store Vectors"| J
    D -->|"🔍 Retrieve Vectors"| J
    D -->|"🎯 Generate Response"| G
    D -->|"💾 Store Files"| K
    E -->|"📖 Read Files"| K

    %% Add title
    title[📊 PDF RAG System Architecture]
```

## 🔄 RAG Pipeline Flow

```mermaid
sequenceDiagram
    %% Define participants with emojis and better names
    participant U as 👤 User
    participant F as 🌐 Frontend<br/>(Next.js)
    participant S as 🚀 Server<br/>(Express)
    participant Q as 📋 Queue<br/>(BullMQ)
    participant W as 👷 Worker<br/>(Background)
    participant V as 🧮 Vector DB<br/>(Qdrant)
    participant AI as 🤖 OpenAI<br/>(GPT-4)

    %% Document Upload Phase with visual separator
    box rgb(173, 216, 230) Document Upload Phase
    U->>F: 📤 Upload PDF file
    F->>S: POST /upload/pdf
    S->>S: 💾 Store file locally
    S->>Q: ➕ Add job to queue
    S->>F: ✅ Return upload success
    F->>U: 📋 Show upload confirmation
    end

    %% Background processing
    Q->>W: ⚙️ Process job from queue
    W->>W: 📖 Load PDF content
    W->>AI: 🧠 Generate text embeddings
    AI->>W: 📊 Return embeddings vector
    W->>V: 💾 Store embeddings in vector DB
    W->>Q: ✅ Mark job complete

    %% Chat Phase with visual separator
    box rgb(144, 238, 144) Chat Phase
    U->>F: 💬 Send chat message
    F->>S: GET /chat?message=...
    S->>AI: 🧠 Generate query embedding
    AI->>S: 📊 Return query embedding
    S->>V: 🔍 Search similar vectors
    V->>S: 📄 Return relevant documents
    S->>AI: 🎯 Generate response with context
    AI->>S: 💬 Return AI response
    S->>F: 📦 Return response + source docs
    F->>U: 🖥️ Display AI response
    end
```

## 🧩 Component Architecture

```mermaid
graph LR
    %% Define styles for different component types
    classDef frontendNode fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    classDef backendNode fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    classDef infraNode fill:#fff8e1,stroke:#f57c00,stroke-width:2px

    subgraph "🌐 Frontend Components"
        A1[📄 app/page.tsx<br/>Main Page]:::frontendNode
        A2[📤 components/file-upload.tsx<br/>File Upload]:::frontendNode
        A3[💬 components/chat.tsx<br/>Chat Interface]:::frontendNode
        A4[🏗️ app/layout.tsx<br/>Root Layout]:::frontendNode
        A5[🛡️ middleware.ts<br/>Auth Middleware]:::frontendNode
    end

    subgraph "⚙️ Backend Components"
        B1[🚀 server/index.js<br/>Express Server]:::backendNode
        B2[👷 server/worker.js<br/>Background Worker]:::backendNode
        B3[📦 package.json<br/>Dependencies]:::backendNode
    end

    subgraph "🗄️ Infrastructure"
        C1[🐳 docker-compose.yml<br/>Container Orchestration]:::infraNode
        C2[⚡ Redis/Valkey<br/>Job Queue]:::infraNode
        C3[🧮 Qdrant<br/>Vector Database]:::infraNode
    end

    %% Define connections with clear labels
    A4 -->|"📄 Renders"| A1
    A1 -->|"📤 Uses"| A2
    A1 -->|"💬 Uses"| A3
    A5 -->|"🔐 Protects"| A4

    A2 -->|"📨 HTTP Requests"| B1
    A3 -->|"💬 HTTP Requests"| B1
    B1 -->|"⚙️ Delegates Work"| B2
    B3 -->|"📦 Manages"| B1
    B3 -->|"📦 Manages"| B2

    B2 -->|"📋 Queue Jobs"| C2
    B2 -->|"💾 Store Vectors"| C3
    C1 -->|"🏗️ Provisions"| C2
    C1 -->|"🏗️ Provisions"| C3

    %% Add diagram title
    title[🔗 Component Relationships & Dependencies]
```

## 🌊 Data Flow Architecture

```mermaid
flowchart TD
    %% Define styles for different phases
    classDef uploadPhase fill:#e1f5fe,stroke:#01579b,stroke-width:2px,color:#01579b
    classDef processingPhase fill:#f3e5f5,stroke:#4a148c,stroke-width:2px,color:#4a148c
    classDef queryPhase fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px,color:#1b5e20
    classDef responsePhase fill:#fff3e0,stroke:#e65100,stroke-width:2px,color:#e65100

    %% Upload Pipeline
    A[📤 PDF Upload<br/>User Action]:::uploadPhase --> B[💾 Multer Storage<br/>File Handling]:::processingPhase
    B --> C[📋 BullMQ Job Queue<br/>Async Processing]:::processingPhase
    C --> D[👷 Background Worker<br/>Job Processor]:::processingPhase
    D --> E[📖 PDF Loader<br/>Content Extraction]:::processingPhase
    E --> F[✂️ Text Extraction<br/>Raw Text]:::processingPhase
    F --> G[🔪 Document Chunking<br/>Text Segments]:::processingPhase
    G --> H[🧠 OpenAI Embeddings<br/>Vector Generation]:::processingPhase
    H --> I[🧮 Vector Storage in Qdrant<br/>Similarity Search DB]:::processingPhase

    %% Query Pipeline
    J[💬 User Query<br/>Natural Language]:::queryPhase --> K[🧠 Query Embedding<br/>Vector Conversion]:::queryPhase
    K --> L[🔍 Vector Search<br/>Similarity Matching]:::queryPhase
    I -->|"📊 Similar Vectors"| L
    L --> M[📄 Relevant Documents<br/>Context Retrieval]:::queryPhase
    M --> N[📝 Context Injection<br/>Prompt Engineering]:::queryPhase
    N --> O[🎯 GPT-4 Generation<br/>AI Response]:::responsePhase
    O --> P[💬 AI Response<br/>Generated Answer]:::responsePhase
    P --> Q[🖥️ User Interface<br/>Display Result]:::responsePhase

    %% Add visual separators
    subgraph "📥 Document Processing Pipeline"
        B
        C
        D
        E
        F
        G
        H
        I
    end

    subgraph "🔍 Query & Response Pipeline"
        K
        L
        M
        N
        O
        P
        Q
    end
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
```

```markdown
## 🛠️ Technology Stack Diagram

```mermaid
graph TB
    %% Define styles for different technology layers
    classDef frontendTech fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    classDef backendTech fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    classDef aiTech fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
    classDef dataTech fill:#fff8e1,stroke:#f57c00,stroke-width:2px
    classDef infraTech fill:#fce4ec,stroke:#c2185b,stroke-width:2px

    subgraph "🌐 Frontend Stack"
        F1[⚛️ Next.js 15<br/>React Framework]:::frontendTech
        F2[⚛️ React 19<br/>UI Library]:::frontendTech
        F3[📘 TypeScript<br/>Type Safety]:::frontendTech
        F4[🎨 Tailwind CSS<br/>Styling]:::frontendTech
        F5[🔐 Clerk Auth<br/>Authentication]:::frontendTech
    end

    subgraph "⚙️ Backend Stack"
        B1[🟢 Node.js<br/>Runtime]:::backendTech
        B2[🚀 Express.js<br/>Web Framework]:::backendTech
        B3[📋 BullMQ<br/>Job Queue]:::backendTech
        B4[🔗 LangChain<br/>AI Orchestration]:::backendTech
    end

    subgraph "🤖 AI & ML"
        AI1[🎯 OpenAI GPT-4.1<br/>Text Generation]:::aiTech
        AI2[🧠 text-embedding-3-small<br/>Vector Embeddings]:::aiTech
    end

    subgraph "🗄️ Databases & Storage"
        DB1[🧮 Qdrant Vector DB<br/>Similarity Search]:::dataTech
        DB2[⚡ Redis/Valkey<br/>Caching & Queue]:::dataTech
        DB3[📁 Local File Storage<br/>PDF Documents]:::dataTech
    end

    subgraph "🏗️ Infrastructure"
        I1[🐳 Docker Compose<br/>Containerization]:::infraTech
        I2[💻 Local Development<br/>Environment]:::infraTech
    end

    %% Define technology relationships
    F1 -->|"🏗️ Built on"| F2
    F2 -->|"🔷 Enhanced by"| F3
    F3 -->|"🎨 Styled with"| F4
    F4 -->|"🔐 Secured by"| F5

    B1 -->|"🌐 Serves"| B2
    B2 -->|"📋 Uses"| B3
    B3 -->|"🔗 Integrates"| B4

    B4 -->|"🎯 Powers"| AI1
    B4 -->|"🧠 Uses"| AI2
    B3 -->|"📋 Stores jobs in"| DB2
    B4 -->|"💾 Stores vectors in"| DB1
    B4 -->|"📖 Processes"| DB3

    I1 -->|"🏗️ Orchestrates"| DB1
    I1 -->|"🏗️ Orchestrates"| DB2
    I2 -->|"🖥️ Hosts"| I1

    %% Add diagram title
    title[🔧 Complete Technology Ecosystem]
```
```

```markdown
# PDF RAG Architecture Diagrams

## 🏗️ System Architecture Overview

```mermaid
graph TB
    %% Define styles for different components
    classDef clientNode fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef backendNode fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    classDef externalNode fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px
    classDef infraNode fill:#fff3e0,stroke:#e65100,stroke-width:2px

    subgraph "🌐 Client (Next.js)"
        A[📤 File Upload<br/>Component]:::clientNode
        B[💬 Chat Component]:::clientNode
        C[🔐 Authentication]:::clientNode
    end

    subgraph "⚙️ Backend Services"
        D[🚀 Express Server]:::backendNode
        E[👷 BullMQ Worker]:::backendNode
        F[📋 Queue Manager]:::backendNode
    end

    subgraph "🔗 External Services"
        G[🤖 OpenAI API]:::externalNode
        H[🛡️ Clerk Auth]:::externalNode
    end

    subgraph "🗄️ Infrastructure"
        I[⚡ Redis/Valkey]:::infraNode
        J[🧮 Qdrant Vector DB]:::infraNode
        K[📁 File Storage]:::infraNode
    end

    %% Define connections with better labels
    A -->|"📄 Upload PDF"| D
    B -->|"💬 Chat Request"| D
    C -->|"🔐 Authenticate"| H
    D -->|"➕ Add Job"| F
    F -->|"📤 Queue Job"| I
    E -->|"⚙️ Process Job"| I
    E -->|"🧠 Generate Embeddings"| G
    E -->|"💾 Store Vectors"| J
    D -->|"🔍 Retrieve Vectors"| J
    D -->|"🎯 Generate Response"| G
    D -->|"💾 Store Files"| K
    E -->|"📖 Read Files"| K

    %% Add title
    title[📊 PDF RAG System Architecture]
```

## 🔄 RAG Pipeline Flow

```mermaid
sequenceDiagram
    %% Define participants with emojis and better names
    participant U as 👤 User
    participant F as 🌐 Frontend<br/>(Next.js)
    participant S as 🚀 Server<br/>(Express)
    participant Q as 📋 Queue<br/>(BullMQ)
    participant W as 👷 Worker<br/>(Background)
    participant V as 🧮 Vector DB<br/>(Qdrant)
    participant AI as 🤖 OpenAI<br/>(GPT-4)

    %% Document Upload Phase with visual separator
    box rgb(173, 216, 230) Document Upload Phase
    U->>F: 📤 Upload PDF file
    F->>S: POST /upload/pdf
    S->>S: 💾 Store file locally
    S->>Q: ➕ Add job to queue
    S->>F: ✅ Return upload success
    F->>U: 📋 Show upload confirmation
    end

    %% Background processing
    Q->>W: ⚙️ Process job from queue
    W->>W: 📖 Load PDF content
    W->>AI: 🧠 Generate text embeddings
    AI->>W: 📊 Return embeddings vector
    W->>V: 💾 Store embeddings in vector DB
    W->>Q: ✅ Mark job complete

    %% Chat Phase with visual separator
    box rgb(144, 238, 144) Chat Phase
    U->>F: 💬 Send chat message
    F->>S: GET /chat?message=...
    S->>AI: 🧠 Generate query embedding
    AI->>S: 📊 Return query embedding
    S->>V: 🔍 Search similar vectors
    V->>S: 📄 Return relevant documents
    S->>AI: 🎯 Generate response with context
    AI->>S: 💬 Return AI response
    S->>F: 📦 Return response + source docs
    F->>U: 🖥️ Display AI response
    end
```

## 🧩 Component Architecture

```mermaid
graph LR
    %% Define styles for different component types
    classDef frontendNode fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    classDef backendNode fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    classDef infraNode fill:#fff8e1,stroke:#f57c00,stroke-width:2px

    subgraph "🌐 Frontend Components"
        A1[📄 app/page.tsx<br/>Main Page]:::frontendNode
        A2[📤 components/file-upload.tsx<br/>File Upload]:::frontendNode
        A3[💬 components/chat.tsx<br/>Chat Interface]:::frontendNode
        A4[🏗️ app/layout.tsx<br/>Root Layout]:::frontendNode
        A5[🛡️ middleware.ts<br/>Auth Middleware]:::frontendNode
    end

    subgraph "⚙️ Backend Components"
        B1[🚀 server/index.js<br/>Express Server]:::backendNode
        B2[👷 server/worker.js<br/>Background Worker]:::backendNode
        B3[📦 package.json<br/>Dependencies]:::backendNode
    end

    subgraph "🗄️ Infrastructure"
        C1[🐳 docker-compose.yml<br/>Container Orchestration]:::infraNode
        C2[⚡ Redis/Valkey<br/>Job Queue]:::infraNode
        C3[🧮 Qdrant<br/>Vector Database]:::infraNode
    end

    %% Define connections with clear labels
    A4 -->|"📄 Renders"| A1
    A1 -->|"📤 Uses"| A2
    A1 -->|"💬 Uses"| A3
    A5 -->|"🔐 Protects"| A4

    A2 -->|"📨 HTTP Requests"| B1
    A3 -->|"💬 HTTP Requests"| B1
    B1 -->|"⚙️ Delegates Work"| B2
    B3 -->|"📦 Manages"| B1
    B3 -->|"📦 Manages"| B2

    B2 -->|"📋 Queue Jobs"| C2
    B2 -->|"💾 Store Vectors"| C3
    C1 -->|"🏗️ Provisions"| C2
    C1 -->|"🏗️ Provisions"| C3

    %% Add diagram title
    title[🔗 Component Relationships & Dependencies]
```

## 🌊 Data Flow Architecture

```mermaid
flowchart TD
    %% Define styles for different phases
    classDef uploadPhase fill:#e1f5fe,stroke:#01579b,stroke-width:2px,color:#01579b
    classDef processingPhase fill:#f3e5f5,stroke:#4a148c,stroke-width:2px,color:#4a148c
    classDef queryPhase fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px,color:#1b5e20
    classDef responsePhase fill:#fff3e0,stroke:#e65100,stroke-width:2px,color:#e65100

    %% Upload Pipeline
    A[📤 PDF Upload<br/>User Action]:::uploadPhase --> B[💾 Multer Storage<br/>File Handling]:::processingPhase
    B --> C[📋 BullMQ Job Queue<br/>Async Processing]:::processingPhase
    C --> D[👷 Background Worker<br/>Job Processor]:::processingPhase
    D --> E[📖 PDF Loader<br/>Content Extraction]:::processingPhase
    E --> F[✂️ Text Extraction<br/>Raw Text]:::processingPhase
    F --> G[🔪 Document Chunking<br/>Text Segments]:::processingPhase
    G --> H[🧠 OpenAI Embeddings<br/>Vector Generation]:::processingPhase
    H --> I[🧮 Vector Storage in Qdrant<br/>Similarity Search DB]:::processingPhase

    %% Query Pipeline
    J[💬 User Query<br/>Natural Language]:::queryPhase --> K[🧠 Query Embedding<br/>Vector Conversion]:::queryPhase
    K --> L[🔍 Vector Search<br/>Similarity Matching]:::queryPhase
    I -->|"📊 Similar Vectors"| L
    L --> M[📄 Relevant Documents<br/>Context Retrieval]:::queryPhase
    M --> N[📝 Context Injection<br/>Prompt Engineering]:::queryPhase
    N --> O[🎯 GPT-4 Generation<br/>AI Response]:::responsePhase
    O --> P[💬 AI Response<br/>Generated Answer]:::responsePhase
    P --> Q[🖥️ User Interface<br/>Display Result]:::responsePhase

    %% Add visual separators
    subgraph "📥 Document Processing Pipeline"
        B
        C
        D
        E
        F
        G
        H
        I
    end

    subgraph "🔍 Query & Response Pipeline"
        K
        L
        M
        N
        O
        P
        Q
    end
```

## 🛠️ Technology Stack Diagram

```mermaid
graph TB
    %% Define styles for different technology layers
    classDef frontendTech fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    classDef backendTech fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    classDef aiTech fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
    classDef dataTech fill:#fff8e1,stroke:#f57c00,stroke-width:2px
    classDef infraTech fill:#fce4ec,stroke:#c2185b,stroke-width:2px

    subgraph "🌐 Frontend Stack"
        F1[⚛️ Next.js 15<br/>React Framework]:::frontendTech
        F2[⚛️ React 19<br/>UI Library]:::frontendTech
        F3[📘 TypeScript<br/>Type Safety]:::frontendTech
        F4[🎨 Tailwind CSS<br/>Styling]:::frontendTech
        F5[🔐 Clerk Auth<br/>Authentication]:::frontendTech
    end

    subgraph "⚙️ Backend Stack"
        B1[🟢 Node.js<br/>Runtime]:::backendTech
        B2[🚀 Express.js<br/>Web Framework]:::backendTech
        B3[📋 BullMQ<br/>Job Queue]:::backendTech
        B4[🔗 LangChain<br/>AI Orchestration]:::backendTech
    end

    subgraph "🤖 AI & ML"
        AI1[🎯 OpenAI GPT-4.1<br/>Text Generation]:::aiTech
        AI2[🧠 text-embedding-3-small<br/>Vector Embeddings]:::aiTech
    end

    subgraph "🗄️ Databases & Storage"
        DB1[🧮 Qdrant Vector DB<br/>Similarity Search]:::dataTech
        DB2[⚡ Redis/Valkey<br/>Caching & Queue]:::dataTech
        DB3[📁 Local File Storage<br/>PDF Documents]:::dataTech
    end

    subgraph "🏗️ Infrastructure"
        I1[🐳 Docker Compose<br/>Containerization]:::infraTech
        I2[💻 Local Development<br/>Environment]:::infraTech
    end

    %% Define technology relationships
    F1 -->|"🏗️ Built on"| F2
    F2 -->|"🔷 Enhanced by"| F3
    F3 -->|"🎨 Styled with"| F4
    F4 -->|"🔐 Secured by"| F5

    B1 -->|"🌐 Serves"| B2
    B2 -->|"📋 Uses"| B3
    B3 -->|"🔗 Integrates"| B4

    B4 -->|"🎯 Powers"| AI1
    B4 -->|"🧠 Uses"| AI2
    B3 -->|"📋 Stores jobs in"| DB2
    B4 -->|"💾 Stores vectors in"| DB1
    B4 -->|"📖 Processes"| DB3

    I1 -->|"🏗️ Orchestrates"| DB1
    I1 -->|"🏗️ Orchestrates"| DB2
    I2 -->|"🖥️ Hosts"| I1

    %% Add diagram title
    title[🔧 Complete Technology Ecosystem]
```
```

Perfect! I've successfully transformed your markdown file with visually appealing mermaid graphs. Here's what I've enhanced:

## 🎨 **Visual Improvements Made:**

### 1. **🏗️ System Architecture Overview**
- Added **emojis** and **color-coded styling** for different components
- Enhanced node descriptions with icons and better labels
- Added **visual grouping** with styled borders
- Included a **diagram title** for better context

### 2. **🔄 RAG Pipeline Flow**
- Created a **sequence diagram** with **visual phase separators**
- Added **emojis** for each participant and action
- Used **color-coded boxes** to distinguish upload vs chat phases
- Enhanced message descriptions with relevant icons

### 3. **🧩 Component Architecture**
- **Color-coded** different component types (frontend, backend, infrastructure)
- Added **descriptive labels** and **emojis** for each component
- Enhanced **connection labels** with meaningful descriptions
- Added **subgraph grouping** for better organization

### 4. **🌊 Data Flow Architecture**
- **Phase-based color coding** (upload, processing, query, response)
- Added **pipeline grouping** with visual separators
- Enhanced **node descriptions** with icons and explanations
- Better **connection labels** showing data flow

### 5. **🛠️ Technology Stack Diagram**
- **Layer-based styling** for different technology categories
- Added **technology icons** and **descriptions**
- Enhanced **relationship labels** showing dependencies
- Added **Local File Storage** component that was missing

## 🚀 **Key Features Added:**
- **Consistent emoji usage** throughout all diagrams
- **Color-coded components** for easy identification
- **Enhanced labels** with descriptive text and icons
- **Visual grouping** with styled borders and backgrounds
- **Better connection descriptions** showing actual data flow
- **Professional styling** with proper spacing and formatting

Your architecture diagrams now look much more professional and visually engaging! The mermaid syntax is properly formatted and should render beautifully in any mermaid-compatible viewer or platform.

Would you like me to make any specific adjustments to the styling, colors, or content of any particular diagram?

---

**User**

well just show it here.
like show graph mermaid here in the chat by outputting them.

---

**Cursor**

Here are your enhanced mermaid diagrams! I'll show each one directly in the chat:

## 🏗️ System Architecture Overview

```mermaid
graph TB
    %% Define styles for different components
    classDef clientNode fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef backendNode fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    classDef externalNode fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px
    classDef infraNode fill:#fff3e0,stroke:#e65100,stroke-width:2px

    subgraph "🌐 Client (Next.js)"
        A[📤 File Upload<br/>Component]:::clientNode
        B[💬 Chat Component]:::clientNode
        C[🔐 Authentication]:::clientNode
    end

    subgraph "⚙️ Backend Services"
        D[🚀 Express Server]:::backendNode
        E[👷 BullMQ Worker]:::backendNode
        F[📋 Queue Manager]:::backendNode
    end

    subgraph "🔗 External Services"
        G[🤖 OpenAI API]:::externalNode
        H[🛡️ Clerk Auth]:::externalNode
    end

    subgraph "🗄️ Infrastructure"
        I[⚡ Redis/Valkey]:::infraNode
        J[🧮 Qdrant Vector DB]:::infraNode
        K[📁 File Storage]:::infraNode
    end

    %% Define connections with better labels
    A -->|"📄 Upload PDF"| D
    B -->|"💬 Chat Request"| D
    C -->|"🔐 Authenticate"| H
    D -->|"➕ Add Job"| F
    F -->|"📤 Queue Job"| I
    E -->|"⚙️ Process Job"| I
    E -->|"🧠 Generate Embeddings"| G
    E -->|"💾 Store Vectors"| J
    D -->|"🔍 Retrieve Vectors"| J
    D -->|"🎯 Generate Response"| G
    D -->|"💾 Store Files"| K
    E -->|"📖 Read Files"| K

    %% Add title
    title[📊 PDF RAG System Architecture]
```

## 🔄 RAG Pipeline Flow

```mermaid
sequenceDiagram
    %% Define participants with emojis and better names
    participant U as 👤 User
    participant F as 🌐 Frontend<br/>(Next.js)
    participant S as 🚀 Server<br/>(Express)
    participant Q as 📋 Queue<br/>(BullMQ)
    participant W as 👷 Worker<br/>(Background)
    participant V as 🧮 Vector DB<br/>(Qdrant)
    participant AI as 🤖 OpenAI<br/>(GPT-4)

    %% Document Upload Phase with visual separator
    box rgb(173, 216, 230) Document Upload Phase
    U->>F: 📤 Upload PDF file
    F->>S: POST /upload/pdf
    S->>S: 💾 Store file locally
    S->>Q: ➕ Add job to queue
    S->>F: ✅ Return upload success
    F->>U: 📋 Show upload confirmation
    end

    %% Background processing
    Q->>W: ⚙️ Process job from queue
    W->>W: 📖 Load PDF content
    W->>AI: 🧠 Generate text embeddings
    AI->>W: 📊 Return embeddings vector
    W->>V: 💾 Store embeddings in vector DB
    W->>Q: ✅ Mark job complete

    %% Chat Phase with visual separator
    box rgb(144, 238, 144) Chat Phase
    U->>F: 💬 Send chat message
    F->>S: GET /chat?message=...
    S->>AI: 🧠 Generate query embedding
    AI->>S: 📊 Return query embedding
    S->>V: 🔍 Search similar vectors
    V->>S: 📄 Return relevant documents
    S->>AI: 🎯 Generate response with context
    AI->>S: 💬 Return AI response
    S->>F: 📦 Return response + source docs
    F->>U: 🖥️ Display AI response
    end
```

## 🧩 Component Architecture

```mermaid
graph LR
    %% Define styles for different component types
    classDef frontendNode fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    classDef backendNode fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    classDef infraNode fill:#fff8e1,stroke:#f57c00,stroke-width:2px

    subgraph "🌐 Frontend Components"
        A1[📄 app/page.tsx<br/>Main Page]:::frontendNode
        A2[📤 components/file-upload.tsx<br/>File Upload]:::frontendNode
        A3[💬 components/chat.tsx<br/>Chat Interface]:::frontendNode
        A4[🏗️ app/layout.tsx<br/>Root Layout]:::frontendNode
        A5[🛡️ middleware.ts<br/>Auth Middleware]:::frontendNode
    end

    subgraph "⚙️ Backend Components"
        B1[🚀 server/index.js<br/>Express Server]:::backendNode
        B2[👷 server/worker.js<br/>Background Worker]:::backendNode
        B3[📦 package.json<br/>Dependencies]:::backendNode
    end

    subgraph "🗄️ Infrastructure"
        C1[🐳 docker-compose.yml<br/>Container Orchestration]:::infraNode
        C2[⚡ Redis/Valkey<br/>Job Queue]:::infraNode
        C3[🧮 Qdrant<br/>Vector Database]:::infraNode
    end

    %% Define connections with clear labels
    A4 -->|"📄 Renders"| A1
    A1 -->|"📤 Uses"| A2
    A1 -->|"💬 Uses"| A3
    A5 -->|"🔐 Protects"| A4

    A2 -->|"📨 HTTP Requests"| B1
    A3 -->|"💬 HTTP Requests"| B1
    B1 -->|"⚙️ Delegates Work"| B2
    B3 -->|"📦 Manages"| B1
    B3 -->|"📦 Manages"| B2

    B2 -->|"📋 Queue Jobs"| C2
    B2 -->|"💾 Store Vectors"| C3
    C1 -->|"🏗️ Provisions"| C2
    C1 -->|"🏗️ Provisions"| C3

    %% Add diagram title
    title[🔗 Component Relationships & Dependencies]
```

## 🌊 Data Flow Architecture

```mermaid
flowchart TD
    %% Define styles for different phases
    classDef uploadPhase fill:#e1f5fe,stroke:#01579b,stroke-width:2px,color:#01579b
    classDef processingPhase fill:#f3e5f5,stroke:#4a148c,stroke-width:2px,color:#4a148c
    classDef queryPhase fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px,color:#1b5e20
    classDef responsePhase fill:#fff3e0,stroke:#e65100,stroke-width:2px,color:#e65100

    %% Upload Pipeline
    A[📤 PDF Upload<br/>User Action]:::uploadPhase --> B[💾 Multer Storage<br/>File Handling]:::processingPhase
    B --> C[📋 BullMQ Job Queue<br/>Async Processing]:::processingPhase
    C --> D[👷 Background Worker<br/>Job Processor]:::processingPhase
    D --> E[📖 PDF Loader<br/>Content Extraction]:::processingPhase
    E --> F[✂️ Text Extraction<br/>Raw Text]:::processingPhase
    F --> G[🔪 Document Chunking<br/>Text Segments]:::processingPhase
    G --> H[🧠 OpenAI Embeddings<br/>Vector Generation]:::processingPhase
    H --> I[🧮 Vector Storage in Qdrant<br/>Similarity Search DB]:::processingPhase

    %% Query Pipeline
    J[💬 User Query<br/>Natural Language]:::queryPhase --> K[🧠 Query Embedding<br/>Vector Conversion]:::queryPhase
    K --> L[🔍 Vector Search<br/>Similarity Matching]:::queryPhase
    I -->|"📊 Similar Vectors"| L
    L --> M[📄 Relevant Documents<br/>Context Retrieval]:::queryPhase
    M --> N[📝 Context Injection<br/>Prompt Engineering]:::queryPhase
    N --> O[🎯 GPT-4 Generation<br/>AI Response]:::responsePhase
    O --> P[💬 AI Response<br/>Generated Answer]:::responsePhase
    P --> Q[🖥️ User Interface<br/>Display Result]:::responsePhase

    %% Add visual separators
    subgraph "📥 Document Processing Pipeline"
        B
        C
        D
        E
        F
        G
        H
        I
    end

    subgraph "🔍 Query & Response Pipeline"
        K
        L
        M
        N
        O
        P
        Q
    end
```

## 🛠️ Technology Stack Diagram

```mermaid
graph TB
    %% Define styles for different technology layers
    classDef frontendTech fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    classDef backendTech fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    classDef aiTech fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
    classDef dataTech fill:#fff8e1,stroke:#f57c00,stroke-width:2px
    classDef infraTech fill:#fce4ec,stroke:#c2185b,stroke-width:2px

    subgraph "🌐 Frontend Stack"
        F1[⚛️ Next.js 15<br/>React Framework]:::frontendTech
        F2[⚛️ React 19<br/>UI Library]:::frontendTech
        F3[📘 TypeScript<br/>Type Safety]:::frontendTech
        F4[🎨 Tailwind CSS<br/>Styling]:::frontendTech
        F5[🔐 Clerk Auth<br/>Authentication]:::frontendTech
    end

    subgraph "⚙️ Backend Stack"
        B1[🟢 Node.js<br/>Runtime]:::backendTech
        B2[🚀 Express.js<br/>Web Framework]:::backendTech
        B3[📋 BullMQ<br/>Job Queue]:::backendTech
        B4[🔗 LangChain<br/>AI Orchestration]:::backendTech
    end

    subgraph "🤖 AI & ML"
        AI1[🎯 OpenAI GPT-4.1<br/>Text Generation]:::aiTech
        AI2[🧠 text-embedding-3-small<br/>Vector Embeddings]:::aiTech
    end

    subgraph "🗄️ Databases & Storage"
        DB1[🧮 Qdrant Vector DB<br/>Similarity Search]:::dataTech
        DB2[⚡ Redis/Valkey<br/>Caching & Queue]:::dataTech
        DB3[📁 Local File Storage<br/>PDF Documents]:::dataTech
    end

    subgraph "🏗️ Infrastructure"
        I1[🐳 Docker Compose<br/>Containerization]:::infraTech
        I2[💻 Local Development<br/>Environment]:::infraTech
    end

    %% Define technology relationships
    F1 -->|"🏗️ Built on"| F2
    F2 -->|"🔷 Enhanced by"| F3
    F3 -->|"🎨 Styled with"| F4
    F4 -->|"🔐 Secured by"| F5

    B1 -->|"🌐 Serves"| B2
    B2 -->|"📋 Uses"| B3
    B3 -->|"🔗 Integrates"| B4

    B4 -->|"🎯 Powers"| AI1
    B4 -->|"🧠 Uses"| AI2
    B3 -->|"📋 Stores jobs in"| DB2
    B4 -->|"💾 Stores vectors in"| DB1
    B4 -->|"📖 Processes"| DB3

    I1 -->|"🏗️ Orchestrates"| DB1
    I1 -->|"🏗️ Orchestrates"| DB2
    I2 -->|"🖥️ Hosts"| I1

    %% Add diagram title
    title[🔧 Complete Technology Ecosystem]
```

There you go! These are your enhanced mermaid diagrams with:
- 🎨 **Color-coded components** for easy identification
- 📊 **Emojis and icons** for visual appeal  
- 🔗 **Clear connection labels** showing data flow
- 📦 **Better organization** with subgraphs and styling
- 🎯 **Professional appearance** with proper spacing and formatting

Each diagram should render as a beautiful, interactive graph directly in the chat interface!

```plaintext
graph TB
    %% Define styles for different components
    classDef clientNode fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef backendNode fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    classDef externalNode fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px
    classDef infraNode fill:#fff3e0,stroke:#e65100,stroke-width:2px

    subgraph "🌐 Client (Next.js)"
        A[📤 File Upload<br/>Component]:::clientNode
        B[💬 Chat Component]:::clientNode
        C[🔐 Authentication]:::clientNode
    end

    subgraph "⚙️ Backend Services"
        D[🚀 Express Server]:::backendNode
        E[👷 BullMQ Worker]:::backendNode
        F[📋 Queue Manager]:::backendNode
    end

    subgraph "🔗 External Services"
        G[🤖 OpenAI API]:::externalNode
        H[🛡️ Clerk Auth]:::externalNode
    end

    subgraph "🗄️ Infrastructure"
        I[⚡ Redis/Valkey]:::infraNode
        J[🧮 Qdrant Vector DB]:::infraNode
        K[📁 File Storage]:::infraNode
    end

    %% Define connections with better labels
    A -->|"📄 Upload PDF"| D
    B -->|"💬 Chat Request"| D
    C -->|"🔐 Authenticate"| H
    D -->|"➕ Add Job"| F
    F -->|"📤 Queue Job"| I
    E -->|"⚙️ Process Job"| I
    E -->|"🧠 Generate Embeddings"| G
    E -->|"💾 Store Vectors"| J
    D -->|"🔍 Retrieve Vectors"| J
    D -->|"🎯 Generate Response"| G
    D -->|"💾 Store Files"| K
    E -->|"📖 Read Files"| K

    %% Add title
    title[📊 PDF RAG System Architecture]
```

```plaintext
sequenceDiagram
    %% Define participants with emojis and better names
    participant U as 👤 User
    participant F as 🌐 Frontend<br/>(Next.js)
    participant S as 🚀 Server<br/>(Express)
    participant Q as 📋 Queue<br/>(BullMQ)
    participant W as 👷 Worker<br/>(Background)
    participant V as 🧮 Vector DB<br/>(Qdrant)
    participant AI as 🤖 OpenAI<br/>(GPT-4)

    %% Document Upload Phase with visual separator
    box rgb(173, 216, 230) Document Upload Phase
    U->>F: 📤 Upload PDF file
    F->>S: POST /upload/pdf
    S->>S: 💾 Store file locally
    S->>Q: ➕ Add job to queue
    S->>F: ✅ Return upload success
    F->>U: 📋 Show upload confirmation
    end

    %% Background processing
    Q->>W: ⚙️ Process job from queue
    W->>W: 📖 Load PDF content
    W->>AI: 🧠 Generate text embeddings
    AI->>W: 📊 Return embeddings vector
    W->>V: 💾 Store embeddings in vector DB
    W->>Q: ✅ Mark job complete

    %% Chat Phase with visual separator
    box rgb(144, 238, 144) Chat Phase
    U->>F: 💬 Send chat message
    F->>S: GET /chat?message=...
    S->>AI: 🧠 Generate query embedding
    AI->>S: 📊 Return query embedding
    S->>V: 🔍 Search similar vectors
    V->>S: 📄 Return relevant documents
    S->>AI: 🎯 Generate response with context
    AI->>S: 💬 Return AI response
    S->>F: 📦 Return response + source docs
    F->>U: 🖥️ Display AI response
    end
```

```plaintext
graph LR
    %% Define styles for different component types
    classDef frontendNode fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    classDef backendNode fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    classDef infraNode fill:#fff8e1,stroke:#f57c00,stroke-width:2px

    subgraph "🌐 Frontend Components"
        A1[📄 app/page.tsx<br/>Main Page]:::frontendNode
        A2[📤 components/file-upload.tsx<br/>File Upload]:::frontendNode
        A3[💬 components/chat.tsx<br/>Chat Interface]:::frontendNode
        A4[🏗️ app/layout.tsx<br/>Root Layout]:::frontendNode
        A5[🛡️ middleware.ts<br/>Auth Middleware]:::frontendNode
    end

    subgraph "⚙️ Backend Components"
        B1[🚀 server/index.js<br/>Express Server]:::backendNode
        B2[👷 server/worker.js<br/>Background Worker]:::backendNode
        B3[📦 package.json<br/>Dependencies]:::backendNode
    end

    subgraph "🗄️ Infrastructure"
        C1[🐳 docker-compose.yml<br/>Container Orchestration]:::infraNode
        C2[⚡ Redis/Valkey<br/>Job Queue]:::infraNode
        C3[🧮 Qdrant<br/>Vector Database]:::infraNode
    end

    %% Define connections with clear labels
    A4 -->|"📄 Renders"| A1
    A1 -->|"📤 Uses"| A2
    A1 -->|"💬 Uses"| A3
    A5 -->|"🔐 Protects"| A4

    A2 -->|"📨 HTTP Requests"| B1
    A3 -->|"💬 HTTP Requests"| B1
    B1 -->|"⚙️ Delegates Work"| B2
    B3 -->|"📦 Manages"| B1
    B3 -->|"📦 Manages"| B2

    B2 -->|"📋 Queue Jobs"| C2
    B2 -->|"💾 Store Vectors"| C3
    C1 -->|"🏗️ Provisions"| C2
    C1 -->|"🏗️ Provisions"| C3

    %% Add diagram title
    title[🔗 Component Relationships & Dependencies]
```

```plaintext
flowchart TD
    %% Define styles for different phases
    classDef uploadPhase fill:#e1f5fe,stroke:#01579b,stroke-width:2px,color:#01579b
    classDef processingPhase fill:#f3e5f5,stroke:#4a148c,stroke-width:2px,color:#4a148c
    classDef queryPhase fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px,color:#1b5e20
    classDef responsePhase fill:#fff3e0,stroke:#e65100,stroke-width:2px,color:#e65100

    %% Upload Pipeline
    A[📤 PDF Upload<br/>User Action]:::uploadPhase --> B[💾 Multer Storage<br/>File Handling]:::processingPhase
    B --> C[📋 BullMQ Job Queue<br/>Async Processing]:::processingPhase
    C --> D[👷 Background Worker<br/>Job Processor]:::processingPhase
    D --> E[📖 PDF Loader<br/>Content Extraction]:::processingPhase
    E --> F[✂️ Text Extraction<br/>Raw Text]:::processingPhase
    F --> G[🔪 Document Chunking<br/>Text Segments]:::processingPhase
    G --> H[🧠 OpenAI Embeddings<br/>Vector Generation]:::processingPhase
    H --> I[🧮 Vector Storage in Qdrant<br/>Similarity Search DB]:::processingPhase

    %% Query Pipeline
    J[💬 User Query<br/>Natural Language]:::queryPhase --> K[🧠 Query Embedding<br/>Vector Conversion]:::queryPhase
    K --> L[🔍 Vector Search<br/>Similarity Matching]:::queryPhase
    I -->|"📊 Similar Vectors"| L
    L --> M[📄 Relevant Documents<br/>Context Retrieval]:::queryPhase
    M --> N[📝 Context Injection<br/>Prompt Engineering]:::queryPhase
    N --> O[🎯 GPT-4 Generation<br/>AI Response]:::responsePhase
    O --> P[💬 AI Response<br/>Generated Answer]:::responsePhase
    P --> Q[🖥️ User Interface<br/>Display Result]:::responsePhase

    %% Add visual separators
    subgraph "📥 Document Processing Pipeline"
        B
        C
        D
        E
        F
        G
        H
        I
    end

    subgraph "🔍 Query & Response Pipeline"
        K
        L
        M
        N
        O
        P
        Q
    end
```

```plaintext
graph TB
    %% Define styles for different technology layers
    classDef frontendTech fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    classDef backendTech fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    classDef aiTech fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
    classDef dataTech fill:#fff8e1,stroke:#f57c00,stroke-width:2px
    classDef infraTech fill:#fce4ec,stroke:#c2185b,stroke-width:2px

    subgraph "🌐 Frontend Stack"
        F1[⚛️ Next.js 15<br/>React Framework]:::frontendTech
        F2[⚛️ React 19<br/>UI Library]:::frontendTech
        F3[📘 TypeScript<br/>Type Safety]:::frontendTech
        F4[🎨 Tailwind CSS<br/>Styling]:::frontendTech
        F5[🔐 Clerk Auth<br/>Authentication]:::frontendTech
    end

    subgraph "⚙️ Backend Stack"
        B1[🟢 Node.js<br/>Runtime]:::backendTech
        B2[🚀 Express.js<br/>Web Framework]:::backendTech
        B3[📋 BullMQ<br/>Job Queue]:::backendTech
        B4[🔗 LangChain<br/>AI Orchestration]:::backendTech
    end

    subgraph "🤖 AI & ML"
        AI1[🎯 OpenAI GPT-4.1<br/>Text Generation]:::aiTech
        AI2[🧠 text-embedding-3-small<br/>Vector Embeddings]:::aiTech
    end

    subgraph "🗄️ Databases & Storage"
        DB1[🧮 Qdrant Vector DB<br/>Similarity Search]:::dataTech
        DB2[⚡ Redis/Valkey<br/>Caching & Queue]:::dataTech
        DB3[📁 Local File Storage<br/>PDF Documents]:::dataTech
    end

    subgraph "🏗️ Infrastructure"
        I1[🐳 Docker Compose<br/>Containerization]:::infraTech
        I2[💻 Local Development<br/>Environment]:::infraTech
    end

    %% Define technology relationships
    F1 -->|"🏗️ Built on"| F2
    F2 -->|"🔷 Enhanced by"| F3
    F3 -->|"🎨 Styled with"| F4
    F4 -->|"🔐 Secured by"| F5

    B1 -->|"🌐 Serves"| B2
    B2 -->|"📋 Uses"| B3
    B3 -->|"🔗 Integrates"| B4

    B4 -->|"🎯 Powers"| AI1
    B4 -->|"🧠 Uses"| AI2
    B3 -->|"📋 Stores jobs in"| DB2
    B4 -->|"💾 Stores vectors in"| DB1
    B4 -->|"📖 Processes"| DB3

    I1 -->|"🏗️ Orchestrates"| DB1
    I1 -->|"🏗️ Orchestrates"| DB2
    I2 -->|"🖥️ Hosts"| I1

    %% Add diagram title
    title[🔧 Complete Technology Ecosystem]
```

---

**User**

pls use some better colors so that the text is visible.

---

**Cursor**

```markdown
# PDF RAG Architecture Diagrams

## 🏗️ System Architecture Overview

```mermaid
graph TB
    %% Define styles for different components with better contrast
    classDef clientNode fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#0d47a1
    classDef backendNode fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#4a148c
    classDef externalNode fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px,color:#1b5e20
    classDef infraNode fill:#fff3e0,stroke:#f57c00,stroke-width:2px,color:#e65100

    subgraph "🌐 Client (Next.js)"
        A[📤 File Upload<br/>Component]:::clientNode
        B[💬 Chat Component]:::clientNode
        C[🔐 Authentication]:::clientNode
    end

    subgraph "⚙️ Backend Services"
        D[🚀 Express Server]:::backendNode
        E[👷 BullMQ Worker]:::backendNode
        F[📋 Queue Manager]:::backendNode
    end

    subgraph "🔗 External Services"
        G[🤖 OpenAI API]:::externalNode
        H[🛡️ Clerk Auth]:::externalNode
    end

    subgraph "🗄️ Infrastructure"
        I[⚡ Redis/Valkey]:::infraNode
        J[🧮 Qdrant Vector DB]:::infraNode
        K[📁 File Storage]:::infraNode
    end

    %% Define connections with better labels
    A -->|"📄 Upload PDF"| D
    B -->|"💬 Chat Request"| D
    C -->|"🔐 Authenticate"| H
    D -->|"➕ Add Job"| F
    F -->|"📤 Queue Job"| I
    E -->|"⚙️ Process Job"| I
    E -->|"🧠 Generate Embeddings"| G
    E -->|"💾 Store Vectors"| J
    D -->|"🔍 Retrieve Vectors"| J
    D -->|"🎯 Generate Response"| G
    D -->|"💾 Store Files"| K
    E -->|"📖 Read Files"| K

    %% Add title
    title[📊 PDF RAG System Architecture]
```

## 🔄 RAG Pipeline Flow

```mermaid
sequenceDiagram
    %% Define participants with emojis and better names
    participant U as 👤 User
    participant F as 🌐 Frontend<br/>(Next.js)
    participant S as 🚀 Server<br/>(Express)
    participant Q as 📋 Queue<br/>(BullMQ)
    participant W as 👷 Worker<br/>(Background)
    participant V as 🧮 Vector DB<br/>(Qdrant)
    participant AI as 🤖 OpenAI<br/>(GPT-4)

    %% Document Upload Phase with visual separator
    box rgb(173, 216, 230) Document Upload Phase
    U->>F: 📤 Upload PDF file
    F->>S: POST /upload/pdf
    S->>S: 💾 Store file locally
    S->>Q: ➕ Add job to queue
    S->>F: ✅ Return upload success
    F->>U: 📋 Show upload confirmation
    end

    %% Background processing
    Q->>W: ⚙️ Process job from queue
    W->>W: 📖 Load PDF content
    W->>AI: 🧠 Generate text embeddings
    AI->>W: 📊 Return embeddings vector
    W->>V: 💾 Store embeddings in vector DB
    W->>Q: ✅ Mark job complete

    %% Chat Phase with visual separator
    box rgb(144, 238, 144) Chat Phase
    U->>F: 💬 Send chat message
    F->>S: GET /chat?message=...
    S->>AI: 🧠 Generate query embedding
    AI->>S: 📊 Return query embedding
    S->>V: 🔍 Search similar vectors
    V->>S: 📄 Return relevant documents
    S->>AI: 🎯 Generate response with context
    AI->>S: 💬 Return AI response
    S->>F: 📦 Return response + source docs
    F->>U: 🖥️ Display AI response
    end
```

## 🧩 Component Architecture

```mermaid
graph LR
    %% Define styles for different component types
    classDef frontendNode fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    classDef backendNode fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    classDef infraNode fill:#fff8e1,stroke:#f57c00,stroke-width:2px

    subgraph "🌐 Frontend Components"
        A1[📄 app/page.tsx<br/>Main Page]:::frontendNode
        A2[📤 components/file-upload.tsx<br/>File Upload]:::frontendNode
        A3[💬 components/chat.tsx<br/>Chat Interface]:::frontendNode
        A4[🏗️ app/layout.tsx<br/>Root Layout]:::frontendNode
        A5[🛡️ middleware.ts<br/>Auth Middleware]:::frontendNode
    end

    subgraph "⚙️ Backend Components"
        B1[🚀 server/index.js<br/>Express Server]:::backendNode
        B2[👷 server/worker.js<br/>Background Worker]:::backendNode
        B3[📦 package.json<br/>Dependencies]:::backendNode
    end

    subgraph "🗄️ Infrastructure"
        C1[🐳 docker-compose.yml<br/>Container Orchestration]:::infraNode
        C2[⚡ Redis/Valkey<br/>Job Queue]:::infraNode
        C3[🧮 Qdrant<br/>Vector Database]:::infraNode
    end

    %% Define connections with clear labels
    A4 -->|"📄 Renders"| A1
    A1 -->|"📤 Uses"| A2
    A1 -->|"💬 Uses"| A3
    A5 -->|"🔐 Protects"| A4

    A2 -->|"📨 HTTP Requests"| B1
    A3 -->|"💬 HTTP Requests"| B1
    B1 -->|"⚙️ Delegates Work"| B2
    B3 -->|"📦 Manages"| B1
    B3 -->|"📦 Manages"| B2

    B2 -->|"📋 Queue Jobs"| C2
    B2 -->|"💾 Store Vectors"| C3
    C1 -->|"🏗️ Provisions"| C2
    C1 -->|"🏗️ Provisions"| C3

    %% Add diagram title
    title[🔗 Component Relationships & Dependencies]
```

## 🌊 Data Flow Architecture

```mermaid
flowchart TD
    %% Define styles for different phases
    classDef uploadPhase fill:#e1f5fe,stroke:#01579b,stroke-width:2px,color:#01579b
    classDef processingPhase fill:#f3e5f5,stroke:#4a148c,stroke-width:2px,color:#4a148c
    classDef queryPhase fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px,color:#1b5e20
    classDef responsePhase fill:#fff3e0,stroke:#e65100,stroke-width:2px,color:#e65100

    %% Upload Pipeline
    A[📤 PDF Upload<br/>User Action]:::uploadPhase --> B[💾 Multer Storage<br/>File Handling]:::processingPhase
    B --> C[📋 BullMQ Job Queue<br/>Async Processing]:::processingPhase
    C --> D[👷 Background Worker<br/>Job Processor]:::processingPhase
    D --> E[📖 PDF Loader<br/>Content Extraction]:::processingPhase
    E --> F[✂️ Text Extraction<br/>Raw Text]:::processingPhase
    F --> G[🔪 Document Chunking<br/>Text Segments]:::processingPhase
    G --> H[🧠 OpenAI Embeddings<br/>Vector Generation]:::processingPhase
    H --> I[🧮 Vector Storage in Qdrant<br/>Similarity Search DB]:::processingPhase

    %% Query Pipeline
    J[💬 User Query<br/>Natural Language]:::queryPhase --> K[🧠 Query Embedding<br/>Vector Conversion]:::queryPhase
    K --> L[🔍 Vector Search<br/>Similarity Matching]:::queryPhase
    I -->|"📊 Similar Vectors"| L
    L --> M[📄 Relevant Documents<br/>Context Retrieval]:::queryPhase
    M --> N[📝 Context Injection<br/>Prompt Engineering]:::queryPhase
    N --> O[🎯 GPT-4 Generation<br/>AI Response]:::responsePhase
    O --> P[💬 AI Response<br/>Generated Answer]:::responsePhase
    P --> Q[🖥️ User Interface<br/>Display Result]:::responsePhase

    %% Add visual separators
    subgraph "📥 Document Processing Pipeline"
        B
        C
        D
        E
        F
        G
        H
        I
    end

    subgraph "🔍 Query & Response Pipeline"
        K
        L
        M
        N
        O
        P
        Q
    end
```

## 🛠️ Technology Stack Diagram

```mermaid
graph TB
    %% Define styles for different technology layers
    classDef frontendTech fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    classDef backendTech fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    classDef aiTech fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
    classDef dataTech fill:#fff8e1,stroke:#f57c00,stroke-width:2px
    classDef infraTech fill:#fce4ec,stroke:#c2185b,stroke-width:2px

    subgraph "🌐 Frontend Stack"
        F1[⚛️ Next.js 15<br/>React Framework]:::frontendTech
        F2[⚛️ React 19<br/>UI Library]:::frontendTech
        F3[📘 TypeScript<br/>Type Safety]:::frontendTech
        F4[🎨 Tailwind CSS<br/>Styling]:::frontendTech
        F5[🔐 Clerk Auth<br/>Authentication]:::frontendTech
    end

    subgraph "⚙️ Backend Stack"
        B1[🟢 Node.js<br/>Runtime]:::backendTech
        B2[🚀 Express.js<br/>Web Framework]:::backendTech
        B3[📋 BullMQ<br/>Job Queue]:::backendTech
        B4[🔗 LangChain<br/>AI Orchestration]:::backendTech
    end

    subgraph "🤖 AI & ML"
        AI1[🎯 OpenAI GPT-4.1<br/>Text Generation]:::aiTech
        AI2[🧠 text-embedding-3-small<br/>Vector Embeddings]:::aiTech
    end

    subgraph "🗄️ Databases & Storage"
        DB1[🧮 Qdrant Vector DB<br/>Similarity Search]:::dataTech
        DB2[⚡ Redis/Valkey<br/>Caching & Queue]:::dataTech
        DB3[📁 Local File Storage<br/>PDF Documents]:::dataTech
    end

    subgraph "🏗️ Infrastructure"
        I1[🐳 Docker Compose<br/>Containerization]:::infraTech
        I2[💻 Local Development<br/>Environment]:::infraTech
    end

    %% Define technology relationships
    F1 -->|"🏗️ Built on"| F2
    F2 -->|"🔷 Enhanced by"| F3
    F3 -->|"🎨 Styled with"| F4
    F4 -->|"🔐 Secured by"| F5

    B1 -->|"🌐 Serves"| B2
    B2 -->|"📋 Uses"| B3
    B3 -->|"🔗 Integrates"| B4

    B4 -->|"🎯 Powers"| AI1
    B4 -->|"🧠 Uses"| AI2
    B3 -->|"📋 Stores jobs in"| DB2
    B4 -->|"💾 Stores vectors in"| DB1
    B4 -->|"📖 Processes"| DB3

    I1 -->|"🏗️ Orchestrates"| DB1
    I1 -->|"🏗️ Orchestrates"| DB2
    I2 -->|"🖥️ Hosts"| I1

    %% Add diagram title
    title[🔧 Complete Technology Ecosystem]
```
```

```markdown
# PDF RAG Architecture Diagrams

## 🏗️ System Architecture Overview

```mermaid
graph TB
    %% Define styles for different components with better contrast
    classDef clientNode fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#0d47a1
    classDef backendNode fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#4a148c
    classDef externalNode fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px,color:#1b5e20
    classDef infraNode fill:#fff3e0,stroke:#f57c00,stroke-width:2px,color:#e65100

    subgraph "🌐 Client (Next.js)"
        A[📤 File Upload<br/>Component]:::clientNode
        B[💬 Chat Component]:::clientNode
        C[🔐 Authentication]:::clientNode
    end

    subgraph "⚙️ Backend Services"
        D[🚀 Express Server]:::backendNode
        E[👷 BullMQ Worker]:::backendNode
        F[📋 Queue Manager]:::backendNode
    end

    subgraph "🔗 External Services"
        G[🤖 OpenAI API]:::externalNode
        H[🛡️ Clerk Auth]:::externalNode
    end

    subgraph "🗄️ Infrastructure"
        I[⚡ Redis/Valkey]:::infraNode
        J[🧮 Qdrant Vector DB]:::infraNode
        K[📁 File Storage]:::infraNode
    end

    %% Define connections with better labels
    A -->|"📄 Upload PDF"| D
    B -->|"💬 Chat Request"| D
    C -->|"🔐 Authenticate"| H
    D -->|"➕ Add Job"| F
    F -->|"📤 Queue Job"| I
    E -->|"⚙️ Process Job"| I
    E -->|"🧠 Generate Embeddings"| G
    E -->|"💾 Store Vectors"| J
    D -->|"🔍 Retrieve Vectors"| J
    D -->|"🎯 Generate Response"| G
    D -->|"💾 Store Files"| K
    E -->|"📖 Read Files"| K

    %% Add title
    title[📊 PDF RAG System Architecture]
```

## 🔄 RAG Pipeline Flow

```mermaid
sequenceDiagram
    %% Define participants with emojis and better names
    participant U as 👤 User
    participant F as 🌐 Frontend<br/>(Next.js)
    participant S as 🚀 Server<br/>(Express)
    participant Q as 📋 Queue<br/>(BullMQ)
    participant W as 👷 Worker<br/>(Background)
    participant V as 🧮 Vector DB<br/>(Qdrant)
    participant AI as 🤖 OpenAI<br/>(GPT-4)

    %% Document Upload Phase with visual separator
    box rgb(173, 216, 230) Document Upload Phase
    U->>F: 📤 Upload PDF file
    F->>S: POST /upload/pdf
    S->>S: 💾 Store file locally
    S->>Q: ➕ Add job to queue
    S->>F: ✅ Return upload success
    F->>U: 📋 Show upload confirmation
    end

    %% Background processing
    Q->>W: ⚙️ Process job from queue
    W->>W: 📖 Load PDF content
    W->>AI: 🧠 Generate text embeddings
    AI->>W: 📊 Return embeddings vector
    W->>V: 💾 Store embeddings in vector DB
    W->>Q: ✅ Mark job complete

    %% Chat Phase with visual separator
    box rgb(144, 238, 144) Chat Phase
    U->>F: 💬 Send chat message
    F->>S: GET /chat?message=...
    S->>AI: 🧠 Generate query embedding
    AI->>S: 📊 Return query embedding
    S->>V: 🔍 Search similar vectors
    V->>S: 📄 Return relevant documents
    S->>AI: 🎯 Generate response with context
    AI->>S: 💬 Return AI response
    S->>F: 📦 Return response + source docs
    F->>U: 🖥️ Display AI response
    end
```

## 🧩 Component Architecture

```mermaid
graph LR
    %% Define styles for different component types with better contrast
    classDef frontendNode fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#0d47a1
    classDef backendNode fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#4a148c
    classDef infraNode fill:#fff8e1,stroke:#f57c00,stroke-width:2px,color:#e65100

    subgraph "🌐 Frontend Components"
        A1[📄 app/page.tsx<br/>Main Page]:::frontendNode
        A2[📤 components/file-upload.tsx<br/>File Upload]:::frontendNode
        A3[💬 components/chat.tsx<br/>Chat Interface]:::frontendNode
        A4[🏗️ app/layout.tsx<br/>Root Layout]:::frontendNode
        A5[🛡️ middleware.ts<br/>Auth Middleware]:::frontendNode
    end

    subgraph "⚙️ Backend Components"
        B1[🚀 server/index.js<br/>Express Server]:::backendNode
        B2[👷 server/worker.js<br/>Background Worker]:::backendNode
        B3[📦 package.json<br/>Dependencies]:::backendNode
    end

    subgraph "🗄️ Infrastructure"
        C1[🐳 docker-compose.yml<br/>Container Orchestration]:::infraNode
        C2[⚡ Redis/Valkey<br/>Job Queue]:::infraNode
        C3[🧮 Qdrant<br/>Vector Database]:::infraNode
    end

    %% Define connections with clear labels
    A4 -->|"📄 Renders"| A1
    A1 -->|"📤 Uses"| A2
    A1 -->|"💬 Uses"| A3
    A5 -->|"🔐 Protects"| A4

    A2 -->|"📨 HTTP Requests"| B1
    A3 -->|"💬 HTTP Requests"| B1
    B1 -->|"⚙️ Delegates Work"| B2
    B3 -->|"📦 Manages"| B1
    B3 -->|"📦 Manages"| B2

    B2 -->|"📋 Queue Jobs"| C2
    B2 -->|"💾 Store Vectors"| C3
    C1 -->|"🏗️ Provisions"| C2
    C1 -->|"🏗️ Provisions"| C3

    %% Add diagram title
    title[🔗 Component Relationships & Dependencies]
```

## 🌊 Data Flow Architecture

```mermaid
flowchart TD
    %% Define styles for different phases
    classDef uploadPhase fill:#e1f5fe,stroke:#01579b,stroke-width:2px,color:#01579b
    classDef processingPhase fill:#f3e5f5,stroke:#4a148c,stroke-width:2px,color:#4a148c
    classDef queryPhase fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px,color:#1b5e20
    classDef responsePhase fill:#fff3e0,stroke:#e65100,stroke-width:2px,color:#e65100

    %% Upload Pipeline
    A[📤 PDF Upload<br/>User Action]:::uploadPhase --> B[💾 Multer Storage<br/>File Handling]:::processingPhase
    B --> C[📋 BullMQ Job Queue<br/>Async Processing]:::processingPhase
    C --> D[👷 Background Worker<br/>Job Processor]:::processingPhase
    D --> E[📖 PDF Loader<br/>Content Extraction]:::processingPhase
    E --> F[✂️ Text Extraction<br/>Raw Text]:::processingPhase
    F --> G[🔪 Document Chunking<br/>Text Segments]:::processingPhase
    G --> H[🧠 OpenAI Embeddings<br/>Vector Generation]:::processingPhase
    H --> I[🧮 Vector Storage in Qdrant<br/>Similarity Search DB]:::processingPhase

    %% Query Pipeline
    J[💬 User Query<br/>Natural Language]:::queryPhase --> K[🧠 Query Embedding<br/>Vector Conversion]:::queryPhase
    K --> L[🔍 Vector Search<br/>Similarity Matching]:::queryPhase
    I -->|"📊 Similar Vectors"| L
    L --> M[📄 Relevant Documents<br/>Context Retrieval]:::queryPhase
    M --> N[📝 Context Injection<br/>Prompt Engineering]:::queryPhase
    N --> O[🎯 GPT-4 Generation<br/>AI Response]:::responsePhase
    O --> P[💬 AI Response<br/>Generated Answer]:::responsePhase
    P --> Q[🖥️ User Interface<br/>Display Result]:::responsePhase

    %% Add visual separators
    subgraph "📥 Document Processing Pipeline"
        B
        C
        D
        E
        F
        G
        H
        I
    end

    subgraph "🔍 Query & Response Pipeline"
        K
        L
        M
        N
        O
        P
        Q
    end
```

## 🛠️ Technology Stack Diagram

```mermaid
graph TB
    %% Define styles for different technology layers
    classDef frontendTech fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    classDef backendTech fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    classDef aiTech fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
    classDef dataTech fill:#fff8e1,stroke:#f57c00,stroke-width:2px
    classDef infraTech fill:#fce4ec,stroke:#c2185b,stroke-width:2px

    subgraph "🌐 Frontend Stack"
        F1[⚛️ Next.js 15<br/>React Framework]:::frontendTech
        F2[⚛️ React 19<br/>UI Library]:::frontendTech
        F3[📘 TypeScript<br/>Type Safety]:::frontendTech
        F4[🎨 Tailwind CSS<br/>Styling]:::frontendTech
        F5[🔐 Clerk Auth<br/>Authentication]:::frontendTech
    end

    subgraph "⚙️ Backend Stack"
        B1[🟢 Node.js<br/>Runtime]:::backendTech
        B2[🚀 Express.js<br/>Web Framework]:::backendTech
        B3[📋 BullMQ<br/>Job Queue]:::backendTech
        B4[🔗 LangChain<br/>AI Orchestration]:::backendTech
    end

    subgraph "🤖 AI & ML"
        AI1[🎯 OpenAI GPT-4.1<br/>Text Generation]:::aiTech
        AI2[🧠 text-embedding-3-small<br/>Vector Embeddings]:::aiTech
    end

    subgraph "🗄️ Databases & Storage"
        DB1[🧮 Qdrant Vector DB<br/>Similarity Search]:::dataTech
        DB2[⚡ Redis/Valkey<br/>Caching & Queue]:::dataTech
        DB3[📁 Local File Storage<br/>PDF Documents]:::dataTech
    end

    subgraph "🏗️ Infrastructure"
        I1[🐳 Docker Compose<br/>Containerization]:::infraTech
        I2[💻 Local Development<br/>Environment]:::infraTech
    end

    %% Define technology relationships
    F1 -->|"🏗️ Built on"| F2
    F2 -->|"🔷 Enhanced by"| F3
    F3 -->|"🎨 Styled with"| F4
    F4 -->|"🔐 Secured by"| F5

    B1 -->|"🌐 Serves"| B2
    B2 -->|"📋 Uses"| B3
    B3 -->|"🔗 Integrates"| B4

    B4 -->|"🎯 Powers"| AI1
    B4 -->|"🧠 Uses"| AI2
    B3 -->|"📋 Stores jobs in"| DB2
    B4 -->|"💾 Stores vectors in"| DB1
    B4 -->|"📖 Processes"| DB3

    I1 -->|"🏗️ Orchestrates"| DB1
    I1 -->|"🏗️ Orchestrates"| DB2
    I2 -->|"🖥️ Hosts"| I1

    %% Add diagram title
    title[🔧 Complete Technology Ecosystem]
```
```

---

**User**

no I meant in the mermaid graphs you output in the chat.

---

**Cursor**

You're absolutely right! Let me show you the improved mermaid diagrams with better colors for text visibility. Here are the updated versions:

## 🏗️ System Architecture Overview

```mermaid
graph TB
    %% Define styles for different components with better contrast
    classDef clientNode fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#0d47a1
    classDef backendNode fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#4a148c
    classDef externalNode fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px,color:#1b5e20
    classDef infraNode fill:#fff3e0,stroke:#f57c00,stroke-width:2px,color:#e65100

    subgraph "🌐 Client (Next.js)"
        A[📤 File Upload<br/>Component]:::clientNode
        B[💬 Chat Component]:::clientNode
        C[🔐 Authentication]:::clientNode
    end

    subgraph "⚙️ Backend Services"
        D[🚀 Express Server]:::backendNode
        E[👷 BullMQ Worker]:::backendNode
        F[📋 Queue Manager]:::backendNode
    end

    subgraph "🔗 External Services"
        G[🤖 OpenAI API]:::externalNode
        H[🛡️ Clerk Auth]:::externalNode
    end

    subgraph "🗄️ Infrastructure"
        I[⚡ Redis/Valkey]:::infraNode
        J[🧮 Qdrant Vector DB]:::infraNode
        K[📁 File Storage]:::infraNode
    end

    %% Define connections with better labels
    A -->|"📄 Upload PDF"| D
    B -->|"💬 Chat Request"| D
    C -->|"🔐 Authenticate"| H
    D -->|"➕ Add Job"| F
    F -->|"📤 Queue Job"| I
    E -->|"⚙️ Process Job"| I
    E -->|"🧠 Generate Embeddings"| G
    E -->|"💾 Store Vectors"| J
    D -->|"🔍 Retrieve Vectors"| J
    D -->|"🎯 Generate Response"| G
    D -->|"💾 Store Files"| K
    E -->|"📖 Read Files"| K

    %% Add title
    title[📊 PDF RAG System Architecture]
```

## 🔄 RAG Pipeline Flow

```mermaid
sequenceDiagram
    %% Define participants with emojis and better names
    participant U as 👤 User
    participant F as 🌐 Frontend<br/>(Next.js)
    participant S as 🚀 Server<br/>(Express)
    participant Q as 📋 Queue<br/>(BullMQ)
    participant W as 👷 Worker<br/>(Background)
    participant V as 🧮 Vector DB<br/>(Qdrant)
    participant AI as 🤖 OpenAI<br/>(GPT-4)

    %% Document Upload Phase with visual separator
    box rgb(173, 216, 230) Document Upload Phase
    U->>F: 📤 Upload PDF file
    F->>S: POST /upload/pdf
    S->>S: 💾 Store file locally
    S->>Q: ➕ Add job to queue
    S->>F: ✅ Return upload success
    F->>U: 📋 Show upload confirmation
    end

    %% Background processing
    Q->>W: ⚙️ Process job from queue
    W->>W: 📖 Load PDF content
    W->>AI: 🧠 Generate text embeddings
    AI->>W: 📊 Return embeddings vector
    W->>V: 💾 Store embeddings in vector DB
    W->>Q: ✅ Mark job complete

    %% Chat Phase with visual separator
    box rgb(144, 238, 144) Chat Phase
    U->>F: 💬 Send chat message
    F->>S: GET /chat?message=...
    S->>AI: 🧠 Generate query embedding
    AI->>S: 📊 Return query embedding
    S->>V: 🔍 Search similar vectors
    V->>S: 📄 Return relevant documents
    S->>AI: 🎯 Generate response with context
    AI->>S: 💬 Return AI response
    S->>F: 📦 Return response + source docs
    F->>U: 🖥️ Display AI response
    end
```

## 🧩 Component Architecture

```mermaid
graph LR
    %% Define styles for different component types with better contrast
    classDef frontendNode fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#0d47a1
    classDef backendNode fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#4a148c
    classDef infraNode fill:#fff8e1,stroke:#f57c00,stroke-width:2px,color:#e65100

    subgraph "🌐 Frontend Components"
        A1[📄 app/page.tsx<br/>Main Page]:::frontendNode
        A2[📤 components/file-upload.tsx<br/>File Upload]:::frontendNode
        A3[💬 components/chat.tsx<br/>Chat Interface]:::frontendNode
        A4[🏗️ app/layout.tsx<br/>Root Layout]:::frontendNode
        A5[🛡️ middleware.ts<br/>Auth Middleware]:::frontendNode
    end

    subgraph "⚙️ Backend Components"
        B1[🚀 server/index.js<br/>Express Server]:::backendNode
        B2[👷 server/worker.js<br/>Background Worker]:::backendNode
        B3[📦 package.json<br/>Dependencies]:::backendNode
    end

    subgraph "🗄️ Infrastructure"
        C1[🐳 docker-compose.yml<br/>Container Orchestration]:::infraNode
        C2[⚡ Redis/Valkey<br/>Job Queue]:::infraNode
        C3[🧮 Qdrant<br/>Vector Database]:::infraNode
    end

    %% Define connections with clear labels
    A4 -->|"📄 Renders"| A1
    A1 -->|"📤 Uses"| A2
    A1 -->|"💬 Uses"| A3
    A5 -->|"🔐 Protects"| A4

    A2 -->|"📨 HTTP Requests"| B1
    A3 -->|"💬 HTTP Requests"| B1
    B1 -->|"⚙️ Delegates Work"| B2
    B3 -->|"📦 Manages"| B1
    B3 -->|"📦 Manages"| B2

    B2 -->|"📋 Queue Jobs"| C2
    B2 -->|"💾 Store Vectors"| C3
    C1 -->|"🏗️ Provisions"| C2
    C1 -->|"🏗️ Provisions"| C3

    %% Add diagram title
    title[🔗 Component Relationships & Dependencies]
```

## 🌊 Data Flow Architecture

```mermaid
flowchart TD
    %% Define styles for different phases with better contrast
    classDef uploadPhase fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#0d47a1
    classDef processingPhase fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#4a148c
    classDef queryPhase fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px,color:#1b5e20
    classDef responsePhase fill:#fff8e1,stroke:#f57c00,stroke-width:2px,color:#e65100

    %% Upload Pipeline
    A[📤 PDF Upload<br/>User Action]:::uploadPhase --> B[💾 Multer Storage<br/>File Handling]:::processingPhase
    B --> C[📋 BullMQ Job Queue<br/>Async Processing]:::processingPhase
    C --> D[👷 Background Worker<br/>Job Processor]:::processingPhase
    D --> E[📖 PDF Loader<br/>Content Extraction]:::processingPhase
    E --> F[✂️ Text Extraction<br/>Raw Text]:::processingPhase
    F --> G[🔪 Document Chunking<br/>Text Segments]:::processingPhase
    G --> H[🧠 OpenAI Embeddings<br/>Vector Generation]:::processingPhase
    H --> I[🧮 Vector Storage in Qdrant<br/>Similarity Search DB]:::processingPhase

    %% Query Pipeline
    J[💬 User Query<br/>Natural Language]:::queryPhase --> K[🧠 Query Embedding<br/>Vector Conversion]:::queryPhase
    K --> L[🔍 Vector Search<br/>Similarity Matching]:::queryPhase
    I -->|"📊 Similar Vectors"| L
    L --> M[📄 Relevant Documents<br/>Context Retrieval]:::queryPhase
    M --> N[📝 Context Injection<br/>Prompt Engineering]:::queryPhase
    N --> O[🎯 GPT-4 Generation<br/>AI Response]:::responsePhase
    O --> P[💬 AI Response<br/>Generated Answer]:::responsePhase
    P --> Q[🖥️ User Interface<br/>Display Result]:::responsePhase

    %% Add visual separators
    subgraph "📥 Document Processing Pipeline"
        B
        C
        D
        E
        F
        G
        H
        I
    end

    subgraph "🔍 Query & Response Pipeline"
        K
        L
        M
        N
        O
        P
        Q
    end
```

## 🛠️ Technology Stack Diagram

```mermaid
graph TB
    %% Define styles for different technology layers with better contrast
    classDef frontendTech fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#0d47a1
    classDef backendTech fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#4a148c
    classDef aiTech fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px,color:#1b5e20
    classDef dataTech fill:#fff8e1,stroke:#f57c00,stroke-width:2px,color:#e65100
    classDef infraTech fill:#fce4ec,stroke:#c2185b,stroke-width:2px,color:#880e4f

    subgraph "🌐 Frontend Stack"
        F1[⚛️ Next.js 15<br/>React Framework]:::frontendTech
        F2[⚛️ React 19<br/>UI Library]:::frontendTech
        F3[📘 TypeScript<br/>Type Safety]:::frontendTech
        F4[🎨 Tailwind CSS<br/>Styling]:::frontendTech
        F5[🔐 Clerk Auth<br/>Authentication]:::frontendTech
    end

    subgraph "⚙️ Backend Stack"
        B1[🟢 Node.js<br/>Runtime]:::backendTech
        B2[🚀 Express.js<br/>Web Framework]:::backendTech
        B3[📋 BullMQ<br/>Job Queue]:::backendTech
        B4[🔗 LangChain<br/>AI Orchestration]:::backendTech
    end

    subgraph "🤖 AI & ML"
        AI1[🎯 OpenAI GPT-4.1<br/>Text Generation]:::aiTech
        AI2[🧠 text-embedding-3-small<br/>Vector Embeddings]:::aiTech
    end

    subgraph "🗄️ Databases & Storage"
        DB1[🧮 Qdrant Vector DB<br/>Similarity Search]:::dataTech
        DB2[⚡ Redis/Valkey<br/>Caching & Queue]:::dataTech
        DB3[📁 Local File Storage<br/>PDF Documents]:::dataTech
    end

    subgraph "🏗️ Infrastructure"
        I1[🐳 Docker Compose<br/>Containerization]:::infraTech
        I2[💻 Local Development<br/>Environment]:::infraTech
    end

    %% Define technology relationships
    F1 -->|"🏗️ Built on"| F2
    F2 -->|"🔷 Enhanced by"| F3
    F3 -->|"🎨 Styled with"| F4
    F4 -->|"🔐 Secured by"| F5

    B1 -->|"🌐 Serves"| B2
    B2 -->|"📋 Uses"| B3
    B3 -->|"🔗 Integrates"| B4

    B4 -->|"🎯 Powers"| AI1
    B4 -->|"🧠 Uses"| AI2
    B3 -->|"📋 Stores jobs in"| DB2
    B4 -->|"💾 Stores vectors in"| DB1
    B4 -->|"📖 Processes"| DB3

    I1 -->|"🏗️ Orchestrates"| DB1
    I1 -->|"🏗️ Orchestrates"| DB2
    I2 -->|"🖥️ Hosts"| I1

    %% Add diagram title
    title[🔧 Complete Technology Ecosystem]
```

## 🎨 **Color Improvements Made:**

✅ **Better Text Contrast**: Added explicit `color` properties to all class definitions  
✅ **Darker Text Colors**: Used darker blues, purples, greens, and oranges for better readability  
✅ **Lighter Backgrounds**: Maintained light, pleasant background colors while ensuring text stands out  
✅ **Consistent Styling**: Applied the same improved color scheme across all diagrams  

The text should now be much more visible and readable in all the diagrams!

```plaintext
graph TB
    %% Define styles for different components with better contrast
    classDef clientNode fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#0d47a1
    classDef backendNode fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#4a148c
    classDef externalNode fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px,color:#1b5e20
    classDef infraNode fill:#fff3e0,stroke:#f57c00,stroke-width:2px,color:#e65100

    subgraph "🌐 Client (Next.js)"
        A[📤 File Upload<br/>Component]:::clientNode
        B[💬 Chat Component]:::clientNode
        C[🔐 Authentication]:::clientNode
    end

    subgraph "⚙️ Backend Services"
        D[🚀 Express Server]:::backendNode
        E[👷 BullMQ Worker]:::backendNode
        F[📋 Queue Manager]:::backendNode
    end

    subgraph "🔗 External Services"
        G[🤖 OpenAI API]:::externalNode
        H[🛡️ Clerk Auth]:::externalNode
    end

    subgraph "🗄️ Infrastructure"
        I[⚡ Redis/Valkey]:::infraNode
        J[🧮 Qdrant Vector DB]:::infraNode
        K[📁 File Storage]:::infraNode
    end

    %% Define connections with better labels
    A -->|"📄 Upload PDF"| D
    B -->|"💬 Chat Request"| D
    C -->|"🔐 Authenticate"| H
    D -->|"➕ Add Job"| F
    F -->|"📤 Queue Job"| I
    E -->|"⚙️ Process Job"| I
    E -->|"🧠 Generate Embeddings"| G
    E -->|"💾 Store Vectors"| J
    D -->|"🔍 Retrieve Vectors"| J
    D -->|"🎯 Generate Response"| G
    D -->|"💾 Store Files"| K
    E -->|"📖 Read Files"| K

    %% Add title
    title[📊 PDF RAG System Architecture]
```

```plaintext
sequenceDiagram
    %% Define participants with emojis and better names
    participant U as 👤 User
    participant F as 🌐 Frontend<br/>(Next.js)
    participant S as 🚀 Server<br/>(Express)
    participant Q as 📋 Queue<br/>(BullMQ)
    participant W as 👷 Worker<br/>(Background)
    participant V as 🧮 Vector DB<br/>(Qdrant)
    participant AI as 🤖 OpenAI<br/>(GPT-4)

    %% Document Upload Phase with visual separator
    box rgb(173, 216, 230) Document Upload Phase
    U->>F: 📤 Upload PDF file
    F->>S: POST /upload/pdf
    S->>S: 💾 Store file locally
    S->>Q: ➕ Add job to queue
    S->>F: ✅ Return upload success
    F->>U: 📋 Show upload confirmation
    end

    %% Background processing
    Q->>W: ⚙️ Process job from queue
    W->>W: 📖 Load PDF content
    W->>AI: 🧠 Generate text embeddings
    AI->>W: 📊 Return embeddings vector
    W->>V: 💾 Store embeddings in vector DB
    W->>Q: ✅ Mark job complete

    %% Chat Phase with visual separator
    box rgb(144, 238, 144) Chat Phase
    U->>F: 💬 Send chat message
    F->>S: GET /chat?message=...
    S->>AI: 🧠 Generate query embedding
    AI->>S: 📊 Return query embedding
    S->>V: 🔍 Search similar vectors
    V->>S: 📄 Return relevant documents
    S->>AI: 🎯 Generate response with context
    AI->>S: 💬 Return AI response
    S->>F: 📦 Return response + source docs
    F->>U: 🖥️ Display AI response
    end
```

```plaintext
graph LR
    %% Define styles for different component types with better contrast
    classDef frontendNode fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#0d47a1
    classDef backendNode fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#4a148c
    classDef infraNode fill:#fff8e1,stroke:#f57c00,stroke-width:2px,color:#e65100

    subgraph "🌐 Frontend Components"
        A1[📄 app/page.tsx<br/>Main Page]:::frontendNode
        A2[📤 components/file-upload.tsx<br/>File Upload]:::frontendNode
        A3[💬 components/chat.tsx<br/>Chat Interface]:::frontendNode
        A4[🏗️ app/layout.tsx<br/>Root Layout]:::frontendNode
        A5[🛡️ middleware.ts<br/>Auth Middleware]:::frontendNode
    end

    subgraph "⚙️ Backend Components"
        B1[🚀 server/index.js<br/>Express Server]:::backendNode
        B2[👷 server/worker.js<br/>Background Worker]:::backendNode
        B3[📦 package.json<br/>Dependencies]:::backendNode
    end

    subgraph "🗄️ Infrastructure"
        C1[🐳 docker-compose.yml<br/>Container Orchestration]:::infraNode
        C2[⚡ Redis/Valkey<br/>Job Queue]:::infraNode
        C3[🧮 Qdrant<br/>Vector Database]:::infraNode
    end

    %% Define connections with clear labels
    A4 -->|"📄 Renders"| A1
    A1 -->|"📤 Uses"| A2
    A1 -->|"💬 Uses"| A3
    A5 -->|"🔐 Protects"| A4

    A2 -->|"📨 HTTP Requests"| B1
    A3 -->|"💬 HTTP Requests"| B1
    B1 -->|"⚙️ Delegates Work"| B2
    B3 -->|"📦 Manages"| B1
    B3 -->|"📦 Manages"| B2

    B2 -->|"📋 Queue Jobs"| C2
    B2 -->|"💾 Store Vectors"| C3
    C1 -->|"🏗️ Provisions"| C2
    C1 -->|"🏗️ Provisions"| C3

    %% Add diagram title
    title[🔗 Component Relationships & Dependencies]
```

```plaintext
flowchart TD
    %% Define styles for different phases with better contrast
    classDef uploadPhase fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#0d47a1
    classDef processingPhase fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#4a148c
    classDef queryPhase fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px,color:#1b5e20
    classDef responsePhase fill:#fff8e1,stroke:#f57c00,stroke-width:2px,color:#e65100

    %% Upload Pipeline
    A[📤 PDF Upload<br/>User Action]:::uploadPhase --> B[💾 Multer Storage<br/>File Handling]:::processingPhase
    B --> C[📋 BullMQ Job Queue<br/>Async Processing]:::processingPhase
    C --> D[👷 Background Worker<br/>Job Processor]:::processingPhase
    D --> E[📖 PDF Loader<br/>Content Extraction]:::processingPhase
    E --> F[✂️ Text Extraction<br/>Raw Text]:::processingPhase
    F --> G[🔪 Document Chunking<br/>Text Segments]:::processingPhase
    G --> H[🧠 OpenAI Embeddings<br/>Vector Generation]:::processingPhase
    H --> I[🧮 Vector Storage in Qdrant<br/>Similarity Search DB]:::processingPhase

    %% Query Pipeline
    J[💬 User Query<br/>Natural Language]:::queryPhase --> K[🧠 Query Embedding<br/>Vector Conversion]:::queryPhase
    K --> L[🔍 Vector Search<br/>Similarity Matching]:::queryPhase
    I -->|"📊 Similar Vectors"| L
    L --> M[📄 Relevant Documents<br/>Context Retrieval]:::queryPhase
    M --> N[📝 Context Injection<br/>Prompt Engineering]:::queryPhase
    N --> O[🎯 GPT-4 Generation<br/>AI Response]:::responsePhase
    O --> P[💬 AI Response<br/>Generated Answer]:::responsePhase
    P --> Q[🖥️ User Interface<br/>Display Result]:::responsePhase

    %% Add visual separators
    subgraph "📥 Document Processing Pipeline"
        B
        C
        D
        E
        F
        G
        H
        I
    end

    subgraph "🔍 Query & Response Pipeline"
        K
        L
        M
        N
        O
        P
        Q
    end
```

```plaintext
graph TB
    %% Define styles for different technology layers with better contrast
    classDef frontendTech fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#0d47a1
    classDef backendTech fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#4a148c
    classDef aiTech fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px,color:#1b5e20
    classDef dataTech fill:#fff8e1,stroke:#f57c00,stroke-width:2px,color:#e65100
    classDef infraTech fill:#fce4ec,stroke:#c2185b,stroke-width:2px,color:#880e4f

    subgraph "🌐 Frontend Stack"
        F1[⚛️ Next.js 15<br/>React Framework]:::frontendTech
        F2[⚛️ React 19<br/>UI Library]:::frontendTech
        F3[📘 TypeScript<br/>Type Safety]:::frontendTech
        F4[🎨 Tailwind CSS<br/>Styling]:::frontendTech
        F5[🔐 Clerk Auth<br/>Authentication]:::frontendTech
    end

    subgraph "⚙️ Backend Stack"
        B1[🟢 Node.js<br/>Runtime]:::backendTech
        B2[🚀 Express.js<br/>Web Framework]:::backendTech
        B3[📋 BullMQ<br/>Job Queue]:::backendTech
        B4[🔗 LangChain<br/>AI Orchestration]:::backendTech
    end

    subgraph "🤖 AI & ML"
        AI1[🎯 OpenAI GPT-4.1<br/>Text Generation]:::aiTech
        AI2[🧠 text-embedding-3-small<br/>Vector Embeddings]:::aiTech
    end

    subgraph "🗄️ Databases & Storage"
        DB1[🧮 Qdrant Vector DB<br/>Similarity Search]:::dataTech
        DB2[⚡ Redis/Valkey<br/>Caching & Queue]:::dataTech
        DB3[📁 Local File Storage<br/>PDF Documents]:::dataTech
    end

    subgraph "🏗️ Infrastructure"
        I1[🐳 Docker Compose<br/>Containerization]:::infraTech
        I2[💻 Local Development<br/>Environment]:::infraTech
    end

    %% Define technology relationships
    F1 -->|"🏗️ Built on"| F2
    F2 -->|"🔷 Enhanced by"| F3
    F3 -->|"🎨 Styled with"| F4
    F4 -->|"🔐 Secured by"| F5

    B1 -->|"🌐 Serves"| B2
    B2 -->|"📋 Uses"| B3
    B3 -->|"🔗 Integrates"| B4

    B4 -->|"🎯 Powers"| AI1
    B4 -->|"🧠 Uses"| AI2
    B3 -->|"📋 Stores jobs in"| DB2
    B4 -->|"💾 Stores vectors in"| DB1
    B4 -->|"📖 Processes"| DB3

    I1 -->|"🏗️ Orchestrates"| DB1
    I1 -->|"🏗️ Orchestrates"| DB2
    I2 -->|"🖥️ Hosts"| I1

    %% Add diagram title
    title[🔧 Complete Technology Ecosystem]
```

