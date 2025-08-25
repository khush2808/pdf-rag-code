import FileUploadComponent from './components/file-upload';
import ChatComponent from './components/chat';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">AI Document Assistant</h1>
          <p className="text-slate-600">
            Upload a PDF document and start chatting with it. Our AI will help you find answers from your documents.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-slate-800">Step 1: Upload Document</h2>
              <FileUploadComponent />
              <div className="mt-4 text-sm text-slate-600">
                <p className="mb-2">📄 Supported format: PDF</p>
                <p>🔒 Your documents are processed securely</p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm h-full">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-slate-800">Step 2: Chat with Your Document</h2>
                <p className="text-slate-600 text-sm mt-1">
                  Ask questions about your uploaded PDF and get instant answers
                </p>
              </div>
              <ChatComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
