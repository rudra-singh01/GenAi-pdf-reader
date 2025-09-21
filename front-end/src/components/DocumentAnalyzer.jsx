import React, { useState } from 'react'
import { Upload, FileText, Send, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { uploadDocument } from '../utils/api'
import ResponseDisplay from './ResponseDisplay'

const DocumentAnalyzer = () => {
  const [file, setFile] = useState(null)
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile.type === 'application/pdf') {
        setFile(droppedFile)
        toast.success('PDF file uploaded successfully!')
      } else {
        toast.error('Please upload a PDF file only')
      }
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile)
        toast.success('PDF file uploaded successfully!')
      } else {
        toast.error('Please upload a PDF file only')
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!file) {
      toast.error('Please upload a PDF file')
      return
    }
    
    if (!prompt.trim()) {
      toast.error('Please enter a prompt')
      return
    }

    setLoading(true)
    
    try {
      const response = await uploadDocument(file, prompt)
      setResponse(response.data)
      toast.success('Document analyzed successfully!')
    } catch (error) {
      console.error('Error:', error)
      toast.error(error.response?.data?.message || 'Failed to analyze document')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFile(null)
    setPrompt('')
    setResponse(null)
  }

  return (
    <div className="flex flex-col lg:flex-row h-auto lg:h-[calc(100vh-4rem)] gap-4 lg:gap-6 p-4 lg:p-6">
      {/* Left Panel - Upload Section */}
      <div className="w-full lg:w-1/2">
        <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl shadow-xl p-4 lg:p-6 h-auto lg:h-full flex flex-col lg:sticky lg:top-6">
          <div className="mb-4 lg:mb-6">
            <h2 className="text-lg lg:text-xl font-semibold text-slate-800 mb-2 flex items-center">
              <FileText className="mr-2 lg:mr-3 text-slate-600 w-5 h-5 lg:w-6 lg:h-6" />
              Document Analysis
            </h2>
            <p className="text-slate-600 text-xs lg:text-sm">Upload and analyze PDF documents with AI precision</p>
          </div>
          
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-4 lg:space-y-6">
            {/* File Upload Area */}
            <div className="space-y-2 lg:space-y-3">
              <label className="block text-xs lg:text-sm font-medium text-slate-700">
                Upload PDF Document
              </label>

              <div
                className={`relative border-2 border-dashed rounded-xl p-6 lg:p-8 text-center transition-all duration-200 ${
                  dragActive 
                    ? 'border-slate-400 bg-slate-50/60' 
                    : file 
                      ? 'border-emerald-400 bg-emerald-50/60' 
                      : 'border-slate-300 bg-slate-50/30 hover:border-slate-400 hover:bg-slate-50/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                {file ? (
                  <div className="space-y-2">
                    <FileText className="mx-auto h-8 w-8 lg:h-10 lg:w-10 text-emerald-600" />
                    <p className="text-emerald-700 font-medium text-sm lg:text-base truncate px-2">{file.name}</p>
                    <p className="text-xs lg:text-sm text-emerald-600">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="mx-auto h-8 w-8 lg:h-10 lg:w-10 text-slate-400" />
                    <p className="text-slate-600 text-sm lg:text-base">
                      <span className="font-medium">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs lg:text-sm text-slate-500">PDF files only</p>
                  </div>
                )}
              </div>
            </div>

            {/* Prompt Input */}
            <div className="space-y-2 lg:space-y-3 flex-1">
              <label className="block text-xs lg:text-sm font-medium text-slate-700">
                What would you like to know about this document?
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Summarize this document, Extract key points, What is this document about?, etc."
                rows={4}
                className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-400 focus:border-transparent resize-none backdrop-blur-sm bg-white/60 text-slate-700 placeholder-slate-400 text-sm lg:text-base"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <button
                type="submit"
                disabled={loading || !file || !prompt.trim()}
                className="flex-1 bg-slate-800 hover:bg-slate-900 disabled:bg-slate-400 text-white px-4 lg:px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center backdrop-blur-sm shadow-lg text-sm lg:text-base"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4 lg:h-5 lg:w-5" />
                    <span className="hidden sm:inline">Analyzing...</span>
                    <span className="sm:hidden">Analyzing</span>
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4 lg:h-5 lg:w-5" />
                    <span className="hidden sm:inline">Analyze Document</span>
                    <span className="sm:hidden">Analyze</span>
                  </>
                )}
              </button>

              {(file || response) && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 lg:px-6 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50/60 transition-all duration-200 backdrop-blur-sm text-sm lg:text-base"
                >
                  Reset
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Right Panel - Response Section */}
      <div className="w-full lg:w-1/2 overflow-y-auto mt-4 lg:mt-0">
        {response ? (
          <ResponseDisplay response={response} />
        ) : (
          <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl shadow-xl p-6 lg:p-8 h-64 lg:h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-slate-100/60 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="h-6 w-6 lg:h-8 lg:w-8 text-slate-400" />
              </div>
              <h3 className="text-base lg:text-lg font-medium text-slate-700 mb-2">No Analysis Yet</h3>
              <p className="text-slate-500 text-xs lg:text-sm">Upload a PDF and enter a prompt to get started</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DocumentAnalyzer
