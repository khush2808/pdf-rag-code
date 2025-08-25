import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PDF RAG Chat - AI-Powered Document Assistant',
  description: 'Upload your PDF documents and chat with them using AI. Get instant answers from your documents.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <header className="bg-slate-800 text-white p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">PDF RAG Chat</h1>
          <div className="text-sm text-slate-300">
            AI-Powered Document Assistant
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
