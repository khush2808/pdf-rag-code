'use client';
import * as React from 'react';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';

const FileUploadComponent: React.FC = () => {
  const [uploadStatus, setUploadStatus] = React.useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadMessage, setUploadMessage] = React.useState('');

  const handleFileUploadButtonClick = () => {
    const el = document.createElement('input');
    el.setAttribute('type', 'file');
    el.setAttribute('accept', 'application/pdf');
    el.addEventListener('change', async () => {
      if (el.files && el.files.length > 0) {
        const file = el.files.item(0);
        if (file) {
          setUploadStatus('uploading');
          setUploadMessage('Uploading your PDF...');
          
          try {
            const formData = new FormData();
            formData.append('pdf', file);

            const response = await fetch('http://localhost:8000/upload/pdf', {
              method: 'POST',
              body: formData,
            });
            
            const result = await response.json();
            
            if (response.ok) {
              setUploadStatus('success');
              setUploadMessage('PDF uploaded successfully! Processing in background...');
            } else {
              setUploadStatus('error');
              setUploadMessage(result.error || 'Failed to upload PDF');
            }
          } catch {
            setUploadStatus('error');
            setUploadMessage('Network error. Please check if the server is running.');
          }
        }
      }
    });
    el.click();
  };

  const getStatusIcon = () => {
    switch (uploadStatus) {
      case 'uploading':
        return <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full" />;
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-400" />;
      case 'error':
        return <AlertCircle className="w-6 h-6 text-red-400" />;
      default:
        return <Upload className="w-6 h-6" />;
    }
  };

  const getButtonColor = () => {
    switch (uploadStatus) {
      case 'uploading':
        return 'bg-blue-600';
      case 'success':
        return 'bg-green-600';
      case 'error':
        return 'bg-red-600';
      default:
        return 'bg-slate-700 hover:bg-slate-800';
    }
  };

  return (
    <div className="space-y-4">
      <div 
        className={`${getButtonColor()} text-white shadow-lg flex justify-center items-center p-6 rounded-lg border-2 border-transparent hover:border-slate-300 transition-all cursor-pointer`}
        onClick={uploadStatus === 'uploading' ? undefined : handleFileUploadButtonClick}
      >
        <div className="flex justify-center items-center flex-col space-y-2">
          {getStatusIcon()}
          <h3 className="font-medium">
            {uploadStatus === 'uploading' ? 'Uploading...' : 'Upload PDF File'}
          </h3>
          {uploadStatus === 'idle' && (
            <p className="text-sm opacity-80">Click to select a PDF file</p>
          )}
        </div>
      </div>
      
      {uploadMessage && (
        <div className={`p-3 rounded text-sm ${
          uploadStatus === 'success' ? 'bg-green-50 text-green-700 border border-green-200' :
          uploadStatus === 'error' ? 'bg-red-50 text-red-700 border border-red-200' :
          'bg-blue-50 text-blue-700 border border-blue-200'
        }`}>
          {uploadMessage}
        </div>
      )}
    </div>
  );
};

export default FileUploadComponent;
