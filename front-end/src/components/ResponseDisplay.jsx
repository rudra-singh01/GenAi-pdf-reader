import React, { useState } from 'react'
import { Copy, Download, ExternalLink, CheckCircle } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import toast from 'react-hot-toast'

const ResponseDisplay = ({ response }) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(response.analysis)
      setCopied(true)
      toast.success('Response copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error('Failed to copy to clipboard')
    }
  }

  const downloadResponse = () => {
    const element = document.createElement('a')
    const file = new Blob([response.analysis], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'ai-analysis.txt'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    toast.success('Response downloaded!')
  }

  const openPDF = () => {
    if (response.fileUrl) {
      window.open(response.fileUrl, '_blank')
    }
  }

  return (
    <div className="backdrop-blur-lg bg-white/70 border border-white/20 rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="backdrop-blur-sm bg-slate-100/50 border-b border-white/30 px-4 lg:px-8 py-4 lg:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-emerald-100/80 backdrop-blur-sm flex items-center justify-center">
              <CheckCircle className="h-5 w-5 lg:h-6 lg:w-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-lg lg:text-2xl font-semibold text-slate-800">Analysis Complete</h3>
              <p className="text-xs lg:text-sm text-slate-600">Generated with AI precision</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 lg:space-x-3">
            <button
              onClick={copyToClipboard}
              className="backdrop-blur-sm bg-white/60 hover:bg-white/80 border border-white/30 text-slate-700 px-3 lg:px-4 py-2 lg:py-2.5 rounded-xl transition-all duration-200 flex items-center text-xs lg:text-sm font-medium shadow-sm hover:shadow-md"
            >
              {copied ? (
                <CheckCircle className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2 text-emerald-600" />
              ) : (
                <Copy className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
              )}
              <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
            </button>

            <button
              onClick={downloadResponse}
              className="backdrop-blur-sm bg-blue-100/60 hover:bg-blue-100/80 border border-blue-200/50 text-blue-700 px-3 lg:px-4 py-2 lg:py-2.5 rounded-xl transition-all duration-200 flex items-center text-xs lg:text-sm font-medium shadow-sm hover:shadow-md"
            >
              <Download className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
              <span className="hidden sm:inline">Download</span>
            </button>
          </div>
        </div>
      </div>

      {/* Document Links */}
      {response.fileUrl && (
        <div className="backdrop-blur-sm bg-slate-50/40 border-b border-white/20 px-4 lg:px-8 py-4 lg:py-5">
          <h4 className="text-xs lg:text-sm font-semibold text-slate-700 mb-3 lg:mb-4 uppercase tracking-wide">Document Access</h4>
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-6">
            <button
              onClick={openPDF}
              className="flex items-center text-slate-600 hover:text-blue-700 text-xs lg:text-sm font-medium transition-colors duration-200 group w-full sm:w-auto"
            >
              <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-lg bg-red-100/80 flex items-center justify-center mr-2 lg:mr-3 group-hover:bg-red-200/80 transition-colors">
                <ExternalLink className="h-3 w-3 lg:h-4 lg:w-4 text-red-600" />
              </div>
              <span className="hidden sm:inline">View PDF Document</span>
              <span className="sm:hidden">View PDF</span>
            </button>
          </div>
        </div>
      )}

      {/* Response Content */}
      <div className="p-4 lg:p-8">
        <div className="prose prose-sm lg:prose-slate max-w-none">
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <div className="backdrop-blur-sm bg-slate-900/5 border border-slate-200/50 rounded-xl p-4 my-6">
                    <SyntaxHighlighter
                      style={tomorrow}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code className="bg-slate-100/80 text-slate-700 px-2 py-1 rounded-md text-sm font-mono" {...props}>
                    {children}
                  </code>
                )
              },
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold text-slate-800 mb-6 pb-3 border-b border-slate-200/60">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-semibold text-slate-700 mb-4 mt-8">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-medium text-slate-700 mb-3 mt-6">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-slate-600 mb-5 leading-relaxed">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="space-y-2 mb-6">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="space-y-2 mb-6">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="flex items-start text-slate-600">
                  <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                  <span>{children}</span>
                </li>
              ),
              blockquote: ({ children }) => (
                <div className="backdrop-blur-sm bg-blue-50/60 border border-blue-200/30 rounded-xl p-5 mb-6">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-200/80 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <blockquote className="text-blue-700 italic">
                      {children}
                    </blockquote>
                  </div>
                </div>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-slate-800">
                  {children}
                </strong>
              ),
              em: ({ children }) => (
                <em className="italic text-slate-600">
                  {children}
                </em>
              ),
            }}
          >
            {response.analysis}
          </ReactMarkdown>
        </div>
      </div>

      {/* Footer */}
      <div className="backdrop-blur-sm bg-slate-50/40 border-t border-white/20 px-4 lg:px-8 py-3 lg:py-4">
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-2 text-slate-500">
            <div className="w-4 h-4 lg:w-5 lg:h-5 rounded bg-slate-300/60 flex items-center justify-center">
              <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-slate-500 rounded-full"></div>
            </div>
            <span className="text-xs lg:text-sm font-medium">Analysis powered by Google Gemini AI</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResponseDisplay