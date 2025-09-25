import React, { useState } from 'react';
import { Upload as UploadIcon, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const navigate = useNavigate();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files[0] && files[0].type === 'text/csv') {
      setFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setUploading(true);
    
    // Simulate upload and processing
    setTimeout(() => {
      setUploading(false);
      setUploadStatus('success');
      setTimeout(() => {
        navigate('/analysis');
      }, 1500);
    }, 3000);
  };

  return (
    <div
  className="min-h-screen px-6 py-16 bg-cover bg-center flex justify-center items-center"
  style={{
    backgroundImage:
      "url('https://png.pngtree.com/thumb_back/fh260/background/20210903/pngtree-technology-cloud-upload-download-image_782018.jpg')",
  }}
>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Upload Your Document</h1>
          <p className="text-lg text-white max-w-2xl mx-auto">
            Upload a CSV file with a 'comment' column for sentiment analysis. Our AI will process each comment and provide comprehensive insights.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
              dragOver
                ? 'border-blue-400 bg-blue-50'
                : file
                ? 'border-green-400 bg-green-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {file ? (
              <div className="space-y-4">
                <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                <div>
                  <p className="text-lg font-semibold text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <UploadIcon className="mx-auto h-16 w-16 text-gray-400" />
                <div>
                  <p className="text-xl font-semibold text-gray-700 mb-2">
                    Drop your CSV file here, or click to browse
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports CSV files up to 50MB with 'comment' column
                  </p>
                </div>
              </div>
            )}
            
            <input
              type="file"
              accept=".csv"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
            >
              Choose File
            </label>
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">File Requirements</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FileText className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h3 className="font-semibold">CSV Format</h3>
                  <p className="text-sm text-gray-600">File must be in CSV format with proper encoding</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Column Name</h3>
                  <p className="text-sm text-gray-600">Must contain a column named exactly 'comment'</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Text Quality</h3>
                  <p className="text-sm text-gray-600">Comments should be in readable text format</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <UploadIcon className="h-5 w-5 text-purple-500 mt-0.5" />
                <div>
                  <h3 className="font-semibold">File Size</h3>
                  <p className="text-sm text-gray-600">Maximum file size of 50MB supported</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Button */}
        {file && (
          <div className="text-center">
            <button
              onClick={handleUpload}
              disabled={uploading}
              className={`px-8 py-4 rounded-xl font-semibold text-white text-lg transition-all duration-300 ${
                uploading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : uploadStatus === 'success'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-blue-600 hover:bg-blue-700 hover:scale-105 shadow-lg hover:shadow-xl'
              }`}
            >
              {uploading ? (
                <span className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Processing Document...
                </span>
              ) : uploadStatus === 'success' ? (
                'Analysis Complete - Redirecting...'
              ) : (
                'Start Analysis'
              )}
            </button>
            
            {uploading && (
              <p className="mt-4 text-sm text-gray-600">
                This may take a few moments depending on file size...
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;