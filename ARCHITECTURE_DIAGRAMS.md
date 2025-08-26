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