import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { Toaster } from 'react-hot-toast'
import DocumentAnalyzer from './components/DocumentAnalyzer'

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
          }
        }}
      />

      {/* Header */}
      <header className="backdrop-blur-md bg-white/70 border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-800 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">AI</span>
              </div>
              <h1 className="text-xl font-semibold text-slate-800">
                Document Analyzer
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <SignedOut>
                <SignInButton>
                  <button className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 backdrop-blur-sm">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10 ring-2 ring-slate-200"
                    }
                  }}
                />
              </SignedIn>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-4rem)]">
        <SignedOut>
          <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
            <div className="max-w-md mx-auto text-center">
              <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl p-8 shadow-xl">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl font-bold">AI</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">
                  Welcome to Document Analyzer
                </h2>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  Upload your PDF documents and get AI-powered insights, summaries, and answers to your questions.
                </p>
                <SignInButton>
                  <button className="bg-slate-800 hover:bg-slate-900 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 backdrop-blur-sm shadow-lg">
                    Get Started
                  </button>
                </SignInButton>
              </div>
            </div>
          </div>
        </SignedOut>

        <SignedIn>
          <DocumentAnalyzer />
        </SignedIn>
      </main>
    </div>
  )
}

export default App